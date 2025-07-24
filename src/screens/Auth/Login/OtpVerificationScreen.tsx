  /**
   * Method to handle user login.
   *  - An object containing the user's Phone and Otp.
   *  A promise that resolves to the response of the login request.
   * DISCLIMAR --- DONT MODIFY THIS METHOD NAME  WORKING VERSION --BHARATHI 
   */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../../../context/AuthContext';
import OtpInput from 'components/inputs/OtpInput';
import {LoginForm} from 'src/model/authModel';
import {ApiResponseModel} from 'src/model/apiResponseModel';
import {SvgXml} from 'react-native-svg';
import {logo} from 'styles/svg-icons';
import ErrorMessage from 'components/Error/BoostrapStyleError';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {LoadingModal} from 'components/LoadingModal/LoadingModal';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// TEMPRORY TYPES is not perment solution  ###########################

type OtpVerificationRouteParams = {
  mobile: string;
  path: string;
};

type AuthStackParamList = {
  OtpVerification: OtpVerificationRouteParams;
  ProfileSetup: {userId: string};
};

const OtpVerificationScreen = () => {
  // STATE VARIALBELES ###########################
  const navigation =
    useNavigation<
      import('@react-navigation/native').NavigationProp<AuthStackParamList>
    >();
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {login, isProfileSetupDone, userId} = useAuth();
  const route = useRoute<RouteProp<AuthStackParamList, 'OtpVerification'>>();
  const {mobile, path} = route.params;

  // HANDLER FUNCTIONS API CALL ###########################
  const handleVerify = async () => {
    if (otpInput.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Remove country code 
     const formattedMobile = mobile.slice(2);
      const VerifyloginData: LoginForm = {
        mobile:formattedMobile,
        otp: otpInput,
        // path,
      };
      console.log("recieved otp",VerifyloginData)
      const response: ApiResponseModel = await login(VerifyloginData);
      if (response.success && response.data) {
        if (!isProfileSetupDone && userId) {
          navigation.navigate('ProfileSetup', {userId});
        }
      } else {
        setError(response.message || 'An unknown error occurred');
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setLoading(false);
    }
  };
  // HELPER FUNCTIONS #####################################
    const handleCloseError = () => {
    // setError(null);
  };
  // RENDERING COMPONENTS #################################

  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.gradientContainer}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
              {/*############### MAIN CONTAINER ############ */}
            <View style={styles.container}>
                            {/*############### LOGO CONTAINER ############ */}

              <View style={styles.logoContainer}>
                <SvgXml xml={logo} style={styles.logo} />
              </View>
              {/*############### TITLE CONTAINER ############ */}
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>verify otp</Text>
                <Text style={styles.subtitleText}>
                  We've sent an OTP to your Mobile number.
                </Text>
              </View>

              {/*############### OTP INPUT CONTAINER ############ */}

              {error && (
                <ErrorMessage error={error} onClose={handleCloseError} />
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter One Time Password*</Text>
                <OtpInput code={otpInput} setCode={setOtpInput} length={4} />
                {error ? <Text>{error}</Text> : null}
              </View>


              <PrimaryButton
                title="Send One Time Password"
                onPress={handleVerify}
                style={styles.signInButton}
                borderRadius={wp('2%')}
                paddingVertical={hp('1.5%')}
                fontSize={wp('4%')}
                textTransform="uppercase"
                fontFamily="Poppins-SemiBold"
              />

              <LoadingModal loading={loading} setLoading={setLoading} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('8%'),
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  logo: {
    width: wp('30%'),
    height: wp('30%'),
  },
  title: {
    width: '100%',
    alignItems: 'flex-end',
    fontFamily: 'Urbanist-Regular',
    flexDirection: 'row',
  },
  titleContainer: {
    width: '100%',
    marginBottom: hp('3%'),
  },

  titleText: {
    fontSize: wp('8%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
    marginBottom: hp('0.5%'),
    textTransform: 'uppercase',
  },

  subtitleText: {
    fontSize: wp('4%'),
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: hp('1%'),
  },

  inputContainer: {
    width: '100%',
    marginBottom: hp('2%'),
    marginVertical: hp('1.5%'),
    gap: hp('1%'),
    fontSize: wp('14%'),
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionContainer: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  checkboxContainer: {
    width: '100%',
    marginVertical: hp('1.5%'),
    alignItems: 'flex-start',
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxBox: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    borderWidth: 1,
    borderColor: '#999',
    marginRight: wp('2.5%'),
    borderRadius: 4,
    backgroundColor: '#fff',
  },

  checkboxChecked: {
    backgroundColor: '#FF6514',
    borderColor: '#FF6514',
  },

  checkboxLabel: {
    fontSize: wp('3.8%'),
    color: '#333',
    fontFamily: 'Poppins-Regular',
    flexShrink: 1,
  },

  linkText: {
    color: '#FF6514',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  signInButton: {
    height: hp('6%'),
    justifyContent: 'center',
    width: '100%',
  },
});
