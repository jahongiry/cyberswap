import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const localStorageAdminToken = localStorage.getItem('admintoken');

  const isAdminIn = localStorageAdminToken != null;

  if (!isAdminIn) {
    return <Navigate to='/' />;
  }

  return children;
};

export default AdminProtectedRoute;
