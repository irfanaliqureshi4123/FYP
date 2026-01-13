import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageCircle, Bell, Bookmark, User, Settings, Users, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';

/**
 * Sidebar Navigation Component
 * Left sidebar with navigation menu
 */
const Sidebar = forwardRef((props, ref) => {
    const { currentUser } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        toggle: () => setIsMobileOpen(prev => !prev),
        close: () => setIsMobileOpen(false),
    }));

    // Role-based navigation items
    const getNavItems = () => {
        const userRole = currentUser?.userRole || 'student';

        if (userRole === 'career_counselor') {
            // Career Counselor sees Home, Dashboard, and Settings
            return [
                { path: '/', icon: Home, label: 'Home' },
                { path: '/counselor/dashboard', icon: Users, label: 'Counselor Dashboard' },
                { path: '/settings', icon: Settings, label: 'Settings' },
            ];
        }

        if (userRole === 'mentor') {
            // Mentor sees Home, Dashboard, and Settings
            return [
                { path: '/', icon: Home, label: 'Home' },
                { path: '/mentor/dashboard', icon: Users, label: 'Mentor Dashboard' },
                { path: '/settings', icon: Settings, label: 'Settings' },
            ];
        }

        // Default student navigation
        return [
            { path: '/', icon: Home, label: 'Home' },
            { path: '/explore', icon: Compass, label: 'Explore' },
            { path: '/messages', icon: MessageCircle, label: 'Messages' },
            { path: '/notifications', icon: Bell, label: 'Notifications', badge: 2 },
            { path: '/saved', icon: Bookmark, label: 'Saved' },
            { path: `/profile/${currentUser?.username || 'sarahchen'}`, icon: User, label: 'Profile' },
            { path: '/settings', icon: Settings, label: 'Settings' },
        ];
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-72 bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 z-40
          overflow-y-auto scrollbar-thin
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Close Button - Top Right */}
                    <div className="lg:hidden flex justify-end p-4">
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="px-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            SmartCareer
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Build your future
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
                        <ul className="space-y-1 px-3">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                            }`
                                        }
                                    >
                                        <item.icon className="w-6 h-6" />
                                        <span className="flex-1">{item.label}</span>
                                        {item.badge && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Profile */}
                    {currentUser && (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <NavLink
                                to={`/profile/${currentUser.username}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" online />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                        {currentUser.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        @{currentUser.username}
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
