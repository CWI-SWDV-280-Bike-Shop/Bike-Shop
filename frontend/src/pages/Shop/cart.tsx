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
  //these prices are based off of https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf
  const streetBikeShipping = 16.10;
  const mountainBikeShipping = 19.45;
  const eBikeShipping = 38.99;
  const accessoriesShipping = 11.67;

  const { authUser, isLoggedIn } = useContext(AuthContext);
  const { products, quantity, total, checkout, removeFromCart, message } = useContext(ShopContext);

  const dimensions = useWindowDimensions();
  const checkMobile = (dimensions: ScaledSize) => { return (Platform.OS === 'android' || Platform.OS === 'ios' || dimensions.width <= 1450) ? true : false }
  const responsive = checkMobile(dimensions) ? mobile : web;

  const [order, setOrder] = useState<Order | null>(null);

  const handleCheckout = async () => {
    const order = await checkout(products, authUser);
    setOrder(order);
  };

  const calculateShipping = (products: Product[]) => {
    let cost: number;

    products.map(product => {
      if (product.category == 'Bikes') {
        if (product.subcategory == 'Mountain') {
          cost += mountainBikeShipping;
        } else if (product.subcategory == 'Street') {
          cost += streetBikeShipping;
        } else if (product.subcategory == 'Electric') {
          cost += eBikeShipping;
        }
      }
      else if (product.category == 'Accessories') {
        cost += accessoriesShipping;
      }
      else if (product.category == 'Services') {
        cost += 0;
      }
    });
    return cost;
  }

  return (
    <View style={[Styles.container, responsive.container]}>
      <View style={[Styles.cart, responsive.cart]}>
        <Text style={[Styles.bodyText, { fontWeight: 'bold' }]}>Are your ready to checkout?  {isLoggedIn ? authUser.name + '?' : <Text />}</Text>
        <Text style={Styles.bodyText}>Sub Total: {formatPrice(total)}</Text>
        <Text style={Styles.bodyText}>Shipping: {products && formatPrice(calculateShipping(products))}</Text>
        <Text style={Styles.bodyText}>Total:{formatPrice(total * 1.06)}</Text>
        <Text style={Styles.bodyText}>Quantity: {quantity}</Text>
        {
          isLoggedIn
            ?
            <Text style={[Styles.bodyText, { fontWeight: 'bold' }]}>Proceed to Checkout</Text>
            :
            <Text style={[Styles.bodyText, { fontWeight: 'bold' }]} onPress={() => props.navigation.navigate("Login")}>Please Login to checkout your items</Text>
        }
        <TouchableOpacity
          style={[Styles.button, Styles.checkoutBtn]}
          onPress={isLoggedIn ? () => console.log("Checkout") : () => props.navigation.navigate("Login")}
        >
          <Text style={Styles.buttonText}>
            Checkout <Icon size={20} name="checkbox-outline" />
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView >
        <View style={Styles.cartScroll}>
          <Text style={Styles.header}>Cart</Text>
          {products &&
            products.map((product: Product, index: number) => (
              <View style={{ margin: 10 }} key={index}>
                <Text style={Styles.bodyText}>{index + 1}.</Text>
                <Text style={Styles.bodyText}>_id: {product?._id}</Text>
                <Text style={Styles.bodyText}>name: {product?.name}</Text>
                <Text style={Styles.bodyText}>description: {product?.description}</Text>
                <Text style={Styles.bodyText}>category: {product?.category}</Text>
                <Text style={Styles.bodyText}>subcategory: {product?.subcategory}</Text>
                <Text style={Styles.bodyText}>price: {product?.price}</Text>
                <Text style={Styles.bodyText}>imageIds: {product?.imageIds}</Text>
                <Text style={Styles.bodyText}>inStock: {product?.inStock}</Text>
                {product.category === 'Bikes' && (
                  <>
                    <Text style={Styles.bodyText}>brand: {product?.brand}</Text>
                    <Text style={Styles.bodyText}>material: {product?.material}</Text>
                    <Text style={Styles.bodyText}>wheelSize: {product?.wheelSize}</Text>
                    <Text style={Styles.bodyText}>color: {product?.color}</Text>
                    <Text style={Styles.bodyText}>size: {product?.size}</Text>
                  </>
                )}
                <TouchableOpacity
                  style={[Styles.button, Styles.deleteBtn]}
                  onPress={() => removeFromCart(product)}
                >
                  <Text style={Styles.buttonText}>
                    Remove From Cart <Icon size={15} name="trash-outline" />
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
        <View style={Styles.cart}>
          <Text>Sub Total: {formatPrice(total)}</Text>
          <Text>Total:</Text>
          <Text>Quantity: {quantity}</Text>
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
      </ScrollView>
    </View>
  );
};

export default Cart;

const mobile = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  cart: {
    marginTop: 90,
  },
});

const web = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cart: {

  }
});

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
  },
  cart: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",

    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
  cartScroll: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    // flex: 1,
    // flexDirection: "row",
    height: 50,
    width: 150,
    padding: 10,
    margin: 3,
    borderRadius: 10,
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  deleteBtn: {
    backgroundColor: '#941b0c',
  },
  checkoutBtn: {
    backgroundColor: colors.artichoke,
  },
  header: {
    marginTop: 10,
    fontSize: 35,
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
