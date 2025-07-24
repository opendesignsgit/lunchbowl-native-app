import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {
  GradientButton,
  GradientContinueButton,
} from '../../../components/Button/Button';
import GlobalStyles from '../../../styles/GlobalStyles';
import AuthService from '../../../services/authService/AuthService';
import {SignupForm} from '../../../models/authModel';
import {validateEmail} from '../../../utils/validators';
import {validatePassword} from '../../../utils/validators';
import {
  PasswordInput,
  ThemeInputStyleThree,
} from '../../../components/Input/Input';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../../../context/AuthContext';
import {LoadingModal} from 'components/LoadingModal/LoadingModal';
import ErrorModal from 'components/Error/ErrorModal';
import GradientCheckbox from 'components/CheckBox/GradientCheckBox';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ErrorMessage from 'components/Error/BoostrapStyleError';
import {ApiResponseModel} from 'src/models/apiResponseModel';

const SignupScreen = ({navigation}: {navigation: any}) => {
  // ----------------------------------------------  1. State Variables --------------------------------------------------
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const {signup} = useAuth();

  const [isChecked, setIsChecked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const formValid =
    name !== '' &&
    email !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    password === confirmPassword;
  // ----------------------------------------------  2. UseEffects Hooks -------------------------------------------------

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // Clear the error after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or error changes
    }
  }, [error]);

  // ----------------------------------------------  3. Functions ------------------------------------------------

  // ----------------------------------------------  4. Event Handlers --------------------------------------------------
  const handleCloseError = () => {
    setError(null);
  };
  const handleCheckboxChange = (checked: any) => {
    console.log('Checkbox state:', checked ? 'Checked' : 'Unchecked');
  };

  const handleSignup = async () => {
    try {
      setLoading(true); // Show loading modal when login starts
      validateEmail(email);
      // validatePassword(password);
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const signupData: SignupForm = {
        fullname: name,
        email,
        password,
      };

      const response: ApiResponseModel = await signup(signupData);
      console.log('Signup response:', response);
      if (response.success && response.data) {
        const userId = response.data.userId;
        console.log('User ID:', userId);
        if (!userId) {
          setError('User ID not found in the response');
          return;
        }
        navigation.navigate('ProfileSetup', {
          userId,
        });
      } else {
        setError(response.message || 'An unknown error occurred');
      }
    } catch (error: any) {
      console.log('Error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBoxToggle = (newValue: boolean) => {
    setIsChecked(newValue);
  };
  // ----------------------------------------------  5. Helper Functions ------------------------------------------------
  const handleClose = () => {
    setError(null); // Clear the error
  };

  // ----------------------------------------------  6. Render UI ------------------------------------------------

  // ----------------------------------------------  7. API: Handle States ------------------------------------------------

  // 1. Handle loading
  if (loading) {
    return <LoadingModal loading={loading} setLoading={setLoading} />;
  }

  // 2. Handle Error
  // {error && <ErrorMessage error={error} onClose={handleCloseError} />}
  // 3. Handle Empty response
  // if (!data) {
  //   return <Alert type="error" message="No data is available. Please try again later" />
  // }
  // 4. Handle Success

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={SignupScreenStyles.container}>
            <Image
              source={require('assets/images/logo.png')}
              style={SignupScreenStyles.logo}
            />
            <Text style={SignupScreenStyles.title}>Sign up with my App</Text>

            {error && <ErrorMessage error={error} onClose={handleCloseError} />}
            <View style={SignupScreenStyles.inputContainer}>
              <ThemeInputStyleThree
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
              <ThemeInputStyleThree
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <PasswordInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />
              <PasswordInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <View style={SignupScreenStyles.checkboxContainer}>
                <GradientCheckbox />
                <Text style={SignupScreenStyles.agreeText}>
                  I agree to My App{' '}
                  <Text style={SignupScreenStyles.termsText}>
                    Terms & Conditions
                  </Text>
                </Text>
              </View>
            </View>
            <GradientContinueButton
              title="Sign Up"
              onPress={handleSignup}
              style={{height: 50, justifyContent: 'center'}}
              disabled={!formValid}
            />
            <View style={SignupScreenStyles.SocialContainer}>
              <LinearGradient
                colors={['#EFEFEF', '#3231304F']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={SignupScreenStyles.divider}
              />
              {/* Social Buttons */}
              <TouchableOpacity style={SignupScreenStyles.socialButton}>
                <Image
                  source={require('assets/icons/SocialiconGoogle.png')}
                  style={SignupScreenStyles.socialIcon}
                />
                <Text style={SignupScreenStyles.socialButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={SignupScreenStyles.socialButton}>
                <Image
                  source={require('assets/icons/SocialiconMicrosoft.png')}
                  style={SignupScreenStyles.socialIcon}
                />
                <Text style={SignupScreenStyles.socialButtonText}>
                  Continue with Microsoft
                </Text>
              </TouchableOpacity>
              <View style={SignupScreenStyles.createAccountContainer}>
                <Text style={SignupScreenStyles.text}>
                  Already have an account?
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={SignupScreenStyles.createAccountText}>
                      {' '}
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const SignupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
  },
  logo: {
    alignSelf: 'center',
    height: wp('25%'),
    width: wp('25%'),
    marginBottom: hp('5%'),
  },
  inputContainer: {
    gap: hp('2%'),
  },
  SocialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    ...GlobalStyles.GlobalStyles,
    textAlign: 'center',
    fontSize: wp('4%'),
  },
  googleButton: {
    marginTop: hp('3%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: '800',
    color: '#A71D55',
    width: '100%',
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
  },
  agreeText: {
    fontSize: wp('3.5%'),
    color: '#000000',
    fontWeight: '400',
    textAlign: 'center',
  },
  termsText: {
    color: '#AB2959',
    fontSize: wp('3.5%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: wp('2%'),
    paddingVertical: hp('0.1%'),
    transform: [{translateY: -11}],
  },
  checkbox: {
    marginRight: wp('2%'),
  },
  socialIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('3%'),
  },
  socialButtonText: {
    fontSize: wp('4%'),
    color: '#121212',
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    width: '80%',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    marginVertical: hp('0.3%'),
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  createAccountText: {
    fontSize: wp('3.5%'),
    color: '#AB2959',
    fontWeight: '400',
    fontFamily: 'Poppins',
    transform: [{translateY: 3}],
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: hp('3%'),
  },
  text: {
    fontSize: wp('3.5%'),
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
});

export default SignupScreen;
