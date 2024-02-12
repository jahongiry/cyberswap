import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

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
  async (chatId, { dispatch, getState }) => {
    const existingSocket = getState().chat.socket;
    if (existingSocket) {
      existingSocket.close();
    }
    const token = localStorage.getItem('token');
    // const socketUrl = token
    //   ? `wss://cyberswap.uz/api?token=${token}`
    //   : 'wss://cyberswap.uz/api';
    const socketUrl = `wss://cyberswap.uz/api?token=${token}`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => dispatch(connectWebSocket());
    socket.onclose = () => dispatch(disconnectWebSocket());
    socket.onerror = (error) => dispatch(webSocketError(error.message));
    socket.onmessage = (event) => {
      console.log('keldi');
      const message = JSON.parse(event.data);
      if (message.chat_id === chatId) {
        dispatch(messageReceived(message));
      }
    };
  }
);

const initialState = {
  socket: null,
  messages: [],
  status: 'disconnected', // 'connected', 'disconnected', 'error'
  error: null,
  chats: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    connectWebSocket: (state, action) => {
      state.status = 'connected';
      state.socket = action.payload;
    },
    disconnectWebSocket: (state) => {
      state.status = 'disconnected';
      state.socket = null;
    },
    webSocketError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    sendMessage: (state, action) => {
      if (state.socket) {
        state.socket.send(JSON.stringify(action.payload));
      }
    },
    messageReceived: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // ... other cases ...
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add a chats field to your state or decide how you want to store the chats
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // ... other cases ...
  },
});

// Selectors
export const selectMessages = (state) => state.chat.messages;
export const selectConnectionStatus = (state) => state.chat.status;

// Actions
export const {
  connectWebSocket,
  disconnectWebSocket,
  webSocketError,
  sendMessage,
  messageReceived,
} = chatSlice.actions;

export default chatSlice.reducer;
