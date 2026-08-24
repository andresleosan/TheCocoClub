import React from 'react';
import { Heart, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';
import { InstagramIcon } from '../ui/InstagramIcon';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-jacobean text-lace border-t border-jacobean-600/40 relative overflow-hidden">
      
      {/* Upper Newsletter & VIP CTA Bar */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-2">
              <p className="font-serif italic text-2xl text-gold-300">
                The Art of Taking Care
              </p>
              <h3 className="font-serif text-3xl font-bold text-lace">
                Experience Luxury Nail Care in Saint Helier
              </h3>
              <p className="text-xs sm:text-sm text-oyster-300 max-w-lg">
                Reserve your private session with Deoana Moreno for specialized BIAB, master acrylic sculpting, or clinical podology.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-full bg-redRobin hover:bg-redRobin-light text-lace font-semibold text-sm shadow-lg transition-all"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-redRobin flex items-center justify-center text-lace shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                THE COCO CLUB
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-oyster-300 leading-relaxed max-w-sm">
              A private nail studio & clinical podology clinic created by Deoana Moreno. Celebrating over 30 years of craftsmanship, personalized attention, and genuine human connection.
            </p>

            <div className="flex items-center gap-2 text-xs text-khaki-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Podological Specialist • European Diamond E-File Certified</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif text-base font-bold text-gold-300 uppercase tracking-wider">
              Treatments
            </h4>
            <ul className="space-y-2 text-oyster-300">
              <li><a href="#services" className="hover:text-white transition-colors">Russian Dry Manicure</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Signature BIAB Overlays</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Bespoke Sculpted Acrylics</a></li>
              <li><a href="#podology" className="hover:text-white transition-colors">Medical Podology & Foot Care</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Supreme Spa Pedicures</a></li>
            </ul>
          </div>

          {/* Col 3: Studio Details */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif text-base font-bold text-gold-300 uppercase tracking-wider">
              Studio Location
            </h4>
            <div className="space-y-2 text-oyster-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-khaki-400 shrink-0 mt-0.5" />
                <span>14 La Motte Street, Saint Helier, Jersey JE2 4SY</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-redRobin shrink-0" />
                <a href={`tel:${STUDIO_INFO.phone}`} className="hover:text-white">{STUDIO_INFO.phoneDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-redRobin shrink-0" />
                <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white">{STUDIO_INFO.instagram}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-oyster-400">
          <p>© {new Date().getFullYear()} The Coco Club Jersey. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="text-oyster-400 hover:text-gold-300 transition-colors underline text-xs"
            >
              Studio Staff Portal
            </button>
            <span>•</span>
            <span>Saint Helier, Jersey (Channel Islands)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
