# University Profile Feature - Complete Implementation Prompt

## Overview
The University Profile is a comprehensive public-facing page for educational institutions within the social platform. It serves as a digital hub where universities can showcase their identity, announcements, facilities, faculty, and events to students, parents, and stakeholders.

**Route:** `/university-profile/:universityId`

---

## 1. Core Features Requirements

### 1.1 Profile Header Section

#### Banner Image Management
- **Feature:** Upload and display a university banner image
- **Specifications:**
  - Maximum file size: 5MB
  - Supported formats: PNG, JPG, GIF, WebP
  - Recommended dimensions: 1920x600px (16:9 aspect ratio)
  - Desktop height: 256px (h-64)
  - Tablet height: 160px (h-40)
  - Mobile height: 128px (h-32)
- **Functionality:**
  - Display upload button on hover (desktop) or always visible (mobile)
  - Show gradient fallback (indigo-400 to indigo-600) when no banner uploaded
  - Provide edit/upload modal with preview
  - Cancel option reverts changes
  - Success toast notification on upload
- **Responsive Behavior:**
  - Full-width on all devices
  - Rounded corners: small screens (lg), larger screens (xl)

#### University Logo/Profile Picture
- **Feature:** Display university logo or profile picture
- **Specifications:**
  - Maximum file size: 5MB
  - Supported formats: PNG, JPG, GIF, WebP
  - Size: 96px (h-24) on desktop, 64px (h-16) on mobile
  - Fallback: Display university name initials in gradient circle
  - Border: 2px indigo-500 with shadow
- **Functionality:**
  - Hover overlay on desktop (shows upload icon)
  - Mobile: Floating upload button in bottom-right corner
  - Upload modal with drag-and-drop support
  - Preview before confirming upload
  - Success notification on upload
- **Positioning:** Overlaps banner at bottom, positioned in a white card

#### University Information Card
- **Content Display:**
  - University name (line-clamp-2, scalable font 24-48px)
  - Motto/tagline (line-clamp-2, secondary text)
  - Accreditation badge (success variant)
- **Quick Statistics Grid:**
  - 4-column grid on desktop, 2-column on mobile
  - Stats: Students, Faculty, Founded Year, Location
  - Large, bold numbers with light gray labels
  - Border-top separator
- **Action Buttons:**
  - Follow/Following toggle button (state changes on click)
  - Share button (icon-only on mobile, with text on tablet+)
  - Both buttons responsive sizing
  - Flex layout with gap spacing

---

### 1.2 Navigation Tabs System

#### Tab Structure (5 Tabs)
All tabs should be horizontally scrollable on mobile with smooth transitions.

1. **Feed Tab** - University Announcements
2. **About Tab** - Detailed Information
3. **Faculty Tab** - Staff Directory
4. **Gallery Tab** - Photo Showcase
5. **Events Tab** - Upcoming Events

#### Tab Styling
- **Active Tab:** Indigo text (600/400 dark) with indigo bottom border
- **Inactive Tab:** Gray text (600/400 dark) with transparent border
- **Mobile:** Contained in rounded box with padding
- **Desktop:** Full-width with bottom border style
- **Icons:** Each tab has associated lucide-react icon
- **Transition:** Color and border changes smoothly

---

### 1.3 Feed Tab - Announcements

#### Functionality
- **Post Display:**
  - Show paginated university posts
  - 5 posts per page
  - Use PostCard component for each post
  - Filter posts by `universityId`
- **Post Composer:**
  - Allow authorized users to create announcements
  - Use PostComposer component
  - Displayed above post list
- **Pagination:**
  - Use Pagination component
  - Display current page, total pages, total items count
  - Show loading state during page transition (300ms delay)
  - Observer target for scroll behavior
- **Empty State:**
  - Icon-based empty state when no posts exist
  - Message: "No announcements yet"
  - Subtext: "Check back soon for announcements from this university!"
- **Loading State:**
  - Show Loader (lg size) centered in container
  - Display while initial posts are loading

#### Data Source
- Load from `universityPostsData.json`
- Filter by `post.universityId === universityId`
- Memoize filtered posts to prevent unnecessary recalculations

---

### 1.4 About Tab - University Information

#### Content Sections

**Section 1: University Description**
- Full description text from university data
- Responsive font sizing

**Section 2: Key Information Grid**
- 2-column layout on mobile, 2-column on tablet/desktop
- Cards with borders and padding
- Display:
  - Founded Year
  - Vice-Chancellor/Principal Name
  - Total Students
  - Total Faculty

