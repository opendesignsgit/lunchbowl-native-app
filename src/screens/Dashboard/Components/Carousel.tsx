import { Colors } from 'assets/styles/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');

const banners = [
  {
    id: 1,
    image: require('../../../assets/images/Banners/banner5.png'),
  },
  {
    id: 2,
    image: require('../../../assets/images/Banners/banner2.png'),
  },
];

const PromoBanners = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) nextIndex = 0;
      scrollRef.current?.scrollTo({
        x: nextIndex * screenWidth * 0.9 + wp('3%') * nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (screenWidth * 0.9 + wp('3%')));
    setCurrentIndex(index);
  };

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
        {banners.map(banner => (
          <View key={banner.id} style={styles.imageWrapper}>
            <Image
              source={banner.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index ? styles.activeDot : {}]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('2%'),
  },
  scrollContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    width: screenWidth * 0.9,
    height: hp('22%'), 
    marginRight: wp('3%'),
    borderRadius: wp('3%'), 
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp('3%'),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  dot: {
    width: wp('2%'),
    height: hp('0.8%'),
    borderRadius: wp('1%'),
    backgroundColor: Colors.lightRed,
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: Colors.primaryOrange,
    width: wp('6%'),
    height: hp('0.8%'),
    borderRadius: wp('1%'),
  },
});

export default PromoBanners;
