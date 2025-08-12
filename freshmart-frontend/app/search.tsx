// app/search.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SearchPage() {
  const params = useLocalSearchParams<{ query?: string }>();
  const query = params.query ?? "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for: {query}</Text>
      {/* TODO: Implement your search results here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
