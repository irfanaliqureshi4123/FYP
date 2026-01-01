import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Briefcase, Users, FileText, ArrowLeft } from 'lucide-react';
import postsData from '../../data/posts.json';
import usersData from '../../data/users.json';
import careersData from '../../data/careers.json';
import PostCard from '../../components/posts/PostCard';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

/**
 * Highlight search query in text
 */
const HighlightedText = ({ text, query }) => {
    if (!query.trim()) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <mark key={i} className="bg-yellow-300 dark:bg-yellow-600 text-gray-900 dark:text-white font-semibold rounded px-1">
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

/**
 * Search Results Page with Tabs
 * Displays search results organized by Posts, People, and Careers
 */
const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const { toggleFollow, followingUsers } = useApp();
    const query = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(query);
    const [activeTab, setActiveTab] = useState('posts');

    // Filter results based on search query
    const results = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase().trim();

        if (!lowerQuery) {
            return { posts: [], users: [], careers: [] };
        }

        return {
            posts: postsData.filter(post =>
                post.content.toLowerCase().includes(lowerQuery) ||
                post.hashtags?.some(tag => tag.toLowerCase().includes(lowerQuery))
            ),
            users: usersData.filter(user =>
                user.name.toLowerCase().includes(lowerQuery) ||
                user.username.toLowerCase().includes(lowerQuery) ||
                user.title.toLowerCase().includes(lowerQuery)
            ),
            careers: careersData.filter(career =>
                career.title.toLowerCase().includes(lowerQuery) ||
                career.category.toLowerCase().includes(lowerQuery) ||
                career.description.toLowerCase().includes(lowerQuery)
            ),
        };
    }, [searchQuery]);

    const totalResults = results.posts.length + results.users.length + results.careers.length;

    const tabs = [
        { id: 'posts', label: 'Posts', icon: FileText, count: results.posts.length },
        { id: 'people', label: 'People', icon: Users, count: results.users.length },
        { id: 'careers', label: 'Careers', icon: Briefcase, count: results.careers.length },
    ];

    return (
        <div className="space-y-6">
            {/* Header with Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm sticky top-20 z-20">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </Link>

                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search posts, people, careers..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            autoFocus
                        />
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {searchQuery.trim() ? (
                totalResults > 0 ? (
                    <div className="space-y-6">
                        {/* Results Count */}
                        <div className="px-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for "<span className="font-semibold text-primary-600">{searchQuery}</span>"
                            </p>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                            <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-thin">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50 dark:bg-primary-900/10'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        {tab.label}
                                        <span className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-gray-200 dark:bg-gray-700">
                                            {tab.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {/* Posts Tab */}
                                {activeTab === 'posts' && (
                                    <div className="space-y-4">
                                        {results.posts.length > 0 ? (
                                            results.posts.map((post) => (
                                                <PostCard key={post.id} post={post} searchQuery={searchQuery} />
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-600 dark:text-gray-400">No posts found matching your search</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* People Tab */}
                                {activeTab === 'people' && (
                                    <div>
                                        {results.users.length > 0 ? (
                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                {results.users.map((user) => (
                                                    <Link
                                                        key={user.id}
                                                        to={`/profile/${user.username}`}
                                                        className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg dark:hover:shadow-lg/20 transition-all hover:scale-105"
                                                    >
                                                        <div className="flex flex-col items-center text-center">
                                                            <Avatar src={user.avatar} alt={user.name} size="lg" className="mb-4" />
                                                            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
                                                                <HighlightedText text={user.name} query={searchQuery} />
                                                            </h3>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                @<HighlightedText text={user.username} query={searchQuery} />
                                                            </p>
                                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                                                                <HighlightedText text={user.title} query={searchQuery} />
                                                            </p>
                                                            <Button
                                                                variant={followingUsers.includes(user.id) ? 'outline' : 'primary'}
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    toggleFollow(user.id);
                                                                }}
                                                            >
                                                                {followingUsers.includes(user.id) ? 'Following' : 'Follow'}
                                                            </Button>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-600 dark:text-gray-400">No people found matching your search</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Careers Tab */}
                                {activeTab === 'careers' && (
                                    <div>
                                        {results.careers.length > 0 ? (
                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                {results.careers.map((career) => (
                                                    <div
                                                        key={career.id}
                                                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg dark:hover:shadow-lg/20 transition-all hover:scale-105"
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex-1">
                                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                                    <HighlightedText text={career.title} query={searchQuery} />
                                                                </h3>
                                                                <Badge
                                                                    variant={
                                                                        career.category.toLowerCase().includes(searchQuery.toLowerCase())
                                                                            ? 'primary'
                                                                            : 'secondary'
                                                                    }
                                                                    size="sm"
                                                                    className="inline-block"
                                                                >
                                                                    {career.category}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                                            <HighlightedText text={career.description} query={searchQuery} />
                                                        </p>
                                                        <div className="space-y-2 mb-4">
                                                            <div className="flex justify-between items-center text-sm">
                                                                <span className="text-gray-600 dark:text-gray-400">Salary Range</span>
                                                                <span className="font-semibold text-gray-900 dark:text-white">{career.salaryRange}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-sm">
                                                                <span className="text-gray-600 dark:text-gray-400">Growth</span>
                                                                <span
                                                                    className={`font-semibold ${
                                                                        career.jobGrowth > 20
                                                                            ? 'text-green-600'
                                                                            : career.jobGrowth > 10
                                                                            ? 'text-yellow-600'
                                                                            : 'text-red-600'
                                                                    }`}
                                                                >
                                                                    {career.jobGrowth}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {career.skills?.slice(0, 3).map((skill) => (
                                                                <Badge key={skill} variant="secondary" size="sm">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <Button variant="outline" size="sm" fullWidth>
                                                            Learn More
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-600 dark:text-gray-400">No careers found matching your search</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Search className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                            We couldn't find any posts, people, or careers matching "<span className="font-semibold">{searchQuery}</span>". Try a different search term.
                        </p>
                    </div>
                )
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start searching</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                        Search for posts, people, careers, and more. Type something above to get started.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
