# Career Connect - Smart Career Guidance Platform

A modern, production-ready React application for career guidance and professional networking. Built with React 18, Tailwind CSS, and React Router.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## ✨ Features

### Core Functionality
- **Home Feed**: Post composer with character counter, real-time feed, like/comment/save interactions
- **Explore**: Discover careers, skills, mentors with tabbed interface and search
- **Profile**: User profiles with cover images, bio, skills, achievements, and activity tabs
- **Messages**: Real-time messaging interface with conversation list
- **Notifications**: Notification center with filtering and mark-as-read functionality
- **Saved Posts**: Bookmark and organize important posts
- **Settings**: Comprehensive settings for profile, theme, notifications, and privacy

### UI/UX Features
- **Theme Toggle**: Seamless dark/light mode with localStorage persistence
- **Responsive Design**: Mobile-first design that works on all devices
- **Interactive Components**: Hover effects, smooth transitions, loading states
- **Real-time Updates**: Like, save, follow interactions with instant feedback
- **Smart Recommendations**: AI-powered career suggestions based on interests

## 🛠️ Tech Stack

- **React 18**: Latest React with hooks and functional components
- **React Router v6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Context API**: Global state management
- **Vite**: Lightning-fast build tool

## 📁 Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI components (Button, Avatar, Badge, etc.)
│   ├── layout/         # Layout components (Sidebar, Navbar, MainLayout)
│   ├── posts/          # Post-related components (PostCard, PostComposer)
│   ├── profile/        # Profile components
│   ├── messages/       # Messaging components
│   └── widgets/        # Sidebar widgets
├── pages/              # Route pages (Home, Explore, Profile, etc.)
├── context/            # React Context providers (Auth, Theme, App)
├── data/               # Mock JSON data
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles and Tailwind directives
```

## 🎨 Key Components

### Common Components
- `Button`: Multiple variants (primary, secondary, ghost, outline), sizes, loading states
- `Avatar`: User profile pictures with size variants and online indicators
- `Badge`: Skill tags and labels with color variants
- `Input`: Form inputs with labels, errors, and textarea support
- `Modal`: Reusable modal dialogs
- `Loader & EmptyState`: Loading and no-content states

### Layout Components
- `Sidebar`: Left navigation with mobile-responsive menu
- `Navbar`: Top bar with search, theme toggle, and notifications
- `RightSidebar`: Career assistant and recommendations
- `MainLayout`: Three-column responsive layout

### Feature Components
- `PostCard`: Complete post UI with interactions
- `PostComposer`: Create posts with character counter
- Career cards, skill cards, mentor cards
- Message threads and chat windows
- Notification items

## 🔑 Core Features Explained

### State Management
Uses React Context API for:
- **AuthContext**: Current user authentication
- **ThemeContext**: Dark/light mode with localStorage
- **AppContext**: Posts, likes, saves, follows, notifications

### Mock Data
Realistic mock data for:
- Users (5 diverse professionals)
- Posts (7 career-related posts with various content types)
- Careers (10 career paths with salaries and skills)
- Skills (15 skills with difficulty levels)
- Messages (conversation threads)
- Notifications (various notification types)

### Routing
- `/` - Home feed
- `/explore` - Discover careers, skills, mentors
- `/profile/:username` - User profiles
- `/messages` - Messaging interface
- `/notifications` - Notification center
- `/saved` - Saved posts
- `/settings` - User settings

## 🎯 Design Principles

- **Modern & Professional**: Clean UI suitable for career networking
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Accessible**: WCAG-compliant with keyboard navigation
- **Performance**: Optimized with lazy loading and efficient re-renders
- **Scalable**: Modular architecture for easy feature additions

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column, bottom nav)
- **Tablet**: 768px - 1024px (two-column layout)
- **Desktop**: > 1024px (full three-column layout)

## 🌈 Theme System

Light and dark modes with:
- Custom color palette (primary blue, accent purple)
- Smooth transitions between themes
- localStorage persistence
- CSS variables for easy customization

## 🔮 Future Enhancements

- Real backend integration
- WebSocket for real-time messaging
- Advanced search with filters
- Email notifications
- Profile verification
- Analytics dashboard
- Career path visualization
- Learning resources integration

## 📄 License

This project is part of a career guidance platform demonstration.

---

**Built with ❤️ for modern career development**
