import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services';
import { Booking, ServiceItem, ServiceAddOn } from '../../types';
import { STUDIO_INFO } from '../../data/studioInfo';

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: Booking) => void;
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
  isOpen,
  onClose,
  onAddBooking,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DATA[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState(STUDIO_INFO.availableTimeSlots[0]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const refNum = `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
      clientName,
      clientEmail: clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@client.je`,
      clientPhone,
      serviceId: currentService.id,
      serviceName: currentService.name,
      addOns: [],
      date,
      timeSlot,
      totalPrice: currentService.price,
      totalDurationMinutes: currentService.durationMinutes,
      beveragePreference: 'Artisan Italian Espresso / Cappuccino',
      notes,
      status: 'confirmed',
      isPaid: false,
    };

    onAddBooking(newBooking);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-jacobean/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-lace rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-oyster-300 space-y-6">
        
        <div className="flex items-center justify-between border-b border-oyster-200 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-khaki-700">
              Studio Walk-in / Phone Entry
            </span>
            <h3 className="font-serif text-2xl font-bold text-jacobean">
              New Manual Booking
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-oyster-100 hover:bg-oyster-200 text-jacobean flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-jacobean">Client Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rachel Le Brun"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Phone *</label>
              <input
                type="tel"
                required
                placeholder="+44 7797 123456"
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Email (Optional)</label>
              <input
                type="email"
                placeholder="client@mail.je"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-jacobean">Treatment *</label>
            <select
              value={selectedServiceId}
              onChange={e => setSelectedServiceId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
            >
              {SERVICES_DATA.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} (£{s.price} • {s.durationMinutes}m)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Time Slot *</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              >
                {STUDIO_INFO.availableTimeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-jacobean">Notes / Requirements</label>
            <textarea
              rows={2}
              placeholder="e.g. Walk-in client, requested specific nail shape or podology focus..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-oyster-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-redRobin/20"
            />
          </div>

          <div className="pt-3 border-t border-oyster-200 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-oyster-300 bg-white text-xs font-semibold text-jacobean"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-jacobean hover:bg-redRobin text-lace text-xs font-semibold shadow-xs"
            >
              Save Appointment
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
