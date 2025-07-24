import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from 'components/buttons/SecondaryButton';

const Walkslides = [
  {
    id: 1,
    title: ['Create your', 'Account'],
    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisi lacus lacus euismod adipiscing adipi ',
    image: require('assets/images/WalkThrow/walk1.png'),
  },
  {
    id: 2,
    title: ['Choose Your', 'Menu'],

    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisis in vitae nibh quis nulla. Vulputate lacus',
    image: require('assets/images/WalkThrow/walk2.png'),
  },
  {
    id: 3,
    title: ['Place Your', 'Order'],

    description:
      'Lorem ipsum dolor sit amet consectetur. quis nulla. Vulputate lacus',
    image: require('assets/images/WalkThrow/walk3.png'),
  },
  {
    id: 4,
    title: ['Sit Back', 'Relax'],

    description: 'Lorem ipsum dolor sit amet consectetur. Vulputate lacus',
    image: require('assets/images/WalkThrow/walk4.png'),
  },
];

const WalkThroughScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < Walkslides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleBack = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const skipToLogin = () => {
    navigation.navigate('Login');
  };


  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.container}>
      {currentSlideIndex < Walkslides.length - 1 && (
        <View style={styles.mainskipContainer}>
          <View style={styles.skipContainer}>
            <Text style={styles.skipText} onPress={skipToLogin}>
              Skip
            </Text>
          </View>
        </View>
      )}

      <View style={styles.pagination}>
        {Walkslides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlideIndex === index ? styles.activeDot : {},
            ]}
          />
        ))}
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={Walkslides[currentSlideIndex].image}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {Walkslides[currentSlideIndex].title.map((word, index) => (
            <Text
              key={index}
              style={
                index === 0
                  ? styles.boldText
                  : index === 1
                  ? styles.highlightText
                  : {}
              }>
              {word}{' '}
            </Text>
          ))}
        </Text>

        <Text style={styles.description}>
          {Walkslides[currentSlideIndex].description}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {currentSlideIndex !== 0 && (
            <SecondaryButton
              title="Back"
              onPress={handleBack}
              borderRadius={wp('2%')}
              paddingVertical={hp('1.5%')}
              fontSize={wp('4%')}
              textTransform="uppercase"
              fontFamily="Poppins-SemiBold"
              backgroundColor="transparent"
            />
          )}
          <PrimaryButton
            title="Next"
            onPress={handleNext}
            textColor="#FFFFFF"
            borderRadius={wp('2%')}
            paddingVertical={hp('1.5%')}
            fontSize={wp('4%')}
            textTransform="uppercase"
            fontFamily="Poppins-SemiBold"
            style={currentSlideIndex === 0 ? {width: '100%'} : {}}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipContainer: {
    position: 'absolute',
    top: hp('2.3%'),
    right: wp('5%'),
    zIndex: 1,
  },
  mainskipContainer: {
    position: 'absolute',
    top: hp('5%'),
    right: wp('5%'),
    zIndex: 1,
    width: wp('80%'),
    alignItems: 'flex-end',
  },
  skipText: {
    color: '#FF6514',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-SemiBold',
    borderColor: '#FF6514',
    borderWidth: 1,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('10%'),
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 0.4,
    width: '100%',
    height: hp('40%'),
    justifyContent: 'flex-end',
  },
  welcomeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('7%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
    width: wp('60%'),
  },
  boldText: {
    fontSize: wp('7%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
    width: wp('100%'),
  },
  highlightText: {
    color: '#FF6514',
  },
  description: {
    fontSize: wp('4.2%'),
    textAlign: 'center',
    color: '#666666',
    marginBottom: hp('3%'),
    fontFamily: 'Urbanist',
    lineHeight: wp('6%'),
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp('2%'),
  },
  dot: {
    width: wp('20%'),
    height: wp('1%'),
    borderRadius: wp('1.5%'),
    backgroundColor: '#666666',
    marginHorizontal: wp('0.5%'),
  },
  activeDot: {
    backgroundColor: '#FF6514',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('4%'),
  },
});

export default WalkThroughScreen;
