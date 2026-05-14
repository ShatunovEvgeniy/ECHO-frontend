import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (data: Record<string, any>) => {
  await AsyncStorage.setItem('user_profile', JSON.stringify(data));
};

export const getUser = async (): Promise<Record<string, any> | null> => {
  const data = await AsyncStorage.getItem('user_profile');
  return data ? JSON.parse(data) : null;
};