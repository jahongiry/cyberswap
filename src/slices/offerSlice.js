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

      let response = await axios.post('profile/offers', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const offerId = response.data.id;

      if (offerId && images.length > 0) {
        const formData = new FormData();

        images.forEach((image) => {
          formData.append('images', image);
        });

        response = await axios.post(
          `profile/offers/images/${offerId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const buyOffer = createAsyncThunk(
  'offers/buyOffer',
  async (offerId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const params = new URLSearchParams({ offer_id: offerId }).toString();

      const response = await axios.post(
        `/offers/buy/?${params}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    // Reducers for other actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle buyOffer thunk
      .addCase(buyOffer.pending, (state) => {
        // Handle pending state
      })
      .addCase(buyOffer.fulfilled, (state, action) => {
        // Handle successful buy offer
        // Update state as necessary
      })
      .addCase(buyOffer.rejected, (state, action) => {
        // Handle failed buy offer
        state.error = action.payload;
      });
    // Add other cases for other async thunks if needed
  },
});

export const {} = offersSlice.actions;
export default offersSlice.reducer;
