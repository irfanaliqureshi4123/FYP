import React, { useState } from 'react';
import { ArrowLeft, Search, CheckCircle, XCircle, Clock, Eye, Mail, Phone, Award, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import StickPopup from '../components/common/StickPopup';
import Avatar from '../components/common/Avatar';

/**
 * Admin Panel for Mentor Applications
 * Manage pending, approved, and rejected mentor applications
 */
const AdminMentorApplications = () => {
    const navigate = useNavigate();
    const { mentorApplications, updateMentorApplicationStatus } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [successPopup, setSuccessPopup] = useState({ isOpen: false, type: '', message: '' });

    const sampleApplications = [
        {
            id: 101,
            name: 'Alex Rivera',
            email: 'alex.rivera@email.com',
            phone: '+1 (555) 456-7890',
            title: 'Senior Software Engineer',
            specialization: 'Tech & IT',
            experience: '10 years',
            bio: 'Passionate about mentoring junior developers and helping them grow in their careers.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
            certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional'],
            languages: ['English', 'Spanish'],
            hourlyRate: 60,
            availability: 'Weekends, 6pm-9pm',
            successStories: '15+ mentees successfully transitioned to senior roles',
            submittedAt: '2026-01-10',
            status: 'pending'
        },
        {
            id: 102,
            name: 'Jessica Liu',
            email: 'jessica.liu@email.com',
            phone: '+1 (555) 567-8901',
            title: 'Product Manager',
            specialization: 'Product Management',
            experience: '8 years',
            bio: 'Mentor aspiring product managers with focus on data-driven decision making.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
            certifications: ['Pragmatic Marketing Certified', 'Product Strategy Certificate'],
            languages: ['English', 'Mandarin'],
            hourlyRate: 70,
            availability: 'Flexible, available on request',
            successStories: '12 mentees launched successful products',
            submittedAt: '2026-01-09',
            status: 'pending'
        }
    ];

    const allApplications = [...mentorApplications, ...sampleApplications];

    const filteredApplications = allApplications.filter(app => {
        const matchesSearch = 
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = app.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    const handleApprove = (application) => {
        updateMentorApplicationStatus(application.id, 'approved');
        setShowDetailsModal(false);
        setSuccessPopup({
            isOpen: true,
            type: 'success',
            message: `${application.name} has been approved as a Mentor! Notification email will be sent to ${application.email}.`
        });
    };

    const handleReject = (application) => {
        updateMentorApplicationStatus(application.id, 'rejected');
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
            color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
            icon: Clock
        },
        {
            label: 'Approved',
            count: allApplications.filter(a => a.status === 'approved').length,
            color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
            icon: CheckCircle
        },
        {
            label: 'Rejected',
            count: allApplications.filter(a => a.status === 'rejected').length,
            color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
            icon: XCircle
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
                            Mentor Applications
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Manage and review mentor registration applications
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`${stat.color} rounded-lg p-4 flex items-center gap-4`}
                        >
                            <IconComponent className="w-8 h-8 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold">{stat.count}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, title, or specialization..."
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
                            No {filterStatus} mentor applications found
                        </p>
                    </div>
                ) : (
                    filteredApplications.map(application => (
                        <div
                            key={application.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <Avatar src={application.avatar} alt={application.name} size="lg" />
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                                            {application.name}
                                        </h3>
                                        <p className="text-primary-600 dark:text-primary-400 font-medium truncate">
                                            {application.title}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {application.specialization}
                                        </p>
                                        <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Award className="w-4 h-4" />
                                                {application.experience}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                ${application.hourlyRate}/hr
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
                                    <Badge 
                                        variant={
                                            application.status === 'pending' ? 'warning' :
                                            application.status === 'approved' ? 'success' : 'danger'
                                        }
                                    >
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </Badge>
                                    {application.status === 'pending' && (
                                        <div className="flex gap-2 w-full xs:w-auto">
                                            <Button 
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleReject(application)}
                                                className="flex-1 xs:flex-none gap-1"
                                                title="Reject this mentor application"
                                            >
                                                <XCircle className="w-3 h-3" />
                                                <span className="text-xs">Reject</span>
                                            </Button>
                                            <Button 
                                                size="sm"
                                                onClick={() => handleApprove(application)}
                                                className="flex-1 xs:flex-none gap-1"
                                                title="Approve this mentor application"
                                            >
                                                <CheckCircle className="w-3 h-3" />
                                                <span className="text-xs">Approve</span>
                                            </Button>
                                        </div>
                                    )}
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleViewDetails(application)}
                                        className="gap-2 w-full xs:w-auto"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span className="text-xs xs:text-sm">Details</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedApplication && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Mentor Application Details
                            </h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Profile Section */}
                            <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                <Avatar src={selectedApplication.avatar} alt={selectedApplication.name} size="xl" />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedApplication.name}
                                    </h3>
                                    <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mt-1">
                                        {selectedApplication.title}
                                    </p>
                                    <Badge variant="info" className="mt-2">
                                        {selectedApplication.specialization}
                                    </Badge>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                                            <p className="text-sm text-gray-900 dark:text-white truncate">
                                                {selectedApplication.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Phone</p>
                                            <p className="text-sm text-gray-900 dark:text-white truncate">
                                                {selectedApplication.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Details */}
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Professional Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Experience</p>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                                            {selectedApplication.experience}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hourly Rate</p>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                                            ${selectedApplication.hourlyRate}/hour
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Availability</p>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                                            {selectedApplication.availability}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Submitted</p>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                                            {selectedApplication.submittedAt}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Professional Bio</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {selectedApplication.bio}
                                </p>
                            </div>

                            {/* Success Stories */}
                            {selectedApplication.successStories && (
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Success Stories</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {selectedApplication.successStories}
                                    </p>
                                </div>
                            )}

                            {/* Languages */}
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedApplication.languages.map(lang => (
                                        <Badge key={lang} variant="info">
                                            {lang}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Certifications</h4>
                                <div className="space-y-2">
                                    {selectedApplication.certifications.map((cert, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                            <Award className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-900 dark:text-white">{cert}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {selectedApplication.status === 'pending' && (
                                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        variant="danger"
                                        onClick={() => handleReject(selectedApplication)}
                                        className="flex-1 gap-2 py-2 xs:py-2.5 text-sm xs:text-base"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        <span>Reject Application</span>
                                    </Button>
                                    <Button
                                        onClick={() => handleApprove(selectedApplication)}
                                        className="flex-1 gap-2 py-2 xs:py-2.5 text-sm xs:text-base"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Approve Application</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {successPopup.isOpen && (
                <StickPopup
                    type={successPopup.type}
                    title={successPopup.type === 'success' ? 'Application Approved!' : 'Application Rejected!'}
                    message={successPopup.message}
                    onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
                />
            )}
        </div>
    );
};

export default AdminMentorApplications;
