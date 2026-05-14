import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function Settings() {
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Animated.Text entering={FadeInUp} style={styles.title}>⚙️ Настройки</Animated.Text>

      <SettingSection title="Звук и вибрация">
        <SettingRow label="Звуковые эффекты" value={sound} onValueChange={setSound} />
        <SettingRow label="Вибрация" value={vibration} onValueChange={setVibration} />
      </SettingSection>

      <SettingSection title="Игра">
        <SettingRow label="Автосохранение" value={autoSave} onValueChange={setAutoSave} />
        <SettingButton label="Очистить прогресс" onPress={() => {}} danger />
      </SettingSection>

      <SettingSection title="О приложении">
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Версия</Text>
          <Text style={styles.infoValue}>1.0.0 ✨</Text>
        </View>
        <Text style={styles.copyright}>© 2026 VN Platform</Text>
      </SettingSection>
    </ScrollView>
  );
}

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <BlurView intensity={20} tint="dark" style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </BlurView>
  );
}

function SettingRow({ label, value, onValueChange }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#374151', true: colors.primaryLight }}
        thumbColor={value ? colors.primary : '#9CA3AF'}
      />
    </View>
  );
}

function SettingButton({ label, onPress, danger }: any) {
  return (
    <TouchableOpacity 
      style={[styles.rowBtn, danger && styles.rowBtnDanger]} 
      onPress={onPress}
    >
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
      <Text style={styles.rowArrow}>→</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.l },
  title: { fontSize: 30, fontWeight: 'bold', color: colors.text, marginBottom: spacing.l },
  
  section: {
    padding: spacing.m,
    borderRadius: borderRadius.m,
    marginBottom: spacing.m,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaryLight,
    marginBottom: spacing.m,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  rowLabel: { fontSize: 16, color: colors.text },
  rowLabelDanger: { color: colors.error },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  rowBtnDanger: { opacity: 0.9 },
  rowArrow: { fontSize: 18, color: colors.textMuted },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.s,
  },
  infoLabel: { fontSize: 14, color: colors.textMuted },
  infoValue: { fontSize: 14, color: colors.text, fontWeight: '500' },
  copyright: {
    fontSize: 12,
    color: colors.textDim,
    textAlign: 'center',
    marginTop: spacing.m,
  },
});