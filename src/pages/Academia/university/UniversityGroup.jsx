import React, { useState } from 'react';
import { Users, MessageSquare, FileText, ArrowLeft, Search, Plus, Bell, Calendar, BookOpen, Building2, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import universityDepartmentsData from '../../../data/universityDepartments.json';
import universityPostsData from '../../../data/universityPosts.json';
import universitiesData from '../../../data/universities.json';

/**
 * University Departments List & Detail Page
 * Shows all departments of a university as cards with explore button
 * When departmentId is provided, shows department details with tabs
 * Structure: University → Departments → (Explore to see batch/semester details)
 */
const UniversityGroup = () => {
    const navigate = useNavigate();
    const { universityId, departmentId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('discussion');

    // Find university and departments
    const university = universitiesData.find(u => u.id === universityId) || universitiesData[0];
    const departments = universityDepartmentsData.filter(d => d.universityId === universityId);
    const department = departmentId ? universityDepartmentsData.find(d => d.id === departmentId) : null;
    const departmentPosts = department ? universityPostsData.filter(p => p.departmentId === department.id) : [];

    // Sample data for announcements, members, resources, and batches
    const sampleAnnouncements = [
        {
            id: 1,
            title: 'Research Conference Announcement',
            content: 'Annual research conference will be held in February. Faculty and research scholars are invited to present their work. Registration deadline: January 25, 2025.',
            priority: 'high',
            author: 'Department Office',
            timestamp: '3 days ago'
        },
        {
            id: 2,
            title: 'Thesis Submission Guidelines',
            content: 'Updated thesis submission guidelines have been released. Please review the new formatting requirements and submit your thesis accordingly.',
            priority: 'medium',
            author: 'Graduate Coordinator',
            timestamp: '1 week ago'
        },
        {
            id: 3,
            title: 'Guest Lecture by Renowned Scholar',
            content: 'Dr. Emma Wilson from Oxford University will deliver a guest lecture on advanced research methodologies. All interested students welcome.',
            priority: 'low',
            author: 'Department Head',
            timestamp: '2 weeks ago'
        }
    ];

    const sampleMembers = [
        { id: 1, name: 'Prof. Robert Johnson', role: 'Dean', joinedDate: '2019-01-15' },
        { id: 2, name: 'Dr. Alice Williams', role: 'Faculty', joinedDate: '2020-07-01' },
        { id: 3, name: 'Prof. Michael Brown', role: 'Faculty', joinedDate: '2021-01-15' },
        { id: 4, name: 'Dr. Sarah Davis', role: 'Faculty', joinedDate: '2021-08-15' },
        { id: 5, name: 'Batch 2023 Representative', role: 'Student Leader', joinedDate: '2023-08-01' },
        { id: 6, name: 'Research Scholar 1', role: 'Research Scholar', joinedDate: '2023-09-01' }
    ];

    const sampleResources = [
        { id: 1, title: 'Advanced Research Methodologies', type: 'PDF', size: '5.2 MB', downloads: 456 },
        { id: 2, title: 'Statistical Analysis Guide', type: 'PDF', size: '3.8 MB', downloads: 312 },
        { id: 3, title: 'Literature Review Template', type: 'Document', size: '2.1 MB', downloads: 528 },
        { id: 4, title: 'Thesis Writing Best Practices', type: 'PDF', size: '4.5 MB', downloads: 389 }
    ];

    const sampleBatches = [
        {
            id: 'batch-1',
            year: '2023-2027',
            name: 'Batch 2023',
            studentCount: 180,
            semesters: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7']
        },
        {
            id: 'batch-2',
            year: '2022-2026',
            name: 'Batch 2022',
            studentCount: 175,
            semesters: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6']
        },
        {
            id: 'batch-3',
            year: '2021-2025',
            name: 'Batch 2021',
            studentCount: 172,
            semesters: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5']
        }
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Back Button */}
            <div className="flex items-center mb-2 px-2 sm:px-0">
                <button
                    onClick={() => navigate('/university')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2"
                    aria-label="Go back to universities"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Back to Universities</span>
            </div>

            {/* Show department list view if no departmentId is provided */}
            {!departmentId && (
                <>
                    {/* University Header */}
                    <div className="relative">
                        {/* Cover Image */}
                        <div className="w-full h-40 sm:h-56 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg sm:rounded-xl" />

                        {/* University Info Card */}
                        <div className="mx-2 sm:mx-4 md:mx-0 -mt-12 sm:-mt-16 relative z-10 mb-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{university.name}</h1>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Departments</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Building2 className="w-4 h-4" />
                                                {departments.length} Departments
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <Users className="w-4 h-4" />
                                                {university.totalStudents} Students
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
                            className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
                                    <div className="flex items-start justify-between gap-2 xs:gap-3 mb-2 xs:mb-3">
                                        <div className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 rounded-lg xs:rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-lg xs:text-xl">
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
                                        onClick={() => navigate(`/university-group/${universityId}/${dept.id}`)}
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

                    {/* No results message */}
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

            {/* Show department details view if departmentId is provided */}
            {departmentId && department && (
                <div className="mt-8 space-y-4">
                    <hr className="border-gray-200 dark:border-gray-700" />

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

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Column - Tab Content */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Tabs */}
                            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('discussion')}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                        activeTab === 'discussion'
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
                                    <Bell className="w-4 h-4" />
                                    Announcements
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

                            {/* Discussion Tab */}
                            {activeTab === 'discussion' && (
                                <div className="space-y-4">
                                    {/* Create Post */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex-shrink-0" />
                                            <input
                                                type="text"
                                                placeholder="Start a discussion..."
                                                className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Department Posts */}
                                    {departmentPosts.map(post => (
                                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
                                                        <button className="hover:text-indigo-600 transition-colors">👍 {post.likes}</button>
                                                        <button className="hover:text-indigo-600 transition-colors">💬 {post.comments}</button>
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
                                            {sampleAnnouncements.map(announcement => (
                                                <div key={announcement.id} className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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
                                                <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
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
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
                        </div>

                        {/* Right Column - Batches & Semesters */}
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
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
                                                        onClick={() => navigate(`/university-semester/${universityId}/${department.id}/${batch.id}/${idx}`)}
                                                        className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniversityGroup;
