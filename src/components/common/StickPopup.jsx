import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * StickPopup Component
 * A responsive, centered popup that displays messages
 * Users can read and manually close it
 */
const StickPopup = ({ 
    isOpen, 
    onClose, 
    title, 
    message, 
    type = 'info', // 'info', 'success', 'warning', 'error'
    autoClose = false,
    autoCloseDuration = 5000 
}) => {
    const [visible, setVisible] = useState(isOpen);

    useEffect(() => {
        setVisible(isOpen);
        
        if (isOpen && autoClose) {
            const timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, autoCloseDuration);
            
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, autoCloseDuration, onClose]);

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    if (!visible) return null;

    const typeConfig = {
        info: {
            icon: Info,
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            borderColor: 'border-blue-200 dark:border-blue-800',
            iconColor: 'text-blue-600',
            titleColor: 'text-blue-900 dark:text-blue-100'
        },
        success: {
            icon: CheckCircle,
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            borderColor: 'border-green-200 dark:border-green-800',
            iconColor: 'text-green-600',
            titleColor: 'text-green-900 dark:text-green-100'
        },
        warning: {
            icon: AlertTriangle,
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            borderColor: 'border-yellow-200 dark:border-yellow-800',
            iconColor: 'text-yellow-600',
            titleColor: 'text-yellow-900 dark:text-yellow-100'
        },
        error: {
            icon: AlertCircle,
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            borderColor: 'border-red-200 dark:border-red-800',
            iconColor: 'text-red-600',
            titleColor: 'text-red-900 dark:text-red-100'
        }
    };

    const config = typeConfig[type] || typeConfig.info;
    const IconComponent = config.icon;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300">
            <div className={`${config.bgColor} ${config.borderColor} border rounded-xl w-full max-w-sm sm:max-w-md shadow-2xl transform transition-all duration-300 scale-100 opacity-100`}>
                {/* Header */}
                <div className="flex items-start justify-between p-4 sm:p-6 border-b border-current border-opacity-10">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h2 className={`text-base sm:text-lg font-bold ${config.titleColor} break-words`}>
                            {title}
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg transition-colors ml-2"
                        aria-label="Close popup"
                    >
                        <X className={`w-4 h-4 sm:w-5 sm:h-5 ${config.iconColor}`} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                    <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {typeof message === 'string' ? message : message}
                    </div>
                </div>

                {/* Footer with Close Button */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-current border-opacity-10 flex justify-end gap-2">
                    {autoClose && (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-1">
                            This popup will auto-close in a few seconds
                        </p>
                    )}
                    <button
                        onClick={handleClose}
                        className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                            type === 'success'
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : type === 'error'
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : type === 'warning'
                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StickPopup;
