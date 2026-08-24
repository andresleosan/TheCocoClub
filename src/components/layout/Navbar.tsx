import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ShieldCheck, Heart, Sparkles, Clock, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  bookingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  bookingCount = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Studio', href: '#about' },
    { name: 'Treatments & Pricing', href: '#services' },
    { name: 'Clinical Podology', href: '#podology' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Lookbook', href: '#gallery' },
    { name: 'Find Us', href: '#location' },
  ];

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-lace/90 backdrop-blur-md shadow-sm border-b border-oyster-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-jacobean flex items-center justify-center text-lace shadow-md transition-transform duration-300 group-hover:scale-105">
              <svg className="w-6 h-6 text-gold-400" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 78 C35 65, 20 48, 20 34 C20 22, 30 14, 42 16 C48 17, 50 22, 50 22 C50 22, 52 17, 58 16 C70 14, 80 22, 80 34 C80 48, 65 65, 50 78 Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-jacobean group-hover:text-redRobin transition-colors leading-none">
                  THE COCO CLUB
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-redRobin animate-pulse"></span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-khaki-600 font-semibold mt-0.5">
                Saint Helier • Jersey
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-jacobean/80 hover:text-redRobin transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-redRobin hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Management Toggle */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full border border-oyster-300 bg-oyster-100/60 hover:bg-oyster-200 text-jacobean/90 transition-all hover:shadow-xs"
              title="Studio Portal (Manage Bookings & Schedules)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-khaki-600" />
              <span>Studio Portal</span>
              {bookingCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-khaki text-white rounded-full">
                  {bookingCount}
                </span>
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden rounded-full bg-jacobean px-5 py-2.5 text-sm font-semibold text-lace shadow-md transition-all duration-300 hover:bg-redRobin hover:shadow-lg hover:shadow-redRobin/20 active:scale-98"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>Book Appointment</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-semibold rounded-full bg-jacobean text-lace"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-jacobean hover:bg-oyster-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-lace border-b border-oyster-200 shadow-xl px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-jacobean hover:text-redRobin py-2 border-b border-oyster-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-jacobean text-lace font-semibold shadow-md"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-oyster-300 bg-white text-xs font-semibold text-jacobean"
            >
              <ShieldCheck className="w-4 h-4 text-khaki-600" />
              <span>Studio Management Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
