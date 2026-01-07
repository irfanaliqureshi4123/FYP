import React, { useState, useCallback } from 'react';
import { Loader, ArrowLeft } from 'lucide-react';
import Button from '../../../../components/common/Button';
import RegisterUniversityForm from './RegisterUniversityForm';
import UniversityGroup from '../UniversityGroup';
import { getInitialFormState, validateForm } from './validation';

/**
 * Register University Tab Component
 * Displays the registration form in a tab view
 */
const RegisterUniversityTab = ({ onRegister }) => {
    const [formData, setFormData] = useState(getInitialFormState());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [registeredUniversity, setRegisteredUniversity] = useState(null);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'totalStudents' || name === 'totalTeachers' || name === 'foundedYear'
                ? parseInt(value) || 0
                : value
        }));
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

            const reader = new FileReader();
            reader.onloadend = () => {
                const previewFieldName = `${name}Preview`;
                setFormData(prev => ({
                    ...prev,
                    [previewFieldName]: reader.result
                }));
            };
            reader.readAsDataURL(file);

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
        
        const newErrors = validateForm(formData);
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSubmitMessage('');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUniversity = {
                id: `university-${Date.now()}`,
                name: formData.universityName,
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

            if (onRegister) {
                onRegister(newUniversity);
            }

            setRegisteredUniversity(newUniversity);
            setSubmitMessage('University registered successfully! ✓');
            
            setTimeout(() => {
                // Don't reset, keep showing the university group
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitMessage('Failed to register university. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData(getInitialFormState());
        setErrors({});
        setSubmitMessage('');
        setRegisteredUniversity(null);
    };

    // If university is registered, show success message and university group
    if (registeredUniversity) {
        return (
            <div className="space-y-4 sm:space-y-6">
                {/* Back Button */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg -ml-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Registration
                    </button>
                </div>

                {/* Success Message */}
                <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg">
                    <p className="text-green-700 dark:text-green-400 font-medium">
                        ✓ {registeredUniversity.name} has been successfully registered!
                    </p>
                </div>

                {/* University Group View */}
                <UniversityGroup 
                    universityId={registeredUniversity.id}
                    university={registeredUniversity}
                    onBack={handleReset}
                    isInRegistration={true}
                />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Register Your University</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Fill in the details below to register your university on our platform and create your university group</p>

                <RegisterUniversityForm
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

export default RegisterUniversityTab;
