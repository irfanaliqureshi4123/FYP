import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  Download,
  Filter,
  Calendar,
} from 'lucide-react';

/**
 * AdminFinancial Component
 * Manages financial data, transactions, revenue tracking, and financial reports
 * Features: Transaction history, revenue analytics, payouts, financial reports
 */
function AdminFinancial() {
  const [timeRange, setTimeRange] = useState('month');
  const [transactionType, setTransactionType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock financial data
  const financialStats = {
    totalRevenue: 125450.5,
    monthlyRevenue: 45230.75,
    pendingPayouts: 12340.0,
    totalUsers: 1850,
    activeTransactions: 234,
  };

  // Mock transactions
  const allTransactions = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      type: ['booking', 'subscription', 'commission', 'refund', 'payout'][i % 5],
      user: `User ${i + 1}`,
      amount: (Math.random() * 500 + 50).toFixed(2),
      status: ['completed', 'pending', 'failed'][i % 3],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      description: [
        'Booking payment for counselling session',
        'Monthly subscription renewal',
        'Commission for referral',
        'Refund processed',
        'Payout to counsellor',
      ][i % 5],
      paymentMethod: ['Credit Card', 'Debit Card', 'Bank Transfer', 'Wallet'][i % 4],
    }));
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let result = allTransactions;

    if (searchTerm) {
      result = result.filter(
        (txn) =>
          txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (transactionType !== 'all') {
      result = result.filter((txn) => txn.type === transactionType);
    }

    return result.sort((a, b) => b.date - a.date);
  }, [allTransactions, searchTerm, transactionType]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      completed: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        label: 'Completed',
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        label: 'Pending',
      },
      failed: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        label: 'Failed',
      },
    };

    const info = statusMap[status] || statusMap.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${info.bg} ${info.text}`}>
        {info.label}
      </span>
    );
  };

  // Get type color
  const getTypeColor = (type) => {
    const colorMap = {
      booking: 'text-blue-600 dark:text-blue-400',
      subscription: 'text-purple-600 dark:text-purple-400',
      commission: 'text-green-600 dark:text-green-400',
      refund: 'text-red-600 dark:text-red-400',
      payout: 'text-orange-600 dark:text-orange-400',
    };
    return colorMap[type] || 'text-slate-600 dark:text-slate-400';
  };

  // Stat Card Component
  const StatCard = ({ icon: Icon, title, value, subtitle, trend, trendColor = 'green' }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div
          className={`p-3 rounded-lg ${
            trendColor === 'green'
              ? 'bg-green-100 dark:bg-green-900/30'
              : trendColor === 'blue'
              ? 'bg-blue-100 dark:bg-blue-900/30'
              : trendColor === 'orange'
              ? 'bg-orange-100 dark:bg-orange-900/30'
              : 'bg-red-100 dark:bg-red-900/30'
          }`}
        >
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
          <span
            className={`text-xs font-semibold ${
              trendColor === 'green'
                ? 'text-green-600 dark:text-green-400'
                : trendColor === 'blue'
                ? 'text-blue-600 dark:text-blue-400'
                : trendColor === 'orange'
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Financial Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Track revenue, transactions, and financial reports
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Financial Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${(financialStats.totalRevenue / 1000).toFixed(1)}K`}
          subtitle="All-time revenue"
          trend="+12% vs last month"
          trendColor="green"
        />
        <StatCard
          icon={TrendingUp}
          title="Monthly Revenue"
          value={`$${(financialStats.monthlyRevenue / 1000).toFixed(1)}K`}
          subtitle="This month"
          trend="+8% vs last month"
          trendColor="green"
        />
        <StatCard
          icon={CreditCard}
          title="Pending Payouts"
          value={`$${(financialStats.pendingPayouts / 1000).toFixed(1)}K`}
          subtitle="To be processed"
          trend="5 pending"
          trendColor="orange"
        />
        <StatCard
          icon={Users}
          title="Paying Users"
          value={financialStats.totalUsers}
          subtitle="Active users"
          trend="+4% this month"
          trendColor="blue"
        />
        <StatCard
          icon={CreditCard}
          title="Transactions"
          value={financialStats.activeTransactions}
          subtitle="This month"
          trend="Avg: $193.50"
          trendColor="green"
        />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by transaction ID, user, or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Transaction Type Filter */}
          <div className="relative">
            <select
              value={transactionType}
              onChange={(e) => {
                setTransactionType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="booking">Booking Payments</option>
              <option value="subscription">Subscriptions</option>
              <option value="commission">Commissions</option>
              <option value="refund">Refunds</option>
              <option value="payout">Payouts</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="mt-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Time Range:</span>
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{txn.id}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{txn.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 dark:text-white">{txn.user}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{txn.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${getTypeColor(txn.type)}`}>
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        ${parseFloat(txn.amount).toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(txn.status)}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {txn.date.toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {Math.min(itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}{' '}
          transactions
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminFinancial;
