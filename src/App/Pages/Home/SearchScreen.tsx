import { IconSymbol } from '@/src/App/Components/ui/icon-symbol';
import { Fonts } from '@/src/constants/theme';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

// Mock data for recently searched items
const recentlySearched = ['Skooter', 'scooters electric', 'Skooters'];

// Mock data for popular searches
const popularSearches = ['air humidifier', 'light bar monitor', 'fire home'];

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchItemPress = (item: string) => {
    setSearchQuery(item);
    // TODO: Navigate to search results or perform search
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Back Button and Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IconSymbol name="chevron.left" size={24} color="#1C2229" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="What's your daily needs?"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            // autoFocus
          />
          <IconSymbol name="magnifyingglass" size={20} color="#999" />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Recently Searched Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently searched</Text>
          {recentlySearched.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchItem}
              onPress={() => handleSearchItemPress(item)}
            >
              <Text style={styles.searchItemText}>{item}</Text>
              {index < recentlySearched.length - 1 && <View style={styles.separator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Right Now Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular right now</Text>
          {popularSearches.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchItem}
              onPress={() => handleSearchItemPress(item)}
            >
              <Text style={styles.searchItemText}>{item}</Text>
              {index < popularSearches.length - 1 && <View style={styles.separator} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5ED',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    // backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2229',
    marginBottom: 16,
    fontFamily: Fonts.bold,
  },
  searchItem: {
    paddingVertical: 12,
  },
  searchItemText: {
    fontSize: 16,
    color: '#1C2229',
    fontFamily: Fonts.regular,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 12,
  },
});

