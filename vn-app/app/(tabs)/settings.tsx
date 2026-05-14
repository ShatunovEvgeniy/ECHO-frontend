import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../constants/theme';
import { useState } from 'react';

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Настройки</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Звук и вибрация</Text>
        
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Звуковые эффекты</Text>
          <Switch value={soundEnabled} onValueChange={setSoundEnabled} trackColor={{ false: '#D1D5DB', true: colors.primaryLight }} />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Вибрация</Text>
          <Switch value={vibrationEnabled} onValueChange={setVibrationEnabled} trackColor={{ false: '#D1D5DB', true: colors.primaryLight }} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Игра</Text>
        
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Автосохранение</Text>
          <Switch value={autoSave} onValueChange={setAutoSave} trackColor={{ false: '#D1D5DB', true: colors.primaryLight }} />
        </View>
        
        <TouchableOpacity style={styles.rowBtn}>
          <Text style={styles.rowLabel}>Очистить прогресс</Text>
          <Text style={styles.rowValue}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>О приложении</Text>
        <Text style={styles.version}>Версия 1.0.0</Text>
        <Text style={styles.copyright}>© 2026 VN Platform</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.l },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.l },
  section: { backgroundColor: colors.surface, padding: spacing.m, borderRadius: 12, marginBottom: spacing.m },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.m },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.m },
  rowLabel: { fontSize: 16, color: colors.text },
  rowValue: { fontSize: 16, color: colors.primary },
  rowBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  version: { fontSize: 14, color: colors.textLight, textAlign: 'center' },
  copyright: { fontSize: 12, color: colors.textLight, textAlign: 'center', marginTop: 4 },
});