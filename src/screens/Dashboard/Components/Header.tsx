import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BellIcon, DefultProfilePic} from 'styles/svg-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface HeaderProps {
  userName: string;
  navigation: any;
}

export default function Header({userName, navigation}: HeaderProps) {
  const goToSettings = () => {
    navigation.navigate('Settings'); 
  };
    const goNotification = () => {
    navigation.navigate('notifications'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text
          style={styles.greeting}
          numberOfLines={1}
          ellipsizeMode="tail"
          adjustsFontSizeToFit>
          Hello, {userName || 'Guest'}!
        </Text>
        <Text style={styles.subtitle}>Welcome to Lunch Bowl</Text>
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={goNotification}>
          <SvgXml xml={BellIcon} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToSettings}>
          <SvgXml xml={DefultProfilePic} style={styles.profile} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    alignItems: 'center',
  },
  textSection: {
    flex: 1,
    paddingRight: wp('3%'),
  },
  greeting: {
    fontSize: wp('7.5%'),
    color: '#F37520',
    fontFamily: 'Urbanist-SemiBold',
  },
  subtitle: {
    fontSize: wp('3.5%'), 
    color: '#000000',
    fontFamily: 'Urbanist-SemiBold',
    marginTop: hp('0.5%'),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: wp('6%'), // ~24
    height: wp('6%'),
    marginRight: wp('3%'),
  },
  profile: {
    width: wp('8%'), // ~32
    height: wp('8%'),
    borderRadius: wp('4%'),
  },
});
