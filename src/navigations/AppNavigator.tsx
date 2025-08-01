import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

import HistoryNavigator from 'screens/History/MyPlanNavigator';
import MenueNavigator from 'screens/Menu/MenueNavigator';
import MyPlanNavigator from 'screens/MyPlan/MyPlanNavigator';
import DashboardNavigator from './Dashboard/DashboardNavigator';

import {
  HistoryIconActive,
  HistoryIconInactive,
  HomeIconActive,
  HomeIconInactive,
  MenuIconActive,
  MenuIconInactive,
  MyPlanIconActive,
  MyPlanIconInactive,
} from 'styles/svg-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconXml;

          switch (route.name) {
            case 'Home':
              iconXml = focused ? HomeIconActive : HomeIconInactive;
              break;
            case 'Menu':
              iconXml = focused ? MenuIconActive : MenuIconInactive;
              break;
            case 'MyPlan':
              iconXml = focused ? MyPlanIconActive : MyPlanIconInactive;
              break;
            case 'History':
              iconXml = focused ? HistoryIconActive : HistoryIconInactive;
              break;
          }

          return (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.iconWrapperFocused,
              ]}>
              {focused && <View style={styles.topIndicator} />}
              <SvgXml
                xml={iconXml ?? ''}
                width={wp('6.5%')}
                height={wp('6.5%')}
              />
            </View>
          );
        },
        tabBarButton: props => (
          <Pressable
            onPress={props.onPress}
            style={({pressed}) => [{flex: 1, opacity: pressed ? 0.6 : 1}]}>
            {props.children}
          </Pressable>
        ),
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Urbanist-Regular',
          fontSize: 14,
          marginTop: '20%',
        },
        tabBarActiveTintColor: '#FF5B00',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={DashboardNavigator} />
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
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    backgroundColor: '#ffffff',
    elevation: 10,
    height: hp('9%'),
    paddingBottom: hp('0.7%'),
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: hp('4%'),
    marginLeft: wp('15%'),
  },

  iconWrapperFocused: {
    backgroundColor: '#FFEEE3',
    padding: wp('8%'),
    marginTop: hp('4%'),
  },
  topIndicator: {
    position: 'absolute',
    top: 0,
    width: wp('15%'),
    height: hp('0.5%'),
    borderTopLeftRadius: wp('2%'),
    borderTopRightRadius: wp('2%'),
    backgroundColor: '#FF5B00',
  },
});

export default AppNavigator;
