import React from 'react';

/**
 * Input Component
 * Reusable form input with labels and error states
 */
const Input = ({
    label,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error = '',
    helper = '',
    required = false,
    disabled = false,
    icon = null,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                {type === 'textarea' ? (
                    <textarea
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`
              w-full px-4 py-2 
              ${icon ? 'pl-10' : ''}
              bg-white dark:bg-gray-800 
              border rounded-lg 
              ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              resize-none
            `}
                        rows={4}
                        {...props}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`
              w-full px-4 py-2 
              ${icon ? 'pl-10' : ''}
              bg-white dark:bg-gray-800 
              border rounded-lg 
              ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            `}
                        {...props}
                    />
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
            {helper && !error && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
            )}
        </div>
    );
};

export default Input;
