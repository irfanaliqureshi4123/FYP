import React from 'react';

/**
 * Avatar Component
 * Displays user profile pictures with status indicators
 */
const Avatar = ({
    src,
    alt = 'User avatar',
    size = 'md',
    online = false,
    className = ''
}) => {
    const sizes = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
        '2xl': 'w-20 h-20',
    };

    const statusSizes = {
        xs: 'w-1.5 h-1.5',
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4',
        '2xl': 'w-5 h-5',
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <img
                src={src}
                alt={alt}
                className={`${sizes[size]} rounded-full object-cover ring-2 ring-white dark:ring-gray-800`}
            />
            {online && (
                <span
                    className={`absolute top-0 right-0 ${statusSizes[size]} bg-green-500 border-2 border-white dark:border-gray-800 rounded-full`}
                ></span>
            )}
        </div>
    );
};

export default Avatar;
