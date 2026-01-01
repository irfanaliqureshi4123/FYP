import React, { useState } from 'react';
import { 
    ArrowLeft, Calendar, Users, BookOpen, AlertCircle, FileText,
    Clock, Building2, ChevronRight, Plus, Zap, Award
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

/**
 * University Semester Group Page
 * Semester-level community space for universities
 * Hierarchy: Department → Batch → Semester → Courses
 */
const UniversitySemesterGroup = () => {
    const navigate = useNavigate();
    const { batchId, semesterId } = useParams();
    const [activeTab, setActiveTab] = useState('classes');

    // Sample semester data
    const semesterData = {
        id: semesterId,
        batchId: batchId,
        semester: 'Semester 3',
        batch: 'Batch 2022',
        department: 'Physics',
        academicYear: '2024-2025',
        startDate: '2024-12-01',
        endDate: '2025-05-30',
        totalStudents: 95,
        totalCourses: 5,
        credits: 18,
        examDate: '2025-06-15'
    };

    const courses = [
        {
            id: 'course-1',
            code: 'PHYS501',
            name: 'Advanced Quantum Mechanics',
            professor: 'Dr. James Wilson',
            credits: 4,
            students: 38,
            status: 'active'
        },
        {
            id: 'course-2',
            code: 'PHYS502',
            name: 'Classical Mechanics',
            professor: 'Dr. Lisa Chen',
            credits: 3,
            students: 35,
            status: 'active'
        },
        {
            id: 'course-3',
            code: 'PHYS503',
            name: 'Electromagnetic Theory',
            professor: 'Prof. Marcus Taylor',
            credits: 4,
            students: 38,
            status: 'active'
        },
        {
            id: 'course-4',
            code: 'PHYS504',
            name: 'Thermodynamics & Statistical Mechanics',
            professor: 'Dr. Elena Rodriguez',
            credits: 4,
            students: 38,
            status: 'active'
        },
        {
            id: 'course-5',
            code: 'PHYS505',
            name: 'Physics Lab & Experiments',
            professor: 'Dr. Nicholas Park',
            credits: 3,
            students: 35,
            status: 'active'
        }
    ];

    const announcements = [
        {
            id: 1,
            title: 'Mid Semester Evaluation Schedule',
            content: 'Mid-semester evaluations will be conducted from February 1-10, 2025. Detailed exam schedules will be released by January 31.',
            priority: 'high',
            date: '2 days ago'
        },
        {
            id: 2,
            title: 'Research Paper Guidelines',
            content: 'All students are required to submit a research paper. Guidelines and format specifications are available in the Resources section.',
            priority: 'high',
            date: '5 days ago'
        },
        {
            id: 3,
            title: 'Laboratory Equipment Availability',
            content: 'All laboratory equipment has been updated. Lab sessions will run as per the timetable. Safety briefing mandatory.',
            priority: 'medium',
            date: '1 week ago'
        },
        {
            id: 4,
            title: 'Seminar Series: Recent Advances in Physics',
            content: 'Guest speakers from international universities will present on cutting-edge research. Attendance is encouraged.',
            priority: 'low',
            date: '2 weeks ago'
        }
    ];

    const scheduleHighlights = [
        { event: 'Mid Semester Evaluation', date: '2025-02-01', color: '#EF4444' },
        { event: 'Research Paper Deadline', date: '2025-04-15', color: '#F59E0B' },
        { event: 'Final Examination Period', date: '2025-06-01', color: '#EF4444' },
        { event: 'Semester Ends', date: '2025-05-30', color: '#10B981' }
    ];

    const members = [
        { id: 1, name: 'Dr. James Wilson', role: 'Semester Coordinator', type: 'faculty' },
        { id: 2, name: 'Dr. Lisa Chen', role: 'Faculty', type: 'faculty' },
        { id: 3, name: 'Prof. Marcus Taylor', role: 'Faculty', type: 'faculty' },
        { id: 4, name: 'Batch 2022 Representative', role: 'Student Leader', type: 'student' },
        { id: 5, name: '95 Students', role: 'Enrolled', type: 'student' }
    ];

    const resources = [
        { id: 1, title: 'Semester Course Outline & Syllabus', type: 'PDF', downloads: 312 },
        { id: 2, title: 'Examination Guidelines & Pattern', type: 'PDF', downloads: 245 },
        { id: 3, title: 'Class Schedule & Room Assignments', type: 'PDF', downloads: 289 },
        { id: 4, title: 'Research Paper Submission Guidelines', type: 'Document', downloads: 156 }
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
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            Courses
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
                            onClick={() => setActiveTab('schedule')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'schedule'
                                    ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
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

                    {/* Courses Tab */}
                    {activeTab === 'classes' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    {semesterData.totalCourses} Courses • {semesterData.credits} Credits
                                </h3>
                            </div>
                            {courses.map(course => (
                                <div
                                    key={course.id}
                                    onClick={() => navigate(`/university-course/${course.id}`)}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-900/50 flex items-center justify-center">
                                                    <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <Badge variant="secondary">{course.code}</Badge>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{course.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{course.professor}</p>
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
                                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
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
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
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
                                        <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
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
                                                ? 'bg-gradient-to-br from-indigo-400 to-indigo-600'
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
                            <Zap className="w-5 h-5 text-indigo-600" />
                            Quick Stats
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Courses</span>
                                <span className="font-bold text-gray-900 dark:text-white">{semesterData.totalCourses}</span>
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

export default UniversitySemesterGroup;
