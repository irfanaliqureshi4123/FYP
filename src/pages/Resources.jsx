import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Clock, DollarSign, Tag, Filter, BookOpen, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import resourcesData from '../data/resources.json';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Toast from '../components/common/Toast';

const Resources = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const [toast, setToast] = useState(null);
    const [savedResources, setSavedResources] = useState([]);

    const categories = ['All', 'Technology', 'Design', 'Business', 'Data Science', 'Finance', 'Languages'];
    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    const priceOptions = ['All', 'Free', 'Paid'];

    const filteredResources = resourcesData.filter(resource => {
        const matchesSearch = 
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.platform.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
        const matchesLevel = selectedLevel === 'All' || resource.level === selectedLevel;
        
        let matchesPrice = true;
        if (priceFilter === 'Free') matchesPrice = resource.free;
        if (priceFilter === 'Paid') matchesPrice = !resource.free;

        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    const handleEnroll = (resource) => {
        setToast({
            type: 'success',
            message: `Enrolled in "${resource.title}"!`
        });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = (resource) => {
        if (savedResources.includes(resource.id)) {
            setSavedResources(savedResources.filter(id => id !== resource.id));
            setToast({
                type: 'info',
                message: `Removed from saved`
            });
        } else {
            setSavedResources([...savedResources, resource.id]);
            setToast({
                type: 'success',
                message: `Added to saved resources`
            });
        }
        setTimeout(() => setToast(null), 2000);
    };

    const stats = [
        { label: 'Courses Available', value: resourcesData.length },
        { label: 'Free Courses', value: resourcesData.filter(r => r.free).length },
        { label: 'Learning Platforms', value: new Set(resourcesData.map(r => r.platform)).size },
        { label: 'Avg Rating', value: (resourcesData.reduce((sum, r) => sum + r.rating, 0) / resourcesData.length).toFixed(1) }
    ];

    return (
        <div className="space-y-4 xs:space-y-5 sm:space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                    <button
                        onClick={() => navigate('/explore')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Resources</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Discover courses, tutorials, and learning materials</p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses, platforms..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                </h3>
                
                <div className="space-y-4">
                    {/* Category Filter */}
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</p>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Level Filter */}
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</p>
                        <div className="flex flex-wrap gap-2">
                            {levels.map(level => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedLevel === level
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</p>
                        <div className="flex flex-wrap gap-2">
                            {priceOptions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => setPriceFilter(option)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        priceFilter === option
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 px-4">
                Showing <span className="font-semibold">{filteredResources.length}</span> resources
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {filteredResources.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No resources found matching your filters</p>
                    </div>
                ) : (
                    filteredResources.map((resource) => (
                        <div
                            key={resource.id}
                            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                        >
                            <div className="p-4 sm:p-5">
                                {/* Header */}
                                <div className="mb-3">
                                    <div className="flex items-start gap-2 mb-2">
                                        <Badge variant="primary" size="sm">{resource.category}</Badge>
                                        {resource.free && (
                                            <Badge variant="success" size="sm">Free</Badge>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2">{resource.title}</h3>
                                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">{resource.platform}</p>
                                </div>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{resource.description}</p>

                                {/* Meta Info */}
                                <div className="space-y-2 mb-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{resource.rating} ({resource.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <span>{resource.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-gray-900 dark:text-white font-semibold">
                                            {resource.free ? 'Free' : `$${resource.price}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Level Badge */}
                                <div className="mb-4 inline-block">
                                    <Badge 
                                        variant={resource.level === 'Beginner' ? 'success' : resource.level === 'Intermediate' ? 'primary' : 'danger'} 
                                        size="sm"
                                    >
                                        {resource.level}
                                    </Badge>
                                </div>

                                {/* Skills */}
                                <div className="mb-4 flex flex-wrap gap-1">
                                    {resource.skills.slice(0, 3).map(skill => (
                                        <span key={skill} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                    {resource.skills.length > 3 && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                                            +{resource.skills.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button onClick={() => handleEnroll(resource)} className="flex-1 text-sm">
                                        Enroll
                                    </Button>
                                    <button
                                        onClick={() => handleSave(resource)}
                                        className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                                            savedResources.includes(resource.id)
                                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200'
                                        }`}
                                    >
                                        {savedResources.includes(resource.id) ? '✓ Saved' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Featured Learning Platforms */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-200 dark:border-gray-600">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Popular Learning Platforms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {['Udemy', 'Coursera', 'LinkedIn Learning', 'Udacity', 'edX', 'Skillshare'].map(platform => (
                        <div key={platform} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                            {platform}
                        </div>
                    ))}
                </div>
            </div>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default Resources;
