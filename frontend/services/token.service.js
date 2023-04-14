import AsyncStorage from '@react-native-async-storage/async-storage';

const TokenService = {
  async getLocalAccessToken() {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    return user?.accessToken;
  },

  async getLocalRefreshToken() {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    return user?.refreshToken;
  },

  async updateLocalAccessToken(token) {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    user.accessToken = token;
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },

  async getLocalUser() {
    let user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  },

  async setLocalUser(user) {
    AsyncStorage.setItem('user', JSON.stringify(user));
  },

  async removeLocalUser() {
    AsyncStorage.removeItem('user');
  },
};

export default TokenService;
