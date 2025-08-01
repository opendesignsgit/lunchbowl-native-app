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
  wrapper: {alignItems: 'center', marginRight: wp('5%')},
  imageWrapper: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  active: {
    borderColor: '#FF5B00',
    borderWidth: 2,
  },
  image: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 25,
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    color: '#444',
  },
  activeText: {
    color: '#FF5B00',
    fontWeight: '600',
  },
});

export default CategoryItem;
