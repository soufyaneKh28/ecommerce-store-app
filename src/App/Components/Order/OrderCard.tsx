import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type OrderStatus = 'received' | 'cancelled' | 'delivered';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  date: string;
  items: OrderItem[];
}

type OrderCardProps = {
  order: Order;
  onCancel: (orderId: string) => void;
  onTrack: (orderId: string) => void;
  onRate: (orderId: string) => void;
  onReorder: (orderId: string) => void;
};

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case 'received':
      return {
        title: 'Order Received',
        iconColor: '#4A90E2',
        backgroundColor: '#E8F4FD',
      };
    case 'cancelled':
      return {
        title: 'Order Cancelled',
        iconColor: '#FFB6C1',
        backgroundColor: '#FFF0F5',
      };
    case 'delivered':
      return {
        title: 'Order Delivered',
        iconColor: '#90EE90',
        backgroundColor: '#F0FFF0',
      };
    default:
      return {
        title: 'Order',
        iconColor: '#CCCCCC',
        backgroundColor: '#F5F5F5',
      };
  }
};

export function OrderCard({ order, onCancel, onTrack, onRate, onReorder }: OrderCardProps) {
  const config = getStatusConfig(order.status);

  const renderOrderItem = (item: OrderItem) => (
    <View key={item.id} style={styles.orderItem}>
      <Image source={{ uri: item.productImage }} style={styles.orderItemImage} />
      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemName} numberOfLines={2}>
          {item.productName}
        </Text>
        <Text style={styles.bestSellingTag}>#8 Best-Selling Item in Office Lighting</Text>
        <Text style={styles.orderItemVariant}>
          Size: {item.size} Color: {item.color}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={[styles.statusIcon, { backgroundColor: config.backgroundColor }]}>
          <IconSymbol name="shippingbox.fill" size={24} color={config.iconColor} />
        </View>
        <View style={styles.orderHeaderText}>
          <Text style={styles.orderStatusTitle}>{config.title}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
      </View>

      <View style={styles.orderItemsContainer}>{order.items.map(renderOrderItem)}</View>

      {order.status === 'received' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel(order.id)} activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackButton} onPress={() => onTrack(order.id)} activeOpacity={0.7}>
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>
      )}

      {order.status === 'delivered' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rateButton} onPress={() => onRate(order.id)} activeOpacity={0.7}>
            <Text style={styles.rateButtonText}>Rate Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reorderButton} onPress={() => onReorder(order.id)} activeOpacity={0.7}>
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});

