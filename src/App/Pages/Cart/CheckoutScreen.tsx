import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useCartStore } from '@/src/stores/cartStore';
import { CartItem } from '@/src/types/product';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  Cart: undefined;
  Checkout: undefined;
};

type PaymentMethod = 'applePay' | 'payOnDelivery' | 'newCard';

export default function CheckoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const totalItems = getCartItemsCount();
  const total = getCartTotal();

  // Mock delivery address
  const deliveryAddress = {
    name: 'My Home',
    address: '759 Ashcraft Court San Diego',
    city: 'Istanbul 34010, Floor: 11',
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

  const handleOrderAndPay = () => {
    if (!selectedPayment) {
      Alert.alert('Payment Method Required', 'Please select a payment method.');
      return;
    }
    Alert.alert(
      'Order Placed!',
      'Your order has been placed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('MainTabs');
          },
        },
      ]
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
        <Text style={styles.headerTitle}>Checkout ({totalItems})</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <IconSymbol name="location" size={20} color={Colors.primary} />
            <Text style={styles.addressTitle}>{deliveryAddress.name}</Text>
          </View>
          <Text style={styles.addressText}>{deliveryAddress.address}</Text>
          <Text style={styles.addressText}>{deliveryAddress.city}</Text>
          <TouchableOpacity style={styles.editAddressButton}>
            <IconSymbol name="chevron.right" size={18} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* Product List */}
        <View style={styles.productsSection}>
          {cart.map(renderCartItem)}
        </View>

        {/* Payment Methods Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Methods:</Text>
          
          {/* Apple Pay */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment('applePay')}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {selectedPayment === 'applePay' && <View style={styles.radioButtonSelected} />}
            </View>
            <View style={styles.paymentButton}>
              <View style={styles.paymentButtonContent}>
                <Text style={styles.paymentButtonText}>Pay</Text>
              </View>
            </View>
            <Text style={styles.paymentLabel}>Apple Pay</Text>
          </TouchableOpacity>

          {/* Pay on Delivery */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment('payOnDelivery')}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {selectedPayment === 'payOnDelivery' && <View style={styles.radioButtonSelected} />}
            </View>
            <View style={styles.paymentButton}>
              <View style={styles.paymentButtonContent}>
                <Text style={styles.paymentButtonText}>Pay</Text>
              </View>
            </View>
            <Text style={styles.paymentLabel}>Pay on Delivery</Text>
          </TouchableOpacity>

          {/* Add a new card */}
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment('newCard')}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {selectedPayment === 'newCard' && <View style={styles.radioButtonSelected} />}
            </View>
            <View style={styles.paymentButton}>
              <IconSymbol name="plus" size={20} color="#1C2229" />
            </View>
            <Text style={styles.paymentLabel}>Add a new card</Text>
          </TouchableOpacity>
        </View>

        {/* Security Information */}
        <View style={styles.securitySection}>
          <View style={styles.securityItem}>
            <IconSymbol name="shippingbox.fill" size={18} color={Colors.success} />
            <Text style={styles.securityText}>Delivery guarantee</Text>
          </View>
          <View style={styles.securityItem}>
            <IconSymbol name="shippingbox.fill" size={18} color={Colors.success} />
            <Text style={styles.securityText}>Qutli protects your card information</Text>
            <View style={styles.cardIcons}>
              <View style={[styles.cardIcon, { backgroundColor: '#FF3B30' }]} />
              <View style={[styles.cardIcon, { backgroundColor: Colors.primary }]} />
              <View style={[styles.cardIcon, { backgroundColor: '#FFB800' }]} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <View style={styles.totalValueRow}>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            <Text style={styles.chevronDown}>▼</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrderAndPay}>
          <Text style={styles.orderButtonText}>Order and pay ({totalItems})</Text>
        </TouchableOpacity>
      </View>

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
  addressSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  editAddressButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  productsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
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
    fontSize: 18,
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
  paymentSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  paymentButton: {
    width: 60,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentButtonText: {
    fontSize: 12,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
    flex: 1,
  },
  securitySection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  securityText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
    flex: 1,
  },
  cardIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  cardIcon: {
    width: 24,
    height: 16,
    borderRadius: 4,
  },
  footer: {
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
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  totalValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 16,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
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
    width: '80%',
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

