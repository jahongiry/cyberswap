import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './chat.css';
import ChatHeader from './charHeader/chatHeader';
import {
  establishWebSocketConnection,
  selectMessages,
} from '../../slices/chatSlice';

import { sendMessage, closeConnection } from '../../slices/websocketManager';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedChatId } = location.state || {};

  useEffect(() => {
    if (selectedChatId) {
      dispatch(establishWebSocketConnection(selectedChatId));
    }

    return () => {
      closeConnection();
    };
  }, [dispatch, selectedChatId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      sendMessage({
        chat_id: selectedChatId,
        content: inputValue,
      });
      setInputValue('');
    }
  };

  const getMessageClass = (message) => {
    if (message.length <= 20) {
      if (message.length <= 1) {
        return 'single-message';
      }
      return 'short-message';
    }
    return 'long-message';
  };

  return (
    <div className='chat-page-main'>
      <ChatHeader />
      <div className='chat-container'>
        <div className='chat-messages'>
          <div className='sender-container'>
            {messages.map((message) =>
              message.isSender === 'sender' ? (
                <React.Fragment key={message.id}>
                  <div
                    key={message.id}
                    className={`bubble sender ${getMessageClass(message.text)}`}
                  >
                    {message.text}
                  </div>
                  <br />
                </React.Fragment>
              ) : null
            )}
          </div>
          <div className='receiver-container'>
            {messages.map((message) =>
              message.isSender === 'receiver' ? (
                <React.Fragment key={messages.indexOf(message)}>
                  <div
                    key={messages.indexOf(message)}
                    className={`bubble receiver ${getMessageClass(
                      message.text
                    )}`}
                  >
                    {message.text}
                  </div>
                  <br />
                </React.Fragment>
              ) : null
            )}
          </div>
        </div>
        <form className='form-chat' onSubmit={handleSubmit}>
          <div className='file-upload'>
            <ion-icon name='attach-outline'></ion-icon>
          </div>
          <div className='input-container'>
            <input
              type='text'
              id='username'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
