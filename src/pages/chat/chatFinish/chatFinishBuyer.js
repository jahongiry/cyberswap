import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { finalizeOffer } from '../../../slices/chatSlice';
import './chatFinishSeller.css';

const ChatFinishBuyer = ({ onClose, offerId }) => {
  const dispatch = useDispatch();
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

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
      <h2 className='finish-header'>Savdoni tugatish</h2>
      <form onSubmit={handleSubmit}>
        <div className='checkbox-group'>
          <label>
            <input
              type='checkbox'
              name='checkbox1'
              checked={checkboxes.checkbox1}
              onChange={handleChange}
            />
            Mahsulotni to'liq qabul qilindi
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
            Hech qanday etirozim yo'q
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
            To'lovni sotuvchiga o'tkazish mumkin
          </label>
        </div>
        <button type='submit' className='submit-button'>
          Tugatish
        </button>
      </form>
    </div>
  );
};

export default ChatFinishBuyer;
