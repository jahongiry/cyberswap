import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const initialState = {
  profile: null,
  offers: [],
  status: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const response = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUsername = createAsyncThunk(
  'profile/updateUsername',
  async (newUsername, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }
      const response = await axios.put(
        '/profile/username',
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'profile/updatePassword',
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const response = await axios.put(
        '/profile/password',
        { old_password: oldPassword, new_password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async (imageFile, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const formData = new FormData();
      formData.append('image', imageFile); // Assuming 'image' is the field name expected by your backend

      const response = await axios.put('/profile/image', formData, {
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

export const fetchOffer = createAsyncThunk(
  'profile/fetchOffer',
  async (offerId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const response = await axios.get(`/profile/offers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        if (response.data.selling_offers) {
          return response.data.selling_offers;
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOffer = createAsyncThunk(
  'profile/deleteOffer',
  async (offerId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }
      await axios.delete(`/profile/offers/${offerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOffer = createAsyncThunk(
  'profile/updateOffer',
  async ({ offerId, offerData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }
      const response = await axios.put(
        `/profile/offers/${offerId}`,
        offerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOfferImages = createAsyncThunk(
  'profile/updateOfferImages',
  async ({ offerId, images }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const formData = new FormData();
      images.forEach((image) => formData.append('images', image));

      const response = await axios.put(
        `/profile/offers/${offerId}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // You can add reducers here if you have other actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUsername.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the username in the profile state
        if (state.profile) {
          state.profile.username = action.payload.username;
        }
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.profile) {
          state.profile.username = action.payload.username;
        }
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(updateProfileImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.profile) {
          state.profile.image = action.payload.image;
        }
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers = action.payload;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteOffer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offers = state.offers.filter(
          (offer) => offer.id !== action.payload
        );
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {} = profileSlice.actions;
export const getUserOffers = (state) => state.profiles.offers;
export default profileSlice.reducer;
