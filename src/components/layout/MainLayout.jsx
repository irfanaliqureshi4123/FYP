import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RightSidebar from './RightSidebar';
import CareerTipOfTheDay from '../widgets/CareerTipOfTheDay';
import { useAuth } from '../../context/AuthContext';

/**
 * Main Layout Component
 * Overall application structure with sidebar, navbar, and content area
 * Fully responsive with mobile-first design
 */
const MainLayout = () => {
    const sidebarRef = useRef();
    const [showCareerTip, setShowCareerTip] = useState(false);
    const location = useLocation();
    const { currentUser } = useAuth();

    // Hide RightSidebar for career counselors and mentors on all pages
    // Both roles get a clean, focused interface
    const userIsCounselor = currentUser?.userRole === 'career_counselor' || 
                            (currentUser?.counsellorStatus && currentUser?.counsellorStatus !== 'none');
    const userIsMentor = currentUser?.userRole === 'mentor';
    const shouldHideRightSidebar = userIsCounselor || userIsMentor;

    // Show career tip on mount for small devices
    useEffect(() => {
        const hasSeenTip = sessionStorage.getItem('careerTipShownToday');
        if (!hasSeenTip) {
            // Small delay to let page load before showing modal
            const timer = setTimeout(() => {
                setShowCareerTip(true);
                sessionStorage.setItem('careerTipShownToday', 'true');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-theme">
            {/* Career Tip of the Day Modal */}
            <CareerTipOfTheDay isOpen={showCareerTip} onClose={() => setShowCareerTip(false)} />

            <div className="flex">
                {/* Left Sidebar - Hidden on mobile, visible on lg+ */}
                <Sidebar ref={sidebarRef} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Top Navbar */}
                    <Navbar sidebarRef={sidebarRef} />

                    {/* Content with Right Sidebar */}
                    <div className="flex flex-col lg:flex-row flex-1">
                        {/* Main Content - Full width on mobile/tablet, constrained on desktop */}
                        <main className="flex-1 min-w-0">
                            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6">
                                <Outlet />
                            </div>
                        </main>

                        {/* Right Sidebar - Hidden for Counselor Dashboard, Responsive on all devices */}
                        {!shouldHideRightSidebar && (
                            <div className="sticky top-16 h-auto lg:h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin px-3 sm:px-4 lg:px-4 xl:px-6 py-3 sm:py-4 lg:py-6 w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700">
                                <RightSidebar />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
