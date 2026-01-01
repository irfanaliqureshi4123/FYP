import React, { useState } from 'react';
import { FileText, Download, Clock, CheckCircle, AlertCircle, Send, MoreVertical } from 'lucide-react';

/**
 * AssignmentCard Component
 * Displays assignment with deadline tracking, submission status, and grade display
 */
const AssignmentCard = ({
  assignment,
  onView,
  onSubmit,
  onDownload,
  currentUserRole = 'student',
  isSubmitted = false,
  grade = null,
  feedback = null
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);

  // Calculate days remaining
  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate submission percentage (for teacher view)
  const submissionPercentage = assignment.totalStudents
    ? Math.round((assignment.submissions / assignment.totalStudents) * 100)
    : 0;

  const daysLeft = calculateDaysRemaining(assignment.dueDate);
  const isOverdue = daysLeft < 0;
  const isDueToday = daysLeft === 0;
  const isClosingSoon = daysLeft > 0 && daysLeft <= 2;

  // Status badge color
  const getStatusColor = () => {
    if (isSubmitted) return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200';
    if (isOverdue) return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200';
    if (isDueToday) return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200';
    if (isClosingSoon) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200';
  };

  const getStatusText = () => {
    if (isSubmitted) return 'Submitted';
    if (isOverdue) return 'Overdue';
    if (isDueToday) return 'Due Today';
    if (isClosingSoon) return 'Closing Soon';
    return 'Active';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-2">
                {assignment.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {assignment.subject && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded">
                    {assignment.subject}
                  </span>
                )}
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>

          {/* More Options */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
                {onDownload && (
                  <button
                    onClick={() => {
                      onDownload(assignment.id);
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </button>
                )}
                <button
                  onClick={() => setShowOptions(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {/* Description */}
        {assignment.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {assignment.description}
          </p>
        )}

        {/* Assignment Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Due Date */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Days Remaining */}
          <div className="flex items-center gap-2">
            <AlertCircle className={`w-4 h-4 flex-shrink-0 ${
              isOverdue ? 'text-red-500' : isClosingSoon ? 'text-yellow-500' : 'text-blue-500'
            }`} />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isOverdue ? 'Overdue by' : 'Days left'}
              </p>
              <p className={`text-sm font-medium ${
                isOverdue ? 'text-red-600 dark:text-red-400' : isClosingSoon ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'
              }`}>
                {Math.abs(daysLeft)} day{Math.abs(daysLeft) !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Attachments */}
        {assignment.attachments && assignment.attachments.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Attachments ({assignment.attachments.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {assignment.attachments.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => onDownload && onDownload(assignment.id)}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  {file.name || `File ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submission Status Section (Student View) */}
      {currentUserRole === 'student' && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          {isSubmitted ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Submitted</span>
            </div>
          ) : isOverdue ? (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Overdue - No longer accepting submissions</span>
            </div>
          ) : (
            <button
              onClick={() => onSubmit && onSubmit(assignment.id)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Assignment
            </button>
          )}

          {/* Grade Display */}
          {grade && (
            <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 rounded">
              <p className="text-xs text-green-700 dark:text-green-300 font-medium">Grade: {grade}/100</p>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900 rounded">
              <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Teacher Feedback:</p>
              <p className="text-sm text-blue-900 dark:text-blue-100">{feedback}</p>
            </div>
          )}
        </div>
      )}

      {/* Submission Tracker (Teacher View) */}
      {currentUserRole === 'teacher' && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Submissions: {assignment.submissions}/{assignment.totalStudents}
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {submissionPercentage}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition ${
                submissionPercentage === 100 ? 'bg-green-500' :
                submissionPercentage >= 75 ? 'bg-blue-500' :
                submissionPercentage >= 50 ? 'bg-yellow-500' :
                'bg-orange-500'
              }`}
              style={{ width: `${submissionPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {assignment.totalStudents - assignment.submissions} pending submissions
          </p>
        </div>
      )}

      {/* Card Footer - Actions */}
      <div className="p-4 flex items-center gap-2">
        {onView && (
          <button
            onClick={() => onView(assignment.id)}
            className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            View Assignment
          </button>
        )}
        {onDownload && (
          <button
            onClick={() => onDownload(assignment.id)}
            className="py-2 px-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
