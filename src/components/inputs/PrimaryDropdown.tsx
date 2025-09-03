import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

import {SearchIcon} from 'styles/svg-icons';
import { Colors } from 'assets/styles/colors';

type DropdownOption = {
  label: string;
  value: string | number;
};

type Props = {
  options: DropdownOption[];
  placeholder?: string;
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
};

const PrimaryDropdown: React.FC<Props> = ({
  options,
  placeholder = 'Select an option',
  selectedValue,
  onValueChange,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor:Colors.primaryOrange}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={options}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={selectedValue}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        onValueChange(item.value);
        setIsFocus(false);
      }}
      // renderLeftIcon={() => (
      //   <SvgXml
      //     xml={SearchIcon}
      //     width={wp('5%')}
      //     height={hp('2.5%')}
      //     style={styles.icon}
      //   />
      // )}
      renderItem={item => (
        <View
          style={
            selectedValue === item.value
              ? styles.selectedItem
              : styles.itemContainer
          }>
          {selectedValue === item.value ? (
            <LinearGradient
              colors={[Colors.primaryOrange, Colors.red, Colors.primaryOrange,]}
              style={styles.gradientItem}>
              {/* <SvgXml
                xml={SearchIcon}
                width={wp('4%')}
                height={hp('2%')}
                style={styles.tickIcon}
              /> */}
              <Text style={styles.selectedItemText}>{item.label}</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.itemText}>{item.label}</Text>
          )}
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: hp('6%'),
    borderColor: Colors.Storke,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),
    backgroundColor:Colors.white,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Colors.bodyText,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.black,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  icon: {
    marginRight: wp('2%'),
  },
  itemContainer: {
    padding: hp('1%'),
  },
  selectedItem: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('1%'),
    borderRadius: 8,
  },
  tickIcon: {
    marginRight: wp('2%'),
  },
  selectedItemText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  itemText: {
    color: Colors.bodyText,
  },
});

export default PrimaryDropdown;
