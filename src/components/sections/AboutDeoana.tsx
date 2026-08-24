import React from 'react';
import { Heart, Sparkles, CheckCircle2, ShieldAlert, Award, Coffee } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';

interface AboutProps {
  onOpenBooking: () => void;
}

export const AboutDeoana: React.FC<AboutProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: Award,
      title: '30+ Years of International Craft',
      description: 'Deoana brings over three decades of refined technical expertise, specializing in complex nail anatomy, structured BIAB apex reinforcement, and custom hand-sculpted acrylics.'
    },
    {
      icon: CheckCircle2,
      title: 'Clinical Podology & Medical Foot Care',
      description: 'Certified podological care treating painful calluses, dry cracked heels, and ingrown nail corners with aseptic medical-grade instruments and extreme gentleness.'
    },
    {
      icon: Heart,
      title: 'Private 1-on-1 Sanctuary',
      description: 'No chaotic salon conveyor belts or rushed appointments. Our private studio in Saint Helier is exclusively reserved for you during your treatment.'
    },
    {
      icon: Coffee,
      title: 'Latin Warmth & Complimentary Bar',
      description: 'Enjoy artisanal Italian espresso, organic herbal teas, or chilled Prosecco while relaxing in a warm, welcoming environment where you are genuinely cared for.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-pearlBush/50 relative overflow-hidden border-y border-oyster-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-redRobin">
            The Philosophy Behind The Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-jacobean tracking-tight">
            “You are not just another booking — this is your moment to be looked after.”
          </h2>
          <p className="text-base sm:text-lg text-jacobean/75 font-normal leading-relaxed">
            The Coco Club was born from a desire to create a higher standard of beauty and wellness in Jersey — where medical precision meets genuine human connection.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Photo Frame */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] bg-oyster-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=900&q=80"
                  alt="Deoana Moreno Master Nail Craft"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jacobean/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-lace">
                  <p className="font-serif text-2xl font-bold">Deoana Moreno</p>
                  <p className="text-xs text-gold-300 uppercase tracking-wider font-semibold">
                    Founder • Specialist Podologist & Nail Artist
                  </p>
                </div>
              </div>

              {/* Overlapping Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-khaki text-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-white max-w-[200px] text-center">
                <p className="font-serif text-3xl font-bold">30+</p>
                <p className="text-xs uppercase tracking-wider font-medium opacity-90">
                  Years of Master Experience
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Pillars & Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-jacobean">
                Expert Hands, Latin Heart
              </h3>
              <p className="text-base text-jacobean/80 leading-relaxed">
                Based in a serene private studio at <strong>14 La Motte Street, Saint Helier</strong>, The Coco Club offers a bespoke and high-standard beauty experience for women who value quality, meticulous attention to detail, and a genuinely personal service.
              </p>
              <p className="text-base text-jacobean/80 leading-relaxed">
                Whether you need restorative medical podology for tired feet, strengthening BIAB to transform natural nails, or show-stopping hand-sculpted extensions, every appointment is given undivided attention with hospital-grade hygiene standards.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="bg-white/80 rounded-2xl p-5 border border-oyster-200 shadow-xs hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-khaki-100/80 text-khaki-700 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-jacobean mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-jacobean/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quote Box */}
            <div className="p-6 rounded-2xl bg-jacobean text-lace flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif italic text-lg text-oyster-100">
                  Ready to experience the difference of true master care?
                </p>
                <p className="text-xs text-gold-300">
                  Private consultations and appointments available Tuesday to Saturday.
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-6 py-2.5 rounded-full bg-redRobin hover:bg-redRobin-light text-lace text-sm font-semibold whitespace-nowrap shadow-md transition-colors"
              >
                Book Your Visit
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
