import PrimaryButton from 'components/buttons/PrimaryButton';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function FreeTrialCard() {
  function FreeTrail(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.card}>
      <Text style={styles.desc}>
        Delicious and nutritious food that meets the dietary needs of growing
        children.
      </Text>
      <PrimaryButton
        title="Next"
        onPress={FreeTrail}
        textColor="#FFFFFF"
        borderRadius={wp('2%')}
        paddingVertical={hp('1.5%')}
        fontSize={wp('4%')}
        textTransform="uppercase"
        fontFamily="Poppins-SemiBold"
        style={{width: '100%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: wp('4%'),
    backgroundColor: '#FFF6F0',
    borderRadius: wp('3%'),
    borderRightWidth: wp('1%'),
    borderColor: '#F37520',
    width: '100%',
    alignSelf: 'center',
    marginVertical: hp('2%'),
  },
  desc: {
    marginVertical: hp('1%'),
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },
});
