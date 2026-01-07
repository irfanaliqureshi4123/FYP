import React from 'react';
import { GraduationCap, Award, ArrowLeft, Users, Clock, BookOpen, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import universityData from '../../data/universities.json';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

/**
 * My Academia Page
 * University degree programs and courses
 */
const Academia = () => {
    const navigate = useNavigate();

    const academiaCategories = [
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

    const enrolledCourses = [
        {
            id: 1,
            title: 'Introduction to Computer Science',
            department: 'Computer Science',
            credits: 3,
            instructor: 'Dr. Sarah Johnson',
            schedule: 'Mon/Wed 10:00-11:30 AM',
            status: 'In Progress'
        },
        {
            id: 2,
            title: 'Data Structures and Algorithms',
            department: 'Computer Science',
            credits: 4,
            instructor: 'Prof. Michael Chen',
            schedule: 'Tue/Thu 2:00-3:30 PM',
            status: 'In Progress'
        }
    ];

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

            {/* Featured Universities Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col xs:flex-col sm:flex-row sm:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 xs:gap-3">
                        <Award className="w-4 xs:w-5 h-4 xs:h-5 text-primary-600 flex-shrink-0" />
                        <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">Featured Universities</h2>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/university')} className="text-xs xs:text-sm whitespace-nowrap">
                        View All
                    </Button>
                </div>
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                        {universityData.slice(0, 4).map((uni) => (
                            <div
                                key={uni.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 xs:p-4 hover:shadow-md transition-all hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer"
                                onClick={() => navigate('/university')}
                            >
                                <h3 className="font-bold text-sm xs:text-base text-gray-900 dark:text-white mb-2 line-clamp-2">
                                    {uni.name}
                                </h3>
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{uni.description}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">Principal: {uni.principalName}</p>
                                <div className="flex items-center justify-between text-xs xs:text-sm text-gray-600 dark:text-gray-400 gap-2">
                                    <span className="flex items-center gap-1 min-w-0">
                                        <Users className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{uni.totalStudents} Students</span>
                                    </span>
                                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                                        Est. {uni.foundedYear}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col xs:flex-col sm:flex-row sm:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 xs:gap-3">
                        <BookOpen className="w-4 xs:w-5 h-4 xs:h-5 text-indigo-600 flex-shrink-0" />
                        <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">My Courses</h2>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {enrolledCourses.length} Enrolled
                    </Badge>
                </div>
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                        {enrolledCourses.map((course) => (
                            <div
                                key={course.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer group"
                            >
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{course.department}</p>
                                    </div>
                                    <Badge variant="primary" className="text-xs flex-shrink-0">
                                        {course.credits} Credits
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <User className="w-4 h-4 flex-shrink-0" />
                                        <span className="line-clamp-1">{course.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                        <span className="line-clamp-1">{course.schedule}</span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <Badge variant="secondary" className="text-xs">
                                        {course.status}
                                    </Badge>
                                    <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                                        View Details →
                                    </button>
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