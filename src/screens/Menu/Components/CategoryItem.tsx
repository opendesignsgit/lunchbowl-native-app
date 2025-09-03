import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';

type CategoryItemProps = {
  title: string;
  image: ImageSourcePropType;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  image,
  selected = false,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <View style={[styles.imageWrapper, selected && styles.active]}>
      <Image source={image} style={styles.image} />
    </View>
    <Text style={[styles.title, selected && styles.activeText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: wp('5%'),
    // width: wp('22%'),
  },
  imageWrapper: {
    backgroundColor: Colors.white,
    borderRadius: wp('15%'),
    borderWidth: wp('0.8%'),
    borderColor: Colors.white,
    width: wp('20%'),
    height: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  active: {
    borderColor: Colors.primaryOrange,
    borderWidth: wp('1.2%'),
  },
  image: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('12%'),
    resizeMode: 'cover',
  },
  title: {
    marginTop: wp('2%'),
    fontSize: wp('3.2%'),
    fontFamily: Fonts.Urbanist.regular,
    color: Colors.bodyText,
    textAlign: 'center',
  },
  activeText: {
    color: Colors.primaryOrange,
    fontFamily: Fonts.Urbanist.bold,
  },
});

export default CategoryItem;
