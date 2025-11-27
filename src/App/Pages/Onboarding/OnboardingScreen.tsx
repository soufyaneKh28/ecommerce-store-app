import { Colors, Fonts } from '@/src/constants/theme';
import { useAuthStore } from '@/src/stores/authStore';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 seconds per story

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to Qutli',
    description: 'Effortless access for your daily fashion needs.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
  },
  {
    id: '2',
    title: 'Exclusive Deals',
    description: 'Get amazing discounts and exclusive deals on your favorite items.',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800',
  },
  {
    id: '3',
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery right to your doorstep.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea742c7e?w=800',
  },
  {
    id: '4',
    title: 'Secure Shopping',
    description: 'Shop with confidence using our secure payment methods.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnimations = useRef(slides.map(() => new Animated.Value(0))).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation values for text and card
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const imageFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start progress animation for auto-advance
    startProgressAnimation();
    
    // Animate text and card when slide changes
    animateContent();
    
    return () => {
      // Clear timer on unmount or when slide changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  const animateContent = () => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(-20);
    scaleAnim.setValue(0.95);
    imageFadeAnim.setValue(0.5);

    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(imageFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startProgressAnimation = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Reset all progress bars
    progressAnimations.forEach((anim) => anim.setValue(0));

    // Animate current progress bar
    Animated.timing(progressAnimations[currentIndex], {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start();

    // Auto-advance to next slide
    timerRef.current = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        goToNext();
      } else {
        completeOnboarding();
      }
    }, STORY_DURATION);
  };

  const goToNext = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Animate out before changing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(imageFadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        completeOnboarding();
      }
    });
  };

  const goToPrevious = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Animate out before changing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(imageFadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    });
  };

  const goToSlide = (index: number) => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Animate out before changing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: index > currentIndex ? -20 : 20,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(imageFadeAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(index);
    });
  };

  const renderProgressBars = () => (
    <View style={styles.progressContainer}>
      {slides.map((_, index) => {
        const progress = progressAnimations[index].interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '100%'],
          extrapolate: 'clamp',
        });

        return (
          <View key={index} style={styles.progressBarWrapper}>
            <Animated.View style={[styles.progressBar, { width: progress }]} />
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: slides[currentIndex].image }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Animated.View
          style={[
            styles.backgroundImageOverlay,
            { opacity: imageFadeAnim },
          ]}
        />
        
        {/* Progress Bars */}
        {renderProgressBars()}

        {/* Navigation Arrows */}
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonLeft]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
          activeOpacity={0.7}
        >
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>←</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.navButtonRight]}
          onPress={goToNext}
          activeOpacity={0.7}
        >
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Content Card */}
        <Animated.View
          style={[
            styles.contentCard,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={styles.title}>{slides[currentIndex].title}</Text>
          </Animated.View>
          
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={styles.description}>{slides[currentIndex].description}</Text>
          </Animated.View>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={completeOnboarding}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get started</Text>
            <Text style={styles.getStartedArrow}>→</Text>
          </TouchableOpacity>

          <View style={styles.loginSection}>
            <Text style={styles.loginText}>Already have account? </Text>
            <TouchableOpacity onPress={completeOnboarding}>
              <Text style={styles.loginLink}>Login here</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  backgroundImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  progressContainer: {
    flexDirection: 'row',
    marginTop: 65,
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 4,
  },
  progressBarWrapper: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: '-50%' }],
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  navButtonLeft: {
    left: 16,
  },
  navButtonRight: {
    right: 16,
  },
  arrowContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  arrow: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginBottom: 26,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'regular',
    color: Colors.textSecondary,
    marginBottom: 8,
    fontFamily: Fonts.regular,
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 20,
    lineHeight: 34,
  },
  getStartedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    fontFamily: Fonts.bold,
  },
  getStartedArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: Fonts.regular,
  },
  loginLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    fontFamily: Fonts.medium,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    gap: 8,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  pageIndicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
});
