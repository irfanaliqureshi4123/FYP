import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Calendar, Settings as SettingsIcon, MessageCircle, CheckCircle } from 'lucide-react';
import usersData from '../../data/users.json';
import postsData from '../../data/posts.json';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import PostCard from '../../components/posts/PostCard';

/**
 * Profile Page
 * User profile with cover, bio, stats, tabs
 */
const Profile = () => {
    const { username } = useParams();
    const { currentUser } = useAuth();
    const { followingUsers, toggleFollow } = useApp();
    const [activeTab, setActiveTab] = useState('posts');

    const user = usersData.find(u => u.username === username) || currentUser;
    const isOwnProfile = user?.id === currentUser?.id;
    const isFollowing = user && followingUsers.includes(user.id);
    const userPosts = postsData.filter(post => post.userId === user?.id);

    const tabs = [
        { id: 'posts', label: 'Posts', count: userPosts.length },
        { id: 'about', label: 'About' },
        { id: 'achievements', label: 'Achievements', count: user?.achievements?.length || 0 },
    ];

    return (
        <div className="space-y-6 -mt-6">
            {/* Cover Image */}
            <div className="bg-white dark:bg-gray-800 rounded-b-2xl overflow-hidden border-b border-gray-200 dark:border-gray-700">
                <div
                    className="h-48 sm:h-64 bg-gradient-to-r from-primary-500 to-accent-500"
                    style={{
                        backgroundImage: user?.coverImage ? `url(${user.coverImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>

                {/* Profile Header */}
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 sm:-mt-20">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <Avatar
                                src={user?.avatar}
                                alt={user?.name}
                                size="2xl"
                                className="ring-4 ring-white dark:ring-gray-800"
                            />
                            <div className="mt-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {user?.name}
                                    </h1>
                                    {user?.verified && (
                                        <CheckCircle className="w-6 h-6 text-primary-600 fill-current" />
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">@{user?.username}</p>
                                <p className="text-gray-900 dark:text-white font-medium mt-1">{user?.title}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {isOwnProfile ? (
                                <Button variant="outline" icon={<SettingsIcon className="w-4 h-4" />}>
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant={isFollowing ? 'secondary' : 'primary'}
                                        onClick={() => toggleFollow(user.id)}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </Button>
                                    <Button variant="outline" icon={<MessageCircle className="w-4 h-4" />}>
                                        Message
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    {user?.bio && (
                        <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl">
                            {user.bio}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                        {user?.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {user.location}
                            </div>
                        )}
                        {user?.website && (
                            <a
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary-600 hover:underline"
                            >
                                <LinkIcon className="w-4 h-4" />
                                {user.website.replace('https://', '')}
                            </a>
                        )}
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Joined Jan 2024
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 mt-4">
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {user?.posts?.toLocaleString() || 0}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 ml-1">Posts</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {user?.followers?.toLocaleString() || 0}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 ml-1">Followers</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {user?.following?.toLocaleString() || 0}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 ml-1">Following</span>
                        </div>
                    </div>

                    {/* Skills */}
                    {user?.skills && user.skills.length > 0 && (
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill, index) => (
                                    <Badge key={index} variant="primary">{skill}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50 dark:bg-primary-900/10'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                        >
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className="ml-2 text-sm">({tab.count})</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'posts' && (
                        <div className="space-y-6">
                            {userPosts.length > 0 ? (
                                userPosts.map(post => <PostCard key={post.id} post={post} />)
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                                    No posts yet
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            {user?.careerGoals && user.careerGoals.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">Career Goals</h3>
                                    <ul className="space-y-2">
                                        {user.careerGoals.map((goal, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                <span className="text-primary-600">•</span> {goal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {user?.interests && user.interests.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">Interests</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {user.interests.map((interest, index) => (
                                            <Badge key={index} variant="info">{interest}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className="space-y-4">
                            {user?.achievements && user.achievements.length > 0 ? (
                                user.achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
                                    >
                                        <div className="text-4xl">{achievement.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                {achievement.description}
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                                                {achievement.date}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                                    No achievements yet
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
