import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/auth.service';

const initialState = {};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const res = await AuthService.register({ name, email, password });
    return res.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const res = await AuthService.login({ email, password });
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(register.fulfilled, (state, action) => {
        return [...action.payload];
      });
  },
});

const { reducer } = AuthSlice;
export default reducer;
