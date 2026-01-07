import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import PostComposer from '../components/posts/PostComposer';
import PostCard from '../components/posts/PostCard';
import Pagination from '../components/common/Pagination';
import { Loader } from '../components/common/Loader';

/**
 * Home Page - Main Feed
 * Display post composer and feed of posts with infinite scroll
 */
const Home = () => {
    const { posts } = useApp();
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const observerTarget = useRef(null);

    // Merge and sort all posts
    const allPosts = useMemo(() => {
        // Sort by timestamp (most recent first)
        return posts.sort((a, b) => {
            const dateA = new Date(a.timestamp || 0);
            const dateB = new Date(b.timestamp || 0);
            return dateB - dateA;
        });
    }, [posts]);

    // Calculate total pages
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    // Update displayed posts when page changes
    useEffect(() => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            setDisplayedPosts(allPosts.slice(startIndex, endIndex));
            setIsLoading(false);
        }, 300);
    }, [currentPage, allPosts, postsPerPage]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading && displayedPosts.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Post Composer */}
            <PostComposer />

            {/* Feed */}
            {displayedPosts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
                    <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                            <span className="text-2xl">📝</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No posts yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        Start by following people or creating your first post to see activity in your feed!
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {displayedPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}

            {/* Load More / Pagination */}
            {displayedPosts.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={allPosts.length}
                    itemsPerPage={postsPerPage}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default Home;
