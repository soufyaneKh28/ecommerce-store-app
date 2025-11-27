import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ShopHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showLogo?: boolean;
  onSearchPress?: () => void;
}

/**
 * ShopHeader Component
 * Header with logo and search bar for shop screens
 */
export const ShopHeader: React.FC<ShopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  showLogo = true,
  onSearchPress,
}) => {
  return (
    <View style={styles.header}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <IconSymbol name="sparkles" size={24} color={Colors.primary} />
          <Text style={styles.logo}>QUTLI</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={onSearchPress}
        activeOpacity={0.7}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="What's your daily needs?"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={onSearchChange}
          editable={!onSearchPress}
          pointerEvents={onSearchPress ? 'none' : 'auto'}
        />
        <IconSymbol name="magnifyingglass" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 8,
    fontFamily: Fonts.bold,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
});

