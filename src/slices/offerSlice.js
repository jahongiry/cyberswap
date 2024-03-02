import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
  offers: [],
  status: 'idle',
  error: null,
};

export const createPubgAccountOffer = createAsyncThunk(
  'offers/createPubgAccountOffer',
  async ({ images, ...data }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const formData = new FormData();

      images.forEach((image) => {
        formData.append('images', image);
      });

      if (data.royal_pass) {
        data.royal_pass.forEach((pass) => {
          formData.append('royal_pass', pass);
        });
      }

      if (data.skins) {
        data.skins.forEach((skin) => {
          formData.append('skins', skin);
        });
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'royal_pass' && key !== 'skins') {
          if (typeof value === 'boolean') {
            formData.append(key, value ? 'true' : 'false');
          } else {
            formData.append(key, value);
          }
        }
      });

      const response = await axios.post(
        '/profile/offers/pubg/account',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const createPubgUcOffer = createAsyncThunk(
  'offers/createPubgUcOffer',
  async ({ images, ...data }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const formData = new FormData();

      images.forEach((image) => {
        formData.append('images', image);
      });

      formData.append('cost', data.cost);
      formData.append('quantity', data.quantity);
      formData.append('available_time', data.available_time);
      formData.append('transfer_time', data.transfer_time);
      formData.append('description', data.description);

      const response = await axios.post('/profile/offers/pubg/uc', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPubgAccountOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPubgAccountOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers.push(action.payload);
      })
      .addCase(createPubgAccountOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPubgUcOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPubgUcOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers.push(action.payload);
      })
      .addCase(createPubgUcOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(buyOffer.pending, (state) => {})
      .addCase(buyOffer.fulfilled, (state, action) => {})
      .addCase(buyOffer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {} = offersSlice.actions;
export default offersSlice.reducer;
