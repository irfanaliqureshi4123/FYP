import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
} from 'lucide-react';

/**
 * AdminBookings Component
 * Manages booking data, status updates, cancellations, and rescheduling
 * Features: Booking list, status management, cancellation handling, scheduling
 */
function AdminBookings() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock booking data
  const allBookings = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: `BK-${String(i + 1).padStart(5, '0')}`,
      clientName: `Client ${i + 1}`,
      clientEmail: `client${i + 1}@example.com`,
      counsellorName: `Counsellor ${(i % 5) + 1}`,
      serviceType: ['Career Counselling', 'Academic Guidance', 'Mental Health', 'Skill Development'][
        i % 4
      ],
      date: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000),
      time: `${9 + (i % 8)}:00 AM`,
      duration: [30, 45, 60][i % 3],
      price: (30 + Math.random() * 120).toFixed(2),
      status: ['confirmed', 'pending', 'completed', 'cancelled'][i % 4],
      paymentStatus: ['paid', 'pending'][i % 2],
      notes: `Booking notes for appointment #${i + 1}`,
      location: ['Online - Video Call', 'Online - Phone Call', 'In-Office'][i % 3],
      cancellationReason: i % 4 === 3 ? 'Client requested cancellation' : null,
    }));
  }, []);

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    let result = allBookings;

    if (searchTerm) {
      result = result.filter(
        (booking) =>
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.counsellorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter((booking) => booking.status === filterStatus);
    }

    // Sort
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'price') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [allBookings, searchTerm, filterStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        label: 'Confirmed',
        icon: CheckCircle,
      },
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        label: 'Pending',
        icon: Clock,
      },
      completed: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-300',
        label: 'Completed',
        icon: CheckCircle,
      },
      cancelled: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        label: 'Cancelled',
        icon: XCircle,
      },
    };

    const info = statusMap[status] || statusMap.pending;
    const Icon = info.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${info.bg} ${info.text}`}>
        <Icon className="w-3 h-3" />
        {info.label}
      </span>
    );
  };

  // Booking Detail Modal
  const BookingDetailModal = ({ booking }) => {
    if (!booking) return null;

    return (
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Booking Details - {booking.id}
            </h2>
            <button
              onClick={() => setShowDetailModal(false)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Client Name
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.clientName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Counsellor
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.counsellorName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Email
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.clientEmail}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Service Type
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.serviceType}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Date
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">
                  {booking.date.toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Time
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.time}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Duration
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.duration} mins</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Price
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1">${booking.price}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Status
                </label>
                <div className="mt-1">{getStatusBadge(booking.status)}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Payment Status
                </label>
                <p className="text-sm text-slate-900 dark:text-white mt-1 capitalize">
                  {booking.paymentStatus}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                Location
              </label>
              <p className="text-sm text-slate-900 dark:text-white mt-1">{booking.location}</p>
            </div>

            {booking.notes && (
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Notes
                </label>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{booking.notes}</p>
              </div>
            )}

            {booking.cancellationReason && (
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Cancellation Reason
                </label>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">{booking.cancellationReason}</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3">
            {booking.status === 'pending' && (
              <>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Decline
                </button>
              </>
            )}
            {booking.status === 'confirmed' && (
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Reschedule
              </button>
            )}
            <button
              onClick={() => setShowDetailModal(false)}
              className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bookings Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage counselling sessions and booking requests
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download className="w-4 h-4" />
          Export Bookings
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by booking ID, client name, or counsellor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Sort */}
        <div className="mt-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              sortBy === 'date'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Date
          </button>
          <button
            onClick={() => setSortBy('price')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              sortBy === 'price'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            Price
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Counsellor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{booking.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 dark:text-white">{booking.clientName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{booking.serviceType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 dark:text-white">{booking.counsellorName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 dark:text-white">
                        {booking.date.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{booking.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        ${booking.price}
                      </p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailModal(true);
                        }}
                        className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No bookings found
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
          Showing {Math.min(itemsPerPage, filteredBookings.length)} of {filteredBookings.length}{' '}
          bookings
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

      {/* Detail Modal */}
      {showDetailModal && <BookingDetailModal booking={selectedBooking} />}
    </div>
  );
}

export default AdminBookings;
