import { MAINURLSOCKET } from '../api/axios';
let socket = null;

export const establishConnection = (
  dispatch,
  chatId,
  connectWebSocket,
  disconnectWebSocket,
  webSocketError,
  messageReceived
) => {
  const token = localStorage.getItem('token');
  const socketUrl = token
    ? `ws://${MAINURLSOCKET}?token=${token}`
    : `ws://${MAINURLSOCKET}`;

  socket = new WebSocket(socketUrl);

  socket.onopen = () => dispatch(connectWebSocket());
  socket.onclose = () => dispatch(disconnectWebSocket());
  socket.onerror = (error) => dispatch(webSocketError(error.message));
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.chat_id === chatId) {
      dispatch(messageReceived(message));
    }
  };
};

export const closeConnection = () => {
  if (socket) {
    socket.close();
  }
};

export const sendMessage = (chatId, content) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const message = {
      type: 'action',
      action: 'send',
      metadata: {
        chat_id: chatId,
        content: content,
      },
    };
    socket.send(JSON.stringify(message));
  }
};
