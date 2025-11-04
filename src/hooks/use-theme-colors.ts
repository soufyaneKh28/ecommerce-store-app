import { Colors, getThemeColors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';

/**
 * Hook to get theme-aware colors
 * Returns colors based on current color scheme (light/dark)
 */
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = getThemeColors(isDark);

  return {
    ...themeColors,
    // Quick access to common colors
    primary: Colors.primary,
    secondary: Colors.secondary,
    textPrimary: themeColors.textPrimary,
    textSecondary: themeColors.textSecondary,
    background: themeColors.background,
    surface: themeColors.surface,
    border: themeColors.border,
    // Status colors
    success: Colors.success,
    error: Colors.error,
    warning: Colors.warning,
    info: Colors.info,
    // Utility
    isDark,
  };
};

