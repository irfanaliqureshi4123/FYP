import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Toast from '../common/Toast';

const BookingModal = ({ isOpen, onClose, counsellor, onSubmit }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        duration: '1',
        userName: '',
        userEmail: '',
        userPhone: '',
        notes: ''
    });

    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

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

        // Submit form
        const bookingData = {
            ...formData,
            counsellorId: counsellor.id,
            counsellorName: counsellor.name,
            totalPrice: calculatePrice()
        };
        onSubmit(bookingData);
        
        setToast({
            type: 'success',
            message: 'Session booked successfully! Confirmation sent to your email.'
        });
        
        setTimeout(() => {
            setToast(null);
            onClose();
            // Reset form
            setFormData({
                date: '',
                time: '',
                duration: '1',
                userName: '',
                userEmail: '',
                userPhone: '',
                notes: ''
            });
            setErrors({});
        }, 2000);
    };

    if (!isOpen || !counsellor) return null;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Book Session</h2>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">with {counsellor.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Counsellor Info Card */}
                    <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3 xs:p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary-200 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">{counsellor.specialization.charAt(0)}</span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-white text-sm xs:text-base">{counsellor.title}</p>
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">${counsellor.fees}/hour</p>
                            </div>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
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

                    {/* Duration */}
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

                    {/* Your Details */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="text-sm xs:text-base font-semibold text-gray-900 dark:text-white mb-4">Your Details</h3>
                        
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
                    <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Tell the counsellor about your concerns..."
                            rows={3}
                            className="w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                        />
                    </div>

                    {/* Price Summary */}
                    {formData.duration && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 xs:p-4 border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-between">
                                <span className="text-xs xs:text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Price</span>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4 text-primary-600" />
                                    <span className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">{calculatePrice()}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {counsellor.fees}/hr × {formData.duration} hr{formData.duration !== '1' ? 's' : ''}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4">
                        <Button
                            onClick={onClose}
                            className="w-full xs:flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 py-2 xs:py-2.5 text-xs xs:text-sm font-medium"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full xs:flex-1 py-2 xs:py-2.5 text-xs xs:text-sm font-medium">
                            Confirm Booking
                        </Button>
                    </div>
                </form>

                {/* Toast */}
                {toast && (
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default BookingModal;
