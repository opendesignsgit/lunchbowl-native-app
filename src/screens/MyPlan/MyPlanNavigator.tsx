import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from 'context/AuthContext';
import {MenuProvider} from 'context/MenuContext';
import {UserProfileProvider} from 'context/UserDataContext';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import PaymentWebView from 'screens/Subscription/Components/forms/PaymentWebView';
import Registartion from 'screens/Subscription/Registration';
import RegistrationService from 'services/RegistartionService/registartion';
import {CalendarDateProvider} from '../../context/calenderContext';
import MyPlanScreen from './Calender';
import FoodScreen from './FoodScreen';
import MenuSelectionScreen from './MenuSelection';
import {useNetwork} from 'hooks/useNetwork';
import OfflineScreen from 'screens/OfflineScreen';
const Stack = createStackNavigator();

const MyPlanNavigator = () => {
  const [screenToShow, setScreenToShow] = useState<string | null>(null);
  const {userId} = useAuth();
  const {isConnected} = useNetwork({onReconnect: decideInitialRoute});

  async function decideInitialRoute() {
    if (!userId) {
      setScreenToShow('Registartion');
      return;
    }
    const payload: any = {_id: userId, path: 'Step-Check'};
    try {
      const response: any = await RegistrationService.registartionCheck(
        payload,
      );
      const step = Number(response?.data?.step);
      if (Number.isFinite(step) && step >= 4) {
        setScreenToShow('MyPlan');
      } else {
        setScreenToShow('Registartion');
      }
    } catch (error) {
      console.error('Error checking step:', error);
      setScreenToShow('Offline');
              setScreenToShow('Registartion');

    }
  }

  useEffect(() => {
    if (isConnected) {
      decideInitialRoute();
    } else {
      setScreenToShow('Offline');
    }
  }, [userId, isConnected]);

  useEffect(() => {
    if (!isConnected) {
      Toast.show({type: 'error', text1: ' You are Offline'});
      setScreenToShow('Offline');
    } else {
      decideInitialRoute();
    }
  }, [isConnected]);

  // if (!isConnected || screenToShow === 'Offline') {
  //   return <OfflineScreen />;
  // }

  if (!screenToShow) return null;

  return (
    <MenuProvider>
      <UserProfileProvider>
        <CalendarDateProvider>
          <Stack.Navigator initialRouteName={screenToShow}>
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
            <Stack.Screen
              name="MyPlan"
              component={MyPlanScreen}
              options={{headerShown: false}}
            />
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
          </Stack.Navigator>
        </CalendarDateProvider>
      </UserProfileProvider>
    </MenuProvider>
  );
};

export default MyPlanNavigator;
