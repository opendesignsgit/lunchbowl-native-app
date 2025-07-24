import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';

import DashboardNavigator from './Dashboard/DashboardNavigator';
import {HomeIcon, MenueIcon, MyPlanIcon, HistoryIcons} from 'styles/svg-icons';
import MenueNavigator from 'screens/Menu/MenueNavigator';
import MyPlanNavigator from 'screens/MyPlan/MyPlanNavigator';
import HistoryNavigator from 'screens/History/MyPlanNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconXml;

          if (route.name === 'Dashboard') {
            iconXml = HomeIcon.replace(
              '#4AB238',
              focused ? '#99671dff' : 'gray',
            );
          } else if (route.name === 'Menu') {
            iconXml = MenueIcon.replace(
              '#4AB238',
              focused ? '#99671dff' : 'gray',
            );
          } else if (route.name === 'MyPlan') {
            iconXml = MyPlanIcon.replace(
              '#4AB238',
              focused ? '#99671dff' : 'gray',
            );
          } else if (route.name === 'History') {
            iconXml = HistoryIcons.replace(
              '#4AB238',
              focused ? '#99671dff' : 'gray',
            );
          }

          return <SvgXml xml={iconXml ?? ''} width={80} height={80} />;
        },
        tabBarActiveTintColor: '#94571dff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      <Tab.Screen name="Menu" component={MenueNavigator} />
      <Tab.Screen name="MyPlan" component={MyPlanNavigator} />
      <Tab.Screen name="History" component={HistoryNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    borderTopWidth: 0,
    height: 60,
  },
});

export default AppNavigator;
