import React, { useState } from 'react';
import { Briefcase, ArrowLeft, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import careersData from '../data/careers.json';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

/**
 * Careers Page
 * Career exploration and job opportunities
 */
const Careers = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(careersData.map(career => career.category))];

    const filteredCareers = careersData.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            career.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            career.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
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
                    <Briefcase className="w-8 h-8 text-primary-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Careers</h1>
                        <p className="text-gray-600 dark:text-gray-400">Explore career opportunities and professional paths</p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search careers..."
                            className="w-full pl-4 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
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

            {/* Careers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCareers.map((career) => (
                    <div key={career.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{career.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{career.category}</p>
                                <Badge variant="success" className="text-xs">
                                    <TrendingUp className="w-3 h-3 inline mr-1" />
                                    {career.growth}
                                </Badge>
                            </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {career.description}
                        </p>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    Salary Range:
                                </span>
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    {career.salaryRange}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    Location:
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {career.location || 'Various'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                            {career.skills.slice(0, 4).map((skill, index) => (
                                <Badge key={index} size="sm" variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                            {career.skills.length > 4 && (
                                <Badge size="sm" variant="outline">
                                    +{career.skills.length - 4} more
                                </Badge>
                            )}
                        </div>

                        <Button variant="primary" fullWidth>
                            Learn More
                        </Button>
                    </div>
                ))}
            </div>

            {filteredCareers.length === 0 && (
                <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No careers found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Careers;
