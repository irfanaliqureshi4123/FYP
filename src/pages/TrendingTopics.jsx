import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Heart, MessageCircle, Share2 } from 'lucide-react';
import postsData from '../data/posts.json';
import usersData from '../data/users.json';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

/**
 * Trending Topics Page
 * Display trending hashtags and related posts
 */
const TrendingTopics = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [sortBy, setSortBy] = useState('trending'); // trending, recent, popular

    // Extract all hashtags from posts and count them
    const hashtagMap = useMemo(() => {
        const map = {};
        postsData.forEach((post) => {
            const hashtags = post.content.match(/#[\w]+/g) || [];
            hashtags.forEach((hashtag) => {
                if (!map[hashtag]) {
                    map[hashtag] = {
                        tag: hashtag,
                        posts: 0,
                        engagement: 0,
                        mentions: 0,
                    };
                }
                map[hashtag].posts += 1;
                map[hashtag].engagement += (post.likes || 0) + (post.comments || 0);
                map[hashtag].mentions += 1;
            });
        });
        return map;
    }, []);

    // Create trending topics array and sort
    const allTopics = useMemo(() => {
        let topics = Object.values(hashtagMap).map((topic) => ({
            ...topic,
            trendingScore: (topic.mentions * 2 + topic.posts),
        }));

        // Apply sorting
        if (sortBy === 'trending') {
            topics.sort((a, b) => b.trendingScore - a.trendingScore);
        } else if (sortBy === 'recent') {
            topics.sort((a, b) => b.mentions - a.mentions);
        } else if (sortBy === 'popular') {
            topics.sort((a, b) => b.engagement - a.engagement);
        }

        return topics;
    }, [hashtagMap, sortBy]);

    // Filter topics based on search
    const filteredTopics = useMemo(() => {
        return allTopics.filter((topic) =>
            topic.tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allTopics, searchTerm]);

    // Get posts for selected topic
    const topicPosts = useMemo(() => {
        if (!selectedTopic) return [];
        return postsData.filter((post) =>
            post.content.includes(selectedTopic.tag)
        );
    }, [selectedTopic]);

    // Get user info by ID
    const getUserInfo = (userId) => {
        return usersData.find((user) => user.id === userId);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Topics</h1>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search topics..."
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
                            <option value="trending">Trending</option>
                            <option value="popular">Popular</option>
                            <option value="recent">Recent</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6">
                {/* Topics List */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-24">
                        {filteredTopics.length === 0 ? (
                            <div className="p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400">
                                    {searchTerm ? 'No topics found.' : 'No trending topics.'}
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                                {filteredTopics.map((topic) => (
                                    <button
                                        key={topic.tag}
                                        onClick={() => setSelectedTopic(topic)}
                                        className={`w-full text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                            selectedTopic?.tag === topic.tag
                                                ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                                    {topic.tag}
                                                </p>
                                                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <span>{topic.posts} posts</span>
                                                    <span>{topic.engagement} engagement</span>
                                                </div>
                                            </div>
                                            {topic.trendingScore > 0 && (
                                                <div className="flex items-center gap-1 text-red-500 shrink-0">
                                                    <TrendingUp className="w-3 h-3" />
                                                    <span className="text-xs font-semibold">{Math.round(topic.trendingScore)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Posts Display */}
                <div className="md:col-span-2">
                    {!selectedTopic ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                            <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Select a Topic
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Click on a trending topic to see related posts.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Topic Header */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {selectedTopic.tag}
                                </h2>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Posts</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {selectedTopic.posts}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Engagement</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {selectedTopic.engagement}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Trending Score</p>
                                        <p className="text-xl font-bold text-red-500">
                                            {Math.round(selectedTopic.trendingScore)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Posts */}
                            {topicPosts.length === 0 ? (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No posts found for this topic.
                                    </p>
                                </div>
                            ) : (
                                topicPosts.map((post) => {
                                    const author = getUserInfo(post.authorId);
                                    if (!author) return null;

                                    return (
                                        <div
                                            key={post.id}
                                            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                                        >
                                            {/* Post Header */}
                                            <div className="flex items-start gap-3 mb-4">
                                                <Avatar src={author.avatar} alt={author.name} size="md" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                        {author.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {author.title}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Post Content */}
                                            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                                {post.content}
                                            </p>

                                            {/* Post Image */}
                                            {post.image && (
                                                <img
                                                    src={post.image}
                                                    alt="Post"
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                />
                                            )}

                                            {/* Post Actions */}
                                            <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                                                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                    <span>{post.likes || 0}</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                                    <MessageCircle className="w-4 h-4" />
                                                    <span>{post.comments || 0}</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                    <span>{post.shares || 0}</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrendingTopics;
