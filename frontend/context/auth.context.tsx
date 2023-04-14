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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: ({ email, password }) => {},
});
