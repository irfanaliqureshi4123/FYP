import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, Users, MessageCircle, Star, TrendingUp, Mail, Phone, Award, Globe, Settings as SettingsIcon, Edit } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';

/**
 * Counsellor Dashboard Component
 * Replaces the normal profile when user is registered as a counsellor
 */
const CounsellorDashboard = ({ user, isOwnDashboard, onEditClick }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        {
            icon: Users,
            label: 'Total Sessions',
            value: user.counsellorData?.totalSessions || 0,
            trend: '+12%'
        },
        {
            icon: DollarSign,
            label: 'Total Earnings',
            value: `$${user.counsellorData?.totalEarnings || 0}`,
            trend: '+8%'
        },
        {
            icon: Star,
            label: 'Avg Rating',
            value: user.counsellorData?.avgRating || '0.0',
            trend: '+0.5%'
        },
        {
            icon: MessageCircle,
            label: 'Messages',
            value: user.counsellorData?.unreadMessages || 0,
            trend: 'New'
        }
    ];

    const upcomingSessions = user.counsellorData?.upcomingSessions || [
        {
            id: 1,
            studentName: 'John Doe',
            date: 'Today at 2:00 PM',
            duration: '1 hour',
            topic: 'Career Guidance'
        }
    ];

    const reviews = user.counsellorData?.reviews || [
        {
            id: 1,
            studentName: 'Emma Wilson',
            rating: 5,
            comment: 'Very helpful and professional!',
            date: '2 days ago'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Status Banner */}
            {user.counsellorStatus === 'pending' && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                        Your registration is under review. You'll receive an email once your account is approved.
                    </p>
                </div>
            )}
            {user.counsellorStatus === 'rejected' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-900 dark:text-red-200">
                        Unfortunately, your registration was not approved. Please contact support for more details.
                    </p>
                </div>
            )}

            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <Avatar src={user?.avatar} alt={user?.name} size="2xl" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user?.name}
                            </h1>
                            <p className="text-primary-600 font-medium">{user.counsellorData?.title || user?.title}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                {user.counsellorData?.specialization}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < Math.floor(user.counsellorData?.avgRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {user.counsellorData?.avgRating || '0.0'} ({user.counsellorData?.reviewCount || 0} reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                    {isOwnDashboard && (
                        <Button 
                            variant="outline" 
                            icon={<Edit className="w-4 h-4" />}
                            onClick={onEditClick}
                        >
                            Edit Dashboard
                        </Button>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            {user.counsellorStatus === 'approved' && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Icon className="w-5 h-5 text-primary-600" />
                                    <span className="text-xs font-medium text-green-600">{stat.trend}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Contact Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact Info</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{user.counsellorData?.email || user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>{user.counsellorData?.phone || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Specialization */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Specialization</h3>
                    <Badge variant="primary" className="text-xs">
                        {user.counsellorData?.specialization}
                    </Badge>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                        Experience: <span className="font-medium">{user.counsellorData?.experience} years</span>
                    </p>
                </div>

                {/* Availability */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Availability</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{user.counsellorData?.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <DollarSign className="w-4 h-4 flex-shrink-0" />
                        <span>${user.counsellorData?.fees}/hour</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            {user.counsellorStatus === 'approved' && (
                <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        {/* Tab Buttons */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700">
                            {['overview', 'sessions', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                        activeTab === tab
                                            ? 'text-primary-600 border-b-2 border-primary-600'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bio</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {user.counsellorData?.bio}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Languages</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {user.counsellorData?.languages?.map((lang) => (
                                                <Badge key={lang} variant="secondary" size="sm">
                                                    {lang}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications</h4>
                                        <div className="space-y-2">
                                            {user.counsellorData?.certifications?.map((cert, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                                                >
                                                    <Award className="w-4 h-4 flex-shrink-0 text-primary-600" />
                                                    <span>{cert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'sessions' && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h4>
                                    {upcomingSessions.length > 0 ? (
                                        <div className="space-y-3">
                                            {upcomingSessions.map((session) => (
                                                <div
                                                    key={session.id}
                                                    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h5 className="font-medium text-gray-900 dark:text-white">
                                                                {session.studentName}
                                                            </h5>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                {session.topic}
                                                            </p>
                                                        </div>
                                                        <Badge variant="primary" size="sm">{session.date}</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {session.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">No upcoming sessions</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Reviews</h4>
                                    {reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {reviews.map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h5 className="font-medium text-gray-900 dark:text-white">
                                                            {review.studentName}
                                                        </h5>
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                                            {review.date}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600 dark:text-gray-400">No reviews yet</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CounsellorDashboard;
