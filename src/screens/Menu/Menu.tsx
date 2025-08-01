import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import MealCard from './Components/MealCard';
import CategoryItem from './Components/CategoryItem';
import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import SearchBar from 'screens/Dashboard/Components/Search';
import Header from 'screens/Dashboard/Components/Header';
import {useAuth} from 'context/AuthContext';
const categories = [
  {
    id: '1',
    title: 'Fruits',
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
  },
  {
    id: '2',
    title: 'Rice',
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
  },
  {
    id: '3',
    title: 'Pasta',
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
  },
  {
    id: '4',
    title: 'Salad',
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
  },
  {
    id: '5',
    title: 'Soups',
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
  },
];

const meals = [
  {
    id: 1,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: '5 Spice Fried Rice',
    description: 'Lorem ipsum dolor sit amet consectetur...',
  },
  {
    id: 2,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Veg Biriyani and Raita',
    description: 'Lorem ipsum dolor sit amet consectetur...',
  },
  {
    id: 3,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Alfredo Pasta',
    description: 'Lorem ipsum dolor sit amet consectetur...',
  },
];

const MealCategoryScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const {user} = useAuth();
  const userName = user?.name ?? 'GuestUser';

  return (
    // <ThemeGradientBackground>
      <View style={styles.container}>
        <Header userName={userName ?? 'GuestUSer'} navigation={navigation} />
        <SearchBar />
        <Text style={styles.header}>Select your Category</Text>
        <View style={{marginBottom: 20}}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 16}}
            renderItem={({item}) => (
              <CategoryItem
                title={item.title}
                image={item.image}
                selected={item.title === selectedCategory}
                onPress={() => setSelectedCategory(item.title)}
              />
            )}
          />
        </View>
        <ScrollView contentContainerStyle={styles.mealList}>
          {meals.map(meal => (
            <MealCard
              key={meal.id}
              image={meal.image}
              title={meal.title}
              description={meal.description}
              onPress={() => console.log('View', meal.title)}
            />
          ))}
        </ScrollView>
      </View>
    // </ThemeGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F7F7F7', paddingTop: 20},
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  mealList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});

export default MealCategoryScreen;
