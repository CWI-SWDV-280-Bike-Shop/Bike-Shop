import React, { ReactNode, createContext, useState, useEffect } from 'react';
import AuthAPI from '@api/auth.api';
import TokenAPI from '@api/token.api';
import { AuthUser, Credentials } from '@/types/data.types';

type AuthContextType = {
  authUser: AuthUser | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
  message: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  login: (credentials) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  logout: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  message: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [message, setMessage] = useState(null);

  // initialize authUser with localStorage if present
  // this will prevent the user from having to re-login every time they refresh the app
  useEffect(() => {
    const fetchLocalAuthUser = async () => {
      const localAuthUser = (await TokenAPI.getLocalAuthUser()) as AuthUser;
      if (localAuthUser) {
        setAuthUser(localAuthUser);
        setMessage('User fetched from localStorage');
      }
    };
    fetchLocalAuthUser();
  }, []);

  const login = ({ email, password }) => {
    AuthAPI.login({ email, password })
      .then((res) => {
        console.log(res.data);
        const user = res.data as AuthUser;
        setAuthUser(user);
        TokenAPI.setLocalAuthUser(user);
        setMessage('User logged in successfully!');
      })
      .catch((err) => setMessage(err.response?.data?.error ?? err.message));
  };

  const logout = () => {
    setAuthUser(null);
    TokenAPI.removeLocalAuthUser();
    setMessage('User logged out');
  };

  return (
    <AuthContext.Provider
      value={{ authUser, login, logout, message }}
    >
      {children}
    </AuthContext.Provider>
  );
};
