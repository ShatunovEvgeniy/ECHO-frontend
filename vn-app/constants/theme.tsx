export const colors = {
  // Основная фиолетовая гамма
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  primaryLight: '#A78BFA',
  primaryGlow: 'rgba(124, 58, 237, 0.4)',
  
  // Градиенты
  gradientStart: '#8B5CF6',
  gradientEnd: '#6D28D9',
  gradientAccent: '#C084FC',
  
  // Фон и поверхности
  background: '#0F0A1A',
  backgroundSoft: '#1A1329',
  surface: 'rgba(30, 25, 50, 0.8)',
  surfaceGlass: 'rgba(40, 30, 70, 0.6)',
  
  // Текст
  text: '#F5F3FF',
  textMuted: '#A78BFA',
  textDim: '#6B7280',
  
  // Акценты
  gem: '#FBBF24',
  gemGlow: 'rgba(251, 191, 36, 0.5)',
  ticket: '#34D399',
  ticketGlow: 'rgba(52, 211, 153, 0.4)',
  premium: '#F472B6',
  
  // Состояния
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  
  // Эффекты
  overlay: 'rgba(15, 10, 26, 0.85)',
  blur: 'rgba(30, 25, 50, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

export const spacing = { xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 };

export const shadows = {
  soft: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 4 },
  medium: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 8 },
  glow: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 12 },
};

export const borderRadius = { s: 8, m: 16, l: 24, xl: 32, full: 999 };