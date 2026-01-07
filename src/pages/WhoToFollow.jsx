import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import usersData from '../data/users.json';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

/**
 * Who to Follow Page
 * Display all users with follow/unfollow functionality
 */
const WhoToFollow = () => {
    const navigate = useNavigate();
    const { followingUsers, toggleFollow } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('all'); // all, following, notFollowing

    // Filter users based on search and sort
    const filteredUsers = usersData
        .filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.skills && user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));

            if (sortBy === 'following') {
                return matchesSearch && followingUsers.includes(user.id);
            } else if (sortBy === 'notFollowing') {
                return matchesSearch && !followingUsers.includes(user.id);
            }
            return matchesSearch;
        })
        .sort((a, b) => {
            // Sort: following users first, then alphabetically
            const aFollowing = followingUsers.includes(a.id);
            const bFollowing = followingUsers.includes(b.id);
            if (aFollowing !== bFollowing) {
                return aFollowing ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Who to Follow</h1>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by name, title, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-600"
                        >
                            <option value="all">All Users ({usersData.length})</option>
                            <option value="following">Following ({followingUsers.length})</option>
                            <option value="notFollowing">Not Following ({usersData.length - followingUsers.length})</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Users List */}
            <div className="max-w-2xl mx-auto">
                {filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            {searchTerm ? 'No users found matching your search.' : 'No users available.'}
                        </p>
                        {searchTerm && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSearchTerm('')}
                                className="mt-4"
                            >
                                Clear Search
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <Avatar src={user.avatar} alt={user.name} size="lg" />

                                    {/* User Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
                                                    {user.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {user.title}
                                                </p>
                                            </div>
                                            <Button
                                                variant={followingUsers.includes(user.id) ? 'secondary' : 'primary'}
                                                onClick={() => toggleFollow(user.id)}
                                                className="whitespace-nowrap"
                                            >
                                                {followingUsers.includes(user.id) ? 'Following' : 'Follow'}
                                            </Button>
                                        </div>

                                        {/* Bio */}
                                        {user.bio && (
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                                {user.bio}
                                            </p>
                                        )}

                                        {/* Skills */}
                                        {user.skills && user.skills.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {user.skills.slice(0, 5).map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {user.skills.length > 5 && (
                                                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                        +{user.skills.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Stats */}
                                        <div className="mt-3 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                                            <span>{user.followers || 0} followers</span>
                                            <span>{user.posts || 0} posts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Results Count */}
                {filteredUsers.length > 0 && (
                    <div className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredUsers.length} of {usersData.length} users
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhoToFollow;
