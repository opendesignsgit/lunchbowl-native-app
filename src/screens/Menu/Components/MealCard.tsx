import PrimaryButton from 'components/buttons/PrimaryButton';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type MealCardProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
};
function FreeTrail(): void {
  throw new Error('Function not implemented.');
}
const MealCard: React.FC<MealCardProps> = ({ image, title, description, onPress }) => (

  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      <PrimaryButton
        title="View Meal info"
        onPress={FreeTrail}
        style={{ width: '100%' }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: hp('1%'),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    elevation: 0,
  },
  image: {
    width: wp('35%'),
    height: wp('35%'),
    borderRadius: wp('2.5%'),
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    color: '#000000',

  },
  desc: {
    color: '#67686A',
    fontSize: 12,
    marginVertical: 5,
  },

});

export default MealCard;


