import { Tabs } from 'expo-router';
import { colors } from '../../constants/theme';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primaryLight,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            tint="dark"
            style={{ 
              flex: 1, 
              backgroundColor: colors.surfaceGlass,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              overflow: 'hidden',
            }}
          />
        ),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Библиотека',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon icon="📚" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon icon="👤" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon icon="⚙️" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          title: 'Вход',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon icon="🔐" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

// Компонент анимированной иконки
import { Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

function AnimatedIcon({ icon, color, focused }: { icon: string; color: string; focused: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.2 : 1, { damping: 15 }) }],
  }));

  return (
    <Animated.View style={[animatedStyle, { marginBottom: 4 }]}>
      <Text style={{ fontSize: 22, color }}>{icon}</Text>
    </Animated.View>
  );
}