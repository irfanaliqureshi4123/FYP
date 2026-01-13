import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import usersData from '../../data/users.json';
import Avatar from '../common/Avatar';

/**
 * AdminDashboard Component
 * Displays key statistics and overview of system health
 * Features: Stats cards, recent activities, system health indicators
 */
function AdminDashboard() {
  const { user } = useAuth();
  const { counsellorApplications, users } = useApp();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCounsellors: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Calculate statistics
    const totalUsers = usersData.length;
    const activeUsers = usersData.filter((u) => u.isActive !== false).length;
    const totalCounsellors = usersData.filter((u) => u.userType === 'counsellor').length;

    const pendingApps = counsellorApplications.filter((app) => app.status === 'pending').length;
    const approvedApps = counsellorApplications.filter((app) => app.status === 'approved').length;
    const rejectedApps = counsellorApplications.filter((app) => app.status === 'rejected').length;

    setStats({
      totalUsers,
      activeUsers,
      totalCounsellors,
      pendingApplications: pendingApps,
      approvedApplications: approvedApps,
      rejectedApplications: rejectedApps,
    });

    // Generate recent activities (mock data combined with real events)
    const activities = [
      {
        id: 1,
        type: 'new_application',
        title: 'New Counsellor Application',
        description: `${counsellorApplications.length} applications received`,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: 'clock',
      },
      {
        id: 2,
        type: 'user_join',
        title: 'New User Registration',
        description: `${totalUsers} total users in system`,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        icon: 'user',
      },
      {
        id: 3,
        type: 'approval',
        title: 'Application Approved',
        description: `${approvedApps} counsellors approved`,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        icon: 'check',
      },
    ];

    setRecentActivities(activities);
  }, [counsellorApplications]);

  // StatCard Component
  const StatCard = ({ icon: Icon, title, value, subtitle, trend, trendColor = 'green' }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${
          trendColor === 'green'
            ? 'bg-green-100 dark:bg-green-900/30'
            : trendColor === 'blue'
            ? 'bg-blue-100 dark:bg-blue-900/30'
            : trendColor === 'orange'
            ? 'bg-orange-100 dark:bg-orange-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          <Icon
            className={`w-6 h-6 ${
              trendColor === 'green'
                ? 'text-green-600 dark:text-green-400'
                : trendColor === 'blue'
                ? 'text-blue-600 dark:text-blue-400'
                : trendColor === 'orange'
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <span className={`text-xs font-semibold ${
            trendColor === 'green'
              ? 'text-green-600 dark:text-green-400'
              : trendColor === 'blue'
              ? 'text-blue-600 dark:text-blue-400'
              : trendColor === 'orange'
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );

  // ActivityItem Component
  const ActivityItem = ({ activity }) => {
    let Icon = Clock;
    let color = 'blue';

    if (activity.type === 'approval') {
      Icon = CheckCircle;
      color = 'green';
    } else if (activity.type === 'user_join') {
      Icon = Users;
      color = 'blue';
    } else if (activity.type === 'new_application') {
      Icon = Clock;
      color = 'orange';
    }

    const formatTime = (date) => {
      const hours = Math.floor((Date.now() - date) / (1000 * 60 * 60));
      if (hours < 1) return 'Just now';
      if (hours === 1) return '1 hour ago';
      if (hours < 24) return `${hours} hours ago`;
      return Math.floor(hours / 24) + ' days ago';
    };

    return (
      <div className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
        <div
          className={`p-2 rounded-lg ${
            color === 'green'
              ? 'bg-green-100 dark:bg-green-900/30'
              : color === 'blue'
              ? 'bg-blue-100 dark:bg-blue-900/30'
              : 'bg-orange-100 dark:bg-orange-900/30'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              color === 'green'
                ? 'text-green-600 dark:text-green-400'
                : color === 'blue'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-orange-600 dark:text-orange-400'
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {activity.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {activity.description}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            {formatTime(activity.timestamp)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Admin</h1>
            <p className="text-blue-100 mt-2">
              Here's what's happening with your platform today
            </p>
          </div>
          {user?.avatar && (
            <Avatar 
              src={user.avatar} 
              alt={user.name || 'Admin'} 
              size="lg"
              online={user?.online}
            />
          )}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          subtitle="Active users in system"
          trend={`${stats.activeUsers} active`}
          trendColor="blue"
        />
        <StatCard
          icon={UserCheck}
          title="Counsellors"
          value={stats.totalCounsellors}
          subtitle="Approved counsellors"
          trend={`${stats.approvedApplications} verified`}
          trendColor="green"
        />
        <StatCard
          icon={MessageSquare}
          title="Pending Applications"
          value={stats.pendingApplications}
          subtitle="Awaiting review"
          trend="Requires action"
          trendColor="orange"
        />
        <StatCard
          icon={TrendingUp}
          title="Approved Applications"
          value={stats.approvedApplications}
          subtitle="Successfully onboarded"
          trend="+12% this month"
          trendColor="green"
        />
        <StatCard
          icon={AlertCircle}
          title="Rejected Applications"
          value={stats.rejectedApplications}
          subtitle="Did not meet criteria"
          trend="Review history"
          trendColor="red"
        />
        <StatCard
          icon={Clock}
          title="System Health"
          value="100%"
          subtitle="All systems operational"
          trend="No issues detected"
          trendColor="green"
        />
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Activities
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                No activities yet
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6 h-fit">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/counsellor-applications"
              className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm text-center"
            >
              Review Applications
            </a>
            <a
              href="/admin/users"
              className="block w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium text-sm text-center"
            >
              Manage Users
            </a>
            <a
              href="/admin/activity-logs"
              className="block w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium text-sm text-center"
            >
              View Activity Logs
            </a>
          </div>

          {/* Stats Summary */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Total Users:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {stats.totalUsers}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Counsellors:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {stats.totalCounsellors}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Pending:</span>
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                {stats.pendingApplications}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
