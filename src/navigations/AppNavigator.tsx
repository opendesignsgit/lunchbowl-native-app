import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DashboardNavigator from './Dashboard/DashboardNavigator';
import MenueNavigator from 'screens/Menu/MenueNavigator';
import MyPlanNavigator from 'screens/MyPlan/MyPlanNavigator';
import HistoryNavigator from 'screens/History/MyPlanNavigator';

import {HomeIcon, MenueIcon, MyPlanIcon, HistoryIcons} from 'styles/svg-icons';
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

          return (
            <View style={styles.iconContainer}>
              <SvgXml
                xml={iconXml ?? ''}
                width={wp('20%')}
                height={wp('20%')}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#ded6ceff',
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
    position: 'absolute',
    left: wp('0.5%'),
    right: wp('0.5%'),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    backgroundColor: '#fff',
    elevation: 10,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('9%'),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: hp('5%'),
  },
});

export default AppNavigator;
