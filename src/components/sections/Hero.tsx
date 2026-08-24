import React from 'react';
import { Star, Calendar, ShieldCheck, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const scrollToReviews = () => {
    const el = document.getElementById('testimonials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Story & High-Value Pitch */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Brand & Review Pill (Clickable) */}
            <button
              onClick={scrollToReviews}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-oyster-300 shadow-xs backdrop-blur-sm hover:border-amber-400 hover:shadow-md transition-all group cursor-pointer"
              title="Click to view client reviews"
            >
              <span className="w-2 h-2 rounded-full bg-redRobin animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-luxury text-jacobean-700">
                Saint Helier’s Private Atelier
              </span>
              <span className="text-oyster-400">•</span>
              <div className="flex items-center text-amber-500 text-xs">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
                <span className="ml-1.5 font-bold text-jacobean group-hover:text-redRobin transition-colors font-sans">5.0</span>
                <span className="text-jacobean/60 ml-0.5 font-sans">(Google)</span>
              </div>
            </button>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className="font-signature text-3xl sm:text-5xl text-redRobin font-normal leading-none tracking-normal">
                The Art of Taking Care
              </p>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal text-jacobean tracking-tight leading-[0.92] uppercase">
                Bespoke Nail Artistry <br />
                <span className="font-bodySerif italic font-normal text-khaki-700 lowercase text-4xl sm:text-6xl lg:text-7xl tracking-normal block mt-1">
                  & clinical podology
                </span>
              </h1>
              <p className="text-sm sm:text-base text-jacobean/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed pt-3">
                Created by <strong>Deoana Moreno</strong>, master nail technician and podology specialist with over <strong>30 years of international experience</strong>. A tranquil private sanctuary in Saint Helier where surgical precision meets Latin warmth and uncompromising luxury.
              </p>
            </div>

            {/* Social Proof Client Stack */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-center -space-x-2">
                <img
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Charlotte L."
                />
                <img
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Sophie D."
                />
                <img
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Gemma B."
                />
                <img
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80"
                  alt="Elena V."
                />
                <div className="w-9 h-9 rounded-full border-2 border-white bg-jacobean text-lace flex items-center justify-center text-[10px] font-bold">
                  +50
                </div>
              </div>
              <div className="text-xs text-jacobean/80 text-center sm:text-left">
                <p className="font-bold text-jacobean">100% 5-Star Client Satisfaction</p>
                <p className="text-[11px] text-jacobean/60">Verified clients in Saint Helier, St Brelade & St Clement</p>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-jacobean hover:bg-redRobin text-lace font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-redRobin/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Book Private Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={createWhatsAppGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/90 hover:bg-white border border-oyster-300 text-jacobean font-bold uppercase tracking-wider text-xs shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-oyster-200/80">
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl font-normal text-jacobean">30+</p>
                <p className="text-[10px] text-jacobean/70 uppercase tracking-widest font-bold">Years Mastery</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl font-normal text-khaki-700">1-on-1</p>
                <p className="text-[10px] text-jacobean/70 uppercase tracking-widest font-bold">Private Sanctuary</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl font-normal text-redRobin">100%</p>
                <p className="text-[10px] text-jacobean/70 uppercase tracking-widest font-bold">Hospital Sterility</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl sm:text-4xl font-normal text-amber-600">5.0 ★</p>
                <p className="text-[10px] text-jacobean/70 uppercase tracking-widest font-bold">Google Rating</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Luxury Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Organic Backing Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-pearlBush p-2">
                <div className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85"
                    alt="The Coco Club Luxury Nail Artistry"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jacobean/80 via-jacobean/20 to-transparent" />
                  
                  {/* Overlay Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-lace space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold text-jacobean uppercase tracking-widest">
                        Master Craft
                      </span>
                      <span className="text-xs text-lace/80 font-light">Russian BIAB & Extensions</span>
                    </div>
                    <p className="font-bodySerif italic text-xl sm:text-2xl text-lace">
                      “Every appointment is your personal moment to relax.”
                    </p>
                    <p className="font-signature text-2xl text-gold-300">
                      Deoana Moreno
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Pill 1: Podology Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-oyster-200 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-khaki-100 flex items-center justify-center text-khaki-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-jacobean">Clinical Podology</p>
                  <p className="text-[11px] text-jacobean/60">30+ Yrs Medical Foot Care</p>
                </div>
              </div>

              {/* Floating Pill 2: Latin Heart */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-jacobean text-lace p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-redRobin flex items-center justify-center text-lace shadow-xs">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="font-display text-sm uppercase tracking-wider font-normal">Expert Hands</p>
                  <p className="font-signature text-xl text-gold-300">Latin Heart • Tailored to You</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
