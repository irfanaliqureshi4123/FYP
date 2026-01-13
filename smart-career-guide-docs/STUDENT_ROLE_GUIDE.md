# Student Role in SmartCareer Platform

## 🎓 Overview

**Student** is the primary user role in the SmartCareer platform. Students are the core audience who use the platform to:
- Connect with mentors and counsellors
- Explore career paths
- Learn professional skills
- Join schools and universities
- Participate in communities
- Track their academic progress

---

## 👤 Student Profile System

### What is a Student?
A **student** is any user who registers on the platform without becoming a counsellor or mentor. Students are:
- ✅ Learning professionals
- ✅ Seeking career guidance
- ✅ Building skills
- ✅ Exploring educational opportunities
- ✅ Connecting with mentors and peers

### How Students Register

**Option 1: Quick Sign Up**
```
Visit Platform
    ↓
Click "Register" or "Sign Up"
    ↓
Fill Registration Form:
  - Full Name
  - Email Address
  - Create Username
  - Set Password (8+ chars, uppercase, number)
  - Confirm Password
  - Accept Terms & Conditions
    ↓
Click "Create Account"
    ↓
Auto-login to Dashboard
    ↓
User role = "student"
```

**Option 2: Social Login (Future)**
- [ ] Google Sign In
- [ ] LinkedIn Sign In
- [ ] GitHub Sign In

### Student Data Structure

```javascript
{
  // Authentication
  id: 1,
  username: "alexjones",
  email: "alex@example.com",
  password: "hashed_password",
  role: "student",  // Identifies as student
  
  // Profile
  name: "Alex Jones",
  avatar: "profile-image.jpg",
  coverImage: "banner-image.jpg",
  title: "Computer Science Student",
  bio: "Passionate about AI and web development",
  location: "New York, NY",
  website: "https://alexjones.com",
  
  // Academic Info
  school: null,  // Can join school later
  university: null,  // Can join university later
  grade: "3rd Year",
  studyField: "Computer Science",
  
  // Career Development
  skills: ["Python", "React", "UI Design"],
  interests: ["Tech", "AI", "Startups"],
  careerGoals: ["Become Product Manager", "Start a Tech Company"],
  
  // Social
  followers: 150,
  following: 320,
  posts: 45,
  achievements: [],
  
  // Engagement
  counsellorStatus: "none",  // Can apply to become counsellor
  mentorStatus: "none",  // Can apply to become mentor
  verified: false,
  online: true,
  
  // Metadata
  createdAt: "2024-01-10",
  lastLogin: "2024-01-11"
}
```

---

## 📋 Student Profile Fields

### Required During Registration
- ✅ Full Name (2+ characters)
- ✅ Email (valid format, unique)
- ✅ Username (3+ alphanumeric, unique)
- ✅ Password (8+ chars, uppercase, number)
- ✅ Terms acceptance

### Optional (Can Add Later)
- 📷 Profile Photo
- 📸 Cover Image
- 👔 Professional Title
- 📝 Bio
- 📍 Location
- 🌐 Website
- 💼 Job Title
- 🎓 School/University
- 📚 Skills
- 💡 Interests
- 🎯 Career Goals
- 🏆 Achievements

---

## 📱 Student Dashboard

After logging in, students see:

### Main Feed
```
┌─────────────────────────────────────┐
│ 🏠 Home Feed                         │
│                                     │
│ Posts from:                         │
│ • Mentors they follow              │
│ • Schools they joined              │
│ • Peers in their network           │
│ • Trending topics                  │
│                                     │
│ [Post Composer]                    │
│ [Posts with like/comment/share]    │
└─────────────────────────────────────┘
```

### Sidebar Sections
1. **Explore**
   - Discovery of people, schools, universities
   - Trending topics and discussions
   - Career resources

2. **Careers**
   - Career paths and roadmaps
   - Job opportunities
   - Company profiles

3. **Counselling**
   - Browse counsellors
   - Book sessions
   - Send messages

4. **Mentors** (NEW)
   - Find mentors by specialization
   - View mentor profiles
   - Book mentoring sessions
   - Track progress

5. **Skills**
   - Skill recommendations
   - Learning paths
   - Certifications

