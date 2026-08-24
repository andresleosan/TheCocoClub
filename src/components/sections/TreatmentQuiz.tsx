import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Heart, ShieldCheck, Clock } from 'lucide-react';
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services';
import { ServiceItem } from '../../types';
import { formatPrice, formatDuration } from '../../utils/formatters';

interface TreatmentQuizProps {
  onSelectRecommendedService: (service: ServiceItem) => void;
}

export const TreatmentQuiz: React.FC<TreatmentQuizProps> = ({ onSelectRecommendedService }) => {
  const [step, setStep] = useState<number>(1);
  const [focus, setFocus] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [aesthetic, setAesthetic] = useState<string>('');
  const [result, setResult] = useState<{
    service: ServiceItem;
    recommendedAddon?: string;
    rationale: string;
  } | null>(null);

  const handleCalculateResult = (selectedAesthetic: string) => {
    let matchedServiceId = 'srv-biab-signature';
    let rationale = 'BIAB provides structured apex reinforcement to allow your natural nails to grow long, thick, and healthy without chipping.';
    let addon = 'Warm Lavender Paraffin Wrap';

    if (focus === 'foot-care') {
      matchedServiceId = 'srv-medical-podology';
      rationale = 'Deoana’s 30 years of medical podology background will safely treat calluses, heel fissures, and cuticle discomfort with hospital-grade sterile precision.';
      addon = 'Medical Callus Softening Treatment';
    } else if (focus === 'sculpted-length') {
      if (selectedAesthetic === 'french-classic') {
        matchedServiceId = 'srv-ombre-babyboomer';
        rationale = 'A bespoke babyboomer ombre sculpted set on forms delivers effortless royal elegance with a seamless blush-to-porcelain gradient.';
      } else {
        matchedServiceId = 'srv-acrylic-fullset';
        rationale = 'Hand-sculpted acrylic extensions on forms create custom length and flawless architecture without damaging plastic tips.';
      }
      addon = 'Haute Glazed Chrome / Pearl Finish';
    } else if (focus === 'damaged-recovery') {
      matchedServiceId = 'srv-ibx-paraffin-restoration';
      rationale = 'The double-penetrating IBX keratin fusion system repairs peeling nail matrices from the inside out, complemented by a deeply nourishing paraffin thermal wrap.';
      addon = 'Master Russian / Dry Precision Manicure';
    } else if (focus === 'nail-art') {
      matchedServiceId = 'srv-bespoke-nailart';
      rationale = 'A dedicated 90-minute creative atelier session crafting custom 3D textures, hand-painted marbling, and gold leaf encapsulation.';
      addon = 'Hand-Painted Micro French Tips';
    } else {
      // Natural strength default
      if (condition === 'very-weak') {
        matchedServiceId = 'srv-biab-signature';
        rationale = 'Structured BIAB gel reinforces weak natural nail beds, preventing snapping while maintaining natural flexibility.';
      } else {
        matchedServiceId = 'srv-russian-manicure';
        rationale = 'Precision diamond-burr Russian dry cuticle grooming allows clean-to-the-cuticle gel polish application for up to 4+ weeks of growth.';
      }
    }

    const foundService = SERVICES_DATA.find(s => s.id === matchedServiceId) || SERVICES_DATA[0];
    setResult({
      service: foundService,
      recommendedAddon: addon,
      rationale
    });
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setFocus('');
    setCondition('');
    setAesthetic('');
    setResult(null);
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-pearlBush/40 relative overflow-hidden border-t border-oyster-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-khaki-100/80 border border-khaki-300 text-khaki-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-khaki-700" />
            <span>Interactive Bespoke Consultation</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-jacobean tracking-tight">
            Find Your Signature Ritual
          </h2>
          <p className="text-xs sm:text-sm text-jacobean/70 leading-relaxed">
            Answer 3 quick questions to receive a tailor-made treatment recommendation curated by Deoana Moreno.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-lace rounded-3xl p-6 sm:p-10 border border-oyster-300 shadow-xl relative">
          
          {/* Progress Bar */}
          {step < 4 && (
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-jacobean/60">
                <span>Step {step} of 3</span>
                <span>{step === 1 ? 'Primary Goal' : step === 2 ? 'Nail Health Condition' : 'Desired Aesthetic'}</span>
              </div>
              <div className="w-full h-1.5 bg-oyster-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-redRobin transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Main Goal */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl font-bold text-jacobean">
                  1. What is your primary focus for this visit?
                </h3>
                <p className="text-xs text-jacobean/60">Select the goal that best describes your needs</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'natural-strength', title: 'Natural Strength & BIAB', desc: 'Grow strong natural nails without chipping or peeling.' },
                  { id: 'sculpted-length', title: 'Sculpted Length & Extensions', desc: 'Hand-sculpted bespoke length with durable acrylic/gel.' },
                  { id: 'foot-care', title: 'Clinical Podology & Foot Relief', desc: 'Relieve deep heel calluses, cracked skin & toenail discomfort.' },
                  { id: 'damaged-recovery', title: 'Damage Repair & Keratin Recovery', desc: 'Heal paper-thin, snapping or over-processed nails with IBX.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setFocus(opt.id);
                      setStep(2);
                    }}
                    className="p-5 rounded-2xl bg-white border border-oyster-200 hover:border-redRobin hover:bg-redRobin-50/40 text-left transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-lg font-bold text-jacobean group-hover:text-redRobin transition-colors">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-jacobean/70 mt-1">{opt.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-khaki-700 mt-4">
                      <span>Select</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Current Condition */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl font-bold text-jacobean">
                  2. How would you describe your current nail or foot condition?
                </h3>
                <p className="text-xs text-jacobean/60">Helps Deoana choose the right products and techniques</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'very-weak', title: 'Weak & Peeling', desc: 'Nails snap easily, bend, or have ridges.' },
                  { id: 'moderate-healthy', title: 'Normal & Healthy', desc: 'Looking for lasting shine, Russian cuticle precision & shape.' },
                  { id: 'needs-overhaul', title: 'Tired / Callused', desc: 'Requires intensive callus softening, podological debridement, or product removal.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setCondition(opt.id);
                      setStep(3);
                    }}
                    className="p-5 rounded-2xl bg-white border border-oyster-200 hover:border-redRobin hover:bg-redRobin-50/40 text-left transition-all shadow-xs hover:shadow-md group"
                  >
                    <h4 className="font-serif text-lg font-bold text-jacobean group-hover:text-redRobin transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-jacobean/70 mt-1">{opt.desc}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-khaki-700 mt-4">
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Desired Aesthetic */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl font-bold text-jacobean">
                  3. What is your desired aesthetic style?
                </h3>
                <p className="text-xs text-jacobean/60">Choose the signature look that matches your lifestyle</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'clean-glazed', title: 'Clean Girl & Glazed Nude', desc: 'Minimalist sheer blush, milk white, or pearlescent chrome powder.' },
                  { id: 'french-classic', title: 'Royal French & Babyboomer', desc: 'Razor-sharp micro French smile lines or soft seamless ombre fade.' },
                  { id: 'haute-statement', title: 'Bold Haute Art & Color', desc: 'Rich deep tones, 3D gel flowers, gold flakes or custom event art.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setAesthetic(opt.id);
                      handleCalculateResult(opt.id);
                    }}
                    className="p-5 rounded-2xl bg-white border border-oyster-200 hover:border-redRobin hover:bg-redRobin-50/40 text-left transition-all shadow-xs hover:shadow-md group"
                  >
                    <h4 className="font-serif text-lg font-bold text-jacobean group-hover:text-redRobin transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-jacobean/70 mt-1">{opt.desc}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-redRobin mt-4">
                      <span>Get My Tailored Plan</span>
                      <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Results Showcase */}
          {step === 4 && result && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-redRobin">
                  Your Tailored Recommendation
                </span>
                <h3 className="font-serif text-3xl font-bold text-jacobean">
                  {result.service.name}
                </h3>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-oyster-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-oyster-100 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-oyster-200 shrink-0">
                      <img
                        src={result.service.imageUrl}
                        alt={result.service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-jacobean">
                        {result.service.name}
                      </h4>
                      <p className="text-xs text-khaki-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDuration(result.service.durationMinutes)}</span>
                        <span>•</span>
                        <span className="text-amber-600 font-bold">★ 5.0 Rating</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[10px] uppercase font-bold text-jacobean/50">Treatment Price</p>
                    <p className="font-serif text-3xl font-bold text-redRobin">
                      {formatPrice(result.service.price)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-jacobean">
                    Why Deoana Recommends This:
                  </p>
                  <p className="text-xs sm:text-sm text-jacobean/80 leading-relaxed bg-pearlBush/40 p-4 rounded-xl border border-oyster-200">
                    {result.rationale}
                  </p>
                </div>

                {result.recommendedAddon && (
                  <div className="p-3.5 rounded-xl bg-khaki-50 border border-khaki-200 text-xs text-khaki-900 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-khaki-700 shrink-0" />
                    <span>
                      <strong>Suggested Add-on:</strong> {result.recommendedAddon}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-oyster-300 bg-white hover:bg-oyster-100 text-xs font-semibold text-jacobean flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Quiz Again</span>
                </button>

                <button
                  onClick={() => onSelectRecommendedService(result.service)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-jacobean hover:bg-redRobin text-lace text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Recommended Ritual</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
