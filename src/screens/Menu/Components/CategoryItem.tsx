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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    height: wp('50%'),
    width: wp('22%'),
  },
  imageWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 60,
    borderWidth: 30,
    borderColor: '#ffffff',
    width: wp('20%'),
    height: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    borderColor: '#FF5B00',
    borderWidth: 30,
    fontFamily:'Urbanist-Regular'
  },
  image: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 100,
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  activeText: {
    color: '#FF5B00',
    fontWeight: '600',
  },
});


export default CategoryItem;
