import { ProductCard } from '@/src/App/Components/Product/ProductCard';
import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { products } from '@/src/data/products';
import { Product } from '@/src/types/product';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (width - 48) / 2;

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  CategoryDetails: { categoryId: string; categoryName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryDetails'>;

export default function CategoryDetailsScreen({ route, navigation }: Props) {
  const { categoryId, categoryName } = route.params;
  const [sortBy, setSortBy] = useState<string>('All');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');

  // Mock sub-categories
  const subCategories = ['All', 'T-Shirts', 'Jeans', 'Dresses', 'Shoes', 'Accessories', 'Outerwear'];

  // Filter products by category (for demo, showing all products)
  // In a real app, you would filter by categoryId
  let categoryProducts = products;

  // Filter by sub-category
  if (selectedSubCategory !== 'All') {
    categoryProducts = categoryProducts.filter((p) => 
      p.category.toLowerCase().includes(selectedSubCategory.toLowerCase())
    );
  }

  // Filter by search query
  if (searchQuery) {
    categoryProducts = categoryProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting
  const getSortedProducts = () => {
    let sorted = [...categoryProducts];

    switch (sortBy) {
      case 'Price: Low to High':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'Best Selling':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // 'All' - no sorting
        break;
    }

    return sorted;
  };

  const sortedProducts = getSortedProducts();

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

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      activeOpacity={0.8}
    >
      <ProductCard product={item} />
    </TouchableOpacity>
  );

  const sortOptions = ['All', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Best Selling'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Back Button and Search */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="chevron.left" size={24} color="#1C2229" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="What's your daily needs?"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <IconSymbol name="magnifyingglass" size={18} color="#999999" />
        </View>
      </View>

      {/* Sub-Categories Slider */}
      <View style={styles.subCategoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subCategoriesScroll}
        >
          {subCategories.map((subCat) => (
            <TouchableOpacity
              key={subCat}
              style={[
                styles.subCategoryChip,
                selectedSubCategory === subCat && styles.subCategoryChipActive,
              ]}
              onPress={() => setSelectedSubCategory(subCat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  selectedSubCategory === subCat && styles.subCategoryTextActive,
                ]}
              >
                {subCat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort and Filter Bar */}
      <View style={styles.sortFilterBar}>
        <TouchableOpacity
          style={styles.sortFilterButton}
          onPress={() => setShowSortModal(true)}
          activeOpacity={0.7}
        >
          <IconSymbol name="arrow.up.arrow.down" size={18} color="#1C2229" />
          <Text style={styles.sortFilterText}>Sort By</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortFilterButton}
          onPress={() => setShowFilterModal(true)}
          activeOpacity={0.7}
        >
          <IconSymbol name="slider.horizontal.3" size={18} color="#1C2229" />
          <Text style={styles.sortFilterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={sortedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
      />

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  sortBy === option && styles.modalOptionActive,
                ]}
                onPress={() => {
                  setSortBy(option);
                  setShowSortModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    sortBy === option && styles.modalOptionTextActive,
                  ]}
                >
                  {option}
                </Text>
                {sortBy === option && (
                  <IconSymbol name="checkmark" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <Text style={styles.modalSubtitle}>Filter options will be available soon</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  subCategoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  subCategoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  subCategoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  subCategoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  subCategoryText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  subCategoryTextActive: {
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
  },
  sortFilterBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 16,
  },
  sortFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortFilterText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  productsGrid: {
    padding: 16,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: PRODUCT_CARD_WIDTH,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.regular,
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalOptionActive: {
    backgroundColor: '#FFF5F3',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  modalOptionTextActive: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
  },
});

