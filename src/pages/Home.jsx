import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import PostComposer from '../components/posts/PostComposer';
import PostCard from '../components/posts/PostCard';
import { Loader } from '../components/common/Loader';
import schoolPostsData from '../data/schoolPosts.json';

/**
 * Home Page - Main Feed
 * Display post composer and feed of posts with infinite scroll
 */
const Home = () => {
    const { posts } = useApp();
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [postsPerPage] = useState(5);
    const observerTarget = useRef(null);
    const [pageIndex, setPageIndex] = useState(0);

    // Merge and sort all posts (regular posts + school posts)
    const allPosts = useMemo(() => {
        const combined = [...posts, ...schoolPostsData];
        // Sort by timestamp (most recent first)
        return combined.sort((a, b) => {
            const dateA = new Date(a.timestamp || 0);
            const dateB = new Date(b.timestamp || 0);
            return dateB - dateA;
        });
    }, [posts]);

    // Initialize with first batch of posts
    useEffect(() => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setDisplayedPosts(allPosts.slice(0, postsPerPage));
            setPageIndex(1);
            setIsLoading(false);
        }, 300);
    }, [allPosts, postsPerPage]);

    // Load more posts when reaching bottom
    const loadMorePosts = useCallback(() => {
        const nextIndex = pageIndex * postsPerPage;
        if (nextIndex < allPosts.length) {
            setTimeout(() => {
                setDisplayedPosts(prev => [
                    ...prev,
                    ...allPosts.slice(nextIndex, nextIndex + postsPerPage)
                ]);
                setPageIndex(prev => prev + 1);
            }, 500);
        } else {
            setHasMore(false);
        }
    }, [pageIndex, allPosts, postsPerPage]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMorePosts();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadMorePosts, hasMore, isLoading]);

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

            {/* Load More / Loading Indicator */}
            <div ref={observerTarget} className="py-8">
                {hasMore && displayedPosts.length > 0 && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader size="md" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Loading more posts...
                        </p>
                    </div>
                )}

                {!hasMore && displayedPosts.length > 0 && (
                    <div className="text-center py-4">
                        <p className="text-gray-500 dark:text-gray-400">
                            ✓ You've reached the end of the feed
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
