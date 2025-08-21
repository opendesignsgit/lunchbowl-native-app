import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import SectionTitle from 'components/Titles/SectionHeading';
import PlanCard from './Components/MyPlan';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import Tooltip from 'react-native-walkthrough-tooltip';
import {SvgXml} from 'react-native-svg';
import {questionIcon} from 'styles/svg-icons';
import {Holiday} from 'src/model/calendarModels';
import {useDate} from 'context/calenderContext';
import ToolTipSectionHeader from 'screens/Dashboard/Components/TooltipHeader';

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

  // Filter holidays based on current month & year
  const filteredHolidays = holidays.filter(holiday => {
    const date = new Date(holiday.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });
  // Month change handler from calendar
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };
  const handleDateChange = (date: string) => {
    setSelectedDate(date); // save globally
    navigation.navigate('MenuSelection');
  };
  //  const { selectedDate, setSelectedDate } = useDate();
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
    backgroundColor: '#ccc',
    marginHorizontal: wp('1%'),
  },
  activeDot: {
    backgroundColor: '#FF6514',
    width: wp('4%'),
    height: wp('1%'),
  },
});

// import React, {useCallback, useRef, useState} from 'react';
// import {
//   Alert,
//   Dimensions,
//   FlatList,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {LinearGradient} from 'react-native-linear-gradient';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import MenueCalendar from 'screens/MyPlan/Components/MenueCalender';
// import HolidayListCard from './Components/HolidayListCard';
// import HolidayService from 'services/MyPlansApi/HolidayService';
// import {useFocusEffect} from '@react-navigation/native';
// import NoDataFound from 'components/Error/NoDataMessage';
// import PrimaryButton from 'components/buttons/PrimaryButton';
// import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
// import SectionTitle from 'components/Titles/SectionHeading';
// import PlanCard from './Components/MyPlan';
// import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';

// import Tooltip from 'react-native-walkthrough-tooltip';
// import {SvgXml} from 'react-native-svg';
// import {questionIcon} from 'styles/svg-icons';

// const plans = [
//   {
//     id: 1,
//     userName: 'Bharathi',
//     plan: 'Premium Plan',
//     amount: '₹499/month',
//     status: 'Active',
//     expiry: '31/04/2025 (Monday)',
//   },
//   {
//     id: 2,
//     userName: 'John',
//     plan: 'Basic Plan',
//     amount: '₹199/month',
//     status: 'Expired',
//     expiry: '01/07/2024 (Sunday)',
//   },
//   {
//     id: 3,
//     userName: 'Meena',
//     plan: 'Pro Plan',
//     amount: '₹299/month',
//     status: 'Active',
//     expiry: '15/12/2024 (Friday)',
//   },
// ];

// const MyPlanScreen: React.FC<{navigation: any}> = ({navigation}) => {
//   //######### STATE VARIABLES  ##############################
//   const screenWidth = wp('90%');

//   const [selectedDate, setSelectedDate] = useState('08');
//   const [holidays, setHolidays] = useState([]);
//   const [tooltipVisible, setTooltipVisible] = useState(false);

//   //######### HOOKS ############################################

//   useFocusEffect(
//     useCallback(() => {
//       GetHolidays();
//     }, []),
//   );

//   //######### GET HOLIDAYS API CALL ############################

//   const GetHolidays = async () => {
//     try {
//       const response: any = await HolidayService.getAllHolidays();
//       if (response && response.data) {
//         const holidays = response.data.map((holiday: any) => {
//           const dateObj = new Date(holiday.date);
//           const formattedDate = dateObj.toISOString().split('T')[0];
//           return {
//             id: holiday._id,
//             name: holiday.name,
//             date: formattedDate,
//           };
//         });
//         setHolidays(holidays);
//       } else {
//         console.error('Invalid data format', response);
//       }
//     } catch (error) {
//       console.error('Error fetching holidays:', error);
//     }
//   };

//   function onViewFoodList(): void {
//     navigation.navigate('FoodList');
//   }
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef<FlatList>(null);

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.round(offsetX / screenWidth);
//     setCurrentIndex(index);
//   };
//   return (
//     <ThemeGradientBackground>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.container}>
//           <HeaderBackButton title="My Plan" />
//           <FlatList
//             data={plans}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({item}) => (
//               <View style={{width: screenWidth}}>
//                 <PlanCard
//                   userName={item.userName}
//                   plan={item.plan}
//                   amount={item.amount}
//                   status={item.status}
//                   expiry={item.expiry}
//                 />
//               </View>
//             )}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={handleScroll}
//             scrollEventThrottle={16}
//             ref={flatListRef}
//           />
//           <View style={styles.pagination}>
//             {plans.map((_, index) => (
//               <View
//                 key={index}
//                 style={[styles.dot, index === currentIndex && styles.activeDot]}
//               />
//             ))}
//           </View>
//           <View style={styles.sectionHeader}>
//             <SectionTitle>Select your Food Plan</SectionTitle>
//             <Tooltip
//               isVisible={tooltipVisible}
//               content={<Text>Choose a plan to see your daily meals.</Text>}
//               placement="bottom"
//               onClose={() => setTooltipVisible(false)}>
//               <TouchableOpacity onPress={() => setTooltipVisible(true)}>
//                 <SvgXml xml={questionIcon} width={25} height={25} />
//               </TouchableOpacity>
//             </Tooltip>
//           </View>
//         <MenueCalendar
//             onDateChange={date => Alert.alert('Selected Date', date)}
//             holidays={holidays}
//             currentMonth={currentMonth}
//             currentYear={currentYear}
//             onMonthChange={handleMonthChange}
//           />

//           <SectionTitle>Holodays</SectionTitle>
//           {holidays && holidays.length > 0 ? (
//             <HolidayListCard holidays={holidays} />
//           ) : (
//             <NoDataFound message="No holidays found" />
//           )}

//           <PrimaryButton title="View food list" onPress={onViewFoodList} />
//         </View>
//       </ScrollView>
//     </ThemeGradientBackground>
//   );
// };
// export default MyPlanScreen;
// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: wp('6%'),
//     paddingBottom: hp('10%'),
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: hp('2%'),
//     padding: '3%',
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: hp('1%'),
//   },
//   dot: {
//     width: wp('2%'),
//     height: wp('1%'),
//     borderRadius: wp('1%'),
//     backgroundColor: '#ccc',
//     marginHorizontal: wp('1%'),
//   },
//   activeDot: {
//     backgroundColor: '#FF6514',
//     width: wp('4%'),
//     height: wp('1%'),
//   },

//   calendarHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   monthText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   weekDaysRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dayLabel: {
//     width: `${100 / 7}%`,
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#888',
//   },
//   dateGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10,
//   },
//   dateCircle: {
//     width: wp('12%'),
//     height: wp('12%'),
//     margin: wp('1%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//     backgroundColor: '#f3f3f3',
//   },
//   dateText: {
//     color: '#222222',
//   },
//   dateSelected: {
//     backgroundColor: '#ff733d',
//   },
//   dateSelectedText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//     backgroundColor: '#ffffff',
//     borderTopColor: '#ffffff',
//     borderTopWidth: 1,
//   },
//   activeNav: {
//     color: '#ff733d',
//     fontWeight: 'bold',
//   },
// });
