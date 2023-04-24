import React, { ReactNode, createContext, useState, useEffect } from 'react';
import { OrderItem } from '@/types/data.types';

type ShopContextType = {
  items: OrderItem[] | null;
  addToCart: (newItem: OrderItem) => void;
  removeFromCart: (removedItem: OrderItem) => void;
  message: string | null;
};

export const ShopContext = createContext<ShopContextType>({
  items: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToCart: (newItem) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFromCart: (removedItem) => {},
  message: null,
});

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[] | null>(null);
  const [message, setMessage] = useState(null);

  const addToCart = (newItem: OrderItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
  };

  const removeFromCart = (removedItem: OrderItem) => {
    const updatedItems = items.filter((item: OrderItem) => {
      return item._id !== removedItem._id;
    });
    setItems(updatedItems);
  };

  return (
    <ShopContext.Provider value={{ items, addToCart, removeFromCart, message }}>
      {children}
    </ShopContext.Provider>
  );
};
