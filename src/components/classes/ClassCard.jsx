import React from 'react';
import { Users, BookOpen, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ClassCard Component
 * Displays a single class card with teacher info, student count, and navigation
 */
const ClassCard = ({ classData, onClick, isSelected = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(classData.id);
    } else {
      navigate(`/class/${classData.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-lg border transition cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
      }`}
    >
      {/* Class Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base">
            {classData.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Code: {classData.classCode || classData.id}
          </p>
        </div>

        {/* Class Badge */}
        {classData.section && (
          <span className="inline-block ml-2 px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded">
            {classData.section}
          </span>
        )}
      </div>

      {/* Class Info Grid */}
      <div className="space-y-2 mb-3">
        {/* Teacher */}
        {classData.classTeacher && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Teacher</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {classData.classTeacher.name || classData.classTeacher}
              </p>
            </div>
          </div>
        )}

        {/* Student Count */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {classData.strength || classData.students?.length || 0} students
            </p>
          </div>
        </div>
      </div>

      {/* Class Description */}
      {classData.description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {classData.description}
        </p>
      )}

      {/* Stats Bar */}
      {(classData.stats || classData.memberCount) && (
        <div className="py-2 mb-3 border-t border-b border-gray-100 dark:border-gray-700 flex gap-4 text-xs">
          {classData.stats?.posts && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">Posts</p>
              <p className="font-semibold text-gray-900 dark:text-white">{classData.stats.posts}</p>
            </div>
          )}
          {classData.stats?.discussions && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">Discussions</p>
              <p className="font-semibold text-gray-900 dark:text-white">{classData.stats.discussions}</p>
            </div>
          )}
          {classData.stats?.resources && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">Resources</p>
              <p className="font-semibold text-gray-900 dark:text-white">{classData.stats.resources}</p>
            </div>
          )}
          {classData.memberCount && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">Members</p>
              <p className="font-semibold text-gray-900 dark:text-white">{classData.memberCount}</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {classData.totalAssignments && (
            <div className="text-xs">
              <span className="text-gray-500 dark:text-gray-400">{classData.totalAssignments}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">assignments</span>
            </div>
          )}
        </div>

        {/* View Button */}
        <button className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition text-xs font-medium">
          View
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
