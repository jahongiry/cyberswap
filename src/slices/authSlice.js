// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk for signing up
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/signup', userData); // Replace '/signup' with your endpoint
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logging in
export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/login', credentials); // Replace '/login' with your endpoint
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
      await axios.post('/logout'); // Replace '/logout' with your endpoint
      thunkAPI.dispatch(logOut()); // Dispatch the logOut action to update state
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
      .addCase(signUp.fulfilled, (state, action) => {
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
