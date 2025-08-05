import React, { ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function ThemeGradientBackground({ children, style }: Props) {
  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      locations={[0, 0.1, 0.25]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.1, y: 1 }}
      style={[styles.gradient, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
