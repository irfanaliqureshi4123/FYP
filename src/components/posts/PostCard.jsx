import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, CheckCircle, Copy, X, CornerDownRight, Flag, MapPin, Building2 } from 'lucide-react';
import { Twitter, Linkedin, Facebook, MessageCircle as WhatsApp, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeAgo } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import users from '../../data/users.json';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Toast from '../common/Toast';

/**
 * Highlight search query and hashtags in text
 */
const HighlightedText = ({ text, query }) => {
    const navigate = useNavigate();

    // Split text by whitespace and punctuation, preserving spaces
    const tokens = text.split(/(\s+)/);

    return (
        <span>
            {tokens.map((token, i) => {
                // Check if token is a hashtag
                if (token.startsWith('#') && token.length > 1) {
                    const hashtag = token.substring(1); // Remove the # for search
                    return (
                        <button
                            key={i}
                            onClick={() => navigate(`/search?q=${encodeURIComponent(token)}`)}
                            className="text-primary-600 dark:text-primary-400 hover:underline font-semibold cursor-pointer hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            title={`Search for ${token}`}
                        >
                            {token}
                        </button>
                    );
                }

                // Highlight search query in text
                if (!query || !query.trim()) {
                    return <span key={i}>{token}</span>;
                }

                const parts = token.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));

                return (
                    <span key={i}>
                        {parts.map((part, j) =>
                            part.toLowerCase() === query.toLowerCase() ? (
                                <mark key={j} className="bg-yellow-300 dark:bg-yellow-600 text-gray-900 dark:text-white font-semibold rounded px-1">
                                    {part}
                                </mark>
                            ) : (
                                <span key={j}>{part}</span>
                            )
                        )}
                    </span>
                );
            })}
        </span>
    );
};

/**
 * PostCard Component
 * Displays a single post with all interactions
 */
