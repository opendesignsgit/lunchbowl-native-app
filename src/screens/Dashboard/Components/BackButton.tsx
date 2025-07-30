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
          style={styles.backButtonContainer}>
          <SvgXml xml={HeaderBackIcon} />
        </TouchableOpacity>

        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {},
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  headerText: {
    fontSize: wp('4%'),
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Urbanist-Regular',
    flex: 1,
    textTransform: 'uppercase',
  },
  backButtonContainer: {
    marginRight: wp('1%'),
  },
});

export default HeaderBackButton;
