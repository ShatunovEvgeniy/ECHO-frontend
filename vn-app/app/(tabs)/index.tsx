import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing } from '../../constants/theme';

// Импортируем все истории
import { magicCollege } from '../../data/stories/magic_college';
import { beachFlirt } from '../../data/stories/beach_flirt';
import { kenCostume } from '../../data/stories/ken_costume';
import { secretChat } from '../../data/stories/secret_chat';

const NOVELS = [
  magicCollege,
  beachFlirt,
  kenCostume,
  secretChat,
];

// Используем первую доступную картинку как заглушку для обложки
const COVER_IMAGES = [
  require('../../assets/images/bg/university.png'),
  require('../../assets/images/bg/beach.jpg'),
  require('../../assets/images/bg/bedroom.jpg'),
];

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const getCoverImage = (index: number) => {
    return COVER_IMAGES[index % COVER_IMAGES.length];
  };

  return (
    <View style={styles.container}>
      {/* Шапка с валютой */}
      <View style={styles.header}>
        <View style={styles.resource}>
          <Text style={styles.resourceIcon}>💎</Text>
          <Text style={styles.resourceText}>{user.gems}</Text>
        </View>
        <View style={styles.resource}>
          <Text style={styles.resourceIcon}>🎫</Text>
          <Text style={styles.resourceText}>{user.tickets}</Text>
        </View>
      </View>

      <Text style={styles.title}>Библиотека</Text>
      
      {/* Горизонтальный скролл */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {NOVELS.map((novel, index) => (
          <TouchableOpacity 
            key={novel.id} 
            style={styles.card} 
            onPress={() => router.push(`/game/${novel.id}`)}
            activeOpacity={0.7}
          >
            {/* Обложка */}
            <Image 
              source={getCoverImage(index)} 
              style={styles.cover}
              resizeMode="cover"
            />
            
            {/* Индикатор премиума */}
            {novel.premium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>🔒</Text>
              </View>
            )}
            
            {/* Информация */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {novel.title}
              </Text>
              <Text style={styles.cardGenres} numberOfLines={1}>
                {novel.genres[0]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = 600; // Маленькая ширина
const CARD_HEIGHT = 800; // Маленькая высота

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    padding: spacing.l 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: spacing.m, 
    marginBottom: spacing.m 
  },
  resource: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.surface, 
    paddingHorizontal: spacing.s, 
    paddingVertical: spacing.s / 2, 
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  resourceIcon: { marginRight: 4, fontSize: 24 },
  resourceText: { fontWeight: 'bold', color: colors.text, fontSize: 16 },
  
  title: { 
    fontSize: 35, 
    fontWeight: 'bold', 
    color: colors.primary, 
    marginBottom: spacing.m 
  },
  
  scrollContent: {
    gap: spacing.m,
    paddingRight: spacing.l,
    marginTop: spacing.s  // ← Добавлено: сдвигает скролл чуть ниже
  },
  
  card: { 
    width: CARD_WIDTH, 
    height: CARD_HEIGHT,
    backgroundColor: colors.surface, 
    borderRadius: 15, 
    overflow: 'hidden',
    shadowColor: '#6B21A8',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4
  },
  
  cover: { 
    width: CARD_WIDTH, 
    height: CARD_HEIGHT * 0.8,
    backgroundColor: colors.primaryLight 
  },
  
  premiumBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.gem,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  premiumText: {
    fontSize: 22
  },
  
  cardInfo: {
    padding: spacing.s,
    flex: 1,
    justifyContent: 'center'
  },
  
  cardTitle: { 
    fontWeight: '600', 
    color: colors.text,
    fontSize: 22,
    marginBottom: 2
  },
  
  cardGenres: { 
    fontSize: 18, 
    color: colors.textLight
  },
});