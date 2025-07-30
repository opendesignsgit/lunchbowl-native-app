import React, {useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryButton from 'components/buttons/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  //############### STATE VARIABLES #####################
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  //############### HOOKS #################################

  useEffect(() => {
    const scrollAnimation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: wp('100%') * 10,
        duration: 60000,
        useNativeDriver: false,
      }),
    );
    scrollX.addListener(({value}) => {
      scrollRef.current?.scrollTo({x: value, animated: false});
    });
    scrollAnimation.start();
    return () => {
      scrollX.removeAllListeners();
      scrollAnimation.stop();
    };
  }, []);

  //############### HELPER FUNCTION #################################
  const GoToWalkthrowScreen = async () => {
    try {
      //await AsyncStorage.setItem('isAppIntroDone', 'true');
      navigation.navigate('WalkThroughScreen');
    } catch (error) {
      console.error('Error setting isAppIntroDone in AsyncStorage', error);
    }
  };

  return (
    <SafeAreaView style={WelcomeStyle.safeArea}>
      <ScrollView
        contentContainerStyle={WelcomeStyle.scrollContent}
        bounces={false}>
        <View style={WelcomeStyle.container}>
          <View style={WelcomeStyle.imageContainer}>
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={{flexDirection: 'row'}}>
              {Array.from({length: 10}).map((_, index) => (
                <Image
                  key={index}
                  source={require('../../assets/images/WelcomScreens/welcomeImage.png')}
                  style={WelcomeStyle.welcomeImage}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>

            <LinearGradient
              colors={['transparent', '#FFFFFF']}
              style={WelcomeStyle.imageFade}
            />
          </View>

          <View style={WelcomeStyle.centerRow}>
            <Text style={WelcomeStyle.title}>Welcome to{'\n'}Lunch Bowl !</Text>
            <Text style={WelcomeStyle.description}>
              Lorem ipsum dolor sit amet consectetur. Facilisis in vitae nibh
              quis nulla. Vulputate lacus lacus euismod adipiscing adipi scing
              lacinia. Sed ut fermentum.
            </Text>
            <View style={WelcomeStyle.button}>
              <PrimaryButton
                title="LET’S Get Started"
                onPress={GoToWalkthrowScreen}
              />
            </View>
            <View style={WelcomeStyle.loginContainer}>
              <Text style={WelcomeStyle.text}>Already have an Account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={WelcomeStyle.createAccountText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WelcomeStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    height: hp('80%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomRow: {
    height: hp('20%'),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  welcomeImage: {
    width: wp('100%'),
    height: hp('60%'),
    resizeMode: 'contain',
  },
  imageContainer: {
    width: wp('100%'),
    height: hp('55%'),
    position: 'relative',
    justifyContent: 'flex-end',
  },

  imageFade: {
    position: 'absolute',
    bottom: 0,
    height: hp('40%'),
    width: '100%',
  },

  title: {
    fontSize: wp('8%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'center',
    width: wp('100%'),
  },
  description: {
    fontSize: wp('4.5%'),
    color: '#67686A',
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    fontFamily: 'OpenSans-Regular',
    width: wp('80%'),
  },
  centerRow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: hp('2%'),
  },
  button: {
    marginVertical: hp('1%'),
    marginBottom: hp('2%'),
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: wp('3.9%'),
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
  },

  createAccountText: {
    fontSize: wp('3.9%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
  },
});

export default WelcomeScreen;
