// import React, {useEffect} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomerNavigator from './Child/CustomerNavigator';
// import ViewNotifications from 'screens/Dashboard/Notification/Notifications';
// import AdminNavigator from './Child/AdminNavigator';
// // import ViewNotifications from '../../screens/Dashboard/MainDashboard/Notifications/ViewNotifications';
// const Stack = createStackNavigator();

// const DashboardNavigator = () => {
//   // const [userRole, setUserRole] = React.useState('guest');
//   const [userRole, setUserRole] = React.useState<string | null>(null);

//   useEffect(() => {
//     const getUserRole = async () => {
//       const storedUser = await AsyncStorage.getItem('user');
//       console.log('storedUser', storedUser);
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         setUserRole(parsedUser.role || 'guest');
//       }
//     };

//     getUserRole();
//   }, []);

//   if (userRole === null) {
//     return null;
//   }

//   const initialRoute =
//     userRole === 'admin'
//       ? 'customer'
//       : userRole === 'customer'
//       ? 'admin'
//       : 'Dashboard';

//   return (
//     <Stack.Navigator>
//       {/* Common Screens like Notification */}
//       {userRole === 'customer' ? (
//         <Stack.Screen
//           name="customerNavigator"
//           component={CustomerNavigator}
//           options={{headerShown: false}}
//         />
//       ) : userRole === 'admin' ? (
//         <Stack.Screen
//           name="adminNavigotor"
//           component={AdminNavigator}
//           options={{headerShown: false}}
//         />
//       ) : null}
//       <Stack.Screen
//         name="ViewNotifications"
//         component={ViewNotifications}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

// export default DashboardNavigator;

import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomerNavigator from './Child/CustomerNavigator';
import AdminNavigator from './Child/AdminNavigator';
import ViewNotifications from 'screens/Dashboard/Notification/Notifications';

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log('storedUser',storedUser)
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserRole(parsedUser.role || 'guest');
        } else {
          setUserRole('guest');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('guest');
      }
    };

    getUserRole();
  }, []);

  if (userRole === null) {
    return null; 
  }

  return (
    <Stack.Navigator>
      {userRole === 'customer' && (
        <Stack.Screen
          name="CustomerNavigator"
          component={CustomerNavigator}
          options={{ headerShown: false }}
        />
      )}

      {userRole === 'admin' && (
        <Stack.Screen
          name="AdminNavigator"
          component={AdminNavigator}
          options={{ headerShown: false }}
        />
      )}

      {/* Common screen */}
      <Stack.Screen
        name="ViewNotifications"
        component={ViewNotifications}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;

