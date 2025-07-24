import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  paddingVertical?: number;
  fontSize?: number;
  icon?: React.ReactNode;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  fontFamily?: string;
};

export default function SecondaryButton({
  title,
  onPress,
  backgroundColor = 'transparent',
  textColor = '#8C8C8C',
  borderColor = '#8C8C8C',
  borderRadius = 8,
  paddingVertical = 12,
  fontSize = 16,
  icon = null,
  textTransform = 'none',
  fontFamily = 'OpenSans-ExtraBold',
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderRadius,
          paddingVertical,
          borderWidth: 1,
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontSize,
              textTransform,
              fontFamily,
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1.2),
    alignSelf: 'center',
  },
  text: {
    color: '#060101ff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: wp(2),
  },
});
