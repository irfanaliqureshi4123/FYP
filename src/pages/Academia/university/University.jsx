import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Users, Award, MapPin, Building2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import universityData from '../../../data/universities.json';
import universityDepartmentsData from '../../../data/universityDepartments.json';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import RegisterUniversityTab from './register-university/RegisterUniversityTab';

/**
 * My University Page
 * University departments and advanced academic resources
 * Structure: Universities → Departments → Batches/Years → Semesters → Classes → Sections
 */
const University = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('universities');
    const [universities, setUniversities] = useState(universityData);
    const [departments, setDepartments] = useState(universityDepartmentsData);

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getUniversityDepartments = (universityId) => {
        return departments.filter(dept => dept.universityId === universityId);
    };

    const handleRegisterUniversity = (newUniversity) => {
        // Add the new university to the universities list
        setUniversities(prev => [newUniversity, ...prev]);

        // Create default department for new university
        const newDepartment = {
            id: `dept-${Date.now()}`,
            universityId: newUniversity.id,
            name: `${newUniversity.name} Administration`,
            description: `Official department for ${newUniversity.name}. Connect with faculty and researchers.`,
            hod: 'To be appointed',
            memberCount: 1,
            batches: [],
            coverImage: null,
            isPublic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setDepartments(prev => [newDepartment, ...prev]);
        setActiveTab('universities');
    };

    return (
        <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start sm:items-center gap-3 xs:gap-4 sm:gap-6 mb-3 xs:mb-4 sm:mb-6 justify-between">
                    <div className="flex items-start sm:items-center gap-2 xs:gap-3 sm:gap-4 flex-1">
                        <button
                            onClick={() => navigate('/academia')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Go back to Academia"
                        >
                            <ArrowLeft className="w-4 xs:w-5 h-4 xs:h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <BookOpen className="w-6 xs:w-8 h-6 xs:h-8 text-indigo-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">My University</h1>
                            <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400">Explore universities and departments</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                        onClick={() => setActiveTab('universities')}
                        className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                            activeTab === 'universities'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        Browse Universities
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                            activeTab === 'register'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        Register New University
                    </button>
                </div>

                {/* Search - only show in universities tab */}
                {activeTab === 'universities' && (
                    <div className="relative">
                        <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 xs:w-5 h-4 xs:h-5 text-gray-400 flex-shrink-0" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search universities..."
                            className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                )}
            </div>

            {/* Content Area */}
            {activeTab === 'universities' && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                        {filteredUniversities.map((uni) => {
                            const uniDepts = getUniversityDepartments(uni.id);
                            const primaryDept = uniDepts[0];
                            
                            return (
                                <div key={uni.id} className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
                                    {/* University Header */}
                                    <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4">
                                            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-lg xs:rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg xs:text-xl flex-shrink-0" style={{
                                                backgroundImage: `linear-gradient(135deg, ${uni.colors?.[0] || '#4F46E5'} 0%, ${uni.colors?.[1] || '#312E81'} 100%)`
                                            }}>
                                                {uni.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                                        {uni.name}
                                                    </h3>
                                                    {uni.type && (
                                                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded whitespace-nowrap">
                                                            {uni.type}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2 xs:mb-3 line-clamp-2">
                                                    {uni.description}
                                                </p>
                                                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1 min-w-0">
                                                        <MapPin className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                                        <span className="truncate">{uni.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                                        <span className="whitespace-nowrap">{uni.totalStudents} students</span>
                                                    </div>
                                                </div>
                                                {uni.principalName && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                        <span className="font-semibold">Vice-Chancellor:</span> {uni.principalName}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Department Section */}
                                    {primaryDept && (
                                        <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex-grow">
                                            <h4 className="text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 uppercase tracking-wide">
                                                Featured Department
                                            </h4>
                                            <h5 className="text-sm xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white mb-1 xs:mb-2 line-clamp-2">
                                                {primaryDept.name}
                                            </h5>
                                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2 xs:mb-3 line-clamp-2">
                                                {primaryDept.description}
                                            </p>
                                            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                                    <span className="whitespace-nowrap">{primaryDept.memberCount} members</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Award className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                                    <span className="whitespace-nowrap">{primaryDept.batches?.length || 0} batches</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* University Info */}
                                    <div className="p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                                        <div className="grid grid-cols-2 gap-2 text-xs xs:text-sm">
                                            {uni.totalTeachers && (
                                                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                                    <p className="text-gray-600 dark:text-gray-400">Faculty</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{uni.totalTeachers}</p>
                                                </div>
                                            )}
                                            {uni.foundedYear && (
                                                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                                    <p className="text-gray-600 dark:text-gray-400">Founded</p>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{uni.foundedYear}</p>
                                                </div>
                                            )}
                                        </div>

                                        {uni.motto && (
                                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded border border-indigo-200 dark:border-indigo-800">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Motto</p>
                                                <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{uni.motto}</p>
                                            </div>
                                        )}

                                        {uni.accreditation && (
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold">Accreditation:</span> {uni.accreditation}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col xs:flex-row gap-2 xs:gap-3">
                                        <Button
                                            onClick={() => navigate(`/university-profile/${uni.id}`)}
                                            className="flex-1 text-xs xs:text-sm"
                                            variant="primary"
                                            size="sm"
                                        >
                                            <BookOpen className="w-3 xs:w-4 h-3 xs:h-4 mr-1 xs:mr-2" />
                                            View University
                                        </Button>
                                        <Button
                                            onClick={() => navigate(`/university-group/${uni.id}`)}
                                            className="flex-1 text-xs xs:text-sm"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Building2 className="w-3 xs:w-4 h-3 xs:h-4 mr-1 xs:mr-2" />
                                            Explore Departments
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredUniversities.length === 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">No universities found matching your search.</p>
                        </div>
                    )}
                </>
            )}

            {/* Register Tab */}
            {activeTab === 'register' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <RegisterUniversityTab onRegister={handleRegisterUniversity} />
                </div>
            )}
        </div>
    );
};

export default University;