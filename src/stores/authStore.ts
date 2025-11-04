import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const ONBOARDING_KEY = '@onboarding_complete';
const USER_KEY = '@user_data';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true, // Start as true, will be set to false after rehydration
      hasSeenOnboarding: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Demo credentials
        const demoCredentials = {
          'demo@fashionista.com': 'demo123',
          'user@test.com': 'password',
          'admin@fashionista.com': 'admin123',
        };

        if (demoCredentials[email as keyof typeof demoCredentials] !== password) {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }

        // Mock user data
        const userData: User = {
          id: '1',
          name: email.split('@')[0],
          email,
        };

        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        set({ user: userData, isLoading: false });
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock user data
        const userData: User = {
          id: Date.now().toString(),
          name,
          email,
        };

        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        set({ user: userData, isLoading: false });
      },

      logout: async () => {
        await AsyncStorage.removeItem(USER_KEY);
        set({ user: null });
      },

      completeOnboarding: async () => {
        // Don't persist onboarding completion - just set it in memory
        // This way onboarding shows every time app reloads
        set({ hasSeenOnboarding: true });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      })),
      partialize: (state) => ({
        user: state.user,
        // Don't persist hasSeenOnboarding - always show onboarding on app reload
        // hasSeenOnboarding: state.hasSeenOnboarding,
      }),
      onRehydrateStorage: () => async (state) => {
        // After rehydration completes, set isLoading to false
        // Always reset hasSeenOnboarding to false so onboarding shows on every reload
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (state) {
          useAuthStore.setState({ 
            isLoading: false,
            hasSeenOnboarding: false, // Always show onboarding on reload
          });
        }
      },
    }
  )
);