6. **Resources**
   - Educational materials
   - Templates
   - Guides

7. **Messages**
   - Chat with mentors
   - Chat with counsellors
   - Chat with peers

8. **Notifications**
   - Session reminders
   - New messages
   - Posts from follows

---

## 🎯 Student Activities

### 1. Build Your Profile
```
Step 1: Add Profile Photo
  - Click Edit Profile
  - Upload professional photo
  - Save changes

Step 2: Add Bio & Info
  - Add professional title
  - Write compelling bio (100+ chars)
  - Add location
  - Add website

Step 3: Add Skills
  - Add tech skills (React, Python, etc.)
  - Add soft skills (Leadership, Communication)
  - Organize by expertise level

Step 4: Set Goals
  - Add career goals
  - Add interests
  - Join communities
  
Profile Completion: 
  - 25% with basic info
  - 50% with profile photo + bio
  - 75% with skills
  - 100% with goals + achievements
```

### 2. Find & Work with Mentors
```
Browse Mentors:
  ├─ Go to /mentors page
  ├─ Filter by specialization
  ├─ Sort by rating
  └─ View profiles

Evaluate Mentor:
  ├─ Check credentials
  ├─ Read reviews
  ├─ Check hourly rate
  └─ View availability

Connect:
  ├─ Send message to mentor
  ├─ Schedule consultation call
  ├─ Book mentoring session
  └─ Discuss goals

Engage:
  ├─ Regular 1-on-1 meetings
  ├─ Get personalized guidance
  ├─ Track progress
  └─ Build long-term relationship
```

### 3. Book Counselling Sessions
```
Find Counsellor:
  ├─ Go to /counselling
  ├─ Filter by specialization
  ├─ View availability
  └─ Check rates

Book Session:
  ├─ Click "Book Session"
  ├─ Select date & time
  ├─ Choose duration (30min-2hrs)
  ├─ Confirm booking
  └─ Receive confirmation email

Attend Session:
  ├─ Join video call link
  ├─ Discuss career goals
  ├─ Get personalized advice
  └─ Receive session notes

Follow Up:
  ├─ Rate counsellor
  ├─ Leave review
  ├─ Book another session if needed
  └─ Implement recommendations
```

### 4. Join Schools & Universities
```
Find School:
  ├─ Browse /school-profile
  ├─ View school info
  ├─ Check announcements
  └─ See classes

Join School:
  ├─ Click "Join School"
  ├─ View school groups
  └─ Access classes

Access Classes:
  ├─ View class assignments
  ├─ Submit assignments
  ├─ Participate in discussions
  ├─ Download resources
  └─ View class schedule

Find University:
  ├─ Browse /university-profile
  ├─ View faculty directory
  ├─ Check events
  └─ Join university community
```

### 5. Develop Skills
```
Explore Skills:
  ├─ Go to /skills page
  ├─ Browse by category
  ├─ View learning paths
  └─ Check prerequisites

Learn Skills:
  ├─ Find tutorials
  ├─ Complete mini-courses
  ├─ Work on projects
  └─ Get feedback

Track Progress:
  ├─ Add skills to profile
  ├─ Get recognized
  ├─ Earn badges
  └─ Share achievements

Get Mentorship:
  ├─ Find mentor with that skill
  ├─ Book sessions
  ├─ Practice with guidance
  └─ Accelerate learning
```

### 6. Explore Career Paths
```
Discover Careers:
  ├─ Go to /careers
  ├─ Browse job descriptions
  ├─ View career paths
  └─ See skill requirements

Plan Your Path:
  ├─ Identify target career
  ├─ Check required skills
  ├─ Find learning resources
  └─ Set milestones

Connect with Professionals:
  ├─ Find mentors in that field
  ├─ Follow industry leaders
  ├─ Join relevant communities
  └─ Attend events

Track Progress:
  ├─ Monitor skill development
  ├─ Apply to internships
  ├─ Network with professionals
  └─ Update goals regularly
```

