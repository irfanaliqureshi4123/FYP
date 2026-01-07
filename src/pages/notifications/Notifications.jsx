import React, { useState, useMemo } from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, Share2, Filter, Trash2, Eye, Reply, Check, CheckCheck, X, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';

/**
 * Notifications Page
 * Complete notification management with filtering, grouping, and actions
 */
const Notifications = () => {
    const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
    const [filter, setFilter] = useState('all');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [deletedNotifications, setDeletedNotifications] = useState(new Set());

    const getIcon = (type) => {
        switch (type) {
            case 'like': return <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
            case 'comment': return <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
            case 'follow': return <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
            case 'mention': return <AtSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
            case 'share': return <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />;
            default: return null;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'like': return 'bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500';
            case 'comment': return 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500';
            case 'follow': return 'bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500';
            case 'mention': return 'bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500';
            case 'share': return 'bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-500';
            default: return '';
        }
    };

    const getActionLabel = (type) => {
        switch (type) {
            case 'like': return 'View Post';
            case 'comment': return 'View Comment';
            case 'follow': return 'View Profile';
            case 'mention': return 'View Post';
            case 'share': return 'View Post';
            default: return 'View';
        }
    };

    const filteredNotifications = useMemo(() => {
        let filtered = filter === 'all'
            ? notifications
            : notifications.filter(n => n.type === filter);
        
        return filtered.filter(n => !deletedNotifications.has(n.id));
    }, [notifications, filter, deletedNotifications]);

    // Group notifications by date
    const groupedNotifications = useMemo(() => {
        const groups = {
            today: [],
            yesterday: [],
            week: [],
            older: []
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        filteredNotifications.forEach(notification => {
            const notifDate = new Date(notification.timestamp);
            const notifDay = new Date(notifDate.getFullYear(), notifDate.getMonth(), notifDate.getDate());

            if (notifDay.getTime() === today.getTime()) {
                groups.today.push(notification);
            } else if (notifDay.getTime() === yesterday.getTime()) {
                groups.yesterday.push(notification);
            } else if (notifDay.getTime() >= weekAgo.getTime()) {
                groups.week.push(notification);
            } else {
                groups.older.push(notification);
            }
        });

        return groups;
    }, [filteredNotifications]);

    const unreadCount = notifications.filter(n => !n.read && !deletedNotifications.has(n.id)).length;

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const notifDate = new Date(timestamp);
        const diffInHours = Math.floor((now - notifDate) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return notifDate.toLocaleDateString();
    };

    const handleDeleteNotification = (id) => {
        setDeletedNotifications(prev => new Set([...prev, id]));
        setToastMessage('Notification deleted');
        setToastType('success');
        setTimeout(() => setToastMessage(''), 2000);
    };

    const handleNotificationAction = (type) => {
        setToastMessage(`Opening ${getActionLabel(type).toLowerCase()}...`);
        setToastType('info');
        setTimeout(() => setToastMessage(''), 2000);
    };

    const renderNotificationGroup = (label, notifs) => {
        if (notifs.length === 0) return null;

        return (
            <div key={label}>
                <div className="px-3 sm:px-6 py-2 sm:py-3 bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        {label}
                    </p>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifs.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-start gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                                !notification.read ? `${getNotificationColor(notification.type)}` : ''
                            }`}
                        >
                            <Avatar 
                                src={notification.avatar} 
                                alt={notification.username} 
                                size="sm" 
                                className="flex-shrink-0 mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2">
                                    <div className="flex-shrink-0 mt-0.5 p-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                                            <span className="font-semibold">{notification.username}</span>
                                            {' '}
                                            <span className="text-gray-600 dark:text-gray-400">{notification.action}</span>
                                        </p>
                                        {notification.content && (
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                "{notification.content}"
                                            </p>
                                        )}
                                        <div className="flex items-center gap-1 sm:gap-2 mt-2">
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                {formatTimeAgo(notification.timestamp)}
                                            </p>
                                            {!notification.read && (
                                                <span className="inline-flex items-center gap-0.5 text-xs font-medium text-primary-600 dark:text-primary-400">
                                                    <Check className="w-3 h-3" />
                                                    New
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
                                <button
                                    onClick={() => {
                                        markNotificationRead(notification.id);
                                        handleNotificationAction(notification.type);
                                    }}
                                    className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded transition-colors"
                                    title={getActionLabel(notification.type)}
                                >
                                    <Eye className="w-3 h-3" />
                                    <span className="hidden md:inline">{getActionLabel(notification.type)}</span>
                                </button>
                                {notification.type === 'follow' && (
                                    <button
                                        className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                        title="Follow back"
                                    >
                                        <UserPlus className="w-3 h-3" />
                                        <span className="hidden md:inline">Follow</span>
                                    </button>
                                )}
                                {notification.type === 'comment' && (
                                    <button
                                        className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                        title="Reply"
                                    >
                                        <Reply className="w-3 h-3" />
                                        <span className="hidden md:inline">Reply</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    className="p-1 sm:p-1.5 text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
                                    title="Delete notification"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {!notification.read && (
                                    <button
                                        onClick={() => markNotificationRead(notification.id)}
                                        className="p-1 sm:p-1.5 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded transition-colors flex-shrink-0"
                                        title="Mark as read"
                                    >
                                        <CheckCheck className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {toastMessage && (
                <Toast 
                    message={toastMessage} 
                    type={toastType}
                    onClose={() => setToastMessage('')}
                />
            )}

            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-2 sm:ml-3 inline-flex items-center text-xs sm:text-sm px-2 sm:px-3 py-1 bg-primary-600 text-white rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </h1>
                    {unreadCount > 0 && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={markAllNotificationsRead}
                            className="w-full sm:w-auto"
                        >
                            <Check className="w-4 h-4 mr-1" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {['all', 'like', 'comment', 'follow', 'mention', 'share'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                                filter === type
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications List */}
            {filteredNotifications.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {groupedNotifications.today.length > 0 && renderNotificationGroup('Today', groupedNotifications.today)}
                    {groupedNotifications.yesterday.length > 0 && renderNotificationGroup('Yesterday', groupedNotifications.yesterday)}
                    {groupedNotifications.week.length > 0 && renderNotificationGroup('This Week', groupedNotifications.week)}
                    {groupedNotifications.older.length > 0 && renderNotificationGroup('Older', groupedNotifications.older)}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 text-center">
                    <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No notifications
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        {filter !== 'all' 
                            ? `No ${filter} notifications at the moment`
                            : `You're all caught up! Check back later for updates.`
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default Notifications;
