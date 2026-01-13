import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import { Loader } from './components/common/Loader';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleBasedRoute from './components/common/RoleBasedRoute';

// Eager load critical pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

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
const AdminCounsellorApplications = lazy(() => import('./pages/AdminCounsellorApplications'));
const AdminMentorApplications = lazy(() => import('./pages/AdminMentorApplications'));
const FeatureTestingGuide = lazy(() => import('./pages/FeatureTestingGuide'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminUserManagementPage = lazy(() => import('./pages/AdminUserManagementPage'));
const AdminActivityLogsPage = lazy(() => import('./pages/AdminActivityLogsPage'));
const AdminContentModerationPage = lazy(() => import('./pages/AdminContentModerationPage'));
const AdminFinancialPage = lazy(() => import('./pages/AdminFinancialPage'));
const AdminBookingsPage = lazy(() => import('./pages/AdminBookingsPage'));
const AdminSettingsPage = lazy(() => import('./pages/AdminSettingsPage'));
const Mentors = lazy(() => import('./pages/mentors/Mentors'));
const MentorDashboard = lazy(() => import('./pages/mentors/MentorDashboard'));
const CounsellorDashboard = lazy(() => import('./pages/counselors/CounsellorDashboard'));
const RoadmapPage = lazy(() => import('./components/roadmaps/RoadmapPage'));

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
              {/* Auth Routes - Outside MainLayout */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Main App Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Suspense fallback={<PageLoader />}><Search /></Suspense>} />
                <Route path="roadmaps" element={<Suspense fallback={<PageLoader />}><RoadmapPage /></Suspense>} />
                <Route path="explore" element={<Explore />} />
                <Route path="ai-chat" element={<Suspense fallback={<PageLoader />}><AIChat /></Suspense>} />
                <Route path="ai-tools" element={<Suspense fallback={<PageLoader />}><AITools /></Suspense>} />
                <Route path="wellbeing" element={<Suspense fallback={<PageLoader />}><DigitalWellbeing /></Suspense>} />
                <Route path="resources" element={<Suspense fallback={<PageLoader />}><Resources /></Suspense>} />
                <Route path="careers" element={<Suspense fallback={<PageLoader />}><Careers /></Suspense>} />
                <Route path="counselling" element={<Suspense fallback={<PageLoader />}><CareerCounselling /></Suspense>} />
                <Route path="counselling/booking/:counsellorId" element={<Suspense fallback={<PageLoader />}><BookingPage /></Suspense>} />
                <Route path="counselling/chat/:counsellorId" element={<Suspense fallback={<PageLoader />}><CounsellorChat /></Suspense>} />
                <Route path="mentors" element={<Suspense fallback={<PageLoader />}><Mentors /></Suspense>} />
                <Route path="mentor/dashboard" element={<Suspense fallback={<PageLoader />}><MentorDashboard /></Suspense>} />
                <Route path="counselor/dashboard" element={<Suspense fallback={<PageLoader />}><RoleBasedRoute element={<CounsellorDashboard />} allowedRoles={['career_counselor']} redirectTo="/" /></Suspense>} />
                <Route path="mentor/:mentorId" element={<Suspense fallback={<PageLoader />}><Mentors /></Suspense>} />
                <Route path="mentor/:mentorId/booking" element={<Suspense fallback={<PageLoader />}><BookingPage /></Suspense>} />
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
                <Route path="testing-guide" element={<Suspense fallback={<PageLoader />}><FeatureTestingGuide /></Suspense>} />
              </Route>
              {/* Admin Routes - Separate from MainLayout to show admin-only interface */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminDashboardPage /></Suspense></ProtectedRoute>} />
                <Route path="users" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminUserManagementPage /></Suspense></ProtectedRoute>} />
                <Route path="activity-logs" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminActivityLogsPage /></Suspense></ProtectedRoute>} />
                <Route path="counsellor-applications" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminCounsellorApplications /></Suspense></ProtectedRoute>} />
                <Route path="mentor-applications" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminMentorApplications /></Suspense></ProtectedRoute>} />
                <Route path="content-moderation" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminContentModerationPage /></Suspense></ProtectedRoute>} />
                <Route path="finance" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminFinancialPage /></Suspense></ProtectedRoute>} />
                <Route path="bookings" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminBookingsPage /></Suspense></ProtectedRoute>} />
                <Route path="settings" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AdminSettingsPage /></Suspense></ProtectedRoute>} />
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
