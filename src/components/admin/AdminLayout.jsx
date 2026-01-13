import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  AlertCircle,
  MessageSquare,
  Clock,
  Shield,
  Search,
  Bell,
} from 'lucide-react';

/**
 * AdminLayout Component
 * Main wrapper for admin panel with sidebar navigation
 * Features: Responsive sidebar, active route highlighting, user menu
 */
function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation menu items organized by section
  const navigationItems = [
    {
      section: 'Main',
      items: [
        {
          label: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
        },
        {
          label: 'Users',
          path: '/admin/users',
          icon: Users,
        },
      ],
    },
    {
      section: 'Management',
      items: [
        {
          label: 'Counsellor Applications',
          path: '/admin/counsellor-applications',
          icon: FileText,
        },
        {
          label: 'Mentor Applications',
          path: '/admin/mentor-applications',
          icon: FileText,
        },
        {
          label: 'Activity Logs',
          path: '/admin/activity-logs',
          icon: Clock,
        },
      ],
    },
    {
      section: 'Moderation & Reports',
      items: [
        {
          label: 'Content Moderation',
          path: '/admin/content-moderation',
          icon: AlertCircle,
        },
        {
          label: 'Reports',
          path: '/admin/finance',
          icon: BarChart3,
        },
        {
          label: 'Settings',
          path: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ];

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 overflow-y-auto shadow-lg`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                    Admin
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Control Center
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {navigationItems.map((section) => (
            <div key={section.section}>
              {sidebarOpen && (
                <h3 className="px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  {section.section}
                </h3>
              )}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  if (item.disabled) {
                    return (
                      <div
                        key={item.path}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
                        title="Coming soon"
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span className="text-sm">{item.label}</span>}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        active
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Admin Dashboard
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  SmartCareer Platform Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search admin panel..."
                    className="pl-10 pr-4 py-2 w-64 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Administrator
                  </span>
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Administrator
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        admin@smartcareer.com
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
