import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/slices/cartSlice";
import { backendIp } from '../constants/config';

export interface ProductCardProps {
  id: number | string;
  name: string;
  price: number;
  images?: string[];
  category?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  images,
  category,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: Number(id), // Ensure id is number type for redux
        name,
        price,
        quantity: 1, // Add quantity for cart
      })
    );
  };

  return (
    <View style={styles.card}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        {images && images.length > 0 ? (
          images.map((img, i) => (
            <Image
              key={i}
              source={{ uri: `http://${backendIp}:8080/images/${img}` }}
              style={styles.image}
              resizeMode="cover"
            />
          ))
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text>No Image</Text>
          </View>
        )}
      </ScrollView>

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      {category && <Text style={styles.category}>{category}</Text>}

      {/* Add to Cart button */}
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 12,
    marginRight: 12,
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 4,
  },
  price: {
    color: "#16a34a",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  category: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
