import React, { useState, useCallback } from 'react';
import { Loader, Plus } from 'lucide-react';
import Button from '../../../../components/common/Button';
import RegisterCollegeForm from './RegisterCollegeForm';
import { getInitialFormState, validateForm } from './validation';

/**
 * Register College Tab Component
 * Displays the registration form in a tab view instead of a modal
 */
const RegisterCollegeTab = ({ onRegister }) => {
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

            // Generate new college object
            const newCollege = {
                id: `college-${Date.now()}`,
                name: formData.collegeName,
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
                colors: [formData.primaryColor, formData.secondaryColor],
                departments: []
            };

            // Call parent handler
            if (onRegister) {
                onRegister(newCollege);
            }

            setSubmitMessage('College registered successfully! ✓');
            
            // Reset form after success
            setTimeout(() => {
                handleReset();
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitMessage('Failed to register college. Please try again.');
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
        <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Register Your College</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Fill in the details below to register your college on our platform</p>

                <RegisterCollegeForm
                    formData={formData}
                    errors={errors}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                    onColorChange={handleColorChange}
                    onRemoveFile={handleRemoveFile}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    isSubmitting={isSubmitting}
                    submitMessage={submitMessage}
                />
            </div>
        </div>
    );
};

export default RegisterCollegeTab;
