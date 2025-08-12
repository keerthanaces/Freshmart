// src/components/OrderSummary.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { backendIp } from "../constants/config";

type Props = {
  compact?: boolean; // change spacing for sticky mobile
};

export default function OrderSummary({ compact = false }: Props) {
  const cartItems = useAppSelector((s) => s.cart.items);
  const subtotal = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <Text style={styles.title}>Order summary</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.images?.[0] ? (
              <Image
                source={{ uri: `${backendIp}/images/${item.images[0]}` }}
                style={styles.image}
              />
            ) : null}
            <View style={{ flex: 1, marginHorizontal: 8 }}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text style={styles.qty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
        style={{ maxHeight: 260 }}
      />

      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Subtotal</Text>
        <Text style={styles.costValue}>${subtotal.toFixed(2)}</Text>
      </View>

      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Shipping</Text>
        <Text style={styles.costValue}>Calculated at delivery</Text>
      </View>

      <View style={[styles.costRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    marginBottom: 12,
  },
  compactContainer: { padding: 12 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#0f5132" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  image: { width: 56, height: 56, borderRadius: 8, backgroundColor: "#eee" },
  name: { fontWeight: "600", color: "#0f5132" },
  qty: { color: "#6b7280", fontSize: 13 },
  price: { fontWeight: "700", color: "#0f5132" },
  costRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  costLabel: { color: "#374151" },
  costValue: { color: "#374151", fontWeight: "600" },
  totalRow: { borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 10, marginTop: 10 },
  totalLabel: { fontWeight: "800", fontSize: 16, color: "#0f5132" },
  totalValue: { fontWeight: "800", fontSize: 16, color: "#0f5132" },
});
