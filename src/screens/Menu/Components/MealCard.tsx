import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type MealCardProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
};

const MealCard: React.FC<MealCardProps> = ({image, title, description, onPress}) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>VIEW MEAL INFO</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: hp('1%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  desc: {
    color: '#666',
    fontSize: 12,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#FF5B00',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MealCard;
