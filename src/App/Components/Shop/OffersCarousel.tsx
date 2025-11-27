import { Colors } from '@/src/constants/theme';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface OffersCarouselProps {
  images: string[];
  height?: number;
  onIndexChange?: (index: number) => void;
}

/**
 * OffersCarousel Component
 * Horizontal scrollable image carousel with indicators
 */
export const OffersCarousel: React.FC<OffersCarouselProps> = ({
  images,
  height = 350,
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
    if (onIndexChange) {
      onIndexChange(index);
    }
  };

  return (
    <View style={[styles.offersContainer, { height }]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.offerImage} />
        ))}
      </ScrollView>
      {/* Black Overlay */}
      <View style={styles.overlay} pointerEvents="none" />
      <View style={styles.offerIndicators}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.offerIndicator,
              currentIndex === index && styles.offerIndicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  offersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1000,
  },
  offerImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  offerIndicators: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  offerIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  offerIndicatorActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
});

