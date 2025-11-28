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
  FAQ: undefined;
};

const faqs = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard orders ship within 2-4 business days. Express shipping is available for select regions.',
  },
  {
    question: 'Can I return an item?',
    answer:
      'Yes, we accept returns within 30 days of delivery as long as the item is unworn and in original packaging.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'We currently ship to 35+ countries. Duties and taxes are calculated at checkout for complete transparency.',
  },
];

export default function FAQScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        {faqs.map((item) => (
          <View key={item.question} style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
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
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: Fonts.medium,
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    color: '#7C7F86',
    lineHeight: 20,
    fontFamily: Fonts.regular,
  },
});

