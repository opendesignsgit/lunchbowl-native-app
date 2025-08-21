import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { HeaderBackIcon } from 'styles/svg-icons';

interface HeaderWithBackButtonDividerProps {
  title: string;
}

const HeaderBackButton: React.FC<HeaderWithBackButtonDividerProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={[styles.firstRow, { width: '90%' }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backWrapper}>
          <SvgXml xml={HeaderBackIcon} />
          <Text style={styles.headerText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // marginLeft: 10
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  backWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Urbanist-Bold',

  },
  headerText: {
    fontSize: wp('5%'),
    color: '#000000',
    marginLeft: wp('2%'),
    fontFamily: 'Urbanist-Bold',
    textTransform: 'uppercase',
  },
});

export default HeaderBackButton;
