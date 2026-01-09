import React, { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/common/Toast';

const DigitalWellbeing = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const handleDownload = () => {
        // Download the image
        const link = document.createElement('a');
        link.href = '/mental-health-ad.jpg';
        link.download = 'Mental-Health-Support-Hotline.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setToast({
            type: 'success',
            message: 'Mental health support information downloaded successfully!'
        });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="space-y-4">
            {/* Header with Back Button and Page Info */}
            <div className="flex items-start gap-3 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => navigate('/explore')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Digital Wellbeing</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Your mental health matters. We're here to help and support you.</p>
                </div>
            </div>

            {/* Full Image Display */}
            <div className="w-full h-auto rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
                <img 
                    src="/mental-health-ad.jpg" 
                    alt="Mental Health Support - You're Not Alone"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Download Button Below Image */}
            <div className="flex justify-center">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl"
                >
                    <Download className="w-5 h-5" />
                    Download Image
                </button>
            </div>

            {/* Toast Notification */}
            {toast && (
                <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
            )}
        </div>
    );
};

export default DigitalWellbeing;
