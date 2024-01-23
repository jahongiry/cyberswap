import React, { useState } from 'react';
import './offers.css';

export default function Offers() {
  const tableData = [
    {
      id: 1,
      date: '2022-01-01',
      seller: 'Seller A',
      status: 'Active',
      cost: 100,
      view: 'View Details',
    },
    {
      id: 2,
      date: '2022-01-02',
      seller: 'Seller B',
      status: 'Sold',
      cost: 150,
      view: 'View Details',
    },
    // ... more rows
  ];

  const [selectedRows, setSelectedRows] = useState(new Set());

  return (
    <div className='main-offers-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Seller</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Action</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.date}</td>
              <td>{row.seller}</td>
              <td>{row.status}</td>
              <td>${row.cost}</td>
              <td>
                {/* Action buttons or links */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
              <td>
                <button>{row.view}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
