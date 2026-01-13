# Career Counselor Role-Based Rendering Implementation

## Overview

This document outlines the strict role-based rendering implementation for the SmartCareer platform. When a user's role is set to `career_counselor`, they see a completely different interface compared to student users.

## Key Features

### 1. Role-Based Navigation (Sidebar)
**File:** `src/components/layout/Sidebar.jsx`

- **For Career Counselors (`userRole === 'career_counselor'`):**
  - ✓ Home
  - ✓ Counselor Dashboard
  - All other navigation items are **HIDDEN**

- **For Students (default):**
  - ✓ Home
  - ✓ Explore
  - ✓ Messages
  - ✓ Notifications
  - ✓ Saved
  - ✓ Profile
  - ✓ Settings

**Implementation:**
```jsx
const getNavItems = () => {
    const userRole = currentUser?.userRole || 'student';
    
    if (userRole === 'career_counselor') {
        return [
            { path: '/', icon: Home, label: 'Home' },
            { path: '/counselor/dashboard', icon: Users, label: 'Counselor Dashboard' },
        ];
    }
    // ... default student navigation
};
```

### 2. Career Counselor Dashboard
**File:** `src/pages/counselors/CounsellorDashboard.jsx`

#### Features:
- **Dashboard Title:** "Counsellor Dashboard"
- **Subtitle:** "Manage your clients and track your impact"

#### Overview Tabs:
1. **Overview** (Default)
   - Upcoming Sessions (with client info, time, duration, topic)
   - Recent Activity (session completions, bookings, reviews, messages)

2. **My Clients**
   - Client list table with:
     - Client name & avatar
     - Status (Active/Inactive)
     - Sessions completed
     - Last session date
     - Average rating

3. **Sessions**
   - Session history table with:
     - Client name
     - Date & time
     - Topic
     - Duration
     - Status
     - Earnings per session

4. **Earnings**
   - Monthly earnings overview
   - Last month comparison
   - Year-to-date total
   - Earnings breakdown by session duration

#### Stats Cards:
- **Active Clients:** 24 (with trend)
- **Total Sessions:** 156 (with trend)
- **Average Rating:** 4.8★ (with trend)
- **Monthly Earnings:** $3,450 (with trend)

### 3. Role-Based Route Protection
**File:** `src/components/common/RoleBasedRoute.jsx`

Protects sensitive routes by checking user role:
```jsx
const RoleBasedRoute = ({ 
    element, 
    allowedRoles = ['student'],
    redirectTo = '/'
}) => {
    const { currentUser } = useAuth();
    const userRole = currentUser?.userRole || 'student';
    
    if (allowedRoles.includes(userRole)) {
        return element;
    }
    return <Navigate to={redirectTo} replace />;
};
```

**Applied to:** `/counselor/dashboard` route
- Only accessible to users with `userRole === 'career_counselor'`
- Non-counselors are redirected to homepage

### 4. AuthContext Enhancements
**File:** `src/context/AuthContext.jsx`

Added new functions and properties:

```jsx
// New property in currentUser
userRole: 'student' | 'career_counselor' | 'mentor' | 'admin'

// New function to set user role
const setUserRole = (role) => {
    const updatedUser = {
        ...currentUser,
        userRole: role
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
};
```

### 5. Role Switching in Settings
**File:** `src/pages/settings/Settings.jsx`

Added "Role Management" section that allows testing:
- Button to switch to Student role
- Button to switch to Career Counselor role
- Current role display
- Auto-redirect to dashboard when switching to career counselor

## Navigation Rules

### What Counselors Cannot Access:
- ❌ Explore
- ❌ Messages
- ❌ Notifications
- ❌ Saved
- ❌ Profile
- ❌ Settings (accessible but limited)
- ❌ Admin panels
- ❌ Student features
- ❌ Mentor/Professional features
- ❌ All other routes (except Home and Dashboard)

### Route Access Control:
| Route | Student | Counselor | Redirects |
|-------|---------|-----------|-----------|
| `/` | ✓ | ✓ | - |
| `/counselor/dashboard` | ✗ | ✓ | → / |
| `/explore` | ✓ | ✗ | Sidebar hidden |
| `/messages` | ✓ | ✗ | Sidebar hidden |
| `/notifications` | ✓ | ✗ | Sidebar hidden |
| Other routes | ✓ | ✗ | Sidebar hidden |

## Testing Instructions

### Switch to Career Counselor Role:
1. Navigate to Settings page
2. Scroll to "Role Management" section
3. Click "Switch to Career Counselor" button
4. Auto-redirects to Dashboard
5. Sidebar now shows only "Home" and "Counselor Dashboard"

### Switch Back to Student:
1. Navigate to Settings (if still visible)
2. Click "Switch to Student" button
3. Full navigation returns

### Verify Restricted Access:
1. As Career Counselor, try accessing other routes via URL:
   - `/explore` → Shows normally but sidebar doesn't highlight
   - `/messages` → Shows normally but sidebar doesn't highlight
   - etc.
2. Routes are not blocked at HTTP level (for flexibility), but sidebar prevents discovery

## Mock Data Included

### Dashboard Statistics:
- 24 active clients
- 156 total sessions
- 4.8★ average rating
- $3,450 monthly earnings

