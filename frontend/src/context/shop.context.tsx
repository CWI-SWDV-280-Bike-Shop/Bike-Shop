import React, { ReactNode, createContext, useState, useEffect } from 'react';
import { OrderItem, Product } from '@/types/data.types';
import CartAPI from '@/api/cart.api';

type ShopContextType = {
  products: Product[] | null;
  items: OrderItem[] | null;
  quantity: number | null;
  total: number | null;
  addToCart: (newProduct: Product) => void;
  removeFromCart: (removedProduct: Product) => void;
  checkout: (products: OrderItem[]) => void;
  message: string | null;
};

export const ShopContext = createContext<ShopContextType>({
  products: null,
  items: null,
  quantity: null,
  total: null,
  addToCart: (newProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  removeFromCart: (removedProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  checkout: (products) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  message: null,
});

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [items, setItems] = useState<OrderItem[] | null>(null);
  const [quantity, setQuantity] = useState(null);
  const [total, setTotal] = useState(null);
  const [message, setMessage] = useState(null);

  // fetch cart from localStorage
  useEffect(() => {
    const fetchLocalCartProducts = async () => {
      const localCartProducts = (await CartAPI.getLocalCart()) as Product[];
      if (localCartProducts) {
        setProducts(localCartProducts);
      }
    };
    fetchLocalCartProducts();
    setMessage('Cart products fetched from local storage');
  }, []);

  // calculate total on `products` change
  useEffect(() => {
    if (products) {
      const updatedItems = products.map((product: Product, index: number) => {
        return {
          product: product?._id,
          price: product?.price,
          quantity: 1,
        };
      });
      setItems(updatedItems);
      const newTotal = products.reduce((previousValue, item) => {
        return previousValue + item?.price;
      }, 0);
      setTotal(newTotal);
      setQuantity(products.length);
    }
  }, [products]);

  const addToCart = (newProduct: Product) => {
    const updatedProducts = products ? [...products, newProduct] : [newProduct];
    setProducts(updatedProducts);
    CartAPI.setLocalCart(updatedProducts);
  };

  const removeFromCart = (removedProduct: Product) => {
    const updatedProducts = products.filter((item: Product) => {
      return item._id !== removedProduct._id;
    });
    setProducts(updatedProducts);
    CartAPI.setLocalCart(updatedProducts);
  };

  const checkout = (items: OrderItem[]) => {
    return; // we need to build an order here. i'm not sure if we can use the AuthContext within the ShopContext, but we need the AuthUser's _id to attach to the order. hmmmm 🤔
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        items,
        addToCart,
        removeFromCart,
        checkout,
        message,
        total,
        quantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
