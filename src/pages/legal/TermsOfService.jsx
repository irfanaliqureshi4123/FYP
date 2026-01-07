import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

/**
 * Terms of Service Page
 */
const TermsOfService = () => {
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
                        <FileText className="w-6 h-6 text-primary-600" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
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
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            By accessing and using our social learning platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of any changes.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">2. User Accounts</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            You are responsible for maintaining the confidentiality of your account credentials, including your username and password. You are fully responsible for all activities that occur under your account. We recommend using a strong, unique password and changing it regularly.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            You agree to provide accurate, current, and complete information during registration and to keep your account information up to date. You are responsible for notifying us immediately of any unauthorized use of your account or any other breaches of security.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">3. Prohibited Activities</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            You agree not to engage in any of the following prohibited activities:
                        </p>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Harassing, abusing, or threatening other users in any manner</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Posting, transmitting, or distributing inappropriate, offensive, or illegal content</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Attempting to breach our security systems or gain unauthorized access</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Spamming, manipulating algorithms, or engaging in artificial engagement</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Violating intellectual property rights or using content without permission</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Impersonating others or creating misleading accounts</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Selling, trading, or transferring your account to others</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">4. Content Ownership and License</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            You retain full ownership of all content you create and post on our platform, including posts, comments, images, and any other materials. By posting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, display, distribute, and reproduce your content on our platform and in our marketing materials.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            You represent and warrant that you own or have the necessary rights to all content you post, and that posting it does not violate any third-party rights.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Our platform is provided "as-is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that our service will be uninterrupted, error-free, or free from viruses or malicious code.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill arising from your use of the platform.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">6. Indemnification</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            You agree to indemnify and hold harmless our company and its officers, directors, and employees from any claims, damages, losses, or expenses arising from your use of the platform or violation of these terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">7. Termination</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            We may terminate or suspend your account immediately without notice if we determine that you have violated these terms or engaged in prohibited conduct. We may also terminate your account for inactivity or for any reason at our discretion.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            You may request account deletion at any time through your settings. Upon deletion, your account and associated data will be permanently removed from our platform.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">8. Third-Party Links and Services</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our platform may contain links to third-party websites and services. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party services is governed by their respective terms and privacy policies, and we encourage you to review them carefully.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">9. Intellectual Property Rights</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            All content, features, and functionality of our platform, including but not limited to design, text, graphics, logos, and software, are owned by us or our licensors. You are not permitted to reproduce, distribute, or transmit any content without our prior written consent.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">10. Modifications to the Service</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue our service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">11. Governing Law</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">12. Contact Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            If you have questions about these Terms of Service, please contact us at:
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Email:</strong> legal@sociallearning.com<br />
                                <strong>Support:</strong> support@sociallearning.com<br />
                                <strong>Address:</strong> 123 Learning Street, Tech City, TC 12345
                            </p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

export default TermsOfService;
