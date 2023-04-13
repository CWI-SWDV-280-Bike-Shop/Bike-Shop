import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/auth.service';

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  role: '',
  accessToken: '',
  refreshToken: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const res = await AuthService.login({ email, password });
    return res.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({
    name,
    email,
    password,
    phone,
    address,
    role,
  }: {
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
  }) => {
    const res = await AuthService.register({
      name,
      email,
      password,
      phone,
      address,
      role,
    });
    return res.data;
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      AuthService.logout();
      state = initialState;
      // TODO
      // navigate to Home or Login screen upon logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        return { ...action.payload };
      })
      .addCase(register.fulfilled, (state, action) => {
        return { ...action.payload };
      });
  },
});

const { reducer } = AuthSlice;
export default reducer;
