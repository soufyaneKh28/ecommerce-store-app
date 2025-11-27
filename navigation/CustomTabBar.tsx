import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useCartStore } from '@/src/stores/cartStore';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const TAB_BAR_PADDING =20;
const TAB_WIDTH = (width - TAB_BAR_PADDING * 2) / 4; // Account for container padding
const ACTIVE_COLOR = '#FF6139';
const INACTIVE_COLOR = '#CCCCCC';
const BACKGROUND_COLOR = Colors.background;

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const getCartItemsCount = useCartStore((state) => state.getCartItemsCount);
  const cartCount = getCartItemsCount();

  // Animation for wave indicator
  const waveAnim = useRef(new Animated.Value(state.index * TAB_WIDTH)).current;
  const scaleAnims = useRef(state.routes.map((_, index) => new Animated.Value(index === state.index ? 1.1 : 1))).current;
  const opacityAnims = useRef(state.routes.map((_, index) => new Animated.Value(index === state.index ? 1 : 0.6))).current;
  const labelOpacityAnims = useRef(state.routes.map((_, index) => new Animated.Value(index === state.index ? 1 : 0))).current;

  useEffect(() => {
    // Animate wave indicator to active tab position
    Animated.spring(waveAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    // Animate active tab icon scale
    scaleAnims.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === state.index ? 1.1 : 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    });

    // Animate icon opacity
    opacityAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === state.index ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    // Animate label opacity (fade in/out)
    labelOpacityAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === state.index ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {/* Wave Indicator */}
        <Animated.View
          style={[
            styles.waveIndicator,
            {
              transform: [{ translateX: waveAnim }],
            },
          ]}
        >
          <View style={styles.waveShape} />
        </Animated.View>

        {/* Tab Buttons */}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const onPress = () => {
            // Haptic feedback
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            // Special handling for Cart - navigate to root stack instead of tab
            if (route.name === 'Cart') {
              const parent = navigation.getParent();
              if (parent) {
                parent.navigate('Cart');
              }
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Icon mapping - use filled for active, outline for inactive
          const getIconName = () => {
            const baseName = (() => {
              switch (route.name) {
                case 'Shop':
                  return 'house';
                case 'Categories':
                  return 'square.grid.2x2';
                case 'Cart':
                  return 'cart';
                case 'Profile':
                  return 'person';
                default:
                  return 'circle';
              }
            })();
            
            // Use filled version for active, outline for inactive
            return isFocused ? `${baseName}.fill` : baseName;
          };

          // Get display label
          const getDisplayLabel = () => {
            switch (route.name) {
              case 'Shop':
                return 'Home';
              case 'Categories':
                return 'Categories';
              case 'Cart':
                return 'Cart';
              case 'Profile':
                return 'Profile';
              default:
                return route.name;
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [{ scale: scaleAnims[index] }],
                    opacity: opacityAnims[index],
                  },
                ]}
              >
                {route.name === 'Cart' ? (
                  <View style={styles.cartIconContainer}>
                    <IconSymbol
                      size={28}
                      name={getIconName() as any}
                      color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
                    />
                    {cartCount > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          {cartCount > 99 ? '99+' : cartCount}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <IconSymbol
                    size={28}
                    name={getIconName() as any}
                    color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
                  />
                )}
              </Animated.View>
              {/* Label with fade animation */}
              <Animated.Text
                style={[
                  styles.tabLabel,
                  {
                    opacity: labelOpacityAnims[index],
                  },
                ]}
                numberOfLines={1}
              >
                {getDisplayLabel()}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: TAB_BAR_PADDING,
    paddingTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'visible',
  },
  waveIndicator: {
    position: 'absolute',
    bottom: -8,
    left: TAB_WIDTH / 2 - 20,
    width: 40,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  waveShape: {
    width: 40,
    height: 10,
    backgroundColor: ACTIVE_COLOR,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // Create wave effect with shadow
    shadowColor: ACTIVE_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  cartIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: ACTIVE_COLOR,
    fontFamily: Fonts.medium,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -6,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: BACKGROUND_COLOR,
    zIndex: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
});

