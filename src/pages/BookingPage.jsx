import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import counsellorsData from '../data/counsellors.json';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Toast from '../components/common/Toast';
import Avatar from '../components/common/Avatar';

const BookingPage = () => {
    const navigate = useNavigate();
    const { counsellorId } = useParams();
    const { currentUser } = useApp();

    const counsellor = counsellorsData.find(c => c.id === counsellorId);

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        duration: '1',
        userName: currentUser?.name || '',
        userEmail: currentUser?.email || '',
        userPhone: '',
        notes: ''
    });

    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const durations = [
        { value: '0.5', label: '30 minutes' },
        { value: '1', label: '1 hour' },
        { value: '1.5', label: '1.5 hours' },
        { value: '2', label: '2 hours' }
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.date.trim()) newErrors.date = 'Date is required';
        if (!formData.time.trim()) newErrors.time = 'Time is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.userName.trim()) newErrors.userName = 'Name is required';
        if (!formData.userEmail.trim()) newErrors.userEmail = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) newErrors.userEmail = 'Valid email is required';
        if (!formData.userPhone.trim()) newErrors.userPhone = 'Phone is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculatePrice = () => {
        return (counsellor.fees * parseFloat(formData.duration)).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setToast({
                type: 'error',
                message: 'Please fill in all required fields correctly'
            });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const bookingData = {
                ...formData,
                counsellorId: counsellor.id,
                counsellorName: counsellor.name,
                totalPrice: calculatePrice()
            };
            console.log('Session booked:', bookingData);
            
            setToast({
                type: 'success',
                message: 'Session booked successfully! Confirmation sent to your email.'
            });
            
            setTimeout(() => {
                setIsSubmitting(false);
                setToast(null);
                navigate('/counselling');
            }, 2000);
        }, 1000);
    };

    if (!counsellor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Counsellor not found</h1>
                <Button onClick={() => navigate('/counselling')} className="mt-4">
                    Back to Counselling
                </Button>
            </div>
        );
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-4 xs:space-y-5 sm:space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-2 xs:gap-3 mb-4">
                    <button
                        onClick={() => navigate('/counselling')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                    >
                        <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Book Session</h1>
                        <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 truncate">Schedule a consultation with {counsellor.name}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 sm:space-y-6">
                        {/* Session Details */}
                        <div>
                            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">Session Details</h2>
                            
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 mb-4">
                                <div>
                                    <label className="text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        min={today}
                                        className={`w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm ${
                                            errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    />
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                                </div>
                                <div>
                                    <label className="text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm ${
                                            errors.time ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    />
                                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Duration *</label>
                                <select
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm ${
                                        errors.duration ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                >
                                    <option value="">Select Duration</option>
                                    {durations.map(d => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                            </div>
                        </div>

                        {/* Your Details */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">Your Details</h2>
                            
                            <div className="space-y-3 xs:space-y-4">
                                <div>
                                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                                    <Input
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        error={errors.userName}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                                    <Input
                                        type="email"
                                        name="userEmail"
                                        value={formData.userEmail}
                                        onChange={handleInputChange}
                                        placeholder="your.email@example.com"
                                        error={errors.userEmail}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
                                    <Input
                                        name="userPhone"
                                        value={formData.userPhone}
                                        onChange={handleInputChange}
                                        placeholder="+1 (555) 000-0000"
                                        error={errors.userPhone}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">Additional Information</h2>
                            <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes (Optional)</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Tell the counsellor about your concerns, goals, or any specific topics you'd like to discuss..."
                                rows={4}
                                className="w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                onClick={() => navigate('/counselling')}
                                className="w-full xs:flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 py-2 xs:py-2.5 text-xs xs:text-sm font-medium"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full xs:flex-1 py-2 xs:py-2.5 text-xs xs:text-sm font-medium disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Sidebar - Counsellor Info & Summary */}
                <div className="lg:col-span-1 space-y-4 xs:space-y-5 sm:space-y-6">
                    {/* Counsellor Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">Counsellor Details</h2>
                        
                        <div className="flex flex-col items-center xs:items-start gap-4">
                            <Avatar src={counsellor.avatar} alt={counsellor.name} size="xl" />
                            <div className="w-full">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm xs:text-base">{counsellor.name}</h3>
                                <p className="text-xs xs:text-sm text-primary-600 mb-2">{counsellor.title}</p>
                                
                                <div className="space-y-2 mb-4 text-xs xs:text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Badge variant="primary" size="sm">{counsellor.specialization}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                        <span>{counsellor.availability}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-semibold text-primary-600">
                                        <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                                        <span>${counsellor.fees}/hour</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-full ${i < Math.floor(counsellor.rating) ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                                    ))}
                                    <span className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-400 ml-1">
                                        {counsellor.rating} ({counsellor.reviews})
                                    </span>
                                </div>

                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-3">{counsellor.bio}</p>

                                <div className="flex flex-wrap gap-1">
                                    {counsellor.languages.map(lang => (
                                        <Badge key={lang} variant="secondary" size="sm" className="text-[10px] xs:text-xs">{lang}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    {formData.duration && (
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-200 dark:border-primary-800 shadow-sm">
                            <h3 className="text-base xs:text-lg font-bold text-gray-900 dark:text-white mb-4">Price Summary</h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs xs:text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">Hourly Rate</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">${counsellor.fees}.00</span>
                                </div>
                                <div className="flex items-center justify-between text-xs xs:text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">Duration</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{formData.duration} hour{formData.duration !== '1' ? 's' : ''}</span>
                                </div>
                                <div className="border-t border-primary-300 dark:border-primary-700 my-3 pt-3 flex items-center justify-between">
                                    <span className="font-bold text-gray-900 dark:text-white text-sm xs:text-base">Total Price</span>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4 xs:w-5 xs:h-5 text-primary-600" />
                                        <span className="text-lg xs:text-2xl font-bold text-primary-600">{calculatePrice()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Box */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl p-4 sm:p-6">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-xs xs:text-sm mb-2">Booking Info</h4>
                        <ul className="text-xs xs:text-sm text-blue-800 dark:text-blue-200 space-y-2">
                            <li>• Confirmation will be sent to your email</li>
                            <li>• You'll receive a video call link before the session</li>
                            <li>• Sessions are conducted online via video</li>
                            <li>• Cancellation possible up to 24 hours before</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default BookingPage;
