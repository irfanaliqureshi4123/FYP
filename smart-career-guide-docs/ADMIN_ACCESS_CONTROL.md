# Admin Access Control System

## Overview

The admin panel now has role-based access control (RBAC) that restricts access to only users with the `admin` role. All `/admin/*` routes are protected and require proper authentication and authorization.

## Implementation

### 1. ProtectedRoute Component
**File:** `src/components/common/ProtectedRoute.jsx`

The `ProtectedRoute` component wraps admin routes and enforces access control:

```jsx
<ProtectedRoute>
  <AdminDashboardPage />
</ProtectedRoute>
```

**Logic:**
- Checks if user is authenticated (`isAuthenticated === true`)
- Verifies user has required role (`currentUser.role === 'admin'`)
- Redirects unauthorized users to home page (`/`)

### 2. Protected Routes
**File:** `src/App.jsx`

All admin routes are now wrapped with `ProtectedRoute`:

```jsx
// Admin routes
<Route path="admin/dashboard" element={
  <ProtectedRoute>
    <Suspense fallback={<PageLoader />}>
      <AdminDashboardPage />
    </Suspense>
  </ProtectedRoute>
} />

<Route path="admin/users" element={
  <ProtectedRoute>
    <Suspense fallback={<PageLoader />}>
      <AdminUserManagementPage />
    </Suspense>
  </ProtectedRoute>
} />

// ... and 6 more admin routes
```

**Protected Routes:**
- `/admin/dashboard` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/activity-logs` - Activity Logs
- `/admin/counsellor-applications` - Counsellor Applications
- `/admin/content-moderation` - Content Moderation
- `/admin/finance` - Financial Dashboard
- `/admin/bookings` - Bookings Management
- `/admin/settings` - Settings Management

### 3. User Role Assignment
**File:** `src/data/users.json`

Users can be assigned an `admin` role:

```json
{
    "id": 1,
    "username": "sarahchen",
    "name": "Sarah Chen",
    "role": "admin",
    // ... other fields
}
```

## Testing the Access Control

### Test Case 1: Admin User Access
**Current Setup:** Sarah Chen (username: `sarahchen`) has `role: "admin"`

1. Start the application (default user is Sarah Chen)
2. Navigate to http://localhost:5174/admin/dashboard
3. ✅ **Expected:** Admin dashboard loads successfully
4. You can access all admin routes

### Test Case 2: Non-Admin User Access

To test with a non-admin user:

1. Modify the AuthContext temporarily to use a different user:
   ```jsx
   const user = usersData[1]; // Use David Kim (non-admin user)
   ```

2. Navigate to http://localhost:5174/admin/dashboard
3. ❌ **Expected:** Redirected to home page (`/`)
4. Admin routes are inaccessible

### Test Case 3: Unauthenticated Access

To test unauthenticated access:

1. Clear localStorage: `localStorage.removeItem('user')`
2. Manually set `isAuthenticated` to `false` in AuthContext
3. Try to access any admin route
4. ❌ **Expected:** Redirected to home page

## How Role-Based Access Works

### Authentication Flow

```
User navigates to /admin/dashboard
    ↓
Route component renders ProtectedRoute
    ↓
ProtectedRoute checks:
  ├─ Is isAuthenticated === true?
  │  └─ NO → Redirect to / (home)
  │  └─ YES → Continue to next check
  ├─ Is currentUser.role === 'admin'?
  │  └─ NO → Redirect to / (home)
  │  └─ YES → Continue
    ↓
Admin page renders successfully
```

## Integration with AuthContext

The `ProtectedRoute` component uses the `useAuth()` hook to access:

```jsx
const { currentUser, isAuthenticated } = useAuth();
```

**Properties used:**
- `currentUser.role` - User's role (should be `"admin"` for admin access)
- `isAuthenticated` - Whether user is authenticated

## Future Enhancements

### 1. Multiple Roles
Support for different admin roles (e.g., `super-admin`, `moderator`):

```jsx
<ProtectedRoute requiredRole="super-admin">
  <AdminSettingsPage />
</ProtectedRoute>
```

### 2. Permission-Based Access
Fine-grained control over specific admin features:

```jsx
<ProtectedRoute requiredPermissions={['manage-users', 'view-reports']}>
  <AdminDashboardPage />
</ProtectedRoute>
```

### 3. Admin Activity Logging
Log all admin actions with timestamp, action type, and admin user:

```jsx
{
  id: 1,
  adminId: 1,
  action: 'user_banned',
  targetId: 42,
  timestamp: '2024-01-10T10:30:00Z',
  details: { reason: 'Policy violation' }
}
```

### 4. Session Management
Add session expiration and admin session timeout:
- Auto-logout after 30 minutes of inactivity
- Require re-authentication for sensitive admin actions

### 5. 2FA for Admin Panel
Two-factor authentication for enhanced security:
- SMS or email OTP on login
- TOTP via authenticator app

## Files Modified

1. **Created:** `src/components/common/ProtectedRoute.jsx`
   - New component for route protection

2. **Updated:** `src/App.jsx`
   - Imported `ProtectedRoute`
   - Wrapped all 8 admin routes with `<ProtectedRoute>`

3. **Updated:** `src/data/users.json`
   - Added `"role": "admin"` to Sarah Chen (user 1)

## Security Notes

- ⚠️ **Frontend only:** This is client-side access control. Always implement server-side authorization checks in production.
- 🔐 **Environment variables:** Store role information securely on the backend
- 🛡️ **Token-based auth:** Use JWT tokens with role claims in production
- 📝 **Audit logging:** Track all admin actions for compliance and security

## Testing Commands

```bash
# Clear localStorage and test unauthorized access
localStorage.clear()

# Check current user role
localStorage.getItem('user') // Look for "role" property

# Login as admin user
localStorage.setItem('user', JSON.stringify({
  id: 1,
  username: 'sarahchen',
  role: 'admin',
  // ... other properties
}))
```
