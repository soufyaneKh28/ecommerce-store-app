import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useAuthStore } from '@/src/stores/authStore';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = (title: string) => {
    Alert.alert(title, 'This feature will be available soon!');
  };

  const MenuItem = ({
    icon,
    title,
    showArrow = true,
    onPress,
  }: {
    icon: string;
    title: string;
    showArrow?: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.menuItem, isDark && styles.menuItemDark]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
          <IconSymbol name={icon} size={22} color="#FF6B9D" />
        </View>
        <Text style={[styles.menuItemText, isDark && styles.textDark]}>{title}</Text>
      </View>
      {showArrow && <IconSymbol name="chevron.right" size={20} color="#999" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, isDark && styles.profileHeaderDark]}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://ui-avatars.com/api/?name=Fashion+User&background=FF6B9D&color=fff&size=120' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <IconSymbol name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, isDark && styles.textDark]}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@fashionista.com'}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={[styles.statDivider, isDark && styles.statDividerDark]} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>34</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={[styles.statDivider, isDark && styles.statDividerDark]} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Account</Text>
          <MenuItem
            icon="person.crop.circle"
            title="Edit Profile"
            onPress={() => handlePress('Edit Profile')}
          />
          <MenuItem
            icon="location.fill"
            title="Shipping Address"
            onPress={() => handlePress('Shipping Address')}
          />
          <MenuItem
            icon="creditcard.fill"
            title="Payment Methods"
            onPress={() => handlePress('Payment Methods')}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>My Orders</Text>
          <MenuItem
            icon="shippingbox.fill"
            title="Order History"
            onPress={() => handlePress('Order History')}
          />
          <MenuItem
            icon="arrow.circlepath"
            title="Track Order"
            onPress={() => handlePress('Track Order')}
          />
          <MenuItem
            icon="return"
            title="Returns & Refunds"
            onPress={() => handlePress('Returns & Refunds')}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Preferences</Text>
          <MenuItem
            icon="bell.fill"
            title="Notifications"
            onPress={() => handlePress('Notifications')}
          />
          <MenuItem
            icon="star.fill"
            title="Wishlist"
            onPress={() => handlePress('Wishlist')}
          />
          <MenuItem
            icon="tag.fill"
            title="Promotions"
            onPress={() => handlePress('Promotions')}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Support</Text>
          <MenuItem
            icon="questionmark.circle.fill"
            title="Help Center"
            onPress={() => handlePress('Help Center')}
          />
          <MenuItem
            icon="envelope.fill"
            title="Contact Us"
            onPress={() => handlePress('Contact Us')}
          />
          <MenuItem
            icon="info.circle.fill"
            title="About"
            onPress={() => handlePress('About')}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => 
            Alert.alert(
              'Logout', 
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: logout }
              ]
            )
          }
        >
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  profileHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  profileHeaderDark: {
    backgroundColor: '#2a2a2a',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF6B9D',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B9D',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
  },
  textDark: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  statDividerDark: {
    backgroundColor: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemDark: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#1a1a1a',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconContainerDark: {
    backgroundColor: '#3a2a3a',
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 8,
  },
});

