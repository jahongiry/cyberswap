import React from 'react';
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
    <button className='language-btn' onClick={toggleLanguage}>
      <span className='desktop-lang__btn'>
        {currentLanguage === 'uz' ? 'Russian' : 'Uzbek'}
      </span>
      <span className='mobile-lang__btn'>
        {currentLanguage === 'uz' ? 'Ru 🇷🇺' : 'Uz 🇺🇿'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
