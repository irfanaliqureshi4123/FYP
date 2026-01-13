# Career Connect - Complete Project Features & Admin Panel Specification

## 📋 PART 1: COMPLETE PROJECT FEATURES

### A. Core Social Features
1. **Home Feed**
   - Post composer with character counter
   - Real-time feed display
   - Like, comment, and save post interactions
   - Follow/unfollow functionality
   - Post sharing and visibility controls

2. **User Profiles**
   - Profile customization with cover image
   - Bio and professional information
   - Skills and achievements display
   - Activity timeline
   - Profile views and followers/following lists
   - Profile editing with validation
   - Social connections visualization

3. **Explore**
   - Discovery page for careers, mentors, and skills
   - Tabbed interface for different content types
   - Search and filter functionality
   - Trending content display
   - Recommended content suggestions

### B. Career & Professional Development
1. **Career Guidance**
   - Career profiles and information
   - Career roadmaps and learning paths
   - Career tips and best practices
   - Career counselling with registered counsellors
   - Booking counselling sessions
   - Direct chat with counsellors
   - Session scheduling and reminders

2. **Counsellor System**
   - Counsellor registration with profile verification
   - Counsellor dashboard (stats, sessions, reviews)
   - Registration status tracking (Pending, Approved, Rejected)
   - Counsellor rating and reviews
   - Session history management
   - Earnings and payout tracking

3. **Mentor System**
   - Mentor profiles and availability
   - Mentor booking and scheduling
   - Mentor messaging interface
   - Mentor rating and feedback
   - Mentor performance metrics

4. **Skills Management**
   - Skill discovery and learning
   - Skill validation and endorsements
   - Skill-based recommendations
   - Skill assessment and progress tracking
   - Skill categorization by industry

5. **Educational Resources**
   - Resource library organization
   - Resource filtering by category
   - Resource recommendations
   - Learning path guidance
   - Resource ratings and reviews

6. **Scholarships**
   - Scholarship opportunities
   - Eligibility filtering
   - Application tracking
   - Deadline management
   - Scholarship matching based on profile

### C. Communication & Messaging
1. **Messages**
   - Real-time messaging interface
   - Conversation list management
   - Message search functionality
   - Read/unread status tracking
   - Typing indicators
   - File and media sharing

2. **Notifications**
   - Real-time notification center
   - Notification filtering by type
   - Mark as read functionality
   - Notification preferences
   - Different notification categories (follows, likes, comments, bookings, messages)

3. **Announcements**
   - Platform-wide announcements
   - Category-specific announcements
   - Push notification support
   - Email notifications

### D. Artificial Intelligence Features
1. **AI Chat**
   - Conversational AI assistant
   - Career guidance through AI
   - Question answering
   - Personalized recommendations
   - Conversation history management

2. **AI Tools**
   - Resume analyzer and optimizer
   - Interview preparation tools
   - Career path finder
   - Skills gap analyzer
   - Job recommendation engine

### E. Wellness & Personal Development
1. **Digital Wellbeing**
   - Screen time tracking
   - Wellness tips and resources
   - Mental health resources
   - Work-life balance guidance
   - Meditation and mindfulness exercises

2. **Trending Topics**
   - Trending career topics
   - Industry news and updates
   - Hot job markets
   - Skill trends
   - Expert discussions

3. **Who to Follow**
   - User recommendations
   - Influencer suggestions
   - Expert profiles
   - Personalized recommendations
   - Follower analytics

### F. User Settings & Privacy
1. **User Settings**
   - Profile customization
   - Privacy controls
   - Notification preferences
   - Account security
   - Theme selection (Dark/Light mode)
   - Language preferences
   - Data export options

2. **Legal & Compliance**
   - Privacy Policy
   - Terms of Service
   - Cookie management
   - GDPR compliance
   - Data privacy controls

3. **Saved Content**
   - Bookmarked posts
   - Saved career resources
   - Saved job listings
   - Collection management
   - Export saved content

---

## 🛠️ PART 2: DETAILED ADMIN PANEL SPECIFICATION

### OVERVIEW
Build a comprehensive, professional admin panel for Career Connect platform with full management capabilities across users, content, counsellors, bookings, financial operations, and system analytics.

### I. ADMIN DASHBOARD (/admin/dashboard)

