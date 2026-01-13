# Career Counselor Role - Quick Start Guide

## What's New?

A complete role-based rendering system that transforms the entire interface for career counselors.

## How to Test

### Step 1: Go to Settings
Navigate to the Settings page (`/settings`)

### Step 2: Find "Role Management" Section
Scroll down to the blue "Role Management" section

### Step 3: Switch to Career Counselor
Click the button labeled "💼 Switch to Career Counselor"

You will:
- See a success toast notification
- Be automatically redirected to the Counselor Dashboard
- See the entire interface transform

### Step 4: Observe the Changes

**Sidebar Changes:**
- ❌ Explore - HIDDEN
- ❌ Messages - HIDDEN
- ❌ Notifications - HIDDEN
- ❌ Saved - HIDDEN
- ❌ Profile - HIDDEN
- ✓ Home - Visible
- ✓ Counselor Dashboard - Visible

**Dashboard Available:**
Navigate to "Counselor Dashboard" and explore:

#### Overview Tab (Default)
- **Stats Cards:** Active Clients, Total Sessions, Average Rating, Monthly Earnings
- **Upcoming Sessions:** See 4 upcoming client sessions
- **Recent Activity:** View 6 recent activities (completed sessions, bookings, reviews, messages)

#### My Clients Tab
- View all 6 clients with:
  - Avatar & name
  - Active/Inactive status
  - Sessions completed
  - Last session date
  - Star rating
  - Quick action button

#### Sessions Tab
- Complete session history table with:
  - Client names
  - Date & time
  - Session topic
  - Duration
  - Status (Completed)
  - Earnings per session

#### Earnings Tab
- **This Month:** $3,450
- **Last Month:** $3,200
- **Year-to-Date:** $6,650
- **Breakdown:** Chart showing earnings by session duration

### Step 5: Switch Back to Student
1. Navigate to Settings (`/settings`)
2. Scroll to Role Management
3. Click "👨‍🎓 Switch to Student"
4. Full navigation returns immediately

## Role-Based Access Control

### Career Counselor Can Access:
- ✓ Home page
- ✓ Counselor Dashboard (exclusive)
- ✓ Settings page (to switch roles)

### Career Counselor Cannot Access (Hidden in Sidebar):
- Explore
- Messages
- Notifications
- Saved
- Profile
- Admin panels
- Student features
- Teacher/Professional features

### Direct URL Access:
Even if you try to access other routes via URL while as a career counselor:
- The route still loads (for flexibility)
- BUT the sidebar won't highlight it
- AND navigation back is restricted

### Dashboard Protection:
The `/counselor/dashboard` route is strictly protected:
- Only accessible with `userRole === 'career_counselor'`
- Other users are redirected to home (`/`)

## Feature Highlights

### 📊 Dashboard Statistics
Real-time stats showing:
- 24 Active Clients
- 156 Total Sessions  
- 4.8★ Average Rating
- $3,450 Monthly Earnings

All with trend indicators showing month-over-month growth.

### 📅 Upcoming Sessions
Displays next 4 upcoming sessions with:
- Client name & avatar
- Scheduled time
- Session duration
- Topic/focus area
- Quick action buttons

### 👥 Client Management
Complete client database showing:
- Client status (Active/Inactive)
- Session history
- Client ratings
- Last interaction date
- Quick view option

### 💰 Earnings Tracking
Financial overview including:
- Monthly earnings breakdown
- Comparison with previous month
- Year-to-date totals
- Earnings by session type pie chart

### 📈 Activity Feed
Recent activity log showing:
- Session completions
- New client bookings
- Client reviews & ratings
- Client messages

## Technical Implementation

### Files Modified:
1. **src/context/AuthContext.jsx**
   - Added `userRole` property
   - Added `setUserRole()` function

2. **src/components/layout/Sidebar.jsx**
   - Added role-based navigation filtering
   - `getNavItems()` function returns different items based on role

3. **src/pages/settings/Settings.jsx**
   - Added "Role Management" section
   - Added role switching buttons
   - Auto-redirect to dashboard for counselors

4. **src/App.jsx**
   - Imported `RoleBasedRoute` component
   - Protected `/counselor/dashboard` route

### Files Created:
1. **src/components/common/RoleBasedRoute.jsx**
   - Route protection component
   - Checks user role and redirects if unauthorized

2. **src/pages/counselors/CounsellorDashboard.jsx**
   - Complete counselor dashboard
   - 4 tabs with mock data
   - Stats, sessions, clients, earnings

## Mock Data

All dashboard data is currently mock data. When connected to a real backend:

### API Endpoints Needed:
- `GET /api/counselor/stats` - Get dashboard statistics
- `GET /api/counselor/upcoming-sessions` - Get upcoming sessions
- `GET /api/counselor/clients` - Get client list
- `GET /api/counselor/sessions` - Get session history
- `GET /api/counselor/earnings` - Get earnings data
- `POST /api/user/role` - Switch user role

### Data Structure Example:
```jsx
// Stats
{
  activeClients: 24,
  totalSessions: 156,
  averageRating: 4.8,
  monthlyEarnings: 3450
}

// Upcoming Session
{
  id: 1,
  clientName: "John Doe",
  time: "Today, 2:00 PM",
  duration: "60 mins",
  topic: "Tech Career Transition",
  avatar: "https://..."
}
```

## Troubleshooting

### Dashboard Not Showing?
1. Make sure you switched to "Career Counselor" role
2. Check that `currentUser.userRole === 'career_counselor'`
3. Clear browser localStorage: `localStorage.clear()`
4. Refresh the page

### Navigation Still Showing Other Items?
1. The role change should be immediate
2. If not, refresh the page
3. Check browser console for errors

### Can't Find Settings?
1. Go to `/settings` directly in URL
2. Or click on your profile avatar and look for Settings option

### Redirect Not Working?
1. Check that `/counselor/dashboard` route exists
2. Verify `RoleBasedRoute` is imported in App.jsx
3. Check browser console for routing errors

## Role Persistence

- User role is saved to localStorage
- Role persists across page refreshes
- Role persists across browser sessions
- Clearing localStorage resets to default (student)

## What's NOT Included Yet

These features can be added:
- ✗ Real backend integration
- ✗ Actual session scheduling
- ✗ Real client data
- ✗ Payment/earnings tracking
- ✗ Client messaging
- ✗ Document uploads
- ✗ Video conferencing
- ✗ Review system

## Next Steps

1. **Backend Integration:**
   - Connect to real database
   - Implement authentication
   - Set up API endpoints

2. **Functionality:**
   - Build booking system
   - Implement messaging
   - Add payment processing

3. **Enhancement:**
   - Add analytics
   - Real-time updates
   - Advanced reporting

## Questions?

Refer to the full documentation:
- `CAREER_COUNSELOR_ROLE_IMPLEMENTATION.md` - Technical details
- Code comments in component files

---

**Version:** 1.0
**Status:** Ready for Testing
**Last Updated:** January 12, 2026
