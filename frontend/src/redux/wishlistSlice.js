import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/manage_c';

const getAuthToken = () => localStorage.getItem('accessToken');

// Fetch Wishlist Items with Pagination
export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/wishlist/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page }, 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch wishlist items');
    }
  }
);

// Add to Wishlist
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (bookId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_URL}/wishlist/`,
        { book: bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add to wishlist');
    }
  }
);

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (bookId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/wishlist/delete/`, {
        data: { book_id: bookId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return bookId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null,
  },
  reducers: {
    resetWishlist: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.totalCount = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.next = null;
      state.previous = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist Items
      .addCase(fetchWishlistItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        const { results, count, next, previous } = action.payload;
        state.items = results;
        state.totalCount = count;
        state.totalPages = Math.ceil(count / 5); 
        state.currentPage = next ? parseInt(new URL(next).searchParams.get('page')) : state.currentPage;
        state.next = next;
        state.previous = previous;
        state.status = 'succeeded';
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.bookdetails.id !== action.payload
        );
        state.status = 'succeeded';
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
