import io from 'socket.io-client';
import { store } from '../store';
import { addMessage } from './chatSlice';

let socket;

export const initializeSocket = () => {
  const token = localStorage.getItem('token');
  if (token) {
    socket = io('https://cyberswap.uz', {
      path: '/api/socket.io',
      query: { token: encodeURIComponent(token) },
      transports: ['websocket'],
    });
    socket.on('message', (newMessage) => {
      store.dispatch(addMessage(newMessage));
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
