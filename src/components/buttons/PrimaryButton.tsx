import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  paddingVertical?: number;
  fontSize?: number;
  icon?: React.ReactNode;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  fontFamily?: string;
  style?: ViewStyle;
};

export default function PrimaryButton({
  title,
  onPress,
  backgroundColor = '#FF6514',
  textColor = '#FFF',
  borderRadius = 8,
  paddingVertical = 12,
  fontSize = 16,
  icon = null,
  textTransform = 'none',
  fontFamily = 'System',
  style = {},
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          backgroundColor,
          borderRadius,
          paddingVertical,
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
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: wp(2),
  },
});
