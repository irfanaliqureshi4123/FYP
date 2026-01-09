import React, { useState } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Toast from '../common/Toast';

const RegisterAsCounsellorModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        specialization: '',
        bio: '',
        experience: '',
        fees: '',
        certifications: [],
        availability: '',
        languages: [],
        avatar: null,
        avatarPreview: null
    });

    const [newCertification, setNewCertification] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

    const specializations = [
        'Tech & IT',
        'Finance & Business',
        'Design, Arts & Media',
        'Medical & Healthcare',
        'Education & Research',
        'Entrepreneurship',
        'Human Resources',
        'Engineering'
    ];

    const languages = ['English', 'Spanish', 'Mandarin', 'French', 'German', 'Hindi', 'Portuguese', 'Italian', 'Tamil'];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
        if (!formData.fees) newErrors.fees = 'Fees is required';
        if (formData.certifications.length === 0) newErrors.certifications = 'At least one certification is required';
        if (!formData.availability.trim()) newErrors.availability = 'Availability is required';
        if (formData.languages.length === 0) newErrors.languages = 'At least one language is required';

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

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    avatar: file,
                    avatarPreview: event.target?.result || null
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCertification = () => {
        if (newCertification.trim()) {
            setFormData(prev => ({
                ...prev,
                certifications: [...prev.certifications, newCertification.trim()]
            }));
            setNewCertification('');
        }
    };

    const handleRemoveCertification = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    const handleLanguageToggle = (lang) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setToast({
                type: 'error',
                message: 'Please fill in all required fields'
            });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        // Submit form
        onSubmit(formData);
        setToast({
            type: 'success',
            message: 'Your counsellor registration has been submitted successfully!'
        });
        setTimeout(() => {
            setToast(null);
            onClose();
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                title: '',
                specialization: '',
                bio: '',
                experience: '',
                fees: '',
                certifications: [],
                availability: '',
                languages: [],
                avatar: null,
                avatarPreview: null
            });
            setErrors({});
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Register as Career Counsellor</h2>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Share your expertise and help students</p>
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
                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Profile Image</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {formData.avatarPreview && (
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={formData.avatarPreview}
                                        alt="Preview"
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-primary-500 transition-colors flex flex-col items-center justify-center">
                                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-2" />
                                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">Click to upload</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g., Dr. Sarah Johnson"
                                error={errors.name}
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                error={errors.email}
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
                            <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 000-0000"
                                error={errors.phone}
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Title *</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Senior Career Counsellor"
                                error={errors.title}
                            />
                        </div>
                    </div>

                    {/* Specialization and Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialization *</label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className={`w-full px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm ${
                                    errors.specialization ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                            >
                                <option value="">Select Specialization</option>
                                {specializations.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience (years) *</label>
                            <Input
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="e.g., 15 years"
                                error={errors.experience}
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Bio *</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about your professional background and expertise..."
                            rows={3}
                            className={`w-full px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm ${
                                errors.bio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
                    </div>

                    {/* Availability and Fees */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability *</label>
                            <Input
                                name="availability"
                                value={formData.availability}
                                onChange={handleInputChange}
                                placeholder="e.g., Mon-Fri, 9am-6pm"
                                error={errors.availability}
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hourly Fees (USD) *</label>
                            <Input
                                type="number"
                                name="fees"
                                value={formData.fees}
                                onChange={handleInputChange}
                                placeholder="e.g., 50"
                                error={errors.fees}
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Certifications */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certifications *</label>
                        <div className="flex flex-col xs:flex-row gap-2 mb-2">
                            <Input
                                value={newCertification}
                                onChange={(e) => setNewCertification(e.target.value)}
                                placeholder="Add a certification"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                            />
                            <button
                                type="button"
                                onClick={handleAddCertification}
                                className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-1 xs:gap-2 font-medium text-xs xs:text-sm whitespace-nowrap flex-shrink-0"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-lg">
                                    <span className="text-gray-900 dark:text-white text-xs sm:text-sm truncate">{cert}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCertification(index)}
                                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0 ml-2"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.certifications && <p className="text-red-500 text-xs mt-1">{errors.certifications}</p>}
                    </div>

                    {/* Languages */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Languages *</label>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {languages.map(lang => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => handleLanguageToggle(lang)}
                                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                        formData.languages.includes(lang)
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4">
                        <Button
                            onClick={onClose}
                            className="w-full xs:flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 py-2 xs:py-2.5 text-xs xs:text-sm font-medium"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full xs:flex-1 py-2 xs:py-2.5 text-xs xs:text-sm font-medium">
                            Submit Registration
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

export default RegisterAsCounsellorModal;
