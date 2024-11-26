import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/manage_c';

const getAuthToken = () => {
    return localStorage.getItem('accessToken');
};

// Async actions
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, { rejectWithValue }) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/cart/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, { dispatch, rejectWithValue }) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/cart/`, item, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(fetchCartItems());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (bookId, { rejectWithValue }) => {
    try {
        const token = getAuthToken();
        await axios.delete(`${API_URL}/cart/delete/`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { book_id: bookId },
        });
        return bookId;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const processPayment = createAsyncThunk('cart/processPayment', async (paymentData, { rejectWithValue }) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/cart/paypal-payment/`, paymentData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        paymentStatus: null,
    },
    reducers: {
        updateQuantity: (state, action) => {
            const { bookId, quantity } = action.payload;
            const item = state.items.find((item) => item.book.id === bookId);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearPaymentStatus: (state) => {
            state.paymentStatus = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingItem = state.items.find((item) => item.book.id === action.payload.book.id);
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
                state.status = 'succeeded';
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.book.id !== action.payload);
                state.status = 'succeeded';
            })
            .addCase(processPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'redirect';
                state.paymentUrl = action.payload.approval_url; 
            })
            .addCase(processPayment.rejected, (state) => {
                state.paymentStatus = 'failed';
            });
    },
});

export const { updateQuantity, clearPaymentStatus } = cartSlice.actions;
export default cartSlice.reducer;
