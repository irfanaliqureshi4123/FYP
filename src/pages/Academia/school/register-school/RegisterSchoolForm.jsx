import React from 'react';
import { Upload, X } from 'lucide-react';
import { validationRules, schoolTypes, colorPresets } from './validation';

/**
 * Register School Form Fields Component
 * Contains all form fields and inputs for school registration
 */
const RegisterSchoolForm = ({
    formData,
    errors,
    onInputChange,
    onFileChange,
    onColorChange,
    onRemoveFile
}) => {
    const renderErrorMessage = (fieldName) => {
        if (!errors[fieldName]) return null;
        return (
            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                <span>●</span>
                {errors[fieldName]}
            </p>
        );
    };

    const renderTextInput = (label, name, placeholder, type = 'text', required = false, help = null) => {
        const field = validationRules[name];
        const hasError = !!errors[name];

        return (
            <div key={name}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name] || ''}
                    onChange={onInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                        hasError
                            ? 'border-red-500 dark:border-red-400 focus:ring-red-400 dark:focus:ring-red-600'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-blue-400 dark:focus:ring-blue-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {renderErrorMessage(name)}
                {help && !hasError && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{help}</p>
                )}
            </div>
        );
    };

    const renderNumberInput = (label, name, placeholder, required = false, min = 0, max = 999999) => {
        const hasError = !!errors[name];

        return (
            <div key={name}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    type="number"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name] || ''}
                    onChange={onInputChange}
                    min={min}
                    max={max}
                    className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                        hasError
                            ? 'border-red-500 dark:border-red-400 focus:ring-red-400 dark:focus:ring-red-600'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-blue-400 dark:focus:ring-blue-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {renderErrorMessage(name)}
            </div>
        );
    };

    const renderSelectInput = (label, name, options, required = false) => {
        const hasError = !!errors[name];

        return (
            <div key={name}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                    name={name}
                    value={formData[name] || ''}
                    onChange={onInputChange}
                    className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${
                        hasError
                            ? 'border-red-500 dark:border-red-400 focus:ring-red-400 dark:focus:ring-red-600'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-blue-400 dark:focus:ring-blue-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {renderErrorMessage(name)}
            </div>
        );
    };

    const renderTextarea = (label, name, placeholder, required = false, rows = 4) => {
        const hasError = !!errors[name];

        return (
            <div key={name}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={formData[name] || ''}
                    onChange={onInputChange}
                    rows={rows}
                    className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        hasError
                            ? 'border-red-500 dark:border-red-400 focus:ring-red-400 dark:focus:ring-red-600'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-blue-400 dark:focus:ring-blue-600'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
                {renderErrorMessage(name)}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {(formData[name] || '').length} / 500 characters
                </p>
            </div>
        );
    };

    const renderFileUpload = (label, name, accept = 'image/*', preview = null, required = false) => {
        const hasError = !!errors[name];
        const previewField = `${name}Preview`;

        return (
            <div key={name}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {formData[previewField] ? (
                    <div className="relative inline-block">
                        <img
                            src={formData[previewField]}
                            alt={label}
                            className="h-32 sm:h-40 w-full sm:max-w-xs object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                        />
                        <button
                            type="button"
                            onClick={() => onRemoveFile(name)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                            aria-label="Remove file"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <label className={`flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                        hasError
                            ? 'border-red-300 dark:border-red-400 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                    }`}>
                        <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500" />
                        <div className="text-center">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG, GIF up to 5MB
                            </p>
                        </div>
                        <input
                            type="file"
                            name={name}
                            accept={accept}
                            onChange={onFileChange}
                            className="hidden"
                        />
                    </label>
                )}

                {renderErrorMessage(name)}
            </div>
        );
    };

    const renderColorPicker = (label, name, required = false) => {
        return (
            <div key={name}>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                    {colorPresets.map(preset => (
                        <button
                            key={preset.name}
                            type="button"
                            onClick={() => onColorChange(preset.color, name)}
                            className={`h-10 sm:h-12 rounded-lg border-2 transition-all hover:scale-105 flex items-center justify-center ${
                                formData[name] === preset.color
                                    ? 'border-gray-900 dark:border-white scale-105'
                                    : 'border-gray-300 dark:border-gray-600'
                            }`}
                            style={{ backgroundColor: preset.color }}
                            title={preset.name}
                        >
                            {formData[name] === preset.color && (
                                <span className="text-white font-bold text-lg">✓</span>
                            )}
                        </button>
                    ))}
                </div>
                {renderErrorMessage(name)}
                {formData[name] && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Selected: {formData[name]}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4 sm:space-y-5 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs font-bold rounded">1</span>
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderTextInput(
                        'School Name',
                        'schoolName',
                        'Enter school name',
                        'text',
                        true,
                        'School name should be unique'
                    )}
                    {renderSelectInput(
                        'School Type',
                        'type',
                        schoolTypes,
                        true
                    )}
                    {renderTextInput(
                        'Location',
                        'location',
                        'City, Country',
                        'text',
                        true
                    )}
                    {renderNumberInput(
                        'Founded Year',
                        'foundedYear',
                        'e.g., 2020',
                        true,
                        1800,
                        new Date().getFullYear()
                    )}
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4 sm:space-y-5 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs font-bold rounded">2</span>
                    Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderTextInput(
                        'Principal Name',
                        'principalName',
                        'Full name of principal',
                        'text',
                        true
                    )}
                    {renderTextInput(
                        'Email',
                        'email',
                        'school@example.com',
                        'email',
                        true
                    )}
                    {renderTextInput(
                        'Phone',
                        'phone',
                        '+1234567890',
                        'tel',
                        true
                    )}
                    {renderTextInput(
                        'Website',
                        'website',
                        'https://example.com',
                        'url',
                        false,
                        'Optional website link'
                    )}
                </div>
            </div>

            {/* School Statistics Section */}
            <div className="space-y-4 sm:space-y-5 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs font-bold rounded">3</span>
                    School Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderNumberInput(
                        'Total Students',
                        'totalStudents',
                        'e.g., 1000',
                        true,
                        1,
                        10000
                    )}
                    {renderNumberInput(
                        'Total Teachers',
                        'totalTeachers',
                        'e.g., 50',
                        true,
                        1,
                        1000
                    )}
                </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4 sm:space-y-5 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs font-bold rounded">4</span>
                    About School
                </h3>
                <div className="space-y-4">
                    {renderTextarea(
                        'School Description',
                        'description',
                        'Tell us about your school...',
                        true,
                        4
                    )}
                    {renderTextInput(
                        'School Motto',
                        'motto',
                        'School motto or tagline',
                        'text',
                        false
                    )}
                    {renderTextInput(
                        'Accreditation',
                        'accreditation',
                        'e.g., ISO 9001, CBSE',
                        'text',
                        false
                    )}
                </div>
            </div>

            {/* Media Section */}
            <div className="space-y-4 sm:space-y-5 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs font-bold rounded">5</span>
                    School Branding
                </h3>
                <div className="space-y-4 sm:space-y-5">
                    {renderFileUpload(
                        'School Logo',
                        'logo',
                        'image/*',
                        null,
                        true
                    )}
                    {renderFileUpload(
                        'School Banner',
                        'banner',
                        'image/*',
                        null,
                        true
                    )}
                </div>
            </div>

            {/* Colors Section */}
            <div className="space-y-4 sm:space-y-5">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs font-bold rounded">6</span>
                    School Colors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {renderColorPicker(
                        'Primary Color',
                        'primaryColor',
                        true
                    )}
                    {renderColorPicker(
                        'Secondary Color',
                        'secondaryColor',
                        true
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterSchoolForm;
