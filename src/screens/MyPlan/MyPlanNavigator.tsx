import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPlanScreen from './Calender';
import FoodScreen from './FoodScreen';

const Stack = createStackNavigator();

const MyPlanNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyPlan"> 
        <Stack.Screen
        name="MyPlan"
        component={MyPlanScreen}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="FoodList"
        component={FoodScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MyPlanNavigator;
