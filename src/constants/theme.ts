/**
 * Global Color System
 * Define all colors used throughout the app here
 */

export const Colors = {
  // Primary Colors
  primary: '#FF6B9D',
  primaryLight: '#FF8FB3',
  primaryDark: '#E5557D',
  
  // Secondary Colors
  secondary: '#6B9DFF',
  secondaryLight: '#8BB5FF',
  secondaryDark: '#4A7FE8',
  
  // Accent Colors
  accent: '#FFB800',
  accentLight: '#FFD147',
  accentDark: '#E5A500',
  
  // Status Colors
  success: '#4CAF50',
  successLight: '#6BC270',
  successDark: '#3D8B40',
  
  error: '#FF3B30',
  errorLight: '#FF6B63',
  errorDark: '#E52E24',
  
  warning: '#FFB800',
  warningLight: '#FFD147',
  warningDark: '#E5A500',
  
  info: '#2196F3',
  infoLight: '#4DB3F5',
  infoDark: '#1976D2',
  
  // Text Colors
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#CCCCCC',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#FAFAFA',
  
  // Surface Colors
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceDisabled: '#F5F5F5',
  
  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  borderDark: '#CCCCCC',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  grayLight: '#CCCCCC',
  grayDark: '#333333',
  
  // Dark Mode Colors (for future use)
  dark: {
    // Primary Colors
    primary: '#FF6B9D',
    primaryLight: '#FF8FB3',
    primaryDark: '#E5557D',
    
    // Secondary Colors
    secondary: '#6B9DFF',
    secondaryLight: '#8BB5FF',
    secondaryDark: '#4A7FE8',
    
    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textTertiary: '#999999',
    textDisabled: '#666666',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    
    // Background Colors
    background: '#1A1A1A',
    backgroundSecondary: '#2A2A2A',
    backgroundTertiary: '#333333',
    
    // Surface Colors
    surface: '#2A2A2A',
    surfaceElevated: '#333333',
    surfaceDisabled: '#1A1A1A',
    
    // Border Colors
    border: '#444444',
    borderLight: '#333333',
    borderDark: '#555555',
    
    // Overlay Colors
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
    overlayDark: 'rgba(0, 0, 0, 0.9)',
  },
  
  // Light Mode Colors (default)
  light: {
    // Primary Colors
    primary: '#FF6B9D',
    primaryLight: '#FF8FB3',
    primaryDark: '#E5557D',
    
    // Secondary Colors
    secondary: '#6B9DFF',
    secondaryLight: '#8BB5FF',
    secondaryDark: '#4A7FE8',
    
    // Text Colors
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textDisabled: '#CCCCCC',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    
    // Background Colors
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundTertiary: '#FAFAFA',
    
    // Surface Colors
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceDisabled: '#F5F5F5',
    
    // Border Colors
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    borderDark: '#CCCCCC',
    
    // Overlay Colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

// Helper function to get colors based on theme
export const getThemeColors = (isDark: boolean) => {
  return isDark ? Colors.dark : Colors.light;
};

// Export commonly used color combinations
export const ColorScheme = {
  // Primary theme
  primary: Colors.primary,
  secondary: Colors.secondary,
  
  // Text
  text: {
    primary: Colors.textPrimary,
    secondary: Colors.textSecondary,
    tertiary: Colors.textTertiary,
    disabled: Colors.textDisabled,
    onPrimary: Colors.textOnPrimary,
    onSecondary: Colors.textOnSecondary,
  },
  
  // Background
  background: Colors.background,
  backgroundSecondary: Colors.backgroundSecondary,
  backgroundTertiary: Colors.backgroundTertiary,
  
  // Surface
  surface: Colors.surface,
  surfaceElevated: Colors.surfaceElevated,
  
  // Border
  border: Colors.border,
  borderLight: Colors.borderLight,
  borderDark: Colors.borderDark,
  
  // Status
  success: Colors.success,
  error: Colors.error,
  warning: Colors.warning,
  info: Colors.info,
} as const;

// Type exports
export type ColorKey = keyof typeof Colors;
export type ThemeMode = 'light' | 'dark';
