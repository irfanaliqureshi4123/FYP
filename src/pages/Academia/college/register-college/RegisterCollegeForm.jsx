import React from 'react';
import { Upload, X, Loader } from 'lucide-react';
import Button from '../../../../components/common/Button';

/**
 * Register College Form Component
 * Form fields for college registration
 */
const RegisterCollegeForm = ({
    formData,
    errors,
    onInputChange,
    onFileChange,
    onColorChange,
    onRemoveFile,
    onSubmit,
    onReset,
    isSubmitting,
    submitMessage
}) => {
    const handleColorInputChange = (e) => {
        const { name, value } = e.target;
        onColorChange(value, name);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="space-y-4">
                    {/* College Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            College Name *
                        </label>
                        <input
                            type="text"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={onInputChange}
                            placeholder="e.g., Metropolitan Institute of Technology"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.collegeName
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.collegeName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.collegeName}</p>}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            College Type *
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={onInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.type
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        >
                            <option value="">Select Type</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="NGO">NGO</option>
                        </select>
                        {errors.type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onInputChange}
                            placeholder="Describe your college..."
                            rows="4"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.description
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={onInputChange}
                            placeholder="e.g., 123 Tech Campus, City 456789"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.location
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Principal Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Principal/Director Name *
                        </label>
                        <input
                            type="text"
                            name="principalName"
                            value={formData.principalName}
                            onChange={onInputChange}
                            placeholder="Full name"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.principalName
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.principalName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.principalName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onInputChange}
                            placeholder="contact@college.edu"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.email
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={onInputChange}
                            placeholder="+1 (555) 123-4567"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.phone
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Website (Optional)
                        </label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={onInputChange}
                            placeholder="https://college.edu"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.website
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.website && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.website}</p>}
                    </div>
                </div>
            </div>

            {/* Academic Information */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Founded Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Founded Year *
                        </label>
                        <input
                            type="number"
                            name="foundedYear"
                            value={formData.foundedYear}
                            onChange={onInputChange}
                            placeholder="2000"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.foundedYear
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.foundedYear && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.foundedYear}</p>}
                    </div>

                    {/* Motto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Motto (Optional)
                        </label>
                        <input
                            type="text"
                            name="motto"
                            value={formData.motto}
                            onChange={onInputChange}
                            placeholder="e.g., Excellence in Education"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.motto
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                    </div>

                    {/* Total Students */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Total Students *
                        </label>
                        <input
                            type="number"
                            name="totalStudents"
                            value={formData.totalStudents}
                            onChange={onInputChange}
                            placeholder="3500"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.totalStudents
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.totalStudents && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.totalStudents}</p>}
                    </div>

                    {/* Total Faculty */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Total Faculty Members *
                        </label>
                        <input
                            type="number"
                            name="totalTeachers"
                            value={formData.totalTeachers}
                            onChange={onInputChange}
                            placeholder="250"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.totalTeachers
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {errors.totalTeachers && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.totalTeachers}</p>}
                    </div>

                    {/* Accreditation */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Accreditation (Optional)
                        </label>
                        <input
                            type="text"
                            name="accreditation"
                            value={formData.accreditation}
                            onChange={onInputChange}
                            placeholder="e.g., AICTE Approved, NBA Accredited"
                            className={`w-full px-4 py-2 rounded-lg border ${
                                errors.accreditation
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                    </div>
                </div>
            </div>

            {/* College Colors */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">College Colors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Primary Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Primary Color
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="color"
                                name="primaryColor"
                                value={formData.primaryColor}
                                onChange={handleColorInputChange}
                                className="w-16 h-10 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.primaryColor}
                                onChange={handleColorInputChange}
                                name="primaryColor"
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Secondary Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Secondary Color
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="color"
                                name="secondaryColor"
                                value={formData.secondaryColor}
                                onChange={handleColorInputChange}
                                className="w-16 h-10 rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                value={formData.secondaryColor}
                                onChange={handleColorInputChange}
                                name="secondaryColor"
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="w-4 h-4 mr-2 animate-spin inline" />
                            Registering...
                        </>
                    ) : (
                        'Register College'
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onReset}
                    disabled={isSubmitting}
                    className="flex-1"
                >
                    Reset
                </Button>
            </div>

            {/* Success/Error Message */}
            {submitMessage && (
                <div className={`p-4 rounded-lg ${
                    submitMessage.includes('successfully')
                        ? 'bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800'
                        : 'bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800'
                }`}>
                    <p className={`text-sm font-medium ${
                        submitMessage.includes('successfully')
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-red-700 dark:text-red-400'
                    }`}>
                        {submitMessage}
                    </p>
                </div>
            )}
        </form>
    );
};

export default RegisterCollegeForm;
