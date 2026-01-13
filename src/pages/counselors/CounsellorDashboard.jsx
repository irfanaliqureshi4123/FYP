import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/common/Toast';
import {
  Users,
  Clock,
  Star,
  DollarSign,
  Calendar,
  TrendingUp,
  Activity,
  ArrowRight,
  ArrowLeft,
  Shield
} from 'lucide-react';

/**
 * Career Counsellor Dashboard Component
 * Displays counsellor-specific information and management tools
 */
const CounsellorDashboard = () => {
  const { currentUser, setUserRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Role Switch Handler
  const handleRoleSwitch = (role) => {
    // Check if user can switch roles based on approval status
    const isMentorApproved = currentUser?.mentorStatus === 'approved';
    const isCounselorApproved = currentUser?.counsellorStatus === 'approved';
    
    // If counselor is approved, cannot switch roles
    if (isCounselorApproved) {
      setToastMessage('You cannot switch roles once approved as Career Counselor');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    // If mentor is approved and trying to switch to student, prevent it
    if (isMentorApproved && role === 'student') {
      setToastMessage('You cannot switch back to Student once approved as Mentor');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setUserRole(role);
    const roleNames = {
      'student': 'Student',
      'career_counselor': 'Career Counselor',
      'mentor': 'Mentor'
    };
    setToastMessage(`Role switched to ${roleNames[role]}!`);
    setToastType('success');
    setShowToast(true);
    
    // Navigate to appropriate page
    if (role === 'student') {
      setTimeout(() => navigate('/'), 1500);
    } else if (role === 'mentor') {
      setTimeout(() => navigate('/mentor/dashboard'), 1500);
    }
  };

  // Mock data for dashboard
  const stats = {
    activeClients: 24,
    totalSessions: 156,
    averageRating: 4.8,
    monthlyEarnings: 3450
  };

  const upcomingSessions = [
    {
      id: 1,
      clientName: 'John Doe',
      time: 'Today, 2:00 PM',
      duration: '60 mins',
      topic: 'Tech Career Transition',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      clientName: 'Emily Smith',
      time: 'Today, 3:30 PM',
      duration: '45 mins',
      topic: 'Resume Review',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      clientName: 'Michael Johnson',
      time: 'Tomorrow, 10:00 AM',
      duration: '60 mins',
      topic: 'Interview Prep',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      clientName: 'Sarah Williams',
      time: 'Tomorrow, 2:00 PM',
      duration: '30 mins',
      topic: 'Career Path Exploration',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'session_completed',
      client: 'Alex Chen',
      action: 'Completed session',
      time: '2 hours ago',
      icon: '✓'
    },
    {
      id: 2,
      type: 'booking_created',
      client: 'Jessica Lee',
      action: 'New booking scheduled',
      time: '4 hours ago',
      icon: '📅'
    },
    {
      id: 3,
      type: 'review_received',
      client: 'David Park',
      action: 'Received 5-star review',
      time: '1 day ago',
      icon: '⭐'
    },
    {
      id: 4,
      type: 'session_completed',
      client: 'Maria Garcia',
      action: 'Completed session',
      time: '1 day ago',
      icon: '✓'
    },
    {
      id: 5,
      type: 'message_received',
      client: 'Thomas Brown',
      action: 'Sent thank you message',
      time: '2 days ago',
      icon: '💬'
    },
    {
      id: 6,
      type: 'booking_created',
      client: 'Lisa Wong',
      action: 'New booking scheduled',
      time: '2 days ago',
      icon: '📅'
    }
  ];

  const myClients = [
    {
      id: 1,
      name: 'John Doe',
      status: 'Active',
      sessionsCompleted: 5,
      lastSession: '2 days ago',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Emily Smith',
      status: 'Active',
      sessionsCompleted: 3,
      lastSession: '5 days ago',
      rating: 4.5,
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      status: 'Active',
      sessionsCompleted: 8,
      lastSession: '1 week ago',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      status: 'Inactive',
      sessionsCompleted: 2,
      lastSession: '3 weeks ago',
      rating: 4,
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 5,
      name: 'Alex Chen',
      status: 'Active',
      sessionsCompleted: 6,
      lastSession: '3 days ago',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 6,
      name: 'Jessica Lee',
      status: 'Active',
      sessionsCompleted: 4,
      lastSession: '1 week ago',
      rating: 4.5,
      avatar: 'https://i.pravatar.cc/150?img=6'
    }
  ];

  const sessions = [
    {
      id: 1,
      clientName: 'John Doe',
      date: 'Jan 10, 2026',
      time: '2:00 PM',
      duration: '60 mins',
      topic: 'Tech Career Transition',
      status: 'Completed',
      earnings: 50
    },
    {
      id: 2,
      clientName: 'Emily Smith',
      date: 'Jan 9, 2026',
      time: '3:30 PM',
      duration: '45 mins',
      topic: 'Resume Review',
      status: 'Completed',
      earnings: 37.50
    },
    {
      id: 3,
      clientName: 'Michael Johnson',
      date: 'Jan 8, 2026',
      time: '10:00 AM',
      duration: '60 mins',
      topic: 'Interview Prep',
      status: 'Completed',
      earnings: 50
    },
    {
      id: 4,
      clientName: 'David Park',
      date: 'Jan 7, 2026',
      time: '4:00 PM',
      duration: '30 mins',
      topic: 'Quick Career Chat',
      status: 'Completed',
      earnings: 25
    },
    {
      id: 5,
      clientName: 'Sarah Williams',
      date: 'Jan 6, 2026',
      time: '1:00 PM',
      duration: '60 mins',
      topic: 'Career Path Exploration',
      status: 'Completed',
      earnings: 50
    }
  ];

  const bookingRequests = [
    {
      id: 1,
      studentName: 'James Wilson',
      email: 'james.wilson@email.com',
      requestedDate: 'Jan 15, 2026',
      requestedTime: '10:00 AM',
      duration: '60 mins',
      topic: 'Career Transition Planning',
      avatar: 'https://i.pravatar.cc/150?img=7',
      message: 'I am interested in discussing my career transition from finance to tech.',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Rachel Brown',
      email: 'rachel.brown@email.com',
      requestedDate: 'Jan 16, 2026',
      requestedTime: '2:00 PM',
      duration: '45 mins',
      topic: 'Resume Review',
      avatar: 'https://i.pravatar.cc/150?img=8',
      message: 'Would love to get feedback on my resume before applying to senior positions.',
      status: 'pending'
    },
    {
      id: 3,
      studentName: 'Marcus Lee',
      email: 'marcus.lee@email.com',
      requestedDate: 'Jan 17, 2026',
      requestedTime: '3:30 PM',
      duration: '60 mins',
      topic: 'Interview Preparation',
      avatar: 'https://i.pravatar.cc/150?img=9',
      message: 'Preparing for interviews at tech companies. Any tips would be appreciated.',
      status: 'pending'
    },
    {
      id: 4,
      studentName: 'Nicole Taylor',
      email: 'nicole.taylor@email.com',
      requestedDate: 'Jan 18, 2026',
      requestedTime: '11:00 AM',
      duration: '30 mins',
      topic: 'Quick Career Chat',
      avatar: 'https://i.pravatar.cc/150?img=10',
      message: 'Just want to discuss some general career questions and goals.',
      status: 'pending'
    }
  ];

  const [bookingActions, setBookingActions] = useState({});

  // Stat Card Component
  const StatCard = ({ icon: Icon, label, value, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              {trend}
            </p>
          )}
        </div>
        <div className="bg-primary-100 dark:bg-primary-900/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                Counsellor Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">
                Manage your clients and track your impact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={Users}
            label="Active Clients"
            value={stats.activeClients}
          />
          <StatCard
            icon={Clock}
            label="Total Sessions"
            value={stats.totalSessions}
          />
          <StatCard
            icon={Star}
            label="Average Rating"
            value={`${stats.averageRating}★`}
          />
          <StatCard
            icon={DollarSign}
            label="Monthly Earnings"
            value={`$${stats.monthlyEarnings}`}
          />
        </div>

        {/* Role Switcher */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-300">Switch Role</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <button
              onClick={() => handleRoleSwitch('student')}
              disabled={currentUser?.mentorStatus === 'approved' || currentUser?.counsellorStatus === 'approved'}
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👨‍🎓 Student
            </button>
            <button
              onClick={() => handleRoleSwitch('mentor')}
              disabled={currentUser?.counsellorStatus === 'approved'}
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎓 Mentor
            </button>
            <button
              disabled
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-blue-600 dark:bg-blue-700 text-white rounded-lg cursor-default opacity-75"
            >
              💼 Counselor (Current)
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Tab Navigation - Scrollable on mobile */}
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 scrollbar-thin">
            {['overview', 'booking-requests', 'clients', 'sessions', 'earnings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'booking-requests' ? '📅 Requests' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4 lg:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Upcoming Sessions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      Upcoming Sessions
                    </h3>
                    <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                      View All
                    </a>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <img
                          src={session.avatar}
                          alt={session.clientName}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                            {session.clientName}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                            {session.topic}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">
                            {session.time}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {session.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      Recent Activity
                    </h3>
                    <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
                      View All
                    </a>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-lg">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {activity.client}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.action}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {activity.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Booking Requests Tab */}
            {activeTab === 'booking-requests' && (
              <div>
                {bookingRequests.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {bookingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-6 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                      >
                        {/* Request Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="flex items-start gap-2 sm:gap-4 flex-1">
                            <img
                              src={request.avatar}
                              alt={request.studentName}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                  {request.studentName}
                                </h4>
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                                  New Request
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                                {request.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Request Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-600">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Topic</p>
                            <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{request.topic}</p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Preferred Time</p>
                            <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                              {request.requestedDate} at {request.requestedTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-0.5 sm:mb-1">Duration</p>
                            <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{request.duration}</p>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="mb-3 sm:mb-4">
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Message</p>
                          <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 sm:p-3 rounded border border-gray-200 dark:border-gray-600 line-clamp-3">
                            {request.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 sm:gap-3 flex-wrap">
                          {!bookingActions[request.id] && (
                            <>
                              <button
                                onClick={() => setBookingActions(prev => ({ ...prev, [request.id]: 'accepted' }))}
                                className="flex-1 min-w-[130px] px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                              >
                                ✓ Accept
                              </button>
                              <button
                                onClick={() => setBookingActions(prev => ({ ...prev, [request.id]: 'declined' }))}
                                className="flex-1 min-w-[130px] px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                              >
                                ✕ Decline
                              </button>
                            </>
                          )}
                          {bookingActions[request.id] === 'accepted' && (
                            <div className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium rounded-lg text-center">
                              ✓ Request Accepted
                            </div>
                          )}
                          {bookingActions[request.id] === 'declined' && (
                            <div className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium rounded-lg text-center">
                              ✕ Request Declined
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No booking requests at the moment</p>
                  </div>
                )}
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div>
                <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Client Name
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden sm:table-cell">
                          Status
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Sessions
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden lg:table-cell">
                          Last Session
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Rating
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {myClients.map((client) => (
                        <tr
                          key={client.id}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <img
                                src={client.avatar}
                                alt={client.name}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                              />
                              <p className="font-medium text-gray-900 dark:text-white truncate">
                                {client.name}
                              </p>
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                            <span
                              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
                                client.status === 'Active'
                                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                              }`}
                            >
                              {client.status}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                            {client.sessionsCompleted}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-400 text-xs sm:text-sm hidden lg:table-cell">
                            {client.lastSession}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                            <span className="text-yellow-500">{'⭐ ' + client.rating}</span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <button className="text-primary-600 dark:text-primary-400 hover:underline font-medium text-xs sm:text-sm flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                              View <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div>
                <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Client
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden sm:table-cell">
                          Date & Time
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden lg:table-cell">
                          Topic
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Duration
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Status
                        </th>
                        <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          Earnings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((session) => (
                        <tr
                          key={session.id}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-900 dark:text-white truncate">
                            {session.clientName}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                            <div className="text-xs sm:text-sm">
                              {session.date} <br className="hidden lg:block" /> {session.time}
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                            {session.topic}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-400">
                            {session.duration}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                              {session.status}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                            ${session.earnings}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-4 sm:p-6">
                    <p className="text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium">
                      This Month
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-900 dark:text-green-300 mt-1 sm:mt-2">
                      $3,450
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg p-4 sm:p-6">
                    <p className="text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-medium">
                      Last Month
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-300 mt-1 sm:mt-2">
                      $3,200
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                    <p className="text-purple-700 dark:text-purple-400 text-xs sm:text-sm font-medium">
                      Total YTD
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-300 mt-1 sm:mt-2">
                      $6,650
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Earnings Breakdown
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { label: '60-minute sessions', percentage: 45, color: 'bg-primary-600' },
                      { label: '45-minute sessions', percentage: 35, color: 'bg-accent-600' },
                      { label: '30-minute sessions', percentage: 20, color: 'bg-secondary-600' }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-0.5 sm:mb-1">
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                            {item.label}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 ml-2 flex-shrink-0">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 sm:h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
