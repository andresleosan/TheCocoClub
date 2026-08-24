import React, { useState } from 'react';
import { 
  X, Plus, Search, Filter, Calendar, Clock, Download, RefreshCw, 
  Trash2, MessageCircle, CheckCircle, AlertCircle, Phone, Mail, 
  DollarSign, Users, ChevronDown, Check 
} from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { StatsCard } from './StatsCard';
import { AddBookingModal } from './AddBookingModal';
import { formatPrice, formatDuration } from '../../utils/formatters';
import { updateBookingStatus, deleteBooking, saveBookings } from '../../utils/storage';
import { INITIAL_BOOKINGS } from '../../data/initialBookings';
import { STUDIO_INFO } from '../../data/studioInfo';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onBookingsChange: (bookings: Booking[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onBookingsChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'upcoming'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeNotesClient, setActiveNotesClient] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  // Filtering
  const filteredBookings = bookings.filter((b) => {
    // Search
    const matchesSearch = 
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery) ||
      b.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Status
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;

    // Date
    if (dateFilter === 'today' && b.date !== todayStr) return false;
    if (dateFilter === 'upcoming' && b.date < todayStr) return false;

    return true;
  });

  // Analytics Metrics
  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const todayAppointmentsCount = bookings.filter(
    b => b.date === todayStr && b.status !== 'cancelled'
  ).length;

  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  // Change status
  const handleStatusChange = (id: string, status: BookingStatus) => {
    const updated = updateBookingStatus(id, status);
    onBookingsChange(updated);
  };

  // Delete
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this appointment?')) {
      const updated = deleteBooking(id);
      onBookingsChange(updated);
    }
  };

  // Add manual
  const handleAddBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    onBookingsChange(updated);
  };

  // Reset sample data
  const handleResetSampleData = () => {
    if (window.confirm('Reset bookings to initial Saint Helier studio demonstration schedule?')) {
      saveBookings(INITIAL_BOOKINGS);
      onBookingsChange(INITIAL_BOOKINGS);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Reference', 'Client Name', 'Phone', 'Email', 'Service', 'Date', 'Time', 'Price (£)', 'Duration (min)', 'Status', 'Beverage', 'Notes'];
    const rows = bookings.map(b => [
      b.referenceNumber,
      `"${b.clientName}"`,
      `"${b.clientPhone}"`,
      `"${b.clientEmail}"`,
      `"${b.serviceName}"`,
      b.date,
      b.timeSlot,
      b.totalPrice,
      b.totalDurationMinutes,
      b.status,
      `"${b.beveragePreference || ''}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the-coco-club-appointments-${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-jacobean/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-lace rounded-3xl max-w-6xl w-full shadow-2xl border border-oyster-200 overflow-hidden relative my-auto flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-oyster-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-jacobean text-gold-400 flex items-center justify-center font-serif font-bold text-xl">
              CC
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-redRobin">
                Studio Management Portal
              </span>
              <h2 className="font-serif text-2xl font-bold text-jacobean">
                Appointments & Client Registry
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-jacobean hover:bg-redRobin text-lace text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Appointment</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2 rounded-xl border border-oyster-300 bg-white hover:bg-oyster-100 text-jacobean transition-colors"
              title="Export CSV spreadsheet"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetSampleData}
              className="p-2 rounded-xl border border-oyster-300 bg-white hover:bg-oyster-100 text-jacobean transition-colors"
              title="Reset sample schedule"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-oyster-100 hover:bg-oyster-200 text-jacobean flex items-center justify-center transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Analytics Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Bookings"
              value={bookings.length}
              subtitle="All registered sessions"
              icon={Calendar}
              colorClass="bg-khaki-100 text-khaki-800"
            />
            <StatsCard
              title="Today's Sessions"
              value={todayAppointmentsCount}
              subtitle={`For ${todayStr}`}
              icon={Clock}
              colorClass="bg-amber-100 text-amber-800"
            />
            <StatsCard
              title="Total Booked Value"
              value={`£${totalRevenue}`}
              subtitle="Estimated revenue"
              icon={DollarSign}
              colorClass="bg-emerald-100 text-emerald-800"
            />
            <StatsCard
              title="Pending Review"
              value={pendingCount}
              subtitle="Requires confirmation"
              icon={AlertCircle}
              colorClass="bg-redRobin-100 text-redRobin-800"
            />
          </div>

          {/* Filters & Search Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-oyster-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-jacobean/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client, phone, or ref..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-oyster-300 focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              />
            </div>

            {/* Status & Date Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              {/* Date Filter */}
              <div className="flex items-center rounded-xl border border-oyster-200 p-0.5 bg-oyster-50 text-xs">
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    dateFilter === 'all' ? 'bg-white shadow-xs text-jacobean font-bold' : 'text-jacobean/60'
                  }`}
                >
                  All Dates
                </button>
                <button
                  onClick={() => setDateFilter('today')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    dateFilter === 'today' ? 'bg-white shadow-xs text-jacobean font-bold' : 'text-jacobean/60'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setDateFilter('upcoming')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    dateFilter === 'upcoming' ? 'bg-white shadow-xs text-jacobean font-bold' : 'text-jacobean/60'
                  }`}
                >
                  Upcoming
                </button>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="text-xs px-3 py-1.5 rounded-xl border border-oyster-300 bg-white font-medium focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

          </div>

          {/* Bookings List / Table */}
          <div className="bg-white rounded-2xl border border-oyster-200 overflow-hidden shadow-xs">
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <Calendar className="w-10 h-10 text-oyster-400 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-jacobean">No appointments found</h4>
                <p className="text-xs text-jacobean/60">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-jacobean divide-y divide-oyster-100">
                  <thead className="bg-oyster-50 font-bold uppercase tracking-wider text-[10px] text-jacobean/60">
                    <tr>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Treatment</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-oyster-100 font-medium">
                    {filteredBookings.map((b) => {
                      const cleanPhone = b.clientPhone.replace(/[^0-9]/g, '');
                      return (
                        <tr key={b.id} className="hover:bg-oyster-50/60 transition-colors">
                          
                          {/* Client */}
                          <td className="py-3.5 px-4">
                            <div>
                              <p className="font-bold text-jacobean text-sm leading-tight">{b.clientName}</p>
                              <p className="text-[11px] text-jacobean/60">{b.clientPhone}</p>
                              <span className="font-mono text-[10px] text-redRobin font-semibold">#{b.referenceNumber}</span>
                            </div>
                          </td>

                          {/* Treatment */}
                          <td className="py-3.5 px-4">
                            <div>
                              <p className="font-semibold text-jacobean">{b.serviceName}</p>
                              {b.addOns.length > 0 && (
                                <p className="text-[10px] text-khaki-700">
                                  + {b.addOns.map(a => a.name).join(', ')}
                                </p>
                              )}
                              <p className="text-[10px] text-jacobean/50 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3 text-khaki-600" />
                                {formatDuration(b.totalDurationMinutes)}
                              </p>
                            </div>
                          </td>

                          {/* Date & Time */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div>
                              <p className="font-bold text-jacobean">{b.date}</p>
                              <span className="inline-block px-2 py-0.5 rounded-full bg-jacobean text-lace text-[10px] font-mono mt-0.5">
                                {b.timeSlot}
                              </span>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-serif text-base font-bold text-redRobin">
                              {formatPrice(b.totalPrice)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : b.status === 'completed'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : b.status === 'pending'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-redRobin-50 text-redRobin-800 border-redRobin-300'
                              }`}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* WhatsApp Direct Chat */}
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
                                title="Chat with client on WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              {/* View Details / Notes */}
                              <button
                                onClick={() => setActiveNotesClient(b)}
                                className="p-1.5 rounded-lg text-jacobean/70 hover:bg-oyster-100 transition-colors"
                                title="View notes & hospitality"
                              >
                                <Users className="w-4 h-4" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(b.id)}
                                className="p-1.5 rounded-lg text-redRobin hover:bg-redRobin-50 transition-colors"
                                title="Delete appointment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Manual Add Appointment Modal */}
      <AddBookingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBooking={handleAddBooking}
      />

      {/* Client Notes & Info Modal */}
      {activeNotesClient && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-jacobean/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-lace rounded-3xl max-w-md w-full p-6 shadow-2xl border border-oyster-300 space-y-4">
            <div className="flex items-center justify-between border-b border-oyster-200 pb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-khaki-700">Client Preferences</p>
                <h4 className="font-serif text-xl font-bold text-jacobean">{activeNotesClient.clientName}</h4>
              </div>
              <button
                onClick={() => setActiveNotesClient(null)}
                className="w-7 h-7 rounded-full bg-oyster-100 flex items-center justify-center text-jacobean"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-jacobean/80">
              <div>
                <span className="font-bold text-jacobean">Beverage Choice:</span>
                <p className="p-2 rounded-xl bg-white border border-oyster-200 mt-1">
                  {activeNotesClient.beveragePreference || 'Standard beverage'}
                </p>
              </div>

              <div>
                <span className="font-bold text-jacobean">Special Notes & History:</span>
                <p className="p-2.5 rounded-xl bg-white border border-oyster-200 mt-1 min-h-[60px]">
                  {activeNotesClient.notes || 'No special notes recorded.'}
                </p>
              </div>

              <div className="pt-2 border-t border-oyster-200 flex justify-between text-jacobean/60">
                <span>Booked on: {new Date(activeNotesClient.createdAt).toLocaleDateString('en-GB')}</span>
                <span>Ref: #{activeNotesClient.referenceNumber}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
