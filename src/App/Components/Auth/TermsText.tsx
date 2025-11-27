import { Fonts } from '@/src/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TermsTextProps {
  children: React.ReactNode;
}

/**
 * Terms Text Component
 * Terms and conditions text with bold links
 */
export const TermsText: React.FC<TermsTextProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: Fonts.regular,
  },
});

