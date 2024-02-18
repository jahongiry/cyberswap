import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './chat.css';
import ChatHeader from './charHeader/chatHeader';
import { fetchChats } from '../../slices/chatSlice';
import { selectCurrentUser } from '../../slices/authSlice';
import io from 'socket.io-client';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedChatId, chatUsers } = location.state || {};
  const chats = useSelector((state) => state.chat.chats);
  const messages = chats[selectedChatId]?.messages || [];
  const user = useSelector(selectCurrentUser);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const newSocket = io('https://cyberswap.uz', {
        path: '/api/socket.io',
        query: { token: encodeURIComponent(token) },
        transports: ['websocket'],
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [token]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      socket.emit('message', { content: inputValue, chat_id: selectedChatId });
      setInputValue('');
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        console.log(newMessage);
      });
    }
  }, [socket]);

  const getMessageClass = (message) => {
    if (message.content.length <= 20) {
      if (message.content.length <= 1) {
        return 'single-message';
      }
      return 'short-message';
    }
    return 'long-message';
  };

  return (
    <div className='chat-page-main'>
      <ChatHeader sender={chatUsers} />
      <div className='chat-container'>
        <div className='chat-messages'>
          {messages.map((message) => {
            const isSender = message.sender.id === user.id;
            const messageClass = getMessageClass(message);
            const bubbleClass = isSender ? 'sender' : 'receiver';

            return (
              <React.Fragment key={message.id}>
                <div className={`bubble ${bubbleClass} ${messageClass}`}>
                  {message.content}
                </div>
                <br />
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
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
