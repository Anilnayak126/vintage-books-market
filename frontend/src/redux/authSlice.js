import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Set the initial state for the auth slice
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // Load user data from localStorage
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  loading: false,
  error: null,
};

// Redux slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user data in localStorage
      localStorage.setItem('accessToken', action.payload.access);
      localStorage.setItem('refreshToken', action.payload.refresh);
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    changePasswordFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators
export const {
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  registerFailure,
  changePasswordSuccess,
  changePasswordFailure,
} = authSlice.actions;

// Async actions (thunks)
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/userDetails/login/', credentials);
    dispatch(loginSuccess(response.data));
  } catch (err) {
    dispatch(loginFailure(err.response?.data?.message || 'Login failed.'));
    throw err;  // This will allow the error to be caught in the component
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    await axios.post('http://127.0.0.1:8000/userDetails/register/', userData);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(registerFailure(error.response.data.detail || 'Registration failed.'));
  }
};

export const changePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/userDetails/change-password/',
      {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    dispatch(changePasswordSuccess());
  } catch (error) {
    dispatch(changePasswordFailure(error.response.data.detail || 'Password change failed.'));
  }
};

export const logoutUser = () => (dispatch) => {
  axios
    .post('http://127.0.0.1:8000/userDetails/logout/', {
      refresh_token: localStorage.getItem('refreshToken'),
    })
    .then(() => {
      dispatch(logout());
    })
    .catch(() => {
      dispatch(logout());
    });
};

export default authSlice.reducer;
