import React, { ReactNode, createContext, useState } from 'react';
import AuthUser from '../types/authUser.type';

type AuthContextType = {
  AuthUser: AuthUser;
  login: (credentials: { email: string; password: string }) => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  AuthUser: {
    id: '',
    name: '',
    email: '',
    role: '',
    accessToken: '',
    refreshToken: '',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: (credentials) => {},
  isLoggedIn: false,
});

export default AuthContext;
