import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { products } from '@/src/data/products';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useCartStore } from '@/src/stores/cartStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const product = products.find((p) => p.id === productId);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <Text style={[styles.errorText, isDark && styles.textDark]}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    Alert.alert(
      'Added to Cart!',
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.navigate('MainTabs', { screen: 'Cart' }) },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {product.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.thumbnailSelected,
                ]}
              >
                <Image source={{ uri: img }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <IconSymbol name="star.fill" size={16} color="#FFB800" />
            <Text style={[styles.ratingText, isDark && styles.textDark]}>
              {product.rating} ({product.reviews} reviews)
            </Text>
          </View>

          <Text style={[styles.productName, isDark && styles.textDark]}>{product.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Select Size</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionsContainer}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.optionButton,
                      selectedSize === size && styles.optionButtonSelected,
                      isDark && styles.optionButtonDark,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedSize === size && styles.optionTextSelected,
                        isDark && selectedSize !== size && styles.textDark,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Select Color</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.optionsContainer}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.optionButton,
                      selectedColor === color && styles.optionButtonSelected,
                      isDark && styles.optionButtonDark,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedColor === color && styles.optionTextSelected,
                        isDark && selectedColor !== color && styles.textDark,
                      ]}
                    >
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Description</Text>
            <Text style={[styles.description, isDark && styles.textDark]}>
              {product.description}
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Features</Text>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, isDark && styles.textDark]}>
                Free shipping on orders over $50
              </Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, isDark && styles.textDark]}>
                Easy 30-day returns
              </Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol name="checkmark.circle.fill" size={20} color="#4CAF50" />
              <Text style={[styles.featureText, isDark && styles.textDark]}>
                Secure payment options
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={[styles.footer, isDark && styles.footerDark]}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <IconSymbol name="cart.fill" size={22} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  imageContainer: {
    width: width,
    height: width * 1.2,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  discountBadge: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  thumbnailContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  thumbnail: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: '#FF6B9D',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    padding: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  textDark: {
    color: '#fff',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 20,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
    marginRight: 10,
    minWidth: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  optionButtonSelected: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFF0F5',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FF6B9D',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerDark: {
    backgroundColor: '#2a2a2a',
    borderTopColor: '#333',
  },
  addToCartButton: {
    backgroundColor: '#FF6B9D',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  },
});

