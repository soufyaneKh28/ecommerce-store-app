import RootNavigator from '@/navigation/RootNavigator';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useSatoshiFonts } from '@/src/hooks/use-fonts';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';

export default function App() {
  const colorScheme = useColorScheme();
  const { fontsLoaded } = useSatoshiFonts();

  // Fonts are optional - app continues even if fonts aren't loaded yet
  // When fonts are added, they'll be loaded automatically

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

