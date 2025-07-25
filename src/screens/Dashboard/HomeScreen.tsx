import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PromoBanner from './Components/Carousel';
import FreeTrialCard from './Components/FreeTrialCard';
import Header from './Components/Header';
import Highlights from './Components/Highlights';
import PopularMenus from './Components/PopularMenusMarquee';
import SchoolMarquee from './Components/SchoolsServes';
import SearchBar from './Components/Search';

//############## BANNER MOCK DATA ################
export const mockChallenges = [
  {
    _id: '1',
    name: 'Mindful Breathing',
    description:
      'Practice mindful breathing for 5 minutes every morning to improve focus and reduce stress.',
  },
  {
    _id: '2',
    name: 'Gratitude Journal',
    description:
      'Write down three things you are grateful for each day to build a positive mindset.',
  },
  {
    _id: '3',
    name: 'Acts of Kindness',
    description:
      'Perform one act of kindness every day — it could be a compliment or helping someone in need.',
  },
  {
    _id: '4',
    name: 'Emotional Check-In',
    description:
      'Spend a few minutes each evening identifying and reflecting on your emotions for the day.',
  },
];

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [userName, setUserName] = useState('User');

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.name || 'User');
          console.log('User loaded:', parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUserRole();
  }, []);

  function test(): void {
    throw new Error('Function not implemented.');
  }

  function onPressViewAll(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.1, y: 0}}
      end={{x: 0.1, y: 1}}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoutContainer}></View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header userName={userName} />
          <SearchBar />
          <PromoBanner />
          <Text style={styles.TextContainer}>Kick Start your Free Trial</Text>
          <FreeTrialCard />
          <Text style={styles.TextContainer}>Lunch Bowl’s Highlights</Text>
          <Highlights />
          <Text style={styles.TextContainer}>Schools We Serve</Text>
          <SchoolMarquee />
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Popular Menus</Text>
            <TouchableOpacity onPress={onPressViewAll}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <PopularMenus />
          <Text style={styles.TextContainer}>Quick Actions</Text>
          <Highlights />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('1%'),
    paddingTop: hp('2%'),
  },
  logoutContainer: {
    alignItems: 'flex-end',
  },
   headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    color: '#000',
    fontFamily:'Urbanist-SemiBold'
  },
  viewAll: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FF6B00', 
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
  },
  logoutText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },

  TextContainer: {
    marginLeft: 20,
    fontSize: wp('5%'),
    fontFamily: 'OpenSans-Bold',
    color: '#000',
    textAlign: 'left',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
});
