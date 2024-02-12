import React, { useState, useEffect } from 'react';
import './chatFront.css';
import { fetchChats } from '../../../slices/chatSlice';
import test_image from '../../../img/halmet.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chat from '../Chat';

const FrontChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chats, status, error } = useSelector((state) => state.chat);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const openChat = (chatId) => {
    navigate('/chat', { state: { selectedChatId: chatId } });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

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
          <div
            key={chat.id}
            className='chat-info'
            onClick={() => openChat(chat.id)}
          >
            <img
              src={chat.users[0].image}
              alt={chat.users[0].username}
              className='user-image'
            />
            <div className='user-name'>{chat.users[0].username}</div>
          </div>
        ))}
      </div>
      {selectedChatId && <Chat chatId={selectedChatId} />}
    </div>
  );
};

export default FrontChat;
