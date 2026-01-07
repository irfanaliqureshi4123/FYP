import React, { useState } from 'react';
import { CheckCircle2, Circle, Lock, Star, Clock, Target, BookOpen, Code } from 'lucide-react';
import Button from '../components/common/Button';

/**
 * Learning Roadmap Page
 * Display personalized learning roadmap for mobile users
 */
const Roadmap = () => {
    const [expandedSection, setExpandedSection] = useState('fundamentals');

    const roadmapSections = [
        {
            id: 'fundamentals',
            title: 'Fundamentals',
            icon: BookOpen,
            duration: '4 weeks',
            topics: [
                { name: 'Web Development Basics', completed: true, duration: '1 week' },
                { name: 'HTML & CSS', completed: true, duration: '1.5 weeks' },
                { name: 'JavaScript Fundamentals', completed: true, duration: '1.5 weeks' },
            ]
        },
        {
            id: 'frontend',
            title: 'Frontend Development',
            icon: Code,
            duration: '6 weeks',
            topics: [
                { name: 'React Basics', completed: false, duration: '2 weeks' },
                { name: 'State Management', completed: false, duration: '2 weeks' },
                { name: 'Advanced React Patterns', completed: false, duration: '2 weeks' },
            ]
        },
        {
            id: 'backend',
            title: 'Backend Development',
            icon: Target,
            duration: '8 weeks',
            locked: true,
            topics: [
                { name: 'Node.js & Express', completed: false, duration: '3 weeks' },
                { name: 'Database Design', completed: false, duration: '3 weeks' },
                { name: 'API Development', completed: false, duration: '2 weeks' },
            ]
        },
        {
            id: 'fullstack',
            title: 'Full Stack Integration',
            icon: Star,
            duration: '4 weeks',
            locked: true,
            topics: [
                { name: 'Project Architecture', completed: false, duration: '1 week' },
                { name: 'Deployment & DevOps', completed: false, duration: '1.5 weeks' },
                { name: 'Capstone Project', completed: false, duration: '1.5 weeks' },
            ]
        }
    ];

    const totalProgress = Math.round((3 / 20) * 100);

    const SectionIcon = ({ icon: Icon, locked }) => (
        <div className="relative">
            <Icon className="w-6 h-6 text-primary-600" />
            {locked && (
                <Lock className="w-4 h-4 absolute -bottom-1 -right-1 text-gray-500 bg-white rounded-full" />
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">Learning Roadmap</h1>
                <p className="text-primary-100 mb-4">Follow your personalized path to mastery</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">Overall Progress</span>
                        <span className="text-sm font-bold">{totalProgress}%</span>
                    </div>
                    <div className="w-full bg-primary-400 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-white rounded-full h-full transition-all duration-500"
                            style={{ width: `${totalProgress}%` }}
                        ></div>
                    </div>
                </div>
                
                <p className="text-sm text-primary-100">3 of 20 topics completed</p>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-4">
                {roadmapSections.map((section, index) => (
                    <div
                        key={section.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all"
                    >
                        {/* Section Header */}
                        <button
                            onClick={() => setExpandedSection(
                                expandedSection === section.id ? null : section.id
                            )}
                            className="w-full p-6 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                            <SectionIcon icon={section.icon} locked={section.locked} />
                            
                            <div className="flex-1 text-left min-w-0">
                                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {section.title}
                                    {section.locked && (
                                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                            Locked
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                                    <Clock className="w-4 h-4" />
                                    {section.duration}
                                </p>
                            </div>

                            <div className="flex-shrink-0 text-primary-600 dark:text-primary-400">
                                {expandedSection === section.id ? '−' : '+'}
                            </div>
                        </button>

                        {/* Expanded Content */}
                        {expandedSection === section.id && (
                            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3">
                                {section.topics.map((topic, topicIndex) => (
                                    <div
                                        key={topicIndex}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                                    >
                                        {section.locked ? (
                                            <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        ) : topic.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        )}
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium ${
                                                section.locked 
                                                    ? 'text-gray-500 dark:text-gray-400' 
                                                    : topic.completed 
                                                    ? 'text-green-600 dark:text-green-400 line-through'
                                                    : 'text-gray-900 dark:text-white'
                                            }`}>
                                                {topic.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {topic.duration}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                {!section.locked && (
                                    <Button 
                                        variant="primary" 
                                        className="w-full mt-4"
                                        onClick={() => {}}
                                    >
                                        Continue Learning
                                    </Button>
                                )}
                                
                                {section.locked && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                                        Complete previous sections to unlock
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Tips Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Learning Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                    <li>✓ Spend at least 2 hours daily on learning</li>
                    <li>✓ Build projects while learning to reinforce concepts</li>
                    <li>✓ Review completed topics regularly</li>
                    <li>✓ Join study groups and collaborate with peers</li>
                </ul>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Completed</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">17</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Remaining</p>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
