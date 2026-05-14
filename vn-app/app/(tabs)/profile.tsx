import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, FadeInLeft } from 'react-native-reanimated';

export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    setUser({ isLoggedIn: false });
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Фон с градиентом */}
      <LinearGradient
        colors={[colors.background, colors.backgroundSoft]}
        style={styles.background}
      />

      <ScrollView style={styles.scroll}>
        {/* Аватар */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <BlurView intensity={40} tint="dark" style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name?.charAt(0).toUpperCase() || '👤'}
              </Text>
            </BlurView>
          </View>
          <Animated.Text entering={FadeInUp.delay(200)} style={styles.userName}>
            {user.name || 'Гость'}
          </Animated.Text>
          <Text style={styles.userStatus}>✨ Исследователь историй</Text>
        </Animated.View>

        {/* Карточки профиля */}
        <View style={styles.cards}>
          <Animated.View entering={FadeInLeft.delay(100)}>
            <GlassCard title="Пол" value={user.sex === 'male' ? 'Мужской 👨' : user.sex === 'female' ? 'Женский 👩' : 'Не указан'} />
          </Animated.View>
          
          <Animated.View entering={FadeInLeft.delay(200)}>
            <GlassCard title="Хобби" value={user.hobbies || 'Не указано'} />
          </Animated.View>
          
          <Animated.View entering={FadeInLeft.delay(300)}>
            <GlassCard title="Жанры" value={user.genres?.join(' • ') || 'Не выбраны'} />
          </Animated.View>
        </View>

        {/* Баланс */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.balanceSection}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCard}
          >
            <Text style={styles.balanceTitle}>💎 Ваш баланс</Text>
            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceIcon}>💎</Text>
                <Text style={styles.balanceValue}>{user.gems}</Text>
                <Text style={styles.balanceLabel}>алмазов</Text>
              </View>
              <View style={styles.balanceDivider} />
              <View style={styles.balanceItem}>
                <Text style={styles.balanceIcon}>🎫</Text>
                <Text style={styles.balanceValue}>{user.tickets}</Text>
                <Text style={styles.balanceLabel}>билетов</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.shopBtn}
              onPress={() => router.push('/shop')}
            >
              <Text style={styles.shopText}>✨ Пополнить</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Кнопки действий */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.actions}>
          <ActionButton 
            icon="✏️" 
            text="Редактировать профиль" 
            onPress={() => router.push('/personalization')}
            gradient
          />
          <ActionButton 
            icon="🚪" 
            text="Выйти из аккаунта" 
            onPress={handleLogout}
            danger
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

// Переиспользуемые компоненты
function GlassCard({ title, value }: { title: string; value: string }) {
  return (
    <BlurView intensity={30} tint="dark" style={styles.glassCard}>
      <Text style={styles.glassLabel}>{title}</Text>
      <Text style={styles.glassValue}>{value}</Text>
    </BlurView>
  );
}

function ActionButton({ icon, text, onPress, gradient, danger }: any) {
  return (
    <TouchableOpacity 
      style={[
        styles.actionBtn,
        danger && styles.actionBtnDanger,
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {gradient ? (
        // ✅ Рендерим LinearGradient только когда он нужен
        <LinearGradient
          colors={[colors.primaryLight, colors.primary]}
          style={styles.actionBtnInner}
        >
          <Text style={styles.actionIcon}>{icon}</Text>
          <Text style={styles.actionText}>{text}</Text>
        </LinearGradient>
      ) : (
        // ✅ Иначе используем обычный View
        <View style={styles.actionBtnInner}>
          <Text style={styles.actionIcon}>{icon}</Text>
          <Text style={[styles.actionText, danger && styles.actionTextDanger]}>
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  scroll: { flex: 1, padding: spacing.l },
  
  avatarSection: { alignItems: 'center', paddingVertical: spacing.xl },
  avatarRing: {
    padding: 4,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight,
    ...shadows.glow,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: { fontSize: 40, color: colors.text },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.m,
  },
  userStatus: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  
  cards: { gap: spacing.m, marginBottom: spacing.l },
  glassCard: {
    padding: spacing.m,
    borderRadius: borderRadius.m,
    overflow: 'hidden',
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryLight,
  },
  glassLabel: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  glassValue: { fontSize: 16, color: colors.text, fontWeight: '500' },
  
  balanceSection: { marginBottom: spacing.l },
  balanceCard: {
    padding: spacing.l,
    borderRadius: borderRadius.l,
    ...shadows.glow,
  },
  balanceTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.m,
    textAlign: 'center',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.l,
  },
  balanceItem: { alignItems: 'center' },
  balanceIcon: { fontSize: 24, marginBottom: 4 },
  balanceValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  balanceDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  shopBtn: {
    marginTop: spacing.l,
    backgroundColor: colors.gem,
    padding: spacing.m,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  shopText: { color: '#1F2937', fontWeight: 'bold', fontSize: 15 },
  
  actions: { gap: spacing.m, paddingBottom: spacing.xl },
  actionBtn: {
    borderRadius: borderRadius.m,
    overflow: 'hidden',
    ...shadows.medium,
  },
  actionBtnGradient: {},
  actionBtnDanger: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  actionBtnInner: {
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
  },
  actionIcon: { fontSize: 20 },
  actionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  actionTextDanger: { color: colors.error },
});