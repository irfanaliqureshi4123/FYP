import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal Component
 * Reusable modal dialog with blurred backdrop and responsive design
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    footer = null
}) => {
    useEffect(() => {
        // Prevent body scroll when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-xs sm:max-w-md',
        md: 'max-w-sm sm:max-w-lg',
        lg: 'max-w-md sm:max-w-2xl',
        xl: 'max-w-lg sm:max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Blurred Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Container - Responsive with proper padding */}
            <div className="flex min-h-full items-center justify-center p-3 sm:p-4 md:p-6">
                <div
                    className={`
                        relative w-full ${sizes[size]}
                        bg-white dark:bg-gray-800 
                        rounded-xl sm:rounded-2xl shadow-2xl
                        transform transition-all duration-300
                        max-h-[90vh] overflow-y-auto
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header - Responsive padding */}
                    <div className="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-xl sm:rounded-t-2xl">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pr-2">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Body - Responsive padding */}
                    <div className="p-4 sm:p-6">
                        {children}
                    </div>

                    {/* Footer - Responsive padding */}
                    {footer && (
                        <div className="sticky bottom-0 flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl sm:rounded-b-2xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
