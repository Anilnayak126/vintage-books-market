
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import booksReducer from './booksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
  },
});
