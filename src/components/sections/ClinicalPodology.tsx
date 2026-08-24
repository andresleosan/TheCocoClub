import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

interface ClinicalPodologyProps {
  onBookPodology: () => void;
}

export const ClinicalPodology: React.FC<ClinicalPodologyProps> = ({ onBookPodology }) => {
  const treatments = [
    {
      title: 'Medical Callus & Hyperkeratosis Debridement',
      description: 'Painless reduction of hardened skin, painful corns, and persistent pressure points without harsh blades.'
    },
    {
      title: 'Deep Cracked Heel Fissure Restoration',
      description: 'Therapeutic softening, diamond buffing, and intensive lipid barrier repair for smooth, pain-free feet.'
    },
    {
      title: 'Involuted & Ingrown Edge Relieving',
      description: 'Gentle corrective filing and conservative uncurling of painful toenail corners without surgical trauma.'
    },
    {
      title: 'Thickened & Trauma Nail Reconstruction',
      description: 'Specialist thinning, anatomical shaping, and antimicrobial podological treatments.'
    }
  ];

  return (
    <section id="podology" className="py-20 lg:py-28 bg-jacobean text-lace relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-khaki/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-redRobin/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-luxury backdrop-blur-xs">
            <Stethoscope className="w-3.5 h-3.5 text-gold-400" />
            <span>Specialist Medical Foot Care • 30+ Years Training</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-lace tracking-tight uppercase leading-tight">
            Clinical Podology & Medical Foot Care
          </h2>
          
          <p className="font-signature text-2xl sm:text-3xl text-gold-300">
            Gentle, restorative relief for your feet
          </p>

          <p className="text-sm sm:text-base text-oyster-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Unlike cosmetic salon pedicures that simply paint over issues, our clinical podological treatments focus on medical root causes with hospital-grade sterility and extreme gentleness.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Podology Specialties */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {treatments.map((t, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:border-gold/40 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2 text-gold-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <h3 className="font-display text-base font-bold text-lace uppercase tracking-wide">
                      {t.title}
                    </h3>
                  </div>
                  <p className="text-xs text-oyster-300 leading-relaxed pl-6">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Sterility Protocol Showcase Box */}
            <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-redRobin flex items-center justify-center text-lace shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-lace uppercase tracking-wide">
                    Our 100% Medical Sterilization Standard
                  </h4>
                  <p className="text-xs text-oyster-300">Autoclave Sealed • Ultrasonic Disinfected • Single-Use Files</p>
                </div>
              </div>
              <p className="text-xs text-oyster-200 leading-relaxed">
                Your health is sacred. All metal rotary burs, tweezers, and probes undergo multi-stage ultrasonic cleansing, hospital-grade disinfection, and are sealed in sterile autoclave pouches opened exclusively in your presence.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onBookPodology}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-redRobin hover:bg-redRobin-light text-lace font-bold uppercase tracking-wider text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Book Clinical Podology ({formatPrice(85)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-oyster-300 italic text-center sm:text-left">
                Includes soothing herbal foot soak & therapeutic massage.
              </p>
            </div>

          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=80"
                alt="The Coco Club Clinical Podology and Foot Care"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jacobean via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-lace space-y-1">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold text-jacobean">
                  Medical Precision
                </span>
                <p className="font-display text-2xl font-bold uppercase tracking-tight">
                  Walk with Ease & Confidence
                </p>
                <p className="text-xs text-oyster-300">
                  Customized treatments for active walkers, professionals & seniors.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
