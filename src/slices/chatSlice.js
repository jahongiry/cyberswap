import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { establishConnection, closeConnection } from './websocketManager';

const initialState = {
  socket: null,
  messages: [],
  status: 'disconnected',
  error: null,
  chats: [],
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

// export const establishWebSocketConnection = createAsyncThunk(
//   'chat/establishWebSocketConnection',
//   async (chatId, { dispatch, getState }) => {
//     const existingSocket = getState().chat.socket;
//     if (existingSocket) {
//       existingSocket.close();
//     }
//     const token = localStorage.getItem('token');
//     const socketUrl = token
//       ? `ws://192.168.0.54:8000/api?token=${token}`
//       : 'ws://192.168.0.54:8000/api';
//     const socket = new WebSocket(socketUrl);

//     socket.onopen = () => dispatch(connectWebSocket(socket));
//     socket.onclose = () => dispatch(disconnectWebSocket());
//     socket.onerror = (error) => dispatch(webSocketError(error.message));
//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       if (message.chat_id === chatId) {
//         dispatch(messageReceived(message));
//       }
//     };
//   }
// );

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
      state.messages.push(action.payload);
    },
    // No need for sendMessage reducer anymore
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
export const {
  connectWebSocket,
  disconnectWebSocket,
  webSocketError,
  messageReceived,
} = chatSlice.actions;

export default chatSlice.reducer;
