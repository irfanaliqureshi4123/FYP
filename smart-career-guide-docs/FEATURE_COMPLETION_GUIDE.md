# Career Connect - Frontend Feature Completion Guide

Complete frontend implementation guide with mock data for every feature in the Career Connect platform.

---

## 1. HOME FEED PAGE

### Overview
The main landing page showing a feed of posts from the community with post composer, interactions, and trending sidebar.

### Components Required
- **PostComposer**: Create new posts
- **PostCard**: Display individual posts
- **Feed Container**: Scrollable list of posts
- **RightSidebar**: Trending topics and recommendations
- **Sidebar**: Left navigation

### Detailed Implementation Prompt

**Create a fully functional Home Feed that includes:**

1. **Post Composer Section**
   - Rich text input area with placeholder "What's on your mind?"
   - User avatar on the left
   - Character counter (max 280 characters)
   - Action buttons: Image upload, Poll, Hashtag
   - Post button with hover state and disabled state when empty
   - Mock data: Use current user from auth context

2. **Feed Display**
   - Infinite scroll or pagination (show 5 posts initially, load more on scroll)
   - Each post displays:
     - User avatar (clickable to profile)
     - User name and title (verified badge if applicable)
     - Timestamp (e.g., "2 hours ago")
     - Post content with hashtags
     - Post image if available
     - Poll widget if post contains a poll
     - Interaction stats: Likes, Comments, Shares, Saves
     - Action buttons: Like, Comment, Share, Save (with active states)
   - Post types supported:
     - Text only posts
     - Posts with images
     - Posts with polls
     - Posts with hashtags

3. **Interactive Features**
   - Like button: Toggle like state, update count (heart icon fills on like)
   - Save button: Toggle save state (bookmark icon)
   - Comment interaction: Show comment count, hover to preview (no full comment section yet)
   - Share button: Copy post link functionality

4. **Right Sidebar Widgets**
   - Search bar at top
   - "Trending Topics" section (5-7 trending hashtags with post counts)
   - "Suggested People to Follow" (3-5 profiles with follow button)
   - "Career Tips" section (rotating tips)

5. **Styling & Interactions**
   - Smooth hover effects on posts and buttons
   - Loading skeleton while posts load
   - Empty state if no posts
   - Theme aware (light/dark mode)
   - Responsive: Stack vertically on mobile

### Mock Data Used
- `users.json`: Current user for post composer
- `posts.json`: Feed posts (use first 5-7 posts)
- `notifications.json`: For trending topics
- Additional mock: Trending hashtags, follow suggestions

### File Locations
- Component: `src/pages/Home.jsx`
- Components: `src/components/posts/PostComposer.jsx`, `src/components/posts/PostCard.jsx`
- Layout: `src/components/layout/MainLayout.jsx`

---

## 2. EXPLORE PAGE

### Overview
Discovery page where users can explore careers, skills, and mentors. Features tabbed interface and search/filter capabilities.

### Components Required
- **Tab Navigation**: Switch between Careers, Skills, Mentors
- **Career Card**: Displays career information
- **Skill Card**: Displays skill with difficulty level
- **Mentor Card**: Displays mentor profile
- **Search & Filter**: Filter by category, salary, experience level

### Detailed Implementation Prompt

**Build a comprehensive Explore page with three tabs:**

1. **Careers Tab**
   - Display all careers from `careers.json` in a grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Each career card shows:
     - Career title
     - Category badge (colored)
     - Description (2-3 lines, truncated)
     - Salary range
     - Experience level (Entry/Mid/Senior badge)
     - Key skills (3-4 displayed as small badges)
     - Job growth percentage (with color coding: green for high, yellow for medium, red for low)
     - Career image
     - "Learn More" button
   - Filter options on the left:
     - Category dropdown (Tech, Design, Business, etc.)
     - Salary range slider (0-200k)
     - Experience level checkboxes
   - Search box to filter by career title
   - Sort options: Popularity, Growth Rate, Salary

