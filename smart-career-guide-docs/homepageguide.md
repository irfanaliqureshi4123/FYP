# Career Platform - Backend & Database Requirements

## Overview
This document lists all features of the Home page and related components to guide backend development and database schema design.

---

## 1. POST MANAGEMENT

### 1.1 Post Creation (PostComposer)
**Features:**
- Create new posts with text content
- Add images (single or multiple)
- Character limit: 500 characters
- Location selection (Country → State → City)
- Emoji picker integration
- Poll creation with multiple options
- Poll duration (unlimited or timed: 1h, 3h, 6h, 12h, 24h, 3 days, 7 days)
- Hashtag extraction and storage
- Post visibility: public/private
- Comments enabled/disabled toggle

**Data to Store:**
```
POST TABLE:
- id (primary key)
- userId (foreign key)
- username
- name
- avatar (URL)
- verified (boolean)
- content (text, max 500 chars)
- image (single URL or JSON array for multiple)
- timestamp (ISO 8601)
- likes (count)
- comments (count)
- shares (count)
- hashtags (array or JSON)
- type (post/poll)
- visibility (public/private/followers-only)
- commentsDisabled (boolean)
- isPinned (boolean - by owner)
- location (JSON object with: city, state, country, countryCode, stateCode)
- createdAt
- updatedAt
```

### 1.2 Post Display (PostCard)
**Features:**
- Display post content with hashtag highlighting
- Show author avatar, name, verification badge
- Display location with map icon
- Show post timestamp (formatted as "2 hours ago")
- Display images (single or carousel with multiple)
- Like/Unlike functionality (heart icon)
- Save/Unsave functionality (bookmark icon)
- Comment section (expandable)
- Share post (multiple platforms: Twitter, LinkedIn, Facebook, WhatsApp, Email)
- Three-dots menu for actions
- Poll voting functionality
- User online status indicator

**Interactive Features:**
- Inline edit post content and images
- Delete post with confirmation modal
- Pin/Unpin post
- Change post visibility
- Toggle comments enabled/disabled
- Mute/Unmute user
- Report post (with report type selection)

### 1.3 Post Interactions
**Features:**
- Like/Unlike posts
- Save/Unsave posts to bookmarks
- Comment on posts
- Reply to comments
- Delete comments
- View comment count

**Data to Store:**
```
LIKES TABLE:
- id
- postId (foreign key)
- userId (foreign key)
- timestamp

SAVES TABLE:
- id
- postId (foreign key)
- userId (foreign key)
- timestamp

COMMENTS TABLE:
- id
- postId (foreign key)
- userId (foreign key)
- content (text)
- timestamp
- parentCommentId (null for main comments, id for replies)

SHARES TABLE:
- id
- postId (foreign key)
- userId (foreign key)
- platform (twitter/linkedin/facebook/whatsapp/email)
- timestamp
```

---

## 2. POLL SYSTEM

### 2.1 Poll Creation
**Features:**
- Create poll with question
- Add 2-4 poll options
- Set poll duration (default: unlimited)
- Auto-extraction of options from content

**Data to Store:**
```
POLLS TABLE:
- id
- postId (foreign key)
- question (text)
- duration (unlimited/1/3/6/12/24/72)
- createdAt
- expiresAt (nullable for unlimited)

POLL_OPTIONS TABLE:
- id
- pollId (foreign key)
- text (option text)
- displayOrder

POLL_VOTES TABLE:
- id
- pollId (foreign key)
- optionId (foreign key)
- userId (foreign key)
- timestamp
(Ensure one vote per user per poll - use unique constraint)
```

### 2.2 Poll Features
**Features:**
- Vote on single option
- Change/remove vote
- View vote counts and percentages
- See who voted (if public)
- Auto-calculate percentages
- Show remaining time until poll ends

---

## 3. LOCATION FEATURES

### 3.1 Location Selection (Using country-state-city library)
**Features:**
- Select Country (195+ countries)
- Select State/Province for country
- Select City for state
- Search/filter at each step
- Back navigation between steps
- Fallback: Select state as location if no cities available

**Location Data Structure:**
```
{
  city: "Mumbai",
  state: "Maharashtra", 
  country: "India",
  countryCode: "IN",
  stateCode: "MH"
}
```

