import React, {useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const GradientActivityIndicator: React.FC = () => {
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000, // One full rotation per second
        useNativeDriver: true,
        easing: Easing.linear, // Ensures smooth rotation
      }),
    ).start();
  }, []);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: rotateInterpolation}]}}>
        <Svg width={40} height={40} viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#DB2533" stopOpacity="1" />
              <Stop offset="50%" stopColor="#AC2959" stopOpacity="1" />
              <Stop offset="100%" stopColor="#7C2D7E" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#grad)"
            strokeWidth="10"
            strokeDasharray="251" // Total circumference
            strokeDashoffset="30" // The gap in the circle
            fill="white"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Background color of the screen
    height: 20,
    width: 20,
    marginTop: 40, // Slight adjustment below the logo
  },
});

export default GradientActivityIndicator;