**Section 3: University Motto**
- Italicized text
- Heading: "University Motto"
- Responsive spacing

**Section 4: Accreditation**
- Display as success-variant badge
- Shows accreditation type from university data

**Section 5: Contact Information Grid**
- 2-column layout
- Include Location with MapPin icon
- Include Website with Globe icon (if available)
- Show detailed information with secondary labels

#### Styling
- White/dark background with border and shadow
- Responsive padding (4-6-8px scaling)
- Consistent spacing between sections

---

### 1.5 Faculty Tab - Staff Directory

#### Display Format
- **Grid Layout:** 1 column mobile, 2 columns tablet+, maintaining aspect
- **Card Per Faculty Member:**
  - Avatar (gradient circle with initials, 56-96px)
  - Name (line-clamp-1, semibold)
  - Role (indigo-600 color, medium font)
  - Department (gray text, smaller)
  - Divider line
  - Details section showing:
    - Email
    - Experience (years)
    - Qualifications (degrees)
  - Hover effect: shadow increase
  - Responsive padding and text sizing

#### Faculty Data
- Minimum 8 faculty members
- Each member must include:
  - id: Unique identifier
  - name: Full name
  - role: Position/title
  - avatar: Single letter for avatar
  - department: Department name
  - email: Email address
  - experience: Years of experience (formatted as "X years")
  - qualifications: Degrees/certifications

#### Features
- No sorting or filtering required (display in order)
- Consistent card design across all items
- Mobile-optimized text truncation

---

### 1.6 Gallery Tab - Photo Showcase

#### Gallery Management

**Upload Interface:**
- Button to initiate upload (visible when not uploading)
- Info panel with upload instructions:
  - Max 6 photos
  - Max 5MB each file
  - Supported formats: PNG, JPG, GIF
- Modal upload interface:
  - Full-screen on mobile, centered on desktop
  - Drag-and-drop file upload
  - Or click to browse files
  - Multiple file selection support
  - File input accepts "image/*"

**Upload Processing:**
- Validate file size (max 5MB per file)
- Alert if file exceeds size limit
- Show preview immediately after selection
- Support multiple file upload (up to 6 total)
- Store in galleryImages state with:
  - id: Unique identifier
  - preview: Base64 data URL
  - file: File object
  - name: Display name

**Gallery Display:**
- Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Square aspect ratio for all images
- Rounded corners with shadow
- Hover shadow effect
- Remove button (X icon) on hover over each image
- Image label overlay at bottom during upload modal

**Upload Confirmation:**
- Only finalize when user clicks "Upload Photos" button
- Cancel button reverts changes
- Success toast notification after upload

#### State Management
- `galleryImages`: Array of image objects (6 slots minimum)
- `showGalleryUpload`: Boolean for modal visibility
- `galleryInputRef`: Reference to file input

---

### 1.7 Events Tab - Upcoming Events

#### Event Display Format
- **Grid/List Layout:** Full-width cards, stacked vertically
- **Card Content:**
  - Event title (semibold, base-lg font)
  - Event type badge (color-coded)
  - Date with Calendar icon
  - Location with MapPin icon
  - Register button (outline variant)
- **Flex Layout:** Row on desktop (flex-row), column on mobile (flex-col)
- **Responsive Spacing:** Gap between elements, consistent padding

#### Event Data Structure
Each event must include:
- id: Unique identifier
- title: Event name
- date: ISO 8601 format (e.g., "2025-02-28")
- type: Event category (Academic, Research, Conference, etc.)
- location: Event location/venue

#### Badge Color Coding
- **Academic:** Primary variant (indigo)
- **Research:** Success variant (green)
- **Conference:** Warning variant (yellow)
- **Default:** Secondary variant

#### Features
- Date formatted using `new Date().toLocaleDateString()`
- Location displayed with icon
- Register button for each event (state not required, UI only)
- Hover effects on cards (shadow increase)
- Responsive text sizing and icon sizing

---

## 2. Technical Implementation Details

### 2.1 Component Structure
```
UniversityProfile.jsx (Main Component)
├── Banner Upload Modal
├── Profile Picture Upload Modal
├── Gallery Upload Modal
├── Share Modal
├── Tab Navigation
└── Tab Content (renderFeed, renderAbout, etc.)
```

