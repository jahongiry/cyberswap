import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  initializeSocket,
  disconnectSocket,
  getSocket,
} from '../../slices/Socket';
import { fetchChats } from '../../slices/chatSlice';
import ChatHeader from './charHeader/chatHeader';
import './chat.css';
import unread_tick from '../../img/checkmark-outline.svg';
import read_tick from '../../img/checkmark-done-outline.svg';
import moment from 'moment';
import hamburger from '../../img/icons/hamburger_icon.svg';
import ChatFinishBuyer from './chatFinish/chatFinishSeller';
import ChatFinishSeller from './chatFinish/chatFinishSeller';

const Chat = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const { selectedChatId, chatUsers } = location.state || {};
  const chats = useSelector((state) => state.chat.chats);
  const messages = chats[selectedChatId]?.messages || [];
  const user = useSelector((state) => state.auth.user);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedChatId || !chatUsers) {
      const storedSelectedChatId = localStorage.getItem('selectedChatId');
      const storedChatUsers = localStorage.getItem('chatUsers');

      if (storedSelectedChatId) {
        selectedChatId = JSON.parse(storedSelectedChatId);
      }
      if (storedChatUsers) {
        chatUsers = JSON.parse(storedChatUsers);
      }
    } else {
      localStorage.setItem('selectedChatId', JSON.stringify(selectedChatId));
      localStorage.setItem('chatUsers', JSON.stringify(chatUsers));
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const socket = getSocket();
    if (inputValue.trim() && socket) {
      socket.emit('message', { content: inputValue, chat_id: selectedChatId });
      setInputValue('');
    }
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

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const getMessageClass = (message) => {
    return message.content.length <= 20
      ? message.content.length <= 2
        ? 'single-message'
        : 'short-message'
      : 'long-message';
  };

  const randomId = Math.random().toString(36).substring(2, 15);

  return (
    <div className='chat-page-main'>
      <ChatHeader sender={chatUsers} />
      <div className='chat-container'>
        <div className='chat-messages'>
          {messages.map((message) => {
            const isSender = message.sender
              ? message.sender.id === user?.id
              : false;
            return (
              <div
                key={message.id}
                className={`bubble ${
                  isSender ? 'sender' : 'receiver'
                } ${getMessageClass(message)}`}
              >
                {message.content}
                <div className='message-details'>
                  <span className='message-time'>
                    {getMilitaryTime(message.created_at)}
                  </span>
                  <img src={unread_tick} alt='Unread' className='unread-tick' />
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
        {isPopupVisible && chats[selectedChatId]?.offer ? (
          chats[selectedChatId].offer.seller_id === user?.id ? (
            <ChatFinishSeller onClose={togglePopup} />
          ) : (
            <ChatFinishBuyer
              offerId={chats[selectedChatId].offer.id}
              onClose={togglePopup}
            />
          )
        ) : null}
        <form className='form-chat' onSubmit={handleSubmit}>
          <div className='hamburger-chat' onClick={togglePopup}>
            <img src={hamburger} alt='hamburger button' />
          </div>
          <div className='input-container'>
            <input
              name={`chat-text-${randomId}`}
              type='text'
              id={`chat-text-${randomId}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='send-button' onClick={handleSubmit}>
            <ion-icon name='arrow-up-circle-outline'></ion-icon>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
