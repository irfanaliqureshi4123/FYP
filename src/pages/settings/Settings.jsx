import React, { useState } from 'react';
import { Bell, Lock, Palette, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

/**
 * Settings Page
 * User preferences and settings (Appearance, Notifications, Privacy & Security)
 * Profile settings have been moved to the EditProfile feature
 * Privacy Policy and Terms of Service are now full pages
 */
const Settings = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    // Notification Preferences State
    const [notifications, setNotifications] = useState({
        likes: true,
        comments: true,
        followers: true,
        mentions: true,
        messages: true,
    });

    // Password Change State
    const [passwordModal, setPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwordErrors, setPasswordErrors] = useState({});

    // Blocked Users State
    const [blockedModal, setBlockedModal] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState([
        { id: 1, name: 'John Doe', username: 'johndoe', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Jane Smith', username: 'janesmith', avatar: 'https://i.pravatar.cc/150?img=2' },
    ]);

    // Delete Account Modal
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState('');

    // Toast State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const notificationPreferences = [
        { key: 'likes', label: 'Likes and reactions', description: 'When someone likes your post' },
        { key: 'comments', label: 'Comments', description: 'When someone comments on your post' },
        { key: 'followers', label: 'New followers', description: 'When someone follows you' },
        { key: 'mentions', label: 'Mentions', description: 'When someone mentions you' },
        { key: 'messages', label: 'Messages', description: 'When you receive a new message' },
    ];

    // Notification Handlers
    const handleNotificationToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveNotifications = () => {
        console.log('Notifications saved:', notifications);
        setToastMessage('Notification preferences saved!');
        setToastType('success');
        setShowToast(true);
    };

    // Password Change Handlers
    const validatePasswordForm = () => {
        const errors = {};
        if (!passwordData.current.trim()) errors.current = 'Current password is required';
        if (!passwordData.new.trim()) errors.new = 'New password is required';
        if (passwordData.new.length < 8) errors.new = 'Password must be at least 8 characters';
        if (passwordData.new !== passwordData.confirm) errors.confirm = 'Passwords do not match';
        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        if (passwordErrors[name]) setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!validatePasswordForm()) return;

        console.log('Password changed');
        setToastMessage('Password changed successfully!');
        setToastType('success');
        setShowToast(true);
        setPasswordModal(false);
        setPasswordData({ current: '', new: '', confirm: '' });
    };

    // Blocked Users Handlers
    const handleUnblockUser = (userId) => {
        setBlockedUsers(prev => prev.filter(u => u.id !== userId));
        setToastMessage('User unblocked');
        setToastType('success');
        setShowToast(true);
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            {/* Appearance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <Palette className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors font-medium text-gray-900 dark:text-white"
                    >
                        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                    {notificationPreferences.map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications[item.key]}
                                    onChange={() => handleNotificationToggle(item.key)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    ))}
                </div>

                <Button
                    type="button"
                    onClick={handleSaveNotifications}
                    variant="primary"
                    fullWidth
                    className="mt-4"
                >
                    Save Notification Settings
                </Button>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy & Security</h2>
                </div>

                <div className="space-y-3">
                    <Button
                        variant="outline"
                        fullWidth
                        className="justify-start"
                        onClick={() => setPasswordModal(true)}
                    >
                        🔐 Change Password
                    </Button>
                    <Button
                        variant="outline"
                        fullWidth
                        className="justify-start"
                        onClick={() => setBlockedModal(true)}
                    >
                        👤 Manage Blocked Users ({blockedUsers.length})
                    </Button>
                    <Button
                        variant="outline"
                        fullWidth
                        className="justify-start"
                        onClick={() => navigate('/privacy-policy')}
                    >
                        📋 Privacy Policy
                    </Button>
                    <Button
                        variant="outline"
                        fullWidth
                        className="justify-start"
                        onClick={() => navigate('/terms-of-service')}
                    >
                        📄 Terms of Service
                    </Button>
                </div>
            </div>

            {/* Account Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h2 className="text-xl font-bold text-red-900 dark:text-red-300">Danger Zone</h2>
                </div>

                <Button
                    variant="outline"
                    fullWidth
                    className="justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                    onClick={() => setDeleteModal(true)}
                >
                    🗑️ Delete Account
                </Button>
            </div>

            {/* Blocked Users Modal */}
            <Modal
                isOpen={blockedModal}
                onClose={() => setBlockedModal(false)}
                title="Blocked Users"
            >
                {blockedUsers.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {blockedUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUnblockUser(user.id)}
                                    className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                    Unblock
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 dark:text-gray-400">You haven't blocked any users</p>
                    </div>
                )}
                <div className="mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={() => setBlockedModal(false)}
                    >
                        Close
                    </Button>
                </div>
            </Modal>

            {/* Password Change Modal */}
            <Modal
                isOpen={passwordModal}
                onClose={() => {
                    setPasswordModal(false);
                    setPasswordData({ current: '', new: '', confirm: '' });
                    setPasswordErrors({});
                }}
                title="Change Password"
            >
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                name="current"
                                value={passwordData.current}
                                onChange={handlePasswordChange}
                                placeholder="Enter current password"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {passwordErrors.current && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{passwordErrors.current}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="new"
                                value={passwordData.new}
                                onChange={handlePasswordChange}
                                placeholder="Enter new password (min. 8 characters)"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {passwordErrors.new && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{passwordErrors.new}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="confirm"
                                value={passwordData.confirm}
                                onChange={handlePasswordChange}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {passwordErrors.confirm && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{passwordErrors.confirm}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            onClick={() => {
                                setPasswordModal(false);
                                setPasswordData({ current: '', new: '', confirm: '' });
                                setPasswordErrors({});
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" fullWidth>
                            Change Password
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Account Modal */}
            <Modal
                isOpen={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                    setDeleteConfirm('');
                }}
                title="Delete Account"
            >
                <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <p className="text-sm text-red-900 dark:text-red-300 font-medium">
                            ⚠️ This action cannot be undone.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300">
                            Deleting your account will:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>Permanently remove all your profile data</li>
                            <li>Delete all your posts and achievements</li>
                            <li>Remove you from all groups and connections</li>
                            <li>Cancel any ongoing mentorship</li>
                            <li>Make your data irrecoverable</li>
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Type your username to confirm deletion:
                        </label>
                        <input
                            type="text"
                            value={deleteConfirm}
                            onChange={(e) => setDeleteConfirm(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            onClick={() => {
                                setDeleteModal(false);
                                setDeleteConfirm('');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            disabled={deleteConfirm !== 'sarahchen'} // Using default user from data
                            onClick={() => {
                                if (deleteConfirm === 'sarahchen') {
                                    console.log('Account deleted');
                                    setToastMessage('Account deleted successfully. Redirecting...');
                                    setToastType('success');
                                    setShowToast(true);
                                    setDeleteModal(false);
                                    setDeleteConfirm('');
                                    // In real app: setTimeout(() => navigate('/'), 2000);
                                }
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Settings;
