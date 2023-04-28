import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/types/data.types';

const CartAPI = {
  async getLocalCart() {
    const localCart = await AsyncStorage.getItem('cart');
    if (!localCart) return null;
    const cart = JSON.parse(localCart) as Product[];
    return cart;
  },

  async setLocalCart(cart: Product[]) {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  },

  async clearLocalCart() {
    AsyncStorage.removeItem('cart');
  },
};

export default CartAPI;