**Components Required:**
1. **Dashboard Header**
   - Admin branding "Career Connect Admin"
   - Search functionality
   - Admin profile dropdown
   - Notification bell (platform alerts)
   - Help and support links

2. **Key Statistics Cards (4 columns)**
   - Total Users (with growth indicator)
   - Total Counsellors (approved vs pending)
   - Total Bookings (this month vs last month)
   - Platform Revenue (today's, this month's, annual)
   - Show comparison with previous period (up/down arrows)

3. **Charts & Visualizations**
   - User Growth Chart (line chart: 12 months)
   - Counsellor Registrations (bar chart: pending, approved, rejected)
   - Bookings Trend (line chart: weekly data)
   - Revenue Distribution (pie chart: counselling, subscriptions, ads)

4. **Quick Actions Panel**
   - Approve Pending Counsellors (button + count badge)
   - Manage Reported Content (button + count badge)
   - Review Pending Bookings (button + count badge)
   - System Alerts (expand button)

5. **Recent Activity Feed**
   - Latest user registrations
   - New counsellor applications
   - Recent bookings
   - Platform announcements
   - Timestamp and user details

6. **Admin Navigation**
   - Sidebar with all major sections
   - Collapsible on mobile devices
   - Active page highlighting
   - Icons for each section
   - Search bar within navigation

---

### II. USER MANAGEMENT (/admin/users)

**Components Required:**

1. **User List Table**
   - Columns: Profile Pic, Name, Email, Join Date, Role, Status, Actions
   - Pagination (10, 25, 50 users per page)
   - Sorting (by name, join date, status)
   - Search bar (by name, email, username)
   - Filter buttons:
     * All Users / Active / Inactive / Suspended / Verified
     * User Type: Regular / Counsellor / Mentor / Admin
   - Bulk actions: Select all, delete multiple, change status, export

2. **User Profile Modal**
   - User avatar and cover image
   - Basic info: Name, Email, Username, Phone, Location
   - Account status: Active/Inactive/Suspended
   - Join date and last login
   - Follower/Following count
   - Verification status (Email verified, Phone verified, ID verified)
   - User stats: Posts, likes, connections
   - Account activity timeline

3. **Edit User Modal**
   - Edit name, email, username
   - Change password
   - Update role (Regular User / Counsellor / Mentor / Admin)
   - Change verification status
   - Suspend/activate account
   - Add/remove special badges
   - Save changes confirmation

4. **User Search & Advanced Filters**
   - Search by name, email, username
   - Filter by registration date range
   - Filter by user role
   - Filter by verification status
   - Filter by account status
   - Filter by membership level (Premium/Free)
   - Clear filters button

5. **User Actions**
   - View profile details
   - Edit user information
   - Send message/announcement
   - Suspend user account
   - Delete user account (with confirmation)
   - Reset password
   - Reset 2FA settings
   - View user activity logs

---

### III. CONTENT MODERATION (/admin/content)

**Components Required:**

1. **Content Moderation Dashboard**
   - Statistics: Total posts, flagged posts, comments, reported content
   - Pending reports count
   - Content health score

2. **Posts Moderation**
   - Table with: Post preview, Author, Created date, Reports, Status
   - View full post with comments
   - Approve/Reject buttons
   - Content categories for filtering
   - Search by post content or author
   - Mass approval/rejection
   - Add warning to user
   - Delete post permanently
   - Archive post (hide from feed without deleting)
   - View post analytics (likes, shares, views)

3. **Comments Moderation**
   - Comment moderation queue
   - Show comment with context (original post)
   - Flag inappropriate comments
   - Delete comments
   - Hide comments (collapse in feed)
   - Warn user for spam/abuse
   - Ban user from commenting on specific posts

4. **Report Management**
   - Report queue with different types:
     * Inappropriate content
     * Spam
     * Harassment/Hate speech
     * Misinformation
     * Copyright infringement
   - Report details: Reported by, date, reason, content
   - View reported content
   - Take action: Approve, reject, delete, warn user
   - Bulk report assignment to moderators
   - Report resolution status tracking

5. **User Warnings System**
   - Warn user (show modal with warning message)
   - Warning levels: Yellow (1st), Orange (2nd), Red (3rd)
   - Strike system (3 strikes and suspension)
   - Warning messages visible to user
   - Warning history for each user
   - Appeal functionality for users