const PostCard = ({ post, searchQuery }) => {
    const { likedPosts, savedPosts, toggleLike, toggleSave, updatePost, deletePost, pinPost, updatePostVisibility, toggleCommentsStatus, mutedUsers, toggleMuteUser, votePoll } = useApp();
    const { currentUser } = useAuth();
    
    // Find user data to check online status
    const user = users.find(u => u.id === post.userId);
    const isUserOnline = user?.online || false;
    const isOwnPost = currentUser?.id === post.userId;
    
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportType, setReportType] = useState('');
    const [reportingItem, setReportingItem] = useState(null);
    
    // Three-dots menu states
    const [showPostMenu, setShowPostMenu] = useState(false);
    const [isPostPinned, setIsPostPinned] = useState(post.isPinned || false);
    const [commentsDisabled, setCommentsDisabled] = useState(post.commentsDisabled || false);
    const [postVisibility, setPostVisibility] = useState(post.visibility || 'public');
    const [isMutedUser, setIsMutedUser] = useState(mutedUsers.includes(post.userId));
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showVisibilityModal, setShowVisibilityModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editContent, setEditContent] = useState(post.content);

    const isLiked = likedPosts.includes(post.id);
    const isSaved = savedPosts.includes(post.id);

    const postUrl = `${window.location.origin}/#/post/${post.id}`;
    const postTitle = (post.content || 'Check out this post').substring(0, 50);
    let encodedUrl = '';
    let encodedTitle = '';
    
    try {
        encodedUrl = encodeURIComponent(postUrl);
        encodedTitle = encodeURIComponent(postTitle);
    } catch (e) {
        encodedUrl = '';
        encodedTitle = '';
    }

    const handleComment = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                text: commentText,
                timestamp: new Date().toISOString(),
                replies: []
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    const handleReply = (e, commentId) => {
        e.preventDefault();
        if (replyText.trim()) {
            const newReply = {
                id: Date.now(),
                text: replyText,
                timestamp: new Date().toISOString(),
            };

            setComments(comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newReply]
                    };
                }
                return comment;
            }));

            setReplyText('');
            setReplyingTo(null);
        }
    };

    const handleReport = (itemId) => {
        setReportingItem(itemId);
        setShowReportModal(true);
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (reportType) {
            setToastMessage('Report submitted successfully');
            setToastType('success');
            setTimeout(() => setToastMessage(''), 3000);
            setShowReportModal(false);
            setReportType('');
            setReportingItem(null);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(postUrl).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        }).catch(() => {
            alert('Failed to copy link');
        });
    };

    const shareToTwitter = () => {
        const text = `${postTitle}... ${postUrl}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
    };

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const text = `${postTitle}... ${postUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareViaEmail = () => {
        const subject = `Check out this post: ${postTitle}`;
        const body = `I thought you might find this interesting: ${postUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleFollow = () => {
        setIsFollowed(!isFollowed);
    };

    const handleLike = () => {
        const wasLiked = isLiked;
        toggleLike(post.id);
    };

    const handleSave = () => {
        const wasSaved = isSaved;
        toggleSave(post.id);
        setToastType('success');
        setToastMessage(wasSaved ? `Removed from saved posts` : `Saved ${post.name}'s post`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <>
            {toastMessage && (
                <Toast 
                    message={toastMessage} 
                    type={toastType}
                    onClose={() => setToastMessage('')}
                />
            )}
        <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                    <Link to={`/profile/${post.username}`}>
                        <Avatar src={post.avatar} alt={post.name} size="md" className="sm:hidden" online={isUserOnline} />
                        <Avatar src={post.avatar} alt={post.name} size="lg" className="hidden sm:block" online={isUserOnline} />
                    </Link>
                    <div className="flex-1 min-w-0">
                        {post.isPinned && (
                            <span className="text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-semibold inline-block mb-2">
                                📌 Pinned
                            </span>
                        )}
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap mb-1">
                            <Link
                                to={`/profile/${post.username}`}
                                className="font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:underline"
                            >
                                {post.name}
                            </Link>
                            {post.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                            <button
                                onClick={handleFollow}
                                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${isFollowed
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                                    : 'bg-primary-600 text-white hover:bg-primary-700'
                                    }`}
                            >
                                {isFollowed ? 'Following' : 'Follow'}
                            </button>
                            {post.schoolId && post.schoolName && (
                                <Link
                                    to="/school"
                                    className="px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 flex items-center gap-1"
                                >
                                    <Building2 className="w-3 h-3" />
                                    View School
                                </Link>
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">@{post.username}</span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className={`text-xs sm:text-sm font-medium ${
                                post.visibility === 'public' ? 'text-blue-600 dark:text-blue-400' :
                                post.visibility === 'followers' ? 'text-purple-600 dark:text-purple-400' :
                                'text-red-600 dark:text-red-400'
                            }`}>
                                {post.visibility === 'public' ? '🌐 Public' :
                                 post.visibility === 'followers' ? '👥 Followers' :
                                 '🔒 Private'}
                            </span>
                            {post.location && (
                                <>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {post.location.city}, {post.location.country}
                                    </span>
                                </>
                            )}
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                                {formatTimeAgo(post.timestamp)}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Post Options Menu */}
                <div className="relative">
                    <button 
                        onClick={() => setShowPostMenu(!showPostMenu)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                    >
                        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {showPostMenu && (
                        <>
                            <div 
                                className="fixed inset-0 z-20"
                                onClick={() => setShowPostMenu(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-30">
                                {/* Own Post Options */}
                                {isOwnPost && (
                                    <>
                                        <button 
                                            onClick={() => { setShowEditModal(true); setShowPostMenu(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                        >
                                            <span>✏️</span>
                                            <span>Edit Post</span>
                                        </button>
                                        <button 
                                            onClick={() => { setShowDeleteModal(true); setShowPostMenu(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400"
                                        >
                                            <span>🗑️</span>
                                            <span>Delete Post</span>
                                        </button>
                                        <button 
                                            onClick={() => { 
                                                pinPost(post.id);
                                                setIsPostPinned(!isPostPinned); 
                                                setShowPostMenu(false); 
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                        >
                                            <span>📌</span>
                                            <span>{isPostPinned ? 'Unpin Post' : 'Pin Post'}</span>
                                        </button>
                                        <button 
                                            onClick={() => { setShowVisibilityModal(true); setShowPostMenu(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                        >
                                            <span>{postVisibility === 'public' ? '🌐' : '🔒'}</span>
                                            <span>Edit Visibility</span>
                                        </button>
                                        <button 
                                            onClick={() => { 
                                                toggleCommentsStatus(post.id);
                                                setCommentsDisabled(!commentsDisabled); 
                                                setShowPostMenu(false);
                                                setToastMessage(commentsDisabled ? 'Comments enabled' : 'Comments disabled');
                                                setToastType('success');
                                                setTimeout(() => setToastMessage(''), 3000);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                        >
                                            <span>💬</span>
                                            <span>{commentsDisabled ? 'Turn On Comments' : 'Turn Off Comments'}</span>
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                    </>
                                )}

                                {/* For Others' Posts */}
                                {!isOwnPost && (
                                    <>
                                        <button 
                                            onClick={() => { toggleSave(post.id); setShowPostMenu(false); setToastMessage(isSaved ? 'Removed from saved' : 'Saved post'); setTimeout(() => setToastMessage(''), 3000); }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                        >
                                            <span>{isSaved ? '💾' : '📑'}</span>
                                            <span>{isSaved ? 'Unsave Post' : 'Save Post'}</span>
                                        </button>
                                        <button 
                                            onClick={() => { 
                                                toggleMuteUser(post.userId);
                                                setIsMutedUser(!isMutedUser); 
                                                setShowPostMenu(false); 
                                                setToastMessage(isMutedUser ? `Unmuted ${post.name}` : `Muted ${post.name}`); 
                                                setTimeout(() => setToastMessage(''), 3000); 
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                        >
                                            <span>{isMutedUser ? '🔊' : '🔇'}</span>
                                            <span>{isMutedUser ? 'Unmute User' : 'Mute User'}</span>
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                        <button 
                                            onClick={() => { handleReport(post.id); setShowPostMenu(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left text-red-600 dark:text-red-400"
                                        >
                                            <Flag className="w-4 h-4" />
                                            <span>Report Post</span>
                                        </button>
                                    </>
                                )}
                                
                                {/* Copy Link (for everyone) */}
                                <button 
                                    onClick={() => { handleCopyLink(); setShowPostMenu(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left text-gray-900 dark:text-white"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>{copyFeedback ? 'Link Copied!' : 'Copy Link'}</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Post Content */}
            <div className="mb-4">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    <HighlightedText text={post.content} query={searchQuery} />
                </p>
                {post.hashtags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.hashtags.map((tag, index) => (
                            <Link
                                key={index}
                                to={`/search?q=%23${encodeURIComponent(tag)}`}
                                className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                                title={`View posts with #${tag}`}
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Image */}
            {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-auto max-h-96 object-cover"
                    />
                </div>
            )}

            {/* Multiple Images Grid */}
            {post.images && post.images.length > 0 && (
                <div className={`grid gap-2 mb-4 rounded-xl overflow-hidden ${post.images.length === 1 ? 'grid-cols-1' :
                    post.images.length === 2 ? 'grid-cols-2' :
                        post.images.length === 3 ? 'grid-cols-3' :
                            'grid-cols-2'
                    }`}>
                    {post.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-48 object-cover"
                        />
                    ))}
                </div>
            )}

            {/* Poll */}
            {post.poll && (
                <div className="mb-4 space-y-3 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <div className="space-y-2">
                        {post.poll.options && Array.isArray(post.poll.options) && post.poll.options.length > 0 && post.poll.options.map((option, index) => {
                            // Handle both string and object options
                            const optionText = typeof option === 'string' ? option : (option?.text || String(option));
                            const votes = post.poll.votes || [];
                            const totalVotes = votes.reduce((sum, v) => sum + v, 0) || 1;
                            const percentage = votes.length > 0 ? Math.round((votes[index] / totalVotes) * 100) : 0;
                            const isUserVote = post.poll.userVote === index;
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => votePoll(post.id, index)}
                                    className={`w-full relative overflow-hidden rounded-lg border-2 p-3 transition-all ${
                                        isUserVote
                                            ? 'border-primary-500 dark:border-primary-400'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer'
                                    } ${!post.poll.hasVoted ? 'cursor-pointer' : 'cursor-pointer'}`}
                                >
                                    <div
                                        className={`absolute inset-0 transition-all ${
                                            isUserVote
                                                ? 'bg-primary-200 dark:bg-primary-600/40'
                                                : 'bg-gray-200 dark:bg-gray-600/30'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900 dark:text-white">{optionText}</span>
                                            {isUserVote && <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full">Your vote</span>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{percentage}%</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">({votes[index] || 0})</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        {(post.poll.votes || []).reduce((sum, v) => sum + v, 0).toLocaleString()} votes • Ends in 24 hours
                    </p>
                </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-0.5 sm:gap-1">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all hover:bg-red-50 dark:hover:bg-red-900/20 ${isLiked ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs sm:text-sm font-medium">{post.likes}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        disabled={commentsDisabled && isOwnPost}
                        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all ${
                            commentsDisabled && isOwnPost
                                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600'
                        }`}
                        title={commentsDisabled && isOwnPost ? 'Comments are disabled' : ''}
                    >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 transition-all"
                        onClick={() => setShowShareModal(true)}
                    >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{post.shares}</span>
                    </button>
                </div>
                <button
                    onClick={handleSave}
                    className={`p-1.5 sm:p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${isSaved ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'
                        }`}
                >
                    <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Comments Section */}
            {showComments && !commentsDisabled && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleComment} className="flex gap-3 mb-4">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                        <button
                            type="submit"
                            disabled={!commentText.trim()}
                            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Post
                        </button>
                    </form>
                    
                    {comments.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            No comments yet. Be the first to comment!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="space-y-3">
                                    {/* Main Comment */}
                                    <div className="flex gap-2">
                                        <Avatar 
                                            src={currentUser?.avatar} 
                                            alt={currentUser?.name || 'You'} 
                                            size="sm" 
                                            online={currentUser?.online || false} 
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">You</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                                    >
                                                        <CornerDownRight className="w-3 h-3" />
                                                        Reply
                                                    </button>
                                                    <button
                                                        onClick={() => handleReport(comment.id)}
                                                        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        <Flag className="w-3 h-3" />
                                                        Report
                                                    </button>
                                                    {comment.replies && comment.replies.length > 0 && (
                                                        <>
                                                            <span className="text-xs text-gray-400">•</span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {comment.replies.length} repl{comment.replies.length === 1 ? 'y' : 'ies'}
                                                            </span>
                                                        </>
                                                    )}
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-400">now</span>
                                                </div>
                                            </div>

                                            {/* Reply Input */}
                                            {replyingTo === comment.id && (
                                                <form onSubmit={(e) => handleReply(e, comment.id)} className="mt-2 flex gap-2">
                                                    <Avatar 
                                                        src={currentUser?.avatar} 
                                                        alt={currentUser?.name || 'You'} 
                                                        size="xs" 
                                                        online={currentUser?.online || false} 
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            placeholder="Write a reply..."
                                                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white text-sm"
                                                            autoFocus
                                                        />
                                                        <div className="flex gap-2 mt-2">
                                                            <button
                                                                type="submit"
                                                                disabled={!replyText.trim()}
                                                                className="px-4 py-1 bg-primary-600 text-white text-xs rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                            >
                                                                Reply
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setReplyingTo(null);
                                                                    setReplyText('');
                                                                }}
                                                                className="px-4 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}

                                            {/* Replies */}
                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply.id} className="flex gap-2 ml-6">
                                                            <Avatar 
                                                                src={currentUser?.avatar} 
                                                                alt={currentUser?.name || 'You'} 
                                                                size="xs" 
                                                                online={currentUser?.online || false} 
                                                                className="mt-1"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-2">
                                                                    <p className="text-xs font-semibold text-gray-900 dark:text-white">You</p>
                                                                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{reply.text}</p>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <button
                                                                            onClick={() => handleReport(reply.id)}
                                                                            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                                        >
                                                                            <Flag className="w-3 h-3" />
                                                                            Report
                                                                        </button>
                                                                        <span className="text-xs text-gray-400">•</span>
                                                                        <span className="text-xs text-gray-400">now</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Comments Disabled Message */}
            {showComments && commentsDisabled && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">💬 Comments are turned off</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">The author has disabled comments on this post</p>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/40">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-5 sm:p-7 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Share Post</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Share Options Grid */}
                        <div className="p-5 sm:p-7 space-y-3 max-h-[70vh] overflow-y-auto">
                            {/* Copy Link */}
                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] transform"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${copyFeedback ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'}`}>
                                    <Copy className={`w-6 h-6 ${copyFeedback ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                        {copyFeedback ? '✓ Link Copied!' : 'Copy Link'}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Copy to clipboard</p>
                                </div>
                            </button>

                            {/* Twitter */}
                            <button
                                onClick={shareToTwitter}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] transform"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Twitter className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Twitter/X</p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Share your thoughts</p>
                                </div>
                            </button>

                            {/* LinkedIn */}
                            <button
                                onClick={shareToLinkedIn}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] transform"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
                                    <Linkedin className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">LinkedIn</p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Share professionally</p>
                                </div>
                            </button>

                            {/* Facebook */}
                            <button
                                onClick={shareToFacebook}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] transform"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                                    <Facebook className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Facebook</p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Share with friends</p>
                                </div>
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={shareToWhatsApp}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] transform"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                                    <WhatsApp className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">WhatsApp</p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Share via chat</p>
                                </div>
                            </button>

                            {/* Email */}
                            <button
                                onClick={shareViaEmail}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] transform"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Email</p>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Send via email</p>
                                </div>
                            </button>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 sm:p-7 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300 mx-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 md:p-7 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Report Content</h3>
                            <button
                                onClick={() => {
                                    setShowReportModal(false);
                                    setReportType('');
                                    setReportingItem(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* Report Form */}
                        <form onSubmit={handleReportSubmit} className="p-4 sm:p-6 md:p-7 space-y-4 max-h-[60vh] overflow-y-auto">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Help us keep our community safe. Please select the reason for reporting this content.
                            </p>

                            {/* Report Type Options */}
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200">
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="spam"
                                        checked={reportType === 'spam'}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Spam or misleading</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unsolicited commercial content or false information</p>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200">
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="harassment"
                                        checked={reportType === 'harassment'}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Harassment or bullying</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Threats, insults, or targeted abuse</p>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200">
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="inappropriate"
                                        checked={reportType === 'inappropriate'}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Inappropriate content</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nudity, violence, or other inappropriate material</p>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200">
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="hate"
                                        checked={reportType === 'hate'}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Hate speech</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Discriminatory content based on race, religion, etc.</p>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200">
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="other"
                                        checked={reportType === 'other'}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Other</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Something else that violates our guidelines</p>
                                    </div>
                                </label>
                            </div>
                        </form>

                        {/* Modal Footer */}
                        <div className="p-4 sm:p-6 md:p-7 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    setShowReportModal(false);
                                    setReportType('');
                                    setReportingItem(null);
                                }}
                                className="flex-1 px-4 sm:px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReportSubmit}
                                disabled={!reportType}
                                className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                            >
                                Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Post Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Post?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">This action cannot be undone. Are you sure you want to delete this post?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    deletePost(post.id);
                                    setShowDeleteModal(false);
                                    setToastMessage('Post deleted successfully');
                                    setToastType('success');
                                    setTimeout(() => setToastMessage(''), 3000);
                                }}
                                className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Post Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Post</h3>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4 resize-none"
                            rows={6}
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{editContent.length} / 500 characters</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowEditModal(false); setEditContent(post.content); }}
                                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    updatePost(post.id, editContent);
                                    setShowEditModal(false);
                                    setToastMessage('Post updated successfully');
                                    setToastType('success');
                                    setTimeout(() => setToastMessage(''), 3000);
                                }}
                                className="flex-1 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Visibility Modal */}
            {showVisibilityModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Who can see this post?</h3>
                        <div className="space-y-3 mb-6">
                            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="public"
                                    checked={postVisibility === 'public'}
                                    onChange={(e) => setPostVisibility(e.target.value)}
                                    className="w-4 h-4"
                                />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">🌐 Public</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Everyone can see this post</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="followers"
                                    checked={postVisibility === 'followers'}
                                    onChange={(e) => setPostVisibility(e.target.value)}
                                    className="w-4 h-4"
                                />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">👥 Followers Only</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Only your followers can see this</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="private"
                                    checked={postVisibility === 'private'}
                                    onChange={(e) => setPostVisibility(e.target.value)}
                                    className="w-4 h-4"
                                />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">🔒 Private</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Only you can see this post</p>
                                </div>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowVisibilityModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    updatePostVisibility(post.id, postVisibility);
                                    setShowVisibilityModal(false);
                                    setToastMessage('Visibility updated');
                                    setToastType('success');
                                    setTimeout(() => setToastMessage(''), 3000);
                                }}
                                className="flex-1 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
        </>
    );
};

export default PostCard;
