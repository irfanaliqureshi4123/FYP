# Mentor & Counsellor Role System - SmartCareer Platform

## 📋 Overview

The SmartCareer platform has two professional roles for experienced professionals:
1. **Career Counsellor** - Career guidance and coaching
2. **Mentor** - Professional mentorship and skill development

This document describes the mentor role system and registration process.

---

## 🎯 Mentor Role Definition

### What is a Mentor?

A **Mentor** is an experienced professional who provides guidance, knowledge transfer, and career mentorship to mentees (learners). Mentors help users:
- Develop professional skills
- Navigate career transitions
- Gain industry insights
- Build professional networks
- Accelerate career growth

### Mentor vs Counsellor

| Aspect | Mentor | Counsellor |
|--------|--------|-----------|
| **Focus** | Skill development, knowledge transfer | Career guidance, personal coaching |
| **Engagement** | Ongoing relationships | Session-based consultations |
| **Duration** | Long-term (months to years) | Short-term (hourly sessions) |
| **Cost Model** | Flexible (often free/low-cost initially) | Hourly billing |
| **Expertise** | Deep technical/industry expertise | Career psychology, guidance |
| **Interaction** | Mentoring, discussions, projects | Counseling, planning, goal-setting |

---

## 📊 Mentor Profile Fields

Each mentor maintains a comprehensive profile with:

### Basic Information
- **Name** - Full professional name
- **Title** - Current job title (e.g., "Senior Product Manager")
- **Company** - Current employer
- **Avatar** - Professional photo

### Professional Details
- **Expertise** - Primary areas of knowledge (tags)
  - Examples: "Product Strategy", "User Research", "Growth"
- **Specializations** - Industry focus
  - Tech, Finance, Design, Healthcare, Education, Entrepreneurship, etc.
- **Years of Experience** - Total career experience
- **Bio** - Professional background summary

### Service Details
- **Availability** - When mentor can meet (e.g., "Weekends only")
- **Response Time** - How quickly they typically respond (e.g., "2 hours")
- **Hourly Rate** - Optional session fee (USD)
- **Languages** - Languages spoken (English, Mandarin, Spanish, etc.)

### Credentials & Trust
- **Certifications** - Professional credentials and certifications
- **Verified Badge** - Platform verification status
- **Mentees Count** - Number of current/past mentees
- **Rating** - Average mentee satisfaction (1-5 stars)
- **Reviews** - Number of mentee reviews

---

## 🚀 How to Register as a Mentor

### Step 1: Access Registration
**Location:** Career Counselling Page (`/counselling`)
- Click **"Register as Counsellor"** button (same registration flow)
- Opens modal with registration form

### Step 2: Fill Profile Information

#### Required Fields (marked with *)
1. **Profile Image** - Upload professional photo
2. **Full Name** - Your name as it should appear
3. **Email** - Contact email for verification
4. **Phone** - Contact phone number
5. **Professional Title** - Your job title
6. **Specialization** - Select primary field
   - Tech & IT
   - Finance & Business
   - Design, Arts & Media
   - Medical & Healthcare
   - Education & Research
   - Entrepreneurship
   - Human Resources
   - Engineering
7. **Professional Bio** - Describe your experience and expertise
8. **Years of Experience** - Total years in field
9. **Hourly Fees** - Session rate (USD)
10. **Availability** - When you can meet mentees
11. **Certifications** - Add any relevant credentials
12. **Languages** - Select languages you speak

### Step 3: Validate Information
- System validates all required fields
- Checks email format
- Verifies phone format
- Ensures at least 1 certification
- Confirms at least 1 language

### Step 4: Submit Application
- Click **"Submit Registration"**
- Application enters review queue
- Success confirmation message shown

### Step 5: Admin Review & Approval
- **Admin checks:**
  - Profile completeness
  - Professional credentials
  - Background verification
  - Expertise validation
- **Timeline:** 2-3 business days typically
- **Notification:** Email sent to registered email address

### Step 6: Account Activation
- **After approval:**
  - Mentor profile becomes visible
  - Can be discovered by mentees
  - Can receive mentorship requests
  - Access mentor dashboard
  - Manage mentees and sessions

---

## 💡 Mentor Registration Features

### Real-Time Validation
- ✅ Email format validation
- ✅ Phone number validation
- ✅ Required field checking
- ✅ Certification management (add/remove)
- ✅ Language selection (multiple allowed)

### Media Upload
- Profile image upload with preview
- Supported formats: JPG, PNG, WebP
- Automatic optimization

### Form State Management
- Auto-save functionality (context-based)
- Error highlighting
- Success/error notifications
- Modal state preservation

### Application Tracking
- `counsellorApplications` stored in AppContext
- Status tracking: pending → approved → rejected
- Timestamp of submission
- Email notifications on status change

---

## 📱 Mentor Discovery & Matching

### How Mentees Find Mentors
1. **Browse Mentors Page** (`/mentors`)
   - View all available mentors
   - Filter by specialization
   - See ratings and reviews

2. **Mentor Profile Card Shows:**
   - Professional photo and name
   - Title and company
   - Expertise tags
   - Rating (stars) and review count
   - Response time
   - Mentees count
   - Hourly rate
   - Availability
   - Languages spoken

3. **Action Buttons:**
   - **Book Session** - Schedule mentoring session
   - **Message** - Send direct message

