import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromoBanner from './Components/Carousel';
import SearchBar from './Components/Search';
import FreeTrialCard from './Components/FreeTrialCard';
import Header from './Components/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CardSlider from './Components/Carousel';
import SELChallengesSlideShow from './Components/Carousel';

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

  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoutContainer}>
          {/* <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity> */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Header userName={userName} />
          <SearchBar />

      
          <PromoBanner/>
          <FreeTrialCard />
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
});
