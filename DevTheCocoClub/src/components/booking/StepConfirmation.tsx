import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Calendar, MessageCircle, MapPin, Download, Sparkles, Heart, Clock } from 'lucide-react';
import { Booking } from '../../types';
import { formatDuration, formatPrice, formatDateFriendly } from '../../utils/formatters';
import { generateIcsCalendarFile } from '../../utils/calendar';
import { createWhatsAppBookingLink } from '../../utils/whatsapp';
import { STUDIO_INFO } from '../../data/studioInfo';

interface StepConfirmationProps {
  booking: Booking;
  onClose: () => void;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = ({ booking, onClose }) => {
  useEffect(() => {
    // Fire confetti cannon for delightful confirmation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#737F51', '#8C3B2B', '#C5A059', '#D7CEBE', '#2C1810']
    });
  }, []);

  return (
    <div className="space-y-6 text-center">
      
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-khaki-700">
          Private Appointment Confirmed
        </span>
        <h3 className="font-serif text-3xl font-bold text-jacobean">
          We Look Forward to Welcoming You
        </h3>
        <p className="text-xs sm:text-sm text-jacobean/70 max-w-md mx-auto">
          Your booking has been registered with Deoana Moreno at <strong>14 La Motte Street</strong>.
        </p>
      </div>

      {/* Booking Summary Receipt Card */}
      <div className="bg-white rounded-2xl p-5 border border-oyster-200 shadow-sm text-left space-y-4 max-w-md mx-auto">
        
        {/* Reference & Service */}
        <div className="flex items-center justify-between border-b border-oyster-100 pb-3">
          <div>
            <p className="text-[10px] text-jacobean/50 font-bold uppercase tracking-wider">
              Booking Reference
            </p>
            <p className="font-mono text-sm font-bold text-redRobin">
              #{booking.referenceNumber}
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            Confirmed
          </span>
        </div>

        {/* Treatment Info */}
        <div className="space-y-1">
          <p className="text-[10px] text-jacobean/50 font-bold uppercase tracking-wider">
            Treatment & Add-ons
          </p>
          <p className="font-serif text-base font-bold text-jacobean">
            {booking.serviceName}
          </p>
          {booking.addOns.length > 0 && (
            <p className="text-xs text-khaki-700">
              + {booking.addOns.map(a => a.name).join(', ')}
            </p>
          )}
        </div>

        {/* Date, Time & Location */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-oyster-100 text-xs text-jacobean/80">
          <div>
            <p className="text-[10px] text-jacobean/50 uppercase font-semibold">Date & Time</p>
            <p className="font-bold text-jacobean">{booking.date} at {booking.timeSlot}</p>
            <p className="text-[11px] text-jacobean/60">{formatDuration(booking.totalDurationMinutes)}</p>
          </div>
          <div>
            <p className="text-[10px] text-jacobean/50 uppercase font-semibold">Total to Pay</p>
            <p className="font-serif text-lg font-bold text-redRobin">{formatPrice(booking.totalPrice)}</p>
            <p className="text-[11px] text-jacobean/60">Pay at studio (Cash/Card)</p>
          </div>
        </div>

        {/* Welcome drink note if selected */}
        {booking.beveragePreference && (
          <div className="pt-2 border-t border-oyster-100 text-xs text-jacobean/70">
            <span className="font-semibold text-jacobean">Welcome Refreshment:</span> {booking.beveragePreference}
          </div>
        )}

      </div>

      {/* Next Actions */}
      <div className="space-y-3 max-w-md mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* WhatsApp Direct Dispatch */}
          <a
            href={createWhatsAppBookingLink(booking)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Notify on WhatsApp</span>
          </a>

          {/* Add to Calendar Button */}
          <button
            onClick={() => generateIcsCalendarFile(booking)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-jacobean hover:bg-jacobean-800 text-lace text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-gold-400" />
            <span>Add to Calendar (.ics)</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-center text-xs font-semibold text-jacobean/70 hover:text-jacobean transition-colors"
        >
          Return to The Coco Club Homepage
        </button>
      </div>

    </div>
  );
};
