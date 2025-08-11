import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDataFound: React.FC<{ message?: string }> = ({ message = 'No data found' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📭 {message}</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
