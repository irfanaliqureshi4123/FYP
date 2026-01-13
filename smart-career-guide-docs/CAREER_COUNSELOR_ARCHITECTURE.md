# Career Counselor Role - Visual Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SmartCareer App                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐          ┌──────────────┐               │
│  │   Student    │ ◄──────► │Counselor     │               │
│  │   User       │   Role   │ User         │               │
│  │   (default)  │   Switch │ (career_     │               │
│  │              │          │  counselor)  │               │
│  └──────────────┘          └──────────────┘               │
│       │                            │                       │
│       │                            │                       │
│   ┌───▼────────────────────┐  ┌────▼─────────────────┐   │
│   │   STUDENT NAVIGATION   │  │ COUNSELOR NAV       │   │
│   ├────────────────────────┤  ├─────────────────────┤   │
│   │ ✓ Home                 │  │ ✓ Home              │   │
│   │ ✓ Explore              │  │ ✓ Counselor         │   │
│   │ ✓ Messages             │  │   Dashboard         │   │
│   │ ✓ Notifications        │  │                     │   │
│   │ ✓ Saved                │  │ (Hidden)            │   │
│   │ ✓ Profile              │  │ ✗ Explore           │   │
│   │ ✓ Settings             │  │ ✗ Messages          │   │
│   │                        │  │ ✗ Notifications     │   │
│   │ + 15 more routes       │  │ ✗ Saved/Profile     │   │
│   └────────────────────────┘  │ ✗ Other routes      │   │
│                                └─────────────────────┘   │
│                                                             │
│    ┌─────────────────────────────────────────────────┐    │
│    │      HOME PAGE (Accessible to Both)            │    │
│    └─────────────────────────────────────────────────┘    │
│                          │                                 │
│         ┌────────────────┴────────────────┐              │
│         │                                  │              │
│    ┌────▼──────────────────────┐   ┌──────▼──────────┐   │
│    │   Student Routes          │   │ Counselor      │   │
│    │   (All accessible)        │   │ Dashboard      │   │
│    ├───────────────────────────┤   ├───────────────┤   │
│    │ /explore                  │   │ PROTECTED:    │   │
│    │ /messages                 │   │ /counselor/   │   │
│    │ /notifications            │   │  dashboard    │   │
│    │ /saved                    │   │               │   │
│    │ /profile/:username        │   │ RoleBasedRoute│   │
│    │ /settings                 │   │ Component     │   │
│    │ /careers                  │   │               │   │
│    │ /counselling              │   │ Redirects     │   │
│    │ /mentors                  │   │ non-          │   │
│    │ /mentor/dashboard         │   │ counselors    │   │
│    │ /ai-chat                  │   │ to /          │   │
│    │ /ai-tools                 │   │               │   │
│    │ /resources                │   └───────────────┘   │
│    │ /wellbeing                │                        │
│    │ + more...                 │                        │
│    └───────────────────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
App.jsx
├── AuthProvider
│   ├── currentUser (includes userRole)
│   ├── setUserRole()
│   └── login/logout
│
├── ThemeProvider
├── AppProvider
└── BrowserRouter
    └── Routes
        ├── /login (public)
        ├── /register (public)
        ├── / (MainLayout)
        │   ├── Sidebar
        │   │   └── getNavItems() [ROLE-BASED]
        │   │       ├── IF counselor: Home, Dashboard
        │   │       └── ELSE: Home, Explore, Messages, ...
        │   │
        │   ├── Navbar
        │   ├── RightSidebar
        │   │
        │   └── Routes (nested)
        │       ├── / (Home)
        │       ├── /explore (Student)
        │       ├── /messages (Student)
        │       ├── /notifications (Student)
        │       ├── /saved (Student)
        │       ├── /counselor/dashboard
        │       │   └── RoleBasedRoute [PROTECTED]
        │       │       └── CounsellorDashboard
        │       │           ├── Stats (4 cards)
        │       │           └── Tabs (4):
        │       │               ├── Overview
        │       │               ├── My Clients
        │       │               ├── Sessions
        │       │               └── Earnings
        │       ├── /settings
        │       │   └── Role Management Section
        │       └── ... other routes
