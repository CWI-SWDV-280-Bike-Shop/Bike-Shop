import { configureStore } from '@reduxjs/toolkit';
import BikeReducer from './store/bike.slice.js';
import AuthReducer from './store/auth.slice.js';

const reducer = {
  auth: AuthReducer,
  bikes: BikeReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
