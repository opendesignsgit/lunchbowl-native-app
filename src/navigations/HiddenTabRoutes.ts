
export const hiddenTabRoutes: string[] = [
  'Registartion',
  'Login',
  'ProfileSetup',
  'MealDetailScreen',
  'Settings',
  'FoodList',
  'MenuSelection'
];

export const isTabHidden = (routeName?: string): boolean => {
  return !!routeName && hiddenTabRoutes.includes(routeName);
};

