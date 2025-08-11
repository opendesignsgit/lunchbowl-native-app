import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const options = [
  { icon: 'person', label: 'Child Name' },
  { icon: 'document-text', label: 'Status' },
  { icon: 'calendar', label: 'Date' },
];

const SortButtons = () => {
  return (
    <View style={styles.container}>
      {options.map((item, index) => (
        <TouchableOpacity style={styles.button} key={index}>
          {/* <Ionicons name={item.icon} size={16} color="#000" /> */}
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    marginLeft: 6,
    fontSize: 13,
    color: '#000',
  },
});

export default SortButtons;