### 7. Engage in Community
```
Create Posts:
  ├─ Share thoughts
  ├─ Ask questions
  ├─ Post job opportunities
  └─ Share resources

Comment & Discuss:
  ├─ Comment on posts
  ├─ Join discussions
  ├─ Share opinions
  └─ Help peers

Follow & Network:
  ├─ Follow mentors
  ├─ Follow interesting people
  ├─ Join groups
  └─ Participate in events

Show Expertise:
  ├─ Answer questions
  ├─ Share knowledge
  ├─ Help community
  └─ Build reputation
```

---

## 🔄 Student Progression Path

### Stage 1: New Student (Days 1-7)
- ✅ Complete registration
- ✅ Set up basic profile
- ✅ Explore platform
- ✅ Follow mentors and counsellors

### Stage 2: Active Student (Weeks 2-4)
- ✅ Add detailed profile info
- ✅ Book first counselling session
- ✅ Connect with 2-3 mentors
- ✅ Join school/university

### Stage 3: Engaged Student (Months 2-3)
- ✅ Complete skills development
- ✅ Attend multiple mentoring sessions
- ✅ Participate in community
- ✅ Complete assignments/projects

### Stage 4: Established Student (Months 4+)
- ✅ Build comprehensive profile
- ✅ Become community contributor
- ✅ Have strong mentor relationships
- ✅ Ready to become counsellor/mentor

---

## 🎯 Transitioning to Mentor or Counsellor

### Becoming a Counsellor

**Requirements:**
- ✅ Student profile at least 2 months old
- ✅ 3+ years professional experience
- ✅ Verified credentials
- ✅ Complete application
- ✅ Admin approval

**Steps:**
```
1. Go to /counselling
2. Click "Register as Counsellor"
3. Fill detailed form:
   - Professional title
   - Specialization
   - Years of experience
   - Bio
   - Hourly rate
   - Certifications
   - Availability
4. Submit application
5. Wait for admin review (2-3 days)
6. Once approved → becomes visible to students
```

**Benefits:**
- 💰 Earn money from sessions
- 📈 Build reputation as expert
- 👥 Help students directly
- 🏆 Get verified badge
- 📊 Access analytics dashboard

### Becoming a Mentor

**Requirements:**
- ✅ Student profile at least 1-2 months old
- ✅ 5+ years professional experience (recommended)
- ✅ Expertise in specific domain
- ✅ Verified credentials
- ✅ Community involvement
- ✅ Admin approval

**Steps:**
```
1. Visit "Become a Mentor" section
2. Fill mentor application:
   - Professional title
   - Specialization
   - Years of experience
   - Mentorship areas
   - Success stories
   - Certifications
   - Languages
3. Submit application
4. Admin verification (3-5 days)
5. Once approved → appears in mentor directory
```

**Benefits:**
- 💰 Premium hourly rates ($65-$85+)
- 📈 Visibility in mentor directory
- 👥 Long-term mentee relationships
- 🏆 Verified mentor badge
- 📊 Mentee success tracking
- 🌟 Premium features

---

## 📊 Student Dashboard Sections

### Home Feed
- News from follows
- Posts from schools
- Trending topics
- Recommended people

### Profile
- View own profile
- Edit profile
- Update skills
- Add achievements
- View followers

### Explore
- Discover people
- Browse schools
- Discover universities
- Find resources
- Trending topics

### Careers
- Browse careers
- View roadmaps
- Find job openings
- Connect with professionals
- Track career goals

### Counselling
- Browse counsellors
- Book sessions
- Chat with counsellors
- Rate/review counsellors
- View session history

### Mentors
- Browse mentors
- Filter by specialization
- View profiles
- Book sessions
- Chat with mentors
- Track mentorship

### Skills
- View skill recommendations
- Browse learning paths
- Track skill progress
- Get badges
- Share achievements

### Resources
- Find tutorials
- Download guides
- Access templates
- Share resources
- Find courses

### Messages
- Chat with mentors
- Chat with counsellors
- Chat with peers
- Group chats
- Search messages

### Notifications
- Message alerts
- Session reminders
- Post likes/comments
- New followers
- Achievements

### Settings
- Update profile
- Change password
- Privacy settings
- Notification preferences
- Account security
- Connected apps
- Data privacy
- Deactivate account

---

