import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'screens/Dashboard/HomeScreen';


const Stack = createStackNavigator();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
   
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
