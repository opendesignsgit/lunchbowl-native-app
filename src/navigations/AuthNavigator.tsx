import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import SignupScreen from '../screens/Auth/Signup/SignupScreen';
import GoogleAuthScreen from '../screens/Auth/GoogleAuth/GoogleAuthScreen';
import ForgotPasswordNavigator from '../screens/Auth/ForgotPassword/ForgotPasswordNavigator';
import OnBoardingNavigator from './OnBoardingNavigator';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import WalkThroughScreen from 'screens/Onboarding/WalkThroughScreen';
import OtpVerificationScreen from 'screens/Auth/Login/OtpVerificationScreen';


const Stack = createStackNavigator();
// OnBoarding
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="WalkThroughScreen"
        component={WalkThroughScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
          <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
        options={{headerShown: false}}
      />
      {/*
      <Stack.Screen name="GoogleAuth" component={GoogleAuthScreen} />
      <Stack.Screen name="MicrosoftAuth" component={GoogleAuthScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordNavigator}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
