import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // For demo purposes, we'll use the first user as the logged-in user
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        // Simulate getting current user from localStorage or API
        const user = usersData[0]; // Sarah Chen as default user
        setCurrentUser(user);
    }, []);

    const login = (user) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const value = {
        currentUser,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
