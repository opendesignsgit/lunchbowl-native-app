
import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onHide?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide?.();
        });
      }, 2500);
    });
  }, []);

  return (
    <Animated.View style={[styles.container, styles[type], { opacity: fadeAnim }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
  },
  success: {
    backgroundColor: '#4BB543',
  },
  error: {
    backgroundColor: '#FF4C4C',
  },
  info: {
    backgroundColor: '#2D9CDB',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Toast;

