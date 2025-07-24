import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { burgerIcon } from '../../assets/svg';

interface DrawerHeaderProps {
  title: string;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {/* Drawer Button */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}>
        <SvgXml xml={burgerIcon} width={25} height={25} style={styles.icon} />
      </TouchableOpacity>
      

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Logo */}
  
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.logo}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  menuButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    marginRight: 5,
    width: 20,
    height: 20,
  },
});

export default DrawerHeader;
