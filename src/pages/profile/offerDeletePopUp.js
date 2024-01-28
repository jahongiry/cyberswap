import React, { useState, useEffect } from 'react';
import './offerDeletePopUp.css';
import { selectTranslations } from '../../slices/languageSlice';
import { useSelector } from 'react-redux';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  const translations = useSelector(selectTranslations);
  if (!isOpen) return null;
  return (
    <div className='popup-overlay-del'>
      <div className='popup-content-del'>
        <button className='close-popup-del' onClick={onClose}>
          X
        </button>
        <h2>{translations.popup_delete.are_you_sure}</h2>
        <div className='popup-buttons-del'>
          <button className='delete-button-del' onClick={onConfirm}>
            {translations.popup_delete.yes}
          </button>
          <button className='cancel-button-del' onClick={onClose}>
            {translations.popup_delete.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
