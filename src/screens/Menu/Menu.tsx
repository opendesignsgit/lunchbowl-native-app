import ThemeGradientBackground from 'components/Backgrounds/GradientBackground';
import SectionTitle from 'components/Titles/SectionHeading';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import SearchBar from 'screens/Dashboard/Components/Search';
import CategoryItem from './Components/CategoryItem';
import MealCard from './Components/MealCard';

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
    description: 'Aromatic rice with bold spices and veggies.',
  },
  {
    id: 2,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Veg Biriyani and Raita',
    description: 'Classic Indian rice dish with cooling yogurt dip.',
  },
  {
    id: 3,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Alfredo Pasta',
    description: 'Creamy Italian-style pasta with herbs.',
  },
  {
    id: 4,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Paneer Butter Masala',
    description: 'Rich gravy with soft paneer cubes.',
  },
  {
    id: 5,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Grilled Sandwich',
    description: 'Toasted sandwich with veggies and cheese.',
  },
  {
    id: 6,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Vegetable Soup',
    description: 'Healthy soup with seasonal vegetables.',
  },
  {
    id: 7,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Tomato Pasta',
    description: 'Tangy tomato-based pasta with herbs.',
  },
  {
    id: 8,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Chilli Garlic Noodles',
    description: 'Spicy noodles with garlic flavor.',
  },
  {
    id: 9,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Tandoori Roti & Curry',
    description: 'Whole wheat roti served with spicy curry.',
  },
  {
    id: 10,
    image: require('../../assets/images/Dashboard/Menues/menue1.png'),
    title: 'Schezwan Fried Rice',
    description: 'Spicy Indo-Chinese rice with sauces.',
  },
];

const MealCategoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  return (
    <ThemeGradientBackground>
      <View style={styles.container}>
        <SearchBar />
        <SectionTitle>Select your Category</SectionTitle>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 20 }}
          renderItem={({ item }) => (
            <CategoryItem
              title={item.title}
              image={item.image}
              selected={item.title === selectedCategory}
              onPress={() => setSelectedCategory(item.title)}
            />
          )}
        />

        <ScrollView contentContainerStyle={styles.mealList} showsVerticalScrollIndicator={false}>
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
    </ThemeGradientBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    marginBottom: '20%'


  },
  mealList: {
  },
});

export default MealCategoryScreen;