2. **Skills Tab**
   - Display all skills from `skills.json` in a grid
   - Each skill card shows:
     - Skill icon or initial letter in colored circle
     - Skill name
     - Difficulty level (Beginner, Intermediate, Advanced) with color coding
     - Number of professionals with this skill
     - Popularity trend (↑ or ↓)
     - "Learn" button linking to resources
   - Filter options:
     - Difficulty level checkboxes
     - Category dropdown
     - Trending only toggle
   - Search and sort capabilities

3. **Mentors Tab**
   - Display available mentors from users with mentor status
   - Each mentor card shows:
     - Avatar and online indicator
     - Full name and title
     - Expertise (2-3 skills)
     - Experience years
     - Hourly rate or "Available for free"
     - Rating (stars) and review count
     - Brief bio
     - "Connect" button
   - Filter options:
     - Expertise area
     - Experience level
     - Available time
     - Price range
   - Search by mentor name or expertise

4. **Shared Features**
   - Tab switching with smooth transitions
   - Loading states for each tab
   - Empty states with helpful messages
   - Responsive grid layouts
   - Theme aware styling

### Mock Data Used
- `careers.json`: All career information
- `skills.json`: All skills data
- `users.json`: Mentor profiles (filter users with mentor=true)

### File Locations
- Page: `src/pages/Explore.jsx`
- Components: Career cards, skill cards, mentor cards in appropriate directories

---

## 3. USER PROFILE PAGE

### Overview
Detailed user profile showing bio, skills, achievements, posts, and activity.

### Components Required
- **Profile Header**: Cover image, avatar, name, bio
- **Stats Bar**: Followers, Following, Posts count
- **Tabs**: About, Posts, Activity
- **Skill Section**: User skills
- **Achievement Badges**: Accomplishments

### Detailed Implementation Prompt

**Create a complete user profile page with:**

1. **Profile Header**
   - Cover image (full width, 300px height)
   - User avatar (large, positioned overlapping cover)
   - Edit profile button (if viewing own profile)
   - Name and title
   - Verified badge if applicable
   - Location and website link
   - Bio/description (with line breaks preserved)
   - Follow/Unfollow button (if not own profile)

2. **Stats Section**
   - Followers count (clickable to show followers list modal)
   - Following count (clickable)
   - Posts count
   - Horizontal divider between stats

3. **Tabs Navigation**
   - About tab
   - Posts tab
   - Activity tab
   - Achievements tab

4. **About Tab Content**
   - Career Goals section (bulleted list)
   - Skills section:
     - Display skills as badges with proficiency levels
     - Skill endorsement count
     - Add skill button (if own profile)
   - Interests section (tags)
   - Education section
   - Experience timeline (if available)

5. **Posts Tab**
   - Display all user's posts using PostCard component
   - Empty state if no posts
   - Infinite scroll or pagination

6. **Activity Tab**
   - Timeline of user activities:
     - Liked a post (with post title)
     - Started following someone
     - Achieved a badge
     - Posted content
     - Use timestamps (relative time, e.g., "2 weeks ago")

7. **Achievements Tab**
   - Grid of achievement badges
   - Each badge shows:
     - Icon/emoji
     - Title
     - Description
     - Date earned
   - Animate on hover

8. **Interactive Features**
   - Follow/Unfollow toggle
   - Endorse skill button on skills
   - Share profile functionality
   - Report user option

### Mock Data Used
- `users.json`: Single user profile data (from URL param)
- `posts.json`: User's posts
- User achievements from users.json
- User skills and interests

### File Locations
- Page: `src/pages/Profile.jsx`
- Route: `/profile/:username`

### Dynamic Routing
```javascript
// Access username from URL params
const { username } = useParams();
// Find user in mock data
const user = users.find(u => u.username === username);
```

---

## 4. MESSAGES PAGE

### Overview
Real-time messaging interface with conversation list and chat window.

### Components Required
- **Conversation List**: List of active chats
- **Chat Window**: Message display and input
- **Message Bubble**: Individual message with sender info

### Detailed Implementation Prompt

**Build a complete messaging system with:**

