import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, BookOpen, Heart, Share2, Bookmark, Check, Copy } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Toast from '../components/common/Toast';

/**
 * Career Tips Page
 * Display comprehensive collection of career tips with categories, favorites, save and share
 */
const CareerTips = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState([]);
    const [savedTips, setSavedTips] = useState([]);
    const [showSavedOnly, setShowSavedOnly] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [sharedTipId, setSharedTipId] = useState(null);

    // Comprehensive career tips organized by category
    const allTips = [
        {
            id: 1,
            category: 'Skill Development',
            tip: 'Master one skill deeply before learning many. Depth beats breadth in the job market.',
            author: 'Tech Career Coach',
        },
        {
            id: 2,
            category: 'Portfolio Building',
            tip: 'Build a strong portfolio. Real projects speak louder than certifications.',
            author: 'Hiring Manager Insights',
        },
        {
            id: 3,
            category: 'Networking',
            tip: 'Network actively. 70% of jobs are filled through networking, not applications.',
            author: 'Career Strategist',
        },
        {
            id: 4,
            category: 'Continuous Learning',
            tip: 'Keep learning. The tech industry evolves rapidly. Continuous learning is non-negotiable.',
            author: 'Industry Expert',
        },
        {
            id: 5,
            category: 'Interview Preparation',
            tip: 'Research the company thoroughly before interviews. Know their products, values, and recent news.',
            author: 'Interview Coach',
        },
        {
            id: 6,
            category: 'Resume & Cover Letter',
            tip: 'Tailor your resume for each job. Use keywords from the job description to increase your chances.',
            author: 'HR Professional',
        },
        {
            id: 7,
            category: 'Salary Negotiation',
            tip: 'Always negotiate your salary. Research market rates and be prepared to discuss your value.',
            author: 'Compensation Expert',
        },
        {
            id: 8,
            category: 'Work-Life Balance',
            tip: 'Set boundaries between work and personal life. Burnout reduces productivity and innovation.',
            author: 'Wellness Coach',
        },
        {
            id: 9,
            category: 'Leadership',
            tip: 'Lead by example. Your team watches your actions more than they listen to your words.',
            author: 'Leadership Expert',
        },
        {
            id: 10,
            category: 'Personal Branding',
            tip: 'Build your personal brand on social media. Share your knowledge and insights regularly.',
            author: 'Personal Brand Coach',
        },
        {
            id: 11,
            category: 'Communication Skills',
            tip: 'Master written and verbal communication. These skills are invaluable in any career.',
            author: 'Communication Specialist',
        },
        {
            id: 12,
            category: 'Problem Solving',
            tip: 'Break down complex problems into smaller components. Solve them one at a time systematically.',
            author: 'Problem Solving Coach',
        },
        {
            id: 13,
            category: 'Skill Development',
            tip: 'Spend 10% of your time learning new technologies relevant to your field.',
            author: 'Tech Career Coach',
        },
        {
            id: 14,
            category: 'Mentorship',
            tip: 'Find a mentor in your field. Learning from someone experienced accelerates your growth.',
            author: 'Career Advisor',
        },
        {
            id: 15,
            category: 'Networking',
            tip: 'Attend industry conferences and meetups. Face-to-face connections are more memorable.',
            author: 'Networking Expert',
        },
        {
            id: 16,
            category: 'Interview Preparation',
            tip: 'Practice the STAR method (Situation, Task, Action, Result) for behavioral interview questions.',
            author: 'Interview Coach',
        },
        {
            id: 17,
            category: 'Personal Branding',
            tip: 'Keep your online presence professional. Employers often search candidates on social media.',
            author: 'Personal Brand Coach',
        },
        {
            id: 18,
            category: 'Continuous Learning',
            tip: 'Take online courses from platforms like Coursera, Udemy, or LinkedIn Learning.',
            author: 'Learning Specialist',
        },
        {
            id: 19,
            category: 'Career Growth',
            tip: 'Set clear career goals. Track progress regularly and adjust your strategy as needed.',
            author: 'Career Coach',
        },
        {
            id: 20,
            category: 'Leadership',
            tip: 'Delegate tasks effectively. Micromanagement kills morale and limits team growth.',
            author: 'Leadership Expert',
        },
    ];

    // Extract unique categories
    const categories = [
        'all',
        ...Array.from(new Set(allTips.map((tip) => tip.category))),
    ];

    // Filter tips based on search and category
    const filteredTips = useMemo(() => {
        return allTips
            .filter((tip) => {
                const matchesSearch =
                    tip.tip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tip.author.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesCategory =
                    selectedCategory === 'all' || tip.category === selectedCategory;

                const matchesSavedFilter = !showSavedOnly || savedTips.includes(tip.id);

                return matchesSearch && matchesCategory && matchesSavedFilter;
            })
            .sort((a, b) => {
                // Sort: favorites first, then by ID
                const aFavorited = favorites.includes(a.id);
                const bFavorited = favorites.includes(b.id);
                if (aFavorited !== bFavorited) {
                    return aFavorited ? -1 : 1;
                }
                return a.id - b.id;
            });
    }, [searchTerm, selectedCategory, favorites, showSavedOnly, savedTips]);

    // Toggle favorite
    const toggleFavorite = (tipId) => {
        setFavorites((prev) =>
            prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]
        );
    };

    // Toggle save tip
    const toggleSaveTip = (tipId) => {
        setSavedTips((prev) => {
            if (prev.includes(tipId)) {
                setToast({ show: true, message: 'Tip removed from saved', type: 'info' });
                return prev.filter((id) => id !== tipId);
            } else {
                setToast({ show: true, message: 'Tip saved successfully!', type: 'success' });
                return [...prev, tipId];
            }
        });
    };

    // Share tip
    const shareTip = (tip) => {
        const text = `"${tip.tip}"\n\n— ${tip.author}\n\nCategory: ${tip.category}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            setSharedTipId(tip.id);
            setToast({ show: true, message: 'Tip copied to clipboard!', type: 'success' });
            
            // Reset shared state after 2 seconds
            setTimeout(() => setSharedTipId(null), 2000);
        }).catch(() => {
            setToast({ show: true, message: 'Failed to copy tip', type: 'error' });
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Tips</h1>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {favorites.length} ❤️
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {savedTips.length} 📌
                            </span>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search tips by content, category, or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full"
                            />
                        </div>
                        <button
                            onClick={() => setShowSavedOnly(!showSavedOnly)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                                showSavedOnly
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            <Bookmark className="w-4 h-4 inline mr-2" />
                            Saved ({savedTips.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
                {/* Categories Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                            Categories
                        </h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="capitalize">
                                        {category === 'all' ? 'All Tips' : category}
                                    </span>
                                    <span className="float-right text-xs text-gray-500 dark:text-gray-400">
                                        {allTips.filter(
                                            (t) =>
                                                category === 'all' || t.category === category
                                        ).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tips List */}
                <div className="md:col-span-3">
                    {filteredTips.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                No tips found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {searchTerm
                                    ? 'Try adjusting your search terms.'
                                    : 'No tips available in this category.'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTips.map((tip) => (
                                <div
                                    key={tip.id}
                                    className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-800/50 p-6 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                                >
                                    {/* Tip Header */}
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div className="flex-1">
                                            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold mb-2">
                                                {tip.category}
                                            </span>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                by {tip.author}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(tip.id)}
                                            className={`p-2 rounded-lg transition-colors shrink-0 ${
                                                favorites.includes(tip.id)
                                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                    : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                            aria-label="Add to favorites"
                                        >
                                            <Heart
                                                className="w-5 h-5"
                                                fill={favorites.includes(tip.id) ? 'currentColor' : 'none'}
                                            />
                                        </button>
                                    </div>

                                    {/* Tip Content */}
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                        {tip.tip}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2 border-t border-primary-200 dark:border-primary-800/50 pt-4">
                                        <Button
                                            variant={savedTips.includes(tip.id) ? 'primary' : 'outline'}
                                            size="sm"
                                            onClick={() => toggleSaveTip(tip.id)}
                                            className="flex-1 text-xs"
                                        >
                                            {savedTips.includes(tip.id) ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Saved
                                                </>
                                            ) : (
                                                <>
                                                    <Bookmark className="w-4 h-4" />
                                                    Save
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant={sharedTipId === tip.id ? 'primary' : 'outline'}
                                            size="sm"
                                            onClick={() => shareTip(tip)}
                                            className="flex-1 text-xs"
                                        >
                                            {sharedTipId === tip.id ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 className="w-4 h-4" />
                                                    Share
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {/* Results Counter */}
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                                Showing {filteredTips.length} of {allTips.length} tips
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
        </div>
    );
};

export default CareerTips;
