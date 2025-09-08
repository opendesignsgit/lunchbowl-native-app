import {Colors} from 'assets/styles/colors';
import Fonts from 'assets/styles/fonts';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {BackIcon} from 'styles/svg-icons';
import {useMenu} from 'context/MenuContext';
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

  startDate?: string;
  endDate?: string;
}
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MenueCalendar({
  onDateChange,
  holidays = [],
  currentMonth,
  currentYear,
  onMonthChange,
}: CalendarProps) {
  const {startDate, endDate} = useMenu();

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  let holdTimeout: NodeJS.Timeout; // for tracking long press

  if (!startDate || !endDate) {
    return <Text>Loading calendar...</Text>;
  }
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

    const holiday = holidays.find(h => h.date === dateStr);
    if (holiday) {
      setTooltipText(`Holiday: ${holiday.name}`);
    } else {
      setTooltipText(`Selected Date: ${dateStr}`);
    }

    setSelectedDate(dateStr);
    onDateChange?.(dateStr);
  };

  //################### RANGE COLOR KU KUDUKURA####################
  const isStartDate = (day: number) => {
    if (!startDate) return false;
    const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    return dayStr === startDate;
  };

  const isEndDate = (day: number) => {
    if (!endDate) return false;
    const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    return dayStr === endDate;
  };

  const isInBetweenRange = (day: number) => {
    if (!startDate || !endDate) return false;

    const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;

    // skip if holiday
    if (isHoliday(day)) return false;

    const dayDate = new Date(dayStr);
    const start = new Date(startDate);
    const end = new Date(endDate);
    dayDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return dayDate > start && dayDate < end;
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

          const isWeekend = (index: number) =>
            index % 7 === 5 || index % 7 === 6;

          return (
            <TouchableOpacity
              key={index}
              // ##############################################################################
              // ########################## // BACKGROND CHNAGES CELSS ########################
              // ##############################################################################

              style={[
                styles.dayCell,
                holiday && styles.holidayBg,
                isSelected && styles.selectedBg,
                isWeekend(index) && !holiday && styles.weekendBg,
                isStartDate(day as number) && styles.startDateBg,
                isEndDate(day as number) && styles.endDateBg,
                isInBetweenRange(day as number) &&
                  !isWeekend(index) &&
                  styles.rangeBg,
              ]}
              onPress={() => handleDateSelect(day as number)}
              onPressIn={() => {
                holdTimeout = setTimeout(() => {
                  const dateStr = `${currentYear}-${String(
                    currentMonth + 1,
                  ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const holiday = holidays.find(h => h.date === dateStr);
                  setTooltipText(
                    holiday
                      ? `Holiday: ${holiday.name}`
                      : `Selected Date: ${dateStr}`,
                  );
                  setTooltipVisible(true);
                }, 3000);
              }}
              onPressOut={() => clearTimeout(holdTimeout)}>
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
      {/* Tooltip Modal */}
      <Modal
        transparent
        visible={tooltipVisible}
        animationType="fade"
        onRequestClose={() => setTooltipVisible(false)}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPressOut={() => setTooltipVisible(false)}>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 16,
              borderRadius: 12,
              minWidth: wp('50%'),
              alignItems: 'center',
              elevation: 5,
            }}>
            <Text style={{fontFamily: Fonts.Urbanist.bold, fontSize: 16}}>
              {tooltipText}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    //  Shadow (iOS)
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: hp('0.2%')},
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'),
    //  Shadow (Android)
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
  weekRow: {
    flexDirection: 'row',
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: Colors.black,
    paddingVertical: 10,
    fontFamily: Fonts.Urbanist.bold,
    textTransform: 'uppercase',
  },
  weekendText: {
    color: Colors.red,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    color: Colors.black,
  },

  startDateBg: {
    backgroundColor: Colors.green,
    borderRadius: wp('10%'),
    padding: wp('1%'),
  },
  endDateBg: {
    backgroundColor: Colors.endDate,
    borderRadius: wp('10%'),
    padding: wp('1%'),
  },
  rangeBg: {
    backgroundColor: '#8ac9db2d',
    borderRadius: wp('10%'),
    padding: wp('1%'),
  },

  holidayBg: {
    backgroundColor: Colors.lightRed,
    borderRadius: wp('10%'),
    padding: wp('1%'),
  },
  weekendBg: {
    backgroundColor: Colors.lightRed,
    borderRadius: wp('10%'),
    padding: wp('1%'),
  },

  holidayText: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  selectedBg: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: wp('10%'),
    padding: wp('1.5%'),
  },
  selectedText: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
});
