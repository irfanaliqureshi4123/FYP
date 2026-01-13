import React, { useState } from 'react';
import { CheckCircle, User, Shield, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

/**
 * Feature Testing & Demo Guide
 * Step-by-step guide to test all three features
 */
const FeatureTestingGuide = () => {
    const navigate = useNavigate();
    const [completedSteps, setCompletedSteps] = useState([]);

    const features = [
        {
            id: 1,
            title: 'Test Registration Flow',
            description: 'Register as a career counsellor and see the entire workflow',
            steps: [
                'Go to Career Counselling page',
                'Click "Register as Counsellor" button',
                'Fill in all required fields',
                'Click "Submit Registration"',
                'See the success popup with your email in blue',
                'Read the message and click "Close"'
            ],
            action: 'Go to Career Counselling',
            actionPath: '/counselling',
            status: 'pending'
        },
        {
            id: 2,
            title: 'Access Admin Panel',
            description: 'Approve or reject counsellor applications',
            steps: [
                'Click on your profile avatar (top right)',
                'Select "Admin Panel" from dropdown',
                'View pending applications',
                'Click "View" to see full details',
                'Click "Approve" to accept an application',
                'See confirmation popup'
            ],
            action: 'Go to Admin Panel',
            actionPath: '/admin/counsellor-applications',
            status: 'pending'
        },
        {
            id: 3,
            title: 'View Counsellor Dashboard',
            description: 'Check the profile transformation when approved',
            steps: [
                'First, approve an application in Admin Panel',
                'Go to that counsellor\'s profile',
                'Normal profile converts to Counsellor Dashboard',
                'See stats, sessions, and reviews tabs',
                'View specialization and certifications',
                'Check the professional dashboard layout'
            ],
            action: 'View Profile',
            actionPath: '/profile/sarah-chen',
            status: 'pending'
        }
    ];

    const toggleStep = (featureId, stepIndex) => {
        const key = `${featureId}-${stepIndex}`;
        setCompletedSteps(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const getFeatureCompletionPercentage = (featureId) => {
        const featureSteps = features[featureId - 1].steps;
        const completedCount = featureSteps.filter((_, idx) =>
            completedSteps.includes(`${featureId}-${idx}`)
        ).length;
        return Math.round((completedCount / featureSteps.length) * 100);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    Feature Testing Guide
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Step-by-step instructions to test all three features
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map(feature => (
                    <button
                        key={feature.id}
                        onClick={() => navigate(feature.actionPath)}
                        className="bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg p-6 text-left transition-all hover:shadow-lg group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-3xl font-bold opacity-80">#{feature.id}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="font-bold mb-1 line-clamp-2">{feature.title}</h3>
                        <p className="text-sm opacity-90">{feature.description}</p>
                    </button>
                ))}
            </div>

            {/* Detailed Feature Cards */}
            <div className="space-y-6">
                {features.map(feature => {
                    const completion = getFeatureCompletionPercentage(feature.id);
                    return (
                        <div
                            key={feature.id}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge variant="primary" className="text-lg px-3 py-1">
                                                Feature {feature.id}
                                            </Badge>
                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                                {feature.title}
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                            Steps Completed
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {completedSteps.filter(k => k.startsWith(`${feature.id}-`)).length} / {feature.steps.length}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full transition-all duration-300"
                                            style={{ width: `${completion}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                                        {completion}% Complete
                                    </p>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="p-6 space-y-3">
                                {feature.steps.map((step, idx) => {
                                    const stepKey = `${feature.id}-${idx}`;
                                    const isCompleted = completedSteps.includes(stepKey);

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => toggleStep(feature.id, idx)}
                                            className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                                                isCompleted
                                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                                            }`}
                                        >
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                                                isCompleted
                                                    ? 'bg-green-500 border-green-500'
                                                    : 'border-gray-300 dark:border-gray-500'
                                            }`}>
                                                {isCompleted && (
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm sm:text-base font-medium transition-colors ${
                                                    isCompleted
                                                        ? 'text-green-700 dark:text-green-300 line-through'
                                                        : 'text-gray-900 dark:text-white'
                                                }`}>
                                                    {idx + 1}. {step}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Action Button */}
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    onClick={() => navigate(feature.actionPath)}
                                    className="w-full"
                                >
                                    {feature.action}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>✓ You can test the registration flow multiple times</li>
                    <li>✓ Admin panel has sample applications ready to test</li>
                    <li>✓ Approve an application to see the counsellor dashboard</li>
                    <li>✓ The success popup demonstrates the new StickPopup component</li>
                    <li>✓ All features are fully responsive on mobile and desktop</li>
                </ul>
            </div>

            {/* Overall Progress */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg p-6 text-white text-center">
                <p className="text-sm font-medium opacity-90">Overall Testing Progress</p>
                <p className="text-4xl font-bold mt-2">
                    {Math.round((completedSteps.length / 18) * 100)}%
                </p>
                <p className="text-sm opacity-90 mt-1">
                    {completedSteps.length} out of 18 steps completed
                </p>
            </div>
        </div>
    );
};

export default FeatureTestingGuide;
