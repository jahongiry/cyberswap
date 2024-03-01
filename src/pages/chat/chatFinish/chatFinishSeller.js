import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { finalizeOffer } from '../../../slices/chatSlice';
import './chatFinishSeller.css';

const ChatFinishSeller = ({ onClose }) => {
  return (
    <div className='popup-container'>
      <div className='popup-header'>
        <button className='close-button' onClick={onClose}>
          X
        </button>
      </div>
      <h2 className='finish-header'>Savdoni tugatish</h2>
      <p className='seller-rules'>
        Mahsulot sotib oluvchiga o'tkazilgandan so'ng savdo tugatiladi va sizga
        pul mablagi tushadi
      </p>
      <p className='seller-rules'>
        Savollar uchun @jahongiryusupov94 ga telegramda yozing
      </p>
    </div>
  );
};

export default ChatFinishSeller;
