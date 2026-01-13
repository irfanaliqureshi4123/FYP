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
        // Initialize with counsellor status from localStorage or default
        const storedUser = localStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : user;
        if (!userData.counsellorStatus) {
            userData.counsellorStatus = 'none'; // 'none', 'pending', 'approved', 'rejected'
        }
        if (!userData.mentorStatus) {
            userData.mentorStatus = 'none'; // 'none', 'pending', 'approved', 'rejected'
        }
        if (!userData.counsellorData) {
            userData.counsellorData = null; // Stores full counsellor registration data
        }
        // Set default role if not present
        if (!userData.userRole) {
            userData.userRole = 'student'; // 'student', 'career_counselor', 'mentor', 'admin'
        }
        setCurrentUser(userData);
    }, []);

    const login = (user) => {
        const userData = { ...user };
        if (!userData.counsellorStatus) userData.counsellorStatus = 'none';
        if (!userData.mentorStatus) userData.mentorStatus = 'none';
        if (!userData.counsellorData) userData.counsellorData = null;
        if (!userData.userRole) userData.userRole = 'student';
        setCurrentUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const updateCounsellorStatus = (status, counsellorData = null) => {
        const updatedUser = {
            ...currentUser,
            counsellorStatus: status, // 'pending', 'approved', 'rejected'
            counsellorData: counsellorData
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const setUserRole = (role) => {
        const updatedUser = {
            ...currentUser,
            userRole: role // 'student', 'career_counselor', 'mentor', 'admin'
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        currentUser,
        isAuthenticated,
        login,
        logout,
        updateCounsellorStatus,
        setUserRole,
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
