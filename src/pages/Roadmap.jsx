import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Lock, Star, Clock, Zap, TrendingUp, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import roadmapsData from '../data/roadmaps.json';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Toast from '../components/common/Toast';

const EnhancedRoadmap = () => {
    const navigate = useNavigate();
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);
    const [expandedPathway, setExpandedPathway] = useState(null);
    const [toast, setToast] = useState(null);

    const handleSelectRoadmap = (roadmap) => {
        setSelectedRoadmap(roadmap);
        setExpandedPathway(roadmap.pathways[0].id);
        setToast({
            type: 'success',
            message: `Selected: ${roadmap.title}`
        });
        setTimeout(() => setToast(null), 2000);
    };

    const calculateTotalProgress = (roadmap) => {
        const totalTopics = roadmap.pathways.reduce((sum, p) => sum + p.topics.length, 0);
        const completedTopics = roadmap.pathways.reduce((sum, p) => 
            sum + p.topics.filter(t => t.completed).length, 0);
        return Math.round((completedTopics / totalTopics) * 100);
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty) {
            case 'Beginner': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
            case 'Intermediate': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
            case 'Advanced': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
        }
    };

    if (selectedRoadmap) {
        const progress = calculateTotalProgress(selectedRoadmap);
        const totalTopics = selectedRoadmap.pathways.reduce((sum, p) => sum + p.topics.length, 0);
        const completedTopics = selectedRoadmap.pathways.reduce((sum, p) => 
            sum + p.topics.filter(t => t.completed).length, 0);

        return (
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <button
                        onClick={() => setSelectedRoadmap(null)}
                        className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4 text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to roadmaps
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedRoadmap.title}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedRoadmap.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">{progress}%</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Progress</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">{selectedRoadmap.pathways.length}</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Phases</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">{selectedRoadmap.duration}</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Duration</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">{selectedRoadmap.salary}</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Avg Salary</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Overall Progress</h3>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{completedTopics}/{totalTopics}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                            className="bg-primary-600 h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Pathways */}
                <div className="space-y-3 sm:space-y-4">
                    {selectedRoadmap.pathways.map((pathway, idx) => (
                        <div key={pathway.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Pathway Header */}
                            <button
                                onClick={() => setExpandedPathway(expandedPathway === pathway.id ? null : pathway.id)}
                                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{pathway.name}</h3>
                                        <Badge variant="primary" size="sm">{idx + 1} of {selectedRoadmap.pathways.length}</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {pathway.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Award className="w-3 h-3" />
                                            {pathway.courses} courses
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                                            {pathway.completed}/{pathway.courses}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    {expandedPathway === pathway.id ? '−' : '+'}
                                </span>
                            </button>

                            {/* Topics */}
                            {expandedPathway === pathway.id && (
                                <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-5 space-y-2">
                                    {pathway.topics.map((topic, topicIdx) => (
                                        <div
                                            key={topicIdx}
                                            className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                                        >
                                            {topic.completed ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-medium text-sm sm:text-base ${
                                                    topic.completed 
                                                        ? 'text-green-600 dark:text-green-400 line-through' 
                                                        : 'text-gray-900 dark:text-white'
                                                }`}>
                                                    {topic.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <Button className="w-full mt-4 text-sm sm:text-base">
                                        Continue Learning
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Skills Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <Star className="w-5 h-5" />
                        Key Skills You'll Learn
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[...new Set(selectedRoadmap.pathways.flatMap(p => p.skills))].map(skill => (
                            <Badge key={skill} variant="secondary" size="sm">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Roadmaps</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Choose your career path and get a structured learning plan</p>
                    </div>
                </div>
            </div>

            {/* Roadmaps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {roadmapsData.map((roadmap) => {
                    const progress = calculateTotalProgress(roadmap);
                    return (
                        <div
                            key={roadmap.id}
                            onClick={() => handleSelectRoadmap(roadmap)}
                            className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                        >
                            <div className="p-4 sm:p-5 lg:p-6">
                                {/* Title & Difficulty */}
                                <div className="mb-3">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base flex-1">{roadmap.title}</h3>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap flex-shrink-0 ${getDifficultyColor(roadmap.difficulty)}`}>
                                            {roadmap.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{roadmap.description}</p>
                                </div>

                                {/* Meta Info */}
                                <div className="space-y-2 mb-4 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <span>{roadmap.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        <span>{roadmap.pathways.length} learning phases</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>{roadmap.salary}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Progress</span>
                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className="bg-primary-600 h-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Button className="w-full text-sm sm:text-base">
                                    {progress > 0 ? 'Continue' : 'Start'} Roadmap
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary-200 dark:border-gray-600">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Tips for Success
                </h2>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Dedicate 2-3 hours daily to learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Build projects while learning to reinforce concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Join communities and collaborate with peers</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold flex-shrink-0">✓</span>
                        <span>Review completed topics to maintain knowledge</span>
                    </li>
                </ul>
            </div>

            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default EnhancedRoadmap;
