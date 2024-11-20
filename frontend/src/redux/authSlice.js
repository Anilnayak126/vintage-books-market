import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
  loading: false,
  error: null,
  successMessage: null,
};

// Helper function to refresh access token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/userDetails/token/refresh/', {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw new Error('Token refresh failed.');
  }
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
      localStorage.setItem('user', JSON.stringify(action.payload.user));
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
  
    editProfileSuccess: (state, action) => {
      state.user = action.payload.user || state.user;
      if (action.payload.access) {
        state.accessToken = action.payload.access;
        localStorage.setItem('accessToken', action.payload.access);
      }
      if (action.payload.refresh) {
        state.refreshToken = action.payload.refresh;
        localStorage.setItem('refreshToken', action.payload.refresh);
      }
      localStorage.setItem('user', JSON.stringify(state.user));
      state.loading = false;
      state.successMessage = 'Profile updated successfully!';
    },
    
    editProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Action creators
export const { loginSuccess, loginFailure, logout, registerSuccess, registerFailure, editProfileSuccess, editProfileFailure } = authSlice.actions;


export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ oldPassword, newPassword, confirmPassword }, { getState, rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = getState().auth;

      
      let token = accessToken;
      if (!accessToken) {
        token = await refreshAccessToken(refreshToken);
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/userDetails/change-password/',
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Password change failed.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Other async actions
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/userDetails/login/', credentials);
    dispatch(loginSuccess(response.data));
  } catch (err) {
    dispatch(loginFailure(err.response?.data?.message || 'Login failed.'));
    throw err;
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

// Logout action
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


export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = getState().auth;
      let token = accessToken;

      if (!token) {
        token = await refreshAccessToken(refreshToken);
        
        if (!token) {
          return rejectWithValue('Session expired. Please log in again.');
        }
      }

      const response = await axios.get('http://127.0.0.1:8000/userDetails/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { user, access, refresh } = response.data;

      if (access && refresh) {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
      }
      localStorage.setItem('user', JSON.stringify(user));

      return { user, access, refresh };
    } catch (error) {
      console.error('Profile Fetch Error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load profile.'
      );
    }
  }
);


// Edit Profile async thunk
export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = getState().auth;
      let token = accessToken;
      if (!accessToken) {
        token = await refreshAccessToken(refreshToken);
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.patch('http://127.0.0.1:8000/userDetails/edit-profile/', formData, config);
      // dispatch(fetchUserProfile());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Profile update failed.');
    }
  }
);



export default authSlice.reducer;