**Data to Store:**
```
POST_LOCATIONS TABLE:
- postId (foreign key)
- city (text)
- state (text)
- country (text)
- countryCode (varchar 2)
- stateCode (varchar 3)
```

---

## 4. HASHTAG SYSTEM

### 4.1 Hashtag Features
**Features:**
- Auto-extract hashtags from post content
- Clickable hashtags (links to hashtag feed)
- Hashtag highlighting in content
- Search posts by hashtag

**Data to Store:**
```
HASHTAGS TABLE:
- id
- tag (unique, text)
- usage_count (count)
- createdAt

POST_HASHTAGS TABLE:
- postId (foreign key)
- hashtagId (foreign key)
(Many-to-many relationship)
```

---

## 5. EMOJI FEATURES

### 5.1 Emoji Picker
**Features:**
- Search emoji by keyword
- Browse by category
- Skin tone selector
- Recent emoji tracking
- Auto-insert selected emoji into content
- Responsive across all devices (mobile: 320px, tablet: 360px, desktop: 400px)

**Note:** Uses emoji-picker-react package - data stored client-side

---

## 6. USER INTERACTIONS

### 6.1 Follow/Unfollow
**Data to Store:**
```
FOLLOWS TABLE:
- id
- followerId (user_id)
- followingId (user_id)
- timestamp
(Add unique constraint: followerId + followingId)
```

### 6.2 Mute User
**Features:**
- Mute/Unmute user
- Hide muted user's posts from feed
- Muted user list management

**Data to Store:**
```
MUTED_USERS TABLE:
- id
- userId (user_id)
- mutedUserId (user_id)
- timestamp
(Add unique constraint: userId + mutedUserId)
```

### 6.3 Report Content
**Features:**
- Report post with reason
- Report types: spam, harassment, misinformation, inappropriate content, etc.
- Report description
- Track report status (pending/reviewed/resolved)

**Data to Store:**
```
REPORTS TABLE:
- id
- postId (foreign key)
- reportedBy (user_id)
- reportType (enum: spam, harassment, misinformation, inappropriate, other)
- description (text)
- status (pending/reviewed/resolved)
- reviewedBy (admin_id, nullable)
- reviewNotes (text, nullable)
- timestamp
- resolvedAt (nullable)
```

---

## 7. FEED FEATURES

### 7.1 Home Feed
**Features:**
- Display posts in chronological order (newest first)
- Infinite scroll pagination (5 posts per page)
- Loading states
- Empty state when no posts
- Filter out muted users
- Only show posts from followed users (option)

**Data to Store:**
```
FEED_PREFERENCES TABLE:
- id
- userId (foreign key)
- showOnlyFollowing (boolean, default: false)
```

---

## 8. NOTIFICATIONS

### 8.1 Notification Triggers
**Events that create notifications:**
- Post liked
- Post commented
- Comment replied
- User followed
- Post shared
- Poll voted

**Data to Store:**
```
NOTIFICATIONS TABLE:
- id
- userId (user_id receiving notification)
- actorId (user_id performing action)
- type (like/comment/reply/follow/share/vote)
- postId (foreign key, nullable)
- commentId (foreign key, nullable)
- read (boolean)
- timestamp
```

---

## 9. USER PROFILE DATA

