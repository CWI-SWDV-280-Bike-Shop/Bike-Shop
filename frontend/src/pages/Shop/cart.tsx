import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
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
  const { authUser } = useContext(AuthContext);
  const {
    cartItems,
    quantity,
    total,
    addToCart,
    removeFromCart,
    deleteFromCart,
  } = useContext(ShopContext);

  return (
    <View style={[Styles.container]}>
      <Text style={[Styles.title, Styles.bold]}>Cart</Text>
      <ScrollView>
        {cartItems.map((cartItem: CartItem, index) => (
          <View style={[Styles.itemCard, Styles.row]} key={index}>
            {/* Product */}
            <View style={[Styles.row, Styles.productContainer]}>
              <View style={Styles.productImageContainer}>
                {(cartItem?.product?.image && (
                  <ImageBackground
                    style={Styles.productImage}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    source={cartItem?.product?.image}
                    resizeMode="contain"
                  />
                )) || <Icon name="image-outline" size={128} />}
              </View>
              <View style={[Styles.productTextContainer]}>
                <Text style={Styles.productName}>
                  {cartItem?.product?.name} -{' '}
                  <Text style={Styles.productPrice}>
                    {formatPrice(cartItem?.product?.price)}
                  </Text>
                </Text>
                <Text style={[Styles.productDescription]}>
                  {cartItem?.product?.description}
                </Text>

                <Text>
                  <Text style={Styles.productLabel}>Category: </Text>
                  {cartItem?.product?.category}
                </Text>
                <Text>
                  <Text style={Styles.productLabel}>Subcategory: </Text>
                  {cartItem?.product?.subcategory}
                </Text>
                {cartItem?.product?.category === 'Bikes' && (
                  <>
                    <Text>
                      <Text style={Styles.productLabel}>Brand: </Text>
                      {cartItem?.product?.brand}
                    </Text>
                    <Text>
                      <Text style={Styles.productLabel}>Material: </Text>
                      {cartItem?.product?.material}
                    </Text>
                    <Text>
                      <Text style={Styles.productLabel}>Wheel Size: </Text>
                      {cartItem?.product?.wheelSize}
                    </Text>
                    <Text>
                      <Text style={Styles.productLabel}>Color: </Text>
                      {cartItem?.product?.color}
                    </Text>
                    <Text>
                      <Text style={Styles.productLabel}>Size: </Text>
                      {cartItem?.product?.size}
                    </Text>
                    <Text>
                      <Text style={Styles.productLabel}>Gender: </Text>
                      {cartItem?.product?.gender}
                    </Text>
                  </>
                )}
              </View>
            </View>

            <View style={[Styles.center, { gap: 10 }]}>
              <Text style={Styles.actionsLabel}>Quantity</Text>
              {/* Quantity */}
              <View style={[Styles.row, Styles.center]}>
                <TouchableOpacity
                  style={[Styles.button, Colors.bgArtichoke]}
                  onPress={() => removeFromCart(cartItem?.product)}
                >
                  <Icon size={15} name="remove-outline" color={'white'} />
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    margin: 20,
                    fontSize: 24,
                  }}
                >
                  {cartItem?.quantity}
                </Text>
                <TouchableOpacity
                  style={[Styles.button, Colors.bgBlack]}
                  onPress={() => addToCart(cartItem?.product)}
                >
                  <Icon size={15} name="add-outline" color={'white'} />
                </TouchableOpacity>
              </View>

              {/* Delete */}
              <View style={[Styles.center, { width: '100%' }]}>
                <Text style={Styles.actionsLabel}>Remove</Text>
                <TouchableOpacity
                  style={[Styles.button, Styles.deleteBtn, { width: '100%' }]}
                  onPress={() => deleteFromCart(cartItem?.product)}
                >
                  <Icon size={15} name="trash-outline" color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={Styles.checkoutBtnContainer}>
        <View style={Styles.checkoutTextContainer}>
          <View style={[Styles.spread, Styles.row]}>
            <Text style={Styles.checkoutText}>Items:</Text>
            <Text style={[Styles.checkoutText, Styles.bold]}>{quantity}</Text>
          </View>
          <View style={[Styles.spread, Styles.row]}>
            <Text style={Styles.checkoutText}>Total:</Text>
            <Text style={[Styles.checkoutText, Styles.bold]}>
              {formatPrice(total)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={Styles.checkoutBtn}
          onPress={() => props.navigation.navigate('Checkout')}
        >
          <Text style={Styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
  },
  spread: {
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    margin: 10,
  },
  // Item Cards
  itemCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: 'gray',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    justifyContent: 'space-between',
  },

  // Products
  productContainer: {
    gap: 10,
  },
  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    margin: 10,
  },
  productTextContainer: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.artichoke,
  },
  productLabel: {
    fontWeight: 'bold',
  },

  // Actions Buttons
  actionsLabel: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },

  // Quantity
  quantityBtn: {},
  quantityAdd: {},
  quantityRemove: {},
  quantityDisplayContainer: {},

  // Delete
  deleteBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#941b0c',
  },

  // Checkout Button
  checkoutTextContainer: {
    margin: 10,
  },
  checkoutText: {
    fontSize: 24,
  },
  checkoutBtnContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    elevation: 1,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  checkoutBtn: {
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    backgroundColor: colors.feldgrau,
  },
  checkoutBtnText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
