import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import OrderHistoryScreen from './OrderHistoryScreen';

const Stack = createStackNavigator();

const HistoryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OrderHistory">
      <Stack.Screen
        name="History"
        component={MainScreen}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};

export default HistoryNavigator;