### Upcoming Sessions (4):
- John Doe - Today 2:00 PM
- Emily Smith - Today 3:30 PM
- Michael Johnson - Tomorrow 10:00 AM
- Sarah Williams - Tomorrow 2:00 PM

### My Clients (6):
- John Doe (Active, 5 sessions, 5★)
- Emily Smith (Active, 3 sessions, 4.5★)
- Michael Johnson (Active, 8 sessions, 5★)
- Sarah Williams (Inactive, 2 sessions, 4★)
- Alex Chen (Active, 6 sessions, 5★)
- Jessica Lee (Active, 4 sessions, 4.5★)

### Sessions History (5):
- With dates, times, topics, durations, and earnings

## Database Integration Notes

When connecting to a real backend:

### Update AuthContext:
```jsx
useEffect(() => {
    // Fetch user from API
    const user = await fetchUser(); // includes userRole
    setCurrentUser(user);
}, []);
```

### Update CounsellorDashboard:
```jsx
useEffect(() => {
    // Fetch real data from API
    const stats = await fetchCounsellorStats(currentUser.id);
    const sessions = await fetchUpcomingSessions(currentUser.id);
    const clients = await fetchMyClients(currentUser.id);
    // ... update state
}, [currentUser]);
```

### Update Settings:
```jsx
const handleRoleSwitch = async (role) => {
    await updateUserRole(currentUser.id, role); // API call
    setUserRole(role);
    // ... rest of handler
};
```

## File Structure

```
src/
├── context/
│   └── AuthContext.jsx (Updated with userRole and setUserRole)
├── components/
│   ├── layout/
│   │   └── Sidebar.jsx (Updated with role-based navigation)
│   └── common/
│       └── RoleBasedRoute.jsx (NEW)
├── pages/
│   ├── counselors/
│   │   └── CounsellorDashboard.jsx (NEW)
│   └── settings/
│       └── Settings.jsx (Updated with role switching)
└── App.jsx (Updated with RoleBasedRoute import and protection)
```

## Security Considerations

1. **Frontend Filtering:** This implementation filters the UI based on role. For production:
   - Always validate user role on the backend
   - Implement proper authentication tokens
   - Use JWT or similar for session management

2. **Route Protection:** Routes show content even if accessed directly via URL. For production:
   - Implement backend route guards
   - Return 403 Forbidden for unauthorized access
   - Log unauthorized access attempts

3. **Mock Data:** All dashboard data is client-side mock data. For production:
   - Fetch from backend API
   - Implement proper pagination
   - Add caching strategies

## Component Props & State

### CounsellorDashboard
- `activeTab`: Manages which dashboard tab is displayed
- `stats`: Hardcoded mock statistics
- `upcomingSessions`: Mock upcoming session data
- `recentActivity`: Mock activity feed
- `myClients`: Mock client list
- `sessions`: Mock session history

### Sidebar
- Uses `getNavItems()` function to determine navigation based on role
- Still shows user profile at bottom (can be hidden if needed)

## Customization Options

### To add more roles:
1. Update `getNavItems()` in Sidebar:
   ```jsx
   if (userRole === 'mentor') {
       return [/* mentor navigation */];
   }
   ```

2. Create new dashboard component: `MentorDashboard.jsx`

3. Update RoleBasedRoute usage in App.jsx

### To hide Settings for counselors:
In Sidebar, add conditional rendering:
```jsx
const getNavItems = () => {
    const items = [...];
    if (userRole !== 'career_counselor') {
        items.push({ path: '/settings', icon: Settings, label: 'Settings' });
    }
    return items;
};
```

### To add permissions system:
```jsx
// In AuthContext
const hasPermission = (permission) => {
    const roles = {
        'career_counselor': ['view_dashboard', 'view_clients', ...],
        'student': ['view_career_tips', 'book_sessions', ...],
    };
    return roles[userRole]?.includes(permission) || false;
};
```

## API Response Example

When backend is connected, expect responses like:

```json
{
  "id": "user-123",
  "username": "counselor_jane",
  "name": "Jane Smith",
  "userRole": "career_counselor",
  "counsellorStatus": "approved",
  "email": "jane@example.com"
}
```

## Testing Checklist

- [x] Career counselor sees only Home and Dashboard in sidebar
- [x] Student sees full navigation
- [x] Dashboard displays all required tabs
- [x] Stats cards show correct mock data
- [x] Upcoming sessions display properly
- [x] Recent activity updates correctly
- [x] My Clients tab shows client list
- [x] Sessions tab shows history
- [x] Earnings tab displays breakdown
- [x] Role switching works in Settings
- [x] Non-counselors redirected from dashboard
- [x] Dark mode compatible
- [x] Mobile responsive
- [x] No console errors

## Future Enhancements

1. **Real-time Updates:** WebSocket integration for live session updates
2. **Analytics:** Advanced charts for earnings trends
3. **Client Messaging:** In-app messaging for counselor-client communication
4. **Availability Calendar:** Calendar widget for session scheduling
5. **Document Upload:** Support for sharing resources with clients
6. **Review System:** Client reviews and ratings display
7. **Export:** Generate earnings reports and session transcripts
8. **Notifications:** Real-time booking and review notifications

---

**Last Updated:** January 12, 2026
**Status:** Implementation Complete - Testing Phase
