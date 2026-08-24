import React from 'react';
import { Heart, MapPin, Phone, ShieldCheck, Calendar, ArrowUp } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';
import { InstagramIcon } from '../ui/InstagramIcon';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-jacobean text-lace pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-redRobin flex items-center justify-center text-lace shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-wider text-lace uppercase">
                  THE COCO CLUB
                </span>
                <p className="text-[10px] text-gold-300 uppercase tracking-widest font-sans">
                  The Art of Taking Care
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-oyster-300 max-w-sm leading-relaxed">
              Bespoke nail artistry, signature Russian dry manicure & structured BIAB overlays, and specialist medical clinical podology led by Deoana Moreno with 30+ years of mastery.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-redRobin flex items-center justify-center text-lace transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-lace transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={STUDIO_INFO.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-khaki flex items-center justify-center text-lace transition-colors"
                aria-label="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold-300">
              Treatment Rituals
            </h4>
            <ul className="space-y-2 text-xs text-oyster-300">
              <li><a href="#services" className="hover:text-white transition-colors">Signature BIAB Overlays</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Russian / E-File Dry Manicure</a></li>
              <li><a href="#podology" className="hover:text-white transition-colors">Specialist Clinical Podology</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Hand-Sculpted Acrylics</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Babyboomer & French Ombré</a></li>
              <li><a href="#transformations" className="hover:text-white transition-colors">Before & After Results</a></li>
            </ul>
          </div>

          {/* Studio Hours & Booking Action */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gold-300">
              Private Appointments
            </h4>
            <p className="text-xs text-oyster-300">
              14 La Motte Street, Saint Helier, Jersey JE2 4SY<br />
              Tuesday – Saturday • 9:00 AM – 6:00 PM
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-full bg-redRobin hover:bg-redRobin-light text-lace font-bold uppercase tracking-wider text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Appointment</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full py-2 text-center text-[11px] font-bold uppercase tracking-wider text-oyster-400 hover:text-gold-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Studio Management Access</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-oyster-400">
          <p>© {new Date().getFullYear()} The Coco Club. All rights reserved. Saint Helier, Jersey.</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
