import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Moon, Sun, Settings, LogOut, User, Menu, Compass, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Avatar from '../common/Avatar';

/**
 * Navbar Component
 * Top navigation bar with search, notifications, and user menu
 */
const Navbar = ({ sidebarRef }) => {
    const { theme, toggleTheme } = useTheme();
    const { currentUser, logout } = useAuth();
    const { notifications } = useApp();
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-full px-2 sm:px-6">
                <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
                    {/* Logo - Hidden on small mobile, visible on sm+ */}
                    <div className="hidden sm:block">
                        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            SC
                        </h1>
                    </div>

                    {/* Search Bar - Responsive for all devices */}
                    <div className="flex flex-1 max-w-xs sm:max-w-xl lg:max-w-2xl mx-1 sm:mx-4 lg:mx-8">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-xs sm:text-sm md:text-base cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                            />
                        </form>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => sidebarRef?.current?.toggle()}
                            className="p-2 lg:hidden text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="Toggle menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Mobile Roadmap Button - Visible only on mobile */}
                        <Link
                            to="/roadmaps"
                            className="p-2 lg:hidden text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="Learning Roadmap"
                        >
                            <Compass className="w-5 h-5" />
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="Toggle theme"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        {/* Notifications */}
                        <Link
                            to="/notifications"
                            className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </Link>

                        {/* Profile Menu */}
                        {currentUser && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                                </button>

                                {/* Dropdown */}
                                {isProfileMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                                            <Link
                                                to={`/profile/${currentUser.username}`}
                                                onClick={() => setIsProfileMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <User className="w-5 h-5" />
                                                <span>Profile</span>
                                            </Link>
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <Settings className="w-5 h-5" />
                                                <span>Settings</span>
                                            </Link>
                                            <Link
                                                to="/admin/dashboard"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <Shield className="w-5 h-5 text-blue-600" />
                                                <span>Admin Panel</span>
                                            </Link>
                                            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileMenuOpen(false);
                                                    navigate('/login');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
