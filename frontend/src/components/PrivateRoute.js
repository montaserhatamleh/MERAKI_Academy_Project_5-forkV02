import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role: requiredRole }) => {

    const token = useSelector((state) => state.auth.token);
  
    const role = useSelector((state) => state.auth.role);
  
  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (!(requiredRole && requiredRole.includes(role)) ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
