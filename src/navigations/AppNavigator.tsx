import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
// import DashboardNavigator from './Dashboard/DashboardNavigator';
// import ProfileStackNavigator from './SettingNavigator';
import DashboardNavigator from './Dashboard/DashboardNavigator';
// const dashboardIcon = require('../assets/icons/dashboard/dashboard.png');
// const profileIcon = require('../assets/icons/dashboard/settings.png');

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          let iconSource;
          // if (route.name === 'Dashboard') {
          //   iconSource = dashboardIcon;
          // } else if (route.name === 'Profile') {
          //   iconSource = profileIcon;
          // }

          return (
            <Image
              source={iconSource}
              style={[styles.icon, {tintColor: focused ? '#99671dff' : 'gray'}]}
            />
          );
        },
        tabBarActiveTintColor: '#94571dff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      {/* <Tab.Screen name="Profile" component={ProfileStackNavigator} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffff',
    elevation: 0,
    borderTopWidth: 0,
    height: 60,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default AppNavigator;
