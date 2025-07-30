import React, {useCallback, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MenueCalendar from 'screens/MyPlan/Components/MenueCalender';
import HolidayListCard from './Components/HolidayListCard';
import HolidayService from 'services/MyPlansApi/HolidayService';
import {useFocusEffect} from '@react-navigation/native';
import NoDataFound from 'components/Error/NoDataMessage';
import PrimaryButton from 'components/buttons/PrimaryButton';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';

const mockPlan = {
  userName: 'Sanjay',
  plan: '30 Working Days',
  amount: '₹ 6,000',
  expiryDate: '31/04/2025',
  status: 'Active',
};

const MyPlanScreen: React.FC<{navigation: any}> = ({navigation}) => {
  //######### STATE VARIABLES  ##############################

  const [selectedDate, setSelectedDate] = useState('08');
  const [holidays, setHolidays] = useState([]);

  //######### HOOKS ############################################

  useFocusEffect(
    useCallback(() => {
      GetHolidays();
    }, []),
  );

  //######### GET HOLIDAYS API CALL ############################

  const GetHolidays = async () => {
    try {
      const response: any = await HolidayService.getAllHolidays();
      if (response && response.data) {
        const holidays = response.data.map((holiday: any) => ({
          id: holiday._id,
          name: holiday.name,
          date: holiday.date,
        }));
        setHolidays(holidays);
      } else {
        console.error('Invalid data format', response);
      }
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  function onViewFoodList(): void {
    navigation.navigate('FoodList');
  }

  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBackButton title="My Plan" />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.planTitle}>
              {mockPlan.userName}’s Current Plan
            </Text>
            <Text style={styles.status}>{mockPlan.status}</Text>
          </View>
          <Text style={styles.planSubText}>
            {mockPlan.plan} – {mockPlan.amount}
          </Text>
          <Text style={styles.expiryText}>Expires on:</Text>
          <Text style={styles.expiryDate}>31/04/2025 (Monday)</Text>

          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeText}>UPGRADE PLAN</Text>
          </TouchableOpacity>
        </View>
        <MenueCalendar
          onDateChange={date => Alert.alert('Selected Date', date)}
        />
        {holidays && holidays.length > 0 ? (
          <HolidayListCard holidays={holidays} />
        ) : (
          <NoDataFound message="No holidays found" />
        )}

        <PrimaryButton
          title="View food list"
          onPress={onViewFoodList}
          textColor="#FFFFFF"
          borderRadius={wp('2%')}
          paddingVertical={hp('1.5%')}
          fontSize={wp('4%')}
          textTransform="uppercase"
          fontFamily="Poppins-SemiBold"
          style={{width: '100%'}}
        />
      </ScrollView>
    </LinearGradient>
  );
};
export default MyPlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#fff',
    marginBottom: 50,
  },

  card: {
    marginVertical: hp('2%'),
    backgroundColor: '#fff4ee',
    borderRadius: 12,
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  planSubText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  status: {
    backgroundColor: '#d3f9d8',
    color: '#31a24c',
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  expiryText: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e0662a',
  },
  upgradeButton: {
    marginTop: 12,
    backgroundColor: '#ff733d',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  dateCircle: {
    width: wp('12%'),
    height: wp('12%'),
    margin: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#f3f3f3',
  },
  dateText: {
    color: '#555',
  },
  dateSelected: {
    backgroundColor: '#ff733d',
  },
  dateSelectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  activeNav: {
    color: '#ff733d',
    fontWeight: 'bold',
  },
});
