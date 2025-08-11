import React from 'react';
import {TouchableOpacity, StyleSheet, Linking} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const WhatsAppButton = () => (
  <TouchableOpacity
    style={styles.fab}
    onPress={() => Linking.openURL('https://wa.me/919999999999')}>
    {/* <Icon name="whatsapp" size={24} color="#fff" /> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25D366',
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },
});

export default WhatsAppButton;
