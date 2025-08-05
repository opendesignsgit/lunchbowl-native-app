import PrimaryButton from 'components/buttons/PrimaryButton';
import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');

const popularMealsMenue = [
  {
    id: 1,
    name: 'Grilled Chicken',
    description: 'With steamed veggies',
    image: require('../../../assets/images/Dashboard/Menues/menue1.png'),
  },
  {
    id: 2,
    name: 'Veg Salad Bowl',
    description: 'Healthy & fresh',
    image: require('../../../assets/images/Dashboard/Menues/menue1.png'),
  },
  {
    id: 3,
    name: 'Pasta Delight',
    description: 'Cheesy & spicy',
    image: require('../../../assets/images/Dashboard/Menues/menue1.png'),
  },
];

const PopularMenus = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (screenWidth * 0.8 + wp('4%')));
    setCurrentIndex(index);
  };

  function GotoMenue(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}>
        {popularMealsMenue.map(meal => (
          <View key={meal.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image
                source={meal.image}
                style={styles.image}
                resizeMode="cover"
              />

            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{meal.name}</Text>
              <Text style={styles.description}>{meal.description}</Text>

            </View>
            <PrimaryButton
              title="View Meal Info"
              onPress={GotoMenue}
              style={{ width: '90%' }}
            />


          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  scrollContainer: {
  },
  card: {
    width: screenWidth * 0.8,
    marginRight: wp('2%'),
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'flex-start',
  },

  imageWrapper: {
    width: wp('78%'),
    height: hp('40%'),
    overflow: 'hidden',
    marginTop: hp('2%'),
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%'),
    alignSelf: 'center',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  detailsContainer: {
    alignItems: 'flex-start',


    padding: wp('3%'),
    zIndex: 10,
  },
  title: {
    fontSize: wp('4.5%'),
    color: '#000000',
    fontFamily: 'Urbanist-Bold',
  },
  description: {
    fontSize: wp('3.5%'),
    color: '#777',
    textAlign: 'center',
    fontFamily: 'Opensans-Regular',
  },

});

export default PopularMenus;
