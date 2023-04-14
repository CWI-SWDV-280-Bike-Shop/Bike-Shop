import React, { ReactNode, createContext, useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

type NewUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  role: string;
};

type AuthContextType = {
  AuthUser: AuthUser;
  login: (credentials: { email: string; password: string }) => void;
  isLoggedIn: boolean;

  NewUser: NewUser;
  register: (user: NewUser) => void;
  isRegistered: boolean;
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

  NewUser: {
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
  },
  isRegistered: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  register: (user) => {},
});

export default AuthContext;
