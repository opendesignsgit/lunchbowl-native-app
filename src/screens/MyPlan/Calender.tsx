import {useFocusEffect} from '@react-navigation/native';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import NoDataFound from 'components/Error/NoDataMessage';
import SectionTitle from 'components/Titles/SectionHeading';
import PrimaryButton from 'components/buttons/PrimaryButton';
import {useDate} from 'context/calenderContext';
import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import ToolTipSectionHeader from 'screens/Dashboard/Components/TooltipHeader';
import MenueCalendar from 'screens/MyPlan/Components/MenueCalender';
import HolidayService from 'services/MyPlansApi/HolidayService';
import {Holiday} from 'src/model/calendarModels';
import {questionIcon} from 'styles/svg-icons';
import HolidayListCard from './Components/HolidayListCard';
import PlanCard from './Components/MyPlan';
import {Colors} from 'assets/styles/colors';

const plans = [
  {
    id: 1,
    userName: 'Bharathi',
    plan: 'Premium Plan',
    amount: '₹499/month',
    status: 'Active',
    expiry: '31/04/2025 (Monday)',
  },
  {
    id: 2,
    userName: 'John',
    plan: 'Basic Plan',
    amount: '₹199/month',
    status: 'Expired',
    expiry: '01/07/2024 (Sunday)',
  },
  {
    id: 3,
    userName: 'Meena',
    plan: 'Pro Plan',
    amount: '₹299/month',
    status: 'Active',
    expiry: '15/12/2024 (Friday)',
  },
];

const MyPlanScreen: React.FC<{navigation: any}> = ({navigation}) => {
  //######### STATE VARIABLES  ##############################
  const screenWidth = wp('90%');

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // const [selectedDate, setSelectedDate] = useState('08');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const {setSelectedDate} = useDate(); // use context

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
        const holidays = response.data.map((holiday: any) => {
          const dateObj = new Date(holiday.date);
          const formattedDate = dateObj.toISOString().split('T')[0];
          return {
            id: holiday._id,
            name: holiday.name,
            date: formattedDate,
          };
        });
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  const filteredHolidays = holidays.filter(holiday => {
    const date = new Date(holiday.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  return (
    <ThemeGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <HeaderBackButton title="My Plan" />
          <FlatList
            data={plans}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{width: screenWidth}}>
                <PlanCard
                  userName={item.userName}
                  plan={item.plan}
                  amount={item.amount}
                  status={item.status}
                  expiry={item.expiry}
                />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={flatListRef}
          />
          <View style={styles.pagination}>
            {plans.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>

          <ToolTipSectionHeader
            title="Select your Food Plan"
            tooltipText="Choose a plan to see your daily meals."
            icon={questionIcon}
          />

          <MenueCalendar
            onDateChange={date =>
              navigation.navigate('MenuSelection', {selectedDate: date})
            }
            holidays={holidays}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
          />

          <SectionTitle>Holidays</SectionTitle>
          {filteredHolidays.length > 0 ? (
            <HolidayListCard holidays={filteredHolidays} />
          ) : (
            <NoDataFound message="No holidays found" />
          )}

          <PrimaryButton title="View food list" onPress={onViewFoodList} />
        </View>
      </ScrollView>
    </ThemeGradientBackground>
  );
};
export default MyPlanScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('10%'),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    padding: '3%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  dot: {
    width: wp('2%'),
    height: wp('1%'),
    borderRadius: wp('1%'),
    backgroundColor: Colors.default,
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: Colors.primaryOrange,
    width: wp('4%'),
    height: wp('1%'),
  },
});