1. **Conversation List (Left Panel)**
   - Search conversations input box
   - List of conversations sorted by latest message
   - Each conversation item shows:
     - User avatar with online indicator (green dot)
     - User name and title
     - Last message preview (truncated)
     - Timestamp of last message
     - Unread indicator (badge with count)
     - Active/selected state highlighting
   - Click to open chat with that user

2. **Chat Window (Main Panel)**
   - Header with:
     - User avatar and online status
     - User name and title
     - Action buttons: Call, Video, Info, Options menu
   - Message display area:
     - Group messages by sender
     - Message bubbles with:
       - Sender avatar (only show on first message in group)
       - Message content
       - Timestamp (show on hover)
       - Read receipt indicator (✓ or ✓✓)
     - Messages align left for others, right for current user
     - Different styling for sent vs received
     - Smooth scroll to latest message
   - Message input area:
     - Text input field with placeholder "Type a message..."
     - Emoji button
     - Image upload button
     - Send button
     - Typing indicator when receiving

3. **Interactive Features**
   - Click conversation to view chat
   - Mark as read when opening conversation
   - Send message functionality (updates UI optimistically)
   - Typing indicator when user types
   - Auto-scroll to latest message
   - Show "No messages yet" if conversation is empty
   - Start new conversation option

4. **Empty State**
   - If no conversation selected: "Select a conversation to start messaging"
   - If no conversations: "No conversations yet. Start a new one!"

5. **Responsive Design**
   - Desktop: Side-by-side layout
   - Tablet: Conversation list hides on chat open
   - Mobile: Full-width chat with back button to conversations

### Mock Data Used
- `messages.json`: All conversations and messages
- `users.json`: User profiles for conversations

### File Locations
- Page: `src/pages/Messages.jsx`
- Components: `src/components/messages/ConversationList.jsx`, `src/components/messages/ChatWindow.jsx`

---

## 5. NOTIFICATIONS PAGE

### Overview
Centralized notification center with filtering and mark-as-read functionality.

### Components Required
- **Notification Item**: Individual notification display
- **Notification Filter**: Filter by type
- **Notification List**: Scrollable list of notifications

### Detailed Implementation Prompt

**Create a comprehensive notification center with:**

1. **Header Section**
   - "Notifications" title
   - Mark all as read button
   - Settings/preferences icon

2. **Filter & Sort Options**
   - Filter buttons (All, Likes, Comments, Follows, Mentions, Posts)
   - Sort dropdown (Newest, Oldest, Unread first)
   - Total unread count display

3. **Notification List**
   - Display notifications sorted by date (newest first)
   - Each notification item shows:
     - Sender avatar
     - Notification type icon (heart, comment, follow, bell, etc.)
     - Notification message
     - Related content preview (if applicable)
     - Timestamp (relative, e.g., "5 minutes ago")
     - Unread indicator (dot or slight background highlight)
   - Group by type or date (optional)

4. **Notification Types**
   - **Like notifications**: "John liked your post"
   - **Comment notifications**: "Sarah commented on your post"
   - **Follow notifications**: "Alex started following you"
   - **Mention notifications**: "You were mentioned by David"
   - **Career update notifications**: "New job opening matches your profile"
   - **Message notifications**: "New message from Emma"

5. **Interactive Features**
   - Click notification to:
     - View the related post/profile
     - Mark as read (or toggle read status)
   - Hover to show action buttons: Read/Unread, Delete
   - Mark individual notification as read/unread
   - Delete notification
   - Bulk actions (mark all as read)

6. **Visual States**
   - Unread notifications: Slightly different background color
   - Read notifications: Lighter, slightly faded
   - Hover state: Subtle background highlight
   - Animation: Smooth transitions, slide-in for new notifications

7. **Empty State**
   - "You're all caught up! No new notifications." (if no unread)
   - "No notifications yet" (if completely empty)

### Mock Data Used
- `notifications.json`: All notifications
- `users.json`: Sender information
- `posts.json`: For post-related notifications

### File Locations
- Page: `src/pages/Notifications.jsx`
- Components: `src/components/notifications/NotificationItem.jsx`

---

## 6. SAVED POSTS PAGE

### Overview
Bookmarked posts that users have saved for later reference.

