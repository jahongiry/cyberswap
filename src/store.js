// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import offersReducer from './slices/offerSlice';
import cardsSlice from './slices/cardSlice';
import profileSlice from './slices/profileSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    offers: offersReducer,
    cards: cardsSlice,
    profiles: profileSlice,
    chat: chatReducer,
  },
});
