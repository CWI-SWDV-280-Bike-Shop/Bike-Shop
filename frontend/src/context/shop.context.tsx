import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { AuthUser, Order, OrderItem, Product } from '@/types/data.types';
import CartAPI from '@/api/cart.api';
import { AuthContext } from './auth.context';
import OrderAPI from '@/api/order.api';

type ShopContextType = {
  products: Product[] | null;
  quantity: number | null;
  total: number | null;
  addToCart: (newProduct: Product) => void;
  removeFromCart: (removedProduct: Product) => void;
  checkout: (products: Product[], authUser: AuthUser) => Promise<Order>;
  message: string | null;
};

export const ShopContext = createContext<ShopContextType>({
  products: null,
  quantity: null,
  total: null,
  addToCart: (newProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  removeFromCart: (removedProduct) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  checkout: (products, authUser) => Promise.resolve({} as Order), // eslint-disable-line @typescript-eslint/no-empty-function
  message: null,
});

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
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

  // Update cart
  useEffect(() => {
    if (products) {
      // Calculate total
      const newTotal = products.reduce((previousValue, item) => {
        return previousValue + item?.price;
      }, 0);
      setTotal(newTotal);

      // Set Quantity
      setQuantity(products.length);
    }
  }, [products]);

  const addToCart = (newProduct: Product) => {
    const updatedProducts = products ? [...products, newProduct] : [newProduct];
    setProducts(updatedProducts);
    CartAPI.setLocalCart(updatedProducts);
  };

  const removeFromCart = (removedProduct: Product) => {
    const updatedProducts = products.filter((product: Product) => {
      return product._id !== removedProduct._id;
    });
    setProducts(updatedProducts);
    CartAPI.setLocalCart(updatedProducts);
  };

  // build order from products
  const checkout = async (products: Product[], authUser: AuthUser) => {
    const customerId = authUser._id;

    const orderItems: OrderItem[] = products.map((product: Product) => ({
      product: product?._id,
      price: product?.price,
      quantity: 1,
    }));

    const newOrder: Order = {
      customer: customerId,
      items: orderItems,
      total: total,
    };

    const response = await OrderAPI.create(newOrder);
    const order = response.data;

    setProducts([]);
    CartAPI.clearLocalCart();
    setMessage('Order placed successfully');

    return order as Order;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
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
