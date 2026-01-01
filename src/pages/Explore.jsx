import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Briefcase, Users } from 'lucide-react';
import careersData from '../data/careers.json';
import universityData from '../data/university.json';
import usersData from '../data/users.json';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

/**
 * Explore Page
 * Discover the three main feature categories
 */
const Explore = () => {
    const navigate = useNavigate();
    const { toggleFollow, followingUsers } = useApp();
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'academia', label: 'My Academia', icon: GraduationCap, path: '/academia' },
        { id: 'careers', label: 'Careers', icon: Briefcase, path: '/careers' },
        { id: 'mentors', label: 'Mentors', icon: Users, path: '/mentors' },
    ];

    const filteredCareers = careersData.filter(career =>
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCourses = universityData.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMentors = usersData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search careers, courses, people..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer group"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg sm:rounded-xl group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                                <tab.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0 lg:hidden">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                                    {tab.label}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                                    Explore {tab.label.toLowerCase()}
                                </p>
                            </div>
                        </div>
                        <Button variant="primary" fullWidth size="sm" className="text-sm">
                            View {tab.label}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Quick Preview Sections */}
            <div className="space-y-6 sm:space-y-8">
                {/* Academia Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">My Academia</h2>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate('/academia')}>
                            View All
                        </Button>
                    </div>
                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredCourses.slice(0, 2).map((course) => (
                                <div
                                    key={course.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer"
                                    onClick={() => navigate('/academia')}
                                >
                                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                                {course.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                {course.department}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" size="sm">{course.credits} Credits</Badge>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                                        Instructor: {course.instructor}
                                    </p>
                                    <span className="text-primary-600 font-semibold text-sm">
                                        {course.schedule}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Careers Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Featured Careers</h2>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate('/careers')}>
                            View All
                        </Button>
                    </div>
                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredCareers.slice(0, 2).map((career) => (
                                <div
                                    key={career.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer"
                                    onClick={() => navigate('/careers')}
                                >
                                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                                {career.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                {career.category}
                                            </p>
                                        </div>
                                        <Badge variant="success" size="sm">{career.growth}</Badge>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                                        {career.description}
                                    </p>
                                    <span className="text-primary-600 font-semibold text-sm">
                                        {career.salaryRange}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mentors Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Featured Mentors</h2>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate('/mentors')}>
                            View All
                        </Button>
                    </div>
                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredMentors.slice(0, 2).map((mentor) => (
                                <div
                                    key={mentor.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer"
                                    onClick={() => navigate('/mentors')}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <Avatar src={mentor.avatar} alt={mentor.name} size="md" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                                {mentor.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                {mentor.title}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 line-clamp-2">
                                                {mentor.bio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
