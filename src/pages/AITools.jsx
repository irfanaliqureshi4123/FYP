import React, { useState } from 'react';
import { ArrowLeft, FileText, Briefcase, Award, PenTool, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/common/Toast';

const AITools = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState(null);

    const tools = [
        {
            id: 'resume',
            icon: FileText,
            title: 'Resume Builder',
            description: 'Create a professional resume with AI-powered suggestions and templates',
            features: ['Smart formatting', 'Content suggestions', 'ATS optimization', 'Multiple templates'],
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'interview',
            icon: Briefcase,
            title: 'Interview Prep',
            description: 'Practice interviews with AI feedback and common question preparation',
            features: ['Question bank', 'Mock interviews', 'Real-time feedback', 'Performance metrics'],
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'skills',
            icon: Award,
            title: 'Skill Assessor',
            description: 'Evaluate your skills and get personalized learning recommendations',
            features: ['Skill tests', 'Proficiency levels', 'Learning paths', 'Progress tracking'],
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'cover',
            icon: PenTool,
            title: 'Cover Letter Generator',
            description: 'Generate tailored cover letters with AI assistance for any job',
            features: ['Job-specific content', 'AI suggestions', 'Multiple styles', 'Easy customization'],
            color: 'from-orange-500 to-orange-600'
        },
        {
            id: 'matching',
            icon: Zap,
            title: 'Job Match Finder',
            description: 'Find jobs that match your skills and interests using AI analysis',
            features: ['Smart matching', 'Compatibility score', 'Career insights', 'Growth opportunities'],
            color: 'from-pink-500 to-pink-600'
        }
    ];

    const handleToolClick = (toolId) => {
        setToast({
            type: 'info',
            message: `${tools.find(t => t.id === toolId).title} is loading...`
        });
        setTimeout(() => setToast(null), 2000);
        setActiveTab(toolId);
    };

    const resumeBuilderPreview = (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Resume Builder</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Your Resume Sections:</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-600 rounded text-sm sm:text-base">
                            <span className="text-gray-700 dark:text-gray-300 truncate">Personal Information</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-600 rounded text-sm sm:text-base">
                            <span className="text-gray-700 dark:text-gray-300 truncate">Professional Summary</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-600 rounded text-sm sm:text-base">
                            <span className="text-gray-700 dark:text-gray-300 truncate">Work Experience</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-600 rounded text-sm sm:text-base">
                            <span className="text-gray-700 dark:text-gray-300 truncate">Education</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                        <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-600 rounded text-sm sm:text-base">
                            <span className="text-gray-700 dark:text-gray-300 truncate">Skills</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                    </div>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm sm:text-base">
                    Start Building
                </button>
            </div>
        </div>
    );

    const interviewPrepPreview = (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Interview Preparation</h3>
            <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Common Interview Questions</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">Practice these 10 most common interview questions:</p>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold flex-shrink-0">1.</span>
                            <span>Tell me about yourself</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold flex-shrink-0">2.</span>
                            <span>What are your strengths and weaknesses?</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-600 font-bold flex-shrink-0">3.</span>
                            <span>Why do you want this job?</span>
                        </li>
                    </ul>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm sm:text-base">
                    Start Mock Interview
                </button>
            </div>
        </div>
    );

    const skillAssessorPreview = (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Skill Assessment</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Assess Your Top Skills</h4>
                    <div className="space-y-2">
                        {['Communication', 'Leadership', 'Problem Solving', 'Technical Skills', 'Time Management'].map((skill, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-600 p-2 sm:p-3 rounded flex justify-between items-center gap-2 text-sm sm:text-base">
                                <span className="text-gray-700 dark:text-gray-300 truncate">{skill}</span>
                                <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                                    Test
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm sm:text-base">
                    Start Assessment
                </button>
            </div>
        </div>
    );

    const coverLetterPreview = (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Cover Letter Generator</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                        <input type="text" placeholder="e.g., Software Engineer" className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                        <input type="text" placeholder="e.g., Tech Company Inc." className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white text-sm" />
                    </div>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm sm:text-base">
                    Generate Letter
                </button>
            </div>
        </div>
    );

    const jobMatchPreview = (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Job Match Finder</h3>
            <div className="space-y-2 sm:space-y-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-start mb-2 gap-2 flex-wrap sm:flex-nowrap">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Senior Developer</h4>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-bold px-2 py-1 rounded whitespace-nowrap flex-shrink-0">92%</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Tech Solutions Inc. • $80k-$100k</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2 gap-2 flex-wrap sm:flex-nowrap">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Product Manager</h4>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded whitespace-nowrap flex-shrink-0">85%</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Innovation Labs • $90k-$120k</p>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm sm:text-base">
                    Find More Jobs
                </button>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch(activeTab) {
            case 'resume': return resumeBuilderPreview;
            case 'interview': return interviewPrepPreview;
            case 'skills': return skillAssessorPreview;
            case 'cover': return coverLetterPreview;
            case 'matching': return jobMatchPreview;
            default: return null;
        }
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
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Tools Suite</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Boost your career with AI-powered productivity tools</p>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab && (
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    {renderTabContent()}
                    <button
                        onClick={() => setActiveTab(null)}
                        className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        ← Back to tools
                    </button>
                </div>
            )}

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    const gradientStart = tool.color === 'from-blue-500 to-blue-600' ? '#3b82f6' :
                                        tool.color === 'from-green-500 to-green-600' ? '#10b981' :
                                        tool.color === 'from-purple-500 to-purple-600' ? '#a855f7' :
                                        tool.color === 'from-orange-500 to-orange-600' ? '#f97316' : '#ec4899';
                    
                    const gradientEnd = tool.color === 'from-blue-500 to-blue-600' ? '#2563eb' :
                                       tool.color === 'from-green-500 to-green-600' ? '#059669' :
                                       tool.color === 'from-purple-500 to-purple-600' ? '#9333ea' :
                                       tool.color === 'from-orange-500 to-orange-600' ? '#ea580c' : '#be185d';
                    
                    return (
                        <div
                            key={tool.id}
                            onClick={() => handleToolClick(tool.id)}
                            className="rounded-lg p-4 sm:p-5 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
                            }}
                        >
                            <div className="relative z-10">
                                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg w-fit">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold mb-2">{tool.title}</h3>
                                <p className="text-xs sm:text-sm text-white text-opacity-90 mb-3 sm:mb-4 line-clamp-2">{tool.description}</p>
                                <div className="space-y-1 mb-3 sm:mb-4">
                                    {tool.features.map((feature, idx) => (
                                        <div key={idx} className="text-xs sm:text-sm text-white text-opacity-80 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
                                            <span className="line-clamp-1">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-opacity-90 transition-all text-sm sm:text-base">
                                    Explore
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">10k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Resumes Created</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">95%</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Success Rate</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">50k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Users Served</p>
                </div>
            </div>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default AITools;
