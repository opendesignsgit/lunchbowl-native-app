import {Colors} from 'assets/styles/colors';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const FreeTrialCard: React.FC<{navigation: any}> = ({navigation}) => {
  function FreeTrail(): void {
    navigation.navigate('UnderConstruction');
  }

  return (
    <View style={styles.card}>
      <Text style={styles.desc}>
        Delicious and nutritious food that meets the dietary needs of growing
        children.
      </Text>
      <PrimaryButton
        title="Get Free trial"
        onPress={FreeTrail}
        style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: wp('4%'),
    backgroundColor: Colors.lightRed,
    borderRadius: wp('3%'),
    borderRightWidth: wp('1%'),
    borderBottomWidth: wp('1%'),
    borderTopWidth: wp('0.1%'),
    borderLeftWidth: wp('0.1%'),
    borderColor: Colors.primaryOrange,
    width: '100%',
    alignSelf: 'center',
  },
  desc: {
    marginVertical: hp('1%'),
    fontSize: wp('4%'),
    color: Colors.default,
    marginBottom: hp('2%'),
    fontFamily: 'Urbanist-Regular',
  },
});

export default FreeTrialCard;
