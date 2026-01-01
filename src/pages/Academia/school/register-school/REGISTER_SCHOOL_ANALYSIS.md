# Register New School Feature - Analysis & Design

## Current Structure Analysis

### 1. School List Page (School.jsx - School Component)
**Location:** `/school` route

**Features:**
- Search schools by name/location
- Display school grid cards (1-2 columns responsive)
- Each card shows:
  - School logo/avatar (initial letter in gradient)
  - School name and description
  - Location
  - Total students count
  - Primary school group info
  - "Register new school" button (currently non-functional)
  - "View School" button (navigates to `/school-profile/:schoolId`)
  - "Explore Group" button (navigates to `/school-group/:groupId`)

**Data Structure (schools.json):**
```json
{
  "id": "school-1",
  "name": "Green Valley High School",
  "logo": "",
  "banner": "",
  "description": "...",
  "location": "123 Education Street...",
  "type": "Private/NGO/Public",
  "contact": {
    "phone": "+1 (555) 123-4567",
    "email": "info@greenvalley.edu",
    "website": "https://greenvalley.edu"
  },
  "foundedYear": 1995,
  "principalName": "Dr. James Mitchell",
  "totalStudents": 1250,
  "totalTeachers": 85,
  "verified": true,
  "followers": 3420,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-12-29T00:00:00Z",
  "motto": "Excellence in Education, Character in Action",
  "accreditation": "ACSEE Accredited",
  "colors": ["#10B981", "#059669"]
}
```

### 2. School Profile Page (School.jsx - SchoolProfile Component)
**Location:** `/school-profile/:schoolId` route

**Tabs:**
1. **Feed** - School posts with infinite scroll
2. **About** - School info, motto, accreditation, founding year, etc.
3. **Gallery** - Photo upload/display with 6 image slots
4. **Announcements** - School announcements
5. **Events** - School events calendar
6. **Members** - 12 staff members with roles, departments, contact info

**Features:**
- Follow/Unfollow school
- Share school (Twitter, Facebook, LinkedIn, WhatsApp, Email)
- Upload banner image
- Upload profile picture
- Upload gallery photos
- Create posts
- Responsive design with dark mode

### 3. School Group Page (SchoolGroup.jsx)
**Location:** `/school-group/:groupId` route

**Tabs:**
1. **Discussions** - Community posts
2. **Announcements** - Group announcements with priority levels
3. **Events** - Upcoming events
4. **Resources** - Shared materials/files
5. **Members** - Group members with roles

**Features:**
- Modal popup for viewing all classes
- Class search functionality
- View classes button (green) in group card
- Role-based member display (Admin, Teacher, Student)
- Group statistics widget

---

## Register New School Feature Requirements

### User Flow
1. Click "Register new school" button on school list page
2. Open modal/wizard form
3. Fill in basic school information
4. Upload logo and banner
5. Add contact details
6. Confirm and register
7. School appears in list immediately

### Form Fields Required

#### Basic Information
- [ ] School Name (required, string, 2-100 chars)
- [ ] Description (required, textarea, 20-500 chars)
- [ ] Location (required, string, address)
- [ ] Type (required, select: Public/Private/NGO)
- [ ] Founded Year (required, number, 1900-current)
- [ ] Principal Name (required, string)

#### Contact Information
- [ ] Phone (required, phone format)
- [ ] Email (required, email format)
- [ ] Website (optional, URL format)

#### School Metrics
- [ ] Total Students (required, number, 0-5000)
- [ ] Total Teachers (required, number, 0-500)
- [ ] Accreditation (required, string)
- [ ] Motto (required, string, 5-200 chars)

#### Media (Optional)
- [ ] Logo (file upload, max 5MB, image only)
- [ ] Banner (file upload, max 5MB, image only)

#### Colors (Optional)
- [ ] Primary Color (color picker)
- [ ] Secondary Color (color picker)

---

## Component Structure

### File Organization

```
src/pages/Academia/school/register-school/
├── RegisterSchool.jsx           # Main component with form
├── RegisterSchoolForm.jsx        # Form component
├── RegisterSchoolSteps.jsx       # Step-by-step wizard (if needed)
├── RegisterSchoolModal.jsx       # Modal wrapper
├── hooks/
│   └── useRegisterSchool.js     # Form validation & submission
└── validation.js                 # Field validation rules
```

