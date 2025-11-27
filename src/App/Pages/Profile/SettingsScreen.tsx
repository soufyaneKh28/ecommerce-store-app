import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Settings: undefined;
};

interface SettingsOption {
  id: 'edit' | 'password' | 'notifications' | 'delete';
  label: string;
  icon: string;
  destructive?: boolean;
}

const settingsOptions: SettingsOption[] = [
  {
    id: 'edit',
    label: 'Edit My Information',
    icon: 'person.crop.circle',
  },
  {
    id: 'password',
    label: 'Change Password',
    icon: 'lock.fill',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'bell.fill',
  },
  {
    id: 'delete',
    label: 'Delete Account',
    icon: 'trash.fill',
    destructive: true,
  },
];

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOptionPress = (option: SettingsOption) => {
    if (option.id === 'delete') {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => {} },
        ],
      );
      return;
    }

    Alert.alert(option.label, 'This feature will be available soon!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="chevron.left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backButton} />
      </View>

      {/* Options */}
      <View style={styles.card}>
        {settingsOptions.map((option, index) => (
          <View key={option.id}>
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => handleOptionPress(option)}
              activeOpacity={0.8}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.iconWrapper,
                    option.destructive && styles.destructiveIconWrapper,
                  ]}
                >
                  <IconSymbol
                    name={option.icon as any}
                    size={18}
                    color={option.destructive ? Colors.error : Colors.primary}
                  />
                </View>
                <Text
                  style={[
                    styles.optionLabel,
                    option.destructive && styles.destructiveText,
                  ]}
                >
                  {option.label}
                </Text>
              </View>
              <View
                style={[
                  styles.chevronButton,
                  option.destructive && styles.destructiveChevron,
                ]}
              >
                <IconSymbol
                  name="chevron.right"
                  size={14}
                  color={option.destructive ? Colors.error : Colors.primary}
                />
              </View>
            </TouchableOpacity>
            {index < settingsOptions.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9F7F1',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
  },
  card: {
    backgroundColor: '#FFFBF0',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD8C5',
    backgroundColor: '#FFF4ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destructiveIconWrapper: {
    borderColor: '#FFC7C7',
    backgroundColor: '#FFF1F1',
  },
  optionLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontFamily: Fonts.regular,
  },
  destructiveText: {
    color: Colors.error,
  },
  chevronButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFD8C5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destructiveChevron: {
    borderColor: '#FFC7C7',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#F0E3D8',
  },
});