## 🔐 Student Privacy & Security

### Profile Visibility
- **Public:** Name, title, bio, skills, achievements
- **Private:** Email, phone, personal info
- **Connected Only:** Messages, achievements, goals

### Privacy Controls
- ✅ Private/Public profile toggle
- ✅ Control who can message
- ✅ Control who can see activity
- ✅ Block users
- ✅ Hide profile from search

### Data Protection
- ✅ Encrypted passwords
- ✅ Secure session storage
- ✅ Two-factor authentication (optional)
- ✅ Data export available
- ✅ Account deletion option

---

## 💡 Tips for Students

### Getting Started
1. **Complete your profile** - Higher completion = more visibility
2. **Add a real photo** - Builds trust with mentors/counsellors
3. **Write a compelling bio** - Showcase your goals and interests
4. **Add skills** - Let mentors know your expertise level

### Finding Right Mentor
1. **Check specialization** - Matches your learning goals
2. **Review ratings** - Look for 4.5+ stars
3. **Read reviews** - See what other mentees say
4. **Check availability** - Make sure they match your schedule
5. **Message first** - See if you connect well

### Maximizing Learning
1. **Set clear goals** - Know what you want to learn
2. **Be consistent** - Regular sessions > irregular ones
3. **Take notes** - Document learnings
4. **Implement advice** - Apply what you learn
5. **Give feedback** - Help your mentor help you

### Building Network
1. **Follow relevant people** - Mentors, counsellors, peers
2. **Engage in discussions** - Comment and help others
3. **Share knowledge** - Answer questions when you can
4. **Attend events** - Networking opportunities
5. **Be genuine** - Build real relationships

---

## 📞 Support & Resources

### Getting Help
- **FAQ:** Visit help center
- **Chat Support:** In-app chat
- **Email:** support@smartcareer.com
- **Community Forum:** Ask peers

### Resources for Students
- Student guide and tutorials
- FAQ and troubleshooting
- Video walkthroughs
- Community forum
- Mentorship tips
- Career planning guides

---

## ✅ Student Registration Checklist

### Initial Setup (Required)
- [ ] Email address
- [ ] Valid username
- [ ] Strong password
- [ ] Accept terms & conditions

### Profile Completion (Recommended)
- [ ] Add profile photo
- [ ] Add professional title
- [ ] Write bio
- [ ] Add location
- [ ] Add website

### Career Development (Optional)
- [ ] Add skills
- [ ] Add interests
- [ ] Set career goals
- [ ] Join school
- [ ] Join university

### First Actions
- [ ] Explore /mentors page
- [ ] Browse /counselling page
- [ ] Follow 5-10 people
- [ ] Connect with 1 mentor
- [ ] Book 1 counselling session

---

## 🎓 Sample Student Profiles

### Profile 1: Alex Jones
- Title: Computer Science Student (3rd Year)
- School: Stanford University
- Skills: Python, React, UI Design, Problem Solving
- Interests: AI, Web Development, Startups
- Goals: Become Product Manager, Start Tech Company
- Followers: 150
- Mentors: 2 (Software Engineer, Product Manager)

### Profile 2: Priya Patel
- Title: Data Science Aspirant
- School: IIT Delhi
- Skills: SQL, Python, Excel, Tableau, Statistics
- Interests: Data Science, Business Analytics, AI
- Goals: Land Data Science role at top company
- Followers: 320
- Mentors: 1 (Data Science Lead)

### Profile 3: Marcus Chen
- Title: Design & UX Student
- School: Rhode Island School of Design
- Skills: Figma, UI/UX, Prototyping, Graphic Design
- Interests: Product Design, Digital Art
- Goals: Work at top tech company, freelance design
- Followers: 240
- Mentors: 1 (Senior Product Designer)

---

## 🚀 Next Steps for Students

1. **Register** on the platform
2. **Complete profile** (50% = visible to mentors)
3. **Browse mentors** in your field
4. **Book a consultation** with a mentor
5. **Start learning** and building your network
6. **Track progress** with goals
7. **Share achievements** and help peers
8. **Grow your network** and community presence
9. **(Optional) Become a counsellor/mentor** after 1-2 years of active participation

