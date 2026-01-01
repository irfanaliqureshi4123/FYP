import React, { useState } from 'react';
import { 
    ArrowLeft, Calendar, Users, BookOpen, AlertCircle, FileText,
    Clock, Building2, ChevronRight, Plus, Zap, Award
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

/**
 * College Semester Group Page
 * Semester-level community space
 * Hierarchy: Department → Batch → Semester → Classes
 */
const CollegeSemesterGroup = () => {
    const navigate = useNavigate();
    const { batchId, semesterId } = useParams();
    const [activeTab, setActiveTab] = useState('classes');

    // Sample semester data
    const semesterData = {
        id: semesterId,
        batchId: batchId,
        semester: 'Semester 3',
        batch: 'Batch 2023',
        department: 'Computer Science & Engineering',
        academicYear: '2024-2025',
        startDate: '2024-12-01',
        endDate: '2025-04-30',
        totalStudents: 120,
        totalClasses: 6,
        credits: 24,
        examDate: '2025-05-15'
    };

    const classes = [
        {
            id: 'course-1',
            code: 'CSE301',
            name: 'Data Structures & Algorithms',
            instructor: 'Dr. Michael Chen',
            credits: 4,
            students: 45,
            status: 'active'
        },
        {
            id: 'course-2',
            code: 'CSE302',
            name: 'Database Management Systems',
            instructor: 'Dr. Sarah Johnson',
            credits: 4,
            students: 45,
            status: 'active'
        },
        {
            id: 'course-3',
            code: 'CSE303',
            name: 'Web Development',
            instructor: 'Prof. James Wilson',
            credits: 3,
            students: 40,
            status: 'active'
        },
        {
            id: 'course-4',
            code: 'CSE304',
            name: 'Operating Systems',
            instructor: 'Dr. Robert Taylor',
            credits: 4,
            students: 45,
            status: 'active'
        },
        {
            id: 'course-5',
            code: 'CSE305',
            name: 'Computer Networks',
            instructor: 'Dr. Emily Anderson',
            credits: 4,
            students: 45,
            status: 'active'
        },
        {
            id: 'course-6',
            code: 'CSE306',
            name: 'Software Engineering',
            instructor: 'Prof. David Brown',
            credits: 3,
            students: 40,
            status: 'active'
        }
    ];

    const announcements = [
        {
            id: 1,
            title: 'Mid Semester Examination Schedule',
            content: 'Mid-semester examinations will be conducted from January 15-25, 2025. Individual exam schedules will be shared by December 30.',
            priority: 'high',
            date: '2 days ago'
        },
        {
            id: 2,
            title: 'Attendance Policy Reminder',
            content: 'Minimum 75% attendance is mandatory. Students below this threshold will not be allowed to sit for exams.',
            priority: 'high',
            date: '5 days ago'
        },
        {
            id: 3,
            title: 'Assignment Submission Guidelines',
            content: 'All assignments must be submitted through the online portal by 11:59 PM on the due date. Late submissions will incur a penalty.',
            priority: 'medium',
            date: '1 week ago'
        },
        {
            id: 4,
            title: 'Library Resources Available',
            content: 'Additional reference books for this semester have been added to the library. Check the resources section for details.',
            priority: 'low',
            date: '2 weeks ago'
        }
    ];

    const scheduleHighlights = [
        { event: 'Mid Semester Exams', date: '2025-01-15', color: '#EF4444' },
        { event: 'Project Submission Deadline', date: '2025-02-28', color: '#F59E0B' },
        { event: 'Final Exams', date: '2025-04-15', color: '#EF4444' },
        { event: 'Semester Ends', date: '2025-04-30', color: '#10B981' }
    ];

    const members = [
        { id: 1, name: 'Dr. Michael Chen', role: 'Faculty Coordinator', type: 'faculty' },
        { id: 2, name: 'Dr. Sarah Johnson', role: 'Faculty', type: 'faculty' },
        { id: 3, name: 'Prof. James Wilson', role: 'Faculty', type: 'faculty' },
        { id: 4, name: 'Batch 2023 Representative', role: 'Student Leader', type: 'student' },
        { id: 5, name: '120 Students', role: 'Enrolled', type: 'student' }
    ];

    const resources = [
        { id: 1, title: 'Semester Syllabus & Course Outline', type: 'PDF', downloads: 245 },
        { id: 2, title: 'Examination Pattern & Guidelines', type: 'PDF', downloads: 189 },
        { id: 3, title: 'Class Timetable', type: 'PDF', downloads: 312 },
        { id: 4, title: 'Reference Books List', type: 'Document', downloads: 156 }
    ];

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

            {/* Semester Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{semesterData.semester}</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{semesterData.batch} • {semesterData.department}</p>
                    </div>
                    <Badge variant="secondary">{semesterData.academicYear}</Badge>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Start Date</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{new Date(semesterData.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">End Date</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{new Date(semesterData.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Total Credits</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{semesterData.credits}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Students</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{semesterData.totalStudents}</p>
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
                            onClick={() => setActiveTab('classes')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'classes'
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Classes
                        </button>
                        <button
                            onClick={() => setActiveTab('announcements')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'announcements'
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <AlertCircle className="w-4 h-4" />
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveTab('schedule')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'schedule'
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Schedule
                        </button>
                        <button
                            onClick={() => setActiveTab('resources')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'resources'
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
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
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Members
                        </button>
                    </div>

                    {/* Classes Tab */}
                    {activeTab === 'classes' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    {semesterData.totalClasses} Courses • {semesterData.credits} Credits
                                </h3>
                            </div>
                            {classes.map(course => (
                                <div
                                    key={course.id}
                                    onClick={() => navigate(`/college-course/${course.id}`)}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50 flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <Badge variant="secondary">{course.code}</Badge>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{course.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{course.instructor}</p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Award className="w-3 h-3" />
                                                    {course.credits} Credits
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {course.students} Students
                                                </span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                                    Active
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Announcements Tab */}
                    {activeTab === 'announcements' && (
                        <div className="space-y-4">
                            {announcements.map(ann => (
                                <div
                                    key={ann.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all border-l-4"
                                    style={{
                                        borderLeftColor: ann.priority === 'high' ? '#EF4444' :
                                                       ann.priority === 'medium' ? '#F59E0B' : '#10B981'
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 flex-shrink-0 w-3 h-3 rounded-full ${
                                            ann.priority === 'high' ? 'bg-red-500' :
                                            ann.priority === 'medium' ? 'bg-amber-500' :
                                            'bg-green-500'
                                        }`} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white">{ann.title}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                    ann.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                                                    ann.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                                                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                }`}>
                                                    {ann.priority.charAt(0).toUpperCase() + ann.priority.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{ann.content}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">{ann.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Schedule Tab */}
                    {activeTab === 'schedule' && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                    Important Dates
                                </h3>
                            </div>
                            <div className="space-y-0">
                                {scheduleHighlights.map((event, idx) => (
                                    <div key={idx} className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: event.color }}
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 dark:text-white">{event.event}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {resources.map(resource => (
                                <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{resource.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{resource.type}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                        📥 {resource.downloads} downloads
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div className="space-y-4">
                            {members.map(member => (
                                <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                                            member.type === 'faculty'
                                                ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                                                : 'bg-gradient-to-br from-blue-400 to-blue-600'
                                        }`}>
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{member.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Semester Info */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-purple-600" />
                            Quick Stats
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Courses</span>
                                <span className="font-bold text-gray-900 dark:text-white">{semesterData.totalClasses}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Credits</span>
                                <span className="font-bold text-gray-900 dark:text-white">{semesterData.credits}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Enrolled Students</span>
                                <span className="font-bold text-gray-900 dark:text-white">{semesterData.totalStudents}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-2">Exam Date</p>
                                <p className="font-bold text-gray-900 dark:text-white">{new Date(semesterData.examDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <Button variant="primary" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Join Semester
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CollegeSemesterGroup;
