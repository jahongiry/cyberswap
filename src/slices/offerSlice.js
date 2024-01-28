import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
  offers: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const createOffer = createAsyncThunk(
  'offers/createOffer',
  async ({ data, images }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post('/offers', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    // You can add reducers here if you have other actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming the API returns the created offer
        state.offers.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // Add other cases for other async thunks if needed
  },
});

export const {} = offersSlice.actions;
export default offersSlice.reducer;
