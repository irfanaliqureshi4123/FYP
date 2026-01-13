import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * RoleBasedRoute Component
 * Protects routes based on user role
 */
const RoleBasedRoute = ({ 
    element, 
    allowedRoles = ['student'],
    redirectTo = '/'
}) => {
    const { currentUser } = useAuth();
    const userRole = currentUser?.userRole || 'student';

    // Check if user role is allowed
    if (allowedRoles.includes(userRole)) {
        return element;
    }

    // Redirect if not allowed
    return <Navigate to={redirectTo} replace />;
};

export default RoleBasedRoute;
