import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Toast from '../../components/common/Toast';
import { Calendar, Users, TrendingUp, MessageSquare, Star, Clock, CheckCircle, XCircle, AlertCircle, Shield, ArrowLeft } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

/**
 * Mentor Dashboard Page
 * For mentors to manage their mentees, sessions, and earnings
 * Route: /mentor/dashboard
 */
const MentorDashboard = () => {
    const { currentUser, setUserRole } = useAuth();
    const navigate = useNavigate();
    const { /* mentorApplications */ } = useApp();
    
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [isEditingAvailability, setIsEditingAvailability] = useState(false);

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
        } else if (role === 'career_counselor') {
            setTimeout(() => navigate('/counselor/dashboard'), 1500);
        }
    };

    // Handle availability update
    const handleUpdateAvailability = () => {
        setToastMessage('Availability updated successfully');
        setToastType('success');
        setShowToast(true);
        setIsEditingAvailability(false);
    };

    // Mock mentor data (in real app, fetch from context/API)
    const mentorProfile = {
        id: 1,
        name: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=5',
        title: 'Senior Product Manager @ Google',
        specialization: 'Product Management',
        rating: 4.9,
        reviews: 127,
        mentees: 24,
        activeStudents: 12,
        totalSessions: 156,
        responseTime: '2h',
        bio: '8+ years in product management. Helped 24+ mentees land PM roles. Free mentoring!'
    };

    // Mock mentee data
    const mockMentees = [
        {
            id: 1,
            name: 'Alex Johnson',
            avatar: 'https://i.pravatar.cc/150?img=1',
            goal: 'Transition to Product Manager',
            joined: '2024-01-05',
            sessions: 8,
            nextSession: '2024-01-15 2:00 PM',
            progress: 'Strong Progress',
            status: 'active'
        },
        {
            id: 2,
            name: 'Priya Patel',
            avatar: 'https://i.pravatar.cc/150?img=2',
            goal: 'Master Product Strategy',
            joined: '2023-12-10',
            sessions: 12,
            nextSession: '2024-01-16 3:00 PM',
            progress: 'Excellent Progress',
            status: 'active'
        },
        {
            id: 3,
            name: 'Marcus Chen',
            avatar: 'https://i.pravatar.cc/150?img=3',
            goal: 'Product Leadership Skills',
            joined: '2023-11-20',
            sessions: 15,
            nextSession: null,
            progress: 'Very Good Progress',
            status: 'inactive'
        },
        {
            id: 4,
            name: 'Elena Rodriguez',
            avatar: 'https://i.pravatar.cc/150?img=4',
            goal: 'First PM Role',
            joined: '2024-01-01',
            sessions: 3,
            nextSession: '2024-01-14 5:00 PM',
            progress: 'Getting Started',
            status: 'active'
        }
    ];

    // Mock sessions data
    const mockSessions = [
        {
            id: 1,
            menteeName: 'Priya Patel',
            menteeAvatar: 'https://i.pravatar.cc/150?img=2',
            dateTime: '2024-01-10 4:00 PM',
            duration: 60,
            status: 'completed',
            notes: 'Discussed product roadmap prioritization',
            rating: 5
        },
        {
            id: 2,
            menteeName: 'Alex Johnson',
            menteeAvatar: 'https://i.pravatar.cc/150?img=1',
            dateTime: '2024-01-12 2:00 PM',
            duration: 45,
            status: 'scheduled',
            notes: null,
            rating: null
        },
        {
            id: 3,
            menteeName: 'Elena Rodriguez',
            menteeAvatar: 'https://i.pravatar.cc/150?img=4',
            dateTime: '2024-01-14 5:00 PM',
            duration: 60,
            status: 'scheduled',
            notes: null,
            rating: null
        }
    ];

    // Calculate stats
    const stats = [
        {
            label: 'Active Mentees',
            value: mentorProfile.activeStudents,
            icon: Users,
            color: 'blue'
        },
        {
            label: 'Total Sessions',
            value: mentorProfile.totalSessions,
            icon: Calendar,
            color: 'purple'
        },
        {
            label: 'Average Rating',
            value: mentorProfile.rating,
            icon: Star,
            color: 'yellow'
        }
    ];

    const activeMentees = mockMentees.filter(m => m.status === 'active');
    const upcomingSessions = mockSessions.filter(s => s.status === 'scheduled');
    const completedSessions = mockSessions.filter(s => s.status === 'completed');

    const getProgressColor = (progress) => {
        if (progress.includes('Excellent')) return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-200';
        if (progress.includes('Strong') || progress.includes('Very Good')) return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200';
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200';
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'mentees', label: 'My Mentees' },
        { id: 'sessions', label: 'Sessions' },
        { id: 'settings', label: 'Settings' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
                    <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                                title="Go back to home"
                            >
                                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                                    Mentor Dashboard
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">
                                    Manage your mentees and track your impact
                                </p>
                            </div>
                        </div>
                        <img
                            src={mentorProfile.avatar}
                            alt={mentorProfile.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 -mx-3 sm:-mx-4 lg:-mx-8 px-3 sm:px-4 lg:px-8 scrollbar-thin">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                                    activeTab === tab.id
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                const colors = {
                                    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
                                    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                                    yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
                                    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                };
                                
                                return (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className={`${colors[stat.color]} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0`}>
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                            {stat.value}
                                        </p>
                                    </div>
                                );
                            })}
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
                              disabled
                              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-blue-600 dark:bg-blue-700 text-white rounded-lg cursor-default opacity-75"
                            >
                              🎓 Mentor (Current)
                            </button>
                            <button
                              onClick={() => handleRoleSwitch('career_counselor')}
                              disabled={currentUser?.counsellorStatus === 'approved'}
                              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              💼 Counselor
                            </button>
                          </div>
                        </div>

                        {/* Quick View */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {/* Upcoming Sessions */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 flex-shrink-0" />
                                    Upcoming Sessions
                                </h3>
                                <div className="space-y-2 sm:space-y-3">
                                    {upcomingSessions.length > 0 ? (
                                        upcomingSessions.map(session => (
                                            <div
                                                key={session.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={session.menteeAvatar}
                                                        alt={session.menteeName}
                                                        size="sm"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {session.menteeName}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {session.dateTime}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    Join
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                                            No upcoming sessions
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary-600" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {completedSessions.slice(0, 3).map(session => (
                                        <div
                                            key={session.id}
                                            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-green-500"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        Session with {session.menteeName}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {session.dateTime}
                                                    </p>
                                                </div>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${
                                                                i < (session.rating || 0)
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mentees Tab */}
                {activeTab === 'mentees' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Your Mentees ({activeMentees.length})
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeMentees.map(mentee => (
                                <div
                                    key={mentee.id}
                                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => {
                                        setSelectedMentee(mentee);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                src={mentee.avatar}
                                                alt={mentee.name}
                                                size="md"
                                            />
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    {mentee.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Joined {new Date(mentee.joined).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className={getProgressColor(mentee.progress)}>
                                            {mentee.progress}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            <span className="font-medium">Goal:</span> {mentee.goal}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">{mentee.sessions}</span> sessions completed
                                        </p>
                                        {mentee.nextSession && (
                                            <p className="text-sm text-primary-600 dark:text-primary-400">
                                                Next: {mentee.nextSession}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sessions Tab */}
                {activeTab === 'sessions' && (
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                            All Sessions
                        </h3>
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-8 px-3 sm:px-4 lg:px-8">
                                <table className="w-full text-xs sm:text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-800">
                                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                Mentee
                                            </th>
                                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden sm:table-cell">
                                                Date & Time
                                            </th>
                                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                Duration
                                            </th>
                                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                Status
                                            </th>
                                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-900 dark:text-white whitespace-nowrap hidden lg:table-cell">
                                                Rating
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockSessions.map(session => (
                                            <tr
                                                key={session.id}
                                                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <td className="px-2 sm:px-6 py-2 sm:py-4">
                                                    <div className="flex items-center gap-1 sm:gap-2">
                                                        <img
                                                            src={session.menteeAvatar}
                                                            alt={session.menteeName}
                                                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                                                        />
                                                        <span className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium truncate">
                                                            {session.menteeName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                                                    {session.dateTime}
                                                </td>
                                                <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                    {session.duration} min
                                                </td>
                                                <td className="px-2 sm:px-6 py-2 sm:py-4">
                                                    <Badge
                                                        variant={
                                                            session.status === 'completed'
                                                                ? 'success'
                                                                : 'primary'
                                                        }
                                                    >
                                                        {session.status === 'completed' ? 'Completed' : 'Scheduled'}
                                                    </Badge>
                                                </td>
                                                <td className="px-2 sm:px-6 py-2 sm:py-4 hidden lg:table-cell">
                                                    {session.rating ? (
                                                        <div className="flex gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                                                        i < session.rating
                                                                            ? 'text-yellow-400 fill-current'
                                                                            : 'text-gray-300 dark:text-gray-600'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500 dark:text-gray-500">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Profile Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Mentoring Type
                                    </label>
                                    <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                                        🎓 Free Mentoring
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        You provide free guidance and support to students
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Availability
                                    </label>
                                    {isEditingAvailability ? (
                                        <div className="space-y-2">
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                                <option>30 minutes response time</option>
                                                <option>1 hour response time</option>
                                                <option>2 hours response time</option>
                                                <option>4 hours response time</option>
                                                <option>24 hours response time</option>
                                            </select>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="primary" onClick={handleUpdateAvailability}>
                                                    Save
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={() => setIsEditingAvailability(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {mentorProfile.responseTime} average response time
                                            </p>
                                            <Button size="sm" variant="outline" className="mt-2" onClick={() => setIsEditingAvailability(true)}>
                                                Update Availability
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mentee Detail Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedMentee && (
                    <div className="max-w-2xl w-full">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {selectedMentee.name}
                            </h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Mentorship Goal</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedMentee.goal}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {new Date(selectedMentee.joined).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Sessions</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedMentee.sessions}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                                        <Badge className={getProgressColor(selectedMentee.progress)}>
                                            {selectedMentee.progress}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Next Session
                                    </p>
                                    {selectedMentee.nextSession ? (
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedMentee.nextSession}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-500">No upcoming session</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button className="flex-1" onClick={() => setIsModalOpen(false)}>
                                    Send Message
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MentorDashboard;
