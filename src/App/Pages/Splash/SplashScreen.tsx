import { useColorScheme } from '@/src/hooks/use-color-scheme';
import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>FASHIONISTA</Text>
          <Text style={[styles.tagline, isDark && styles.textDark]}>
            Your Fashion Destination
          </Text>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B9D" />
          <Text style={[styles.loadingText, isDark && styles.textDark]}>
            Loading...
          </Text>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeContainer}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B9D',
    letterSpacing: 3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  textDark: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    fontWeight: '500',
  },
  decorativeContainer: {
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#FF6B9D',
    top: 100,
    left: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: '#6B9DFF',
    bottom: 150,
    right: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: '#FFB800',
    top: 200,
    right: 50,
  },
});

