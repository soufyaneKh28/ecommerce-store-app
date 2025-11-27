import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { products } from '@/src/data/products';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  ProductDetails: { productId: string };
  Reviews: { productId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Reviews'>;

// Mock review data (expanded version)
interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'David Johnson',
    date: '30 days ago',
    rating: 4,
    comment: 'Amazing! An amazing fit. I am somewhere around 6ft and ordered 40 size. The quality is excellent and the material feels premium.',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    date: '15 days ago',
    rating: 5,
    comment: 'Perfect quality and fast shipping. Highly recommend! The product exceeded my expectations.',
  },
  {
    id: '3',
    name: 'Michael Brown',
    date: '7 days ago',
    rating: 4,
    comment: 'Great product, exactly as described. Very satisfied with the purchase!',
  },
  {
    id: '4',
    name: 'Emily Davis',
    date: '5 days ago',
    rating: 5,
    comment: 'Love it! The design is beautiful and the quality is top-notch. Will definitely order again.',
  },
  {
    id: '5',
    name: 'James Wilson',
    date: '3 days ago',
    rating: 4,
    comment: 'Good value for money. The product arrived on time and in perfect condition.',
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    date: '2 days ago',
    rating: 5,
    comment: 'Absolutely fantastic! Better than I expected. The attention to detail is impressive.',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    date: '1 day ago',
    rating: 4,
    comment: 'Very happy with my purchase. The product matches the description perfectly.',
  },
  {
    id: '8',
    name: 'Sophia Anderson',
    date: '12 hours ago',
    rating: 5,
    comment: 'Excellent product! Fast delivery and great customer service. Highly recommended!',
  },
];

export default function ReviewsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);

  const renderStars = (rating: number, size: number = 16) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <IconSymbol key={`full-${i}`} name="star.fill" size={size} color={Colors.accent} />
        ))}
        {hasHalfStar && (
          <IconSymbol name="star.lefthalf.fill" size={size} color={Colors.accent} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <IconSymbol key={`empty-${i}`} name="star" size={size} color="#CCCCCC" />
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.reviewerName}>{item.name}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        </View>
        {renderStars(item.rating, 16)}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IconSymbol name="chevron.left" size={24} color="#1C2229" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reviews</Text>
          <View style={styles.headerButton} />
        </View>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const overallRating = 4.8;
  const totalReviews = mockReviews.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="chevron.left" size={24} color="#1C2229" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={styles.headerButton} />
      </View>

      <FlatList
        data={mockReviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            
            <View style={styles.verifiedBadge}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={Colors.success} />
              <Text style={styles.verifiedText}>100% Verified Reviews</Text>
            </View>

            <View style={styles.overallRating}>
              <Text style={styles.overallRatingValue}>{overallRating}</Text>
              <View style={styles.ratingDetails}>
                {renderStars(overallRating, 24)}
                <Text style={styles.overallRatingCount}>({totalReviews} reviews)</Text>
              </View>
            </View>

            <View style={styles.divider} />
          </View>
        }
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerButton: {
    padding: 4,
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  listContent: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  productInfo: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    lineHeight: 28,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  verifiedText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  overallRating: {
    marginBottom: 20,
  },
  overallRatingValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 8,
  },
  ratingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  overallRatingCount: {
    fontSize: 16,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  reviewCard: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666666',
    fontFamily: Fonts.regular,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: Fonts.regular,
  },
});

