import React, { useState } from 'react';
import { Users, MessageSquare, FileText, ArrowLeft, Search, Plus, Bell, Calendar, BookOpen, Building2, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import collegeDepartmentsData from '../../../data/collegeDepartments.json';
import collegePostsData from '../../../data/collegePosts.json';
import collegesData from '../../../data/colleges.json';

/**
 * College Department Group Page
 * Shows departments list if no departmentId, or department details if departmentId is provided
 */
const CollegeGroup = () => {
    const navigate = useNavigate();
    const { collegeId, departmentId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('discussion');

    // Find college and departments
    const college = collegesData.find(c => c.id === collegeId) || collegesData[0];
    const departments = collegeDepartmentsData.filter(d => d.collegeId === collegeId);
    const department = departmentId ? collegeDepartmentsData.find(d => d.id === departmentId) : null;
    const departmentPosts = department ? collegePostsData.filter(p => p.departmentId === department.id) : [];

    const sampleAnnouncements = [
        {
            id: 1,
            title: 'Semester Examinations Schedule',
            content: 'Final examinations will commence from January 15, 2025. All students must report to the exam center 30 minutes before the scheduled time.',
            priority: 'high',
            author: 'Department Office',
            timestamp: '2 days ago'
        },
        {
            id: 2,
            title: 'Project Submission Deadline Extended',
            content: 'The deadline for capstone project submission has been extended to January 20, 2025. Late submissions will not be accepted.',
            priority: 'medium',
            author: 'Academic Coordinator',
            timestamp: '5 days ago'
        },
        {
            id: 3,
            title: 'Department Seminar Series',
            content: 'Join us for an exciting seminar by industry experts on emerging technologies. Attendance is mandatory for all students.',
            priority: 'low',
            author: 'Department Head',
            timestamp: '1 week ago'
        }
    ];

    const sampleMembers = [
        { id: 1, name: 'Prof. Vikram Patel', role: 'Department Head', joinedDate: '2020-01-15' },
        { id: 2, name: 'Dr. Arjun Singh', role: 'Faculty', joinedDate: '2021-07-01' },
        { id: 3, name: 'Ms. Priya Sharma', role: 'Faculty', joinedDate: '2021-08-15' },
        { id: 4, name: 'Batch 2024 Representative', role: 'Class Rep', joinedDate: '2024-08-01' },
        { id: 5, name: 'Student 1', role: 'Student', joinedDate: '2024-08-01' },
        { id: 6, name: 'Student 2', role: 'Student', joinedDate: '2024-08-01' }
    ];

    const sampleResources = [
        { id: 1, title: 'Compiler Design Notes', type: 'PDF', size: '3.2 MB', downloads: 234 },
        { id: 2, title: 'Database Systems Tutorial', type: 'PDF', size: '2.8 MB', downloads: 189 },
        { id: 3, title: 'Algorithms Practice Problems', type: 'Document', size: '1.5 MB', downloads: 312 },
        { id: 4, title: 'Web Development Guide', type: 'PDF', size: '4.1 MB', downloads: 278 }
    ];

    const sampleBatches = [
        {
            id: 'batch-1',
            year: '2024-2028',
            name: 'Batch 2024',
            studentCount: 120,
            semesters: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']
        },
        {
            id: 'batch-2',
            year: '2023-2027',
            name: 'Batch 2023',
            studentCount: 115,
            semesters: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7']
        },
        {
            id: 'batch-3',
            year: '2022-2026',
            name: 'Batch 2022',
            studentCount: 118,
            semesters: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6']
        }
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Back Button */}
            <div className="flex items-center mb-2 px-2 sm:px-0">
                <button
                    onClick={() => navigate('/college')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2"
                    aria-label="Go back to colleges"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Back to Colleges</span>
            </div>

            {/* Show departments list if no departmentId */}
            {!departmentId && (
                <>
                    {/* College Header */}
                    <div className="relative">
                        <div className="w-full h-40 sm:h-56 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg sm:rounded-xl" />
                        <div className="mx-2 sm:mx-4 md:mx-0 -mt-12 sm:-mt-16 relative z-10 mb-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{college.name}</h1>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Departments</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Building2 className="w-4 h-4" />
                                                {departments.length} Departments
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Users className="w-4 h-4" />
                                                {college.totalStudents} Students
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 xs:w-5 h-4 xs:h-5 text-gray-400 flex-shrink-0" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search departments..."
                            className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    {/* Department Cards Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                        {departments.filter(dept => 
                            dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dept.description.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((dept) => (
                            <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
                                {/* Header */}
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                                    <div className="flex items-start justify-between gap-2 xs:gap-3 mb-2 xs:mb-3">
                                        <div className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 rounded-lg xs:rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-lg xs:text-xl">
                                            {dept.name.charAt(0)}
                                        </div>
                                        <Badge variant="secondary" className="text-xs whitespace-nowrap">Department</Badge>
                                    </div>
                                    <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-0.5 xs:mb-1 line-clamp-2">
                                        {dept.name}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                                        Headed by {dept.hod}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 flex-grow">
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                        {dept.description}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-3 grid grid-cols-2 gap-2 xs:gap-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Members</p>
                                        <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm">{dept.memberCount}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Batches</p>
                                        <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm">{dept.batches?.length || 0}</p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        onClick={() => navigate(`/college-group/${collegeId}/${dept.id}`)}
                                        className="w-full text-xs xs:text-sm"
                                        variant="primary"
                                        size="sm"
                                    >
                                        Explore Group
                                        <ChevronRight className="w-3 xs:w-4 h-3 xs:h-4 ml-1 xs:ml-2" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {departments.filter(dept => 
                        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        dept.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">No departments found matching your search.</p>
                        </div>
                    )}
                </>
            )}

            {/* Show department details if departmentId is provided */}
            {departmentId && department && (
                <div className="space-y-4">
                    {/* Department Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{department.name}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{department.description}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        {department.memberCount} Members
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        {department.batches?.length || 0} Batches
                                    </span>
                                </div>
                            </div>
                            <Button variant="primary" size="sm">
                                <Plus className="w-4 h-4 mr-1" />
                                Join Department
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('discussion')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeTab === 'discussion'
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
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
                                    ? 'text-purple-600 border-purple-600 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                            }`}
                        >
                            <Bell className="w-4 h-4" />
                            Announcements
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

                    {/* Discussion Tab */}
                    {activeTab === 'discussion' && (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Start a discussion..."
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            {departmentPosts.map(post => (
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
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Posted {post.timestamp}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{post.content}</p>
                                            <div className="flex items-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                <button className="hover:text-purple-600 transition-colors">👍 {post.likes}</button>
                                                <button className="hover:text-purple-600 transition-colors">💬 {post.comments}</button>
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
                                        Department Announcements
                                    </h3>
                                </div>
                                <div className="space-y-0">
                                    {sampleAnnouncements.map((announcement) => (
                                        <div key={announcement.id} className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-b-0">
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
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sampleResources.map(resource => (
                                <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer">
                                    <div className="flex items-start gap-3 mb-3">
                                        <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{resource.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{resource.type} • {resource.size}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">📥 {resource.downloads} downloads</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sampleMembers.map(member => (
                                <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{member.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Joined {new Date(member.joinedDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Batches Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-600" />
                            Batches & Semesters
                        </h3>
                        <div className="space-y-3">
                            {sampleBatches.map(batch => (
                                <div key={batch.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{batch.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{batch.year} • {batch.studentCount} students</p>
                                    <div className="flex flex-wrap gap-2">
                                        {batch.semesters.map((sem, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => navigate(`/college-semester/${collegeId}/${department.id}/${batch.id}/${idx}`)}
                                                className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                                            >
                                                {sem}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollegeGroup;
