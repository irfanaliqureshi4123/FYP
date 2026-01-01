import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import universityData from '../../data/university.json';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

/**
 * My Academia Page
 * Educational journey through School, College, and University
 */
const Academia = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const academiaCategories = [
        {
            id: 'school',
            label: 'My School',
            icon: BookOpen,
            path: '/school',
            description: 'High school classes and courses',
            color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
            count: '6 Classes',
            preview: 'Mathematics, English, Science, and more'
        },
        {
            id: 'college',
            label: 'My College',
            icon: GraduationCap,
            path: '/college',
            description: 'Undergraduate programs and courses',
            color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
            count: '6 Courses',
            preview: 'Business, Mathematics, Literature, and more'
        },
        {
            id: 'university',
            label: 'My University',
            icon: Award,
            path: '/university',
            description: 'Advanced degree programs',
            color: 'bg-green-50 dark:bg-green-900/20 text-green-600',
            count: universityData.length + ' Courses',
            preview: 'Computer Science, Mathematics, Business'
        }
    ];

    const filteredCourses = universityData.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-3 sm:space-y-6 md:space-y-8">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start xs:items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
                    <button
                        onClick={() => navigate('/explore')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Go back to Explore"
                    >
                        <ArrowLeft className="w-4 xs:w-5 h-4 xs:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <GraduationCap className="w-6 xs:w-8 h-6 xs:h-8 text-primary-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">My Academia</h1>
                        <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">Your educational journey from school to university</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses..."
                        className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                </div>
            </div>

            {/* Three Main Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {academiaCategories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => navigate(category.path)}
                        className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl lg:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer group w-full overflow-hidden flex flex-col h-full"
                    >
                        <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4">
                            <div className={`p-2 xs:p-3 rounded-lg ${category.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                                <category.icon className="w-5 xs:w-6 h-5 xs:h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate leading-tight">
                                    {category.label}
                                </h3>
                                <Badge variant="secondary" className="text-xs mt-1 inline-block whitespace-nowrap">
                                    {category.count}
                                </Badge>
                            </div>
                        </div>

                        {/* Description - Hidden on tablet and desktop */}
                        <div className="mb-3 xs:mb-4 sm:hidden flex-grow">
                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                                {category.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
                                {category.preview}
                            </p>
                        </div>

                        <Button variant="primary" fullWidth size="sm" className="text-xs xs:text-sm mt-auto">
                            Explore {category.label.split(' ')[2]}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Featured University Courses Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col xs:flex-col sm:flex-row sm:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 xs:gap-3">
                        <Award className="w-4 xs:w-5 h-4 xs:h-5 text-primary-600 flex-shrink-0" />
                        <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">Featured University Courses</h2>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/university')} className="text-xs xs:text-sm whitespace-nowrap">
                        View All
                    </Button>
                </div>
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                        {filteredCourses.slice(0, 4).map((course) => (
                            <div
                                key={course.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 xs:p-4 hover:shadow-md transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer"
                                onClick={() => navigate('/university')}
                            >
                                <h3 className="font-bold text-sm xs:text-base text-gray-900 dark:text-white mb-2 line-clamp-2">
                                    {course.title}
                                </h3>
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">{course.department}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">Instructor: {course.instructor}</p>
                                <div className="flex items-center justify-between text-xs xs:text-sm text-gray-600 dark:text-gray-400 gap-2">
                                    <span className="flex items-center gap-1 min-w-0">
                                        <Clock className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{course.schedule.split(' ')[0]}</span>
                                    </span>
                                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                                        {course.credits} Creds
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Academia;