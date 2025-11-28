import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Colors, Fonts } from '@/src/constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  Messages: undefined;
};

interface MessageItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
}

const mockMessages: MessageItem[] = Array.from({ length: 6 }).map((_, index) => ({
  id: `message-${index + 1}`,
  title: 'Order Shipping',
  description:
    'Lorem ipsum dolor sit amet consectetur. Purus ut nisi ipsum nunc augue facilisis mattis. Eleifend at fermentum odio.',
  timeAgo: '1h',
}));

export default function MessagesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderMessage = ({ item }: { item: MessageItem }) => (
    <View style={styles.messageCard}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconBackground}>
          <IconSymbol name="bell.badge.fill" size={22} color={Colors.primary} />
        </View>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageTitle}>{item.title}</Text>
          <Text style={styles.messageTime}>{item.timeAgo}</Text>
        </View>
        <Text style={styles.messageDescription}>{item.description}</Text>
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
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.backButton} />
      </View>

      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  iconWrapper: {
    marginRight: 16,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FFE9DB',
    borderWidth: 1,
    borderColor: '#FFDCCD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
  },
  messageTime: {
    fontSize: 12,
    color: '#AFB2BA',
    fontFamily: Fonts.regular,
  },
  messageDescription: {
    fontSize: 13,
    color: '#8A8E9A',
    lineHeight: 18,
    fontFamily: Fonts.regular,
  },
});

