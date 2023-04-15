import axios from 'axios';
import TokenService from './services/token.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-type': 'application/json',
  },
});

// attach accessToken before api requests
axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
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
axios.interceptors.response.use(
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
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
      }

      // use refreshToken to get a new accessToken and update in "localStorage" (AsyncStorage in Expo)
      try {
        const response = await api
          .post('/auth/refresh', {
            refreshToken: TokenService.getLocalRefreshToken(),
          })
          .then((res) => res.data);

        const { accessToken } = response;
        TokenService.updateLocalAccessToken(accessToken);

        return api(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
