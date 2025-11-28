import { ProductCard } from '@/src/App/Components';
import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { products } from '@/src/data/products';
import { Product } from '@/src/types/product';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

export default function TopPicksScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Top picks products (best rated, sorted by rating)
  const topPicks = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20); // Show more products on the dedicated screen

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
    <SafeAreaView  edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconSymbol name="chevron.left" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top picks</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Products Grid */}
      <FlatList
        data={topPicks}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.primary,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textOnPrimary,
    fontFamily: Fonts.bold,
  },
  placeholder: {
    width: 32,
  },
  productList: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

