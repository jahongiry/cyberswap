import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { checkLogIn } from '../slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = currentUser != null;

  if (!isLoggedIn) {
    localStorage.setItem('lastPath', location.pathname);
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
