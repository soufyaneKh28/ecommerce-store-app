import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useCartStore } from '@/src/stores/cartStore';
import { CartItem } from '@/src/types/product';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  Cart: undefined;
  Checkout: undefined;
  OrderSuccess: {
    orderId: string;
    total: number;
    itemsCount: number;
    paymentMethod: string;
    address: string;
    eta: string;
  };
  MyOrders: undefined;
};

type PaymentMethod = 'applePay' | 'payOnDelivery' | 'newCard';

export default function CheckoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount, clearCart } = useCartStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [priceBreakdownVisible, setPriceBreakdownVisible] = useState(false);
  const [priceSheetVisible, setPriceSheetVisible] = useState(false);
  const quantitySheetRef = useRef<BottomSheet>(null);
  const quantitySnapPoints = useMemo(() => ['35%'], []);
  const priceSheetRef = useRef<BottomSheet>(null);
  const priceSnapPoints = useMemo(() => ['50%'], []);
  const totalItems = getCartItemsCount();
  const total = getCartTotal();
  const deliveryFee = total > 150 ? 0 : 12.5;
  const taxes = total * 0.08;
  const discount = total > 200 ? total * 0.05 : 0;
  const grandTotal = total + deliveryFee + taxes - discount;

  // Mock delivery address
  const deliveryAddress = {
    name: 'My Home',
    address: '759 Ashcraft Court San Diego',
    city: 'Istanbul 34010, Floor: 11',
  };

  const handleQuantitySheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        setQuantityModalVisible(false);
        setSelectedItem(null);
      }
    },
    []
  );

  const handlePriceSheetChange = useCallback((index: number) => {
        if (index === -1) {
          setPriceSheetVisible(false);
        }
      }, []);
    

  const renderQuantityBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderPriceBackdrop = useCallback(
       (props: any) => (
         <BottomSheetBackdrop
           {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        ),
        []
      );
    

  const handleQuantitySelect = (item: CartItem, newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
    quantitySheetRef.current?.close();
  };

  const openQuantityModal = (item: CartItem) => {
    setSelectedItem(item);
    setQuantityModalVisible(true);
    requestAnimationFrame(() => {
      quantitySheetRef.current?.snapToIndex(0);
    });
  };

  const openPriceSheet = () => {
       setPriceSheetVisible(true);
        requestAnimationFrame(() => {
          priceSheetRef.current?.snapToIndex(0);
        });
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

    const orderSummary = {
      orderId: `QTL-${Date.now().toString().slice(-6)}`,
      total,
      itemsCount: totalItems,
      paymentMethod:
        selectedPayment === 'applePay'
          ? 'Apple Pay'
          : selectedPayment === 'payOnDelivery'
            ? 'Pay on Delivery'
            : 'New Card',
      address: `${deliveryAddress.address}, ${deliveryAddress.city}`,
      eta: '1-3 Business Days',
    };

    clearCart();
    navigation.navigate('OrderSuccess', orderSummary);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
      <TouchableOpacity style={styles.totalContainer} activeOpacity={0.8} onPress={openPriceSheet}>
          <Text style={styles.totalLabel}>Total</Text>
          <View style={styles.totalValueRow}>
            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            <IconSymbol name="chevron.up.chevron.down" size={16} color="#1C2229" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrderAndPay}>
          <Text style={styles.orderButtonText}>Order and pay ({totalItems})</Text>
        </TouchableOpacity>
      </View>

      {/* Price Breakdown Modal */}
      {/* <Modal
        visible={priceBreakdownVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPriceBreakdownVisible(false)}
      >
        <View style={styles.breakdownOverlay}>
          <View style={styles.breakdownSheet}>
            <View style={styles.breakdownHandle} />
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownTitle}>Price Details</Text>
              <TouchableOpacity onPress={() => setPriceBreakdownVisible(false)}>
                <IconSymbol name="xmark" size={22} color="#1C2229" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.breakdownItemsRow}>
                {cart.map((item) => (
                  <View key={`${item.product.id}-${item.selectedColor}`} style={styles.breakdownItem}>
                    <Image source={{ uri: item.product.images[0] }} style={styles.breakdownImage} />
                    <Text style={styles.breakdownItemName} numberOfLines={2}>
                      {item.product.name}
                    </Text>
                    <Text style={styles.breakdownItemPrice}>${item.product.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.breakdownList}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Subtotal</Text>
                  <Text style={styles.breakdownValue}>${total.toFixed(2)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Delivery</Text>
                  <Text style={styles.breakdownValue}>
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Taxes</Text>
                  <Text style={styles.breakdownValue}>${taxes.toFixed(2)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Discount</Text>
                  <Text style={[styles.breakdownValue, styles.negativeValue]}>
                    -${discount.toFixed(2)}
                  </Text>
                </View>
                <View style={[styles.breakdownRow, styles.breakdownRowTotal]}>
                  <Text style={styles.breakdownTotalLabel}>Grand Total</Text>
                  <Text style={styles.breakdownTotalValue}>${grandTotal.toFixed(2)}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal> */}
       <BottomSheet
        ref={priceSheetRef}
       index={priceSheetVisible ? 0 : -1}
       snapPoints={priceSnapPoints}
       enablePanDownToClose
      //  style={{backgroundColor: 'red'}}
       onChange={handlePriceSheetChange}
       backdropComponent={renderPriceBackdrop}
     >
       <BottomSheetView style={styles.breakdownSheet}>
         {/* <View style={styles.breakdownHandle} /> */}
         <View style={styles.breakdownHeader}>
           <Text style={styles.breakdownTitle}>Price Details</Text>
           <TouchableOpacity onPress={() => priceSheetRef.current?.close()}>
             <IconSymbol name="xmark" size={22} color="#1C2229" />
           </TouchableOpacity>
         </View>
         <BottomSheetScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.breakdownItemsRow}>
             {cart.map((item) => (
               <View key={`${item.product.id}-${item.selectedColor}`} style={styles.breakdownItem}>
                 <Image source={{ uri: item.product.images[0] }} style={styles.breakdownImage} />
                 <Text style={styles.breakdownItemName} numberOfLines={2}>
                   {item.product.name}
                 </Text>
                 <Text style={styles.breakdownItemPrice}>${item.product.price.toFixed(2)}</Text>
               </View>
             ))}
           </View>

           <View style={styles.breakdownList}>
             <View style={styles.breakdownRow}>
               <Text style={styles.breakdownLabel}>Subtotal</Text>
               <Text style={styles.breakdownValue}>${total.toFixed(2)}</Text>
             </View>
             <View style={styles.breakdownRow}>
               <Text style={styles.breakdownLabel}>Delivery</Text>
               <Text style={styles.breakdownValue}>
                 {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
               </Text>
             </View>
             <View style={styles.breakdownRow}>
               <Text style={styles.breakdownLabel}>Taxes</Text>
               <Text style={styles.breakdownValue}>${taxes.toFixed(2)}</Text>
             </View>
             <View style={styles.breakdownRow}>
               <Text style={styles.breakdownLabel}>Discount</Text>
               <Text style={[styles.breakdownValue, styles.negativeValue]}>-${discount.toFixed(2)}</Text>
             </View>
             <View style={[styles.breakdownRow, styles.breakdownRowTotal]}>
               <Text style={styles.breakdownTotalLabel}>Grand Total</Text>
               <Text style={styles.breakdownTotalValue}>${grandTotal.toFixed(2)}</Text>
             </View>
           </View>
        </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
    <BottomSheet
      ref={quantitySheetRef}
      index={quantityModalVisible ? 0 : -1}
      snapPoints={quantitySnapPoints}
      enablePanDownToClose
    //  style={{backgroundColor: 'red'}}
      onChange={handleQuantitySheetChange}
      backdropComponent={renderQuantityBackdrop}
    >
      <BottomSheetView style={styles.quantitySheet}>
        <View style={styles.quantityHeader}>
          <Text style={styles.modalTitle}>Select Quantity</Text>
          <TouchableOpacity onPress={() => quantitySheetRef.current?.close()}>
            <IconSymbol name="xmark" size={22} color="#1C2229" />
          </TouchableOpacity>
        </View>
        {selectedItem && (
          <View style={styles.quantityGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => {
              const isActive = selectedItem.quantity === qty;
              return (
                <TouchableOpacity
                  key={qty}
                  style={[styles.quantityChip, isActive && styles.quantityChipActive]}
                  onPress={() => handleQuantitySelect(selectedItem, qty)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.quantityChipText, isActive && styles.quantityChipTextActive]}>
                    {qty}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
    </GestureHandlerRootView>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  quantitySheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  quantityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quantityChip: {
    width: '22%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quantityChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  quantityChipText: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  quantityChipTextActive: {
    color: '#FFFFFF',
  },
  breakdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
   
  },
  breakdownListContainer: {
    // paddingBottom: 100,
    // flex: 1,
  },
  breakdownSheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 120,
    // maxHeight: '70%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    // backgroundColor: 'blue',
  },
  breakdownHandle: {
    alignSelf: 'center',
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  breakdownItemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  breakdownItem: {
    width: (Dimensions.get('window').width - 20 * 2 - 12 * 2) / 3,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 16,
    padding: 10,
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
  },
  breakdownImage: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#F5F5F5',
  },
  breakdownItemName: {
    fontSize: 11,
    color: '#4C4C4C',
    textAlign: 'left',
    marginBottom: 4,
    fontFamily: Fonts.medium,
  },
  breakdownItemPrice: {
    fontSize: 12,
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },
  breakdownList: {
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    paddingTop: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts.regular,
  },
  breakdownValue: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  negativeValue: {
    color: Colors.primary,
  },
  breakdownRowTotal: {
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    paddingTop: 12,
    marginTop: 8,
  },
  breakdownTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: Fonts.bold,
  },
  breakdownTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
});