6. **Content Flagging**
   - Flagged content queue
   - Reason for flag
   - Flag resolution options
   - Review flagged content decision history
   - Bulk flag management

---

### IV. COUNSELLOR MANAGEMENT (Enhanced) (/admin/counsellors)

**Components Required:**

1. **Counsellor Applications**
   - Pending applications list with filters
   - Application details modal (profile, credentials, certifications)
   - Approve/Reject buttons
   - Set commission rates (%)
   - Set availability slots
   - Add notes/comments
   - Request additional documents
   - View applicant avatar and credentials

2. **Counsellor Directory**
   - Active counsellors list (table)
   - Columns: Name, Specialty, Rating, Sessions, Earnings, Status
   - Search by name, specialty, qualification
   - Filter by rating, earnings tier, availability
   - Sort by rating, sessions, earnings
   - Counsellor profile cards with details

3. **Counsellor Performance Analytics**
   - Session count (total, this month)
   - Average rating
   - Revenue generated (total, this month)
   - Completion rate %
   - Customer satisfaction score
   - Cancellation rate
   - Response time average
   - Review distribution (5-star ratings breakdown)

4. **Earnings & Payouts**
   - Earnings dashboard per counsellor
   - Transaction history table
   - Pending payouts list
   - Completed payouts list
   - Earnings chart (monthly earnings trend)
   - Set/adjust commission rates
   - Process payouts
   - Download earnings reports
   - Set minimum payout threshold
   - Payment method management (bank details)

5. **Counsellor Settings**
   - Set hourly rates per counsellor
   - Configure commission percentage
   - Set availability schedule
   - Configure cancellation policy
   - Set response time requirements
   - Configure session types offered
   - Category assignments
   - Feature counsellor on homepage

6. **Suspension & Compliance**
   - Suspend counsellor (with reason)
   - Reactivate suspended counsellor
   - Compliance checklist for counsellors
   - Compliance status indicator
   - Warning history
   - Account status timeline
   - Termination process

---

### V. BOOKINGS & SESSIONS MANAGEMENT (/admin/bookings)

**Components Required:**

1. **Bookings List & Management**
   - Bookings table with filters:
     * Columns: Booking ID, User, Counsellor, Date, Time, Status, Amount
     * Status filters: Upcoming, In Progress, Completed, Cancelled, Disputed
     * Date range filter
     * Search by booking ID, user name, counsellor name
   - Pagination and sorting
   - Bulk actions (bulk status change, bulk export)

2. **Booking Details Modal**
   - Booking ID and reference number
   - User details (name, contact, profile)
   - Counsellor details (name, specialty, rating)
   - Session details (date, time, duration, type)
   - Amount and payment status
   - Session notes and feedback
   - Attendance status (attended/no-show/cancelled)
   - Recording/notes from session
   - Cancellation details if applicable

3. **Session Management**
   - Upcoming sessions calendar view
   - Session details and reminders
   - Mark attendance (Present/Absent)
   - Record session notes
   - Rate the session
   - Generate session report
   - Session history for all users
   - No-show management and penalties

4. **Dispute Resolution**
   - Disputes list with status filters
   - Dispute details modal showing:
     * Complaint details
     * User complaint
     * Counsellor response
     * Supporting documents
   - Resolution options: Refund, Credit, Cancel session
   - Admin notes/comments
   - Dispute history
   - Appeal handling

5. **Cancellation Management**
   - Cancellation policies display
   - Cancellations list with reasons
   - Refund processing
   - Cancellation fees handling
   - Automatic reminders for upcoming sessions
   - No-show handling and penalties

6. **Session Scheduling**
   - Bulk schedule sessions
   - Session calendar view
   - Reschedule sessions
   - Auto-match users with counsellors
   - Send session reminders
   - Session invitations and confirmations

---

### VI. FINANCIAL MANAGEMENT (/admin/finance)

**Components Required:**

1. **Finance Dashboard**
   - Total revenue (today, month, year)
   - Total transactions count
   - Total payouts processed
   - Pending payouts amount
   - Revenue growth chart
   - Top revenue sources pie chart
   - Monthly revenue trend

2. **Revenue Management**
   - Revenue by source (Counselling, Subscriptions, Ads, Donations)
   - Revenue by counsellor
   - Commission tracking
   - Tax calculations
   - Invoice generation
   - Revenue reports (daily, weekly, monthly, yearly)

