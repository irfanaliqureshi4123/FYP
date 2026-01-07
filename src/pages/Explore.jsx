import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Briefcase, BookOpen, Sparkles, Heart, Map, MessageCircle } from 'lucide-react';
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
        { id: 'counselling', label: 'Career Counselling', icon: Briefcase, path: '/counselling', description: 'Professional guidance and insights' },
        { id: 'ai-chat', label: 'AI Chat', icon: MessageCircle, path: '/ai-chat', description: 'AI chatbot & recommendations' },
        { id: 'ai-tools', label: 'AI Tools', icon: Sparkles, path: '/ai-tools', description: 'Resume building & interview prep' },
        { id: 'wellbeing', label: 'Wellbeing', icon: Heart, path: '/wellbeing', description: 'Digital wellness & balance' },
        { id: 'roadmaps', label: 'Roadmaps', icon: Map, path: '/roadmap', description: 'Personalized career paths' },
        { id: 'resources', label: 'Resources', icon: BookOpen, path: '/resources', description: 'Free and paid learning materials' },
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
        </div>
    );
};

export default Explore;
