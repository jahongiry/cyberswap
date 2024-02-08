import React from 'react';
import './chatHeader.css';
import test_image from '../../../img/halmet.png';
import { Link } from 'react-router-dom';

const ChatHeader = ({ username, lastSeen, userImage }) => {
  return (
    <div className='chat-header'>
      <Link to='../chatfront' className='back-button'>
        <ion-icon name='arrow-back-outline'></ion-icon>
      </Link>
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
