import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';

const Stack = createStackNavigator();

const MyPlanNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyPlan">
      <Stack.Screen
        name="MyPlan"
        component={MainScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MyPlanNavigator;
