import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';
import { Booking } from '../../types';

interface StepDateTimeProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTimeSlot: string;
  onSelectTimeSlot: (slot: string) => void;
  existingBookings: Booking[];
}

export const StepDateTime: React.FC<StepDateTimeProps> = ({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  existingBookings,
}) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to generate days of current month view
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Convert Sunday (0) to 6, Monday (1) to 0 for Monday-start calendar
  const adjustedFirstDay = (firstDayIndex + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Is day selectable?
  const isDateSelectable = (dayNumber: number) => {
    const d = new Date(year, month, dayNumber);
    const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon
    
    // Check if in past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return false;

    // Closed on Sunday (0) and Monday (1)
    if (dayOfWeek === 0 || dayOfWeek === 1) return false;

    return true;
  };

  const formatDateStr = (dayNumber: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(dayNumber).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  // Check if slot is taken on selectedDate
  const isSlotBooked = (slot: string) => {
    if (!selectedDate) return false;
    return existingBookings.some(
      b => b.date === selectedDate && b.timeSlot === slot && b.status !== 'cancelled'
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-bold text-jacobean">
          2. Select Date & Time
        </h3>
        <p className="text-xs sm:text-sm text-jacobean/70">
          Studio operates Tuesday to Saturday. Private sessions in Saint Helier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Calendar Picker Column */}
        <div className="md:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-oyster-200 shadow-xs space-y-4">
          
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between pb-2 border-b border-oyster-100">
            <h4 className="font-serif text-base font-bold text-jacobean">
              {monthNames[month]} {year}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg hover:bg-oyster-100 text-jacobean"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg hover:bg-oyster-100 text-jacobean"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-jacobean/50">
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
            <span>Su</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty offset spaces */}
            {Array.from({ length: adjustedFirstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9" />
            ))}

            {/* Days of Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = formatDateStr(day);
              const selectable = isDateSelectable(day);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={!selectable}
                  onClick={() => onSelectDate(dateStr)}
                  className={`h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-jacobean text-lace font-bold shadow-xs scale-105'
                      : selectable
                      ? 'hover:bg-khaki-100 text-jacobean hover:text-khaki-800'
                      : 'text-jacobean/20 cursor-not-allowed line-through'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pt-2 text-[11px] text-jacobean/60 border-t border-oyster-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-jacobean" /> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-khaki-100 border border-khaki-300" /> Available
            </span>
            <span className="flex items-center gap-1.5 text-jacobean/30">
              <span className="w-2.5 h-2.5 rounded-full bg-oyster-200" /> Sun/Mon Closed
            </span>
          </div>
        </div>

        {/* Time Slot Selector Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-jacobean flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-redRobin" />
              <span>Available Times</span>
            </h4>
            {selectedDate && (
              <span className="text-[11px] text-khaki-700 font-semibold">
                {selectedDate}
              </span>
            )}
          </div>

          {!selectedDate ? (
            <div className="bg-white/60 rounded-2xl p-6 border border-dashed border-oyster-300 text-center space-y-2">
              <CalendarIcon className="w-8 h-8 text-oyster-400 mx-auto" />
              <p className="text-xs text-jacobean/70 font-medium">
                Please select a date on the calendar first to view available studio time slots.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {STUDIO_INFO.availableTimeSlots.map((slot) => {
                const booked = isSlotBooked(slot);
                const isSelected = selectedTimeSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={booked}
                    onClick={() => onSelectTimeSlot(slot)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? 'bg-redRobin text-lace border-redRobin shadow-sm'
                        : booked
                        ? 'bg-oyster-100/60 text-jacobean/30 border-oyster-200 cursor-not-allowed'
                        : 'bg-white text-jacobean border-oyster-200 hover:border-khaki-400 hover:bg-khaki-50/50'
                    }`}
                  >
                    <span className="text-sm font-bold">{slot}</span>
                    <span className="text-[10px] opacity-80">
                      {booked ? 'Unavailable' : 'Available'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedDate && selectedTimeSlot && (
            <div className="p-3.5 rounded-xl bg-khaki-50 border border-khaki-200 text-xs text-khaki-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-khaki-600 shrink-0" />
              <span>
                Selected: <strong>{selectedDate}</strong> at <strong>{selectedTimeSlot}</strong>
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
