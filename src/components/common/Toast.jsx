import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

/**
 * Toast Component
 * Displays temporary notification messages
 */
const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20';
    const borderColor = type === 'success' ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800';
    const textColor = type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';
    const Icon = type === 'success' ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-right-4`}>
            <div className={`${bgColor} border ${borderColor} rounded-lg p-4 shadow-lg flex items-start gap-3`}>
                <Icon className={`w-5 h-5 ${textColor} flex-shrink-0 mt-0.5`} />
                <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
                <button
                    onClick={onClose}
                    className={`${textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
