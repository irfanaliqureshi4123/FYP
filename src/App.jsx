import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import { Loader } from './components/common/Loader';

// Eager load critical pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';

// Lazy load route components for code splitting
const Academia = lazy(() => import('./pages/Academia/Academia'));
const University = lazy(() => import('./pages/Academia/university/University'));
const UniversityProfile = lazy(() => import('./pages/Academia/university/UniversityProfile'));
const UniversityGroup = lazy(() => import('./pages/Academia/university/UniversityGroup'));
const UniversitySemesterGroup = lazy(() => import('./pages/Academia/university/UniversitySemesterGroup'));
const UniversityCourseSubGroup = lazy(() => import('./pages/Academia/university/UniversityCourseSubGroup'));
const Careers = lazy(() => import('./pages/Careers'));
const Mentors = lazy(() => import('./pages/mentors/Mentors'));
const Profile = lazy(() => import('./pages/user profiles/Profile'));
const Messages = lazy(() => import('./pages/messages/Messages'));
const Notifications = lazy(() => import('./pages/notifications/Notifications'));
const Saved = lazy(() => import('./pages/saved/Saved'));
const Settings = lazy(() => import('./pages/settings/Settings'));
const Search = lazy(() => import('./pages/search feature/Search'));

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
                <Route path="explore" element={<Explore />} />
                <Route path="academia" element={<Suspense fallback={<PageLoader />}><Academia /></Suspense>} />
                <Route path="university" element={<Suspense fallback={<PageLoader />}><University /></Suspense>} />
                <Route path="university-profile/:universityId" element={<Suspense fallback={<PageLoader />}><UniversityProfile /></Suspense>} />
                <Route path="university-group/:universityId" element={<Suspense fallback={<PageLoader />}><UniversityGroup /></Suspense>} />
                <Route path="university-group/:universityId/:departmentId" element={<Suspense fallback={<PageLoader />}><UniversityGroup /></Suspense>} />
                <Route path="university-semester/:universityId/:departmentId/:batchId/:semesterId" element={<Suspense fallback={<PageLoader />}><UniversitySemesterGroup /></Suspense>} />
                <Route path="university-course/:universityId/:departmentId/:classId" element={<Suspense fallback={<PageLoader />}><UniversityCourseSubGroup /></Suspense>} />
                <Route path="careers" element={<Suspense fallback={<PageLoader />}><Careers /></Suspense>} />
                <Route path="mentors" element={<Suspense fallback={<PageLoader />}><Mentors /></Suspense>} />
                <Route path="profile/:username" element={<Suspense fallback={<PageLoader />}><Profile /></Suspense>} />
                <Route path="messages" element={<Suspense fallback={<PageLoader />}><Messages /></Suspense>} />
                <Route path="notifications" element={<Suspense fallback={<PageLoader />}><Notifications /></Suspense>} />
                <Route path="saved" element={<Suspense fallback={<PageLoader />}><Saved /></Suspense>} />
                <Route path="settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
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
