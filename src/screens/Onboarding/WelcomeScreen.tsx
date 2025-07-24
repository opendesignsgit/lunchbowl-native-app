import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
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
            <Image
              source={require('../../assets/images/WelcomScreens/welcomeImage.png')}
              style={WelcomeStyle.welcomeImage}
              resizeMode="contain"
            />
            <LinearGradient
              colors={['transparent', '#FFFFFF']}
              style={WelcomeStyle.imageFade}
            />
          </View>
          <View style={WelcomeStyle.centerRow}>
            <Text style={WelcomeStyle.title}>Welcome to{'\n'}Lunch Bowl !</Text>
            <Text style={WelcomeStyle.description}>
              Discover delicious meals delivered fast. Order, track, and enjoy
              your favorite food with Lunch Bowl!
            </Text>
            <View style={WelcomeStyle.button}>
              <PrimaryButton
                title="LET’S Get Started"
                onPress={GoToWalkthrowScreen}
                backgroundColor="#FF6514"
                textColor="#FFFFFF"
                borderRadius={8}
                paddingVertical={12}
                fontSize={16}
                textTransform="uppercase"
                fontFamily="Poppins-SemiBold"
              />
            </View>
          </View>
          <View style={WelcomeStyle.createAccountContainer}>
            <Text style={WelcomeStyle.text}>
              Already have an account?
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={WelcomeStyle.createAccountText}> Sign in</Text>
              </TouchableOpacity>
            </Text>
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
    height: hp('60%'),
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
    fontSize: wp('7%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
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
    width: wp('80%'),
    marginVertical: hp('1%'),
    marginBottom: hp('2%'),
    fontFamily: 'Urbanist-Bold',
    textTransform: 'uppercase',
  },

  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: wp('3.5%'),
    color: '##FF6514',
    fontWeight: '400',
    fontFamily: 'Poppins',
    transform: [{translateY: 3}],
  },
  text: {
    fontSize: wp('3.5%'),
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
});

export default WelcomeScreen;
