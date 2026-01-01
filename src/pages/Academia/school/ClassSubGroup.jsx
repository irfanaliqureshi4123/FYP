import React, { useState } from 'react';
import { BookOpen, Users, FileText, Calendar, MessageSquare, CheckCircle, Clock, ArrowLeft, Image as ImageIcon, Bell } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import classesData from '../../../data/classes.json';

/**
 * Class Sub-Group Page
 * Individual class space with assignments, discussions, resources, and timetable
 */
const ClassSubGroup = () => {
    const navigate = useNavigate();
    const { classId } = useParams();
    const [activeTab, setActiveTab] = useState('discussions');

    // Find class data
    const classData = classesData.find(c => c.id === classId) || classesData[0];

    const sampleAssignments = [
        {
            id: 1,
            title: 'Chapter 5: Quadratic Equations',
            subject: 'Mathematics',
            description: 'Solve problems 1-20 from page 45 of the textbook',
            dueDate: '2025-01-05',
            daysLeft: 7,
            status: 'pending',
            totalSubmissions: 28,
            totalStudents: 35
        },
        {
            id: 2,
            title: 'Essay: Climate Change Impact',
            subject: 'English',
            description: 'Write a 500-word essay on the impact of climate change',
            dueDate: '2025-01-10',
            daysLeft: 12,
            status: 'pending',
            totalSubmissions: 25,
            totalStudents: 35
        },
        {
            id: 3,
            title: 'Biology Project: Human Anatomy',
            subject: 'Science',
            description: 'Create a detailed model of human anatomy with labels',
            dueDate: '2024-12-20',
            daysLeft: -9,
            status: 'closed',
            totalSubmissions: 33,
            totalStudents: 35
        }
    ];

    const sampleDiscussions = [
        {
            id: 1,
            author: 'Ms. Linda Martinez',
            role: 'Teacher',
            avatar: 'LM',
            title: 'New Lesson on Fractions',
            content: 'Today we covered fractions and how to multiply them. Great questions from the class!',
            timestamp: '2 hours ago',
            replies: 12
        },
        {
            id: 2,
            author: 'Class 2A Representative',
            role: 'Class Rep',
            avatar: '2A',
            title: 'Class Field Trip Planning',
            content: 'Let\'s discuss the upcoming field trip to the museum. Please share your availability.',
            timestamp: '5 hours ago',
            replies: 8
        }
    ];

    const timetable = [
        { day: 'Monday', periods: ['English', 'Mathematics', 'Science', 'PE', 'Art'] },
        { day: 'Tuesday', periods: ['Science', 'History', 'English', 'Computer', 'Music'] },
        { day: 'Wednesday', periods: ['Mathematics', 'Geography', 'PE', 'English', 'Library'] },
        { day: 'Thursday', periods: ['Science', 'Mathematics', 'History', 'Art', 'English'] },
        { day: 'Friday', periods: ['English', 'Science', 'Mathematics', 'Assembly', 'Games'] }
    ];

    const sampleGallery = [
        { id: 1, title: 'Class Picnic 2024', color: 'from-emerald-400 to-green-600', date: '2024-01-15' },
        { id: 2, title: 'Science Fair', color: 'from-yellow-400 to-amber-600', date: '2024-01-10' },
        { id: 3, title: 'Sports Day', color: 'from-red-400 to-red-600', date: '2024-01-05' },
        { id: 4, title: 'Classroom Decoration', color: 'from-purple-400 to-purple-600', date: '2023-12-28' },
        { id: 5, title: 'Annual Function', color: 'from-blue-400 to-blue-600', date: '2023-12-20' },
        { id: 6, title: 'Project Presentation', color: 'from-cyan-400 to-cyan-600', date: '2023-12-15' }
    ];

    const sampleAnnouncements = [
        { id: 1, title: 'Class Test Schedule', content: 'Mathematics test on 15th January at 10:00 AM. Please bring your hall ticket and calculator.', date: '2025-01-08', priority: 'high' },
        { id: 2, title: 'Assignment Submission', content: 'All assignments must be submitted by 5:00 PM on the due date via the online portal.', date: '2025-01-06', priority: 'normal' },
        { id: 3, title: 'School Holiday', content: 'School will remain closed on 26th January (Republic Day). Classes will resume on 27th January.', date: '2024-12-28', priority: 'high' }
    ];

    const sampleMembers = [
        { id: 1, name: 'Ms. Linda Martinez', role: 'Class Teacher', contact: 'linda.martinez@school.edu' },
        { id: 2, name: 'Amit Kumar', role: 'Class Representative', contact: 'amit.kumar@student.edu' },
        { id: 3, name: 'Priya Sharma', role: 'Vice Representative', contact: 'priya.sharma@student.edu' },
        { id: 4, name: 'Raj Patel', role: 'Student', contact: 'raj.patel@student.edu' },
        { id: 5, name: 'Sarah Johnson', role: 'Student', contact: 'sarah.johnson@student.edu' },
        { id: 6, name: 'Arjun Singh', role: 'Student', contact: 'arjun.singh@student.edu' }
    ];

    const renderDiscussions = () => (
        <div className="space-y-4">
            {/* Create Post */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Ask a question or start a discussion..."
                        className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {/* Discussion Posts */}
            {sampleDiscussions.map(post => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {post.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{post.author}</h4>
                                <Badge variant="secondary" className="text-xs">{post.role}</Badge>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mt-1">{post.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{post.content}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                                {post.timestamp} • {post.replies} replies
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderAssignments = () => (
        <div className="space-y-4">
            {sampleAssignments.map(assignment => (
                <div key={assignment.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                            <Badge variant="secondary" className="text-xs mt-1">{assignment.subject}</Badge>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                            assignment.status === 'pending'
                                ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                            {assignment.status === 'pending' ? 'Active' : 'Closed'}
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{assignment.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Due Date</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{assignment.dueDate}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
                            <p className={`text-sm font-semibold ${assignment.daysLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {assignment.daysLeft > 0 ? `${assignment.daysLeft} days` : 'Closed'}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Submissions</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{assignment.totalSubmissions}/{assignment.totalStudents}</p>
                        </div>
                    </div>

                    <Button variant="outline" size="sm" fullWidth>View Assignment</Button>
                </div>
            ))}
        </div>
    );

    const renderTimetable = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white">Day</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white">Period 1</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white">Period 2</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white">Period 3</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white hidden sm:table-cell">Period 4</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-900 dark:text-white hidden sm:table-cell">Period 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.map((day, idx) => (
                            <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{day.day}</td>
                                {day.periods.map((period, pidx) => (
                                    <td key={pidx} className={`px-4 py-3 text-xs text-gray-600 dark:text-gray-400 ${pidx > 2 ? 'hidden sm:table-cell' : ''}`}>
                                        {period}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderResources = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Revision Notes', 'Practice Questions', 'Study Guide', 'Reference Materials'].map((resource, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{resource}</h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Available for download</p>
                </div>
            ))}
        </div>
    );

    const renderGallery = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleGallery.map(item => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer">
                        <div className={`w-full h-48 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <span className="text-white font-bold text-center px-4 text-sm">{item.title}</span>
                        </div>
                        <div className="p-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAnnouncements = () => (
        <div className="space-y-4">
            {sampleAnnouncements.map(announcement => (
                <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            announcement.priority === 'high'
                                ? 'bg-red-100 dark:bg-red-900/20'
                                : 'bg-blue-100 dark:bg-blue-900/20'
                        }`}>
                            <Bell className={`w-5 h-5 ${announcement.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{announcement.title}</h3>
                                {announcement.priority === 'high' && (
                                    <span className="px-2 py-1 text-xs font-bold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-full flex-shrink-0">
                                        Important
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{announcement.content}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMembers = () => (
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Class Members ({sampleMembers.length})</h3>
                <div className="space-y-3">
                    {sampleMembers.map(member => (
                        <div key={member.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</h4>
                                    <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{member.contact}</p>
                                </div>
                            </div>
                            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition font-medium text-sm whitespace-nowrap ml-2">
                                Message
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'discussions':
                return renderDiscussions();
            case 'assignments':
                return renderAssignments();
            case 'timetable':
                return renderTimetable();
            case 'resources':
                return renderResources();
            case 'gallery':
                return renderGallery();
            case 'announcements':
                return renderAnnouncements();
            case 'members':
                return renderMembers();
            default:
                return renderDiscussions();
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Class Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <button onClick={() => navigate(-1)} className="mb-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                <div className="mb-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{classData.name}</h1>
                            <Badge variant="secondary" className="text-xs mt-2">{classData.classCode}</Badge>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{classData.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Class Teacher</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{classData.classTeacher.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{classData.strength}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Section</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{classData.section}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Established</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{new Date(classData.createdAt).getFullYear()}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0">
                {[
                    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
                    { id: 'assignments', label: 'Assignments', icon: BookOpen },
                    { id: 'timetable', label: 'Timetable', icon: Calendar },
                    { id: 'resources', label: 'Resources', icon: FileText },
                    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                    { id: 'announcements', label: 'Announcements', icon: Bell },
                    { id: 'members', label: 'Members', icon: Users }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                            activeTab === tab.id
                                ? 'text-primary-600 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 border-transparent'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};

export default ClassSubGroup;
