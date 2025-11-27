import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ShopState {
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Category state
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  
  // Product filter tabs
  selectedTab: 'All' | '5-Star Rated' | 'Best Selling Items' | 'New';
  setSelectedTab: (tab: 'All' | '5-Star Rated' | 'Best Selling Items' | 'New') => void;
  
  // Offers carousel
  offerIndex: number;
  setOfferIndex: (index: number) => void;
  
  // Reset shop state
  resetShopState: () => void;
}

const initialState = {
  searchQuery: '',
  selectedCategory: 'All',
  selectedTab: 'All' as const,
  offerIndex: 0,
};

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      ...initialState,

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category });
      },

      setSelectedTab: (tab: 'All' | '5-Star Rated' | 'Best Selling Items' | 'New') => {
        set({ selectedTab: tab });
      },

      setOfferIndex: (index: number) => {
        set({ offerIndex: index });
      },

      resetShopState: () => {
        set(initialState);
      },
    }),
    {
      name: 'shop-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist selectedCategory and selectedTab, not searchQuery or offerIndex
        selectedCategory: state.selectedCategory,
        selectedTab: state.selectedTab,
      }),
    }
  )
);

