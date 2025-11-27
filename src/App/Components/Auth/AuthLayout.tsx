import { Fonts } from '@/src/constants/theme';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DecorativeElement } from './DecorativeElement';

interface AuthLayoutProps {
  children: React.ReactNode;
  showDecoration?: boolean;
}

/**
 * Auth Layout Component
 * Common layout wrapper for auth screens
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  showDecoration = true 
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {showDecoration && <DecorativeElement />}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
});

