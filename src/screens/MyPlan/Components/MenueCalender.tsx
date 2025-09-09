import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
import { useMenu } from 'context/MenuContext';
import { BackIcon } from 'styles/svg-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {
  daysOfWeek,
  monthNames,
  formatDate,
  getDaysInMonth,
  getFirstDayOfMonth,
  isHoliday,
  isStartDate,
  isEndDate,
  isWeekend,
  isInBetweenRange,
  isWithinRange,
  isPastDate,
} from '../../../utils/calendarUtils';

// --------------------
// Types
// --------------------
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

// --------------------
// Component
// --------------------
export default function MenueCalendar({
  onDateChange,
  holidays = [],
  currentMonth,
  currentYear,
  onMonthChange,
}: CalendarProps) {
  const { startDate, endDate } = useMenu();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  let holdTimeout: NodeJS.Timeout;

  if (!startDate || !endDate) return <Text>Loading calendar...</Text>;

  // --------------------
  // UI Helpers
  // --------------------
  const getGradientColors = (day: number, index: number) => {
    if (isStartDate(day, startDate, currentYear, currentMonth)) return [Colors.green, Colors.green];
    if (isEndDate(day, endDate, currentYear, currentMonth)) return [Colors.red, Colors.red];
    if (isInBetweenRange(day, startDate, endDate, currentYear, currentMonth, holidays) && !isWeekend(index))
      return [Colors.lightRed, Colors.lightRed];
    if (isHoliday(day, holidays, currentYear, currentMonth) || isWeekend(index))
      return [Colors.hoiday, Colors.hoiday];
    return ['transparent', 'transparent'];
  };

  const getTooltipText = (day: number, index: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    if (isStartDate(day, startDate, currentYear, currentMonth)) return `Plan Started: ${dateStr}`;
    if (isEndDate(day, endDate, currentYear, currentMonth)) return `Plan Ends: ${dateStr}`;
    if (isInBetweenRange(day, startDate, endDate, currentYear, currentMonth, holidays) && !isWeekend(index))
      return `Plan Ongoing: ${dateStr}`;
    if (isWeekend(index)) return `Weekend Holiday: ${dateStr}`;
    if (isHoliday(day, holidays, currentYear, currentMonth)) {
      const holidayName = holidays.find(h => h.date === dateStr)?.name || 'Holiday';
      return `Holiday: ${holidayName} (${dateStr})`;
    }
    return `Selected Date: ${dateStr}`;
  };

  const handleDateSelect = (day: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    const holiday = holidays.find(h => h.date === dateStr);
    setTooltipText(holiday ? `Holiday: ${holiday.name}` : `Selected  Date: ${dateStr}`);
    setSelectedDate(dateStr);
    onDateChange?.(dateStr);
  };

  // --------------------
  // Calendar Logic
  // --------------------
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarDays: (string | number)[] = [];
  for (let i = 0; i < firstDayIndex; i++) calendarDays.push('');
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  // --------------------
  // Render
  // --------------------
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            onMonthChange(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear)
          }>
          <SvgXml xml={BackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {monthNames[currentMonth].toUpperCase()}, {currentYear}
        </Text>
        <TouchableOpacity
          onPress={() =>
            onMonthChange(currentMonth === 11 ? 0 : currentMonth + 1, currentMonth === 11 ? currentYear + 1 : currentYear)
          }>
          <SvgXml xml={BackIcon} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekRow}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            style={[styles.weekDay, (day === 'Sat' || day === 'Sun') && styles.weekendText]}>
            {day}
          </Text>
        ))}
      </View>

      {/* Dates */}
      <View style={styles.daysContainer}>
        {calendarDays.map((day, index) => {
          if (day === '') return <View key={index} style={styles.dayCell} />;

          const dayNumber = day as number;
          const dateStr = formatDate(currentYear, currentMonth, dayNumber);
          const selected = selectedDate === dateStr;

          return (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              onPress={() => {
                if (
                  !isPastDate(dayNumber, currentYear, currentMonth) &&
                    isWithinRange(dayNumber, startDate, endDate, currentYear, currentMonth)) {
                  handleDateSelect(dayNumber);
                }
              }}
              onPressIn={() => {
                holdTimeout = setTimeout(() => {
                  setTooltipText(getTooltipText(dayNumber, index));
                  setTooltipVisible(true);
                }, 1000);
              }}
              onPressOut={() => {
                clearTimeout(holdTimeout);
                setTooltipVisible(false);
              }}>
              <LinearGradient colors={getGradientColors(dayNumber, index)} style={styles.dayCircle}>
                <Text
                  style={[
                    styles.dayText,
                    selected && styles.selectedText,
                    (isHoliday(dayNumber, holidays, currentYear, currentMonth) || isWeekend(index)) &&
                      styles.holidayText,
                  ]}>
                  {dayNumber}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tooltip */}
      {tooltipVisible && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{tooltipText}</Text>
        </View>
      )}
    </View>
  );
}

// --------------------
// Styles
// --------------------
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: hp('0.2%') },
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'),
    elevation: 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: Colors.primaryOrange,
    fontFamily: Fonts.Urbanist.bold,
  },
  weekRow: { flexDirection: 'row' },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: Colors.black,
    paddingVertical: 10,
    fontFamily: Fonts.Urbanist.bold,
    textTransform: 'uppercase',
  },
  weekendText: { color: Colors.red },
  daysContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  dayCircle: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: { fontSize: 16, color: Colors.black },
  selectedText: { fontWeight: 'bold', color: Colors.green },
  holidayText: { color: Colors.red, fontWeight: 'bold' },
  tooltip: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('10%'),
    right: wp('10%'),
    backgroundColor: Colors.primaryOrange,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
  },
  tooltipText: {
    color: Colors.white,
    fontFamily: Fonts.Urbanist.bold,
    fontSize: wp('4%'),
  },
});
