import React, { useState, useEffect } from 'react';
import './chatFront.css';
import { fetchChats } from '../../../slices/chatSlice';
import test_image from '../../../img/halmet.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Chat from '../Chat';
import Loader from '../../../component/loader/Loader2';
import moment from 'moment';

const FrontChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chats, status, error } = useSelector((state) => state.chat);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const chatsObject = useSelector((state) => state.chat.chats);
  const chatsArray = Object.values(chatsObject);

  useEffect(() => {
    if (Object.keys(chats).length === 0) {
      dispatch(fetchChats());
    }
  }, [dispatch, chats]);

  const openChat = (chatId) => {
    const chat = chatsObject[chatId];
    navigate('/chat', {
      state: { selectedChatId: chatId, chatUsers: chat.users },
    });
  };

  const truncateUsername = (username) => {
    if (username.length > 15) {
      return username.substring(0, 15) + '...';
    }
    return username;
  };

  const truncateChatFront = (lastChat) => {
    if (lastChat.length > 20) {
      return lastChat.substring(0, 20) + '...';
    }
    return lastChat;
  };

  const getMilitaryTime = (dateString) => {
    if (!dateString) {
      return 'Invalid Date';
    }
    const date = moment(dateString);
    if (!date.isValid()) {
      return 'Invalid Date';
    }
    return date.format('HH:mm');
  };

  if (status === 'loading') {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='front-chat-container'>
      <header className='chat-header'>
        <Link to='/'>
          <button className='home-button'>
            <ion-icon name='home-outline'></ion-icon>
          </button>
        </Link>
        <Link to='/profile'>
          <button className='profile-button'>
            <ion-icon name='person-circle-outline'></ion-icon>
          </button>
        </Link>
      </header>

      <div className='chat-list'>

        {chatsArray.length === 0 ? (
          <h1 className='no-chat'>hozircha chat yaratilmagan</h1>
        ) :
        chatsArray.map((chat) => (
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
            <div className='user-name-chat-last'>
              <div>
                <div className='user-name'>
                  {truncateUsername(chat.users[0].username)}
                </div>
                {chat.messages.length > 0 && (
                  <p className='last-message'>
                    {truncateChatFront(
                      chat.messages[chat.messages.length - 1].content
                    )}
                  </p>
                )}
              </div>
              {chat.messages.length > 0 && (
                <p className='last-message-time'>
                  {getMilitaryTime(
                    chat.messages[chat.messages.length - 1].created_at
                  )}
                </p>
              )}
            </div>
            {chat.offer.offer_type === 'pubg_account' ? (
              <div className='offer-show'>
                <p>LVL: {chat.offer.level}</p>
                <p>UZS: {chat.offer.cost}</p>
              </div>
            ) : chat.offer.offer_type === 'pubg_uc' ? (
              <div className='offer-show'>
                <p>UC: {chat.offer.quantity}</p> <p>UZS: {chat.offer.cost}</p>
              </div>
            ) : null}
          </div>
        ))}

      </div>
      {selectedChatId && <Chat chatId={selectedChatId} />}
    </div>
  );
};

export default FrontChat;
