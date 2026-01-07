import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

/**
 * Privacy Policy Page
 */
const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary-600" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                        Last updated: January 7, 2026
                    </p>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            This Privacy Policy explains how our social learning platform collects, uses, and protects your personal information. We are committed to protecting your privacy and ensuring transparency in how we handle your data. Your trust is important to us, and we take our responsibility seriously.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Profile Information</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    We collect information you provide directly, including your name, email address, profile picture, bio, location, website, and other profile details.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Academic Information</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Information related to your skills, achievements, career goals, and interests to help personalize your learning experience.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Usage Data</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    We automatically collect information about your interactions with our platform, including posts created, comments, likes, follows, and browsing history.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Technical Data</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    This includes your IP address, device information, browser type, operating system, and other technical identifiers to help us maintain and improve our service.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Communication Data</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Information about your messages, notifications preferences, and communications with other users on our platform.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Data</h2>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-3">
                                <span className="text-primary-600 font-bold">•</span>
                                <span>Provide and improve our services based on user feedback and usage patterns</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary-600 font-bold">•</span>
                                <span>Personalize your experience by recommending content and connections</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary-600 font-bold">•</span>
                                <span>Send notifications, updates, and important account information</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary-600 font-bold">•</span>
                                <span>Prevent fraud, abuse, and ensure platform security</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary-600 font-bold">•</span>
                                <span>Comply with legal obligations and enforce our terms of service</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary-600 font-bold">•</span>
                                <span>Conduct analytics and research to understand user behavior</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Data Protection</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction. Your passwords are encrypted using strong algorithms, and all data transmissions use SSL/TLS encryption protocols to ensure secure communication between your device and our servers.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            You have the right to access, modify, or delete your personal data at any time. You can manage your privacy settings in your account preferences, control what information is visible to other users, and adjust your notification preferences.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            To exercise your rights or if you have any data-related requests, please contact our support team at privacy@sociallearning.com. We will respond to your requests within 30 days in accordance with applicable laws.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">6. Cookies and Tracking</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your experience on our platform. These help us remember your preferences, understand how you use our service, and provide personalized content. You can control cookie settings through your browser preferences, though some features may not work properly if cookies are disabled.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">7. Changes to This Policy</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other factors. We will notify you of significant changes by updating the "Last updated" date at the top of this policy. Your continued use of the platform after such modifications constitutes your acceptance of the updated Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            If you have questions, concerns, or requests about our privacy practices, please don't hesitate to contact us:
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Email:</strong> privacy@sociallearning.com<br />
                                <strong>Support:</strong> support@sociallearning.com<br />
                                <strong>Address:</strong> 123 Learning Street, Tech City, TC 12345
                            </p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            By using our platform, you acknowledge that you have read and understood this Privacy Policy.
                        </p>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="primary"
                        >
                            Back to Settings
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
