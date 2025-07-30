import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import MainNavigator from './src/navigations/MainNavigator';
import {StatusBar, Platform, SafeAreaView, StyleSheet} from 'react-native';

const App = () => (
  <AuthProvider>
    <StatusBar
      barStyle="dark-content"
      backgroundColor="#ffffff"
      translucent={true}
    />
    <SafeAreaView style={styles.safeArea}>
      <MainNavigator />
    </SafeAreaView>
  </AuthProvider>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
  },
});

export default App;
