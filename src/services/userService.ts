import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setUser = async (user: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('user', user);
  } catch (error) {
    console.error('Error setting user:', error);
  }
};

interface User {
  userId: string;
  email: string;
  role: string;
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString) as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const user = await getCurrentUser();
    return user?.userId || null;
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
};

export const getCurrentUserRole = async (): Promise<string | null> => {
  try {
    const user = await getCurrentUser();
    return user?.role || null;
  } catch (error) {
    console.error('Error getting current user role:', error);
    return null;
  }
};
