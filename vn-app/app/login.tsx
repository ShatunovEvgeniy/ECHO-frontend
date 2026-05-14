import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import { saveUser } from '../utils/storage';
import { colors, spacing } from '../constants/theme';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) return Alert.alert('Ошибка', 'Заполните все поля');
    // Имитация входа
    const base = { isLoggedIn: true, gems: 50, tickets: 3, storyProgress: {} };
    setUser(base);
    saveUser(base);
    router.replace('/personalization');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <TextInput style={styles.input} placeholder="Логин" value={login} onChangeText={setLogin} placeholderTextColor={colors.textLight} />
      <TextInput style={styles.input} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={colors.textLight} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.l, justifyContent: 'center', backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: spacing.xl },
  input: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, marginBottom: spacing.m, borderWidth: 1, borderColor: colors.primaryLight },
  button: { backgroundColor: colors.primary, padding: spacing.m, borderRadius: 12, alignItems: 'center', marginTop: spacing.m },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});