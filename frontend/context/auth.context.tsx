import React, { ReactNode, createContext, useState } from 'react';
import AuthService from '../services/auth.service';
import { View } from 'react-native/types';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  user: AuthUser;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password: string }) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: {
    id: '',
    name: '',
    email: '',
    role: '',
    accessToken: '',
    refreshToken: '',
  },
  isLoggedIn: false,
  login: ({ email, password }) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  const register = () => {}; // TODO

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};
