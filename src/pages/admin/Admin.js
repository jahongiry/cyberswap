import React, { useState } from 'react';
import './admin.css';
import Offers from './offers/offers';

export default function Admin() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [showSellerInput, setShowSellerInput] = useState(false);
  const [seller, setSeller] = useState('');

  const [status, setStatus] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // Implement logic to filter data based on the status
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Implement logic to filter data based on the date
  };

  const handleSellerChange = (e) => {
    setSeller(e.target.value);
    // Implement logic to filter data based on the seller
  };

  return (
    <div className='admin-page'>
      <div className='admin-container'>
        <div className='admin-nav'>
          <a href='/admin/users' className='nav-link'>
            Offers
          </a>
          <a href='/admin/users' className='nav-link'>
            Users
          </a>
          <a href='/admin/sellers' className='nav-link'>
            Sellers
          </a>
          <a href='/admin/users' className='nav-link'>
            Chats
          </a>
          <a href='/admin/users' className='nav-link'>
            Admins
          </a>
        </div>
        <div className='admin-content'>
          <div className='admin-header'>
            <div>
              <input
                type='text'
                className='search-input'
                placeholder='Search...'
              />
              <button className='search-submit'>search</button>
            </div>
            <div className='filter-container-main'>
              <h3 className='filter-title'>Filter: </h3>
              <div className='date-picker-container'>
                <button
                  className='filter-button'
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  by Date
                </button>
                {showDatePicker && (
                  <input
                    type='date'
                    className='date-input'
                    onChange={handleDateChange}
                  />
                )}
              </div>
              <div className='filter-container'>
                <button
                  className='filter-button'
                  onClick={() => setShowSellerInput(!showSellerInput)}
                >
                  by Seller
                </button>
                {showSellerInput && (
                  <input
                    type='text'
                    className='filter-input'
                    placeholder='Enter seller username'
                    onChange={handleSellerChange}
                  />
                )}
              </div>
              <div>
                <select
                  className='status-dropdown'
                  onChange={handleStatusChange}
                  value={status}
                >
                  <option value=''>by Status</option>
                  <option value='active'>Active</option>
                  <option value='selling'>Selling</option>
                  <option value='sold'>Sold</option>
                </select>
              </div>
            </div>
            <button className='filter-button'>Select</button>
          </div>
          <Offers />
        </div>
      </div>
    </div>
  );
}