3. **Transactions List**
   - Table: Transaction ID, User, Amount, Type, Date, Status
   - Filters: Transaction type, date range, status
   - View transaction details
   - Refund functionality with reason
   - Export transactions (CSV/PDF)
   - Search by transaction ID, user

4. **Payout Management**
   - Pending payouts queue
   - Approved payouts list
   - Completed payouts list
   - Payout status tracking
   - Set payout schedule (weekly, bi-weekly, monthly)
   - Manual payout processing
   - Bulk payout actions
   - Payment gateway integration logs
   - Failed payout handling

5. **Payment Methods**
   - Configure accepted payment methods
   - Payment gateway settings
   - Tax configuration per region
   - Currency management
   - Currency conversion rates
   - Payment processing fees

6. **Financial Reports**
   - Custom date range reports
   - Revenue summary
   - Expense summary
   - Profit/Loss statement
   - Balance sheet
   - Cash flow statement
   - Tax reports
   - Export as PDF/Excel

7. **Subscription Management**
   - Subscription plans display
   - Active subscriptions count
   - Subscription revenue
   - Churn rate tracking
   - Free trial usage
   - Upgrade/downgrade tracking

---

### VII. NOTIFICATIONS & MESSAGING (/admin/messaging)

**Components Required:**

1. **Announcement Management**
   - Create announcement form:
     * Title, description, image
     * Target audience (All users, Counsellors, New users, etc.)
     * Schedule publish date/time
     * Priority level (Low, Medium, High)
   - Scheduled announcements list
   - Published announcements list
   - Edit/delete announcements
   - View announcement analytics (views, clicks, engagement)
   - A/B testing for announcements

2. **Email Campaign Manager**
   - Email template builder (WYSIWYG editor)
   - Recipient segmentation:
     * All users
     * By user type (Counsellor, Mentor, etc.)
     * By activity level
     * By registration date
     * Custom segments
   - Email scheduling
   - Send test email
   - Campaign performance metrics (open rate, click rate, bounces)
   - Email history log
   - Unsubscribe management

3. **Push Notifications**
   - Create push notification
   - Target users
   - Schedule delivery
   - Push notification history
   - Delivery status tracking
   - User engagement metrics

4. **Notification Center**
   - Recent notifications dashboard
   - Notification history (all notifications sent)
   - User notification preferences viewing
   - Notification templates
   - Bulk notification sending
   - Notification scheduling

5. **System Messages**
   - Admin to user messaging
   - Message templates
   - Message read status
   - Archive messages
   - Search message history

---

### VIII. SYSTEM SETTINGS (/admin/settings)

**Components Required:**

1. **General Settings**
   - Platform name
   - Platform description
   - Logo and favicon upload
   - Support email
   - Support phone
   - Support website
   - Time zone configuration
   - Language/localization settings
   - Currency configuration

2. **Commission & Pricing**
   - Base commission percentage
   - Commission tier settings (by counsellor earnings)
   - Transaction fees
   - Minimum payout threshold
   - Payment processing fees
   - Subscription pricing
   - Feature pricing

3. **Category Management**
   - Career categories (create, edit, delete)
   - Category hierarchy
   - Featured categories
   - Category images
   - Category descriptions
   - Associated skills per category

4. **Feature Flags & Toggles**
   - Enable/disable features:
     * AI Chat
     * Counselling
     * Mentorship
     * Bookings
     * Messaging
     * Wellbeing tools
     * Resources
   - Feature rollout scheduling
   - Beta feature access

5. **Integration Settings**
   - Payment gateway keys (Stripe, PayPal, etc.)
   - Email service configuration (SMTP)
   - SMS gateway setup
   - Third-party API integrations
   - Webhook configuration
   - Test integration functionality

6. **Compliance & Legal**
   - Privacy Policy editor
   - Terms of Service editor
   - Cookie policy editor
   - GDPR settings
   - Data retention policies
   - Export data template
   - Right to be forgotten process

7. **Verification Settings**
   - Email verification requirements
   - Phone verification requirements
   - ID verification providers
   - Background check requirements
   - Document verification process

8. **User Role Permissions**
   - Admin role access levels
   - Create custom roles
   - Assign permissions to roles
   - View role hierarchy
   - Audit admin actions per role

