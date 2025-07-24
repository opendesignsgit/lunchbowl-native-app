import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

const Header: React.FC<HeaderProps> = ({title, onBackPress}) => {
  return (
    <View style={styles.headerContainer}>
      {/* First Row - Back Button and Title */}
      <View style={[styles.firstRow, {width: '90%'}]}>
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButtonContainer}>
          {/* <SvgXml xml={BackButtonNoBgSvg} width="25" height="25" /> */}
        </TouchableOpacity>
        <Text style={styles.header}>{title}</Text>
      </View>

      {/* Second Row - Divider */}
      <View style={styles.dividerContainer}>
        <LinearGradient
          colors={['#EEEEEE', '#EEEEEE']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.divider}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#AB2959',
    textAlign: 'center',
    fontFamily: 'Inter',
    flex: 1,
  },
  backButtonContainer: {
    marginRight: wp('2%'),
  },
  dividerContainer: {
    height: hp('0.2%'),
    width: '100%',
    // marginTop: hp('1%'),
    alignSelf: 'center',
  },
  divider: {
    height: hp('0.2%'),
  },
});

export default Header;
