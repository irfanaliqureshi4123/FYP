import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Trash2,
  AlertCircle,
  CheckCircle,
  Eye,
  Flag,
  MessageSquare,
  Download,
} from 'lucide-react';
import postsData from '../../data/posts.json';

/**
 * AdminContentModeration Component
 * Manages content moderation including posts, comments, and user reports
 * Features: Filter by status, search, approve/reject content, manage reports
 */
function AdminContentModeration() {
  const [contentType, setContentType] = useState('posts');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock content data combining posts with moderation status
  const allContent = useMemo(() => {
    if (contentType === 'posts') {
      return postsData.map((post, index) => ({
        id: post.id,
        type: 'post',
        author: post.author || 'Unknown User',
        content: post.content,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        status: ['approved', 'flagged', 'pending'][index % 3],
        reportCount: Math.floor(Math.random() * 10),
        reasons: index % 3 === 1 ? ['Inappropriate Content', 'Spam'] : [],
      }));
    } else if (contentType === 'comments') {
      return Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        type: 'comment',
        author: `User ${i + 1}`,
        content: `This is comment ${i + 1} on a post. ${
          i % 3 === 0 ? 'Flagged as potentially inappropriate.' : ''
        }`,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        status: ['approved', 'flagged', 'pending'][i % 3],
        reportCount: Math.floor(Math.random() * 5),
        reasons:
          i % 3 === 0
            ? ['Harassment', 'Offensive Language']
            : i % 5 === 0
            ? ['Spam']
            : [],
      }));
    } else {
      // Reports
      return Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        type: 'report',
        reportedUser: `User ${i + 1}`,
        reportedBy: `Reporter ${i + 1}`,
        reason: [
          'Harassment',
          'Spam',
          'Inappropriate Content',
          'Misinformation',
          'Copyright Violation',
        ][i % 5],
        description: `Report description for content violation #${i + 1}`,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        status: ['pending', 'under_review', 'resolved'][i % 3],
        priority: ['low', 'medium', 'high'][i % 3],
      }));
    }
  }, [contentType]);

  // Filter content
  const filteredContent = useMemo(() => {
    let result = allContent;

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.reason?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter((item) => item.status === filterStatus);
    }

    return result;
  }, [allContent, searchTerm, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      approved: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        label: 'Approved',
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        label: 'Pending',
      },
      flagged: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        label: 'Flagged',
      },
      under_review: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300',
        label: 'Under Review',
      },
      resolved: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        label: 'Resolved',
      },
    };

    const statusInfo = statusMap[status] || statusMap.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      low: { color: 'text-green-600 dark:text-green-400', label: 'Low' },
      medium: { color: 'text-orange-600 dark:text-orange-400', label: 'Medium' },
      high: { color: 'text-red-600 dark:text-red-400', label: 'High' },
    };

    const info = priorityMap[priority] || priorityMap.medium;
    return <span className={`text-xs font-semibold ${info.color}`}>● {info.label}</span>;
  };

  // Content Detail Modal
  const ContentDetailModal = ({ content }) => {
    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {contentType === 'posts'
                ? 'Post Details'
                : contentType === 'comments'
                ? 'Comment Details'
                : 'Report Details'}
            </h2>
            <button
              onClick={() => setShowDetailModal(false)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Author / Reported User
              </label>
              <p className="text-sm text-slate-900 dark:text-white mt-1">
                {content.author || content.reportedUser}
              </p>
            </div>

            {content.reportedBy && (
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Reported By
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{content.reportedBy}</p>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {contentType === 'report' ? 'Reason' : 'Content'}
              </label>
              <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {content.content || content.reason || content.description}
                </p>
              </div>
            </div>

            {content.reportCount > 0 && (
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Report Count
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{content.reportCount}</p>
              </div>
            )}

            {content.reasons && content.reasons.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Reasons
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {content.reasons.map((reason, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Status
              </label>
              <div className="mt-2">{getStatusBadge(content.status)}</div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3">
            {content.status === 'pending' || content.status === 'flagged' ? (
              <>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Reject / Remove
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Content Moderation</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Review and manage user-generated content
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Content Type Tabs */}
      <div className="flex gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-1">
        {['posts', 'comments', 'reports'].map((type) => (
          <button
            key={type}
            onClick={() => {
              setContentType(type);
              setCurrentPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              contentType === type
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${contentType}...`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="flagged">Flagged</option>
              <option value="approved">Approved</option>
              {contentType === 'reports' && (
                <>
                  <option value="under_review">Under Review</option>
                  <option value="resolved">Resolved</option>
                </>
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-2">
        {paginatedContent.length > 0 ? (
          paginatedContent.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Content Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.author || item.reportedUser}
                    </h3>
                    {item.reportCount > 0 && (
                      <Flag className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.content || item.reason || item.description}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString()}
                    </span>
                    {item.reportCount > 0 && <span>Reports: {item.reportCount}</span>}
                    {item.priority && (
                      <span className="flex items-center gap-1">
                        {getPriorityBadge(item.priority)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center gap-3">
                  <div>{getStatusBadge(item.status)}</div>
                  <button
                    onClick={() => {
                      setSelectedContent(item);
                      setShowDetailModal(true);
                    }}
                    className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
            No {contentType} found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {Math.min(itemsPerPage, filteredContent.length)} of {filteredContent.length}{' '}
          {contentType}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && <ContentDetailModal content={selectedContent} />}
    </div>
  );
}

export default AdminContentModeration;
