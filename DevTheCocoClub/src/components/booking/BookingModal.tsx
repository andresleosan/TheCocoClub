import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Sparkles, Clock, Calendar, Check } from 'lucide-react';
import { ServiceItem, ServiceAddOn, Booking } from '../../types';
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services';
import { StepServices } from './StepServices';
import { StepDateTime } from './StepDateTime';
import { StepClientInfo } from './StepClientInfo';
import { StepConfirmation } from './StepConfirmation';
import { addBooking, getStoredBookings } from '../../utils/storage';
import { formatDuration, formatPrice } from '../../utils/formatters';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: ServiceItem | null;
  onBookingCreated?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = null,
  onBookingCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(preSelectedService || SERVICES_DATA[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<ServiceAddOn[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [beveragePreference, setBeveragePreference] = useState<string>('Artisan Italian Espresso / Cappuccino');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (isOpen) {
      setAllBookings(getStoredBookings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle add-on
  const handleToggleAddOn = (addon: ServiceAddOn) => {
    setSelectedAddOns(prev =>
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  // Calculations
  const totalPrice = (selectedService?.price || 0) + selectedAddOns.reduce((acc, a) => acc + a.price, 0);
  const totalDuration = (selectedService?.durationMinutes || 0) + selectedAddOns.reduce((acc, a) => acc + a.durationMinutes, 0);

  // Validate step
  const canContinue = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return !!selectedDate && !!selectedTimeSlot;
    if (currentStep === 3) return clientName.trim().length > 1 && clientPhone.trim().length > 4 && clientEmail.includes('@');
    return true;
  };

  // Submit booking
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTimeSlot) return;

    const refNum = `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      referenceNumber: refNum,
      createdAt: new Date().toISOString(),
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      addOns: selectedAddOns,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      totalPrice,
      totalDurationMinutes: totalDuration,
      beveragePreference,
      notes,
      status: 'confirmed',
      isPaid: false,
    };

    addBooking(newBooking);
    setConfirmedBooking(newBooking);
    setCurrentStep(4);
    if (onBookingCreated) {
      onBookingCreated(newBooking);
    }
  };

  const handleModalClose = () => {
    // Reset state after close
    setCurrentStep(1);
    setSelectedAddOns([]);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-jacobean/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-lace rounded-3xl max-w-2xl w-full shadow-2xl border border-oyster-200 overflow-hidden relative my-auto">
        
        {/* Header Bar */}
        <div className="p-6 pb-4 border-b border-oyster-200 flex items-center justify-between bg-white/70">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-khaki-700">
              The Coco Club • Saint Helier
            </span>
            <h2 className="font-serif text-xl font-bold text-jacobean">
              Book Your Private Ritual
            </h2>
          </div>

          <button
            onClick={handleModalClose}
            className="w-9 h-9 rounded-full bg-oyster-100 hover:bg-oyster-200 text-jacobean flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        {currentStep < 4 && (
          <div className="bg-oyster-100/50 px-6 py-2.5 border-b border-oyster-200 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-jacobean font-bold' : 'text-jacobean/40'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-jacobean text-lace' : 'bg-oyster-300'}`}>1</span>
              <span>Treatment</span>
            </div>
            <span className="text-oyster-400">→</span>
            <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-jacobean font-bold' : 'text-jacobean/40'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-jacobean text-lace' : 'bg-oyster-300'}`}>2</span>
              <span>Date & Time</span>
            </div>
            <span className="text-oyster-400">→</span>
            <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-jacobean font-bold' : 'text-jacobean/40'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 3 ? 'bg-jacobean text-lace' : 'bg-oyster-300'}`}>3</span>
              <span>Client Details</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[68vh] overflow-y-auto">
          {currentStep === 1 && (
            <StepServices
              selectedService={selectedService}
              onSelectService={setSelectedService}
              selectedAddOns={selectedAddOns}
              onToggleAddOn={handleToggleAddOn}
            />
          )}

          {currentStep === 2 && (
            <StepDateTime
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={setSelectedTimeSlot}
              existingBookings={allBookings}
            />
          )}

          {currentStep === 3 && (
            <form id="client-info-form" onSubmit={handleFinalSubmit}>
              <StepClientInfo
                clientName={clientName}
                setClientName={setClientName}
                clientEmail={clientEmail}
                setClientEmail={setClientEmail}
                clientPhone={clientPhone}
                setClientPhone={setClientPhone}
                beveragePreference={beveragePreference}
                setBeveragePreference={setBeveragePreference}
                notes={notes}
                setNotes={setNotes}
              />
            </form>
          )}

          {currentStep === 4 && confirmedBooking && (
            <StepConfirmation
              booking={confirmedBooking}
              onClose={handleModalClose}
            />
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="p-4 sm:p-6 bg-white border-t border-oyster-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Running Price & Duration Pill */}
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="font-serif text-xl font-bold text-redRobin">
                {formatPrice(totalPrice)}
              </span>
              <span className="text-oyster-400">•</span>
              <span className="flex items-center gap-1 text-jacobean/70 font-medium">
                <Clock className="w-3.5 h-3.5 text-khaki-700" />
                {formatDuration(totalDuration)}
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                  className="px-4 py-2.5 rounded-xl border border-oyster-300 bg-white hover:bg-oyster-100 text-jacobean text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  disabled={!canContinue()}
                  onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-jacobean hover:bg-redRobin disabled:bg-oyster-300 disabled:cursor-not-allowed text-lace text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="client-info-form"
                  disabled={!canContinue()}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-redRobin hover:bg-redRobin-light disabled:bg-oyster-300 disabled:cursor-not-allowed text-lace text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Confirm & Book Appointment</span>
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
