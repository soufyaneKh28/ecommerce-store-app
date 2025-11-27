import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon: string;
  iconColor?: string;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

/**
 * Auth Input Component
 * Styled input field with icon and optional password toggle
 */
export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  icon,
  iconColor = Colors.primary,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword,
  style,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <IconSymbol name={icon as any} size={20} color={iconColor} />
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#999"
          {...textInputProps}
        />
        {showPasswordToggle && onTogglePassword && (
          <TouchableOpacity onPress={onTogglePassword}>
            <IconSymbol
              name={isPasswordVisible ? "eye.slash.fill" : "eye.fill"}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#1C2229',
    marginBottom: 8,
    fontFamily: Fonts.medium,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
});