### Components Required
- **Saved Post List**: Display saved posts
- **Filter & Sort**: Organize saved posts
- **PostCard**: Reuse from home feed

### Detailed Implementation Prompt

**Build a saved posts management page with:**

1. **Header Section**
   - "Saved Posts" title with save count
   - Clear all saved posts button (with confirmation)

2. **Organization Features**
   - Sort options:
     - Newest saved first
     - Oldest saved first
     - Most liked
     - Most commented
   - Filter by:
     - Date range (Last week, Last month, All time)
     - Post type (Text, Images, Polls)
     - Author/source

3. **Post Display**
   - Grid or list view toggle
   - Display saved posts using PostCard component
   - Add save date indicator (e.g., "Saved on Dec 25, 2024")
   - Show how many times saved (optional)
   - Remove from saved button (easily accessible)

4. **Interactive Features**
   - Click post to view full details
   - Remove from saved (with undo option or confirmation)
   - Share saved post
   - Export saved posts (optional)
   - Create collections (optional advanced feature)

5. **Empty State**
   - "No saved posts yet. Start saving posts to view them here!" with illustration

6. **Responsive Layout**
   - Desktop: 2 column grid
   - Tablet: 1 column
   - Mobile: Full width, stacked

### Mock Data Used
- Posts marked as saved from `posts.json`
- `users.json`: For post author info

### File Locations
- Page: `src/pages/Saved.jsx`
- Components: Reuse PostCard component

---

## 7. SETTINGS PAGE

### Overview
User preferences for profile, account, notifications, and privacy settings.

### Components Required
- **Settings Tabs**: Navigation between settings sections
- **Setting Items**: Toggle switches, dropdowns, text inputs
- **Color Picker**: Theme customization

### Detailed Implementation Prompt

**Create a comprehensive settings page with tabs:**

1. **Profile Settings Tab**
   - Editable fields:
     - Full name
     - Username (unique validation)
     - Email address
     - Phone number (optional)
     - Location
     - Website
     - Bio/About (textarea)
     - Avatar upload with preview
     - Cover image upload with preview
   - Save changes button
   - Success/error messages

2. **Account Settings Tab**
   - Password change section:
     - Current password input
     - New password input with strength indicator
     - Confirm password input
     - Change password button
   - Two-factor authentication (toggle and setup)
   - Active sessions list
   - Login history (last 5 logins with device info)
   - Sign out from all devices button
   - Delete account button (with warning modal)

3. **Notification Settings Tab**
   - Toggle switches for:
     - Email notifications (with frequency: Instantly, Daily, Weekly, Never)
     - Push notifications
     - In-app notifications
   - Notification type preferences:
     - Likes
     - Comments
     - Follows
     - Messages
     - Career recommendations
   - Quiet hours setting (mute notifications between X and Y)
   - Notification sound toggle

4. **Privacy Settings Tab**
   - Profile visibility:
     - Public
     - Private (only followers)
     - Friends only
   - Who can message you:
     - Everyone
     - Following only
     - Verified users only
   - Show activity status toggle
   - Block/unblock users section
   - Data and privacy info

5. **Theme & Display Tab**
   - Theme selector:
     - Light mode
     - Dark mode
     - System default
   - Language selector (if supporting multiple languages)
   - Display density (Compact, Comfortable, Spacious)
   - Font size selector
   - Color scheme customization (primary and accent colors)

6. **General Settings Tab**
   - Platform announcements opt-in
   - Marketing emails toggle
   - Data usage preferences
   - Accessibility options:
     - High contrast mode
     - Reduce animations
     - Screen reader optimization

### Interactive Features
- Save button at bottom (appears only when changes made)
- Unsaved changes warning on page leave
- Toast notifications for successful saves
- Loading states during save
- Validation feedback (inline error messages)
- Cancel button to revert changes

### Mock Data Used
- Current user data from `users.json`
- Settings preferences (stored in context or localStorage)

### File Locations
- Page: `src/pages/Settings.jsx`
- Components: `src/components/settings/SettingsTabs.jsx`

---

## 8. COMMON UI COMPONENTS (Already Built - Verify/Enhance)

