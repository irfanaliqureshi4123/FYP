import React from 'react';

/**
 * Loader Component
 * Display loading spinner
 */
export const Loader = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`inline-block ${className}`}>
            <svg
                className={`animate-spin ${sizes[size]} text-primary-600`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    );
};

/**
 * Empty State Component
 * Display when no content is available
 */
export const EmptyState = ({
    icon: Icon,
    title,
    description,
    action = null,
    className = ''
}) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
            {Icon && (
                <div className="mb-4 text-gray-400 dark:text-gray-600">
                    <Icon className="w-16 h-16" />
                </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                {description}
            </p>
            {action}
        </div>
    );
};

export default Loader;
