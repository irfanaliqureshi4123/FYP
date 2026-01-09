import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Briefcase, Clock, DollarSign, MessageCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import counsellorsData from '../data/counsellors.json';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Toast from '../components/common/Toast';
import Avatar from '../components/common/Avatar';
import RegisterAsCounsellorModal from '../components/modals/RegisterAsCounsellorModal';

const CareerCounselling = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('All');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [toast, setToast] = useState(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const specializations = [
        'All',
        'Tech & IT',
        'Finance & Business',
        'Design, Arts & Media',
        'Medical & Healthcare',
        'Education & Research',
        'Entrepreneurship',
        'Human Resources',
        'Engineering'
    ];

    const filteredCounsellors = counsellorsData.filter(counsellor => {
        const matchesSearch = 
            counsellor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            counsellor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            counsellor.bio.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesSpecialization = selectedSpecialization === 'All' || counsellor.specialization === selectedSpecialization;
        
        return matchesSearch && matchesSpecialization;
    });

    const handleBookSession = (counsellor) => {
        navigate(`/counselling/booking/${counsellor.id}`);
    };

    const handleContact = (counsellor) => {
        navigate(`/counselling/chat/${counsellor.id}`);
    };

    const handleRegisterSubmit = (formData) => {
        // Handle form submission - you can send this to a backend
        console.log('Counsellor registration submitted:', formData);
    };

    return (
        <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4 mb-4">
                    <div className="flex items-start gap-2 xs:gap-3 flex-1 min-w-0">
                        <button
                            onClick={() => navigate('/explore')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Career Counselling</h1>
                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 truncate">Connect with professional counsellors</p>
                        </div>
                    </div>
                    <Button onClick={() => setShowRegisterModal(true)} className="w-full xs:w-auto whitespace-nowrap text-xs xs:text-sm py-2 xs:py-2.5">Register as Counsellor</Button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search counsellors..."
                        className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm xs:text-base"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white mb-3">Filter</h3>
                <div className="relative">
                    <button
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        className="w-full flex items-center justify-between px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <span className="text-xs xs:text-sm font-medium truncate">{selectedSpecialization}</span>
                        <ChevronDown className={`w-3 h-3 xs:w-4 xs:h-4 transition-transform flex-shrink-0 ml-2 ${showFilterDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showFilterDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                            {specializations.map((spec) => (
                                <button
                                    key={spec}
                                    onClick={() => {
                                        setSelectedSpecialization(spec);
                                        setShowFilterDropdown(false);
                                    }}
                                    className={`w-full text-left px-3 xs:px-4 py-2 xs:py-2.5 text-xs xs:text-sm transition-colors ${
                                        selectedSpecialization === spec
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                    } ${spec !== specializations[specializations.length - 1] ? 'border-b border-gray-200 dark:border-gray-600' : ''}`}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                {filteredCounsellors.length === 0 ? (
                    <div className="col-span-full text-center py-8 xs:py-10 sm:py-12">
                        <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-400">No counsellors found</p>
                    </div>
                ) : (
                    filteredCounsellors.map((counsellor) => (
                        <div
                            key={counsellor.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-3 xs:p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start gap-2 xs:gap-3 mb-3 xs:mb-4 min-w-0">
                                <Avatar src={counsellor.avatar} alt={counsellor.name} size="lg" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm xs:text-base truncate">{counsellor.name}</h3>
                                    <p className="text-xs xs:text-sm text-primary-600 truncate">{counsellor.title}</p>
                                    <div className="flex items-center gap-0.5 xs:gap-1 mt-1 flex-wrap">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-2.5 h-2.5 xs:w-3 xs:h-3 ${i < Math.floor(counsellor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400 ml-0.5 xs:ml-1 whitespace-nowrap">
                                            {counsellor.rating} ({counsellor.reviews})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Badge variant="primary" size="sm" className="mb-2 xs:mb-3">{counsellor.specialization}</Badge>

                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-3 xs:mb-4 line-clamp-2">{counsellor.bio}</p>

                            <div className="space-y-1 xs:space-y-2 mb-3 xs:mb-4 text-xs xs:text-sm">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 min-w-0">
                                    <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                                    <span className="truncate">{counsellor.availability}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 min-w-0">
                                    <Briefcase className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                                    <span className="truncate">{counsellor.experience}</span>
                                </div>
                                <div className="flex items-center gap-2 font-semibold text-primary-600 min-w-0">
                                    <DollarSign className="w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0" />
                                    <span className="truncate">${counsellor.fees}/hour</span>
                                </div>
                            </div>

                            <div className="mb-3 xs:mb-4 flex flex-wrap gap-1">
                                {counsellor.languages.map(lang => (
                                    <Badge key={lang} variant="secondary" size="sm" className="text-[10px] xs:text-xs">{lang}</Badge>
                                ))}
                            </div>

                            <div className="flex flex-col xs:flex-row gap-2">
                                <Button onClick={() => handleBookSession(counsellor)} className="flex-1 text-xs xs:text-sm py-2 xs:py-2.5">
                                    Book
                                </Button>
                                <button
                                    onClick={() => handleContact(counsellor)}
                                    className="flex-1 px-2 xs:px-3 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2"
                                >
                                    <MessageCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                                    Chat
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
            )}

            <RegisterAsCounsellorModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSubmit={handleRegisterSubmit}
            />
        </div>
    );
};

export default CareerCounselling;
