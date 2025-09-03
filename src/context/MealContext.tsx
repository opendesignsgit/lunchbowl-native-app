import React, { createContext, useContext, useState, useEffect } from 'react';
import MealService from 'services/MealService/mealService';
import { IMAGE_BASE_URL } from '../config/apiConfig';

const defaultMealImage = require('../assets/images/Default/default.png');

type Meal = {
  id: string;
  title: string;
  description: string;
  image: any;
  nutritionValues: any[];
  cuisine: string;
  ingredients?:any
};

type MealContextType = {
  meals: Meal[];
  categories: { title: string; image: any }[];
  loading: boolean;
  error: string | null;
  refreshMeals: () => Promise<void>;

  
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data: any = await MealService.getAllMealsList();
      if (Array.isArray(data)) {
        const mappedMeals = data.map((meal: any) => {
          let imageSource;

          if (meal.image) {
            imageSource = meal.image.startsWith('http')
              ? { uri: meal.image }
              : { uri: `${IMAGE_BASE_URL}${meal.image}` };
          } else {
            imageSource = defaultMealImage;
          }

          return {
            id: meal._id,
            title: meal.primaryDishTitle,
            description: meal.shortDescription || meal.description,
            image: imageSource,
            nutritionValues: meal.nutritionValues || [],
            cuisine: meal.cuisine || 'Other',
          };
        });

        setMeals(mappedMeals);

        //  Build categories
        const cuisineMap: Record<string, any> = {};
        mappedMeals.forEach(meal => {
          if (!cuisineMap[meal.cuisine]) {
            cuisineMap[meal.cuisine] = {
              title: meal.cuisine,
              image: meal.image || defaultMealImage,
            };
          }
        });

        setCategories([{ title: 'All', image: defaultMealImage }, ...Object.values(cuisineMap)]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load meals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <MealContext.Provider
      value={{
        meals,
        categories,
        loading,
        error,
        refreshMeals: fetchMeals,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => {
  const ctx = useContext(MealContext);
  if (!ctx) throw new Error('useMeals must be used inside MealProvider');
  return ctx;
};
