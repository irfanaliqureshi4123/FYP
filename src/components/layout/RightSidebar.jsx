import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, Share2, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import usersData from '../../data/users.json';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Toast from '../common/Toast';

/**
 * Right Sidebar Component
 * Career recommendations and who to follow widgets
 */
const RightSidebar = () => {
    // All hooks must be called at the top level first
    const { followingUsers, toggleFollow } = useApp();
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // useEffect for rotating tips
    useEffect(() => {
        const careerTips = [
            "Master one skill deeply before learning many. Depth beats breadth in the job market.",
            "Build a strong portfolio. Real projects speak louder than certifications.",
            "Network actively. 70% of jobs are filled through networking, not applications.",
            "Keep learning. The tech industry evolves rapidly. Continuous learning is non-negotiable.",
        ];

        const interval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % careerTips.length);
        }, 5000); // Change tip every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Get recommended users (not currently following)
    const recommendedUsers = usersData.filter(user => !followingUsers.includes(user.id)).slice(0, 3);

    const trendingTopics = [
        { tag: '#CareerGrowth', posts: '12.5K' },
        { tag: '#RemoteWork', posts: '8.3K' },
        { tag: '#WebDevelopment', posts: '15.2K' },
        { tag: '#DataScience', posts: '9.7K' },
    ];

    const careerTips = [
        "Master one skill deeply before learning many. Depth beats breadth in the job market.",
        "Build a strong portfolio. Real projects speak louder than certifications.",
        "Network actively. 70% of jobs are filled through networking, not applications.",
        "Keep learning. The tech industry evolves rapidly. Continuous learning is non-negotiable.",
    ];

    // Share current tip
    const shareCurrentTip = () => {
        const text = `"${careerTips[currentTipIndex]}"`;
        navigator.clipboard.writeText(text).then(() => {
            setToast({ show: true, message: 'Tip copied to clipboard!', type: 'success' });
        }).catch(() => {
            setToast({ show: true, message: 'Failed to copy tip', type: 'error' });
        });
    };

    // Save current tip
    const saveCurrentTip = () => {
        setToast({ show: true, message: 'Tip saved! View all saved tips on the Career Tips page.', type: 'success' });
    };

    return (
        <>
            <aside className="w-full lg:w-80 space-y-4 lg:space-y-6">
                {/* Who to Follow Widget */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 lg:w-5 h-4 lg:h-5 text-primary-600" />
                            <h3 className="font-bold text-sm lg:text-base text-gray-900 dark:text-white">Who to Follow</h3>
                        </div>
                        <Link to="/who-to-follow" className="text-xs lg:text-sm text-primary-600 hover:underline">
                            See all
                        </Link>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                        {recommendedUsers.map((user) => (
                            <div key={user.id} className="flex items-center gap-2 lg:gap-3">
                                <Avatar src={user.avatar} alt={user.name} size="md" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-xs lg:text-sm text-gray-900 dark:text-white truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user.title}
                                    </p>
                                </div>
                                <Button
                                    variant={followingUsers.includes(user.id) ? 'secondary' : 'primary'}
                                    size="sm"
                                    onClick={() => toggleFollow(user.id)}
                                    className="text-xs whitespace-nowrap"
                                >
                                    {followingUsers.includes(user.id) ? 'Following' : 'Follow'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Topics */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 lg:w-5 h-4 lg:h-5 text-primary-600" />
                            <h3 className="font-bold text-sm lg:text-base text-gray-900 dark:text-white">Trending Topics</h3>
                        </div>
                        <Link to="/trending-topics" className="text-xs lg:text-sm text-primary-600 hover:underline">
                            See all
                        </Link>
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                        {trendingTopics.map((topic, index) => (
                            <Link
                                key={index}
                                to={`/trending-topics`}
                                className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 -mx-2 lg:-mx-2 px-2 py-2 rounded-lg transition-colors"
                            >
                                <p className="font-semibold text-xs lg:text-sm text-gray-900 dark:text-white">{topic.tag}</p>
                                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{topic.posts} posts</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Career Tips Widget */}
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-4 lg:p-6 border border-primary-200 dark:border-primary-800/50 shadow-sm">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 lg:w-5 h-4 lg:h-5 text-primary-600 dark:text-primary-400" />
                            <h3 className="font-bold text-sm lg:text-base text-gray-900 dark:text-white">Career Tip of the Day</h3>
                        </div>
                        <Link to="/career-tips" className="text-xs lg:text-sm text-primary-600 hover:underline">
                            See all
                        </Link>
                    </div>

                    <div className="mb-3 lg:mb-4">
                        <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {careerTips[currentTipIndex]}
                        </p>
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        {careerTips.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTipIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentTipIndex
                                        ? 'bg-primary-600 w-6 lg:w-8'
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to tip ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={shareCurrentTip}
                            className="flex-1 text-xs"
                            title="Copy to clipboard"
                        >
                            <Copy className="w-3 lg:w-4 h-3 lg:h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={saveCurrentTip}
                            className="flex-1 text-xs"
                            title="Save this tip"
                        >
                            <span className="text-primary-600">💾</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Toast Notification */}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </>
    );
};

export default RightSidebar;
