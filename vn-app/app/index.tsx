import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useUser } from '../context/UserContext';

export default function Index() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Проверяем состояние пользователя
      if (!user.isLoggedIn) {
        // Если не вошел - идем на регистрацию
        router.replace('/login');
      } else if (!user.name || !user.sex) {
        // Если вошел, но не заполнил профиль
        router.replace('/personalization');
      } else if (!user.genres || user.genres.length === 0) {
        // Если профиль заполнен, но не выбрал жанры
        router.replace('/genres');
      } else {
        // Все заполнено - идем на главную
        router.replace('/(tabs)');
      }
    }, 100); // Небольшая задержка для инициализации контекста

    return () => clearTimeout(timeout);
  }, [user, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F3FF' }}>
      <ActivityIndicator size="large" color="#6B21A8" />
    </View>
  );
}