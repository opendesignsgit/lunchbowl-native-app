import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from 'screens/Dashboard/HomeScreen';
import Notifications from 'screens/Notification/Notifications';
import SettingsScreen from 'screens/Settings/SettingScreen';
const Stack = createStackNavigator();
const CustomerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
 
      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