### RegisterSchool.jsx
- Main entry point component
- Handles modal state
- Props: isOpen, onClose, onRegister
- Returns modal with form

### RegisterSchoolForm.jsx
- Form UI with all fields
- Input validation
- Preview of logos/banners
- Form submission handling
- Responsive layout

### Validation Rules
- School name: min 2, max 100 chars, no special chars
- Description: min 20, max 500 chars
- Email: valid email format
- Phone: valid phone format
- Students/Teachers: positive numbers
- Website: valid URL (if provided)
- Logo/Banner: image files only, max 5MB

---

## Integration Points

### 1. In School.jsx (School Component)
```jsx
// Convert button to trigger modal
<Button 
    onClick={() => setShowRegisterModal(true)}
    variant="primary" 
    size="md"
>
    Register new school
</Button>

// Add modal component
{showRegisterModal && (
    <RegisterSchool 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegisterSchool}
    />
)}
```

### 2. In App.jsx (optional dedicated route)
```jsx
<Route path="register-school" element={<RegisterSchool standalone={true} />} />
```

---

## Features to Implement

### Phase 1: Basic Form
- [ ] Form with all required fields
- [ ] Input validation
- [ ] Error messages
- [ ] Form submission
- [ ] Success notification

### Phase 2: Media Upload
- [ ] Logo upload with preview
- [ ] Banner upload with preview
- [ ] Image validation
- [ ] Drag-and-drop upload

### Phase 3: Advanced Features
- [ ] Step-by-step wizard
- [ ] Save draft functionality
- [ ] Auto-fill from school data
- [ ] Verification system for registered schools
- [ ] Email confirmation

### Phase 4: Optional
- [ ] School templates/presets
- [ ] Bulk registration
- [ ] API integration

---

## Styling Guidelines

### Colors
- Use primary blue (#2563EB) for primary actions
- Use green (#10B981) for success/confirmation
- Use red (#EF4444) for errors
- Use gray (#6B7280) for secondary actions

### Layout
- Mobile-first responsive design
- Center modal on desktop, bottom-sheet on mobile
- Max-width: 600px for form
- Proper spacing and padding
- Dark mode support with `dark:` prefix

### Typography
- Headings: font-bold, text-lg/xl
- Labels: text-sm font-medium, text-gray-700
- Helper text: text-xs, text-gray-500
- Inputs: text-sm/base, proper padding

---

## Validation Messages

```javascript
const validationErrors = {
  schoolName: {
    required: "School name is required",
    minLength: "School name must be at least 2 characters",
    maxLength: "School name must be less than 100 characters"
  },
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address"
  },
  phone: {
    required: "Phone number is required",
    invalid: "Please enter a valid phone number"
  },
  // ... more validations
}
```

---

## Success Flow

1. User fills form with valid data
2. Click "Register School" button
3. Form validates all fields
4. Show loading spinner
5. Generate new school object with:
   - Unique ID (school-3, school-4, etc.)
   - Current timestamp for createdAt/updatedAt
   - Default verified: false (optional pending approval)
6. Add to schools.json (in real app, POST to API)
7. Show success toast notification
8. Close modal
9. Refresh school list
10. New school appears at top/bottom of grid

---

## Error Handling

- [ ] Required field validation
- [ ] Format validation (email, phone, URL)
- [ ] File size validation
- [ ] File type validation
- [ ] Display field-specific error messages
- [ ] Prevent form submission with errors
- [ ] Highlight invalid fields

---

## Accessibility

- [ ] Proper form labels with htmlFor
- [ ] Required field indicators
- [ ] Keyboard navigation support
- [ ] ARIA labels for icon buttons
- [ ] Focus states on inputs
- [ ] Error message associations
- [ ] Proper heading hierarchy

---

## Testing Checklist

- [ ] Form renders with all fields
- [ ] Validation works for each field
- [ ] Error messages display correctly
- [ ] Logo upload works with preview
- [ ] Banner upload works with preview
- [ ] Form can be submitted
- [ ] New school appears in list
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode works
- [ ] Cancel/close modal works

---

**Status:** Ready for Implementation
**Priority:** High
**Estimated Effort:** 4-6 hours
