import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from 'context/AuthContext';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBackButton from 'screens/Dashboard/Components/BackButton';
import SearchBar from 'screens/Dashboard/Components/Search';
import FoodListCard from 'screens/MyPlan/Components/FoodListCard';
import FoodService from 'services/MyPlansApi/FoodService';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Meal = {
  childId: string;
  date: string;
  food: string;
};

const FoodScreen = () => {
  //######### STATE ############################################

  const [foodList, setFoodList] = useState<Meal[]>([]);
  const {userId} = useAuth();
  //######### HOOKS ############################################

  useFocusEffect(
    useCallback(() => {
      onViewFoodList();
    }, [userId]),
  );
  //######### GET FOOD API CALL ##############################

  const onViewFoodList = async () => {
    try {
      if (!userId) {
        console.error('User ID is null or undefined');
        return;
      }
      const response = await FoodService.getAllFoods('get-saved-meals', userId);
      const menuSelections = response?.data?.menuSelections;
      console.log('FOODLIST', menuSelections);
      if (menuSelections && typeof menuSelections === 'object') {
        const meals: Meal[] = [];

        Object.entries(menuSelections).forEach(([date, childMeals]) => {
          Object.entries(childMeals as Record<string, string>).forEach(
            ([childId, mealName]) => {
              meals.push({childId, date, food: mealName});
            },
          );
        });

        setFoodList(meals);
      } else {
        console.error('Invalid food data format:', response);
      }
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#FF651429', '#4AB23814', '#FAFAFA00']}
      start={{x: 0.1, y: 0}}
      end={{x: 0.1, y: 1}}
      style={styles.gradient}>
      <View style={styles.container}>
        <ScrollView>
          <HeaderBackButton title="Edit Profile" />
          <SearchBar value={''} onChangeText={function (text: string): void {
            throw new Error('Function not implemented.');
          } } />
          <FoodListCard
            childName="Child Name 1"
            dateRange="01/04/2025 - 05/04/2025"
            list={foodList}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
});
export default FoodScreen;