---

### IX. ANALYTICS & REPORTS (/admin/analytics)

**Components Required:**

1. **Analytics Dashboard**
   - Key metrics display:
     * Monthly active users (MAU)
     * Daily active users (DAU)
     * User retention rate
     * Churn rate
     * Average session duration
   - Funnel analysis (registration → first booking)
   - User acquisition sources
   - Device analytics (Desktop, Mobile, Tablet)
   - Browser analytics
   - Geographic analytics (countries, states)

2. **User Analytics**
   - User growth chart
   - User segmentation:
     * By role (Counsellor, Mentor, Regular)
     * By activity level
     * By registration period
     * By location
   - User behavior metrics
   - Signup sources
   - User journey analysis
   - Cohort analysis

3. **Engagement Analytics**
   - Post engagement metrics (likes, shares, comments)
   - Message engagement
   - Notification click-through rate
   - Feature usage analytics
   - Content performance
   - User interaction patterns

4. **Content Performance**
   - Top performing posts
   - Content by category
   - Trending skills
   - Popular careers
   - Resource popularity
   - Content reach and impressions

5. **Counsellor Analytics**
   - Counsellor performance metrics
   - Session completion rate
   - Average rating trend
   - Booking conversion rate
   - Session types popularity
   - Counsellor utilization rate
   - Earnings trend per counsellor

6. **Custom Reports**
   - Report builder with filters:
     * Date range
     * User segments
     * Categories
     * Metrics to include
   - Save custom reports
   - Schedule automated reports
   - Email reports to stakeholders
   - Export reports (PDF, Excel, CSV)
   - Report templates

7. **Real-time Monitoring**
   - Real-time user activity
   - Active users count
   - Current bookings
   - Live notifications
   - System health status
   - Server performance metrics

---

### X. SECURITY & ACTIVITY LOGS (/admin/logs)

**Components Required:**

1. **Activity Logs**
   - Log all admin actions:
     * User management actions
     * Content moderation actions
     * Settings changes
     * Payout processing
     * Report actions
   - Log details:
     * Admin who performed action
     * Timestamp
     * Action type
     * Target (affected user/content)
     * Changes made (before/after)
   - Search by admin, action type, date
   - Filter by action severity (Critical, High, Medium, Low)
   - Export activity logs
   - Log retention settings

2. **Login History**
   - List all admin login attempts (successful and failed)
   - Columns: Admin name, IP address, Timestamp, Device, Status
   - Map of login locations
   - Suspicious login alerts
   - Failed login attempt tracking
   - Session management (view active sessions, log out sessions)
   - IP whitelist/blacklist

3. **System Logs**
   - Error logs and exceptions
   - API logs and requests
   - Database operation logs
   - File operation logs
   - System events
   - Performance logs
   - Search and filter system logs
   - Export logs for analysis

4. **Audit Trail**
   - Complete audit trail of sensitive operations
   - Data modification tracking
   - User account changes history
   - Payment processing audit trail
   - Compliance audit reports
   - Immutable log storage

5. **Security Alerts**
   - Failed login attempts alert
   - Unusual activity alerts
   - Data access alerts
   - Configuration change alerts
   - Alert notification (email, in-app)
   - Alert history
   - Alert configuration

6. **Two-Factor Authentication (2FA)**
   - 2FA enforcement for admin accounts
   - 2FA setup/reset for admins
   - Backup codes management
   - Authenticator app integration
   - SMS verification for critical actions
   - View 2FA devices

7. **Data Privacy & Compliance**
   - Data access logs
   - GDPR compliance tools
   - Data deletion requests tracking
   - Privacy violation reporting
   - Compliance checklist
   - Data backup logs
   - Data encryption status

---

## 📐 TECHNICAL REQUIREMENTS

