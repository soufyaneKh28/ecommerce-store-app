import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { products } from '@/src/data/products';
import { useCartStore } from '@/src/stores/cartStore';
import { CartItem, Product } from '@/src/types/product';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (width - 48) / 2;

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
  Checkout: undefined;
};

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, getCartItemsCount, addToCart } = useCartStore();
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // Get recommended products (exclude items in cart)
  const cartProductIds = cart.map((item) => item.product.id);
  const recommendedProducts = products
    .filter((p) => !cartProductIds.includes(p.id))
    .slice(0, 4);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is Empty', 'Add some items to your cart before checking out.');
      return;
    }
    navigation.navigate('Checkout');
  };

  const handleQuantitySelect = (item: CartItem, newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
    setQuantityModalVisible(false);
    setSelectedItem(null);
  };

  const openQuantityModal = (item: CartItem) => {
    setSelectedItem(item);
    setQuantityModalVisible(true);
  };

  const calculateDiscount = (item: CartItem) => {
    if (item.product.originalPrice) {
      const discount = Math.round(
        ((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100
      );
      return discount;
    }
    return 0;
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

  const renderCartItem = (item: CartItem) => {
    const discount = calculateDiscount(item);
    const bestSellingTag = '#8 Best-Selling Item in Office Lighting';

    return (
      <View key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} style={styles.cartItem}>
        <Image source={{ uri: item.product.images[0] }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.product.name}
          </Text>
          <Text style={styles.bestSellingTag}>{bestSellingTag}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
            {discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{discount}%</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.quantitySelector}
            onPress={() => openQuantityModal(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Text style={styles.chevronDown}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeFromCart(item.product.id)}
            activeOpacity={0.7}
          >
            <IconSymbol name="trash" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderRecommendedProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.recommendedCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.images[0] }} style={styles.recommendedImage} />
      <View style={styles.recommendedInfo}>
        <Text style={styles.recommendedTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.recommendedRating}>
          {renderStars(item.rating, 12)}
          <Text style={styles.recommendedRatingCount}>({item.reviews})</Text>
        </View>
        <View style={styles.recommendedPriceRow}>
          <View>
            <Text style={styles.recommendedPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.recommendedSold}>{Math.floor(item.reviews / 10)}k+ sold</Text>
          </View>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={(e) => {
              e.stopPropagation();
              addToCart(item, item.sizes[0] || 'M', item.colors[0] || 'Default', 1);
              Alert.alert('Added to Cart!', `${item.name} has been added to your cart.`);
            }}
            activeOpacity={0.7}
          >
            <IconSymbol name="cart" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const totalItems = getCartItemsCount();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="chevron.left" size={24} color="#1C2229" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart ({totalItems})</Text>
        <View style={styles.backButton} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol name="cart" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Start shopping to add items to your cart</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Cart Items */}
            <View style={styles.cartItemsContainer}>
              {cart.map(renderCartItem)}
            </View>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <View style={styles.recommendedSection}>
                <FlatList
                  data={recommendedProducts}
                  renderItem={renderRecommendedProduct}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={styles.recommendedGrid}
                  columnWrapperStyle={styles.recommendedRow}
                />
              </View>
            )}
          </ScrollView>

          {/* Bottom Checkout Bar */}
          <View style={styles.checkoutBar}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${getCartTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Checkout ({totalItems})</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Quantity Modal */}
      <Modal
        visible={quantityModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setQuantityModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setQuantityModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Quantity</Text>
            {selectedItem && (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                  <TouchableOpacity
                    key={qty}
                    style={[
                      styles.quantityOption,
                      selectedItem.quantity === qty && styles.quantityOptionActive,
                    ]}
                    onPress={() => handleQuantitySelect(selectedItem, qty)}
                  >
                    <Text
                      style={[
                        styles.quantityOptionText,
                        selectedItem.quantity === qty && styles.quantityOptionTextActive,
                      ]}
                    >
                      {qty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.backgroundSecondary,
  },
  backButton: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  cartItemsContainer: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C2229',
    fontFamily: Fonts.medium,
    lineHeight: 18,
    marginBottom: 4,
  },
  bestSellingTag: {
    fontSize: 11,
    color: Colors.success,
    fontFamily: Fonts.regular,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },
  discountBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  quantitySelector: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 60,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  chevronDown: {
    fontSize: 10,
    color: '#666666',
  },
  deleteButton: {
    padding: 4,
  },
  recommendedSection: {
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
    paddingBottom: 20,
  },
  recommendedGrid: {
    paddingHorizontal: 16,
  },
  recommendedRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recommendedCard: {
    width: PRODUCT_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recommendedImage: {
    width: '100%',
    height: PRODUCT_CARD_WIDTH * 1.2,
    backgroundColor: '#F5F5F5',
  },
  recommendedInfo: {
    padding: 12,
  },
  recommendedTitle: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
    marginBottom: 6,
    lineHeight: 18,
  },
  recommendedRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  recommendedRatingCount: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  recommendedPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  recommendedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.error,
    fontFamily: Fonts.bold,
    marginBottom: 2,
  },
  recommendedSold: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 16,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: Fonts.bold,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 16,
    textAlign: 'center',
  },
  quantityOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  quantityOptionActive: {
    backgroundColor: Colors.primary,
  },
  quantityOptionText: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  quantityOptionTextActive: {
    color: '#FFFFFF',
  },
});
