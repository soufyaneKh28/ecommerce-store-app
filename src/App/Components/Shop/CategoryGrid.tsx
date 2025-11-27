import { Fonts } from '@/src/constants/theme';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CategoryGridItem {
  id: string;
  image: string;
  title: string;
}

interface CategoryGridProps {
  items: CategoryGridItem[];
  onItemPress?: (item: CategoryGridItem) => void;
}

const { width } = Dimensions.get('window');
const COLUMN_GAP = 15; // Gap between columns
const ITEM_WIDTH = (width - 40 - (COLUMN_GAP * 3)) / 4; // 4 columns with 3 gaps between them, accounting for padding
const ITEMS_PER_PAGE = 8; // 4 columns × 2 items per column = 8 items per page

/**
 * CategoryGrid Component
 * Horizontal scrollable grid with columns, each column has 2 items stacked vertically
 */
export const CategoryGrid: React.FC<CategoryGridProps> = ({
  items,
  onItemPress,
}) => {
  // Group items into pages of 8 (4 columns × 2 items per column)
  const groupedItems = React.useMemo(() => {
    const pages: CategoryGridItem[][] = [];
    for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
      pages.push(items.slice(i, i + ITEMS_PER_PAGE));
    }
    return pages;
  }, [items]);

  const renderPage = ({ item: pageItems }: { item: CategoryGridItem[] }) => {
    // Group items into columns: each column has 2 items
    // Column 1: items 0, 1 | Column 2: items 2, 3 | Column 3: items 4, 5 | Column 4: items 6, 7
    const columns: CategoryGridItem[][] = [];
    for (let i = 0; i < pageItems.length; i += 2) {
      columns.push(pageItems.slice(i, i + 2));
    }

    return (
      <View style={styles.pageContainer}>
        <View style={styles.columnsContainer}>
          {columns.map((columnItems, columnIndex) => (
            <View key={`column-${columnIndex}`} style={styles.column}>
              {columnItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryGridItem}
                  onPress={() => onItemPress?.(item)}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: item.image }} style={styles.categoryGridImage} />
                  <Text style={styles.categoryGridTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
              {/* Fill empty space if column has only 1 item */}
              {columnItems.length === 1 && (
                <View style={styles.categoryGridItem} />
              )}
            </View>
          ))}
          {/* Fill empty columns if needed to maintain layout */}
          {columns.length < 4 && Array.from({ length: 4 - columns.length }).map((_, idx) => (
            <View key={`empty-column-${idx}`} style={styles.column} />
          ))}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={groupedItems}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => `page-${index}`}
      renderItem={renderPage}
      contentContainerStyle={styles.container}
      pagingEnabled={false}
      decelerationRate="fast"
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  pageContainer: {
    width: width - 40, // Full width minus padding (20 on each side)
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: COLUMN_GAP,
  },
  column: {
    flexDirection: 'column',
    width: ITEM_WIDTH,
  },
  categoryGridItem: {
    width: ITEM_WIDTH,
    marginBottom: 15,
  },
  categoryGridImage: {
    width: '100%',
    height: ITEM_WIDTH,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  categoryGridTitle: {
    fontSize: 12,
    color: '#1C2229',
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
});
