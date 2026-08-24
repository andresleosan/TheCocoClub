import React from 'react';
import { ShieldCheck, HeartPulse, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';

interface PodologyProps {
  onBookPodology: () => void;
}

export const ClinicalPodology: React.FC<PodologyProps> = ({ onBookPodology }) => {
  const conditions = [
    { title: 'Severe Heel Fissures & Calluses', desc: 'Medical-grade active softening and diamond e-file smoothing for deep cracks.' },
    { title: 'Ingrowing & Involuted Toenails', desc: 'Conservative sulcus clearing, nail bracing, and pain-free edge contouring.' },
    { title: 'Thickened / Dystrophic Nails', desc: 'Safe thinning, debridement, and fungal nail cosmetic restoration.' },
    { title: 'Diabetic & Sensitive Foot Care', desc: 'Aseptic gentle protocol with zero blades or risk of tissue injury.' }
  ];

  return (
    <section id="podology" className="py-20 lg:py-28 bg-jacobean text-lace relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-khaki-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-redRobin-950/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Podology Medical Focus */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-khaki/20 border border-khaki-400/30 text-khaki-300 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-khaki-400" />
                <span>Specialist Healthcare & Aesthetics</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-lace">
                Clinical Podology <br />
                <span className="text-gold-300 font-normal italic">& Medical Foot Restoration</span>
              </h2>
              
              <p className="text-base sm:text-lg text-oyster-200 font-light leading-relaxed">
                Many clients in Jersey suffer in silence with painful feet, thick calluses, or embarrassing nail conditions. At The Coco Club, Deoana Moreno applies over <strong>30 years of medical podology background</strong> in a discreet, private clinic setting.
              </p>
            </div>

            {/* Conditions We Treat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {conditions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-khaki-400/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-khaki-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-lace mb-1">{item.title}</h4>
                      <p className="text-xs text-oyster-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sterility Commitment */}
            <div className="p-5 rounded-2xl bg-redRobin-950/60 border border-redRobin-700/40 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-redRobin flex items-center justify-center text-white shrink-0 mt-0.5">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-oyster-200">
                <p className="font-bold text-lace">
                  Strict Hospital-Standard Aseptic Protocol
                </p>
                <p className="text-xs text-oyster-300">
                  Every surgical instrument undergoes medical ultrasonic cleaning and autoclave sterilization sealed in single-use pouches opened exclusively in front of you.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onBookPodology}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-khaki hover:bg-khaki-600 text-white font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Book Clinical Podology (£65)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-oyster-400 italic text-center sm:text-left">
                Discreet 1-on-1 private consultation included.
              </p>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-jacobean-800 p-2">
              <div className="relative h-[460px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80"
                  alt="Clinical Podology Foot Restoration in Jersey"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jacobean via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-lace">
                  <div className="inline-block px-3 py-1 rounded-full bg-gold-600/90 text-[11px] font-bold uppercase tracking-wider">
                    Saint Helier Clinic
                  </div>
                  <p className="font-serif text-xl font-bold">
                    “Healthy, pain-free feet are the foundation of true wellness.”
                  </p>
                  <p className="text-xs text-oyster-300">
                    — Deoana Moreno, Podology Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
