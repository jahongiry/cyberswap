// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/login', credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkLogIn = createAsyncThunk(
  'auth/checkLogIn',
  async (thunkAPI) => {
    try {
      const userResponse = await axios.get('/me');
      return userResponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, thunkAPI) => {
    try {
      await axios.post('/logout');
      thunkAPI.dispatch(logOut());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ number, password }, thunkAPI) => {
    try {
      const response = await axios.post('/registration', {
        number,
        password,
      });
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
      const response = await axios.post('/registration/verify', {
        ot_password: otp,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      // Handle the fulfilled state of checkLogIn
      .addCase(checkLogIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
    // Add other cases for pending and rejected states if needed
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
