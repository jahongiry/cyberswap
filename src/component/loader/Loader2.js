import React from 'react';
import './loader2.css';

const Loader2 = () => {
  return (
    <div className='loader2'>
      <h1>Loading...</h1>
      <div className='loader2-container'>
        <div className='loading-box'></div>
        <div className='loading-box'></div>
        <div className='loading-box'></div>
        <div className='loading-box'></div>
        <div className='loading-box'></div>
      </div>
    </div>
  );
};

export default Loader2;