```

## Data Flow Diagram

```
┌──────────────────┐
│  LocalStorage    │ ◄────────┐
│  (user role)     │          │
└────────┬─────────┘          │
         │                    │
         ▼                    │
┌──────────────────┐   ┌──────┴──────────┐
│  AuthContext     │   │ setUserRole()   │
│                  │   └─────────────────┘
│ currentUser:{    │          ▲
│   userRole:      │          │
│   'student' |    │    Role Switch
│   'counselor'    │    (Settings)
│ }                │          │
└────────┬─────────┘   ┌──────┴──────────┐
         │             │ User clicks     │
         │             │ button          │
         ▼             └─────────────────┘
    Re-render
         │
    ┌────┴──────────┐
    │               │
    ▼               ▼
Sidebar      Sidebar
(getNavItems)(getNavItems)
    │               │
    │               │
Student Nav    Counselor Nav
(7 items)      (2 items)
    │               │
    └────┬──────────┘
         │
    Navigation
    Updates
```

## State Management

```
AuthContext
│
├── currentUser
│   ├── id
│   ├── username
│   ├── name
│   ├── avatar
│   ├── userRole: 'student' | 'career_counselor' | 'mentor' | 'admin'
│   ├── counsellorStatus: 'none' | 'pending' | 'approved' | 'rejected'
│   └── counsellorData: {...}
│
├── isAuthenticated: boolean
│
└── Functions:
    ├── login(user)
    ├── logout()
    ├── setUserRole(role)
    └── updateCounsellorStatus(status, data)
```

## Dashboard Data Structure

```
CounsellorDashboard
│
├── Stats
│   ├── activeClients: 24
│   ├── totalSessions: 156
│   ├── averageRating: 4.8
│   └── monthlyEarnings: 3450
│
├── Tabs
│   ├── Overview
│   │   ├── upcomingSessions[4]
│   │   │   ├── id, clientName, time
│   │   │   ├── duration, topic, avatar
│   │   │   └── [...4 sessions]
│   │   │
│   │   └── recentActivity[6]
│   │       ├── id, type, client, action
│   │       ├── time, icon
│   │       └── [...6 activities]
│   │
│   ├── My Clients
│   │   └── myClients[6]
│   │       ├── id, name, status
│   │       ├── sessionsCompleted, lastSession
│   │       ├── rating, avatar
│   │       └── [...6 clients]
│   │
│   ├── Sessions
│   │   └── sessions[5]
│   │       ├── id, clientName, date, time
│   │       ├── topic, status, earnings
│   │       └── [...5 sessions]
│   │
│   └── Earnings
│       ├── thisMonth: 3450
│       ├── lastMonth: 3200
│       ├── ytdTotal: 6650
│       └── breakdown: [...by type]
│
└── UI State
    └── activeTab: 'overview' | 'clients' | 'sessions' | 'earnings'
```

## Route Protection Flow

```
User navigates to /counselor/dashboard
│
▼
Route matches (/counselor/dashboard)
│
▼
RoleBasedRoute component rendered
│
├─ allowedRoles: ['career_counselor']
├─ currentUser.userRole
│
▼
┌─────────────────────────────┐
│ Is userRole in allowedRoles?│
└──────────┬──────────────────┘
           │
    ┌──────┴─────┐
    │            │
   YES          NO
    │            │
    ▼            ▼
