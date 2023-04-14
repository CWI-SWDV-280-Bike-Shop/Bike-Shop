import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import AuthContext from '../../context/auth.context';
import AuthService from '../../services/auth.service';
import Login from './Auth/Login';
import Register from './Auth/Register';

const Auth = () => {
  // Login
  const [AuthUser, setAuthUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    accessToken: '',
    refreshToken: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = ({ email, password }) => {
    AuthService.login({ email, password }).then((res) => setAuthUser(res.data));
    setIsLoggedIn(true);
  };

  // Register
  const [NewUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    role: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const register = ({ name, email, password, phone, address, role }) => {
    AuthService.register({ name, email, password, phone, address, role }).then(
      (res) => setNewUser(res.data)
    );
    setIsRegistered(true);
  }; // TODO

  return (
    <AuthContext.Provider
      value={{ AuthUser, login, isLoggedIn, NewUser, register, isRegistered }}
    >
      <View style={Styles.section}>
        <Text style={Styles.title}>Auth </Text>
        <Login />
        <Register />
      </View>
    </AuthContext.Provider>
  );
};

export default Auth;
