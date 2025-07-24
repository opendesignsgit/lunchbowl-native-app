import React from 'react';
import {TextInput, StyleSheet, TextInputProps, View, Text} from 'react-native';

interface PrimaryInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, ...(errorMessage ? [styles.errorInput] : [])]}
        {...props}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: 'red',
  },
});

export default PrimaryInput;
