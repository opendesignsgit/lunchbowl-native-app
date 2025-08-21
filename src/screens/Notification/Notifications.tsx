import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'You have a new message from John.',
    time: '2 mins ago',
  },
  {
    id: '2',
    title: 'Order Update',
    message: 'Your order #1234 has been shipped.',
    time: '1 hour ago',
  },
  {
    id: '3',
    title: 'Reminder',
    message: "Don't forget to attend the meeting tomorrow.",
    time: '5 hours ago',
  },
  {
    id: '4',
    title: 'Promo Alert',
    message: 'Get 20% off on your next purchase!',
    time: '1 day ago',
  },
];

const Notifications: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ThemeGradientBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#EEEEEE', '#EEEEEE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />

        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.notificationItem}
            onPress={() => console.log(item.message)}
          >
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemeGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: hp('1.5%'),
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    elevation: 1,
  },
  notificationContent: {
    flexDirection: 'column',
  },
  notificationTitle: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  notificationMessage: {
    fontSize: wp('3.8%'),
    color: '#666',
    marginBottom: hp('0.8%'),
  },
  notificationTime: {
    fontSize: wp('3.2%'),
    color: '#999',
  },
  logoutContainer: {
    alignItems: 'flex-end',
    marginTop: hp('2%'),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('3.8%'),
  },
});

export default Notifications;

