import { ProductCard } from '@/src/App/Components/Product/ProductCard';
import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { categories, products } from '@/src/data/products';
import { Product } from '@/src/types/product';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.35;
const CONTENT_WIDTH = width - SIDEBAR_WIDTH;
const CATEGORY_CARD_SIZE = (CONTENT_WIDTH - 48) / 3;
const PRODUCT_CARD_WIDTH = (CONTENT_WIDTH - 48) / 2;

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  Reviews: { productId: string };
  CategoryDetails: { categoryId: string; categoryName: string };
  Search: undefined;
};

// Menu items for sidebar
const menuItems = [
  'My Gifts',
  '48-Hr Deal',
  'Home & Kitchen',
  'Electronics',
  'Fashion',
  'Beauty',
  'Sports',
  'Books',
];

export default function CategoriesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState<string>('Home & Kitchen');
  const [searchQuery, setSearchQuery] = useState('');

  // Get trending products (first 6 products)
  const trendingProducts = products.slice(0, 6);

  // Filter categories based on selected category (for demo, showing all categories)
  const filteredCategories = categories;

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderStars = (rating: number, size: number = 12) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <IconSymbol key={`full-${i}`} name="star.fill" size={size} color={Colors.error} />
        ))}
        {hasHalfStar && (
          <IconSymbol name="star.lefthalf.fill" size={size} color={Colors.error} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <IconSymbol key={`empty-${i}`} name="star" size={size} color="#CCCCCC" />
        ))}
      </View>
    );
  };

  const renderCategoryCard = ({ item, index }: { item: any; index: number }) => {
    if (index === 0) {
      // "View All" card
      return (
        <TouchableOpacity style={styles.viewAllCard} activeOpacity={0.7}>
          <View style={styles.viewAllIconContainer}>
            <View style={styles.gridIconContainer}>
              <View style={styles.gridRow}>
                <View style={styles.gridSquare} />
                <View style={styles.gridSquare} />
                <View style={styles.gridSquare} />
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridSquare} />
                <View style={styles.gridSquare} />
                <View style={styles.gridSquare} />
              </View>
              <View style={styles.gridRow}>
                <View style={styles.gridSquare} />
                <View style={styles.gridSquare} />
                <View style={styles.gridSquare} />
              </View>
            </View>
          </View>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.categoryCard} 
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('CategoryDetails', {
            categoryId: item.id,
            categoryName: item.name || 'BBQ Sale',
          });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryLabel}>BBQ Sale</Text>
      </TouchableOpacity>
    );
  };

  const renderTrendingProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.trendingCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.images[0] }} style={styles.trendingImage} />
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingProductTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.trendingRating}>
          {renderStars(item.rating, 12)}
          <Text style={styles.trendingRatingCount}>({item.reviews})</Text>
        </View>
        <Text style={styles.trendingPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.trendingSold}>{Math.floor(item.reviews / 10)}k+ sold</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <IconSymbol name="magnifyingglass" size={18} color="#999999" />
          <Text style={styles.searchPlaceholder}>What are you looking For?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>{selectedCategory}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  item === selectedCategory && styles.menuItemActive,
                ]}
                onPress={() => setSelectedCategory(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    item === selectedCategory && styles.menuItemTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Right Content Area */}
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          {/* Categories Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selectedCategory}</Text>
            <FlatList
              data={[{ id: 'view-all' }, ...filteredCategories]}
              renderItem={renderCategoryCard}
              keyExtractor={(item, index) => item.id || `category-${index}`}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.categoriesGrid}
              columnWrapperStyle={styles.categoryRow}
            />
          </View>

          {/* Trending Items Section */}
          <View style={styles.section}>
            <Text style={styles.trendingTitle}>Trending Items</Text>
            <FlatList
              data={trendingProducts}
              renderItem={renderTrendingProduct}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.trendingGrid}
              columnWrapperStyle={styles.trendingRow}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: Colors.backgroundSecondary,
    paddingTop: 16,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Fonts.bold,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemActive: {
    backgroundColor: '#E8E8E0',
  },
  menuItemText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  menuItemTextActive: {
    fontFamily: Fonts.medium,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Fonts.bold,
    marginBottom: 12,
  },
  categoriesGrid: {
    paddingTop: 4,
  },
  categoryRow: {
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  viewAllCard: {
    width: CATEGORY_CARD_SIZE,
    height: CATEGORY_CARD_SIZE,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  viewAllIconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIconContainer: {
    width: 24,
    height: 24,
    flexDirection: 'column',
    gap: 2,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 2,
  },
  gridSquare: {
    width: 6,
    height: 6,
    backgroundColor: '#666666',
    borderRadius: 1,
  },
  viewAllText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: Fonts.medium,
  },
  categoryCard: {
    width: CATEGORY_CARD_SIZE,
    marginRight: 8,
  },
  categoryImage: {
    width: CATEGORY_CARD_SIZE,
    height: CATEGORY_CARD_SIZE,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#1C2229',
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 6,
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 16,
  },
  trendingGrid: {
    paddingTop: 4,
  },
  trendingRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  trendingCard: {
    width: PRODUCT_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: PRODUCT_CARD_WIDTH * 1.2,
    backgroundColor: '#F5F5F5',
  },
  trendingInfo: {
    padding: 12,
  },
  trendingProductTitle: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
    marginBottom: 6,
    lineHeight: 18,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  trendingRatingCount: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.error,
    fontFamily: Fonts.bold,
    marginBottom: 4,
  },
  trendingSold: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
});
