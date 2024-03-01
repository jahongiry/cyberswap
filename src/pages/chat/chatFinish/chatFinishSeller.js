import React, { useState } from 'react';
import './chatFinishSeller.css';
import { finalizeOffer } from '../../../slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTranslations } from '../../../slices/languageSlice';

const ChatFinishSeller = ({ onClose }) => {
  const translations = useSelector(selectTranslations);
  return (
    <div className='popup-container'>
      <div className='popup-header'>
        <button className='close-button' onClick={onClose}>
          X
        </button>
      </div>
      <h2 className='finish-header'>
        {translations.finializeChat.sellerFinishHeader}
      </h2>
      <p className='seller-rules'>
        {translations.finializeChat.sellerFinishpar1}
      </p>
      <p className='seller-rules'>
        {translations.finializeChat.sellerFinishpar2}
      </p>
    </div>
  );
};

export default ChatFinishSeller;
