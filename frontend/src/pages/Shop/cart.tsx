import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ShopContext } from '@/context/shop.context';
import { Product, Order } from '@/types/data.types';
import Layout from '@/styles/layout/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@/utilities/formatter';
import { AuthContext } from '@/context/auth.context';
import { colors } from '@/styles/theme/Colors';

const Cart = () => {
  const { authUser } = useContext(AuthContext);
  const { products, quantity, total, checkout, removeFromCart, message } =
    useContext(ShopContext);

  const [order, setOrder] = useState<Order | null>(null);

  const handleCheckout = async () => {
    const order = await checkout(products, authUser);
    setOrder(order);
  };

  return (
    <ScrollView style={Layout.section}>
      <Text>authUser: {JSON.stringify(authUser)}</Text>
      <Text style={Layout.title}>Cart</Text>
      <Text>Total: {formatPrice(total)}</Text>
      <Text>Quantity: {quantity}</Text>
      {products &&
        products.map((product: Product, index: number) => (
          <View style={{ margin: 10 }} key={index}>
            <Text>{index}.</Text>
            <Text>_id: {product?._id}</Text>
            <Text>name: {product?.name}</Text>
            <Text>description: {product?.description}</Text>
            <Text>category: {product?.category}</Text>
            <Text>subcategory: {product?.subcategory}</Text>
            <Text>price: {product?.price}</Text>
            <Text>imageIds: {product?.imageIds}</Text>
            <Text>inStock: {product?.inStock}</Text>
            {product.category === 'Bikes' && (
              <>
                <Text>brand: {product?.brand}</Text>
                <Text>material: {product?.material}</Text>
                <Text>wheelSize: {product?.wheelSize}</Text>
                <Text>color: {product?.color}</Text>
                <Text>size: {product?.size}</Text>
              </>
            )}
            <TouchableOpacity
              style={[Styles.button, Styles.deleteBtn]}
              onPress={() => removeFromCart(product)}
            >
              <Text style={Styles.buttonText}>
                Remove <Icon size={15} name="trash-outline" />
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      <TouchableOpacity
        style={[Styles.button, Styles.checkoutBtn]}
        onPress={handleCheckout}
      >
        <Text style={Styles.buttonText}>
          Checkout <Icon size={15} name="cart-outline" />
        </Text>
      </TouchableOpacity>
      {order && (
        <>
          <Text>{message}</Text>
          <Text>order: {JSON.stringify(order)}</Text>
        </>
      )}
    </ScrollView>
  );
};

export default Cart;

const Styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    margin: 3,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#941b0c',
  },
  checkoutBtn: {
    backgroundColor: colors.artichoke,
  },
});
