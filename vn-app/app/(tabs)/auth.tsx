import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

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
    setUser({ isLoggedIn: true });
    Alert.alert('✨ Добро пожаловать!', 'Вы успешно вошли');
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* Градиентный фон */}
      <LinearGradient
        colors={[colors.background, colors.backgroundSoft, colors.gradientEnd]}
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Логотип */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.logoSection}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>📖</Text>
          </View>
          <Text style={styles.appName}>VN Platform</Text>
          <Text style={styles.tagline}>Погрузись в свою историю</Text>
        </Animated.View>

        {/* Форма */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Логин</Text>
            <TextInput
              style={styles.input}
              value={login}
              onChangeText={setLogin}
              placeholder="Введите логин"
              placeholderTextColor={colors.textDim}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Пароль</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textDim}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.forgot}
            onPress={() => Alert.alert('Восстановление', 'Функция в разработке')}
          >
            <Text style={styles.forgotText}>Забыли пароль?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} activeOpacity={0.9}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryBtnInner}
            >
              <Text style={styles.primaryBtnText}>✨ Войти</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryBtn}
            onPress={() => Alert.alert('Регистрация', 'Функция в разработке')}
          >
            <Text style={styles.secondaryBtnText}>Создать аккаунт</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Статус */}
        {user.isLoggedIn && (
          <Animated.View entering={FadeInUp.delay(400)} style={styles.statusCard}>
            <Text style={styles.statusIcon}>✅</Text>
            <Text style={styles.statusText}>Вы уже авторизованы</Text>
            <Text style={styles.statusLogin}>{user.name || 'Гость'}</Text>
          </Animated.View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  scroll: { flexGrow: 1, padding: spacing.l, justifyContent: 'center' },
  
  logoSection: { alignItems: 'center', marginBottom: spacing.xl },
  logo: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
    marginBottom: spacing.m,
  },
  logoIcon: { fontSize: 36 },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textShadowColor: colors.primaryGlow,
    textShadowRadius: 15,
  },
  tagline: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 4,
  },
  
  form: {
    backgroundColor: colors.surface,
    padding: spacing.l,
    borderRadius: borderRadius.l,
    ...shadows.medium,
  },
  inputGroup: { marginBottom: spacing.m },
  inputLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.s,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.backgroundSoft,
    padding: spacing.m,
    borderRadius: borderRadius.m,
    color: colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  forgot: { alignSelf: 'flex-end', marginBottom: spacing.l },
  forgotText: { color: colors.primaryLight, fontSize: 14 },
  
  primaryBtn: { borderRadius: borderRadius.m, overflow: 'hidden', marginBottom: spacing.s },
  primaryBtnInner: { padding: spacing.m, alignItems: 'center' },
  primaryBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 17 },
  
  secondaryBtn: {
    padding: spacing.m,
    alignItems: 'center',
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  secondaryBtnText: { color: colors.primaryLight, fontWeight: '600', fontSize: 15 },
  
  statusCard: {
    marginTop: spacing.l,
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    ...shadows.soft,
  },
  statusIcon: { fontSize: 24, marginBottom: 8 },
  statusText: { color: colors.text, fontWeight: '600' },
  statusLogin: { color: colors.textMuted, marginTop: 4 },
});