### 2.2 State Management
**Required States:**
- `activeTab`: Current active tab (string)
- `isFollowing`: Following status (boolean)
- `followerCount`: Number of followers (number)
- `bannerImage`: Selected banner file
- `bannerPreview`: Banner preview data URL
- `profileImage`: Selected profile picture file
- `profilePreview`: Profile picture preview data URL
- `galleryImages`: Array of gallery image objects
- `showBannerUpload`: Banner modal visibility
- `showProfileUpload`: Profile picture modal visibility
- `showGalleryUpload`: Gallery modal visibility
- `showShareModal`: Share modal visibility
- `copyFeedback`: Clipboard copy feedback (boolean)
- `uploadToast`: Toast notification message (string)
- `isLoading`: Initial load state
- `currentPage`: Current pagination page
- `displayedPosts`: Posts for current page

**Constants:**
- `postsPerPage`: 5

### 2.3 Data Sources
- `universitiesData` from `/data/universities.json`
- `universityPostsData` from `/data/universityPosts.json`
- `universityDepartmentsData` from `/data/universityDepartments.json`

### 2.4 Hooks & Utilities
- `useState`: State management
- `useRef`: DOM references for file inputs
- `useCallback`: Memoized callbacks (optional optimization)
- `useEffect`: Pagination effect, initial load
- `useNavigate`: Route navigation
- `useParams`: URL parameters (universityId)
- `React.useMemo`: Memoize filtered posts

### 2.5 External Components Used
- `Badge`: For badges and status indicators
- `Button`: For all interactive buttons
- `Modal`: For upload modals (if custom modal component exists)
- `PostComposer`: For creating announcements
- `PostCard`: For displaying individual posts
- `Pagination`: For pagination controls
- `Loader`: For loading states

### 2.6 Icons (lucide-react)
```javascript
MapPin, Mail, Globe, Users, BookOpen, Calendar, Award, ArrowLeft, 
Share2, Bell, Building2, Search, Upload, X, Image, Copy, Facebook, 
Linkedin, Twitter, MessageCircle, Zap, GraduationCap
```

---

## 3. User Experience Requirements

### 3.1 Responsive Design
- **Mobile (xs, sm):** 
  - Full-width content
  - Stacked layout
  - Floating action buttons
  - Touch-friendly tap targets (44px minimum)
  - Rounded modals from bottom
  
- **Tablet (md, lg):**
  - Optimized padding and spacing
  - Grid layouts adapt (2 columns)
  - Overlay modals centered
  
- **Desktop (xl, 2xl):**
  - Full layout features
  - 3-column grids where applicable
  - Hover effects visible
  - Sidebar-friendly width

### 3.2 Dark Mode Support
- All text with `dark:text-gray-*` variants
- Backgrounds: `dark:bg-gray-800`, `dark:bg-gray-700`
- Borders: `dark:border-gray-700`
- Consistent color scheme across all elements

### 3.3 Interactions
- **Hover Effects:**
  - Button hover state changes
  - Card shadow increases
  - Banner upload icon appears
  - Social icons may animate
  
- **Active States:**
  - Tab underline indicates active tab
  - Follow button toggles appearance
  - Icons scale down slightly on press (active:scale-95)
  
- **Transitions:**
  - Smooth color transitions (transition-colors)
  - Shadow transitions (transition-all)
  - Border transitions
  - All transitions should feel responsive (200-300ms)

### 3.4 Feedback
- **Toast Notifications:**
  - "Banner uploaded successfully! ✓"
  - "Profile picture updated successfully! ✓"
  - Fixed position bottom-right
  - Auto-dismiss after 3 seconds
  - Green background with white text
  
- **Success Messages:**
  - Upload confirmations
  - Action feedback
  
- **Loading States:**
  - Spinner during pagination
  - 300ms delay for better UX
  - Disabled buttons during upload

### 3.5 Accessibility
- Button aria-labels for icon-only buttons
- Semantic HTML structure
- Proper heading hierarchy
- Image alt attributes
- Tab navigation for keyboard users
- Form labels and descriptions

---

## 4. Feature Specifications by Priority

### Priority 1 (Must Have)
- ✅ University profile data display
- ✅ Banner image upload and display
- ✅ Logo/profile picture upload and display
- ✅ Feed tab with posts and pagination
- ✅ About tab with information
- ✅ Faculty tab with directory
- ✅ Gallery tab with photo upload
- ✅ Events tab with event listing
- ✅ Tab navigation system
- ✅ Follow/Share functionality UI

### Priority 2 (Should Have)
- ✅ Responsive design across all breakpoints
- ✅ Dark mode support
- ✅ Toast notifications
- ✅ Smooth transitions and hover effects
- ✅ Empty states
- ✅ Loading states
- ✅ File validation (size, format)

