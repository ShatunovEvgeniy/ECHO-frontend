import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing } from '../../constants/theme';
import { useState } from 'react';

export default function Auth() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    // Имитация входа
    setUser({ isLoggedIn: true, gems: user.gems, tickets: user.tickets, storyProgress: user.storyProgress });
    Alert.alert('Успех', 'Вы вошли в аккаунт!');
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    Alert.alert('Регистрация', 'Функция в разработке');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔐 Авторизация</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Логин</Text>
        <TextInput 
          style={styles.input} 
          value={login} 
          onChangeText={setLogin} 
          placeholder="Введите логин"
          placeholderTextColor={colors.textLight}
        />
        
        <Text style={styles.label}>Пароль</Text>
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          placeholder="Введите пароль"
          placeholderTextColor={colors.textLight}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
          <Text style={styles.primaryBtnText}>Войти</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleRegister}>
          <Text style={styles.secondaryBtnText}>Создать аккаунт</Text>
        </TouchableOpacity>
      </View>

      {user.isLoggedIn && (
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>✅ Вы уже авторизованы</Text>
          <Text style={styles.infoText}>Логин: {user.name || 'Гость'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.l },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.l },
  card: { backgroundColor: colors.surface, padding: spacing.l, borderRadius: 12, marginBottom: spacing.m },
  label: { fontSize: 14, color: colors.textLight, marginBottom: spacing.s },
  input: { backgroundColor: colors.background, padding: spacing.m, borderRadius: 8, marginBottom: spacing.m, borderWidth: 1, borderColor: colors.primaryLight },
  primaryBtn: { backgroundColor: colors.primary, padding: spacing.m, borderRadius: 8, alignItems: 'center', marginTop: spacing.s },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { backgroundColor: colors.primaryLight, padding: spacing.m, borderRadius: 8, alignItems: 'center', marginTop: spacing.s },
  secondaryBtnText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  infoCard: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12 },
  infoText: { color: colors.text, fontSize: 14 },
});