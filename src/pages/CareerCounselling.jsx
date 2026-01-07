import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Briefcase, Clock, DollarSign, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import counsellorsData from '../data/counsellors.json';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Toast from '../components/common/Toast';

const CareerCounselling = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('All');
    const [toast, setToast] = useState(null);

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
        setToast({
            type: 'success',
            message: `Session with ${counsellor.name} has been requested!`
        });
        setTimeout(() => setToast(null), 3000);
    };

    const handleContact = (counsellor) => {
        setToast({
            type: 'success',
            message: `Starting chat with ${counsellor.name}...`
        });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="space-y-4 xs:space-y-5 sm:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                    <button
                        onClick={() => navigate('/explore')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Counselling</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Connect with professional counsellors</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search counsellors..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Filter</h3>
                <div className="flex flex-wrap gap-2">
                    {specializations.map(spec => (
                        <button
                            key={spec}
                            onClick={() => setSelectedSpecialization(spec)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                selectedSpecialization === spec
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300'
                            }`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCounsellors.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No counsellors found</p>
                    </div>
                ) : (
                    filteredCounsellors.map((counsellor) => (
                        <div
                            key={counsellor.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <div className="text-4xl">{counsellor.avatar}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{counsellor.name}</h3>
                                    <p className="text-sm text-primary-600">{counsellor.title}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.floor(counsellor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                            {counsellor.rating} ({counsellor.reviews})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Badge variant="primary" size="sm" className="mb-3">{counsellor.specialization}</Badge>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{counsellor.bio}</p>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    <span>{counsellor.availability}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Briefcase className="w-4 h-4" />
                                    <span>{counsellor.experience}</span>
                                </div>
                                <div className="flex items-center gap-2 font-semibold text-primary-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span>${counsellor.fees}/hour</span>
                                </div>
                            </div>

                            <div className="mb-4 flex flex-wrap gap-1">
                                {counsellor.languages.map(lang => (
                                    <Badge key={lang} variant="secondary" size="sm">{lang}</Badge>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={() => handleBookSession(counsellor)} className="flex-1 text-sm">
                                    Book
                                </Button>
                                <button
                                    onClick={() => handleContact(counsellor)}
                                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
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
        </div>
    );
};

export default CareerCounselling;
