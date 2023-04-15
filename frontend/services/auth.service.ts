import api from '../api';
import TokenService from './token.service.js';

const AuthService = {
  login({ email, password }) {
    return api.post('/auth/login', { email, password });
  },

  register({ name, email, password, phone, address, role }) {
    return api.post('/auth/register', {
      name,
      email,
      password,
      phone,
      address,
      role,
    });
  },

  logout() {
    TokenService.removeLocalAuthUser();
  },
};

export default AuthService;
