import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../slices/authSlice';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = currentUser != null;

  if (!isLoggedIn) {
    localStorage.setItem('lastPath', location.pathname);
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
