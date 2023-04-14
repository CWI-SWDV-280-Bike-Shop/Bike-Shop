import React, { ReactNode, createContext, useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

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
