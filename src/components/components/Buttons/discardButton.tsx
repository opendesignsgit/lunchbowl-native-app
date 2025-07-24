import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface DiscardButtonProps {
    onPress: () => void;
    title: string;
    style?: object; 
}

const DiscardButton: React.FC<DiscardButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default DiscardButton;