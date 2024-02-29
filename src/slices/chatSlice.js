import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { act } from 'react-dom/test-utils';
import moment from 'moment';

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
      const chatRoomID = action.payload.chatRoomID;
      if (!state.chats[chatRoomID]) {
        state.chats[chatRoomID] = { messages: [] };
      }
      if (!action.payload.messages || action.payload.messages.length > 0) {
        state.chats[chatRoomID].messages.push(action.payload.content);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        const savedLang = localStorage.getItem('languagePreference');
        const rules_uz = 'Assalomu alekum, CyberSwap qoidalari:';
        const rules_ru = 'Привет, правила CyberSwap:';
        state.status = 'succeeded';
        action.payload.forEach((chat) => {
          const messageContent =
            savedLang === 'uz'
              ? rules_uz
              : savedLang === 'ru'
              ? rules_ru
              : rules_uz;

          const helloWorldMessage = {
            id: `hello-world-static-${chat.id}`,
            content: messageContent,
            sender: 'admin',
            created_at: moment().toISOString(),
          };

          const hasHelloWorldMessage = state.chats[chat.id]?.messages.some(
            (message) => message.id === helloWorldMessage.id
          );

          if (!hasHelloWorldMessage) {
            if (!state.chats[chat.id]) {
              state.chats[chat.id] = { ...chat, messages: [helloWorldMessage] };
            } else {
              state.chats[chat.id].messages = [
                helloWorldMessage,
                ...state.chats[chat.id].messages,
              ];
            }
          } else {
            if (!state.chats[chat.id]) {
              state.chats[chat.id] = { ...chat, messages: chat.messages };
            }
          }
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
