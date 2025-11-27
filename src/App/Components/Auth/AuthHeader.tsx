import { Colors, Fonts } from '@/src/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AuthHeaderProps {
  welcomeText?: string;
  title: string | string[];
}

/**
 * Auth Header Component
 * Welcome text and title section
 */
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  welcomeText = 'Welcome to Qutli',
  title,
}) => {
  const titleArray = Array.isArray(title) ? title : [title];

  return (
    <View>
      {welcomeText && <Text style={styles.welcomeText}>{welcomeText}</Text>}
      <View style={styles.titleContainer}>
        {titleArray.map((line, index) => (
          <Text key={index} style={styles.title}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
};

interface AuthDescriptionProps {
  text: string;
}

/**
 * Auth Description Component
 * Description text below title
 */
export const AuthDescription: React.FC<AuthDescriptionProps> = ({ text }) => {
  return <Text style={styles.description}>{text}</Text>;
};

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

/**
 * Auth Footer Link Component
 * Link text at bottom of auth screens
 */
export const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({
  text,
  linkText,
  onPress,
}) => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{text} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.footerLink}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 60,
    marginBottom: 8,
    fontFamily: Fonts.regular,
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C2229',
    fontFamily: Fonts.bold,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: '#999999',
    lineHeight: 24,
    marginBottom: 30,
    fontFamily: Fonts.regular,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Fonts.regular,
  },
  footerLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    fontFamily: Fonts.medium,
  },
});
