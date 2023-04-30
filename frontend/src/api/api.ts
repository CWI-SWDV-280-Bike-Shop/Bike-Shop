import axios from 'axios';
import TokenAPI from './token.api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = __DEV__ ? "localhost:8081" : "thebikeshop.app"

const api = axios.create({
  baseURL: `//${url}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

// attach accessToken before api requests
api.interceptors.request.use(
  async (config) => {
    const token = await TokenAPI.getLocalAccessToken();
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// "gracefully" handle Token errors (token not provided, expired, etc.)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // save the original request that was sent
    const originalConfig = error.config;

    if (originalConfig.url !== 'auth/login' && error.response) {
      // Access Token was not provided
      if (error.response.status === 403) {
        AsyncStorage.removeItem('user');
        // TODO
        // window.location = '/login'; Under normal circumstances, we would redirect to the login page. Idk how to do this in Expo yet
      }

      // Access token was expired
      if (error.response.data.accessTokenExpired && !originalConfig._retry) {
        originalConfig._retry = true;
      }

      if (!originalConfig._retry) return Promise.reject(error);
      // use refreshToken to get a new accessToken and update in "localStorage" (AsyncStorage in Expo)
      try {
        const response = await api
          .post('/auth/refresh', {
            refreshToken: TokenAPI.getLocalRefreshToken(),
          })
          .then((res) => res.data);

        const { accessToken } = response;
        TokenAPI.updateLocalAccessToken(accessToken);

        return api(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
