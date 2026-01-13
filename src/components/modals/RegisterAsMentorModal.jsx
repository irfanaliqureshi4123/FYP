import React, { useState } from 'react';
import { X, Upload, Plus, Trash2, Star } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Toast from '../common/Toast';

const RegisterAsMentorModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        specialization: '',
        bio: '',
        experience: '',
        hourlyRate: '',
        successStories: '',
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
        'Education & Academics',
        'Entrepreneurship',
        'Sales & Marketing',
        'Product Management',
        'Data Science & Analytics',
        'Other'
    ];

    const availableLanguages = [
        'English',
        'Spanish',
        'Mandarin',
        'French',
        'German',
        'Hindi',
        'Portuguese',
        'Italian',
        'Tamil',
        'Japanese',
        'Korean'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setToast({ message: 'Image size should be less than 5MB', type: 'error' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    avatar: file,
                    avatarPreview: reader.result
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
            if (errors.certifications) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.certifications;
                    return newErrors;
                });
            }
        }
    };

    const handleRemoveCertification = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    const handleToggleLanguage = (language) => {
        setFormData(prev => {
            const languages = prev.languages.includes(language)
                ? prev.languages.filter(lang => lang !== language)
                : [...prev.languages, language];
            return { ...prev, languages };
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.title.trim()) newErrors.title = 'Professional title is required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (!formData.bio.trim()) newErrors.bio = 'Professional bio is required (min 20 characters)';
        if (formData.bio.trim().length < 20) newErrors.bio = 'Bio must be at least 20 characters';
        if (!formData.experience) newErrors.experience = 'Years of experience is required';
        if (parseInt(formData.experience) < 5) newErrors.experience = 'Minimum 5 years experience required';
        if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
        if (parseInt(formData.hourlyRate) <= 0) newErrors.hourlyRate = 'Rate must be greater than 0';
        if (formData.certifications.length === 0) newErrors.certifications = 'At least one certification is required';
        if (!formData.availability.trim()) newErrors.availability = 'Availability information is required';
        if (formData.languages.length === 0) newErrors.languages = 'At least one language is required';
        if (!formData.successStories.trim()) newErrors.successStories = 'Success stories are required (min 20 characters)';
        if (formData.successStories.trim().length < 20) newErrors.successStories = 'Please write at least 20 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setToast({ message: 'Please fill all required fields correctly', type: 'error' });
            return;
        }

        // Convert avatar file to data URL if it exists
        const processedData = { ...formData };
        
        if (formData.avatar && formData.avatarPreview) {
            processedData.avatar = formData.avatarPreview;
        }

        // Mentor status tracking
        processedData.status = 'pending';
        processedData.appliedAt = new Date().toISOString();

        console.log('Mentor registration submitted:', processedData);

        onSubmit(processedData);

        setToast({ 
            message: 'Mentor application submitted! Admin will review within 3-5 days.',
            type: 'success' 
        });

        setTimeout(() => {
            resetForm();
            onClose();
        }, 1500);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            title: '',
            specialization: '',
            bio: '',
            experience: '',
            hourlyRate: '',
            successStories: '',
            certifications: [],
            availability: '',
            languages: [],
            avatar: null,
            avatarPreview: null
        });
        setNewCertification('');
        setNewLanguage('');
        setErrors({});
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 sm:p-6 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Register as a Mentor
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Share your expertise and guide the next generation
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <X className="w-6 h-6" />
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
                                    <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                        Click to upload or drag and drop
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        PNG, JPG up to 5MB
                                    </span>
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

                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Basic Information</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                error={errors.name}
                                required
                            />
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                error={errors.email}
                                required
                            />
                            <Input
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 123-4567"
                                error={errors.phone}
                                required
                            />
                            <Input
                                label="Professional Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Senior Software Engineer"
                                error={errors.title}
                                required
                            />
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Professional Details</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Specialization *
                            </label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select specialization</option>
                                {specializations.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                            {errors.specialization && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.specialization}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Years of Experience"
                                name="experience"
                                type="number"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="5"
                                error={errors.experience}
                                required
                                min="5"
                            />
                            <Input
                                label="Hourly Rate (USD)"
                                name="hourlyRate"
                                type="number"
                                value={formData.hourlyRate}
                                onChange={handleInputChange}
                                placeholder="75"
                                error={errors.hourlyRate}
                                required
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Professional Bio *
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Share your professional background, expertise, and mentoring approach"
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {errors.bio && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.bio}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Success Stories *
                            </label>
                            <textarea
                                name="successStories"
                                value={formData.successStories}
                                onChange={handleInputChange}
                                placeholder="Share examples of mentees you've helped and their achievements"
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            {errors.successStories && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.successStories}</p>
                            )}
                        </div>

                        <Input
                            label="Availability"
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            placeholder="e.g., Weekends, 2pm-6pm EST"
                            error={errors.availability}
                            required
                        />
                    </div>

                    {/* Credentials */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Credentials & Skills</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Certifications *
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        value={newCertification}
                                        onChange={(e) => setNewCertification(e.target.value)}
                                        placeholder="Add certification (e.g., PMP, MBA)"
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddCertification}
                                        icon={<Plus className="w-4 h-4" />}
                                    >
                                        Add
                                    </Button>
                                </div>
                                {errors.certifications && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.certifications}</p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {formData.certifications.map((cert, index) => (
                                        <div
                                            key={index}
                                            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-100 px-3 py-1 rounded-full text-sm"
                                        >
                                            {cert}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCertification(index)}
                                                className="hover:text-primary-900 dark:hover:text-primary-200"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Languages *</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {availableLanguages.map(language => (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() => handleToggleLanguage(language)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        formData.languages.includes(language)
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                        {errors.languages && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.languages}</p>
                        )}
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps</h4>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            <li>✓ Your application will be reviewed within 3-5 days</li>
                            <li>✓ We'll verify your credentials and experience</li>
                            <li>✓ Once approved, your profile will be listed in our mentor directory</li>
                            <li>✓ Mentees can discover and book sessions with you</li>
                        </ul>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                        >
                            Submit Application
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterAsMentorModal;
