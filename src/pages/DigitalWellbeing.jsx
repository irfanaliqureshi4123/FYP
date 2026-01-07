import React, { useState } from 'react';
import { ArrowLeft, Heart, Brain, Moon, Dumbbell, Coffee, BookOpen, TrendingUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/common/Toast';

const DigitalWellbeing = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [selectedTip, setSelectedTip] = useState(null);

    const wellnessCategories = [
        {
            id: 'mental',
            icon: Brain,
            title: 'Mental Health',
            description: 'Manage stress and anxiety',
            color: 'from-blue-500 to-blue-600',
            tips: [
                'Practice daily meditation (10-15 mins)',
                'Take regular breaks from screens',
                'Talk to someone when stressed',
                'Maintain a journal for thoughts',
                'Try breathing exercises',
                'Set realistic goals'
            ]
        },
        {
            id: 'digital',
            icon: Coffee,
            title: 'Digital Balance',
            description: 'Healthy screen time habits',
            color: 'from-orange-500 to-orange-600',
            tips: [
                'Use "Do Not Disturb" after 9 PM',
                'Limit social media to 1 hour/day',
                'Enable blue light filter in evening',
                'Take 20-min breaks every 2 hours',
                'Use apps to track screen time',
                'Phone-free meals'
            ]
        },
        {
            id: 'sleep',
            icon: Moon,
            title: 'Sleep & Rest',
            description: 'Improve sleep quality',
            color: 'from-purple-500 to-purple-600',
            tips: [
                'Sleep 7-9 hours daily',
                'Keep consistent sleep schedule',
                'Bedroom cool, dark & quiet',
                'No screens 1 hour before bed',
                'Avoid caffeine after 2 PM',
                'Try sleep meditation'
            ]
        },
        {
            id: 'physical',
            icon: Dumbbell,
            title: 'Physical Health',
            description: 'Exercise and fitness',
            color: 'from-green-500 to-green-600',
            tips: [
                'Exercise 30 mins daily',
                'Mix cardio and strength training',
                'Stay hydrated (8 glasses water)',
                'Eat balanced meals',
                'Stretch regularly',
                'Walk or cycle short distances'
            ]
        },
        {
            id: 'mindfulness',
            icon: Heart,
            title: 'Mindfulness',
            description: 'Present moment awareness',
            color: 'from-pink-500 to-pink-600',
            tips: [
                'Practice gratitude daily',
                'Mindful eating',
                'Yoga or tai chi',
                'Nature walks',
                'Meditation apps (Calm, Headspace)',
                'Self-compassion practice'
            ]
        },
        {
            id: 'work-life',
            icon: TrendingUp,
            title: 'Work-Life Balance',
            description: 'Career and personal harmony',
            color: 'from-cyan-500 to-cyan-600',
            tips: [
                'Set work hours boundaries',
                'Take weekends off',
                'Use vacation days',
                'Pursue hobbies outside work',
                'Quality time with family/friends',
                'Leave work at the office'
            ]
        }
    ];

    const dailyRoutine = [
        { time: '6:00 AM', activity: 'Wake up early & hydrate', icon: Coffee },
        { time: '6:30 AM', activity: 'Exercise or stretch', icon: Dumbbell },
        { time: '8:00 AM', activity: 'Healthy breakfast', icon: Coffee },
        { time: '12:00 PM', activity: 'Lunch break (screen-free)', icon: Heart },
        { time: '3:00 PM', activity: 'Quick meditation break', icon: Brain },
        { time: '6:00 PM', activity: 'Wrap up work', icon: TrendingUp },
        { time: '9:00 PM', activity: 'Digital detox begins', icon: Moon },
        { time: '10:00 PM', activity: 'Sleep preparation', icon: Moon }
    ];

    const wellnessStats = [
        { label: 'Recommended Sleep', value: '7-9 hours' },
        { label: 'Daily Exercise', value: '30 minutes' },
        { label: 'Screen Break', value: 'Every 2 hours' },
        { label: 'Water Intake', value: '8 glasses/day' }
    ];

    const handleTipToggle = (tip) => {
        setSelectedTip(selectedTip === tip ? null : tip);
        setToast({
            type: 'success',
            message: `Added "${tip}" to your wellness plan`
        });
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <div className="space-y-4 xs:space-y-5 sm:space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                    <button
                        onClick={() => navigate('/explore')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Wellbeing</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your guide to mental health and digital balance</p>
                    </div>
                </div>
            </div>

            {/* Daily Routine Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Ideal Daily Routine</h2>
                <div className="space-y-2">
                    {dailyRoutine.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <IconComp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{item.time}</p>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{item.activity}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Wellness Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {wellnessStats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                        <p className="font-bold text-base sm:text-lg text-primary-600 dark:text-primary-400">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Wellness Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {wellnessCategories.map((category) => {
                    const Icon = category.icon;
                    const gradientStart = category.color === 'from-blue-500 to-blue-600' ? '#3b82f6' :
                                        category.color === 'from-orange-500 to-orange-600' ? '#f97316' :
                                        category.color === 'from-purple-500 to-purple-600' ? '#a855f7' :
                                        category.color === 'from-green-500 to-green-600' ? '#10b981' :
                                        category.color === 'from-pink-500 to-pink-600' ? '#ec4899' : '#06b6d4';
                    
                    const gradientEnd = category.color === 'from-blue-500 to-blue-600' ? '#2563eb' :
                                       category.color === 'from-orange-500 to-orange-600' ? '#ea580c' :
                                       category.color === 'from-purple-500 to-purple-600' ? '#9333ea' :
                                       category.color === 'from-green-500 to-green-600' ? '#059669' :
                                       category.color === 'from-pink-500 to-pink-600' ? '#be185d' : '#0891b2';

                    return (
                        <div
                            key={category.id}
                            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            style={{
                                background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
                            }}
                        >
                            <div className="p-4 sm:p-5 lg:p-6 text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg">{category.title}</h3>
                                        <p className="text-xs sm:text-sm text-white text-opacity-90">{category.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4 pt-4 border-t border-white border-opacity-20">
                                    {category.tips.map((tip, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleTipToggle(tip)}
                                            className="w-full text-left text-xs sm:text-sm p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded transition-colors flex items-start gap-2 group"
                                        >
                                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                                            <span className="line-clamp-2">{tip}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Resources Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Mental Health Resources
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                        { name: 'Calm', type: 'Meditation & Sleep' },
                        { name: 'Headspace', type: 'Mindfulness' },
                        { name: 'Insight Timer', type: 'Meditation' },
                        { name: 'Jour', type: 'Journaling' },
                        { name: 'BetterHelp', type: 'Therapy' },
                        { name: 'Mental Health Foundation', type: 'Resources' }
                    ].map((resource, idx) => (
                        <div key={idx} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{resource.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.type}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-200 dark:border-gray-600">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">Quick Tips</h2>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Start your day with a 5-minute meditation</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Set app usage limits to avoid distractions</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Take a 10-minute walk after meals</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Practice gratitude before bedtime</span>
                    </li>
                </ul>
            </div>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default DigitalWellbeing;
