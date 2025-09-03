
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPlanScreen from './Calender';
import FoodScreen from './FoodScreen';
import MenuSelectionScreen from './MenuSelection';
import { CalendarDateProvider } from '../../context/calenderContext';
import { MenuProvider } from 'context/MenuContext';
import Registartion from 'screens/Subscription/Registration';
import PaymentWebView from 'screens/Subscription/Components/forms/PaymentWebView';
import RegistrationService from 'services/RegistartionService/registartion';
import { useAuth } from 'context/AuthContext';

const Stack = createStackNavigator();

const MyPlanNavigator = () => {
  const [screenToShow, setScreenToShow] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const payload: any = {
      _id: userId,
      path: 'Step-Check',
    };

    const decideInitialRoute = async () => {
      try {
        const response: any = await RegistrationService.registartionCheck(payload);
        const step = Number(response?.data?.step);

        // Only step 4 (or higher) can see MyPlan; others go to Registartion
        if (Number.isFinite(step) && step >= 4) {
          setScreenToShow('MyPlan');
        } else {
          setScreenToShow('Registartion');
        }
      } catch (error) {
        console.error('Error checking step:', error);
        // On any error, default to Registartion
        setScreenToShow('Registartion');
      }
    };

    if (userId) {
      decideInitialRoute();
    } else {
      // No user yet → send to Registartion
      setScreenToShow('Registartion');
    }
  }, [userId]);

  if (screenToShow === null) {
    return null; // or show a loader if you prefer
  }

  return (
    <MenuProvider>
      <CalendarDateProvider>
        <Stack.Navigator initialRouteName={screenToShow}>
          <Stack.Screen
            name="MenuSelection"
            component={MenuSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FoodList"
            component={FoodScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyPlan"
            component={MyPlanScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registartion"
            component={Registartion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WebViewScreen"
            component={PaymentWebView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </CalendarDateProvider>
    </MenuProvider>
  );
};

export default MyPlanNavigator;
