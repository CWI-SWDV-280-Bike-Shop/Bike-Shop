import api from './api';

const AuthAPI = {
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
};

export default AuthAPI;
