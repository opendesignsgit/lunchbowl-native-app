import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BackIcon} from 'styles/svg-icons';

interface CustomCalendarProps {
  days?: string[];
  onDateChange?: (date: string) => void;
  containerStyle?: ViewStyle;
  dateTextStyle?: TextStyle;
  selectedDateStyle?: ViewStyle;
  selectedDateTextStyle?: TextStyle;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MenueCalendar: React.FC<CustomCalendarProps> = ({
  days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  onDateChange,
  containerStyle,
  dateTextStyle,
  selectedDateStyle,
  selectedDateTextStyle,
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const getDaysInMonth = (month: number, year: number): number =>
    new Date(year, month + 1, 0).getDate();

  const monthDates = Array.from(
    {length: getDaysInMonth(currentMonth, currentYear)},
    (_, i) => `${i + 1}`.padStart(2, '0'),
  );

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    onDateChange?.(
      `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, '0')}-${date}`,
    );
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setSelectedDate(null); 
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setSelectedDate(null);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Text style={styles.navText}>
            {' '}
            <SvgXml xml={BackIcon} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {monthNames[currentMonth].toUpperCase()}, {currentYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navText}>
            {' '}
            <SvgXml xml={BackIcon} />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Week Day Labels */}
      <View style={styles.weekDaysRow}>
        {days.map(day => (
          <Text key={day} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>

      {/* Dates */}
      <View style={styles.dateGrid}>
        {monthDates.map(date => (
          <TouchableOpacity
            key={date}
            style={[
              styles.dateCircle,
              selectedDate === date && [styles.dateSelected, selectedDateStyle],
            ]}
            onPress={() => handleDatePress(date)}>
            <Text
              style={[
                styles.dateText,
                dateTextStyle,
                selectedDate === date && [
                  styles.dateSelectedText,
                  selectedDateTextStyle,
                ],
              ]}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MenueCalendar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
     borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  navButton: {
    padding: 8,
  },
  navText: {
    fontSize: 20,
    color: '#007bff',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    color: '#555',
    fontWeight: '500',
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#f0f0f0',
  },
  dateSelected: {
    backgroundColor: '#007bff',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  dateSelectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

{
  /* <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <SvgXml xml={BackIcon} style={styles.Icons} />

          <Text style={styles.monthText}>APRIL , 2025</Text>
          <SvgXml xml={BackIcon} style={styles.Icons} />
        </View>

        <View style={styles.weekDaysRow}>
          {days.map(day => (
            <Text key={day} style={styles.dayLabel}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.dateGrid}>
          {monthDates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateCircle,
                selectedDate === date && styles.dateSelected,
              ]}
              onPress={() => handleDatePress(date)}>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === date && styles.dateSelectedText,
                ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View> */
}

// const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// const monthDates = Array.from({length: 30}, (_, i) =>
//   `${i + 1}`.padStart(2, '0'),
// );

// const handleDatePress = (date: string) => {
//   setSelectedDate(date);
// };
