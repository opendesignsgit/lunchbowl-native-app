import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RegistrationService from 'services/RegistartionService/registartion';
import CryptoJS from 'crypto-js';
import {useAuth} from 'context/AuthContext';

export default function PaymentOptions({prevStep, navigation}: any) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const {userId} = useAuth();
  


  const handlePayment = async () => {
    try {
      if (!userId) {
        throw new Error('User ID not found. Please login again.');
      }
      const response: any = await RegistrationService.getRegisterdUserData(
        userId,
      );

      if (!response?.success) {
        throw new Error(response?.message || 'Failed to fetch form data');
      }
     console.log("receicevd data ",response);
     console.log("jhgjhgjhgjhgjhghj",JSON.stringify(response.data, null, 2));

     
      const {subscriptionPlan, user, parentDetails} = response.data || {};
      if (!subscriptionPlan || !user) {
        throw new Error('Required data missing in response');
      }

      const orderId = generateOrderId();
      const paymentData = {
        merchant_id: ccavenueConfig.merchant_id,
        order_id: orderId,
        amount: 1, // subscriptionPlan.price.toFixed(2),
        currency: ccavenueConfig.currency,
        redirect_url: ccavenueConfig.redirect_url,
        cancel_url: ccavenueConfig.cancel_url,
        language: ccavenueConfig.language,
        billing_name: (user?.name || 'Customer').substring(0, 50),
        billing_email: (user?.email || 'no-email@example.com').substring(0, 50),
        billing_tel: (user?.phone || '0000000000').substring(0, 20),
        billing_address: (parentDetails?.address || 'Not Provided').substring(
          0,
          100,
        ),
        billing_city: (parentDetails?.city || 'Chennai').substring(0, 50),
        billing_state: (parentDetails?.state || 'Tamil Nadu').substring(0, 50),
        billing_zip: (parentDetails?.pincode || '600001').substring(0, 10),
        billing_country: (parentDetails?.country || 'India').substring(0, 50),
        merchant_param1: userId,
        merchant_param2: subscriptionPlan.planId || "predefined",
        merchant_param3: orderId,
      };

      console.log('Payment Data:', paymentData);

      // Create request string
      const plainText = Object.entries(paymentData)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');

      // Encrypt
      const encryptedData = encrypt(plainText, ccavenueConfig.working_key);

      navigation.navigate('WebViewScreen', {
        encRequest: encryptedData,
        accessCode: ccavenueConfig.access_code, 
        endpoint: ccavenueConfig.endpoint,
      });

      Alert.alert(
        'Payment Ready',
        `Encrypted: ${encryptedData.substring(0, 20)}...`,
      );
    } catch (err) {
      console.error('Payment error:', err);
      Alert.alert('Error', 'Payment failed, please try again');
    }
  };

  const ccavenueConfig = {
    merchant_id: '4381442',
    access_code: 'AVRM80MF59BY86MRYB',
    working_key: '2A561B005709D8B4BAF69D049B23546B',
    redirect_url: 'https://api.lunchbowl.co.in/api/ccavenue/response',
    cancel_url: 'https://api.lunchbowl.co.in/api/ccavenue/response',
    currency: 'INR',
    language: 'EN',
    endpoint:
      'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
  };

  const encrypt = (plainText: string, workingKey: string) => {
    const md5Hash = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(workingKey));
    const key = CryptoJS.enc.Hex.parse(md5Hash.toString(CryptoJS.enc.Hex));
    const iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');

    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return encrypted.ciphertext.toString();
  };
  

  const generateOrderId = () =>
    `LB${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return (
    <View>
      {/* Payment Options */}
      <View style={localStyles.cardContainer}>
        <TouchableOpacity
          style={[
            localStyles.card,
            selectedMethod === 'CC Avenue' && localStyles.selectedCard,
          ]}
          onPress={() => setSelectedMethod('CC Avenue')}>
          <Text style={localStyles.cardText}>CC Avenue</Text>
        </TouchableOpacity>

        
      </View>

      {/* Buttons */}
      <View style={localStyles.buttonRow}>
        <PrimaryButton
          title="BACK"
          onPress={prevStep}
          style={{flex: 1, marginRight: wp(2)}}
        />
        <PrimaryButton
          title="DONE"
          onPress={() => {
            if (!selectedMethod) {
              Alert.alert('Error', 'Please select a payment method');
              return;
            }
            if (selectedMethod === 'CC Avenue') {
              handlePayment();
            }
          }}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  cardContainer: {
    marginVertical: hp(2),
  },
  card: {
    padding: hp(2),
    marginBottom: hp(1.5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedCard: {
    borderColor: '#007bff',
    backgroundColor: '#e6f0ff',
  },
  cardText: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
});
