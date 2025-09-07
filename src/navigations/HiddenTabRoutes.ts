
export const hiddenTabRoutes: string[] = [
  'Registartion',
  'Login',
  'ProfileSetup',
  'MealDetailScreen',
  'Settings'
];

export const isTabHidden = (routeName?: string): boolean => {
  return !!routeName && hiddenTabRoutes.includes(routeName);
};

