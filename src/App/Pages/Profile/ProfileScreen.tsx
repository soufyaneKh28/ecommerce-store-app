import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useAuthStore } from '@/src/stores/authStore';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  MyOrders: undefined;
  Messages: undefined;
  Addresses: undefined;
  About: undefined;
  Support: undefined;
  Wishlist: undefined;
  FAQ: undefined;
  Terms: undefined;
  Settings: undefined;
  EditInformation: undefined;
  ChangePassword: undefined;
  Notifications: undefined;
};

interface MenuItem {
  icon: string;
  title: string;
  onPress: () => void;
}

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (title: string) => {
    Alert.alert(title, 'This feature will be available soon!');
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'shippingbox.fill',
      title: 'My orders',
      onPress: () => navigation.navigate('MyOrders'),
    },
    {
      icon: 'heart.fill',
      title: 'Wishlist',
      onPress: () => navigation.navigate('Wishlist'),
    },
    {
      icon: 'bubble.left.and.bubble.right.fill',
      title: 'Messages',
      onPress: () => navigation.navigate('Messages'),
    },
    {
      icon: 'location.fill',
      title: 'Addresses',
      onPress: () => navigation.navigate('Addresses'),
    },
    {
      icon: 'info.circle.fill',
      title: 'About Us',
      onPress: () => navigation.navigate('About'),
    },
    {
      icon: 'questionmark.circle.fill',
      title: 'Support',
      onPress: () => navigation.navigate('Support'),
    },
    {
      icon: 'doc.text.fill',
      title: 'FAQ',
      onPress: () => navigation.navigate('FAQ'),
    },
    {
      icon: 'doc.text.fill',
      title: 'Terms of use',
      onPress: () => navigation.navigate('Terms'),
    },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    return 'SK';
  };

  // Get display name (first name + last initial)
  const getDisplayName = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0]} ${names[1][0]}.`;
      }
      return user.name;
    }
    return 'Soufyane Kh';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <View style={styles.avatarSilhouette}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
          </View>
        </View>
        <Text style={styles.userName}>{getDisplayName()}</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="gearshape" size={24} color="#1C2229" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <IconSymbol name={item.icon as any} size={22} color={Colors.primary} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={Colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={async () => {
            await logout();
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
            const parentNavigation = navigation.getParent();
            if (parentNavigation) {
              parentNavigation.dispatch(resetAction);
            } else {
              navigation.dispatch(resetAction);
            }
          }}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.backgroundSecondary,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarSilhouette: {
    width: 28,
    height: 28,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarHead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#000000',
    marginBottom: 2,
  },
  avatarBody: {
    width: 18,
    height: 10,
    borderRadius: 9,
    backgroundColor: '#000000',
  },
  userName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  logoutButton: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#FFD8C5',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFF4ED',
  },
  logoutText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.medium,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
});
