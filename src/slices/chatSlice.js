import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { act } from 'react-dom/test-utils';
import io from 'socket.io-client';

const initialState = {
  socket: null,
  chats: {},
  status: 'disconnected',
  error: null,
};

export const fetchChats = createAsyncThunk(
  'profile/fetchChats',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No authorization token found');
      }

      const response = await axios.get('/profile/chats/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log(action.payload);
      const chatRoomID = action.payload.chatRoomID;
      //   if (!state.chats[chatRoomID]) {
      //     state.chats[chatRoomID] = { messages: [] };
      //   }
      state.chats[chatRoomID].messages.push(action.payload.content);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach((chat) => {
          state.chats[chat.id] = { ...chat, messages: chat.messages };
          console.log(state.chats[chat.id]);
        });
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectMessages = (state) => state.chat.messages;
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
