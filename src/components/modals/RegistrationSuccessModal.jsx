import React from 'react';
import { CheckCircle, Mail, Clock, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const RegistrationSuccessModal = ({ isOpen, onClose, email, name }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-xl overflow-hidden">
                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-green-600 fill-current" />
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Thank You!
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                            Thank you for registering as a Career Counsellor
                        </p>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-3">
                        {/* Review Status */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        Under Review
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Our team will carefully review your application and verify your credentials
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email Notification */}
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        Email Notification
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Once approved, we'll notify you at <span className="font-medium">{email}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Update */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        Your Dashboard
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        After approval, your normal profile will convert into a Counsellor Dashboard
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">What's Next?</p>
                        <ol className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left">
                            <li className="flex gap-2">
                                <span className="font-semibold text-primary-600 flex-shrink-0">1.</span>
                                <span>Review process typically takes 2-3 business days</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-semibold text-primary-600 flex-shrink-0">2.</span>
                                <span>Check your email ({email}) for updates</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-semibold text-primary-600 flex-shrink-0">3.</span>
                                <span>Access your Counsellor Dashboard once approved</span>
                            </li>
                        </ol>
                    </div>

                    {/* Action Button */}
                    <Button onClick={onClose} className="w-full py-2.5 text-sm font-medium">
                        Got It!
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessModal;
