import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import ViewNotifications from '../../screens/Dashboard/MainDashboard/Notifications/ViewNotifications';

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  // const [userRole, setUserRole] = React.useState('guest');
  const [userRole, setUserRole] = React.useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserRole(parsedUser.role || 'guest');
      }
    };

    getUserRole();
  }, []);

  if (userRole === null) {
    return null;
  }

  const initialRoute =
    userRole === 'admin'
      ? 'customer'
      : userRole === 'customer'
      ? 'admin'
      : 'Dashboard';

  return (
    <Stack.Navigator>
      {/* Common Screens like Notification */}
      {userRole === 'customer' ? (
        <Stack.Screen
          name="customerNavigator"
          component={StudentNavigator}
          options={{headerShown: false}}
        />
      ) : userRole === 'admin' ? (
        <Stack.Screen
          name="adminNavigotor"
          component={TeacherNavigator}
          options={{headerShown: false}}
        />
      ) : null}
      <Stack.Screen
        name="ViewNotifications"
        component={ViewNotifications}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