### 9.1 User Information Needed
**Fields:**
- id (primary key)
- username (unique)
- name
- avatar (URL)
- verified (boolean)
- online (boolean) - Last seen timestamp
- bio/about
- location (user's home location)
- job title
- company
- website/portfolio
- joinDate

**Data to Store:**
```
USERS TABLE:
- id
- username (unique, varchar 50)
- name (varchar 100)
- email (unique, varchar 255)
- password (hashed)
- avatar (text - URL)
- verified (boolean, default: false)
- bio (text)
- location (varchar 255)
- jobTitle (varchar 100)
- company (varchar 100)
- website (varchar 255)
- createdAt
- updatedAt
- lastSeen (timestamp)
```

---

## 10. SEARCH & FILTERING

### 10.1 Search Features
**Searchable Elements:**
- Posts (by content, hashtags)
- Users (by username, name)
- Hashtags
- Locations (city, country)

**Data Structure:**
```
SEARCH_INDEX TABLE (for performance):
- id
- type (post/user/hashtag/location)
- targetId
- searchContent (full-text indexed)
- timestamp
```

---

## 11. IMAGE HANDLING

### 11.1 Post Images
**Features:**
- Single image per post (or multiple)
- Image upload and storage
- Image URL in posts
- Responsive image display
- Image carousel for multiple images

**Data to Store:**
```
IMAGES TABLE:
- id
- postId (foreign key)
- url (text - S3 or server path)
- displayOrder (for carousel)
- uploadedAt

Or store as JSON array in POST table:
"images": ["url1", "url2", ...]
```

---

## 12. DATA RELATIONSHIPS & CONSTRAINTS

### Database Design Principles
1. **Referential Integrity**: Foreign keys for all relationships
2. **Timestamps**: createdAt, updatedAt for all tables
3. **Unique Constraints**: 
   - username, email (USERS)
   - postId + userId (LIKES - prevent duplicate likes)
   - postId + userId (SAVES)
   - followerId + followingId (FOLLOWS)
   - pollId + userId (POLL_VOTES)
   - userId + mutedUserId (MUTED_USERS)

4. **Indexes**:
   - userId (fast user lookups)
   - postId (fast post lookups)
   - timestamp (chronological sorting)
   - hashtag (fast hashtag search)
   - username (fast user search)

---

## 13. API ENDPOINTS NEEDED

### Posts
- `POST /api/posts` - Create post
- `GET /api/posts` - Get feed (with pagination)
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `DELETE /api/posts/:id/like` - Unlike post
- `POST /api/posts/:id/save` - Save post
- `DELETE /api/posts/:id/save` - Unsave post
- `POST /api/posts/:id/pin` - Pin post
- `PUT /api/posts/:id/visibility` - Update visibility
- `PUT /api/posts/:id/comments` - Toggle comments

### Comments
- `POST /api/posts/:id/comments` - Add comment
- `POST /api/comments/:id/replies` - Add reply
- `DELETE /api/comments/:id` - Delete comment

### Polls
- `POST /api/polls/:id/vote` - Vote on poll
- `GET /api/polls/:id/results` - Get poll results

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user
- `POST /api/users/:id/mute` - Mute user
- `DELETE /api/users/:id/mute` - Unmute user

### Interactions
- `POST /api/posts/:id/share` - Share post
- `POST /api/posts/:id/report` - Report post
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read

### Search
- `GET /api/search?q=query&type=posts|users|hashtags` - Search

---

## 14. AUTHENTICATION & AUTHORIZATION

**Required:**
- User login/signup
- JWT or session-based authentication
- Authorization checks:
  - Only owner can edit/delete their posts
  - Only owner can pin their posts
  - Only authenticated users can like/comment/share
  - Admin can review reports

---

## 15. PERFORMANCE CONSIDERATIONS

1. **Pagination**: Use offset/limit or cursor-based pagination
2. **Caching**: Cache user profiles, popular posts, hashtags
3. **Indexing**: Index frequently searched/filtered columns
4. **Image Optimization**: CDN, compression, responsive sizes
5. **Database Queries**: Eager load related data (N+1 problem)
6. **Rate Limiting**: Prevent abuse (likes, comments, reports)

---

## Summary Table

| Feature | Table | Key Fields | Relationships |
|---------|-------|-----------|---------------|
| Posts | POSTS | id, userId, content, location | Users (FK) |
| Likes | LIKES | postId, userId | Posts (FK), Users (FK) |
| Comments | COMMENTS | postId, userId, content | Posts (FK), Users (FK) |
| Polls | POLLS | postId, question, duration | Posts (FK) |
| Poll Votes | POLL_VOTES | pollId, optionId, userId | Polls (FK), Users (FK) |
| Hashtags | HASHTAGS, POST_HASHTAGS | tag, postId | Posts (FK) |
| Follows | FOLLOWS | followerId, followingId | Users (FK) |
| Mutes | MUTED_USERS | userId, mutedUserId | Users (FK) |
| Reports | REPORTS | postId, reportedBy, reportType | Posts (FK), Users (FK) |
| Notifications | NOTIFICATIONS | userId, type, actorId | Users (FK), Posts (FK) |

---

This document provides everything needed to design the database schema and build the backend APIs for the Career Platform Home page.
