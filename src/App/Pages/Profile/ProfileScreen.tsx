import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigation } from '@react-navigation/native';
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
  Settings: undefined;
};

interface MenuItem {
  icon: string;
  title: string;
  onPress: () => void;
}

export default function ProfileScreen() {
  const { user } = useAuthStore();
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
      icon: 'bubble.left.and.bubble.right.fill',
      title: 'Messages',
      onPress: () => handlePress('Messages'),
    },
    {
      icon: 'star.fill',
      title: 'Reviews',
      onPress: () => handlePress('Reviews'),
    },
    {
      icon: 'location.fill',
      title: 'Addresses',
      onPress: () => handlePress('Addresses'),
    },
    {
      icon: 'info.circle.fill',
      title: 'About Us',
      onPress: () => handlePress('About Us'),
    },
    {
      icon: 'questionmark.circle.fill',
      title: 'Support',
      onPress: () => handlePress('Support'),
    },
    {
      icon: 'doc.text.fill',
      title: 'FAQ',
      onPress: () => handlePress('FAQ'),
    },
    {
      icon: 'doc.text.fill',
      title: 'Terms of use',
      onPress: () => handlePress('Terms of use'),
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
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
