import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, Share2, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

/**
 * Notifications Page
 * Display all notifications with filtering
 */
const Notifications = () => {
    const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
    const [filter, setFilter] = useState('all');

    const getIcon = (type) => {
        switch (type) {
            case 'like': return <Heart className="w-5 h-5 text-red-500" />;
            case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
            case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
            case 'mention': return <AtSign className="w-5 h-5 text-purple-500" />;
            case 'share': return <Share2 className="w-5 h-5 text-primary-500" />;
            default: return null;
        }
    };

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => n.type === filter);

    const unreadCount = notifications.filter(n => !n.read).length;

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="ml-3 text-sm px-3 py-1 bg-primary-600 text-white rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </h1>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-gray-500" />
                    {['all', 'like', 'comment', 'follow', 'mention', 'share'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === type
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {filteredNotifications.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => markNotificationRead(notification.id)}
                                className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${!notification.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Avatar src={notification.avatar} alt={notification.username} size="md" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-shrink-0 mt-1">
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900 dark:text-white">
                                                <span className="font-semibold">{notification.username}</span>
                                                {' '}
                                                <span className="text-gray-600 dark:text-gray-400">{notification.action}</span>
                                            </p>
                                            {notification.content && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                    "{notification.content}"
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                {formatTimeAgo(notification.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {!notification.read && (
                                    <div className="flex-shrink-0">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full block"></span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No {filter !== 'all' ? filter : ''} notifications
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
