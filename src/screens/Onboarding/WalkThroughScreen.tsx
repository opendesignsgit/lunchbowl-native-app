import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
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
      'Lorem ipsum dolor sit amet consectetur. Facilisis in vitae nibh quis nulla. Vulputate lacus lacus euismod adipiscing adipi scing lacinia. Sed ut fermentum. ',
    image: require('assets/images/WalkThrow/walk1.png'),
  },
  {
    id: 2,
    title: ['Choose Yours', 'Menu'],

    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisis in vitae nibh quis nulla. Vulputate lacus lacus euismod adipiscing adipi scing lacinia. Sed ut fermentum. ',
    image: require('assets/images/WalkThrow/walk2.png'),
  },
  {
    id: 3,
    title: ['Place Your', 'Order'],

    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisis in vitae nibh quis nulla. Vulputate lacus lacus euismod adipiscing adipi scing lacinia. Sed ut fermentum. ',
    image: require('assets/images/WalkThrow/walk3.png'),
  },
  {
    id: 4,
    title: ['Sit Back ', 'Relax'],

    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisis in vitae nibh quis nulla. Vulputate lacus lacus euismod adipiscing adipi scing lacinia. Sed ut fermentum. ',

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
      {/*############### MAIN CONTAINER  ############## */}
      <View style={styles.mainContent}>
        {/*############### SKIP CONTAINER  ############## */}
        <View style={styles.topSection}>
          {currentSlideIndex < Walkslides.length - 1 && (
            <View style={styles.skipContainer}>
              <Text style={styles.skipText} onPress={skipToLogin}>
                Skip
              </Text>
            </View>
          )}
          {/*############ PAGINATION CONTAINER  ############ */}

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
        </View>
        {/*############ IMAGE  CONTAINER  ############ */}

        <View style={styles.imageContainer}>
          <Image
            source={Walkslides[currentSlideIndex].image}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/*############ BOTTOM CONTAINER  ############ */}
        <View style={styles.buttonWithTextContainer}>
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
          </View>

          <Text style={styles.description}>
            {Walkslides[currentSlideIndex].description}
          </Text>
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
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    width: wp('100%'),
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSection: {
    marginTop: hp('4%'),
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: wp('5%'),
  },
  skipContainer: {},

  skipText: {
    color: '#FF6514',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-SemiBold',
    borderColor: '#FF6514',
    borderWidth: 1,
    textTransform: 'uppercase',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('10%'),
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp('1.5%'),
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
  imageContainer: {
    flex: 3,
    width: '100%',
    height: hp('40%'),
    justifyContent: 'flex-end',
  },
  welcomeImage: {
    width: wp('90%'),
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('9%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'center',
    width: wp('60%'),
  },
  boldText: {
    fontSize: wp('9%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-SemiBold',
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

  buttonWithTextContainer: {
    width: '100%',
    alignItems: 'flex-end',
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
