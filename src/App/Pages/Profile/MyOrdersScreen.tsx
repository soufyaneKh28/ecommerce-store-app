import { Order, OrderCard } from '@/src/App/Components/Order/OrderCard';
import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  MyOrders: undefined;
};

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    status: 'received',
    date: '21st March 2022',
    items: [
      {
        id: '1-1',
        productId: '1',
        productName: 'GoPro Hero - Compact Waterproof Action Camera with 4K Ultra HD Video, 12MP Photo...',
        productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
        size: 'L',
        color: 'Black',
      },
      {
        id: '1-2',
        productId: '2',
        productName: 'GoPro Hero - Compact Waterproof Action Camera with 4K Ultra HD Video, 12MP Photo...',
        productImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300',
        size: 'L',
        color: 'Black',
      },
    ],
  },
  {
    id: '2',
    status: 'cancelled',
    date: '21st March 2022',
    items: [
      {
        id: '2-1',
        productId: '3',
        productName: 'GoPro Hero - Compact Waterproof Action Camera with 4K Ultra HD Video, 12MP Photo...',
        productImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300',
        size: 'L',
        color: 'Black',
      },
    ],
  },
  {
    id: '3',
    status: 'delivered',
    date: '21st March 2022',
    items: [
      {
        id: '3-1',
        productId: '4',
        productName: 'GoPro Hero - Compact Waterproof Action Camera with 4K Ultra HD Video, 12MP Photo...',
        productImage: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300',
        size: 'L',
        color: 'Black',
      },
      {
        id: '3-2',
        productId: '5',
        productName: 'GoPro Hero - Compact Waterproof Action Camera with 4K Ultra HD Video, 12MP Photo...',
        productImage: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=300',
        size: 'L',
        color: 'Black',
      },
    ],
  },
];

export default function MyOrdersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleCancelOrder = (orderId: string) => {
    // Handle cancel order
  };

  const handleTrackOrder = (orderId: string) => {
    // Handle track order
  };

  const handleRateOrder = (orderId: string) => {
    // Handle rate order
  };

  const handleReorder = (orderId: string) => {
    // Handle reorder
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
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="slider.horizontal.3" size={20} color="#1C2229" />
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={handleCancelOrder}
            onTrack={handleTrackOrder}
            onRate={handleRateOrder}
            onReorder={handleReorder}
          />
        ))}
      </ScrollView>

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
            <Text style={styles.modalTitle}>Filter Orders</Text>
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
  filterButton: {
    padding: 4,
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderHeaderText: {
    flex: 1,
  },
  orderStatusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  orderItemsContainer: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  orderItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
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
  orderItemVariant: {
    fontSize: 12,
    color: '#666666',
    fontFamily: Fonts.regular,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
  trackButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
  },
  rateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reorderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Fonts.medium,
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

