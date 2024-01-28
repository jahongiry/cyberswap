// EditPasswordPopup.js
import React, { useState } from 'react';
import './popupPassword.css';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector } from 'react-redux';

const EditPasswordPopup = ({ onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const translations = useSelector(selectTranslations);

  const handleSubmit = () => {
    onSubmit({ oldPassword, newPassword });
    onClose();
  };

  return (
    <div className='popup-overlay-password'>
      <div className='popup-content'>
        <button className='close-popup' onClick={onClose}>
          X
        </button>
        <h2>{translations.popup_profile.edit_password}</h2>
        <input
          placeholder={translations.popup_profile.old_password}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          placeholder={translations.popup_profile.new_password}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {translations.popup_profile.change_password}
        </button>
      </div>
    </div>
  );
};

export default EditPasswordPopup;
