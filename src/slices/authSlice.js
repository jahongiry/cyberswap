// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  token: null,
};

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkLogIn = createAsyncThunk(
  'auth/checkLogIn',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No token found, user not logged in');
      }
      const userResponse = await axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return userResponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const logOutUser = createAsyncThunk('auth/logOutUser', async () => {
  localStorage.removeItem('token');
  return 'Logged out successfully';
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ phone_number, password }, thunkAPI) => {
    try {
      const response = await axios.post('/registration', {
        phone_number,
        password,
      });

      if (response.data.access_token) {
        localStorage.setItem('verify_token', response.data.access_token);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyNumber = createAsyncThunk(
  'auth/verifyNumber',
  async (otp, thunkAPI) => {
    try {
      const verify_token = localStorage.getItem('verify_token');

      if (!verify_token) {
        throw new Error('No verification token found');
      }

      const response = await axios.post(
        '/registration/verify',
        { one_time_password: otp },
        { headers: { Authorization: `Bearer ${verify_token}` } }
      );

      localStorage.removeItem('verify_token');

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyNumber.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(checkLogIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkLogIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
        state.token = null;
      });
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const errorState = (state) => state.auth.error;
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
