import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selected Date of Birth:</Text>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <Button title="Select D.O.B" onPress={showDatePicker} />
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()} 
                />
            )}
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
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    dateText: {
        fontSize: 18,
        marginBottom: 16,
    },
});

export default DatePicker;
