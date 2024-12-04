import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, allowedRoles }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user && allowedRoles.includes(user.role)) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
