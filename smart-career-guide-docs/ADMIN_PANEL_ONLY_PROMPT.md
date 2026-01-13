# Admin Panel Only – UI Prompt

> Design and render **only the Admin Panel interface** for the SmartCareer platform.
>
> **Requirements:**
>
> * Display the **Admin Dashboard exclusively** (no user app, no career feed, no "Back to App" button).
> * Include a **left sidebar** with admin navigation items: Dashboard, Users, Counselor Applications, Activity Logs, Content Moderation, Reports, Settings.
> * Show a **top admin header** with page title, search bar, notifications, and admin profile avatar.
> * Main content area should display **Admin overview widgets** (welcome message, key stats, recent activity).
> * Use a **professional, minimal design** with a blue-white color scheme.
> * Ensure **role-based access**: this layout is visible **only to admin users**.
> * Hide all user-facing components such as Career Assistant, Who to Follow, Explore, Messages, and Saved content.
> * Follow a **clean SaaS admin dashboard layout** with responsive design.

---

## 🔧 Optional (if using React / role-based routing)

Add this line at the end of the prompt if needed:

> Render this layout **only when `role === "admin"`**, otherwise redirect to the user dashboard.

---

## Implementation Notes

### Current Implementation ✅

- **Protected Routes**: All `/admin/*` routes are wrapped with `ProtectedRoute` component
- **Role Check**: Only users with `role: "admin"` can access admin panel
- **Clean Interface**: Removed "Back to App" button for pure admin experience
- **Navigation**: Updated sidebar to match prompt (Dashboard, Users, Counselor Applications, Activity Logs, Content Moderation, Reports, Settings)
- **Header**: Added search bar, notifications, and admin profile in top header
- **Design**: Professional blue-white color scheme with responsive layout

### Files Modified

1. `src/components/admin/AdminLayout.jsx`
   - Removed "Back to App" button
   - Added search bar and notifications to header
   - Updated navigation to match prompt
   - Changed branding to "Admin Dashboard"

2. `src/App.jsx`
   - All admin routes wrapped with `<ProtectedRoute>`

3. `src/data/users.json`
   - Added `role: "admin"` to Sarah Chen (test admin user)

4. `src/components/common/ProtectedRoute.jsx`
   - New component for role-based access control

### Testing

**Admin Access:**
- Login as Sarah Chen (has `role: "admin"`)
- Navigate to `/admin/dashboard`
- ✅ Should see clean admin interface

**Non-Admin Access:**
- Login as any other user (no admin role)
- Try to access `/admin/dashboard`
- ❌ Should be redirected to home page

### Features

- **Left Sidebar**: Collapsible navigation with admin sections
- **Top Header**: Search, notifications, admin profile dropdown
- **Role Protection**: Automatic redirect for unauthorized users
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Full theme support
- **Clean UI**: No user app components, pure admin experience</content>
<parameter name="filePath">c:\xampp\htdocs\social\ADMIN_PANEL_ONLY_PROMPT.md