import {
  AuthButton,
  AuthHeader,
  AuthInput,
  AuthLayout,
  AuthTabs,
  Checkbox,
  TermsText,
} from '@/src/App/Components';
import { Colors, Fonts } from '@/src/constants/theme';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const login = useAuthStore((state) => state.login);

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync tab state when screen is focused
  useEffect(() => {
    setActiveTab('login');
  }, [route.key]);

  const handleLogin = async () => {
    // Bypass auth and navigate directly to home
    navigation.navigate('MainTabs');
    return;

    // Original auth code (commented out)
    // if (!email || !password) {
    //   Alert.alert('Error', 'Please fill in all fields');
    //   return;
    // }

    // setIsLoading(true);
    // try {
    //   await login(email, password);
    // } catch (error) {
    //   Alert.alert('Error', 'Invalid email or password. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleTabChange = (key: string) => {
    if (key === 'register') {
      navigation.navigate('Signup');
    } else {
      setActiveTab(key as 'login' | 'register');
    }
  };

  return (
    <AuthLayout>
      <AuthHeader title={['Login to your', 'Account']} />

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
          label="Password"
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

        <View style={styles.optionsRow}>
          <Checkbox
            checked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
            label="Remember me"
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <AuthButton
          title="Login"
          onPress={handleLogin}
        />

        {/* Social Login */}
        <View style={styles.socialSection}>
          <Text style={styles.socialText}>Or login with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{ uri: 'https://www.google.com/favicon.ico' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  socialText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 16,
    fontFamily: Fonts.regular,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.medium,
  },
  termsLink: {
    fontSize: 12,
    color: '#1C2229',
    fontWeight: 'bold',
    fontFamily: Fonts.bold,
  },
});
