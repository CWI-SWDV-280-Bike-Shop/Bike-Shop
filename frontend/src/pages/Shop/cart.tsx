import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ScaledSize,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { ShopContext } from '@/context/shop.context';
import { Product, Order } from '@/types/data.types';
import Layout from '@/styles/layout/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@/utilities/formatter';
import { AuthContext } from '@/context/auth.context';
import { colors } from '@/styles/theme/Colors';
import { DrawerHeaderProps } from '@react-navigation/drawer';


const Cart = (props: DrawerHeaderProps) => {

  const { authUser, isLoggedIn } = useContext(AuthContext);
  const { products, quantity, total, checkout, removeFromCart, message } = useContext(ShopContext);

  const dimensions = useWindowDimensions();
  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 1450) ? true : false }
  const styles = checkMobile(dimensions) ? mobile : web;

  const [order, setOrder] = useState<Order | null>(null);

  const handleCheckout = async () => {
    const order = await checkout(products, authUser);
    setOrder(order);
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.cart}>
          <Text style={Layout.title}>Cart</Text>
          <Text>authUser: {JSON.stringify(authUser)}</Text>


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
        </View>
        <View style={styles.cart}>
          <Text>Sub Total: {formatPrice(total)}</Text>
          <Text>Total:</Text>
          <Text>Quantity: {quantity}</Text>
          <Text>OrderItems: {JSON.stringify(items)}</Text>
          {isLoggedIn ? <Text>Proceed to Checkout</Text> : <Text onPress={() => props.navigation.navigate("Login")}>Please Login to checkout your items</Text>}
          <TouchableOpacity
            style={[Styles.button]}
            onPress={isLoggedIn ? () => console.log("Checkout") : () => { return; }}
          >
            <Text style={Styles.buttonText}>
              Checkout<Icon size={15} name="checkbox-outline" />
            </Text>
          </TouchableOpacity>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;

const mobile = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  cart: {
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
});

const web = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  cart: {
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
});

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
    header: {
      marginTop: 10,
      fontSize: checkMobile(dimensions) ? 45 : 25,
      color: "#262626",
      textAlign: 'center',
    },
    bodyText: {
      marginTop: 15,
      fontSize: 24,
      color: "#262626",
      textAlign: "center",
    },
  });
