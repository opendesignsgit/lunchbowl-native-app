import {Colors} from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
import PrimaryButton from 'components/buttons/PrimaryButton';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

type PlanCardProps = {
  userName: string;
  plan: string;
  amount: string;
  status: string;
  expiry: string;
};

const PlanCard: React.FC<PlanCardProps> = ({
  userName,
  plan,
  amount,
  status,
  expiry,
}) => {
  function upgrade(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.planTitle}>{userName}’s Current Plan</Text>
          <Text
            style={[
              styles.status,
              status === 'Expired' && styles.statusExpired,
            ]}>
            {status}
          </Text>
        </View>
        <Text style={styles.planSubText}>
          {plan} – {amount}
        </Text>
        <Text style={styles.expiryText}>Expires on:</Text>
        <Text style={styles.expiryDate}>{expiry}</Text>
        <PrimaryButton
          title="UPGRADE PLAN"
          onPress={upgrade}
          style={{width: '100%'}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
wrapper: {
  flexGrow: 1,
  justifyContent: 'center',  
  alignItems: 'center',      
  padding: wp('1%'),
},
card: {
  width: wp('86%'),         
  maxWidth: 400,             
  backgroundColor: Colors.white,
  borderRadius: 12,
  padding: wp('5%'),
  shadowColor: Colors.black,
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  borderWidth: 1,
  borderColor: Colors.primaryOrange,
},

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 16,
    color: Colors.primaryOrange,
    fontFamily: Fonts.Urbanist.bold,
  },
  planSubText: {
    fontSize: 14,
    color: Colors.bodyText,
    marginTop: 4,
    fontFamily: Fonts.Urbanist.semiBold,
  },
  status: {
    backgroundColor: Colors.white,
    color: Colors.primaryOrange,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    padding: 5,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Urbanist.extraBold,
  },
  statusExpired: {
    backgroundColor: Colors.white,
    color: Colors.primaryOrange,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    padding: 5,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Urbanist.extraBold,
  },
  expiryText: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.bodyText,
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default PlanCard;
