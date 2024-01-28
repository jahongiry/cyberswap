// EditUsernamePopup.js
import React, { useState } from 'react';
import './popupName.css';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector } from 'react-redux';

const EditUsernamePopup = ({ currentUsername, onClose, onSubmit }) => {
  const [newUsername, setNewUsername] = useState(currentUsername);
  const translations = useSelector(selectTranslations);
  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(newUsername);
    onClose();
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-content'>
        <button className='close-popup' onClick={onClose}>
          X
        </button>
        <h2>{translations.popup_profile.edit_username}</h2>
        <input
          type='text'
          value={newUsername}
          onChange={handleUsernameChange}
        />
        <button onClick={handleSubmit}>
          {translations.popup_profile.change_username}
        </button>
      </div>
    </div>
  );
};

export default EditUsernamePopup;
