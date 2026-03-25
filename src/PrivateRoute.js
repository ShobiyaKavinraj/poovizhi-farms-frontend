import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // If token not found, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If token found, render the page
  return children;
}

export default PrivateRoute;
