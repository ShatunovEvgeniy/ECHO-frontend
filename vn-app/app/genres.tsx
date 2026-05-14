import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import { colors, spacing } from '../constants/theme';

const ALL_GENRES = ['Романтика', 'Фэнтези', 'Детектив', 'Фантастика', 'Драма', 'Комедия', 'Мистика', 'Повседневность'];

export default function Genres() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(user.genres || []);

  const toggle = (g: string) => {
    setSelected(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const handleSave = () => {
    setUser({ genres: selected });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите жанры</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {ALL_GENRES.map(g => (
          <TouchableOpacity key={g} style={[styles.chip, selected.includes(g) && styles.chipActive]} onPress={() => toggle(g)}>
            <Text style={[styles.chipText, selected.includes(g) && styles.chipTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Начать чтение</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.l, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.l },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.m },
  chip: { width: '45%', padding: spacing.m, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primaryLight, alignItems: 'center' },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primaryDark },
  chipText: { color: colors.text, fontWeight: '500' },
  chipTextActive: { color: '#FFF' },
  button: { backgroundColor: colors.primary, padding: spacing.m, borderRadius: 12, alignItems: 'center', marginTop: spacing.xl },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});