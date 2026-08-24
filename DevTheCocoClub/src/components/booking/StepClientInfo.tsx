import React from 'react';
import { User, Phone, Mail, Coffee, FileText, Sparkles, Heart } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';

interface StepClientInfoProps {
  clientName: string;
  setClientName: (v: string) => void;
  clientEmail: string;
  setClientEmail: (v: string) => void;
  clientPhone: string;
  setClientPhone: (v: string) => void;
  beveragePreference: string;
  setBeveragePreference: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
}

export const StepClientInfo: React.FC<StepClientInfoProps> = ({
  clientName,
  setClientName,
  clientEmail,
  setClientEmail,
  clientPhone,
  setClientPhone,
  beveragePreference,
  setBeveragePreference,
  notes,
  setNotes,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-bold text-jacobean">
          3. Client & Hospitality Details
        </h3>
        <p className="text-xs sm:text-sm text-jacobean/70">
          Personalise your private 1-on-1 session with Deoana Moreno.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-jacobean flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-khaki-700" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-oyster-300 bg-white text-sm text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20 focus:border-redRobin"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-jacobean flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-khaki-700" />
            <span>Phone Number (Jersey / UK) *</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+44 7797 000000"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-oyster-300 bg-white text-sm text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20 focus:border-redRobin"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-jacobean flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-khaki-700" />
            <span>Email Address *</span>
          </label>
          <input
            type="email"
            required
            placeholder="eleanor@jerseymail.co.uk"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-oyster-300 bg-white text-sm text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20 focus:border-redRobin"
          />
        </div>

      </div>

      {/* Complimentary Hospitality Choice */}
      <div className="space-y-2 pt-2 border-t border-oyster-100">
        <label className="text-xs font-bold uppercase tracking-wider text-jacobean flex items-center gap-1.5">
          <Coffee className="w-3.5 h-3.5 text-redRobin" />
          <span>Complimentary Welcome Refreshment</span>
        </label>
        <p className="text-xs text-jacobean/60">
          Enjoy a complimentary luxury beverage upon your arrival at the studio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {STUDIO_INFO.beverageOptions.map((drink) => {
            const isSelected = beveragePreference === drink;
            return (
              <div
                key={drink}
                onClick={() => setBeveragePreference(drink)}
                className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'border-redRobin bg-redRobin-50/70 text-jacobean font-bold ring-1 ring-redRobin'
                    : 'border-oyster-200 bg-white text-jacobean/80 hover:border-oyster-300'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-redRobin border-redRobin' : 'border-oyster-400'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span>{drink}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Notes & Medical/Nail History */}
      <div className="space-y-1.5 pt-2 border-t border-oyster-100">
        <label className="text-xs font-bold uppercase tracking-wider text-jacobean flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-khaki-700" />
          <span>Special Requests, Allergies or Nail History</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Previous product removal needed, nail art ideas, sensitive cuticle areas, podological heel pain..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-oyster-300 bg-white text-sm text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20 focus:border-redRobin"
        />
      </div>

    </div>
  );
};
