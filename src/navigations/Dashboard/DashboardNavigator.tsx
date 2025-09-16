import {createStackNavigator} from '@react-navigation/stack';
import {MealProvider} from 'context/MealContext';
import React from 'react';
import UnderConstruction from 'screens/404Screen';
import HomeScreen from 'screens/Dashboard/HomeScreen';
import MealDetailScreen from 'screens/Menu/MealDetailScreen';
import Notifications from 'screens/Notification/Notifications';
import EditProfileScreen from 'screens/Settings/EditProfile/EditProfileScreen';
import SettingsScreen from 'screens/Settings/SettingScreen';
const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <MealProvider>
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
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnderConstruction"
          component={UnderConstruction}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="MealDetailScreen"
          component={MealDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </MealProvider>
  );
};

export default DashboardNavigator;

// USER ROLE PREFRENCE  FOR FUTRE UPDATes

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createStackNavigator } from '@react-navigation/stack';
// import React, { useEffect, useState } from 'react';
// import AdminNavigator from './Child/AdminNavigator';
// import CustomerNavigator from './Child/CustomerNavigator';

// const Stack = createStackNavigator();
// const DashboardNavigator = () => {
//   const [userRole, setUserRole] = useState<string | null>(null);

//   useEffect(() => {
//     const getUserRole = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('user');
//         console.log('storedUser', storedUser);
//         if (storedUser) {
//           const parsedUser = JSON.parse(storedUser);
//           setUserRole(parsedUser.role || 'guest');
//         } else {
//           setUserRole('guest');
//         }
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//         setUserRole('guest');
//       }
//     };

//     getUserRole();
//   }, []);

//   if (userRole === null) {
//     return null;
//   }

//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       {userRole === 'customer' ? (
//         <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
//       ) : userRole === 'admin' ? (
//         <Stack.Screen name="AdminNavigator" component={AdminNavigator} />
//       ) : (
//         <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
//       )}
//     </Stack.Navigator>
//   );
// };

// export default DashboardNavigator;
