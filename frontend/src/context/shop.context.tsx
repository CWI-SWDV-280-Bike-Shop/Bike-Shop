import React, { ReactNode, createContext, useState, useEffect } from 'react';
import {
  AuthUser,
  Order,
  OrderItem,
  Product,
  CartItem,
  Address,
} from '@/types/data.types';
import CartAPI from '@/api/cart.api';
import { AuthContext } from './auth.context';
import OrderAPI from '@/api/order.api';

type ShopContextType = {
  cartItems: CartItem[];
  quantity: number;
  total: number;
  addToCart: (newProduct: Product) => void;
  removeFromCart: (removedProduct: Product) => void;
  deleteFromCart: (removedProduct: Product) => void;
  checkout: (
    cartItems: CartItem[],
    authUser: AuthUser,
    address: Address
  ) => Promise<Order>;
  message: string | null;
};

export const ShopContext = createContext<ShopContextType>({
  cartItems: [],
  quantity: 0,
  total: 0,
  addToCart: (newProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  removeFromCart: (removedProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  deleteFromCart: (deletedProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  checkout: (cartItems, authUser, address) => Promise.resolve({} as Order), // eslint-disable-line @typescript-eslint/no-empty-function
  message: null,
});

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(null);

  // fetch cart from localStorage
  useEffect(() => {
    const fetchLocalCartItems = async () => {
      const localCartItems = (await CartAPI.getLocalCart()) as CartItem[];
      if (localCartItems) {
        setCartItems(localCartItems);
      }
    };
    fetchLocalCartItems();
    setMessage('Cart items fetched from local storage');
  }, []);

  // Update cart
  useEffect(() => {
    if (cartItems) {
      // Calculate total
      const newTotal = cartItems.reduce((previousValue, item) => {
        return previousValue + item.product.price * item.quantity;
      }, 0);
      setTotal(newTotal);

      // Set Total Quantity
      const newQuantity = cartItems.reduce((previousValue, item) => {
        return previousValue + item.quantity;
      }, 0);
      setQuantity(newQuantity);
    }
  }, [cartItems]);

  const addToCart = (newProduct: Product) => {
    const existingCartItem = cartItems.find((cartItem: CartItem) => {
      return cartItem.product._id === newProduct._id;
    });

    const updatedCartItems = existingCartItem
      ? // if the item exists in the cart, increase the quantity
        cartItems.map((cartItem: CartItem) => {
          if (cartItem.product._id === newProduct._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          } else {
            return cartItem;
          }
        })
      : // otherwise, create a new item
        [...cartItems, { product: newProduct, quantity: 1 }];

    setCartItems(updatedCartItems);
    CartAPI.setLocalCart(updatedCartItems);
  };

  const removeFromCart = (removedProduct: Product) => {
    const existingCartItem = cartItems.find(
      (cartItem: CartItem) => cartItem.product._id === removedProduct._id
    );
    if (existingCartItem) {
      const updatedCartItems =
        existingCartItem.quantity > 1 // if item exists in the cart, decrease quantity
          ? cartItems.map((cartItem: CartItem) => {
              return cartItem.product._id === removedProduct._id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                  }
                : cartItem;
            })
          : // otherwise, remove the item
            cartItems.filter(
              (cartItem: CartItem) =>
                cartItem.product._id !== removedProduct._id
            );
      setCartItems(updatedCartItems);
      CartAPI.setLocalCart(updatedCartItems);
    }
  };

  const deleteFromCart = (deletedProduct: Product) => {
    const existingCartItem = cartItems.find(
      (cartItem: CartItem) => cartItem.product._id === deletedProduct._id
    );

    if (existingCartItem) {
      const updatedCartItems = cartItems.filter(
        (cartItem: CartItem) => cartItem.product._id !== deletedProduct._id
      );
      setCartItems(updatedCartItems);
      CartAPI.setLocalCart(updatedCartItems);
    }
  };

  // build order from products
  const checkout = async (
    cartItems: CartItem[],
    authUser: AuthUser,
    address: Address
  ) => {
    const customerId = authUser._id;

    const orderItems: OrderItem[] = cartItems.map((cartItem: CartItem) => ({
      product: cartItem.product._id,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
    }));

    const newOrder: Order = {
      customer: customerId,
      items: orderItems,
      total: total,
      shippingAddress: address,
    };

    const response = await OrderAPI.create(newOrder);
    const order = response.data;

    setCartItems([]);
    CartAPI.clearLocalCart();
    setMessage('Order placed successfully');

    return order as Order;
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        quantity,
        total,
        addToCart,
        removeFromCart,
        deleteFromCart,
        checkout,
        message,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
