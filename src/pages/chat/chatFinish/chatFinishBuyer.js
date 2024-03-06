import React, { useState } from 'react';
import { finalizeOffer } from '../../../slices/chatSlice';
import './chatFinishSeller.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTranslations } from '../../../slices/languageSlice';
import { useNavigate } from 'react-router-dom';

const ChatFinishBuyer = ({ onClose, offerId }) => {
  const dispatch = useDispatch();
  const translations = useSelector(selectTranslations);
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allChecked = Object.values(checkboxes).every((checked) => checked);

    if (allChecked) {
      dispatch(finalizeOffer({ offer_id: offerId }))
        .unwrap()
        .then(() => {
          console.log('Offer finalized successfully');
          navigate('/chats');
          onClose();
        })
        .catch((error) => {
          console.error('Failed to finalize offer:', error);
        });
    } else {
      console.error('Not all checkboxes are checked.');
    }
  };

  return (
    <div className='popup-container'>
      <div className='popup-header'>
        <button className='close-button' onClick={onClose}>
          X
        </button>
      </div>
      <h2 className='finish-header'>
        {translations.finializeChat.buyerFinishHeader}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='checkbox-group'>
          <label>
            <input
              type='checkbox'
              name='checkbox1'
              checked={checkboxes.checkbox1}
              onChange={handleChange}
            />
            {translations.finializeChat.buyerFinishAccept}
          </label>
        </div>
        <div className='checkbox-group'>
          <label>
            <input
              type='checkbox'
              name='checkbox2'
              checked={checkboxes.checkbox2}
              onChange={handleChange}
            />
            {translations.finializeChat.buyerFinishNoComplain}
          </label>
        </div>
        <div className='checkbox-group'>
          <label>
            <input
              type='checkbox'
              name='checkbox3'
              checked={checkboxes.checkbox3}
              onChange={handleChange}
            />
            {translations.finializeChat.buyerFinishtransfer}
          </label>
        </div>
        <button type='submit' className='submit-button'>
          {translations.finializeChat.finishButton}
        </button>
      </form>
    </div>
  );
};

export default ChatFinishBuyer;
