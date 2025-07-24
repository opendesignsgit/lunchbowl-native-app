import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface SecondaryButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    style?: object; // Optional style prop
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title, onPress, disabled = false }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ffb600',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#e0e0e0',
        borderColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SecondaryButton;