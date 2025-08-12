import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearCart } from '../redux/slices/cartSlice';
import { useRouter } from 'expo-router';
import { backendIp } from "../constants/config";

export default function Checkout() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'cod' | 'zelle'>('credit');

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart.');
      return;
    }
    // No validation, just success message for now
    Alert.alert(
      'Order Successful',
      `Your order totaling $${subtotal.toFixed(2)} has been placed.`
    );

    dispatch(clearCart());
    router.push('/'); // Redirect to home or order confirmation page if available
  };

  const handleInputChange = (key: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleCardInputChange = (key: string, value: string) => {
    setCardInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Delivery</Text>

      {/* Shipping form */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={shippingInfo.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={shippingInfo.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apartment, suite, etc. (optional)"
          value={shippingInfo.apartment}
          onChangeText={(text) => handleInputChange('apartment', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingInfo.city}
          onChangeText={(text) => handleInputChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={shippingInfo.state}
          onChangeText={(text) => handleInputChange('state', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          keyboardType="numeric"
          value={shippingInfo.zip}
          onChangeText={(text) => handleInputChange('zip', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone (optional)"
          keyboardType="phone-pad"
          value={shippingInfo.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={shippingInfo.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
      </View>

      <Text style={styles.heading}>Payment</Text>

      {/* Payment Methods */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'credit' && styles.paymentSelected,
          ]}
          onPress={() => setPaymentMethod('credit')}
        >
          <Text style={styles.paymentText}>Credit Card (VISA, MASTERCARD, AMEX)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'cod' && styles.paymentSelected,
          ]}
          onPress={() => setPaymentMethod('cod')}
        >
          <Text style={styles.paymentText}>Cash on Delivery (COD)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'zelle' && styles.paymentSelected,
          ]}
          onPress={() => setPaymentMethod('zelle')}
        >
          <Text style={styles.paymentText}>Zelle (thulirmartusa@gmail.com) - Preferred</Text>
        </TouchableOpacity>
      </View>

      {/* Card details input for Credit Card */}
      {paymentMethod === 'credit' && (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Card Number (16 digits)"
            keyboardType="numeric"
            maxLength={16}
            value={cardInfo.cardNumber}
            onChangeText={(text) => handleCardInputChange('cardNumber', text)}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="Expiry (MM/YY)"
              maxLength={5}
              value={cardInfo.expiry}
              onChangeText={(text) => handleCardInputChange('expiry', text)}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="CVC"
              keyboardType="numeric"
              maxLength={3}
              value={cardInfo.cvc}
              onChangeText={(text) => handleCardInputChange('cvc', text)}
            />
          </View>
        </View>
      )}

      <Text style={styles.heading}>Order Summary</Text>

      {/* Order summary */}
      <View style={styles.section}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            {item.images && item.images.length > 0 ? (
              <Image
                source={{ uri: `http://backendIp:8080/images/${item.images[0]}` }}
                style={styles.productImage}
              />
            ) : (
              <View style={[styles.productImage, styles.noImage]}>
                <Text>No Image</Text>
              </View>
            )}

            <View style={styles.orderDetails}>
              <Text style={styles.orderName}>{item.name}</Text>
              <Text style={styles.orderQty}>Qty: {item.quantity}</Text>
            </View>

            <Text style={styles.orderPrice}>
              ${Number(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.costSummary}>
          <Text style={styles.costLabel}>Subtotal ({totalItems} items):</Text>
          <Text style={styles.costValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.costSummary}>
          <Text style={styles.costLabel}>Shipping:</Text>
          <Text style={styles.costValue}>Free</Text>
        </View>
        <View style={[styles.costSummary, styles.totalCost]}>
          <Text style={styles.costLabel}>Total:</Text>
          <Text style={styles.costValue}>${subtotal.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.placeOrderBtn}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.placeOrderText}>
          {paymentMethod === 'credit' ? 'Pay Now' : 'Complete Order'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAF6',
    minHeight: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#166534',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    fontSize: 16,
  },
  paymentOption: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    marginVertical: 6,
  },
  paymentSelected: {
    borderColor: '#16a34a',
    backgroundColor: '#DCFCE7',
  },
  paymentText: {
    fontSize: 16,
    color: '#111827',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
  },
  orderQty: {
    color: '#4B5563',
    marginTop: 4,
  },
  orderPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#16a34a',
  },
  costSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  costLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#374151',
  },
  costValue: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
  },
  totalCost: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    paddingTop: 10,
  },
  placeOrderBtn: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
