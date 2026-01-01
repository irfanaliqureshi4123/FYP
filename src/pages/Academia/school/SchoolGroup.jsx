import React, { useState } from 'react';
import { Users, MessageSquare, FileText, ArrowLeft, Search, Plus, Bell, AlertCircle, Calendar, BookOpen, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import schoolGroupsData from '../../../data/schoolGroups.json';
import classesData from '../../../data/classes.json';

/**
 * School Group Page
 * Community space with class-based sub-groups
 * Updated: Groups with modal classes view
 */
const SchoolGroup = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('discussion');
    const [showClassesModal, setShowClassesModal] = useState(false);
    const [classSearchQuery, setClassSearchQuery] = useState('');

    // Find group and related classes
    const group = schoolGroupsData.find(g => g.id === groupId) || schoolGroupsData[0];
    const classesInGroup = classesData.filter(c => group.classes.includes(c.id));
    const filteredClasses = classesInGroup.filter(cls =>
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.classTeacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Filter classes for modal
    const filteredClassesForModal = classesInGroup.filter(cls =>
        cls.name.toLowerCase().includes(classSearchQuery.toLowerCase()) ||
        cls.classTeacher.name.toLowerCase().includes(classSearchQuery.toLowerCase())
    );

    const sampleDiscussions = [
        {
            id: 1,
            author: 'Ms. Emily Johnson',
            role: 'Teacher',
            avatar: 'EJ',
            content: 'Great progress in today\'s online class! Students were very engaged with the interactive activities.',
            timestamp: '2 hours ago',
            likes: 145,
            comments: 23,
            replies: 5
        },
        {
            id: 2,
            author: 'Class 3A Representative',
            role: 'Class Rep',
            avatar: '3A',
            content: 'Class 3A has organized a science project group. All interested students are welcome to join!',
            timestamp: '5 hours ago',
            likes: 89,
            comments: 12,
            replies: 3
        },
        {
            id: 3,
            author: 'Principal Office',
            role: 'Admin',
            avatar: 'PO',
            content: 'School assembly will be held on Friday at 8:30 AM. All students and teachers are required to attend.',
            timestamp: '1 day ago',
            likes: 267,
            comments: 45,
            replies: 8
        }
    ];

    const sampleMembers = [
        { id: 1, name: 'Dr. James Mitchell', role: 'Admin', joinedDate: '2022-06-01' },
        { id: 2, name: 'Ms. Sarah Johnson', role: 'Teacher', joinedDate: '2022-06-15' },
        { id: 3, name: 'Mr. Robert Davis', role: 'Teacher', joinedDate: '2022-07-01' },
        { id: 4, name: 'Ms. Emily Brown', role: 'Teacher', joinedDate: '2022-07-10' },
        { id: 5, name: 'Student User 1', role: 'Student', joinedDate: '2024-01-01' },
        { id: 6, name: 'Student User 2', role: 'Student', joinedDate: '2024-01-02' }
    ];

    const sampleResources = [
        { id: 1, title: 'Mathematics Study Guide', category: 'Mathematics', type: 'PDF', size: '2.5 MB', downloads: 124 },
        { id: 2, title: 'English Literature Notes', category: 'English', type: 'PDF', size: '1.8 MB', downloads: 89 },
        { id: 3, title: 'Science Lab Manual', category: 'Science', type: 'PDF', size: '3.2 MB', downloads: 156 },
        { id: 4, title: 'History Timeline', category: 'History', type: 'Document', size: '0.9 MB', downloads: 45 }
    ];

    const sampleAnnouncements = [
        {
            id: 1,
            title: 'Upcoming Final Examinations',
            content: 'Final examinations will be held from January 15-25, 2025. All students must appear for the exams. Study materials have been uploaded to the resources section.',
            priority: 'high',
            author: 'Principal Office',
            timestamp: '2 days ago',
            icon: '📢'
        },
        {
            id: 2,
            title: 'Group Project Submission Guidelines',
            content: 'All group projects must be submitted by January 10, 2025. Please ensure proper documentation and include the contribution summary from all team members.',
            priority: 'medium',
            author: 'Academic Coordinator',
            timestamp: '4 days ago',
            icon: '📋'
        },
        {
            id: 3,
            title: 'Holiday Schedule Update',
            content: 'School will remain closed on January 26-27 for annual holidays. Classes will resume on January 28. Have a great holiday break!',
            priority: 'low',
            author: 'Admin Staff',
            timestamp: '1 week ago',
            icon: '🎉'
        }
    ];

    const sampleEvents = [
        {
            id: 1,
            title: 'Science Fair 2025',
            date: '2025-01-18',
            time: '09:00 AM - 04:00 PM',
            location: 'School Auditorium',
            description: 'Annual Science Fair showcasing student projects and innovations.',
            type: 'school',
            attendees: 240,
            classes: ['Class 3A', 'Class 3B', 'Class 4A', 'Class 4B']
        },
        {
            id: 2,
            title: 'Mathematics Workshop',
            date: '2025-01-15',
            time: '02:00 PM - 03:30 PM',
            location: 'Math Lab',
            description: 'Interactive workshop on problem-solving techniques for Class 4.',
            type: 'class',
            attendees: 85,
            classes: ['Class 4A', 'Class 4B']
        },
        {
            id: 3,
            title: 'Sports Day Finals',
            date: '2025-01-20',
            time: '08:00 AM - 05:00 PM',
            location: 'School Grounds',
            description: 'Final rounds of inter-class sports competitions.',
            type: 'school',
            attendees: 450,
            classes: ['All Classes']
        },
        {
            id: 4,
            title: 'English Debate Competition',
            date: '2025-01-12',
            time: '11:00 AM - 02:00 PM',
            location: 'Seminar Hall',
            description: 'Inter-school debate competition on current social issues.',
            type: 'school',
            attendees: 120,
            classes: ['Class 3A', 'Class 3B', 'Class 5A', 'Class 5B']
        }
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Back Button */}
            <div className="flex items-center mb-2 px-2 sm:px-0">
                <button
                    onClick={() => navigate('/school')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2"
                    aria-label="Go back to schools"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Back to Schools</span>
            </div>

            {/* Group Header */}
            <div className="relative">
                {/* Cover Image */}
                <img
                    src={group.coverImage}
                    alt={group.name}
                    className="w-full h-40 sm:h-56 object-cover rounded-lg sm:rounded-xl"
                />

                {/* Group Info Card */}
                <div className="mx-2 sm:mx-4 md:mx-0 -mt-12 sm:-mt-16 relative z-10 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{group.name}</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{group.description}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        {group.memberCount} Members
                                    </span>
                                    <button
                                        onClick={() => setShowClassesModal(true)}
                                        className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors w-fit"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        {classesInGroup.length} Classes - View Classes
                                    </button>
                                </div>
                            </div>
                            <Button variant="primary" size="sm">
                                <Plus className="w-4 h-4 mr-1" />
                                Join Group
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Discussions/Feed */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('discussion')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'discussion'
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Discussions
                        </button>
                        <button
                            onClick={() => setActiveTab('announcements')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'announcements'
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Bell className="w-4 h-4" />
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'events'
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Events
                        </button>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'resources'
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            Resources
                        </button>
                        <button
                            onClick={() => setActiveTab('members')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'members'
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Members
                        </button>
                    </div>

                    {/* Discussion Feed */}
                    {activeTab === 'discussion' && (
                        <div className="space-y-4">
                            {/* Create Post */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Start a discussion..."
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Posts */}
                            {sampleDiscussions.map(post => (
                                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{post.author}</h4>
                                                <Badge variant="secondary" className="text-xs">{post.role}</Badge>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{post.content}</p>

                                            <div className="flex items-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                <button className="hover:text-primary-600 transition-colors">👍 {post.likes}</button>
                                                <button className="hover:text-primary-600 transition-colors">💬 {post.comments}</button>
                                                <button className="hover:text-primary-600 transition-colors">↩️ {post.replies}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Announcements Tab */}
                    {activeTab === 'announcements' && (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-amber-600" />
                                        Group Announcements
                                    </h3>
                                </div>
                                <div className="space-y-0">
                                    {sampleAnnouncements.map((announcement, index) => (
                                        <div key={announcement.id} className={`p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                                            {/* Priority Indicator */}
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                                                    announcement.priority === 'high' ? 'bg-red-500' :
                                                    announcement.priority === 'medium' ? 'bg-amber-500' :
                                                    'bg-green-500'
                                                }`} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <h4 className="font-bold text-gray-900 dark:text-white text-base">{announcement.title}</h4>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                            announcement.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                                                            announcement.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                                                            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                        }`}>
                                                            {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{announcement.author} • {announcement.timestamp}</p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{announcement.content}</p>
                                                    <button className="mt-3 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                                                        View More →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Events Tab */}
                    {activeTab === 'events' && (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                        Upcoming Events
                                    </h3>
                                </div>
                                <div className="space-y-0">
                                    {sampleEvents.map((event, index) => {
                                        const eventDate = new Date(event.date);
                                        const isUpcoming = eventDate > new Date();
                                        return (
                                            <div key={event.id} className={`p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!isUpcoming ? 'opacity-60' : ''}`}>
                                                <div className="flex gap-4">
                                                    {/* Date Box */}
                                                    <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700 flex flex-col items-center justify-center">
                                                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                                                        <div className="text-lg font-bold text-gray-900 dark:text-white">{eventDate.getDate()}</div>
                                                    </div>

                                                    {/* Event Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                                                            <h4 className="font-bold text-gray-900 dark:text-white text-base">{event.title}</h4>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                                event.type === 'school' 
                                                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                                                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                            }`}>
                                                                {event.type === 'school' ? 'School Event' : 'Class Event'}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                            <p className="flex items-center gap-2">
                                                                <span className="font-medium">⏰</span>
                                                                {event.time}
                                                            </p>
                                                            <p className="flex items-center gap-2">
                                                                <span className="font-medium">📍</span>
                                                                {event.location}
                                                            </p>
                                                        </div>

                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{event.description}</p>

                                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600 dark:text-gray-400 flex-wrap">
                                                            <span>👥 {event.attendees} expected</span>
                                                            <span>📚 {event.classes.length} classes</span>
                                                        </div>

                                                        <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                                                            {isUpcoming ? 'Register' : 'View Details'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Shared Resources</h3>
                                <div className="space-y-3">
                                    {sampleResources.map(resource => (
                                        <div key={resource.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{resource.title}</h4>
                                                    <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded">
                                                        {resource.type}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                                    <span>{resource.category}</span>
                                                    <span>{resource.size}</span>
                                                    <span>📥 {resource.downloads} downloads</span>
                                                </div>
                                            </div>
                                            <button className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition font-medium text-sm">
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                        <Users className="w-5 h-5 text-purple-600" />
                                        Group Members ({sampleMembers.length})
                                    </h3>
                                </div>
                                <div className="space-y-0">
                                    {sampleMembers.map(member => (
                                        <div key={member.id} className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
                                            <div className="flex items-start gap-3">
                                                {/* Member Avatar */}
                                                <div className="relative flex-shrink-0">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                                        member.role === 'Admin' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                                                        member.role === 'Teacher' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                                        'bg-gradient-to-br from-green-400 to-green-600'
                                                    }`}>
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                                </div>

                                                {/* Member Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                            member.role === 'Admin' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                                                            member.role === 'Teacher' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                        }`}>
                                                            {member.role}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        Joined {new Date(member.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>

                                                {/* Action Button */}
                                                <button className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                                                    Message
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Group Statistics Widget */}
                <div className="bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-primary-100 dark:to-primary-800/20 rounded-lg p-4 border border-primary-200 dark:border-primary-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-primary-600" />
                        <h4 className="font-bold text-gray-900 dark:text-white">Group Statistics</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-100 dark:border-primary-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Members</span>
                            <span className="font-bold text-lg text-primary-600 dark:text-primary-400">{group.memberCount}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-100 dark:border-primary-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Classes</span>
                            <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{classesInGroup.length}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-100 dark:border-primary-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Active Posts</span>
                            <span className="font-bold text-lg text-green-600 dark:text-green-400">{sampleDiscussions.length}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-100 dark:border-primary-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Announcements</span>
                            <span className="font-bold text-lg text-amber-600 dark:text-amber-400">{sampleAnnouncements.length}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-100 dark:border-primary-700">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Upcoming Events</span>
                            <span className="font-bold text-lg text-purple-600 dark:text-purple-400">{sampleEvents.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Classes Modal */}
            {showClassesModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                    Classes ({classesInGroup.length})
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">All classes in {group.name}</p>
                            </div>
                            <button
                                onClick={() => setShowClassesModal(false)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="sticky top-16 bg-white dark:bg-gray-800 px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="search"
                                    value={classSearchQuery}
                                    onChange={(e) => setClassSearchQuery(e.target.value)}
                                    placeholder="Search classes by name or teacher..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Classes List */}
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredClassesForModal.length > 0 ? (
                                filteredClassesForModal.map(cls => (
                                    <button
                                        key={cls.id}
                                        onClick={() => {
                                            navigate(`/class/${cls.id}`);
                                            setShowClassesModal(false);
                                        }}
                                        className="w-full px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-sm sm:text-base">
                                                    {cls.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    <span className="inline-block">👨‍🏫 {cls.classTeacher.name}</span>
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                                                    👥 {cls.strength} students
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="text-right">
                                                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors">
                                                        View →
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 sm:px-6 py-8 text-center">
                                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-600 dark:text-gray-400">No classes found matching "{classSearchQuery}"</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setShowClassesModal(false)}
                                className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchoolGroup;
