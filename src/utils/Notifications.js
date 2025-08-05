import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const useFirebaseNotifications = () => {
  useEffect(() => {
    const init = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('🔥 FCM Token:', token);
        Alert.alert('FCM Token', token);
      } else {
        Alert.alert('Permission denied for notifications');
      }

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('📩 Foreground FCM:', remoteMessage);
        Alert.alert(
          remoteMessage.notification?.title ?? '',
          remoteMessage.notification?.body ?? '',
        );
      });

      return unsubscribe;
    };

    init();
  }, []);
};

export default useFirebaseNotifications;

