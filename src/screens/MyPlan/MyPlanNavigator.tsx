import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPlanScreen from './Calender';
import FoodScreen from './FoodScreen';
import MenuSelectionScreen from './MenuSelection';
import {CalendarDateProvider} from '../../context/calenderContext';
import {MenuProvider} from 'context/MenuContext';
const Stack = createStackNavigator();

const MyPlanNavigator = () => {
  return (
    <MenuProvider>
      <CalendarDateProvider>
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
          <Stack.Screen
            name="MenuSelection"
            component={MenuSelectionScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </CalendarDateProvider>
    </MenuProvider>
  );
};

export default MyPlanNavigator;
