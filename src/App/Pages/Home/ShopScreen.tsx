import { CategoriesSlider, CategoryGrid, OffersCarousel, ProductCard, ShopHeader } from '@/src/App/Components';
import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { categories, products } from '@/src/data/products';
import { useShopStore } from '@/src/stores/shopStore';
import { Product } from '@/src/types/product';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  TopPicks: undefined;
  Search: undefined;
  CategoryDetails: { categoryId: string; categoryName: string };
};

// Mock data for offers carousel
const offers = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
  'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800',
  'https://images.unsplash.com/photo-1558769132-cb1aea742c7e?w=800',
];

// Mock data for category grid (BBQ Sale items)
const categoryGridItems = [
  { id: '1', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', title: 'BBQ Sale' },
  { id: '2', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300', title: 'BBQ Sale' },
  { id: '3', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300', title: 'BBQ Sale' },
  { id: '4', image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300', title: 'BBQ Sale' },
  { id: '5', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=300', title: 'BBQ Sale' },
  { id: '6', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300', title: 'BBQ Sale' },
  { id: '7', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300', title: 'BBQ Sale' },
  { id: '8', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300', title: 'BBQ Sale' },
  { id: '9', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=300', title: 'BBQ Sale' },
  { id: '10', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300', title: 'BBQ Sale' },
  { id: '11', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300', title: 'BBQ Sale' },
  { id: '12', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300', title: 'BBQ Sale' },
];

export default function ShopScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // Zustand store state
  const {
    searchQuery,
    selectedCategory,
    selectedTab,
    offerIndex,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTab,
    setOfferIndex,
  } = useShopStore();

  // Top picks products (best rated)
  const topPicks = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  // Filter products based on selected tab
  const getFilteredProducts = () => {
    let filtered = products;

    if (selectedTab === '5-Star Rated') {
      filtered = filtered.filter((p) => p.rating === 5);
    } else if (selectedTab === 'Best Selling Items') {
      filtered = filtered.sort((a, b) => b.reviews - a.reviews);
    } else if (selectedTab === 'New') {
      filtered = filtered.slice().reverse();
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Section with Offers Carousel, Header, and Categories */}
        <View style={styles.heroSection}>
          <OffersCarousel
            images={offers}
            height={350}
            onIndexChange={setOfferIndex}
          />
          
          <SafeAreaView edges={['top']}>
            <ShopHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchPress={() => navigation.navigate('Search')}
            />
            
            <CategoriesSlider
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </SafeAreaView>
        </View>

        {/* Category Grid (2 rows) */}
        <View style={styles.categoryGridContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoryGrid 
            items={categoryGridItems}
            onItemPress={(item) => {
              navigation.navigate('CategoryDetails', {
                categoryId: item.id,
                categoryName: item.title,
              });
            }}
          />
        </View>

        {/* Top Picks Section */}
        <View style={styles.topPicksContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => navigation.navigate('TopPicks')}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Top picks</Text>
            <IconSymbol name="chevron.right" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topPicksScroll}
          >
            {topPicks.map((product) => (
              <ProductCard key={product.id} product={product} variant="compact" />
            ))}
          </ScrollView>
        </View>

        {/* Product Tabs */}
        <View style={styles.tabsContainer}>
          {['All', '5-Star Rated', 'Best Selling Items', 'New'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              onPress={() => setSelectedTab(tab as "All" | "5-Star Rated" | "Best Selling Items" | "New")}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products Grid */}
        <View style={styles.productsGridContainer}>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productList}
            columnWrapperStyle={styles.productRow}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    position: 'relative',
    marginBottom: 200,
  },
  categoryGridContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    marginBottom: 15,
    paddingHorizontal: 20,
    fontFamily: Fonts.bold,
  },
  topPicksContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  topPicksScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 20,
  },
  tab: {
    paddingBottom: 8,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.medium,
  },
  tabTextActive: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },
  productsGridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  productList: {
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
