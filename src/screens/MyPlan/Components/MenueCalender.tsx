import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BackIcon} from 'styles/svg-icons';

interface Holiday {
  id: string;
  name: string;
  date: string;
}

interface CalendarProps {
  onDateChange?: (date: string) => void;
  holidays?: Holiday[];
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MenueCalendar({
  onDateChange,
  holidays = [],
  currentMonth,
  currentYear,
  onMonthChange,
}: CalendarProps) {

  const [selectedDate, setSelectedDate] = useState<string>('');
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (month: number, year: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

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

  let calendarDays: (string | number)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push('');
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  const isHoliday = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    return holidays.some(h => h.date === dateStr);
  };
  const handleDateSelect = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    onDateChange?.(dateStr);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <SvgXml xml={BackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {monthNames[currentMonth].toUpperCase()}, {currentYear}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <SvgXml xml={BackIcon} style={{transform: [{rotate: '180deg'}]}} />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekRow}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            style={[
              styles.weekDay,
              day === 'Sat' || day === 'Sun' ? styles.weekendText : null,
            ]}>
            {day}
          </Text>
        ))}
      </View>

      {/* Dates */}
      <View style={styles.daysContainer}>
        {calendarDays.map((day, index) => {
          if (day === '') {
            return <View key={index} style={styles.dayCell} />;
          }

          const holiday = isHoliday(day as number);
          const isSelected =
            selectedDate ===
            `${currentYear}-${String(currentMonth + 1).padStart(
              2,
              '0',
            )}-${String(day).padStart(2, '0')}`;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                holiday && styles.holidayBg,
                isSelected && styles.selectedBg,
              ]}
              onPress={() => handleDateSelect(day as number)}>
              <Text
                style={[
                  styles.dayText,
                  (index % 7 === 5 || index % 7 === 6) && !holiday
                    ? styles.weekendText
                    : null,
                  holiday ? styles.holidayText : null,
                  isSelected ? styles.selectedText : null,
                ]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, backgroundColor: '#ffffff', borderRadius: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#FF6514',
    fontFamily: 'Urbanist-Bold',
  },
  weekRow: {flexDirection: 'row'},
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  weekendText: {color: 'red'},
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  dayText: {fontSize: 16},
  holidayBg: {backgroundColor: '#FFE5E5', borderRadius: 100},
  holidayText: {color: '#FF0000', fontWeight: 'bold'},
  selectedBg: {backgroundColor: '#FF6514', borderRadius: 100},
  selectedText: {color: '#FFF', fontWeight: 'bold'},
});
