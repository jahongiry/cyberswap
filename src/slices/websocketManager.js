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
    ? `wss://cyberswap.uz/api?token=${token}`
    : 'wss://cyberswap.uz/api';
  //  ? `ws://192.168.0.54:8000/api?token=${token}`
  // : 'ws://192.168.0.54:8000/api';

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

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};
