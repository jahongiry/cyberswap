import { createSlice } from '@reduxjs/toolkit';
import uz from '../locales/uz.json';
import ru from '../locales/ru.json';

const getInitialLanguage = () => {
  const savedLang = localStorage.getItem('languagePreference');
  return savedLang || 'uz'; // Default to 'uz' if no preference is stored
};

const initialState = {
  currentLanguage: getInitialLanguage(),
  translations: getInitialLanguage() === 'uz' ? uz : ru,
};

const languages = { uz, ru };

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    switchLanguage: (state) => {
      const newLang = state.currentLanguage === 'uz' ? 'ru' : 'uz';
      state.currentLanguage = newLang;
      state.translations = languages[newLang];
      localStorage.setItem('languagePreference', newLang); // Save to localStorage
    },
  },
});

export const { switchLanguage } = languageSlice.actions;

export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectTranslations = (state) => state.language.translations;

export default languageSlice.reducer;