### Architecture & Structure
```
src/pages/admin/
├── AdminLayout.jsx
├── AdminDashboard.jsx
├── users/
│   ├── UserManagement.jsx
│   ├── UserTable.jsx
│   ├── UserModal.jsx
│   └── EditUserModal.jsx
├── content/
│   ├── ContentModeration.jsx
│   ├── PostsModeration.jsx
│   ├── CommentsModeration.jsx
│   ├── ReportManagement.jsx
│   └── UserWarnings.jsx
├── counsellors/
│   ├── CounsellorManagement.jsx
│   ├── CounsellorApplications.jsx
│   ├── CounsellorDirectory.jsx
│   ├── EarningsManagement.jsx
│   └── CounsellorAnalytics.jsx
├── bookings/
│   ├── BookingsManagement.jsx
│   ├── BookingsList.jsx
│   ├── BookingDetails.jsx
│   ├── DisputeResolution.jsx
│   └── SessionManagement.jsx
├── finance/
│   ├── FinanceDashboard.jsx
│   ├── TransactionsList.jsx
│   ├── PayoutManagement.jsx
│   ├── FinancialReports.jsx
│   └── RevenueAnalytics.jsx
├── messaging/
│   ├── AnnouncementManager.jsx
│   ├── EmailCampaigns.jsx
│   ├── PushNotifications.jsx
│   └── SystemMessages.jsx
├── settings/
│   ├── GeneralSettings.jsx
│   ├── CommissionSettings.jsx
│   ├── FeatureFlags.jsx
│   ├── CategoryManagement.jsx
│   └── IntegrationSettings.jsx
├── analytics/
│   ├── AnalyticsDashboard.jsx
│   ├── UserAnalytics.jsx
│   ├── ContentAnalytics.jsx
│   ├── CounsellorAnalytics.jsx
│   └── CustomReports.jsx
└── logs/
    ├── ActivityLogs.jsx
    ├── LoginHistory.jsx
    ├── SystemLogs.jsx
    ├── SecurityAlerts.jsx
    └── AuditTrail.jsx

src/components/admin/
├── AdminSidebar.jsx
├── AdminHeader.jsx
├── AdminTable.jsx
├── AdminModal.jsx
├── AdminChart.jsx
├── AdminFilter.jsx
├── StatsCard.jsx
├── ConfirmDialog.jsx
├── ExportButton.jsx
└── AdminBreadcrumb.jsx
```

### Data Requirements
- Extend AppContext with:
  * Admin users and roles
  * Content moderation queue
  * Reports and disputes
  * Financial transactions
  * Admin activity logs
  * System settings

- localStorage for:
  * Admin preferences
  * Saved filters
  * Report templates
  * Custom dashboards

### Responsive Design
- Mobile-first approach
- Sidebar collapses on mobile
- Tables convert to cards on mobile
- Touch-friendly buttons and inputs
- Optimized for tablets
- Desktop full-width layouts

### Dark/Light Theme
- Consistent with existing theme system
- Dark backgrounds for admin UI
- Light text on dark backgrounds
- Theme toggle persistent

### Performance Optimization
- Lazy load admin pages
- Pagination for large datasets
- Virtual scrolling for tables
- Memoization for components
- Code splitting for admin bundle
- Efficient re-renders

### Security Features
- Admin authentication check
- Role-based access control (RBAC)
- Action confirmation dialogs
- Audit logging for all actions
- Data encryption for sensitive info
- Rate limiting for API calls

---

## 🎯 IMPLEMENTATION PRIORITY

**Phase 1 (Critical):**
- AdminLayout with sidebar navigation
- AdminDashboard with key statistics
- User Management (list, view, edit)
- Counsellor Applications (approve/reject)
- Activity Logs

**Phase 2 (High):**
- Content Moderation (posts, comments, reports)
- Financial Dashboard (revenue, transactions)
- Bookings Management
- Settings Management

**Phase 3 (Medium):**
- Analytics Dashboard
- Email Campaigns
- Counsellor Analytics
- Custom Reports

**Phase 4 (Low):**
- Advanced Analytics
- Security & Compliance features
- Integration settings
- Advanced reporting features

---

## ✅ SUCCESS CRITERIA

1. All admin pages responsive and functional
2. Data updates reflected in real-time
3. All filters and searches working
4. Export functionality operational
5. Dark/light theme consistent
6. Performance optimized (< 2s load time)
7. Security measures implemented
8. User feedback (toast notifications) for all actions
9. Breadcrumb navigation on all pages
10. Mobile-friendly admin interface
11. Audit trail for all critical actions
12. Admin can manage all platform features
13. Analytics showing accurate data
14. Reports exportable in multiple formats

---

**Note:** This admin panel will be the command center for managing the entire Career Connect platform. Implementation should follow the existing design patterns, use established component libraries, and maintain consistency with the main application UI/UX.
