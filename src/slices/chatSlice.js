import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { establishConnection, closeConnection } from './websocketManager';
import { act } from 'react-dom/test-utils';

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

export const establishWebSocketConnection = createAsyncThunk(
  'chat/establishWebSocketConnection',
  async (chatId, { dispatch }) => {
    establishConnection(
      dispatch,
      chatId,
      connectWebSocket,
      disconnectWebSocket,
      webSocketError,
      messageReceived
    );
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    connectWebSocket: (state) => {
      state.status = 'connected';
    },
    disconnectWebSocket: (state) => {
      state.status = 'disconnected';
    },
    webSocketError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    messageReceived: (state, action) => {
      const {
        metadata: { chat_id, message },
      } = action.payload;
      if (chat_id) {
        state.chats[chat_id].messages.push(message);
      }
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
        });
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectMessages = (state) => state.chat.messages;
export const selectConnectionStatus = (state) => state.chat.status;
export const {
  connectWebSocket,
  disconnectWebSocket,
  webSocketError,
  messageReceived,
} = chatSlice.actions;

export default chatSlice.reducer;
