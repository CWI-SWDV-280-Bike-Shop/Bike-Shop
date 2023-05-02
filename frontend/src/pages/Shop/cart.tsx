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
import { Product, Order, CartItem } from '@/types/data.types';
import Layout from '@/styles/layout/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatPrice } from '@/utilities/formatter';
import { AuthContext } from '@/context/auth.context';
import Colors, { colors } from '@/styles/theme/Colors';
import { DrawerHeaderProps } from '@react-navigation/drawer';

const Cart = (props: DrawerHeaderProps) => {
  //these prices are based off of https://www.ups.com/assets/resources/webcontent/en_US/daily_rates.pdf
  const streetBikeShipping = 16.1;
  const mountainBikeShipping = 19.45;
  const eBikeShipping = 38.99;
  const accessoriesShipping = 11.67;
  //Auth
  const { authUser } = useContext(AuthContext);
  //Shop
  const {
    cartItems,
    quantity,
    total,
    checkout,
    addToCart,
    removeFromCart,
    deleteFromCart,
    message,
  } = useContext(ShopContext);
  //Responsive
  const dimensions = useWindowDimensions();
  const checkMobile = (dimensions: ScaledSize) => {
    return Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      dimensions.width <= 1450
      ? true
      : false;
  };
  const responsive = checkMobile(dimensions) ? mobile : web;
  //Set Order
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = () => {
    props.navigation.navigate('Checkout');
  };

  const calculateShipping = (cartItems: CartItem[]) => {
    let cost = 0;
    cartItems.map((cartItem) => {
      if (cartItem?.product?.category == 'Bikes') {
        if (cartItem?.product?.subcategory == 'Mountain') {
          cost += mountainBikeShipping;
        } else if (cartItem?.product?.subcategory == 'Street') {
          cost += streetBikeShipping;
        } else if (cartItem?.product?.subcategory == 'Electric') {
          cost += eBikeShipping;
        }
      } else if (cartItem?.product?.category == 'Accessories') {
        cost += accessoriesShipping;
      }
      // else if (cartItem?.product?.category == 'Services') { Dumb logic that does not need to be here. Must have been sleep deprived this day.
      //   cost += 0;
      // }
    });
    return cost;
  };

  const ListOrderItems = (cartItems: CartItem[]) => {
    let orderItems = '\n';
    cartItems.map((item: CartItem) => {
      orderItems += 'Product: ' + item?.product?.name + ' ';
      orderItems += 'Item Price: ' + formatPrice(item?.product?.price) + ' ';
      orderItems += '\n';
    });
    return orderItems;
  };

  return (
    <View style={[Styles.container, responsive.container]}>
      <View style={[Styles.cart, responsive.cart]}>
        <Text style={[Styles.bodyText, { fontWeight: 'bold', fontSize: 30 }]}>
          Are you ready to checkout {authUser ? authUser.name + '?' : <Text />}
        </Text>
        <Text style={Styles.bodyText}>
          Quantity of Items/Services: {quantity}
        </Text>
        <Text style={Styles.bodyText}>
          Ordered Items:{' '}
          {quantity == 0 || null
            ? 'There is nothing in your cart'
            : cartItems && ListOrderItems(cartItems)}
        </Text>
        <Text style={Styles.bodyText}>Sub Total: {formatPrice(total)}</Text>
        <Text style={Styles.bodyText}>
          Shipping: {cartItems && formatPrice(calculateShipping(cartItems))}
        </Text>
        <Text style={Styles.bodyText}>
          State Tax: {formatPrice(total * 0.06)}
        </Text>
        <Text style={Styles.bodyText}>
          Grand Total:
          {formatPrice(
            total * 1.06 + (cartItems && calculateShipping(cartItems))
          )}
        </Text>
        {authUser ? (
          <Text style={[Styles.bodyText, { fontWeight: 'bold' }]}>
            Proceed to Checkout
          </Text>
        ) : (
          <Text
            style={[Styles.bodyText, { fontWeight: 'bold' }]}
            onPress={() => props.navigation.navigate('Login')}
          >
            Please Login to checkout your items
          </Text>
        )}
        <TouchableOpacity
          style={[Styles.button, Styles.checkoutBtn]}
          onPress={handleCheckout}
        >
          <Text style={Styles.buttonText}>
            Checkout <Icon size={20} name="cart-outline" />
          </Text>
        </TouchableOpacity>
        <Text>{errorMessage}</Text>
        {/* This does not have Styles yet TODO */}
        {order && (
          <>
            <Text>{message}</Text>
            <Text>order: {JSON.stringify(order)}</Text>
          </>
        )}
      </View>
      <View style={Styles.cartScroll}>
        <ScrollView>
          <Text style={Styles.header}>Cart</Text>
          {(cartItems &&
            cartItems.map((cartItem: CartItem, index: number) => (
              <View style={Styles.productCard} key={index}>
                <View style={{ flex: 2 }}>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    {index + 1}.
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    name: {cartItem?.product?.name}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    _id: {cartItem?.product?._id}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    description: {cartItem?.product?.description}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    category: {cartItem?.product?.category}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    subcategory: {cartItem?.product?.subcategory}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    price: {cartItem?.product?.price}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    imageIds: {cartItem?.product?.imageIds}
                  </Text>
                  <Text style={[Styles.bodyText, Styles.cardText]}>
                    inStock: {cartItem?.product?.inStock}
                  </Text>
                  {cartItem?.product?.category === 'Bikes' && (
                    <>
                      <Text style={[Styles.bodyText, Styles.cardText]}>
                        brand: {cartItem?.product?.brand}
                      </Text>
                      <Text style={[Styles.bodyText, Styles.cardText]}>
                        material: {cartItem?.product?.material}
                      </Text>
                      <Text style={[Styles.bodyText, Styles.cardText]}>
                        wheelSize: {cartItem?.product?.wheelSize}
                      </Text>
                      <Text style={[Styles.bodyText, Styles.cardText]}>
                        color: {cartItem?.product?.color}
                      </Text>
                      <Text style={[Styles.bodyText, Styles.cardText]}>
                        size: {cartItem?.product?.size}
                      </Text>
                    </>
                  )}
                </View>
                <View style={[Styles.buttonContainer]}>
                  <Text style={{ textAlign: 'center' }}>
                    Quantity: {cartItem?.quantity}
                  </Text>
                  <TouchableOpacity
                    style={[Styles.button, Colors.bgBlack]}
                    onPress={() => addToCart(cartItem?.product)}
                  >
                    <Icon size={15} name="add-outline" color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[Styles.button, Colors.bgArtichoke]}
                    onPress={() => removeFromCart(cartItem?.product)}
                  >
                    <Icon size={15} name="remove-outline" color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[Styles.button, Styles.deleteBtn]}
                    onPress={() => deleteFromCart(cartItem?.product)}
                  >
                    <Icon size={15} name="trash-outline" color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            ))) || (
            <Text style={Styles.bodyText}>
              Add things to your cart in the Shop page and they will show up
              right here!
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Cart;

const mobile = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  cart: {
    marginTop: 90,
  },
});

const web = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cart: {},
});

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
  },
  cart: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,

    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
  cartScroll: {
    margin: 5,

    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productCard: {
    flexDirection: 'row',
    margin: 10,

    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#262626',
    textAlign: 'center',
  },
  bodyText: {
    marginTop: 15,
    fontSize: 24,
    color: '#262626',
    textAlign: 'center',
  },
  cardText: {
    margin: 4,
    fontSize: 15,
  },
});
