import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Academia from './pages/Academia/Academia';
import { School as SchoolList, default as SchoolProfile } from './pages/Academia/school/School';
import College from './pages/Academia/college/College';
import CollegeProfile from './pages/Academia/college/CollegeProfile';
import CollegeGroup from './pages/Academia/college/CollegeGroup';
import CollegeSemesterGroup from './pages/Academia/college/CollegeSemesterGroup';
import CollegeCourseSubGroup from './pages/Academia/college/CollegeCourseSubGroup';
import University from './pages/Academia/university/University';
import UniversityProfile from './pages/Academia/university/UniversityProfile';
import UniversityGroup from './pages/Academia/university/UniversityGroup';
import UniversitySemesterGroup from './pages/Academia/university/UniversitySemesterGroup';
import UniversityCourseSubGroup from './pages/Academia/university/UniversityCourseSubGroup';
import SchoolGroup from './pages/Academia/school/SchoolGroup';
import ClassSubGroup from './pages/Academia/school/ClassSubGroup';
import Careers from './pages/Careers';
import Mentors from './pages/mentors/Mentors';
import Profile from './pages/user profiles/Profile';
import Messages from './pages/messages/Messages';
import Notifications from './pages/notifications/Notifications';
import Saved from './pages/saved/Saved';
import Settings from './pages/settings/Settings';
import Search from './pages/search feature/Search';
import NotFound from './pages/NotFound';

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
                <Route path="search" element={<Search />} />
                <Route path="explore" element={<Explore />} />
                <Route path="academia" element={<Academia />} />
                <Route path="school" element={<SchoolList />} />
                <Route path="school-profile/:schoolId" element={<SchoolProfile />} />
                <Route path="school-group/:groupId" element={<SchoolGroup />} />
                <Route path="class/:classId" element={<ClassSubGroup />} />
                <Route path="college" element={<College />} />
                <Route path="college-profile/:collegeId" element={<CollegeProfile />} />
                <Route path="college-group/:collegeId" element={<CollegeGroup />} />
                <Route path="college-group/:collegeId/:departmentId" element={<CollegeGroup />} />
                <Route path="college-semester/:collegeId/:departmentId/:batchId/:semesterId" element={<CollegeSemesterGroup />} />
                <Route path="college-course/:collegeId/:departmentId/:classId" element={<CollegeCourseSubGroup />} />
                <Route path="university" element={<University />} />
                <Route path="university-profile/:universityId" element={<UniversityProfile />} />
                <Route path="university-group/:universityId" element={<UniversityGroup />} />
                <Route path="university-group/:universityId/:departmentId" element={<UniversityGroup />} />
                <Route path="university-semester/:universityId/:departmentId/:batchId/:semesterId" element={<UniversitySemesterGroup />} />
                <Route path="university-course/:universityId/:departmentId/:classId" element={<UniversityCourseSubGroup />} />
                <Route path="careers" element={<Careers />} />
                <Route path="mentors" element={<Mentors />} />
                <Route path="profile/:username" element={<Profile />} />
                <Route path="messages" element={<Messages />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="saved" element={<Saved />} />
                <Route path="settings" element={<Settings />} />
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
