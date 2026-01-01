import React from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PostCard from '../../components/posts/PostCard';
import { EmptyState } from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

/**
 * Saved Page
 * Display all saved posts
 */
const Saved = () => {
    const { posts, savedPosts } = useApp();
    const navigate = useNavigate();

    const saved = posts.filter(post => savedPosts.includes(post.id));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Posts</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {saved.length} {saved.length === 1 ? 'post' : 'posts'} saved
                        </p>
                    </div>
                    <Bookmark className="w-8 h-8 text-primary-600" />
                </div>
            </div>

            {/* Saved Posts */}
            {saved.length > 0 ? (
                <div className="space-y-6">
                    {saved.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <EmptyState
                        icon={Bookmark}
                        title="No Saved Posts"
                        description="Save posts you want to revisit later. Click the bookmark icon on any post to save it."
                        action={
                            <Button variant="primary" onClick={() => navigate('/')}>
                                Explore Feed
                            </Button>
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default Saved;
