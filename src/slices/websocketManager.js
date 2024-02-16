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
    ? `wss://${MAINURLSOCKET}?token=${token}`
    : `wss://${MAINURLSOCKET}`;

  socket = new WebSocket(socketUrl);

  socket.onopen = () => dispatch(connectWebSocket());
  socket.onclose = () => dispatch(disconnectWebSocket());
  socket.onerror = (error) => dispatch(webSocketError(error.message));
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    dispatch(messageReceived(message));
  };
};

export const closeConnection = () => {
  if (socket) {
    socket.close();
  }
};

let messageQueue = [];

export const sendMessage = (chatId, content) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    if (messageQueue.length > 0) {
      messageQueue.forEach((msg) => socket.send(JSON.stringify(msg)));
      messageQueue = [];
    }

    const message = {
      type: 'action',
      action: 'send',
      metadata: {
        chat_id: chatId,
        content: content,
      },
    };
    socket.send(JSON.stringify(message));
  } else {
    messageQueue.push({
      type: 'action',
      action: 'send',
      metadata: {
        chat_id: chatId,
        content: content,
      },
    });
    console.log('Message queued');
  }
};