### Session Booking
- Mentees select date, time, duration
- View mentor's calendar availability
- Receive booking confirmation
- Auto-notification to mentor

---

## 🎓 Mentor Dashboard Features

After approval, mentors access dashboard with:

### Profile Management
- Edit profile information
- Update availability
- Manage certifications
- Add expertise tags
- Upload testimonials

### Mentee Management
- View active mentees
- Track mentee progress
- Schedule sessions
- Message mentees
- Provide feedback

### Session Management
- Upcoming sessions calendar
- Session history
- Session notes
- Performance tracking
- Billing/payment tracking

### Analytics
- Total mentees
- Session count
- Average rating
- Earnings (if applicable)
- Mentee success stories

### Settings
- Availability preferences
- Notification preferences
- Cancellation policy
- Response time targets
- Language preferences

---

## ✅ Quality Assurance

### Verification Process
- ✅ Email verification
- ✅ Phone verification
- ✅ Professional credential checks
- ✅ Background verification
- ✅ Reviews and ratings monitoring

### Ongoing Quality
- Mentee ratings and reviews
- Regular profile updates required
- Community guideline compliance
- Professional conduct standards
- Response time monitoring

---

## 🔒 Mentor Responsibilities

### Professional Standards
- Maintain professional communication
- Respect mentee privacy
- Provide quality guidance
- Respond within advertised timeframe
- Keep accurate session records

### Code of Conduct
- No harassment or discrimination
- Respect confidentiality
- Avoid conflicts of interest
- Provide honest feedback
- Support mentee development

### Community Guidelines
- Follow platform policies
- No spam or marketing
- Honest profile information
- Fair pricing
- Quality content

---

## 💰 Monetization Model

### For Mentors
- **Hourly Rates:** Set your own rates (USD)
- **Session-Based:** Earn per mentoring session
- **Revenue Share:** Platform takes 20-30% commission
- **Payment:** Monthly payouts to bank account
- **Premium Features:** Optional premium mentor badge

### For Mentees
- **Free Browsing:** Find and view mentor profiles
- **Paid Sessions:** Pay per mentoring hour
- **Subscription:** Optional monthly mentorship package
- **Referral Rewards:** Earn credits for referrals

---

## 🚦 Application Status Flow

```
Registration Submitted
         ↓
    [PENDING] - Under Review (2-3 days)
         ↓
    [APPROVED] - Profile Active
         ↓
    [VISIBLE] - Discoverable by Mentees
         
    OR
    
    [REJECTED] - Not Approved
         ↓
    [FEEDBACK] - Reason provided
         ↓
    [REAPPLY] - Can resubmit after fixes
```

---

## 📞 Mentor Support

### Getting Help
- **FAQ** - Comprehensive mentor guide
- **Email Support** - mentors@smartcareer.com
- **Help Center** - Mentor resources
- **Community** - Mentor networking group

### Common Issues
- Profile not appearing? Wait 2-3 days for approval
- Low response time? Update availability settings
- Booking issues? Check calendar sync
- Payment problems? Contact support

---

## 🎯 Implementation Roadmap

### Phase 1: Core Mentor System (Current)
- ✅ Mentor profiles
- ✅ Registration process
- ✅ Admin approval workflow
- ✅ Discovery and browsing

### Phase 2: Enhanced Mentoring
- 📅 Session scheduling
- 📅 Video conferencing integration
- 📅 Mentee progress tracking
- 📅 Skills assessment

### Phase 3: Advanced Features
- 📅 Group mentoring
- 📅 Mentorship programs
- 📅 Certification courses
- 📅 AI-based matching

### Phase 4: Premium Features
- 📅 Premium mentor badges
- 📅 Verified certification
- 📅 Enhanced visibility
- 📅 Priority support

---

## 🔗 Related Pages

- **Mentors Page:** `/mentors` - Browse all mentors
- **Mentor Profile:** `/mentors/:id` - Individual mentor details
- **Career Counselling:** `/counselling` - Counsellor registration
- **Booking:** `/counselling/booking/:id` - Schedule sessions
- **Messages:** `/messages` - Direct messaging with mentors

---

## 📊 Current Mentor Database

The platform currently has **8 verified mentors** from various industries:
1. Sarah Chen - Senior Product Manager @ Google
2. James Wilson - Full Stack Engineer @ Meta
3. Priya Patel - Data Science Lead @ Netflix
4. Michael Zhang - UX Designer @ Apple
5. Emily Rodriguez - Financial Analyst @ Goldman Sachs
6. David Kim - Marketing Manager @ Amazon
7. Sophia Lee - HR Director @ Microsoft
8. James Brown - Business Consultant @ McKinsey

---

## 🎨 UI Components Used

- **Registration Modal:** `RegisterAsCounsellorModal`
- **Mentor Card:** Custom card component
- **Session Booking:** `BookingModal`
- **Messaging:** Direct message interface
- **Rating Display:** Star ratings with review count
- **Availability Badge:** Time-based availability display

---

## 📝 Notes

- Mentor system is integrated with Counsellor system (shares registration flow)
- Plans to create separate "Register as Mentor" option in future
- Mentor approval can be automated with credentials API integration
- Session payments handled via Stripe integration (future phase)
- Video integration with Zoom or Google Meet (future phase)

