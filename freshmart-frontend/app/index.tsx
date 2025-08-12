import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchProducts } from '../redux/slices/productSlice';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.product);

  // Optionally, read cart state to display cart count somewhere if needed
  const cart = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Navbar /* you can pass cart info as props if you want */ />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Hero />

        {loading && <ActivityIndicator size="large" color="#00aa00" style={{ marginTop: 20 }} />}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {products.length > 0 ? (
              <View style={styles.productsContainer}>
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    images={product.images}
                    category={product.category}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.noProductsText}>
                No products available
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 12,
    gap: 12, // RN gap support varies, use margin in ProductCard if issues
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noProductsText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
