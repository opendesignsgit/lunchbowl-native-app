import React from 'react';
import {
  Dimensions,
  FlatList,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

const ViewNotifications: React.FC<{navigation: any}> = ({navigation}) => {

  const handleLogout = async () => {
  try {
    await AsyncStorage.clear(); 
    navigation.replace('Login'); 
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  const renderNotification = ({item}: {item: Notification}) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => console.log(item.message)}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <View style={styles.logoutContainer}>
  
</View>

    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EEEEEE', '#EEEEEE']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.divider}
      />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.logoutContainer}>
  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
</View>

    </View>
    
  );
};

const {width, height} = Dimensions.get('window');
const scaleSize = (size: number) => size * (width / 375);
const scaleFont = (size: number) =>
  size * (PixelRatio.getFontScale() * (width / 375));

const scale = (size: number) => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
  },
  header: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scale(20),
  },
  notificationList: {
    paddingBottom: scale(20),
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: scale(16),
    borderRadius: scale(8),
    marginBottom: scale(10),
    elevation: 1,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: height * 0.015,
  },
  notificationContent: {
    flexDirection: 'column',
  },
  notificationTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scale(4),
  },
  notificationMessage: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: scale(8),
  },
  notificationTime: {
    fontSize: scale(12),
    color: '#999',
  },
  logoutContainer: {
  alignItems: 'flex-end',
  marginBottom: scale(10),
},
logoutButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FF6B6B',
  paddingVertical: scale(8),
  paddingHorizontal: scale(12),
  borderRadius: scale(6),
},
logoutText: {
  color: '#fff',
  marginLeft: scale(6),
  fontWeight: 'bold',
  fontSize: scale(14),
},

});

export default ViewNotifications;
