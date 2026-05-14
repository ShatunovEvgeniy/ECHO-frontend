import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

// Импорты историй
import { magicCollege } from '../../data/stories/magic_college';
import { beachFlirt } from '../../data/stories/beach_flirt';
import { kenCostume } from '../../data/stories/ken_costume';
import { secretChat } from '../../data/stories/secret_chat';

const NOVELS = [magicCollege, beachFlirt, kenCostume, secretChat];
const COVER_IMAGES = [
  require('../../assets/images/bg/university.png'),
  require('../../assets/images/bg/beach.jpg'),
  require('../../assets/images/bg/bedroom.jpg'),
  require('../../assets/images/bg/japan.jpg')
];

export default function Library() {
  const { user } = useUser();
  const router = useRouter();

  const getCoverImage = (index: number) => COVER_IMAGES[index % COVER_IMAGES.length];

  return (
    <View style={styles.container}>
      {/* Градиентный фон */}
      <LinearGradient
        colors={[colors.background, colors.backgroundSoft, colors.background]}
        style={styles.background}
      />

      {/* Шапка */}
      <Animated.View entering={FadeInUp.duration(400)} style={styles.header}>
        <BlurView intensity={60} tint="dark" style={styles.resourceCard}>
          <Text style={styles.resourceIcon}>💎</Text>
          <Text style={styles.resourceText}>{user.gems}</Text>
        </BlurView>
        <BlurView intensity={60} tint="dark" style={styles.resourceCard}>
          <Text style={styles.resourceIcon}>🎫</Text>
          <Text style={styles.resourceText}>{user.tickets}</Text>
        </BlurView>
      </Animated.View>

      {/* Заголовок */}
      <Animated.Text 
        entering={FadeInDown.duration(500).delay(100)}
        style={styles.title}
      >
        Библиотека
      </Animated.Text>

      {/* Горизонтальный скролл с анимацией */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={160}
        snapToAlignment="start"
      >
        {NOVELS.map((novel, index) => (
          <Animated.View 
            key={novel.id}
            entering={FadeInUp.duration(300).delay(index * 100)}
          >
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => router.push(`/game/${novel.id}`)}
              activeOpacity={0.85}
            >
              {/* Обложка с градиентным оверлеем */}
              <View style={styles.coverContainer}>
                <Animated.Image 
                  source={getCoverImage(index)} 
                  style={styles.cover}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', colors.overlay]}
                  style={styles.coverOverlay}
                />
                
                {/* Премиум-бейдж */}
                {novel.premium && (
                  <View style={styles.premiumBadge}>
                    <LinearGradient
                      colors={[colors.premium, colors.primary]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.premiumGradient}
                    >
                      <Text style={styles.premiumText}>🔒</Text>
                    </LinearGradient>
                  </View>
                )}
              </View>
              
              {/* Информация */}
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>{novel.title}</Text>
                <Text style={styles.cardGenres}>{novel.genres[0]}</Text>
              </View>

              {/* Свечение при наведении (визуальный эффект) */}
              <View style={styles.cardGlow} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Декоративные элементы */}
      <View style={styles.decor} />
    </View>
  );
}

const CARD_WIDTH = 600;
const CARD_HEIGHT = 720;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: spacing.s, 
    padding: spacing.l,
    paddingTop: spacing.xl,
    zIndex: 10
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s / 2,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  resourceIcon: { marginRight: 4, fontSize: 20 },
  resourceText: { fontWeight: 'bold', color: colors.text, fontSize: 15 },
  
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: colors.text,
    paddingHorizontal: spacing.l,
    marginBottom: spacing.m,
    textShadowColor: colors.primaryGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  
  scrollContent: {
    gap: spacing.m,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
  },
  
  card: { 
    width: CARD_WIDTH, 
    height: CARD_HEIGHT,
    borderRadius: borderRadius.l,
    overflow: 'hidden',
    ...shadows.medium,
  },
  
  coverContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 0.8,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  
  premiumBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    ...shadows.glow,
  },
  premiumGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumText: { fontSize: 18 },
  
  cardInfo: {
    padding: spacing.m,
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: { 
    fontWeight: '700', 
    color: colors.text,
    fontSize: 20,
    marginBottom: 4,
  },
  cardGenres: { 
    fontSize: 18, 
    color: colors.textMuted,
    fontWeight: '500',
  },
  
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0)',
  },
  
  decor: {
    position: 'absolute',
    bottom: 100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primaryGlow,
    opacity: 0.15,
  },
});