import {
    AuthButton,
    AuthDescription,
    AuthFooterLink,
    AuthHeader,
    AuthInput,
    AuthLayout,
    BackButton
} from '@/src/App/Components';
import { validateEmail } from '@/src/utils/validation';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  Login: undefined;
};

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Reset Link Sent',
        'We have sent a password reset link to your email address. Please check your inbox.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <BackButton />
      
      <AuthHeader title="Forgot Password?" />
      
      <AuthDescription text="Don't worry! Enter your email address and we'll send you a link to reset your password." />

      <View style={styles.formSection}>
        <AuthInput
          label="Email address"
          icon="envelope.fill"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AuthButton
          title="Send Reset Link"
          loading={isLoading}
          loadingText="Sending..."
          onPress={handleResetPassword}
        />
      </View>

      <AuthFooterLink
        text="Remember your password?"
        linkText="Login here"
        onPress={() => navigation.goBack()}
      />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  formSection: {
    width: '100%',
  },
});
