import RootNavigator from '@/navigation/RootNavigator';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useSatoshiFonts } from '@/src/hooks/use-fonts';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  const colorScheme = useColorScheme();
  const { fontsLoaded, fontError } = useSatoshiFonts();

  // Show loading while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#FF6139" />
      </View>
    );
  }

  // Log font errors if any
  if (fontError) {
    console.error('Font loading error:', fontError);
  }

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

