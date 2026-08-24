import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, MessageCircle, Navigation } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp';
import { InstagramIcon } from '../ui/InstagramIcon';

export const LocationContact: React.FC = () => {
  return (
    <section id="location" className="py-20 lg:py-28 bg-lace relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-redRobin">
            Saint Helier Studio & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-jacobean tracking-tight">
            Visit Our Private Sanctuary
          </h2>
          <p className="text-base sm:text-lg text-jacobean/75 font-normal leading-relaxed">
            Conveniently situated in central Saint Helier, Jersey. We welcome clients by appointment for a peaceful, unhurried experience.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hours & Contact Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Address & Direct Contact Card */}
            <div className="bg-white rounded-3xl p-8 border border-oyster-200 shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-khaki-100 flex items-center justify-center text-khaki-700 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-jacobean">
                    The Coco Club Studio
                  </h3>
                  <p className="text-sm text-jacobean/80 leading-snug">
                    {STUDIO_INFO.address.street}, {STUDIO_INFO.address.city} <br />
                    {STUDIO_INFO.address.island} {STUDIO_INFO.address.postcode}, {STUDIO_INFO.address.country}
                  </p>
                  <p className="text-xs text-khaki-700 font-medium pt-1">
                    Nearby: Close to Jersey Archive & Central Market
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={STUDIO_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-jacobean hover:bg-jacobean-800 text-lace text-xs font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4 text-gold-400" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={createWhatsAppGeneralInquiryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-oyster-100 text-xs text-jacobean/80">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-redRobin shrink-0" />
                  <div>
                    <p className="text-[10px] text-jacobean/50 font-semibold uppercase">Telephone</p>
                    <a href={`tel:${STUDIO_INFO.phone}`} className="font-semibold hover:text-redRobin">
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-redRobin shrink-0" />
                  <div>
                    <p className="text-[10px] text-jacobean/50 font-semibold uppercase">Instagram</p>
                    <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer" className="font-semibold hover:text-redRobin">
                      {STUDIO_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Schedule Card */}
            <div className="bg-white rounded-3xl p-8 border border-oyster-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-khaki-700" />
                  <h3 className="font-serif text-lg font-bold text-jacobean">
                    Studio Opening Hours
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Tue – Sat 9AM – 6PM
                </span>
              </div>

              <div className="divide-y divide-oyster-100 text-xs sm:text-sm">
                {STUDIO_INFO.openingHours.map((slot, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-jacobean">{slot.day}</span>
                    <span className={slot.isOpen ? 'text-jacobean/80' : 'text-redRobin font-medium'}>
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Studio & Map Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl overflow-hidden border border-oyster-200 shadow-lg h-full flex flex-col">
              
              {/* Studio Building & Street Photo */}
              <div className="relative h-64 overflow-hidden bg-oyster-200">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                  alt="14 La Motte Street Saint Helier Jersey"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jacobean/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-lace flex items-center justify-between">
                  <div>
                    <p className="font-serif text-lg font-bold">14 La Motte Street</p>
                    <p className="text-xs text-oyster-200">Saint Helier, Jersey JE2 4SY</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold">
                    Private Entrance
                  </span>
                </div>
              </div>

              {/* Stylized Jersey Map Canvas / Info */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-pearlBush/20">
                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-bold text-jacobean">
                    Directions & Parking in Saint Helier
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-jacobean/80">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-redRobin shrink-0 mt-2" />
                      <span>
                        <strong>Public Parking:</strong> Green Street Multi-storey Car Park and Pier Road Car Park are only a 3-minute stroll away.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-khaki-600 shrink-0 mt-2" />
                      <span>
                        <strong>Central Access:</strong> Walking distance from King Street, Jersey Archive, and the Central Market.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600 shrink-0 mt-2" />
                      <span>
                        <strong>VIP Privacy:</strong> Discreet private door bell entrance ensures a tranquil sanctuary away from crowded street salons.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-pearlBush/60 border border-oyster-300 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-jacobean">Need special assistance or bridal party booking?</p>
                    <p className="text-jacobean/70">Reach out directly via phone or WhatsApp.</p>
                  </div>
                  <a
                    href={`tel:${STUDIO_INFO.phone}`}
                    className="px-4 py-2 rounded-xl bg-jacobean text-lace text-xs font-semibold hover:bg-redRobin transition-colors shrink-0"
                  >
                    Call Studio
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
