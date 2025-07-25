import PrimaryButton from 'components/buttons/PrimaryButton';
import React, {useRef, useState} from 'react';
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

const {width: screenWidth} = Dimensions.get('window');

const meals = [
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
        {meals.map(meal => (
          <View key={meal.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image
                source={meal.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>{meal.name}</Text>
            <Text style={styles.description}>{meal.description}</Text>
            <PrimaryButton
              title="View Meal Info"
              onPress={GotoMenue}
              textColor="#FFFFFF"
              borderRadius={wp('2%')}
              paddingVertical={hp('1.5%')}
              fontSize={wp('4%')}
              textTransform="uppercase"
              fontFamily="Poppins-SemiBold"
              style={{width: '100%'}}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('2%'),
  },
  scrollContainer: {
    paddingHorizontal: wp('2%'),
  },
  card: {
    width: screenWidth * 0.8,
    marginRight: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    padding: wp('4%'),
    alignItems: 'flex-start',
  },

  imageWrapper: {
    width: '100%',
    height: hp('50%'),
    overflow: 'hidden',
    marginBottom: hp('1%'),
  },

  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: wp('4.5%'),
    color: '#000',
    fontFamily: 'Urbanist-Bold',
  },
  description: {
    fontSize: wp('3.5%'),
    color: '#777',
    textAlign: 'center',
    fontFamily: 'Opensans-Regular',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
});

export default PopularMenus;
