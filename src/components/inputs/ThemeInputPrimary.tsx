import React from 'react';
import {TextInput, StyleSheet, TextInputProps, View, Text} from 'react-native';

interface ThemeInputPrimaryProps extends TextInputProps {
  label?: string;
  error?: string;
}

const ThemeInputPrimary: React.FC<ThemeInputPrimaryProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style, error ? styles.inputError : undefined]}
        placeholderTextColor="#888"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 8,
  },
  label: {
    marginBottom: 5,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
  },
  inputError: {
    borderColor: '#e53935',
  },
  error: {
    marginTop: 4,
    color: '#e53935',
    fontSize: 12,
  },
});

export default ThemeInputPrimary;
