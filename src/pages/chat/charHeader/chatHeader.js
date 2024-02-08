import React from 'react';
import './chatHeader.css';
import test_image from '../../../img/halmet.png';

const ChatHeader = ({ username, lastSeen, userImage }) => {
  return (
    <div className='chat-header'>
      <div className='back-button'>
        <ion-icon name='arrow-back-outline'></ion-icon>
      </div>
      <div className='user-info'>
        <div className='username'>User name</div>
        <div className='last-seen'>Last seen recently</div>
      </div>
      <div className='user-image'>
        <img src={test_image} alt='user image' />
      </div>
    </div>
  );
};

export default ChatHeader;
