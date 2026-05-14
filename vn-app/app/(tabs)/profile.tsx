import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing } from '../../constants/theme';

export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUser({ isLoggedIn: false });
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👤 Личный кабинет</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Имя</Text>
        <Text style={styles.value}>{user.name || 'Не указано'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Пол</Text>
        <Text style={styles.value}>{user.sex === 'male' ? 'Мужской' : user.sex === 'female' ? 'Женский' : 'Не указан'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Хобби</Text>
        <Text style={styles.value}>{user.hobbies || 'Не указано'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Любимые жанры</Text>
        <Text style={styles.value}>{user.genres?.join(', ') || 'Не выбраны'}</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>💎 Баланс</Text>
        <Text style={styles.balanceValue}>{user.gems} алмазов</Text>
        <Text style={styles.balanceValue}>{user.tickets} билетов</Text>
        <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/shop')}>
          <Text style={styles.shopText}>Пополнить</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/personalization')}>
        <Text style={styles.editText}>✏️ Редактировать профиль</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.l },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.l },
  card: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, marginBottom: spacing.m },
  label: { fontSize: 14, color: colors.textLight, marginBottom: 4 },
  value: { fontSize: 18, color: colors.text, fontWeight: '500' },
  balanceCard: { backgroundColor: colors.primary, padding: spacing.m, borderRadius: 12, marginBottom: spacing.m, alignItems: 'center' },
  balanceTitle: { color: '#FFF', fontSize: 16, marginBottom: 8 },
  balanceValue: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginVertical: 2 },
  shopBtn: { marginTop: spacing.m, backgroundColor: colors.gem, paddingHorizontal: spacing.l, paddingVertical: spacing.s, borderRadius: 20 },
  shopText: { color: '#FFF', fontWeight: 'bold' },
  editBtn: { backgroundColor: colors.primaryLight, padding: spacing.m, borderRadius: 12, alignItems: 'center', marginBottom: spacing.m },
  editText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  logoutBtn: { backgroundColor: '#DC2626', padding: spacing.m, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
});