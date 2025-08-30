import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPlanScreen from './Calender';
import FoodScreen from './FoodScreen';
import MenuSelectionScreen from './MenuSelection';
import {CalendarDateProvider} from '../../context/calenderContext';
import {MenuProvider} from 'context/MenuContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Registartion from 'screens/Subscription/Registration';
import PaymentWebView from 'screens/Subscription/Components/forms/PaymentWebView';
const Stack = createStackNavigator();

const MyPlanNavigator = () => {
  const [isFreeTrial, setIsFreeTrial] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFreeTrial = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log('free trail  data for navi', storedUser);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setIsFreeTrial(parsedUser.freeTrial ?? false);
        } else {
          setIsFreeTrial(false);
        }
      } catch (error) {
        console.error('Error checking free trial:', error);
        setIsFreeTrial(false);
      }
    };

    checkFreeTrial();
  }, []);

  if (isFreeTrial === null) {
    return null;
  }
  return (
    <MenuProvider>
      <CalendarDateProvider>
        <Stack.Navigator
          initialRouteName={isFreeTrial ? 'Registartion' : 'MyPlan'}>
          <Stack.Screen
            name="MenuSelection"
            component={MenuSelectionScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FoodList"
            component={FoodScreen}
            options={{headerShown: false}}
          />
          {isFreeTrial ? (
            <>
              <Stack.Screen
                name="Registartion"
                component={Registartion}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="WebViewScreen"
                component={PaymentWebView}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <Stack.Screen
              name="MyPlan"
              component={MyPlanScreen}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </CalendarDateProvider>
    </MenuProvider>
  );
};

export default MyPlanNavigator;
