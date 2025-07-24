import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromoBanner from './Components/Carousel';
import SearchBar from './Components/Search';
import FreeTrialCard from './Components/FreeTrialCard';
import Header from './Components/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header userName="you" />
        <SearchBar />
        <PromoBanner />
        <FreeTrialCard />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
  logoutContainer: {
    alignItems: 'flex-end',
    padding: wp('2%'),
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
