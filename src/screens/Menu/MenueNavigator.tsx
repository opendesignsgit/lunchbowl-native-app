import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MealCategoryScreen from './Menu';

const Stack = createStackNavigator();

const MenueNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen
        name="Menu"
        component={MealCategoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MenueNavigator;
