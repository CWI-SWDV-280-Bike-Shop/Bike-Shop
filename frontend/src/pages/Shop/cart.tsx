import React, { useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ShopContext } from '@/context/shop.context';
import { Product } from '@/types/data.types';
import Layout from '@/styles/layout/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@/utilities/formatter';

const Cart = () => {
  const { products, items, quantity, total, removeFromCart } =
    useContext(ShopContext);

  return (
    <ScrollView style={Layout.section}>
      <Text style={Layout.title}>Cart</Text>
      <Text>Total: {formatPrice(total)}</Text>
      <Text>Quantity: {quantity}</Text>
      <Text>OrderItems: {JSON.stringify(items)}</Text>
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
});
