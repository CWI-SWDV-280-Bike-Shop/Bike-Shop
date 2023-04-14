import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Styles from '../../Styles';
import { AuthContext } from '../../context/auth.context';
import AuthService from '../../services/auth.service';
import { Login } from './Auth/';

export const AuthSection = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    accessToken: '',
    refreshToken: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = ({ email, password }) => {
    console.log('logging in');
    AuthService.login({ email, password }).then((res) => setUser(res.data));
    setIsLoggedIn(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const register = () => {}; // TODO

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login }}>
      <View style={Styles.section}>
        <Text style={Styles.title}>Auth {'Context API'}</Text>
        <Login />
      </View>
    </AuthContext.Provider>
  );
};
