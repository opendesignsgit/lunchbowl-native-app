import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'screens/Dashboard/HomeScreen';
import SettingsScreen from 'screens/Dashboard/Settings/SettingScreen';
import EditProfileScreen from 'screens/Dashboard/Settings/EditProfile/EditProfileScreen';


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
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
     
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
