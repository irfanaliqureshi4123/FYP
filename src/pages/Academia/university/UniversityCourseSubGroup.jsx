import React, { useState } from 'react';
import { 
    ArrowLeft, FileText, MessageSquare, Calendar, Image as ImageIcon, 
    Users, ClipboardList, Download, Eye, AlertCircle, CheckCircle, 
    Clock, Plus, Search, BookOpen, Building2, Home, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

/**
 * University Course Page
 * Individual course/class community space for universities
 * Hierarchy: Department → Batch → Semester → Course
 */
const UniversityCourseSubGroup = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [activeTab, setActiveTab] = useState('assignments');
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    // Sample course data
    const course = {
        id: courseId,
        name: 'Advanced Quantum Mechanics',
        code: 'PHYS501',
        professor: 'Dr. James Wilson',
        semester: 'Semester 3',
        batch: 'Batch 2022',
        department: 'Physics',
        description: 'Comprehensive study of quantum field theory and advanced theoretical physics applications.',
        credits: 4,
        schedule: 'Tue, Thu: 2:00 PM - 3:30 PM',
        classroom: 'Lecture Hall A-2',
        totalStudents: 38
    };

    const assignments = [
        {
            id: 1,
            title: 'Quantum Field Theory Problem Set',
            dueDate: '2025-01-22',
            description: 'Solve problems related to Dirac equation and wave-particle duality',
            submissions: 36,
            totalStudents: 38,
            priority: 'high',
            category: 'Problem Set'
        },
        {
            id: 2,
            title: 'Research Paper on Quantum Entanglement',
            dueDate: '2025-02-05',
            description: 'Write a research paper on recent developments in quantum entanglement',
            submissions: 28,
            totalStudents: 38,
            priority: 'high',
            category: 'Research'
        },
        {
            id: 3,
            title: 'Schrödinger Equation Numerical Simulation',
            dueDate: '2025-01-30',
            description: 'Implement and analyze numerical solutions using Python',
            submissions: 32,
            totalStudents: 38,
            priority: 'medium',
            category: 'Programming'
        },
        {
            id: 4,
            title: 'Quantum Mechanics Review Quiz',
            dueDate: '2025-01-15',
            description: 'Multiple choice and short answer questions',
            submissions: 38,
            totalStudents: 38,
            priority: 'low',
            category: 'Completed'
        }
    ];

    const discussions = [
        {
            id: 1,
            author: 'Graduate Student 1',
            role: 'Research Scholar',
            avatar: 'G',
            title: 'Interpretation of Quantum Measurement',
            content: 'Can someone clarify the Copenhagen vs Many-Worlds interpretation for the measurement problem?',
            replies: 12,
            likes: 18,
            timestamp: '3 days ago'
        },
        {
            id: 2,
            author: 'Dr. James Wilson',
            role: 'Professor',
            avatar: 'J',
            title: 'Week 5 Focus: Relativistic Quantum Mechanics',
            content: 'Next week we will focus on the Dirac equation. Please review Klein-Gordon equation from Chapter 4.',
            replies: 8,
            likes: 22,
            timestamp: '4 days ago'
        },
        {
            id: 3,
            author: 'Graduate Student 2',
            role: 'Student',
            avatar: 'S',
            title: 'Clarification on Assignment 2',
            content: 'For problem 5, should we consider relativistic corrections to the energy equation?',
            replies: 4,
            likes: 6,
            timestamp: '1 week ago'
        }
    ];

    const weeklySchedule = [
        { day: 'Tuesday', time: '2:00 - 3:30 PM', room: 'A-2', type: 'Lecture' },
        { day: 'Thursday', time: '2:00 - 3:30 PM', room: 'A-2', type: 'Lecture' },
        { day: 'Wednesday (Optional)', time: '4:00 - 5:30 PM', room: 'Lab 3', type: 'Laboratory Work' },
        { day: 'Friday (Optional)', time: '3:00 - 4:00 PM', room: 'Office Hours', type: 'Discussion' }
    ];

    const galleryImages = [
        { id: 1, title: 'Quantum Lab Equipment - Photoelectric Setup', date: '2025-01-12', views: 124 },
        { id: 2, title: 'Simulation Results - Wave Function Evolution', date: '2025-01-08', views: 156 },
        { id: 3, title: 'Guest Lecture - CERN Researcher', date: '2025-01-05', views: 287 },
        { id: 4, title: 'Class Presentation on Quantum Cryptography', date: '2024-12-28', views: 198 },
        { id: 5, title: 'Experimental Results Demonstration', date: '2024-12-24', views: 213 },
        { id: 6, title: 'Seminar Series - Nobel Prize Discussion', date: '2024-12-18', views: 456 }
    ];

    const classMembers = [
        { id: 1, name: 'Dr. James Wilson', role: 'Professor', joinDate: '2024-08-15' },
        { id: 2, name: 'Dr. Maria Garcia', role: 'Teaching Assistant', joinDate: '2024-08-15' },
        { id: 3, name: 'Research Scholar 1', role: 'PhD Student', joinDate: '2024-08-20' },
        { id: 4, name: 'Graduate Student 1', role: 'Master\'s Student', joinDate: '2024-08-25' },
        { id: 5, name: 'Graduate Student 2', role: 'Master\'s Student', joinDate: '2024-08-25' },
        { id: 6, name: 'Research Scholar 2', role: 'Research Scholar', joinDate: '2024-09-01' }
    ];

    const announcements = [
        {
            id: 1,
            title: 'Mid-Term Assessment Scheduled',
            content: 'Comprehensive mid-term examination scheduled for February 20, 2025 in Lecture Hall A-2. Topics: Chapters 1-7. Open book examination.',
            priority: 'high',
            date: '2 days ago'
        },
        {
            id: 2,
            title: 'Research Paper Deadline Extended',
            content: 'The research paper deadline has been extended to February 10, 2025 to allow for more extensive research.',
            priority: 'medium',
            date: '5 days ago'
        },
        {
            id: 3,
            title: 'New Simulation Software Available',
            content: 'MATLAB code for quantum simulations has been uploaded. See Resources section for download link.',
            priority: 'low',
            date: '1 week ago'
        }
    ];

    const resources = [
        { id: 1, title: 'Lecture Notes - Complete Series', type: 'PDF', size: '8.5 MB', downloads: 156 },
        { id: 2, title: 'Quantum Mechanics Handbook', type: 'PDF', size: '5.2 MB', downloads: 124 },
        { id: 3, title: 'MATLAB Simulation Code Repository', type: 'Code', size: '3.1 MB', downloads: 89 },
        { id: 4, title: 'Research Paper References Database', type: 'Link', size: 'N/A', downloads: 267 }
    ];

    const getAssignmentStatus = (assignment) => {
        const submitted = assignment.submissions;
        const total = assignment.totalStudents;
        if (submitted === total) return 'completed';
        if (submitted >= total * 0.9) return 'almost';
        return 'pending';
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Back Button */}
            <div className="flex items-center gap-2 px-2 sm:px-0 mb-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">Back</span>
            </div>

            {/* Course Header */}
            <div className="relative">
                {/* Cover */}
                <div className="w-full h-40 sm:h-56 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg sm:rounded-xl" />

                {/* Course Info Card */}
                <div className="mx-2 sm:mx-4 md:mx-0 -mt-12 sm:-mt-16 relative z-10 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{course.name}</h1>
                                    <Badge variant="secondary">{course.code}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Building2 className="w-4 h-4" />
                                        {course.department}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        {course.professor}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        {course.semester} • {course.batch}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <BookOpen className="w-4 h-4" />
                                        {course.credits} Credits • {course.totalStudents} Students
                                    </div>
                                </div>
                            </div>
                            <Button variant="primary" size="sm">Enroll</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('assignments')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'assignments'
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <ClipboardList className="w-4 h-4" />
                            Assignments
                        </button>
                        <button
                            onClick={() => setActiveTab('discussions')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'discussions'
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
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
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <AlertCircle className="w-4 h-4" />
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveTab('timetable')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'timetable'
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Timetable
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'gallery'
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <ImageIcon className="w-4 h-4" />
                            Gallery
                        </button>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'resources'
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
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
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Members
                        </button>
                    </div>

                    {/* Assignments Tab */}
                    {activeTab === 'assignments' && (
                        <div className="space-y-4">
                            {assignments.map(assignment => (
                                <div
                                    key={assignment.id}
                                    onClick={() => setSelectedAssignment(assignment)}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-base">{assignment.title}</h4>
                                                <Badge variant={
                                                    assignment.priority === 'high' ? 'error' :
                                                    assignment.priority === 'medium' ? 'warning' :
                                                    'success'
                                                }>
                                                    {assignment.priority}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{assignment.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                                </span>
                                                <span>
                                                    {assignment.submissions}/{assignment.totalStudents} submitted
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {getAssignmentStatus(assignment) === 'completed' && (
                                                <CheckCircle className="w-6 h-6 text-green-500" />
                                            )}
                                        </div>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all"
                                            style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Discussions Tab */}
                    {activeTab === 'discussions' && (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Start a discussion..."
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            {discussions.map(discussion => (
                                <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {discussion.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{discussion.author}</h4>
                                                <Badge variant="secondary" className="text-xs">{discussion.role}</Badge>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{discussion.timestamp}</p>
                                            <h5 className="font-bold text-gray-900 dark:text-white mt-2">{discussion.title}</h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{discussion.content}</p>
                                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                <button className="hover:text-indigo-600 transition-colors">👍 {discussion.likes}</button>
                                                <button className="hover:text-indigo-600 transition-colors">💬 {discussion.replies}</button>
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
                            {announcements.map(ann => (
                                <div key={ann.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all border-l-4"
                                    style={{
                                        borderLeftColor: ann.priority === 'high' ? '#EF4444' :
                                                       ann.priority === 'medium' ? '#F59E0B' : '#10B981'
                                    }}>
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 flex-shrink-0 w-3 h-3 rounded-full ${
                                            ann.priority === 'high' ? 'bg-red-500' :
                                            ann.priority === 'medium' ? 'bg-amber-500' :
                                            'bg-green-500'
                                        }`} />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 dark:text-white">{ann.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{ann.content}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{ann.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Timetable Tab */}
                    {activeTab === 'timetable' && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                    Weekly Schedule
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{course.schedule} in {course.classroom}</p>
                            </div>
                            <div className="space-y-0">
                                {weeklySchedule.map((slot, idx) => (
                                    <div key={idx} className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">{slot.day}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{slot.time}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="secondary">{slot.type}</Badge>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Room {slot.room}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Tab */}
                    {activeTab === 'gallery' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {galleryImages.map(image => (
                                <div key={image.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-full h-40 bg-gradient-to-br from-indigo-300 to-blue-300 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-white opacity-50" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{image.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{image.date}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {image.views} views
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {resources.map(resource => (
                                <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{resource.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{resource.type} • {resource.size}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            <Download className="w-3 h-3" />
                                            {resource.downloads}
                                        </p>
                                        <button className="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded transition-colors">
                                            <Download className="w-4 h-4 text-indigo-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {classMembers.map(member => (
                                <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{member.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Joined {new Date(member.joinDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Info Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Course Details</h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Professor</p>
                                <p className="text-gray-900 dark:text-white font-medium">{course.professor}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Schedule</p>
                                <p className="text-gray-900 dark:text-white font-medium">{course.schedule}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Location</p>
                                <p className="text-gray-900 dark:text-white font-medium">{course.classroom}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Credits</p>
                                <p className="text-gray-900 dark:text-white font-medium">{course.credits}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Enrollment</p>
                                <p className="text-gray-900 dark:text-white font-medium">{course.totalStudents} Students</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-indigo-600" />
                            Assignment Status
                        </h3>
                        <div className="space-y-3">
                            {assignments.slice(0, 3).map(assignment => (
                                <div key={assignment.id} className="text-xs">
                                    <p className="text-gray-900 dark:text-white font-medium mb-1 line-clamp-1">{assignment.title}</p>
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                        <div
                                            className="bg-indigo-600 h-1.5 rounded-full transition-all"
                                            style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">{assignment.submissions}/{assignment.totalStudents}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityCourseSubGroup;
