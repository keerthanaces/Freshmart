import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Hero() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BluegrassMart!</Text>
      <Text style={styles.subtitle}>Shop fresh, shop local 🌱</Text>
      <TouchableOpacity style={styles.button} onPress={() => { /* Add navigation or action */ }}>
        <Text style={styles.buttonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d1fae5',
    paddingVertical: 80,
    alignItems: 'center',  // Center children horizontally
    width: '100%',         // Make container full width to center content properly
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',   // Center text inside the Text component
  },
  subtitle: {
    fontSize: 18,
    color: '#4b5563',
    textAlign: 'center',   // Center text inside the Text component
  },
  button: {
    marginTop: 24,
    backgroundColor: '#16a34a',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
