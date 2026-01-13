# Mentor Registration Implementation Guide

## 🎯 Quick Summary

The SmartCareer platform has **two professional roles**:

### 1. **Career Counsellor**
- Provides career guidance and coaching
- Session-based (hourly billing)
- Short-term consultations
- Registration at: `/counselling` page

### 2. **Mentor** 
- Provides professional mentorship
- Long-term relationships
- Skill development focus
- Currently uses same registration as Counsellor
- Future dedicated Mentor registration planned

---

## 📝 Registration Flow Overview

```
User Visit /counselling
        ↓
   Click "Register as Counsellor"
        ↓
   RegisterAsCounsellorModal Opens
        ↓
   Fill Professional Details:
   - Name, Email, Phone
   - Title, Specialization
   - Bio, Years of Experience
   - Fees, Availability
   - Certifications, Languages
        ↓
   Upload Profile Image
        ↓
   Submit Application
        ↓
   Admin Review (2-3 days)
        ↓
   Approval → Active Profile
```

---

## 🔧 Key Features of Mentor Registration

### 1. **Profile Information**
```javascript
{
  // Basic Info
  name: "Sarah Chen",
  email: "sarah@example.com",
  phone: "+1-555-0123",
  
  // Professional
  title: "Senior Product Manager",
  specialization: "Tech & IT",
  yearsExperience: 8,
  bio: "8+ years in product management...",
  
  // Services
  hourlyRate: 75,
  availability: "Weekends, 2pm-6pm",
  responseTime: "2 hours",
  
  // Credentials
  certifications: ["PMP", "Six Sigma Green Belt"],
  languages: ["English", "Mandarin"],
  
  // Media
  avatar: "profile-image.jpg",
  
  // System
  status: "pending", // pending, approved, rejected
  createdAt: "2024-01-10"
}
```

### 2. **Validation Rules**

**Required Fields:**
- ✅ Full name (min 2 chars)
- ✅ Valid email format
- ✅ Phone number
- ✅ Professional title
- ✅ Specialization (dropdown select)
- ✅ Professional bio (min 10 chars)
- ✅ Years of experience (numeric)
- ✅ Hourly fees (numeric, > 0)
- ✅ At least 1 certification
- ✅ Availability description
- ✅ At least 1 language selected

### 3. **User Experience Features**

**Error Handling:**
- Real-time field validation
- Clear error messages
- Error highlighting
- Toast notifications

**Image Upload:**
- Click to upload photo
- Image preview display
- Drag & drop support
- File type validation (JPG, PNG, WebP)

**Dynamic Fields:**
- Add/remove certifications
- Select/deselect multiple languages
- Real-time form state updates

---

## 💼 How Mentorship Works

### For Mentees (Users seeking mentorship)

**Step 1: Find a Mentor**
- Visit `/mentors` page
- Filter by specialization
- Sort by rating
- View mentor profiles

**Step 2: Review Profile**
- See expertise tags
- Check ratings (stars) and reviews
- View availability
- Note hourly rate

**Step 3: Book Session or Message**
- Click "Book Session" → Schedule meeting
- Click "Chat" → Send direct message
- Discuss mentorship goals

**Step 4: Receive Mentorship**
- Connect via messaging
- Schedule regular meetings
- Get guidance and feedback
- Track progress

### For Mentors (Professional registering)

**Step 1: Register Profile**
- Complete registration form
- Upload professional photo
- Add certifications
- Set availability and rates

**Step 2: Submit for Review**
- Admin verifies credentials
- Approves/rejects application
- Sends email notification

**Step 3: Activate Profile**
- Profile becomes visible
- Mentees can discover you
- Can receive requests

**Step 4: Manage Mentees**
- View mentee profiles
- Schedule sessions
- Provide guidance
- Track progress

---

## 🎓 Mentor Profile Display

### Mentor Card (in listing)
```
┌─────────────────────────────────┐
│ [Photo] Sarah Chen              │
│         Senior PM @ Google      │
│                                 │
│ ⭐ 4.9 (127 reviews)            │
│ 💼 Product Strategy, Growth     │
│ 👥 Mentees: 24                  │
│ 💬 Response: 2 hours            │
│ 💵 $75/hour                     │
│ 📅 Weekends                     │
│                                 │
│ [Book Session] [Chat]           │
└─────────────────────────────────┘
```

### Mentor Full Profile (detail page)
```
Full Information:
├─ Photo & Basic Info
├─ Title & Company
├─ Rating & Reviews
├─ Expertise Tags
├─ Professional Bio
├─ Experience (years)
├─ Certifications
├─ Languages
├─ Availability
├─ Hourly Rate
├─ Number of Mentees
├─ Response Time
├─ Verified Badge
└─ Action Buttons
```

---

## 📊 Registration Form Fields

### Section 1: Profile Image
- File upload (image only)
- Preview display
- Drag & drop support

### Section 2: Basic Information
- Full Name (text input)
- Email (email input)
- Phone (tel input)

### Section 3: Professional Details
- Professional Title (text input)
- Specialization (dropdown select)
- Years of Experience (number input)
- Professional Bio (textarea, 10+ chars)

### Section 4: Service Details
- Hourly Fees (number input, USD)
- Availability (text input, e.g., "Mon-Fri 9am-5pm")

### Section 5: Credentials
- Certifications (add/remove button)
  - Add certification text field
  - Display as badges
  - Remove button per certification

### Section 6: Languages
- Language Selection (multi-select buttons)
  - English, Spanish, Mandarin, French
  - German, Hindi, Portuguese, Italian, Tamil
  - Visual toggle (active/inactive)