### Priority 3 (Nice to Have)
- Share modal with social links
- Copy URL to clipboard
- Event registration (button UI)
- Faculty member detail modals
- Photo lightbox/modal view
- Search within faculty directory

---

## 5. File Upload Specifications

### Image Upload Requirements
- **Maximum file size:** 5MB per image
- **Supported formats:** PNG, JPG, GIF, WebP
- **Validation:** Check MIME type and file size
- **Preview:** Show base64 preview before confirmation
- **Storage:** Mock storage (preview in component state)

### Upload Modal Features
- Drag-and-drop support
- File input with accept="image/*"
- Preview display with dimensions
- Remove/change file option
- Cancel without saving
- Confirm/upload button

---

## 6. Testing Checklist

### Feature Testing
- [ ] Banner upload and display on all devices
- [ ] Profile picture upload and display
- [ ] Profile picture displays initials when not uploaded
- [ ] All tabs clickable and content displays correctly
- [ ] Feed tab shows paginated posts
- [ ] About tab displays all information sections
- [ ] Faculty tab displays all staff members in grid
- [ ] Gallery supports multiple file upload
- [ ] Gallery grid responsive on all breakpoints
- [ ] Events display with correct date formatting
- [ ] Follow button toggles state
- [ ] Share button opens modal
- [ ] Toast notifications appear and disappear

### Responsive Testing
- [ ] Mobile (320px): All features accessible
- [ ] Mobile (768px): Proper grid layouts
- [ ] Tablet (1024px): Optimized spacing
- [ ] Desktop (1920px): Full features visible
- [ ] Modals responsive on all breakpoints
- [ ] Text readable on all sizes
- [ ] Images maintain aspect ratio

### Dark Mode Testing
- [ ] All text readable in dark mode
- [ ] Buttons visible in dark mode
- [ ] Cards have proper contrast
- [ ] Icons visible in dark mode
- [ ] Backgrounds appropriate

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### File Upload Testing
- [ ] Max 5MB validation works
- [ ] Unsupported formats rejected
- [ ] Preview displays correctly
- [ ] Cancel reverts changes
- [ ] Success notification appears

---

## 7. Data Structure Examples

### University Data (universities.json)
```json
{
  "id": "university-1",
  "name": "Stanford University",
  "description": "Description text...",
  "motto": "The wind of freedom blows",
  "foundedYear": 1885,
  "location": "Palo Alto, California",
  "totalStudents": 17000,
  "totalTeachers": 2500,
  "principalName": "Prof. Marc Tessier-Lavigne",
  "accreditation": "WASC Accredited",
  "website": "www.stanford.edu"
}
```

### University Post Data (universityPosts.json)
```json
{
  "id": "post-1",
  "universityId": "university-1",
  "title": "Annual Convocation",
  "content": "Post content...",
  "author": "University Admin",
  "timestamp": "2025-01-15T10:00:00Z",
  "likes": 150,
  "shares": 25
}
```

---

## 8. Notes for Developers

### Key Implementation Tips
1. Use React.useMemo for filtering posts to prevent unnecessary re-renders
2. Use useRef for file input elements to programmatically trigger selection
3. FileReader API for base64 preview generation
4. Implement file size validation before FileReader
5. Debounce pagination state updates if needed
6. Use requestAnimationFrame for smooth scrolling
7. Implement error boundaries for file uploads
8. Consider lazy loading for gallery images in production

### Performance Considerations
- Memoize faculty and events arrays
- Implement image lazy loading (future enhancement)
- Optimize re-renders using useCallback
- Consider pagination to limit DOM elements
- Use CSS Grid for gallery (GPU accelerated)

### Future Enhancements
- Real backend integration for file uploads
- Search and filter in faculty directory
- Event registration functionality
- Photo lightbox gallery view
- University calendar integration
- Academic department pages
- News/blog integration
- Student testimonials
- Scholarship information
- Admission process details

---

## 9. Success Criteria

The University Profile feature is complete when:

✅ All 5 tabs are fully functional with proper data display
✅ Image uploads work with proper validation and preview
✅ Responsive design works seamlessly on all breakpoints
✅ Dark mode styling applied consistently throughout
✅ All interactive elements provide visual feedback
✅ Loading states display appropriately
✅ Empty states handled gracefully
✅ Toast notifications appear for user actions
✅ Mobile-first approach implemented
✅ Accessibility standards met
✅ Code is well-organized and maintainable
✅ All tests pass without errors
✅ Performance optimized with no console warnings
