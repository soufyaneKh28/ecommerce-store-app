import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useCartStore } from '@/src/stores/cartStore';
import { Product } from '@/src/types/product';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  variant?: 'default' | 'compact';
  style?: any;
}

/**
 * ProductCard Component
 * Reusable product card component for displaying products in grids
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  variant = 'default',
  style,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const addToCart = useCartStore((state) => state.addToCart);

  const handlePress = () => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart();
    } else {
      // Default behavior: add to cart using store
      const defaultSize = product.sizes[0] || 'M';
      const defaultColor = product.colors[0] || 'Default';
      addToCart(product, defaultSize, defaultColor, 1);
      Alert.alert('Added to Cart!', `${product.name} has been added to your cart.`);
    }
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity style={[styles.compactCard, style]} onPress={handlePress} activeOpacity={0.8}>
        <Image source={{ uri: product.images[0] }} style={styles.compactImage} />
        <Text style={styles.compactPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.compactSold}>{product.reviews} sold</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.productCard, style]} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

      
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>

          <IconSymbol name="star.fill" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>
            {product.rating} ({product.reviews})
          </Text>
          </View>
        <View style={styles.productFooter}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.soldText}>{Math.floor(product.reviews / 10)}k+ sold</Text>
        </View>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <IconSymbol name="plus" size={22} color={Colors.white} />
        </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH * 1.2,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
    // 
    // position: 'relative',
  },
  productName: {
    fontSize: 13,
    color: '#1C2229',
    marginBottom: 6,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    color: '#666666',
    marginLeft: 4,
    fontFamily: Fonts.regular,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },
  soldText: {
    fontSize: 11,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  addToCartButton: {
    // position: 'absolute',
    // bottom: 12,
    // right: 12,
    backgroundColor: Colors.primary,
    padding:5,
    borderRadius: 12,
  },
  // Compact variant styles
  compactCard: {
    width: 120,
    marginRight: 12,
  },
  compactImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  compactPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C2229',
    marginBottom: 4,
    fontFamily: Fonts.bold,
  },
  compactSold: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 0,
    marginBottom: 4,
  },
});

