import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../config/apiConfig';

const GoogleAuthScreen = () => {
  const [showWebView, setShowWebView] = useState(false);

  const handleGoogleLogin = () => {
    setShowWebView(true); // Show WebView to load the Google OAuth URL
  };

  const extractTokenFromUrl = (url: string): string | null => {
    const tokenMatch = url.match(/token=([^&]+)/);
    return tokenMatch ? tokenMatch[1] : null;
  };

  const onNavigationStateChange = async (navState: any) => {
    const {url} = navState;

    // Check if the URL contains the token
    if (url.includes('auth/success?token=')) {
      const token = extractTokenFromUrl(url);

      if (token) {
        // Store token securely using AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        Alert.alert('Login Success', 'You are now authenticated');
        setShowWebView(false); // Hide WebView after successful login
      } else {
        Alert.alert('Authentication failed', 'Token not found');
      }
    }
  };

  const renderWebView = () => {
    return (
      <WebView
        source={{uri: `${API_URL}/auth/google`}} // Your backend Google OAuth URL
        onNavigationStateChange={onNavigationStateChange}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {!showWebView ? (
        <Button title="Continue with Google" onPress={handleGoogleLogin} />
      ) : (
        renderWebView() // Render WebView when the button is pressed
      )}
    </View>
  );
};

export default GoogleAuthScreen;
