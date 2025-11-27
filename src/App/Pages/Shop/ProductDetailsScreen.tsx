import { ProductCard } from '@/src/App/Components/Product/ProductCard';
import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { products } from '@/src/data/products';
import { useCartStore } from '@/src/stores/cartStore';
import { Product } from '@/src/types/product';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
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
  Reviews: { productId: string };
  Cart: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

// Mock review data
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
    comment: 'Amazing! An amazing fit. I am somewhere around 6ft and ordered 40 size',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    date: '15 days ago',
    rating: 5,
    comment: 'Perfect quality and fast shipping. Highly recommend!',
  },
  {
    id: '3',
    name: 'Michael Brown',
    date: '7 days ago',
    rating: 4,
    comment: 'Great product, exactly as described. Very satisfied!',
  },
];

// Color mapping for color swatches
const colorMap: { [key: string]: string } = {
  Red: '#FF0000',
  Blue: '#0000FF',
  Pink: '#FFC0CB',
  Yellow: '#FFFF00',
  Black: '#000000',
  White: '#FFFFFF',
  Green: '#00FF00',
  Brown: '#8B4513',
  'Dark Brown': '#654321',
  'Lime Green': '#32CD32',
  'Light Blue': '#ADD8E6',
  'Dark Blue': '#00008B',
  Beige: '#F5F5DC',
};

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showNavButtons, setShowNavButtons] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState({
    info: 0,
    reviews: 0,
    details: 0,
    related: 0,
  });

  const product = products.find((p) => p.id === productId);

  // Initialize selected color
  React.useEffect(() => {
    if (product && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);


  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  // Get recommended products (exclude current product)
  const recommendedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 6);

  const handleAddToCart = () => {
    addToCart(product, 'M', selectedColor, quantity);
    Alert.alert(
      'Added to Cart!',
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        {
          text: 'Go to Cart',
          onPress: () => navigation.navigate('Cart'),
        },
      ]
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const imageHeight = width * 1.1;
    const infoSectionStart = imageHeight;
    
    // Show buttons when user scrolls past the info section (reaches reviews section)
    setShowNavButtons(scrollY > infoSectionStart);
  };

  const handleInfoLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    // Y position from onLayout is the position relative to ScrollView content
    // This is what we need for scrollTo
    setSectionPositions((prev) => ({ ...prev, info: y }));
  };

  const handleReviewsLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, reviews: y }));
  };

  const handleDetailsLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, details: y }));
  };

  const handleRelatedLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, related: y }));
  };

  const scrollToSection = (yPosition: number) => {
    if (yPosition > 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: yPosition - 60, animated: true });
    }
  };

  const handleScrollToDetails = () => {
    scrollToSection(sectionPositions.info);
  };

  const handleScrollToReviews = () => {
    scrollToSection(sectionPositions.reviews);
  };

  const handleScrollToRelated = () => {
    scrollToSection(sectionPositions.related);
  };

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="chevron.left" size={24} color="#1C2229" />
        </TouchableOpacity>
        
        {/* Navigation Buttons - Show when scrolled to reviews section */}
        {showNavButtons && (
          <View style={styles.headerNavButtons}>
            <TouchableOpacity onPress={handleScrollToDetails} style={styles.navButton}>
              <Text style={styles.navButtonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleScrollToReviews} style={styles.navButton}>
              <Text style={styles.navButtonText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleScrollToRelated} style={styles.navButton}>
              <Text style={styles.navButtonText}>Related</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <IconSymbol name="magnifyingglass" size={24} color="#1C2229" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <IconSymbol name="square.and.arrow.up" size={24} color="#1C2229" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {/* Image Indicators */}
          {product.images.length > 1 && (
            <View style={styles.indicators}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === selectedImageIndex && styles.indicatorActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Info */}
        <View 
          style={styles.infoContainer}
          onLayout={handleInfoLayout}
        >
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.soldText}>{Math.floor(product.reviews / 10)}k+ sold</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            {renderStars(product.rating, 16)}
            <Text style={styles.ratingCount}>({product.reviews})</Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Color:</Text>
            <View style={styles.colorContainer}>
              {product.colors.map((color) => {
                const colorValue = colorMap[color] || '#CCCCCC';
                return (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorSwatch,
                      {
                        backgroundColor: colorValue,
                        borderColor: selectedColor === color ? '#000000' : '#E0E0E0',
                        borderWidth: selectedColor === color ? 2 : 1,
                      },
                    ]}
                  />
                );
              })}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Quantity:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(-1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tax Policy Link */}
          <TouchableOpacity style={styles.policyLink}>
            <Text style={styles.policyText}>Tax and Customs Policy</Text>
            <IconSymbol name="chevron.right" size={16} color="#1C2229" />
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View 
          style={styles.reviewsSection}
          onLayout={handleReviewsLayout}
        >
          <View style={styles.reviewsHeader}>
            <View style={styles.verifiedBadge}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={Colors.success} />
              <Text style={styles.verifiedText}>100% Verified Reviews</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.overallRating}
            onPress={() => navigation.navigate('Reviews', { productId })}
            activeOpacity={0.7}
          >
            <Text style={styles.overallRatingValue}>4.8</Text>
            {renderStars(4.5, 20)}
            <Text style={styles.overallRatingCount}>(330)</Text>
            <IconSymbol name="chevron.right" size={20} color="#999999" />
          </TouchableOpacity>

          {/* Individual Reviews */}
          {mockReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              {renderStars(review.rating, 14)}
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Product Details */}
        <View 
          style={styles.detailsSection}
          onLayout={handleDetailsLayout}
        >
          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Recommended Products */}
        <View 
          style={styles.recommendedSection}
          onLayout={handleRelatedLayout}
        >
          <Text style={styles.sectionTitle}>Recommended Products</Text>
          <FlatList
            data={recommendedProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.recommendedGrid}
            columnWrapperStyle={styles.recommendedRow}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(-1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Go to cart</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerNavButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    justifyContent: 'center',
  },
  navButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navButtonText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  imageContainer: {
    width: width,
    height: width * 1.1,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  indicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    marginBottom: 8,
    fontFamily: Fonts.bold,
    lineHeight: 24,
  },
  soldText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 12,
    fontFamily: Fonts.regular,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingCount: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 24,
    fontFamily: Fonts.bold,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#1C2229',
    marginBottom: 12,
    fontFamily: Fonts.medium,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    width: 100,
    justifyContent: 'space-between',
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  quantityValue: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  policyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  policyText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  reviewsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  reviewsHeader: {
    marginBottom: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedText: {
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  overallRatingValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  overallRatingCount: {
    fontSize: 16,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  reviewCard: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    fontFamily: Fonts.regular,
    lineHeight: 20,
  },
  detailsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    marginBottom: 12,
    fontFamily: Fonts.bold,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    fontFamily: Fonts.regular,
  },
  recommendedSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  recommendedGrid: {
    paddingTop: 12,
  },
  recommendedRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cartButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 16,
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  },
});
