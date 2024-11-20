
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import booksReducer from './booksSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
