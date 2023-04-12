import api from '../api';
import TokenService from './token.service.js';

const AuthService = {
  register({ name, email, password }) {
    return api.post('/auth/register', { name, email, password });
  },

  login({ email, password }) {
    return api.post('/auth/login', { email, password });
  },

  logout() {
    TokenService.removeLocalUser();
  },
};

export default AuthService;
