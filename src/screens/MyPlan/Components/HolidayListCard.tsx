import PrimaryButton from 'components/buttons/PrimaryButton';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
interface HolidayItem {
  date: string;
  name: string;
}

interface HolidayListCardProps {
  holidays: HolidayItem[];
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  card: {
    borderWidth: 1,
    borderColor: '#f97316',
    borderRadius: 12,
    padding: 24,
    backgroundColor: '#ffffff',
    borderStyle: 'dashed',
  },
  holidayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 20,
    color: '#f97316',
    marginRight: 6,
  },
  holidayText: {
    fontSize: 18,
    color: '#374151',
    fontFamily: 'OpenSans-Regular',
    textTransform: 'capitalize',
  },
  date: {
    fontWeight: '600',
  },
  note: {
    marginTop: 10,
    fontSize: 13,
    color: '#6b7280',
  },
  dot: {
    fontSize: 14,
  },
  bold: {
    fontWeight: '600',
    color: '#000',
  },
  button: {
    backgroundColor: '#ff6600',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
