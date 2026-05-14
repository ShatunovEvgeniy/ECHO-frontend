import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import { colors, spacing } from '../../constants/theme';

// Импорт всех историй
import { magicCollege } from '../../data/stories/magic_college';
import { beachFlirt } from '../../data/stories/beach_flirt';
import { kenCostume } from '../../data/stories/ken_costume';
import { secretChat } from '../../data/stories/secret_chat';

const STORY_MAP: Record<string, any> = {
  magic_college: magicCollege,
  beach_flirt: beachFlirt,
  bedroom_scene: kenCostume,
  secret_chat: secretChat,
};

// // Простая анимация появления текста
// import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

// // Внутри компонента GameScreen добавьте:
// const [textOpacity, setTextOpacity] = useState(0);

// useEffect(() => {
//   setTextOpacity(0);
//   const timer = setTimeout(() => setTextOpacity(1), 100);
//   return () => clearTimeout(timer);
// }, [currentScene]);

// const animatedTextStyle = useAnimatedStyle(() => ({
//   opacity: withTiming(textOpacity, { duration: 300 }),
// }));

// // Замените <Text style={styles.text}> на:
// <Animated.Text style={[styles.text, animatedTextStyle]}>
//   {currentScene.dialogue.text}
// </Animated.Text>

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const { user, updateCurrency, updateProgress } = useUser();
  const router = useRouter();

  const story = STORY_MAP[id as string];
  
  if (!story) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Новелла не найдена</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [currentScene, setCurrentScene] = useState(story.scenes[0]);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    const savedSceneId = user.storyProgress[id as string];
    if (savedSceneId) {
      const saved = story.scenes.find((s: any) => s.id === savedSceneId);
      if (saved) setCurrentScene(saved);
    }
  }, []);

  useEffect(() => {
    updateProgress(id as string, currentScene.id);
    // Безопасная проверка choices
    const hasChoices = currentScene.choices && currentScene.choices.length > 0;
    setShowChoices(hasChoices);
  }, [currentScene]);

  const handleChoice = (choice: any) => {
    if (choice.cost && choice.cost > 0) {
      if (user.gems < choice.cost) {
        Alert.alert(
          '💎 Недостаточно алмазов',
          `Нужно ${choice.cost} алмазов. Пополните баланс в магазине.`,
          [
            { text: 'Отмена', style: 'cancel' },
            { text: 'В магазин', onPress: () => router.push('/shop') }
          ]
        );
        return;
      }
      updateCurrency(user.gems - choice.cost, undefined);
    }
    
    setShowChoices(false);
    if (choice.nextScene) {
      const next = story.scenes.find((s: any) => s.id === choice.nextScene);
      if (next) setCurrentScene(next);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (currentScene.nextScene) {
      const next = story.scenes.find((s: any) => s.id === currentScene.nextScene);
      if (next) setCurrentScene(next);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Image source={currentScene.background} style={styles.bg} resizeMode="cover" />
      
      <View style={styles.charLayer}>
        {currentScene.characters && currentScene.characters.map((ch: any, i: number) => (
          <Image 
            key={i} 
            source={ch.image} 
            style={[
              styles.char, 
              ch.position === 'left' && styles.posLeft, 
              ch.position === 'right' && styles.posRight
            ]} 
            resizeMode="contain" 
          />
        ))}
      </View>

      <View style={styles.dialogueBox}>
        {currentScene.dialogue.speaker && (
          <Text style={styles.speaker}>{currentScene.dialogue.speaker}</Text>
        )}
        <Text style={styles.text}>{currentScene.dialogue.text}</Text>
        
        {/* Безопасный рендер кнопок */}
        {!showChoices || !currentScene.choices ? (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>Далее ▶</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.choices}>
            {currentScene.choices.map((c: any, i: number) => (
              <TouchableOpacity 
                key={i} 
                style={[
                  styles.choiceBtn,
                  c.cost && c.cost > 0 && styles.choiceBtnPremium
                ]} 
                onPress={() => handleChoice(c)}
              >
                <Text style={styles.choiceText}>
                  {c.text}
                  {c.cost && c.cost > 0 && ` 💎${c.cost}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  errorText: { fontSize: 18, color: colors.text, marginBottom: spacing.l },
  backBtn: { padding: spacing.m, backgroundColor: colors.primary, borderRadius: 8 },
  backText: { color: '#FFF', fontWeight: 'bold' },
  
  bg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  charLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
  char: { 
    width: Dimensions.get('window').width * 0.9, 
    height: Dimensions.get('window').height * 0.9, 
    position: 'absolute', 
    bottom: 120 
  },
  posLeft: { left: -30 },
  posRight: { right: -500, bottom: -50 },
  
  dialogueBox: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: colors.overlay, 
    padding: spacing.xxl, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20 
  },
  speaker: { color: colors.gem, fontWeight: 'bold', fontSize: 22, marginBottom: 4 },
  text: { color: '#FFF', fontSize: 22, lineHeight: 24, marginBottom: spacing.xl, marginTop: spacing.xs },
  
  nextBtn: { 
    alignSelf: 'flex-end', 
    padding: spacing.m, 
    backgroundColor: colors.primary, 
    borderRadius: 8 
  },
  nextText: { color: '#FFF', fontWeight: 'bold' },
  
  choices: { gap: spacing.m },
  choiceBtn: { 
    backgroundColor: colors.primaryLight, 
    padding: spacing.m, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  choiceBtnPremium: { 
    backgroundColor: colors.gem,
    borderWidth: 2,
    borderColor: colors.gem
  },
  choiceText: { color: '#FFF', fontWeight: '600', fontSize: 18 },
});