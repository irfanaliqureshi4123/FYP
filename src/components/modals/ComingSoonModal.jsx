import React, { useState } from 'react';
import { X, Mail, Check } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Toast from '../common/Toast';

const ComingSoonModal = ({ isOpen, onClose, toolName = 'this tool' }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setSubmitted(true);
                setIsLoading(false);
                setToast({
                    type: 'success',
                    message: 'Thank you! We\'ll notify you soon.'
                });
            }, 1000);
        }
    };

    const handleClose = () => {
        setEmail('');
        setSubmitted(false);
        setErrors({});
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 xs:p-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 xs:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h2 className="text-lg xs:text-xl font-bold text-gray-900 dark:text-white">
                                {submitted ? 'Thank You!' : 'Coming Soon'}
                            </h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 xs:p-6">
                        {!submitted ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Thank you for your interest!
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We're excited to showcase our smart AI {toolName}. This powerful tool is currently under development and will revolutionize the way you work.
                                    </p>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <p className="text-sm text-blue-900 dark:text-blue-300">
                                        📝 <strong>Status:</strong> Under Development
                                    </p>
                                    <p className="text-sm text-blue-900 dark:text-blue-300 mt-2">
                                        We're working hard to bring you the best experience. Enter your email and we'll notify you as soon as it's available!
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (errors.email) setErrors({ ...errors, email: '' });
                                            }}
                                            placeholder="you@example.com"
                                            disabled={isLoading}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading || !email.trim()}
                                        className="w-full"
                                    >
                                        {isLoading ? 'Subscribing...' : 'Notify Me'}
                                    </Button>

                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Maybe Later
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Thank You for Your Interest!
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        We've received your email and will send you an early access notification as soon as our AI {toolName} is ready for you.
                                    </p>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-green-900 dark:text-green-300">
                                        ✓ Email: <strong>{email}</strong>
                                    </p>
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                                    Keep an eye on your inbox for exciting updates!
                                </p>

                                <Button onClick={handleClose} className="w-full mt-4">
                                    Got It, Thanks!
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
};

export default ComingSoonModal;