### Section 7: Actions
- Cancel button
- Submit Registration button

---

## 🔄 Status Management

### Application Statuses

**1. PENDING**
- Submitted by user
- Awaiting admin review
- Can see in admin dashboard
- Email notification to user

**2. APPROVED**
- Credentials verified
- Profile activated
- Visible to mentees
- Can receive mentorship requests
- Email confirmation sent

**3. REJECTED**
- Credentials not verified
- Feedback provided
- Can reapply after fixes
- Email with reason sent

### Admin Actions (Admin Panel)

```
Admin Dashboard → Counsellor Applications
├─ View pending applications
├─ See all details
├─ Approve application → Activate profile
├─ Reject application → Send feedback
└─ View approved mentors
```

---

## 💻 Component Architecture

### Main Components

**1. RegisterAsCounsellorModal**
- Location: `src/components/modals/RegisterAsCounsellorModal.jsx`
- Props: `{ isOpen, onClose, onSubmit }`
- Features: Form validation, image upload, dynamic fields

**2. Mentor Card**
- Location: `src/pages/mentors/Mentors.jsx`
- Displays: Profile summary, ratings, actions
- Actions: Book session, Send message

**3. Mentor Profile Page**
- Location: `/mentors/:id`
- Shows: Full details, reviews, availability
- Actions: Booking, messaging

**4. Booking Modal**
- Location: `src/components/modals/BookingModal.jsx`
- Props: `{ isOpen, onClose, mentor }`
- Allows: Date/time selection, duration choice

### Data Flow

```
User Registration
        ↓
RegisterAsCounsellorModal
        ↓
Form Validation
        ↓
AppContext.addCounsellorApplication()
        ↓
localStorage (persistence)
        ↓
Admin Review
        ↓
Admin Dashboard
        ↓
Approve/Reject
        ↓
User Notification (email)
        ↓
Profile Activation
        ↓
Mentee Discovery
```

---

## 🎯 Future Enhancements

### Phase 1: Current
- ✅ Basic mentor profile
- ✅ Registration with validation
- ✅ Admin approval
- ✅ Discovery and browsing

### Phase 2: Separate Mentor Registration
- Create dedicated "Register as Mentor" modal
- Different fields than Counsellor
- Mentor-specific requirements
- Separate approval workflow

### Phase 3: Enhanced Matching
- AI-based mentor matching
- Skills-based recommendations
- Mentee-mentor compatibility scores
- Automated pairing

### Phase 4: Advanced Features
- Video mentoring (Zoom integration)
- Session recordings
- Progress tracking dashboard
- Mentee testimonials
- Mentor certification programs

---

## 📱 Mobile Responsiveness

### Registration Form (Mobile)
- Stack fields vertically
- Full-width inputs
- Larger touch targets
- Simplified layout
- Collapsible sections

### Mentor Cards (Mobile)
- Single column layout
- Larger images
- Vertical action buttons
- Touch-friendly spacing

---

## 🔐 Security Considerations

### Data Protection
- ✅ Email verification
- ✅ Phone verification
- ✅ Credential validation
- ✅ Background checks (manual)
- ✅ User agreement acceptance

### Fraud Prevention
- Admin review all applications
- Verify credentials via databases
- Monitor review authenticity
- Track mentor behavior
- Community reporting system

---

## 📧 Email Notifications

### Registration Submitted
```
Subject: Registration Received
Body: We received your application. 
      Review typically takes 2-3 days.
```

### Approved
```
Subject: ✅ Profile Activated!
Body: Your mentor profile is now active!
      Mentees can discover and book you.
```

### Rejected
```
Subject: ❌ Application Needs Review
Body: Your application needs additional info.
      Reason: [specific feedback]
      You can reapply: [link]
```

---

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Yellow (#F59E0B)
- Neutral: Gray (various shades)

### Typography
- Headings: Bold, large size
- Body: Regular, readable size
- Labels: Medium, clear hierarchy
- Errors: Red, smaller size

### Spacing
- Consistent padding/margins
- Mobile-first approach
- Responsive breakpoints
- Touch-friendly sizing

---

## 🎓 Example Mentor Profiles

### Sarah Chen
- Title: Senior Product Manager @ Google
- Experience: 8 years
- Specialization: Tech & IT
- Rate: $75/hour
- Rating: 4.9⭐ (127 reviews)
- Expertise: Product Strategy, Growth, User Research
- Languages: English, Mandarin

### James Wilson
- Title: Full Stack Engineer @ Meta
- Experience: 10 years
- Specialization: Tech & IT
- Rate: $65/hour
- Rating: 4.8⭐ (94 reviews)
- Expertise: React, Node.js, System Design
- Languages: English, Spanish

### Priya Patel
- Title: Data Science Lead @ Netflix
- Experience: 12 years
- Specialization: Tech & IT
- Rate: $85/hour
- Rating: 4.9⭐ (156 reviews)
- Expertise: Machine Learning, Analytics, Python
- Languages: English, Hindi

---

## 📞 Support & Resources

- **FAQ:** Platform help center
- **Email:** support@smartcareer.com
- **Chat:** In-app support
- **Mentor Guide:** Detailed documentation
- **Community:** Mentor networking forum

---

## ✅ Implementation Checklist

- [x] Mentor profile system
- [x] Registration form
- [x] Validation logic
- [x] Admin approval workflow
- [x] Mentor discovery page
- [x] Mentor profiles
- [x] Booking system
- [x] Messaging system
- [ ] Video integration
- [ ] Payment processing
- [ ] Advanced analytics
- [ ] AI matching engine

