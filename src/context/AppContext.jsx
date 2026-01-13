import React, { createContext, useContext, useState, useEffect } from 'react';
import postsData from '../data/posts.json';
import notificationsData from '../data/notifications.json';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [posts, setPosts] = useState(postsData);
    const [likedPosts, setLikedPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([2, 4]); // Following Alex and Emily
    const [mutedUsers, setMutedUsers] = useState([]); // Track muted users
    const [notifications, setNotifications] = useState(notificationsData);
    const [counsellorApplications, setCounsellorApplications] = useState([]);
    const [mentorApplications, setMentorApplications] = useState([]);

    useEffect(() => {
        // Load saved state from localStorage
        const savedLikes = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        const savedItems = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        const following = JSON.parse(localStorage.getItem('followingUsers') || '[2, 4]');
        const muted = JSON.parse(localStorage.getItem('mutedUsers') || '[]');
        const applications = JSON.parse(localStorage.getItem('counsellorApplications') || '[]');
        const mentorApps = JSON.parse(localStorage.getItem('mentorApplications') || '[]');

        setLikedPosts(savedLikes);
        setSavedPosts(savedItems);
        setFollowingUsers(following);
        setMutedUsers(muted);
        setCounsellorApplications(applications);
        setMentorApplications(mentorApps);
    }, []);

    const toggleLike = (postId) => {
        const isCurrentlyLiked = likedPosts.includes(postId);
        
        // Update the liked posts list
        const newLikes = isCurrentlyLiked
            ? likedPosts.filter(id => id !== postId)
            : [...likedPosts, postId];
        
        setLikedPosts(newLikes);
        localStorage.setItem('likedPosts', JSON.stringify(newLikes));

        // Update post likes count
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );
    };

    const toggleSave = (postId) => {
        setSavedPosts(prev => {
            const newSaved = prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId];
            localStorage.setItem('savedPosts', JSON.stringify(newSaved));
            return newSaved;
        });
    };

    const toggleFollow = (userId) => {
        setFollowingUsers(prev => {
            const newFollowing = prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId];
            localStorage.setItem('followingUsers', JSON.stringify(newFollowing));
            return newFollowing;
        });
    };

    const toggleMuteUser = (userId) => {
        setMutedUsers(prev => {
            const newMuted = prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId];
            localStorage.setItem('mutedUsers', JSON.stringify(newMuted));
            return newMuted;
        });
    };

    const markNotificationRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === notificationId ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllNotificationsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const addPost = (newPost) => {
        const post = {
            ...newPost,
            id: posts.length + 1,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0,
            type: 'post',
        };
        setPosts([post, ...posts]);
    };

    const updatePost = (postId, updatedContent, updatedImage = null) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, content: updatedContent, ...(updatedImage !== null && { image: updatedImage }) }
                    : post
            )
        );
    };

    const deletePost = (postId) => {
        setPosts(currentPosts =>
            currentPosts.filter(post => post.id !== postId)
        );
    };

    const pinPost = (postId) => {
        setPosts(currentPosts => {
            const postToPin = currentPosts.find(post => post.id === postId);
            if (!postToPin) return currentPosts;
            
            // Mark post as pinned
            const updatedPost = { ...postToPin, isPinned: !postToPin.isPinned };
            
            // If pinning, move to top; if unpinning, remove from top
            if (updatedPost.isPinned) {
                const otherPosts = currentPosts.filter(post => post.id !== postId);
                return [updatedPost, ...otherPosts];
            } else {
                // Unpinning - just update the post
                return currentPosts.map(post => 
                    post.id === postId ? updatedPost : post
                );
            }
        });
    };

    const updatePostVisibility = (postId, visibility) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, visibility }
                    : post
            )
        );
    };

    const toggleCommentsStatus = (postId) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, commentsDisabled: !post.commentsDisabled }
                    : post
            )
        );
    };

    const addCounsellorApplication = (applicationData) => {
        const newApplication = {
            id: Date.now(),
            ...applicationData,
            status: 'pending',
            submittedAt: new Date().toISOString().split('T')[0]
        };
        const updatedApplications = [...counsellorApplications, newApplication];
        setCounsellorApplications(updatedApplications);
        localStorage.setItem('counsellorApplications', JSON.stringify(updatedApplications));
        return newApplication;
    };

    const updateApplicationStatus = (applicationId, newStatus) => {
        const updatedApplications = counsellorApplications.map(app =>
            app.id === applicationId ? { ...app, status: newStatus } : app
        );
        setCounsellorApplications(updatedApplications);
        localStorage.setItem('counsellorApplications', JSON.stringify(updatedApplications));
    };

    // NEW MENTOR APPLICATION FUNCTIONS
    const addMentorApplication = (applicationData) => {
        const newApplication = {
            id: Date.now(),
            ...applicationData,
            status: 'pending',
            submittedAt: new Date().toISOString().split('T')[0]
        };
        const updatedApplications = [...mentorApplications, newApplication];
        setMentorApplications(updatedApplications);
        localStorage.setItem('mentorApplications', JSON.stringify(updatedApplications));
        return newApplication;
    };

    const updateMentorApplicationStatus = (applicationId, newStatus) => {
        const updatedApplications = mentorApplications.map(app =>
            app.id === applicationId ? { ...app, status: newStatus } : app
        );
        setMentorApplications(updatedApplications);
        localStorage.setItem('mentorApplications', JSON.stringify(updatedApplications));
    };

    const votePoll = (postId, optionIndex) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId && post.poll
                    ? {
                        ...post,
                        poll: {
                            ...post.poll,
                            votes: (post.poll.votes || []).map((vote, i) => {
                                // If clicking the same option they voted for, remove the vote
                                if (post.poll.userVote === optionIndex && i === optionIndex) {
                                    return Math.max(0, vote - 1);
                                }
                                // If clicking a different option, add vote to new option
                                if (post.poll.hasVoted && i === optionIndex && post.poll.userVote !== optionIndex) {
                                    return vote + 1;
                                }
                                // If first vote, increment the selected option
                                if (!post.poll.hasVoted && i === optionIndex) {
                                    return vote + 1;
                                }
                                // If changing vote, remove from previous option
                                if (post.poll.userVote !== optionIndex && i === post.poll.userVote && post.poll.hasVoted) {
                                    return Math.max(0, vote - 1);
                                }
                                return vote;
                            }),
                            hasVoted: post.poll.userVote === optionIndex ? false : true,
                            userVote: post.poll.userVote === optionIndex ? null : optionIndex,
                        }
                    }
                    : post
            )
        );
    };

    const value = {
        posts,
        likedPosts,
        savedPosts,
        followingUsers,
        mutedUsers,
        notifications,
        counsellorApplications,
        mentorApplications,
        toggleLike,
        toggleSave,
        toggleFollow,
        toggleMuteUser,
        markNotificationRead,
        markAllNotificationsRead,
        addPost,
        updatePost,
        deletePost,
        pinPost,
        updatePostVisibility,
        toggleCommentsStatus,
        votePoll,
        addCounsellorApplication,
        updateApplicationStatus,
        addMentorApplication,
        updateMentorApplicationStatus,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
