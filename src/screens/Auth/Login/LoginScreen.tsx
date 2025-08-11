import CheckBox from '@react-native-community/checkbox';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import PrimaryButton from 'components/buttons/PrimaryButton';
import ErrorMessage from 'components/Error/BoostrapStyleError';
import {LoadingModal} from 'components/LoadingModal/LoadingModal';
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {facebookIcon, googleIcon, logo} from 'styles/svg-icons';
import {useAuth} from '../../../context/AuthContext';

const LoginScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const [error, setError] = useState<string | null>(null);
  const {SendOtp, isProfileSetupDone, userId} = useAuth();
  const [loading, setLoading] = useState(false);
  const {message, success} = route.params || {message: null, success: null};
  const [loginSuccess, setLoginSuccess] = useState(false);
  const phoneInputRef = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneKey, setPhoneKey] = useState(Date.now());
  const [formattedValue, setFormattedValue] = useState('');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        handleCloseError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const halndleSendOtp = async () => {
    if (!isPrivacyChecked) {
      setError('Please agree to the privacy policy to continue.');
      return;
    }
    if (!formattedValue) {
      setError('Please enter a valid phone number.');
      return;
    }

    let mobile = formattedValue.replace('+', '');

    if (mobile.startsWith('91') && mobile.length === 12) {
      mobile = mobile.slice(2);
    }

    const path = 'logIn';
    console.log('mobile', mobile);

    try {
      setLoading(true);
      const LoginData = {mobile, path};
      console.log('Login Data:', LoginData);

      const response = await SendOtp(LoginData);

      if (response && response.message && response.otp) {
        navigation.navigate('OtpVerificationScreen', {
          mobile,
          path: 'logIn-otp',
          otp: response.otp,
        });
      } else {
        setError('Something went wrong while sending OTP.');
      }
    } catch (error) {
      console.log('Error:', error);
      setError(
        error instanceof Error ? error.message : 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    navigation.navigate('GoogleAuth');
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <ThemeGradientBackground>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <SvgXml xml={logo} style={styles.logo} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Log in</Text>
                <Text style={styles.subtitleText}>
                  Enter your mobile number to continue. sample 7428730894
                </Text>
              </View>

              {error && (
                <ErrorMessage error={error} onClose={handleCloseError} />
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number*</Text>
                <PhoneInput
                  key={phoneKey}
                  ref={phoneInputRef}
                  defaultValue={phoneNumber}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={text => setPhoneNumber(text)}
                  onChangeFormattedText={text => setFormattedValue(text)}
                  withShadow
                  autoFocus={false}
                  containerStyle={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    paddingVertical: 0,
                    marginTop: 0,
                    elevation: 0,
                    marginBottom: 10,
                  }}
                  textContainerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: 50,
                    paddingVertical: 10,
                  }}
                  textInputStyle={{
                    fontSize: 16,
                    paddingVertical: 8,
                    height: 40,
                  }}
                />

                <View style={[styles.checkboxContainer]}>
                  <CheckBox
                    value={isPrivacyChecked}
                    onValueChange={setIsPrivacyChecked}
                    tintColors={{true: '#FF6514', false: '#FF6514'}}
                  />
                  <Text style={styles.checkboxLabel}>
                    By clicking, I accept the{' '}
                    <Text
                      style={styles.linkText}
                      onPress={() =>
                        navigation.navigate('T&C & PrivacyPolicy')
                      }>
                      Privacy Policy
                    </Text>
                  </Text>
                </View>

                <PrimaryButton
                  title="Send One Time Password"
                  onPress={halndleSendOtp}
                />
              </View>
              <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or Login with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialButtonRow}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleGoogleLogin}>
                  <SvgXml xml={googleIcon} style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <SvgXml xml={facebookIcon} style={styles.socialIcon} />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>Don’t have an Account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.createAccountLink}>Signup</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <LoadingModal loading={loading} setLoading={setLoading} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemeGradientBackground>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    padding: wp('8%'),
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  logo: {
    width: wp('30%'),
    height: wp('30%'),
  },
  title: {
    alignItems: 'flex-end',
    fontFamily: 'Urbanist-Regular',
    flexDirection: 'row',
  },
  titleContainer: {
    marginBottom: hp('3%'),
  },

  titleText: {
    fontSize: wp('8%'),
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
    marginBottom: hp('0.5%'),
    textTransform: 'uppercase',
  },

  subtitleText: {
    fontSize: wp('4%'),
    color: '#666',
    fontFamily: 'OpensSans-Regular',
  },
  label: {
    fontSize: wp('5%'),
    color: '#000',
    fontFamily: 'Urbanist-SemiBold',
    marginBottom: hp('1%'),
  },

  inputContainer: {
    marginBottom: hp('2%'),
    marginVertical: hp('1.5%'),
    gap: hp('1%'),
    fontSize: wp('14%'),
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionContainer: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  checkboxContainer: {
    width: '100%',
    marginVertical: hp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxBox: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    borderWidth: 1,
    borderColor: '#999',
    marginRight: wp('2.5%'),
    borderRadius: 4,
    backgroundColor: '#fff',
  },

  checkboxChecked: {
    backgroundColor: '#FF6514',
    borderColor: '#FF6514',
  },

  checkboxLabel: {
    fontSize: wp('3.8%'),
    color: '#7f7f7fff',
    fontFamily: 'OpensSans-Reugular',
    flexShrink: 1,
  },

  linkText: {
    color: '#FF6514',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('2%'),
    width: '100%',
    gap: wp('2%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: wp('2%'),
  },
  orText: {
    fontSize: hp('2%'),
    color: '#333',
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    width: '48%',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    marginVertical: hp('0.3%'),
  },
  socialButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: wp('3%'),
    marginBottom: hp('2%'),
  },

  socialIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('3%'),
  },
  socialButtonText: {
    fontSize: wp('4%'),
    color: '#121212',
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  signInButton: {
    height: hp('6%'),
    justifyContent: 'center',
    width: '100%',
  },
  footer: {
    marginTop: hp('5%'),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp('4%'),
    color: '#000',
  },
  createAccountLink: {
    fontSize: wp('4%'),
    color: '#FF6514',
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default LoginScreen;
