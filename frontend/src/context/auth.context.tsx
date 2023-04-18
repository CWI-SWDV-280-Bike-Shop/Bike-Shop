import React, { ReactNode, createContext, useState, useEffect } from 'react';
import AuthAPI from '@api/auth.api';
import TokenAPI from '@api/token.api';
import AuthUser from '@/types/authUser.type';

type AuthContextType = {
  authUser: AuthUser | null;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  message: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: (credentials) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  message: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(null);

  // initialize authUser with localStorage if present
  // this will prevent the user from having to re-login every time they refresh the app
  useEffect(() => {
    const fetchLocalAuthUser = async () => {
      const localAuthUser = (await TokenAPI.getLocalAuthUser()) as AuthUser;
      if (localAuthUser) {
        setAuthUser(localAuthUser);
        setIsLoggedIn(true);
        setMessage('User fetched from localStorage');
      }
    };
    fetchLocalAuthUser();
  }, []);

  const login = ({ email, password }) => {
    AuthAPI.login({ email, password })
      .then((res) => {
        const user = res.data as AuthUser;
        setAuthUser(user);
        TokenAPI.setLocalAuthUser(user);
        setMessage('User logged in successfully!');
        setIsLoggedIn(true);
      })
      .catch((err) => setMessage('There was an error: \n' + err.message));
  };

  const logout = () => {
    setAuthUser(null);
    TokenAPI.removeLocalAuthUser();
    setIsLoggedIn(false);
    setMessage('User logged out');
  };

  return (
    <AuthContext.Provider
      value={{ authUser, isLoggedIn, login, logout, message }}
    >
      {children}
    </AuthContext.Provider>
  );
};
