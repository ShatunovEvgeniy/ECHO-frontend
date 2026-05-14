import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import { colors, spacing } from '../constants/theme';

export default function Personalization() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [name, setName] = useState(user.name || '');
  const [sex, setSex] = useState<'male' | 'female'>(user.sex || 'female');
  const [hobbies, setHobbies] = useState(user.hobbies || '');

  const handleSave = () => {
    if (!name.trim()) return Alert.alert('Ошибка', 'Введите имя');
    setUser({ name: name.trim(), sex, hobbies: hobbies.trim() });
    router.push('/genres');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Настройка профиля</Text>
      <Text style={styles.label}>Ваше имя</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Как к вам обращаться?" placeholderTextColor={colors.textLight} />
      
      <Text style={styles.label}>Пол</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.chip, sex === 'female' && styles.chipActive]} onPress={() => setSex('female')}>
          <Text style={styles.chipText}>Женский</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.chip, sex === 'male' && styles.chipActive]} onPress={() => setSex('male')}>
          <Text style={styles.chipText}>Мужской</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Хобби и интересы (свободная форма)</Text>
      <TextInput style={[styles.input, styles.multiline]} value={hobbies} onChangeText={setHobbies} multiline placeholderTextColor={colors.textLight} />
      
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Далее</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.l, backgroundColor: colors.background },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.l },
  label: { fontSize: 16, color: colors.text, marginBottom: spacing.s, fontWeight: '500' },
  input: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, borderWidth: 1, borderColor: colors.primaryLight, marginBottom: spacing.m },
  multiline: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: spacing.m, marginBottom: spacing.m },
  chip: { flex: 1, padding: spacing.m, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primaryLight, alignItems: 'center' },
  chipActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '500' },
  button: { backgroundColor: colors.primary, padding: spacing.m, borderRadius: 12, alignItems: 'center', marginTop: spacing.l },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});