import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../slices/authSlice';
import { checkLogIn } from '../slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector(selectCurrentUser);
  const localStorageToken = localStorage.getItem('token');

  useEffect(() => {
    if (!token && localStorageToken) {
      dispatch(checkLogIn(localStorageToken));
    }
  }, [dispatch, token, localStorageToken]);

  const isLoggedIn = currentUser != null || localStorageToken != null;

  if (!isLoggedIn) {
    localStorage.setItem('lastPath', location.pathname);
    return <Navigate to='/signup' />;
  }

  return children;
};

export default ProtectedRoute;