### Button Component
```
File: src/components/common/Button.jsx
Props: variant, size, icon, loading, disabled, onClick, children
Variants: primary, secondary, ghost, outline, danger
Sizes: sm, md, lg
```

### Avatar Component
```
File: src/components/common/Avatar.jsx
Props: src, alt, size, online, onClick
Sizes: xs, sm, md, lg, xl
Online indicator: green dot
```

### Badge Component
```
File: src/components/common/Badge.jsx
Props: variant, children, icon
Variants: primary, secondary, success, warning, danger
```

### Input Component
```
File: src/components/common/Input.jsx
Props: label, placeholder, error, required, type, icon
Supports: text, email, password, textarea
```

### Modal Component
```
File: src/components/common/Modal.jsx
Props: isOpen, onClose, title, children, footer
Used for: Confirmations, forms, detailed views
```

### Loader Component
```
File: src/components/common/Loader.jsx
Displays: Spinner or skeleton loading states
```

---

## 9. LAYOUT COMPONENTS (Already Built - Verify)

### Sidebar
- Navigation links for all main pages
- Active state highlighting
- Collapse on mobile
- User profile section at bottom

### Navbar
- Logo and app name
- Search bar
- Theme toggle (sun/moon icon)
- Notification icon with badge
- User menu dropdown

### RightSidebar
- Trending topics
- Suggested people to follow
- Career tips
- Sticky on scroll

### MainLayout
- Three-column layout on desktop
- Responsive to tablet and mobile
- Sidebar + Content + RightSidebar arrangement

---

## 10. STATE MANAGEMENT WITH CONTEXT API

### AuthContext (`src/context/AuthContext.jsx`)
```javascript
{
  currentUser: { id, username, name, avatar, ... },
  isAuthenticated: boolean,
  login: (username, password) => void,
  logout: () => void
}
```

### ThemeContext (`src/context/ThemeContext.jsx`)
```javascript
{
  isDark: boolean,
  toggleTheme: () => void
}
```

### AppContext (`src/context/AppContext.jsx`)
```javascript
{
  posts: [],
  notifications: [],
  messages: [],
  likes: [],
  saves: [],
  follows: [],
  likePost: (postId) => void,
  savePost: (postId) => void,
  followUser: (userId) => void,
  // ... more actions
}
```

---

## IMPLEMENTATION PRIORITY

### Phase 1 (MVP)
1. Home Feed (PostComposer + PostCard + Feed)
2. Profile Page
3. Navigation (Sidebar + Navbar)

### Phase 2 (Core Features)
4. Explore Page
5. Messages Page
6. Notifications Page

### Phase 3 (Polish)
7. Saved Posts Page
8. Settings Page
9. Enhanced interactions and animations
10. Mobile responsiveness refinements

---

## STYLING GUIDELINES

### Tailwind Classes to Use
- Spacing: `p-4`, `m-2`, `gap-3`
- Colors: `bg-blue-50`, `text-gray-700`, `border-gray-200`
- Responsive: `md:grid-cols-2`, `lg:grid-cols-3`
- Dark mode: `dark:bg-gray-900`, `dark:text-white`

### Theme Colors
- Primary: `#3B82F6` (Blue)
- Accent: `#A855F7` (Purple)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

---

## TESTING CHECKLIST

For each feature, verify:
- [ ] Mock data displays correctly
- [ ] Interactive elements respond to clicks
- [ ] Responsive design works on all breakpoints
- [ ] Theme toggle affects styling
- [ ] Empty states display when needed
- [ ] Loading states work correctly
- [ ] Error states are handled gracefully
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Accessibility (keyboard navigation, labels)

---

## ADDITIONAL NOTES

- All timestamps should use `formatDistanceToNow()` from date-fns library
- Use Lucide React icons for all UI icons
- Implement optimistic UI updates (update state before API calls)
- Add error boundaries around feature sections
- Consider implementing virtual scrolling for large lists
- Use React.memo() for components that don't need frequent re-renders
- Implement proper key props for list items
- Consider code-splitting page components with React.lazy()

