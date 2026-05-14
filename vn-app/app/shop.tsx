// app/shop.tsx
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import { colors, spacing } from '../constants/theme';
import { Alert } from 'react-native';

export default function Shop() {
  const { user, updateCurrency } = useUser();
  const router = useRouter();

  const buyGems = (amount: number, price: number) => {
    // В реальном приложении здесь будет интеграция с платежной системой
    updateCurrency(user.gems + amount, undefined);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💎 Магазин</Text>
      
      <View style={styles.balance}>
        <Text style={styles.balanceText}>Ваш баланс: {user.gems} алмазов</Text>
      </View>

      <ScrollView contentContainerStyle={styles.items}>
        <TouchableOpacity style={styles.item} onPress={() => buyGems(50, 149)}>
          <Text style={styles.itemTitle}>50 алмазов</Text>
          <Text style={styles.itemPrice}>149 ₽</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.item} onPress={() => buyGems(150, 399)}>
          <Text style={styles.itemTitle}>150 алмазов</Text>
          <Text style={styles.itemPrice}>399 ₽</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.item} onPress={() => buyGems(500, 999)}>
          <Text style={styles.itemTitle}>500 алмазов + бонус</Text>
          <Text style={styles.itemPrice}>999 ₽</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, styles.premium]} onPress={() => Alert.alert('Premium', 'Подписка 299₽/мес')}>
          <Text style={styles.itemTitle}>🔓 Premium подписка</Text>
          <Text style={styles.itemPrice}>299 ₽/мес</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.l, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: spacing.l },
  balance: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, marginBottom: spacing.l, alignItems: 'center' },
  balanceText: { color: colors.text, fontWeight: '600' },
  items: { gap: spacing.m },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: colors.surface, 
    padding: spacing.m, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight
  },
  premium: { borderColor: colors.gem, backgroundColor: '#FFFBEB' },
  itemTitle: { color: colors.text, fontWeight: '600' },
  itemPrice: { color: colors.primary, fontWeight: 'bold' },
  backBtn: { 
    marginTop: spacing.xl, 
    padding: spacing.m, 
    backgroundColor: colors.primary, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  backText: { color: '#FFF', fontWeight: 'bold' },
});