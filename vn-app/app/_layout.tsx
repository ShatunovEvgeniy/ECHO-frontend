import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F5F3FF' } }}>
        {/* Экраны вне табов */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="game/[id]" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="personalization" options={{ presentation: 'modal' }} />
        <Stack.Screen name="genres" options={{ presentation: 'modal' }} />
        <Stack.Screen name="shop" options={{ presentation: 'modal' }} />
      </Stack>
    </UserProvider>
  );
}