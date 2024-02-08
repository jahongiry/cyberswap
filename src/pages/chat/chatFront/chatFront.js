import React from 'react';
import './chatFront.css';
import test_image from '../../../img/halmet.png';

const chats = [
  {
    id: 1,
    userImage: 'image',
    userName: 'Jahongir Yusupov',
  },
];

const FrontChat = () => {
  return (
    <div className='front-chat-container'>
      <header className='chat-header'>
        <button className='home-button'>
          <ion-icon name='home-outline'></ion-icon>
        </button>
        <button className='profile-button'>
          <ion-icon name='person-circle-outline'></ion-icon>
        </button>
      </header>
      <div className='chat-list'>
        {chats.map((chat) => (
          <div key={chat.id} className='chat-info'>
            <img src={test_image} alt={chat.userName} className='user-image' />
            <div className='user-name'>{chat.userName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontChat;
