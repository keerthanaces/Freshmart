// app/cart.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";
import { useRouter } from "expo-router";
import OrderSummary from "../components/OrderSummary";
import { backendIp } from "../constants/config";

export default function Cart() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image
        source={item.images?.[0] ? { uri: `${backendIp}/images/${item.images[0]}` } : undefined}
        style={styles.thumb}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text numberOfLines={2} style={styles.name}>{item.name}</Text>

        <View style={styles.controlsRow}>
          <View style={styles.qtyGroup}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.remove} onPress={() => dispatch(removeFromCart(item.id))}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.header}>Your cart</Text>

      <View style={[pageStyles.content, isWide && { flexDirection: "row", gap: 20 }]}>
        <View style={{ flex: 2 }}>
          {items.length === 0 ? (
            <Text style={pageStyles.empty}>Your cart is empty.</Text>
          ) : (
            <>
              <FlatList
                data={items}
                keyExtractor={(i) => i.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 12 }}
              />

              <View style={pageStyles.bottomRow}>
                <View>
                  <Text style={pageStyles.subLabel}>Subtotal</Text>
                  <Text style={pageStyles.subValue}>${subtotal.toFixed(2)}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity style={pageStyles.clearBtn} onPress={() => dispatch(clearCart())}>
                    <Text style={{ color: "white", fontWeight: "700" }}>Clear Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={pageStyles.checkoutBtn} onPress={() => router.push("/checkout")}>
                    <Text style={{ color: "white", fontWeight: "700" }}>Checkout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>

        {isWide ? (
          <View style={{ width: 360 }}>
            <OrderSummary />
          </View>
        ) : null}
      </View>

      {/* On small screens show sticky compact summary at bottom */}
      {!isWide && items.length > 0 && (
        <View style={pageStyles.sticky}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 12 }}>
            <View>
              <Text style={{ fontWeight: "700" }}>{items.length} items</Text>
              <Text style={{ color: "#374151" }}>{`Subtotal: $${subtotal.toFixed(2)}`}</Text>
            </View>

            <TouchableOpacity style={pageStyles.checkoutBtnSmall} onPress={() => router.push("/checkout")}>
              <Text style={{ color: "white", fontWeight: "700" }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const pageStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8FBF8" },
  header: { fontSize: 26, fontWeight: "800", color: "#0f5132", marginBottom: 12 },
  content: { flex: 1 },
  empty: { textAlign: "center", marginTop: 60, color: "#6b7280" },
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  subLabel: { color: "#374151" },
  subValue: { fontSize: 18, fontWeight: "800", color: "#0f5132" },
  clearBtn: { backgroundColor: "#ef4444", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  checkoutBtn: { backgroundColor: "#0f5132", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 8 },
  checkoutBtnSmall: { backgroundColor: "#0f5132", paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8 },
  sticky: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    padding: 8,
  },
});

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  thumb: { width: 88, height: 88, borderRadius: 8, backgroundColor: "#f3f4f6" },
  name: { fontWeight: "700", color: "#0f5132" },
  controlsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  qtyGroup: { flexDirection: "row", alignItems: "center" },
  qtyBtn: { backgroundColor: "#52b788", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  qtyBtnText: { color: "white", fontWeight: "700", fontSize: 18 },
  qtyText: { marginHorizontal: 10, fontSize: 16, fontWeight: "700" },
  price: { fontWeight: "800", color: "#0f5132" },
  remove: { marginLeft: 12 },
  removeText: { color: "#ef4444", fontWeight: "700" },
});
