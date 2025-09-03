import {Colors} from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
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
  disabled?: boolean;
  disabledBackgroundColor?: string; 
  disabledTextColor?: string;    
};

// export default function PrimaryButton({
//   title,
//   onPress,
//   backgroundColor = Colors.primaryOrange,
//   textColor = Colors.white,
//   borderRadius = 8,
//   paddingVertical = 18,
//   fontSize = 14,
//   icon = null,
//   textTransform = 'uppercase',
//   fontFamily = Fonts.Urbanist.bold,
//   disabledBackgroundColor = Colors.formdisableState, 
//   disabledTextColor = Colors.bg,   
//    disabled = false,  
//   style = {},
// }: PrimaryButtonProps) {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.button,
//         style,
//         {
//           backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
//           borderRadius,
//           paddingVertical,
//         },
//       ]}
//       activeOpacity={0.8}
//       onPress={disabled ? undefined : onPress} 
//       disabled={disabled}>
//       <View style={styles.content}>
//         {icon && <View style={styles.icon}>{icon}</View>}
//         <Text
//           style={[
//             styles.text,
//             {
//               color: disabled ? disabledTextColor : textColor,
//               fontSize,
//               textTransform,
//               fontFamily,
//             },
//           ]}>
//           {title}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: hp(1.2),
//     alignSelf: 'center',
//     width: wp('90%'),
//   },
//   text: {
//     fontWeight: '600',
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginRight: wp(2),
//   },
// });
export default function PrimaryButton({
  title,
  onPress,
  backgroundColor = Colors.primaryOrange,
  textColor = Colors.white,
  borderRadius = wp('2%'),
  fontSize = wp('3.8%'), // responsive font
  icon = null,
  textTransform = 'uppercase',
  fontFamily = Fonts.Urbanist.bold,
  disabledBackgroundColor = Colors.formdisableState,
  disabledTextColor = Colors.bg,
  disabled = false,
  style = {},
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
          borderRadius,
        },
      ]}
      activeOpacity={0.8}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text
          style={[
            styles.text,
            {
              color: disabled ? disabledTextColor : textColor,
              fontSize,
              textTransform,
              fontFamily,
            },
          ]}
          numberOfLines={1} // prevents overflow
          ellipsizeMode="tail" // adds dots if too long
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('1%'),
    alignSelf: 'center',
    width: wp('90%'),
    height: hp('5%'), 
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: wp('2%'),
  },
});
