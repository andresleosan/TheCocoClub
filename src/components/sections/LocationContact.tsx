import React from 'react';
import { MapPin, Phone, Clock, Car, ExternalLink, MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp';
import { InstagramIcon } from '../ui/InstagramIcon';

export const LocationContact: React.FC = () => {
  return (
    <section id="location" className="py-20 lg:py-28 bg-pearlBush/50 relative border-t border-oyster-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest-luxury text-khaki-700">
            Visit Our Private Atelier
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-jacobean tracking-tight uppercase leading-tight">
            Saint Helier, Jersey
          </h2>
          <p className="text-sm sm:text-base text-jacobean/75 font-normal leading-relaxed">
            Conveniently situated in central Saint Helier at 14 La Motte Street, with multiple parking options nearby.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact & Hours Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Direct Contacts Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-oyster-200 shadow-sm space-y-6">
              <h3 className="font-display text-xl font-bold text-jacobean uppercase tracking-wide border-b border-oyster-100 pb-3">
                Studio Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-khaki-100/80 text-khaki-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-jacobean">Studio Address</p>
                    <p className="text-xs sm:text-sm text-jacobean/80 mt-0.5">
                      {STUDIO_INFO.address.street}, {STUDIO_INFO.address.city}<br />
                      {STUDIO_INFO.address.island}, {STUDIO_INFO.address.postcode}
                    </p>
                    <a
                      href={STUDIO_INFO.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-redRobin hover:underline mt-1.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-redRobin-50 text-redRobin flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-jacobean">Phone / WhatsApp</p>
                    <a
                      href={`tel:${STUDIO_INFO.phone}`}
                      className="text-xs sm:text-sm text-jacobean/80 hover:text-redRobin font-medium block mt-0.5"
                    >
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-jacobean">Instagram Portfolio</p>
                    <a
                      href={STUDIO_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-jacobean/80 hover:text-redRobin font-medium block mt-0.5"
                    >
                      {STUDIO_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={createWhatsAppGeneralInquiryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Opening Hours & Parking Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-oyster-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-oyster-100 pb-3">
                <Clock className="w-5 h-5 text-khaki-700" />
                <h3 className="font-display text-xl font-bold text-jacobean uppercase tracking-wide">
                  Opening Hours & Parking
                </h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {STUDIO_INFO.openingHours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-oyster-100/60 last:border-0">
                    <span className="text-jacobean/70">{h.day}</span>
                    <span className="font-semibold text-jacobean">{h.hours}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-pearlBush/50 border border-oyster-200 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-jacobean uppercase tracking-wider text-[10px]">
                  <Car className="w-4 h-4 text-khaki-700" />
                  <span>Nearby Parking in St Helier</span>
                </div>
                <p className="text-jacobean/80 leading-relaxed">
                  Green Street Multi-Storey Car Park is just 3 minutes walk away. Pier Road Multi-Storey is also within a 5-minute walk.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed Frame */}
          <div className="lg:col-span-7">
            <div className="bg-white p-3 rounded-3xl border border-oyster-300 shadow-lg space-y-3">
              <div className="relative h-[480px] rounded-2xl overflow-hidden bg-oyster-200">
                <iframe
                  title="The Coco Club Location Map"
                  src="https://maps.google.com/maps?q=14+La+Motte+Street,+Saint+Helier,+Jersey&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-jacobean/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-redRobin" />
                  <span className="font-semibold">The Coco Club Private Atelier</span>
                  <span>• 14 La Motte St, St Helier</span>
                </div>
                <a
                  href={STUDIO_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-jacobean text-lace font-bold uppercase tracking-wider text-[10px] hover:bg-redRobin transition-colors flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
