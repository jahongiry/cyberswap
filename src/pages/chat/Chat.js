import React from 'react';
import './chat.css';

const Chat = () => {
  const messages = [
    {
      id: 1,
      text: 'hiiifs',
      isSender: 'sender',
    },
    {
      id: 4,
      text: 'hiiifsfs safsfsf asfsfsaf asfsafsaf asfdsafsa',
      isSender: 'sender',
    },
    {
      id: 2,
      text: '222',
      isSender: 'sender',
    },
    {
      id: 3,
      text: '222hiiifsfs safsfsf asfsfsaf asfsafsaf asfdsafsa',
      isSender: 'receiver',
    },
    {
      id: 5,
      text: '222hiiifsfs safsfsf asfsfsaf asfsafsaf asfdsafsa',
      isSender: 'receiver',
    },
    {
      id: 7,
      text: '?',
      isSender: 'sender',
    },
    {
      id: 6,
      text: '222hiiifsfs safsfsf asfsfsaf asfsafsaf asfdsafsa',
      isSender: 'receiver',
    },
  ];

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
    <div className='chat-page'>
      <div className='chat-container'>
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
              <React.Fragment key={message.id}>
                <div
                  key={message.id}
                  className={`bubble receiver ${getMessageClass(message.text)}`}
                >
                  {message.text}
                </div>
                <br />
              </React.Fragment>
            ) : null
          )}
        </div>
        <form className='form'>
          <div className='file-upload'>
            <ion-icon name='attach-outline'></ion-icon>
          </div>
          <div className='input-container'>
            <input type='text' id='username' />
          </div>
          <div className='send-button'>
            <ion-icon name='arrow-up-circle-outline'></ion-icon>
          </div>
        </form>
      </div>
      <div className='bottom-container'>
        <button className='cancel'>
          <ion-icon name='close-outline'></ion-icon> Bekor qilish
        </button>
        <button className='finish'>
          <ion-icon name='checkmark-outline'></ion-icon> Tugatish
        </button>
      </div>
    </div>
  );
};

export default Chat;
