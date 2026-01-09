import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import { Loader } from './components/common/Loader';

// Eager load critical pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Roadmap from './pages/Roadmap';

// Lazy load route components for code splitting
const Careers = lazy(() => import('./pages/Careers'));
const CareerCounselling = lazy(() => import('./pages/CareerCounselling'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const CounsellorChat = lazy(() => import('./pages/CounsellorChat'));
const AIChat = lazy(() => import('./pages/AIChat'));
const AITools = lazy(() => import('./pages/AITools'));
const DigitalWellbeing = lazy(() => import('./pages/DigitalWellbeing'));
const Resources = lazy(() => import('./pages/Resources'));
const Profile = lazy(() => import('./pages/user profiles/Profile'));
const EditProfile = lazy(() => import('./pages/user profiles/EditProfile'));
const Messages = lazy(() => import('./pages/messages/Messages'));
const Notifications = lazy(() => import('./pages/notifications/Notifications'));
const Saved = lazy(() => import('./pages/saved/Saved'));
const Settings = lazy(() => import('./pages/settings/Settings'));
const Search = lazy(() => import('./pages/search feature/Search'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const WhoToFollow = lazy(() => import('./pages/WhoToFollow'));
const TrendingTopics = lazy(() => import('./pages/TrendingTopics'));
const CareerTips = lazy(() => import('./pages/CareerTips'));

// Loading component for lazy routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader />
  </div>
);

/**
 * Main App Component
 * Sets up routing and context providers
 */
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Suspense fallback={<PageLoader />}><Search /></Suspense>} />
                <Route path="roadmap" element={<Roadmap />} />
                <Route path="explore" element={<Explore />} />
                <Route path="ai-chat" element={<Suspense fallback={<PageLoader />}><AIChat /></Suspense>} />
                <Route path="ai-tools" element={<Suspense fallback={<PageLoader />}><AITools /></Suspense>} />
                <Route path="wellbeing" element={<Suspense fallback={<PageLoader />}><DigitalWellbeing /></Suspense>} />
                <Route path="resources" element={<Suspense fallback={<PageLoader />}><Resources /></Suspense>} />
                <Route path="careers" element={<Suspense fallback={<PageLoader />}><Careers /></Suspense>} />
                <Route path="counselling" element={<Suspense fallback={<PageLoader />}><CareerCounselling /></Suspense>} />
                <Route path="counselling/booking/:counsellorId" element={<Suspense fallback={<PageLoader />}><BookingPage /></Suspense>} />
                <Route path="counselling/chat/:counsellorId" element={<Suspense fallback={<PageLoader />}><CounsellorChat /></Suspense>} />
                <Route path="profile/:username" element={<Suspense fallback={<PageLoader />}><Profile /></Suspense>} />
                <Route path="profile/:username/edit" element={<Suspense fallback={<PageLoader />}><EditProfile /></Suspense>} />
                <Route path="messages" element={<Suspense fallback={<PageLoader />}><Messages /></Suspense>} />
                <Route path="notifications" element={<Suspense fallback={<PageLoader />}><Notifications /></Suspense>} />
                <Route path="saved" element={<Suspense fallback={<PageLoader />}><Saved /></Suspense>} />
                <Route path="settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
                <Route path="privacy-policy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
                <Route path="terms-of-service" element={<Suspense fallback={<PageLoader />}><TermsOfService /></Suspense>} />
                <Route path="who-to-follow" element={<Suspense fallback={<PageLoader />}><WhoToFollow /></Suspense>} />
                <Route path="trending-topics" element={<Suspense fallback={<PageLoader />}><TrendingTopics /></Suspense>} />
                <Route path="career-tips" element={<Suspense fallback={<PageLoader />}><CareerTips /></Suspense>} />
              </Route>
              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
