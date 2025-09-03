import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MealCategoryScreen from './Menu';
import {MealProvider} from 'context/MealContext';
import MealDetailScreen from './MealDetailScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createStackNavigator();

const MenueNavigator = () => {
  return (
    <MealProvider>
            <BottomSheetModalProvider>

      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Menu"
          component={MealCategoryScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="MealDetailScreen"
          component={MealDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
            </BottomSheetModalProvider>

    </MealProvider>
  );
};

export default MenueNavigator;
