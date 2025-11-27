import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Decorative Element Component
 * Pink cloud/star shape used in auth screens
 */
export const DecorativeElement: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.starShape} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    zIndex: 0,
  },
  starShape: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFE5E5',
    borderRadius: 75,
    opacity: 0.8,
  },
});

