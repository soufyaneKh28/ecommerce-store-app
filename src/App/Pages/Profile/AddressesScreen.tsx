import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Addresses: undefined;
};

interface AddressItem {
  id: string;
  label: string;
  street: string;
  city: string;
  extra: string;
  isDefault?: boolean;
}

const mockAddresses: AddressItem[] = [
  {
    id: 'home',
    label: 'My Home',
    street: '759 Ashcraft Court San Diego',
    city: 'Istanbul 34010',
    extra: 'Floor:11',
    isDefault: true,
  },
];

export default function AddressesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderAddress = (address: AddressItem) => (
    <View key={address.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.addressLabel}>{address.label}</Text>
      </View>
      <Text style={styles.addressLine}>{address.street}</Text>
      <Text style={styles.addressLine}>
        {address.city}, {address.extra}
      </Text>
      <View style={styles.divider} />
      <View style={styles.cardFooter}>
        <View style={[styles.footerSegment, styles.defaultSegment]}>
          <View style={styles.defaultWrapper}>
            <View style={styles.radioOuter}>
              {address.isDefault && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        </View>
        <View style={styles.footerDivider} />
        <TouchableOpacity activeOpacity={0.7} style={styles.footerSegment}>
          <Text style={styles.footerAction}>Delete</Text>
        </TouchableOpacity>
        <View style={styles.footerDivider} />
        <TouchableOpacity activeOpacity={0.7} style={styles.footerSegment}>
          <Text style={styles.footerAction}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="chevron.left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>{mockAddresses.map(renderAddress)}</View>
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
  },
  addressLine: {
    fontSize: 14,
    color: '#7C7F86',
    fontFamily: Fonts.regular,
    marginBottom: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E4E0D7',
    marginVertical: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  footerSegment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultSegment: {
    justifyContent: 'flex-start',
  },
  footerDivider: {
    width: StyleSheet.hairlineWidth,
    height: 18,
    backgroundColor: '#E4E0D7',
  },
  defaultWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textPrimary,
  },
  defaultText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: Fonts.regular,
  },
  footerAction: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
  },
});