Render      Navigate to
Dashboard   redirectTo (/
    │
    ▼
Show
Dashboard
```

## User Journey: Role Switch

```
User in Student Mode
│
▼
Go to /settings
│
▼
Scroll to "Role Management"
│
▼
Click "💼 Switch to Career Counselor"
│
├─ setUserRole('career_counselor')
├─ Save to localStorage
├─ Update currentUser
├─ Show toast notification
│
▼
Navigate to /counselor/dashboard
│
▼
RoleBasedRoute checks role
│
├─ userRole === 'career_counselor' ✓
│
▼
CounsellorDashboard renders
│
├─ Load mock data
├─ Display stats
├─ Show tabs
│
▼
UI Transforms:
├─ Sidebar shows 2 items (Home, Dashboard)
├─ Dashboard visible & accessible
├─ Other nav items hidden
│
▼
User in Counselor Mode
```

## Role Comparison Table

```
┌────────────────┬──────────────┬───────────────────┐
│ Feature        │ Student      │ Counselor         │
├────────────────┼──────────────┼───────────────────┤
│ Home           │ ✓            │ ✓                 │
│ Explore        │ ✓            │ ✗                 │
│ Messages       │ ✓            │ ✗                 │
│ Notifications  │ ✓            │ ✗                 │
│ Saved          │ ✓            │ ✗                 │
│ Profile        │ ✓            │ ✗                 │
│ Settings       │ ✓            │ ✓ (limited)       │
│ Dashboard      │ ✗            │ ✓ (exclusive)     │
│ Counseling     │ ✓            │ ✗ (different UI)  │
│ AI Chat        │ ✓            │ ✗                 │
│ Careers        │ ✓            │ ✗                 │
│ Mentors        │ ✓            │ ✗                 │
│ Admin Panel    │ varies       │ ✗                 │
├────────────────┼──────────────┼───────────────────┤
│ Sidebar Items  │ 7+           │ 2                 │
│ Dashboard      │ General      │ Specialized       │
│ View           │ Full App     │ Limited Focused   │
└────────────────┴──────────────┴───────────────────┘
```

## Tech Stack Integration

```
React Components
│
├── AuthContext (Role Management)
│   ├── useAuth hook
│   └── Role persistence
│
├── Sidebar Component (Role-Based Rendering)
│   └── getNavItems() conditional logic
│
├── RoleBasedRoute Component (Protection)
│   └── Route access control
│
├── CounsellorDashboard Component (New)
│   ├── Stats display
│   ├── Tab management
│   └── Mock data
│
└── Settings Component (Role Switching)
    └── UI for testing
```

## CSS Classes Used

```
Styling Framework: Tailwind CSS

Key Classes:
├── flex, grid layouts
├── bg-gray-50 dark:bg-gray-900 (dark mode)
├── border border-gray-200 dark:border-gray-700
├── rounded-lg, rounded-2xl
├── text-gray-900 dark:text-white
├── bg-primary-600 text-white
├── hover: states
├── transition-colors, transition-all
├── shadow-sm, shadow-md
├── p-4, p-6, m-4 (spacing)
└── space-y-4, gap-6 (layout)
```

## Mobile Responsiveness

```
Breakpoints (Tailwind):
├── Default (mobile first)
├── sm: 640px
├── md: 768px
├── lg: 1024px
└── xl: 1280px

Dashboard Responsive:
├── Mobile (≤640px)
│   ├── Sidebar: Mobile menu
│   ├── Stats: Full width stacked
│   ├── Tables: Scrollable
│   └── Tabs: Horizontal scroll
│
├── Tablet (640-1024px)
│   ├── Sidebar: Fixed
│   ├── Stats: 2 columns
│   ├── Tables: Readable
│   └── Tabs: All visible
│
└── Desktop (≥1024px)
    ├── Sidebar: Fixed left
    ├── Stats: 4 columns
    ├── Tables: Full featured
    └── Tabs: All visible
```

## Dark Mode Support

```
ThemeContext (Tailwind)
│
├── Light Mode
│   ├── bg-white, text-gray-900
│   ├── Bright colors
│   └── High contrast
│
└── Dark Mode
    ├── bg-gray-900, text-white
    ├── Muted colors (dark:)
    └── Reduced eye strain
    
Applied to:
├── Sidebar (dark:bg-gray-800)
├── Dashboard (dark:bg-gray-800)
├── Tables (dark:bg-gray-700)
├── Buttons (dark: variants)
└── Text (dark:text-white)
```

---

**Architecture Version:** 1.0
**Last Updated:** January 12, 2026
