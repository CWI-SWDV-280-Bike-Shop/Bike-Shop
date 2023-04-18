import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthUser from '@/types/authUser.type';

const TokenAPI = {
  async getLocalAccessToken() {
    const localUser = await AsyncStorage.getItem('user');
    if (!localUser) return null;
    const user = JSON.parse(localUser) as AuthUser;
    return user?.accessToken;
  },

  async getLocalRefreshToken() {
    const localUser = await AsyncStorage.getItem('user');
    if (!localUser) return null;
    const user = JSON.parse(localUser) as AuthUser;
    return user?.refreshToken;
  },

  async updateLocalAccessToken(token: string) {
    const localUser = await AsyncStorage.getItem('user');
    if (!localUser) return null;
    const user = JSON.parse(localUser) as AuthUser;
    user.accessToken = token;
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },

  async getLocalAuthUser() {
    const localUser = await AsyncStorage.getItem('user');
    return JSON.parse(localUser) as AuthUser;
  },

  async setLocalAuthUser(user) {
    AsyncStorage.setItem('user', JSON.stringify(user));
  },

  async removeLocalAuthUser() {
    AsyncStorage.removeItem('user');
  },
};

export default TokenAPI;
