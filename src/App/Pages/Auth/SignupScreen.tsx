import {
  AuthButton,
  AuthHeader,
  AuthInput,
  AuthLayout,
  AuthTabs,
  BackButton,
  TermsText,
} from '@/src/App/Components';
import { Fonts } from '@/src/constants/theme';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import { validateEmail, validatePassword, validatePasswordsMatch } from '@/src/utils/validation';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  Login: undefined;
};

export default function SignupScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const signup = useAuthStore((state) => state.signup);

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [fullName, setFullName] = useState('Dexter Morgan');
  const [email, setEmail] = useState('dextermrgn@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('085191039930');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync tab state when screen is focused
  useEffect(() => {
    setActiveTab('register');
  }, [route.key]);

  const handleSignup = async () => {
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!validatePasswordsMatch(password, confirmPassword)) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await signup(fullName, email, password);
    } catch (error) {
      Alert.alert('Error', 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (key: string) => {
    if (key === 'login') {
      navigation.goBack();
    } else {
      setActiveTab(key as 'login' | 'register');
    }
  };

  return (
    <AuthLayout>
      <BackButton />

      <AuthHeader title="Get started now" />

      <AuthTabs
        tabs={[
          { key: 'login', label: 'Login' },
          { key: 'register', label: 'Register' },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <View style={styles.formSection}>
        <AuthInput
          label="Full name"
          icon="person.fill"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

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

        <AuthInput
          label="Phone number"
          icon="phone.fill"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <AuthInput
          label="Set password"
          icon="lock.fill"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          showPasswordToggle
          isPasswordVisible={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <AuthInput
          label="Confirm password"
          icon="lock.fill"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
          showPasswordToggle
          isPasswordVisible={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <AuthButton
          title="Register"
          loading={isLoading}
          loadingText="Creating Account..."
          onPress={handleSignup}
        />
      </View>

      <TermsText>
        By signing up, you agree to the{' '}
        <Text style={styles.termsLink}>Terms of Service</Text>
        {' '}and{' '}
        <Text style={styles.termsLink}>Data Processing Agreement</Text>.
      </TermsText>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  formSection: {
    width: '100%',
  },
  termsLink: {
    fontSize: 12,
    color: '#1C2229',
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
});
