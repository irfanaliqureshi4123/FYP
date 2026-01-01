import React, { useState } from 'react';
import { Users, ArrowLeft, MessageCircle, Star, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import usersData from '../../data/users.json';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

/**
 * Mentors Page
 * Connect with mentors, teachers, and professionals
 */
const Mentors = () => {
    const navigate = useNavigate();
    const { toggleFollow, followingUsers } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter users to show only those who can be mentors (have relevant titles)
    const mentorUsers = usersData.filter(user =>
        user.title && (
            user.title.toLowerCase().includes('professor') ||
            user.title.toLowerCase().includes('doctor') ||
            user.title.toLowerCase().includes('engineer') ||
            user.title.toLowerCase().includes('developer') ||
            user.title.toLowerCase().includes('manager') ||
            user.title.toLowerCase().includes('lead') ||
            user.title.toLowerCase().includes('senior') ||
            user.title.toLowerCase().includes('teacher') ||
            user.title.toLowerCase().includes('instructor')
        )
    );

    const categories = ['All', ...new Set(mentorUsers.map(mentor => mentor.title.split(' ')[0]))];

    const filteredMentors = mentorUsers.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || mentor.title.toLowerCase().startsWith(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => navigate('/explore')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Go back to Explore"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <Users className="w-8 h-8 text-primary-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mentors</h1>
                        <p className="text-gray-600 dark:text-gray-400">Connect with teachers, professors, and industry professionals</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search mentors..."
                            className="w-full pl-4 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.slice(0, 8).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === category
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                    <div key={mentor.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4 mb-4">
                            <Avatar src={mentor.avatar} alt={mentor.name} size="lg" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{mentor.name}</h3>
                                        <p className="text-sm text-primary-600 font-medium">{mentor.title}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {Math.floor(Math.random() * 2) + 4}.{Math.floor(Math.random() * 9) + 1}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <Award className="w-3 h-3" />
                                        <span>{Math.floor(Math.random() * 50) + 10} mentees</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <BookOpen className="w-3 h-3" />
                                        <span>{Math.floor(Math.random() * 20) + 5} years exp.</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                    {mentor.bio}
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {mentor.skills?.slice(0, 3).map((skill, index) => (
                                        <Badge key={index} size="sm" variant="secondary">
                                            {skill}
                                        </Badge>
                                    )) || (
                                        <>
                                            <Badge size="sm" variant="secondary">Leadership</Badge>
                                            <Badge size="sm" variant="secondary">Mentoring</Badge>
                                            <Badge size="sm" variant="secondary">Expertise</Badge>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant={followingUsers.includes(mentor.id) ? "outline" : "primary"}
                                        size="sm"
                                        onClick={() => toggleFollow(mentor.id)}
                                        className="flex-1"
                                    >
                                        {followingUsers.includes(mentor.id) ? 'Following' : 'Follow'}
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        Message
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMentors.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No mentors found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Mentors;
