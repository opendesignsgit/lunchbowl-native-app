import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDataMessage: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>No customers available</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    message: {
        fontSize: 16,
        color: '#555',
    },
});

export default NoDataMessage;