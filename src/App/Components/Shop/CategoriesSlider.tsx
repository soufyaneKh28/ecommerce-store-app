import { Colors, Fonts } from '@/src/constants/theme';
import { Category } from '@/src/types/product';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CategoriesSliderProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryName: string) => void;
}

/**
 * CategoriesSlider Component
 * Horizontal scrollable category chips using FlatList
 */
export const CategoriesSlider: React.FC<CategoriesSliderProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === item.name && styles.categoryChipActive,
          ]}
          onPress={() => onCategorySelect(item.name)}
        >
          <Text
            style={[
              styles.categoryChipText,
              selectedCategory === item.name && styles.categoryChipTextActive,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.categoriesScrollContent}
      style={styles.categoriesScroll}
    />
  );
};

const styles = StyleSheet.create({
  categoriesScroll: {
    height: 40,
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryChipActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    borderRadius: 0,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.medium,
  },
  categoryChipTextActive: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});

