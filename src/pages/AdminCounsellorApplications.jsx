import React, { useState } from 'react';
import { ArrowLeft, Search, CheckCircle, XCircle, Clock, Eye, Mail, Phone, Award, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import StickPopup from '../components/common/StickPopup';
import Avatar from '../components/common/Avatar';

/**
 * Admin Panel for Counsellor Applications
 * Manage pending, approved, and rejected applications
 */
const AdminCounsellorApplications = () => {
    const navigate = useNavigate();
    const { counsellorApplications, updateApplicationStatus } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending'); // 'pending', 'approved', 'rejected'
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [successPopup, setSuccessPopup] = useState({ isOpen: false, type: '', message: '' });

    // Mock sample data combined with real applications
    const sampleApplications = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            title: 'Senior Career Counsellor',
            specialization: 'Tech & IT',
            experience: '15 years',
            bio: 'Experienced career counsellor with focus on tech and IT industry guidance.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            certifications: ['CCDF', 'Career Development Facilitator', 'LinkedIn Career Coach'],
            languages: ['English', 'Spanish'],
            fees: 75,
            availability: 'Mon-Fri, 9am-6pm',
            submittedAt: '2026-01-08',
            status: 'pending'
        },
        {
            id: 2,
            name: 'Prof. Michael Chen',
            email: 'michael.chen@email.com',
            phone: '+1 (555) 234-5678',
            title: 'Career Development Expert',
            specialization: 'Finance & Business',
            experience: '12 years',
            bio: 'Expert in finance and business career paths with strong industry connections.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            certifications: ['MBA', 'Career Coaching Certification', 'Financial Advisor'],
            languages: ['English', 'Mandarin', 'French'],
            fees: 85,
            availability: 'Tue-Sat, 10am-7pm',
            submittedAt: '2026-01-07',
            status: 'pending'
        }
    ];

    // Combine real applications with sample data
    const allApplications = [...counsellorApplications, ...sampleApplications];

    const filteredApplications = allApplications.filter(app => {
        const matchesSearch = 
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = app.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    const handleApprove = (application) => {
        updateApplicationStatus(application.id, 'approved');
        setShowDetailsModal(false);
        setSuccessPopup({
            isOpen: true,
            type: 'success',
            message: `${application.name} has been approved as a Career Counsellor! Notification email will be sent to ${application.email}.`
        });
    };

    const handleReject = (application) => {
        updateApplicationStatus(application.id, 'rejected');
        setShowDetailsModal(false);
        setSuccessPopup({
            isOpen: true,
            type: 'warning',
            message: `${application.name}'s application has been rejected. A notification email will be sent to ${application.email}.`
        });
    };

    const stats = [
        {
            label: 'Pending Applications',
            count: allApplications.filter(a => a.status === 'pending').length,
            color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
        },
        {
            label: 'Approved',
            count: allApplications.filter(a => a.status === 'approved').length,
            color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
        },
        {
            label: 'Rejected',
            count: allApplications.filter(a => a.status === 'rejected').length,
            color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Counsellor Applications
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Manage and review counsellor registration applications
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.color} rounded-lg p-4 text-center`}
                    >
                        <p className="text-sm font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.count}</p>
                    </div>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, or specialization..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {['pending', 'approved', 'rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                filterStatus === status
                                    ? status === 'pending'
                                        ? 'bg-yellow-500 text-white'
                                        : status === 'approved'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {filteredApplications.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400">
                            No {filterStatus} applications found
                        </p>
                    </div>
                ) : (
                    filteredApplications.map(application => (
                        <div
                            key={application.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                {/* Left: Avatar and Info */}
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <Avatar src={application.avatar} alt={application.name} size="lg" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                            {application.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            <Badge variant="primary" size="sm">
                                                {application.specialization}
                                            </Badge>
                                            {application.status === 'pending' && (
                                                <Badge variant="warning" size="sm" className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    Pending Review
                                                </Badge>
                                            )}
                                            {application.status === 'approved' && (
                                                <Badge variant="success" size="sm" className="flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Approved
                                                </Badge>
                                            )}
                                            {application.status === 'rejected' && (
                                                <Badge variant="danger" size="sm" className="flex items-center gap-1">
                                                    <XCircle className="w-3 h-3" />
                                                    Rejected
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Mail className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{application.email}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Submitted: {application.submittedAt}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex gap-2 sm:flex-col">
                                    <Button
                                        variant="outline"
                                        icon={<Eye className="w-4 h-4" />}
                                        onClick={() => handleViewDetails(application)}
                                        className="flex-1 sm:flex-none text-xs sm:text-sm py-2"
                                    >
                                        View
                                    </Button>
                                    {application.status === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => handleApprove(application)}
                                                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-2"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() => handleReject(application)}
                                                className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-xs sm:text-sm py-2"
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                        {/* Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <Avatar src={selectedApplication.avatar} alt={selectedApplication.name} size="lg" />
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                                        {selectedApplication.name}
                                    </h2>
                                    <p className="text-primary-600 font-medium">{selectedApplication.title}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <XCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 space-y-6">
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.phone}</p>
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Specialization</label>
                                    <Badge variant="primary" className="mt-2">{selectedApplication.specialization}</Badge>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Experience</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.experience}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hourly Fees</label>
                                    <p className="text-gray-900 dark:text-white mt-1">${selectedApplication.fees}/hour</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Availability</label>
                                    <p className="text-gray-900 dark:text-white mt-1">{selectedApplication.availability}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Professional Bio</label>
                                <p className="text-gray-900 dark:text-white mt-2">{selectedApplication.bio}</p>
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Languages</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedApplication.languages.map(lang => (
                                        <Badge key={lang} variant="secondary">{lang}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Certifications</label>
                                <div className="space-y-2">
                                    {selectedApplication.certifications.map((cert, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-gray-900 dark:text-white">
                                            <Award className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                            <span>{cert}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submitted Date */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Application Submitted: <span className="font-semibold">{selectedApplication.submittedAt}</span>
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        {selectedApplication.status === 'pending' && (
                            <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex gap-3">
                                <Button
                                    onClick={() => handleReject(selectedApplication)}
                                    className="flex-1 bg-red-600 hover:bg-red-700"
                                >
                                    Reject Application
                                </Button>
                                <Button
                                    onClick={() => handleApprove(selectedApplication)}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    Approve Application
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Success Popup */}
            <StickPopup
                isOpen={successPopup.isOpen}
                onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
                title={successPopup.type === 'success' ? 'Approved!' : 'Rejected'}
                message={successPopup.message}
                type={successPopup.type}
                autoClose={false}
            />
        </div>
    );
};

export default AdminCounsellorApplications;
