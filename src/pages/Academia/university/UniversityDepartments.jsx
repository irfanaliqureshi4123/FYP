import React, { useState } from 'react';
import { Building2, Users, Search, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import universityDepartmentsData from '../../../data/universityDepartments.json';
import universitiesData from '../../../data/universities.json';

/**
 * University Departments Listing Page
 * Displays all departments of a university as cards with explore button
 * Structure: University → Departments (this page) → Explore to department group
 */
const UniversityDepartments = () => {
    const navigate = useNavigate();
    const { universityId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');

    // Find university and departments
    const university = universitiesData.find(u => u.id === universityId) || universitiesData[0];
    const departments = universityDepartmentsData.filter(d => d.universityId === universityId);

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Back Button */}
            <div className="flex items-center mb-2 px-2 sm:px-0">
                <button
                    onClick={() => navigate('/university')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2"
                    aria-label="Go back to universities"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Back to Universities</span>
            </div>

            {/* University Header */}
            <div className="relative">
                {/* Cover Image */}
                <div className="w-full h-40 sm:h-56 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg sm:rounded-xl" />

                {/* University Info Card */}
                <div className="mx-2 sm:mx-4 md:mx-0 -mt-12 sm:-mt-16 relative z-10 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{university.name}</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Departments</p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <Building2 className="w-4 h-4" />
                                        {departments.length} Departments
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        {university.totalStudents} Students
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 xs:w-5 h-4 xs:h-5 text-gray-400 flex-shrink-0" />
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search departments..."
                    className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>

            {/* Department Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredDepartments.map((dept) => (
                    <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
                        {/* Header */}
                        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                    {dept.name.charAt(0)}
                                </div>
                                <Badge variant="secondary" className="text-xs">Department</Badge>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                {dept.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Headed by {dept.hod}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="p-4 sm:p-6 flex-grow">
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {dept.description}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="px-4 sm:px-6 py-3 grid grid-cols-2 gap-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Members</p>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{dept.memberCount}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Batches</p>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{dept.batches?.length || 0}</p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                onClick={() => navigate(`/university-group/${universityId}/${dept.id}`)}
                                className="w-full text-xs xs:text-sm"
                                variant="primary"
                                size="sm"
                            >
                                Explore Group
                                <ChevronRight className="w-3 xs:w-4 h-3 xs:h-4 ml-1 xs:ml-2" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDepartments.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400">No departments found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default UniversityDepartments;
