import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Holiday} from 'src/model/calendarModels';

interface HolidayListCardProps {
  holidays: Holiday[];
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric'};
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const HolidayListCard: React.FC<HolidayListCardProps> = ({holidays}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {holidays.map((holiday, index) => (
          <View style={styles.holidayRow} key={index}>
            <Text style={styles.bullet}>◆</Text>
            <Text style={styles.holidayText}>
              <Text style={styles.date}>{formatDate(holiday.date)}</Text> -{' '}
              {holiday.name}
            </Text>
          </View>
        ))}

        <Text style={styles.note}>
          <Text style={styles.dot}>🔴⚪</Text> Denotes{' '}
          <Text style={styles.bold}>Weekends & Holidays.</Text>
        </Text>
      </View>
    </View>
  );
};

export default HolidayListCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: hp('2%'),
    borderRadius: wp('5%'),
  },
  card: {
    borderWidth: 1,
    borderColor: '#f97316',
    borderRadius: wp('5%'),
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#ffffff',
    borderStyle: 'dashed',
  },
  holidayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },
  bullet: {
    fontSize: wp('5%'),
    color: '#f97316',
    marginRight: wp('2%'),
  },
  holidayText: {
    fontSize: wp('4%'),
    color: '#374151',
    fontFamily: 'OpenSans-Regular',
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  date: {
    fontWeight: '600',
  },
  note: {
    marginTop: hp('1.5%'),
    fontSize: wp('3.5%'),
    color: '#6b7280',
  },
  dot: {
    fontSize: wp('4%'),
  },
  bold: {
    fontWeight: '600',
    color: '#000000',
  },
});
