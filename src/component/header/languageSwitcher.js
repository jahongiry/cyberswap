import React from 'react';
// import  from 'module'
import { useDispatch, useSelector } from 'react-redux';
import {
  switchLanguage,
  selectCurrentLanguage,
} from '../../slices/languageSlice';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);

  const toggleLanguage = () => {
    dispatch(switchLanguage());
  };

  return (
    <button onClick={toggleLanguage}>
      {currentLanguage === 'uz' ? 'Russian 🇷🇺' : 'Uzbek 🇺🇿'}
    </button>
  );
};

export default LanguageSwitcher;
