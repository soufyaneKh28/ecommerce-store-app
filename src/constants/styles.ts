/**
 * Global Styles Helper
 * Provides common style patterns with Satoshi font and theme colors
 */

import { Colors, Fonts } from '@/src/constants/theme';
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  // Text Styles with Satoshi Font
  textRegular: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textMedium: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  textLight: {
    fontFamily: Fonts.light,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  
  // Heading Styles
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.textPrimary,
  },
  h2: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.textPrimary,
  },
  h3: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  h4: {
    fontFamily: Fonts.medium,
    fontSize: 20,
    color: Colors.textPrimary,
  },
  
  // Body Text Styles
  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  
  // Caption Styles
  caption: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  captionMedium: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  
  // Small Text Styles
  small: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  smallMedium: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  
  // Button Text Styles
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.textOnPrimary,
  },
  buttonTextSecondary: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.primary,
  },
  
  // Link Styles
  link: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.primary,
  },
  
  // Secondary Text
  textSecondary: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  
  // Disabled Text
  textDisabled: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textDisabled,
  },
});

