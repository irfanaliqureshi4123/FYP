import React, { useState, useCallback } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import Button from '../../../../components/common/Button';
import RegisterSchoolForm from './RegisterSchoolForm';
import { getInitialFormState, validateForm } from './validation';

/**
 * Register School Modal Component
 * Modal for registering a new school with form validation
 */
const RegisterSchool = ({ isOpen, onClose, onRegister }) => {
    const [formData, setFormData] = useState(getInitialFormState());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'totalStudents' || name === 'totalTeachers' || name === 'foundedYear'
                ? parseInt(value) || 0
                : value
        }));
        // Clear error for this field when user starts editing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);

    const handleFileChange = useCallback((e) => {
        const { name } = e.target;
        const file = e.target.files?.[0];
        
        if (file) {
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewFieldName = `${name}Preview`;
                setFormData(prev => ({
                    ...prev,
                    [previewFieldName]: reader.result
                }));
            };
            reader.readAsDataURL(file);

            // Clear error
            if (errors[name]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    }, [errors]);

    const handleColorChange = useCallback((color, type) => {
        setFormData(prev => ({
            ...prev,
            [type]: color
        }));
    }, []);

    const handleRemoveFile = useCallback((fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: null,
            [`${fieldName}Preview`]: null
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const newErrors = validateForm(formData);
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSubmitMessage('');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate new school object
            const newSchool = {
                id: `school-${Date.now()}`,
                name: formData.schoolName,
                logo: formData.logoPreview || '',
                banner: formData.bannerPreview || '',
                description: formData.description,
                location: formData.location,
                type: formData.type,
                contact: {
                    phone: formData.phone,
                    email: formData.email,
                    website: formData.website || ''
                },
                foundedYear: formData.foundedYear,
                principalName: formData.principalName,
                totalStudents: formData.totalStudents,
                totalTeachers: formData.totalTeachers,
                verified: false,
                followers: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                motto: formData.motto,
                accreditation: formData.accreditation,
                colors: [formData.primaryColor, formData.secondaryColor]
            };

            // Call parent handler
            if (onRegister) {
                onRegister(newSchool);
            }

            setSubmitMessage('School registered successfully! ✓');
            
            // Close modal after success
            setTimeout(() => {
                handleClose();
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitMessage('Failed to register school. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setFormData(getInitialFormState());
            setErrors({});
            setSubmitMessage('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl w-full max-w-sm sm:max-w-2xl shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                            Register New School
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Fill in the school details below
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                    {submitMessage && (
                        <div className={`mb-4 p-4 rounded-lg text-sm sm:text-base ${
                            submitMessage.includes('successfully')
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                            <p className="font-medium">{submitMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        <RegisterSchoolForm
                            formData={formData}
                            errors={errors}
                            onInputChange={handleInputChange}
                            onFileChange={handleFileChange}
                            onColorChange={handleColorChange}
                            onRemoveFile={handleRemoveFile}
                        />

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-5 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                type="button"
                                onClick={handleClose}
                                variant="outline"
                                size="md"
                                disabled={isSubmitting}
                                className="text-sm sm:text-base w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={isSubmitting}
                                className="text-sm sm:text-base flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                                {isSubmitting ? 'Registering...' : 'Register School'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterSchool;
