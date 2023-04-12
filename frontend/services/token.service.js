import AsyncStorage from '@react-native-async-storage/async-storage';

const TokenService = {
  getLocalAccessToken() {
    const user = JSON.parse(AsyncStorage.getItem('user'));
    return user?.accessToken;
  },

  getLocalRefreshToken() {
    const user = JSON.parse(AsyncStorage.getItem('user'));
    return user?.refreshToken;
  },

  updateLocalAccessToken(token) {
    let user = JSON.parse(AsyncStorage.getItem('user'));
    user.accessToken = token;
    AsyncStorage.setItem('user', JSON.stringify(user));
  },

  getLocalUser() {
    return JSON.parse(AsyncStorage.getItem('user'));
  },

  setLocalUser(user) {
    AsyncStorage.setItem('user', JSON.stringify(user));
  },

  removeLocalUser() {
    AsyncStorage.removeItem('user');
  },
};

export default TokenService;
