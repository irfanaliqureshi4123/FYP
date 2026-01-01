import React, { useState, useCallback } from 'react';
import { Loader, Plus } from 'lucide-react';
import Button from '../../../../components/common/Button';
import RegisterSchoolForm from './RegisterSchoolForm';
import { getInitialFormState, validateForm } from './validation';

/**
 * Register School Tab Component
 * Displays the registration form in a tab view instead of a modal
 */
const RegisterSchoolTab = ({ onRegister }) => {
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
            
            // Reset form after success
            setTimeout(() => {
                handleReset();
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitMessage('Failed to register school. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData(getInitialFormState());
        setErrors({});
        setSubmitMessage('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Plus className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Register New School
                    </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                    Add a new school to the platform with complete information
                </p>
            </div>

            {/* Message */}
            {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg text-sm sm:text-base ${
                    submitMessage.includes('successfully')
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                    <p className="font-medium">{submitMessage}</p>
                </div>
            )}

            {/* Form */}
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
                        onClick={handleReset}
                        variant="outline"
                        size="md"
                        disabled={isSubmitting}
                        className="text-sm sm:text-base w-full sm:w-auto"
                    >
                        Clear Form
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
    );
};

export default RegisterSchoolTab;
