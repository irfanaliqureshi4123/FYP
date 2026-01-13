import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Download,
  UserPlus,
  Heart,
  MessageSquare,
  Share2,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';

/**
 * AdminActivityLogs Component
 * Tracks and displays all system activities for audit and monitoring
 * Features: Search, filter by activity type, export, timestamps
 */
function AdminActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Mock activity logs
  const allActivities = [
    {
      id: 1,
      type: 'user_registration',
      user: 'John Doe',
      action: 'User Registration',
      description: 'New user john_doe joined the platform',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      ipAddress: '192.168.1.1',
    },
    {
      id: 2,
      type: 'post_created',
      user: 'Sarah Chen',
      action: 'Post Created',
      description: 'Created a new post about career tips',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      ipAddress: '192.168.1.2',
    },
    {
      id: 3,
      type: 'application_submitted',
      user: 'Mike Johnson',
      action: 'Application Submitted',
      description: 'Submitted counsellor registration application',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      ipAddress: '192.168.1.3',
    },
    {
      id: 4,
      type: 'profile_updated',
      user: 'Emma Wilson',
      action: 'Profile Updated',
      description: 'Updated profile information and avatar',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      ipAddress: '192.168.1.4',
    },
    {
      id: 5,
      type: 'login',
      user: 'Alex Kumar',
      action: 'User Login',
      description: 'User successfully logged in',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      ipAddress: '192.168.1.5',
    },
    {
      id: 6,
      type: 'post_liked',
      user: 'Lisa Zhang',
      action: 'Post Interaction',
      description: 'Liked a post from John Doe',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      ipAddress: '192.168.1.6',
    },
    {
      id: 7,
      type: 'message_sent',
      user: 'David Brown',
      action: 'Message Sent',
      description: 'Sent a message to Sarah Chen',
      timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
      ipAddress: '192.168.1.7',
    },
    {
      id: 8,
      type: 'settings_changed',
      user: 'Rachel Green',
      action: 'Settings Changed',
      description: 'Updated privacy settings',
      timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
      ipAddress: '192.168.1.8',
    },
    {
      id: 9,
      type: 'booking_created',
      user: 'Tom Anderson',
      action: 'Booking Created',
      description: 'Booked a counselling session',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      ipAddress: '192.168.1.9',
    },
    {
      id: 10,
      type: 'logout',
      user: 'Nina Patel',
      action: 'User Logout',
      description: 'User successfully logged out',
      timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
      ipAddress: '192.168.1.10',
    },
  ];

  // Filter and search activities
  const filteredActivities = useMemo(() => {
    let result = allActivities;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (activity) =>
          activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter((activity) => activity.type === filterType);
    }

    // Date range filter
    if (dateRange === 'today') {
      const today = new Date();
      result = result.filter((activity) => {
        const actDate = new Date(activity.timestamp);
        return actDate.toDateString() === today.toDateString();
      });
    } else if (dateRange === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      result = result.filter((activity) => new Date(activity.timestamp) > weekAgo);
    }

    return result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [searchTerm, filterType, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
      case 'login':
      case 'logout':
        return UserPlus;
      case 'post_created':
      case 'post_liked':
        return Heart;
      case 'message_sent':
        return MessageSquare;
      case 'post_shared':
        return Share2;
      case 'settings_changed':
        return Settings;
      case 'application_submitted':
        return Lock;
      default:
        return Filter;
    }
  };

  // Get activity color
  const getActivityColor = (type) => {
    const colorMap = {
      user_registration: 'green',
      login: 'blue',
      logout: 'slate',
      post_created: 'purple',
      post_liked: 'red',
      message_sent: 'blue',
      post_shared: 'orange',
      settings_changed: 'indigo',
      application_submitted: 'yellow',
      booking_created: 'cyan',
    };
    return colorMap[type] || 'slate';
  };

  // Format timestamp
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Activity Logs</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track all system activities and user interactions
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user, action, or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Activity Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Activities</option>
              <option value="user_registration">User Registration</option>
              <option value="login">User Login</option>
              <option value="logout">User Logout</option>
              <option value="post_created">Post Created</option>
              <option value="post_liked">Post Liked</option>
              <option value="message_sent">Message Sent</option>
              <option value="application_submitted">Application</option>
              <option value="booking_created">Booking Created</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="mt-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Filter by:</span>
          <button
            onClick={() => setDateRange('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              dateRange === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setDateRange('today')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              dateRange === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateRange('week')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              dateRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Activity Logs List */}
      <div className="space-y-2">
        {paginatedActivities.length > 0 ? (
          paginatedActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);

            const colorClasses = {
              green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
              blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
              purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
              orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
              indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
              yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
              cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
              slate: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
            };

            return (
              <div
                key={activity.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {activity.user}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {activity.action}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{formatTime(activity.timestamp)}</span>
                      <span>IP: {activity.ipAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
            No activities found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {Math.min(itemsPerPage, filteredActivities.length)} of {filteredActivities.length}{' '}
          activities
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1)
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminActivityLogs;
