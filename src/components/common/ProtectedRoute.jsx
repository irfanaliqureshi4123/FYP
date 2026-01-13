import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute Component
 * Provides role-based access control for admin routes
 * Only allows users with admin role to access protected pages
 * Redirects unauthorized users to home page
 */
function ProtectedRoute({ children, requiredRole = 'admin' }) {
  const { currentUser, isAuthenticated } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if user has required role (use userRole instead of role)
  if (currentUser?.userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role
  return children;
}

export default ProtectedRoute;
