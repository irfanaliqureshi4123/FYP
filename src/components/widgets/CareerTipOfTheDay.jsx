import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import careerTips from '../../data/careerTips.json';

/**
 * Career Tip of the Day Modal
 * Displays a career tip in a popup modal on small devices
 * Shows once per day using localStorage
 */
const CareerTipOfTheDay = ({ isOpen, onClose }) => {
    const [tip, setTip] = useState(null);

    useEffect(() => {
        if (isOpen) {
            // Get today's date as key
            const today = new Date().toDateString();
            const lastShownDate = localStorage.getItem('careerTipDate');

            // If we haven't shown a tip today, select a random one
            if (lastShownDate !== today) {
                const randomTip = careerTips[Math.floor(Math.random() * careerTips.length)];
                setTip(randomTip);
                localStorage.setItem('careerTipDate', today);
                localStorage.setItem('careerTip', JSON.stringify(randomTip));
            } else {
                // Load today's tip from localStorage
                const savedTip = localStorage.getItem('careerTip');
                if (savedTip) {
                    setTip(JSON.parse(savedTip));
                }
            }
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    if (!isOpen || !tip) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-sm w-full pointer-events-auto animate-in fade-in scale-95 duration-200">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 rounded-t-3xl p-6 text-white">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">{tip.icon}</span>
                            <h2 className="text-xl font-bold">Career Tip of the Day</h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {tip.title}
                        </h3>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {tip.tip}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full">
                                {tip.category}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Tip #{tip.id} of {careerTips.length}
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Got it
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                        >
                            <span>Learn More</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CareerTipOfTheDay;
