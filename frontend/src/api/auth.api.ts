import api from './api';
import { Credentials, AuthUser } from '@/types/data.types';

const AuthAPI = {
  login(credentials: Credentials) {
    return api.post('/auth/login', credentials);
  },

  register(user: AuthUser) {
    return api.post('/auth/register', user);
  },
};

export default AuthAPI;
