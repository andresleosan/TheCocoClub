import React, { useState } from 'react';
import { Sparkles, Sliders, ArrowLeftRight } from 'lucide-react';

export const TransformationSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'biab' | 'podology' | 'acrylic'>('biab');

  const transformations = {
    biab: {
      title: 'Damaged & Brittle Nails to Structured BIAB',
      subtitle: 'Natural nail plate strengthening with diamond cuticle clearing and BIAB apex architecture.',
      beforeImg: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      beforeLabel: 'Before: Weak & Peeling',
      afterLabel: 'After: 4-Week Strong BIAB'
    },
    podology: {
      title: 'Severe Heel Hyperkeratosis to Silk Feet',
      subtitle: 'Medical diamond e-file smoothing and restorative herbal active callus softening.',
      beforeImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
      beforeLabel: 'Before: Painful Cracked Callus',
      afterLabel: 'After: Restored Baby-Soft Heels'
    },
    acrylic: {
      title: 'Bitten Nails to Sculpted Babyboomer',
      subtitle: 'Form-sculpted lightweight acrylics with seamless ombre blush-to-milk fade.',
      beforeImg: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
      beforeLabel: 'Before: Short Irregular Beds',
      afterLabel: 'After: Bespoke Sculpted Set'
    }
  };

  const current = transformations[activeTab];

  const handleSliderMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="transformations" className="py-20 lg:py-28 bg-lace relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-redRobin">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-jacobean tracking-tight">
            See The Art of Precision
          </h2>
          <p className="text-base sm:text-lg text-jacobean/75 font-normal leading-relaxed">
            Drag the interactive slider to reveal how 30 years of technique repairs, restores, and elevates hands and feet.
          </p>

          {/* Transformation Type Selector */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('biab')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'biab'
                  ? 'bg-jacobean text-lace shadow-md'
                  : 'bg-white text-jacobean/70 border border-oyster-300 hover:bg-oyster-100'
              }`}
            >
              BIAB Natural Growth
            </button>
            <button
              onClick={() => setActiveTab('podology')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'podology'
                  ? 'bg-jacobean text-lace shadow-md'
                  : 'bg-white text-jacobean/70 border border-oyster-300 hover:bg-oyster-100'
              }`}
            >
              Podology Foot Care
            </button>
            <button
              onClick={() => setActiveTab('acrylic')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'acrylic'
                  ? 'bg-jacobean text-lace shadow-md'
                  : 'bg-white text-jacobean/70 border border-oyster-300 hover:bg-oyster-100'
              }`}
            >
              Sculpted Extensions
            </button>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-oyster-200 space-y-4">
            
            {/* Title & Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-oyster-100 pb-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-jacobean">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-jacobean/70">
                  {current.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-khaki-700 font-semibold shrink-0">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Drag to compare</span>
              </div>
            </div>

            {/* Visual Slider Frame */}
            <div className="relative h-[360px] sm:h-[480px] rounded-2xl overflow-hidden select-none touch-none">
              
              {/* After Image (Background) */}
              <img
                src={current.afterImg}
                alt="After treatment"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-jacobean/90 text-lace text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/20 shadow-md">
                {current.afterLabel}
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={current.beforeImg}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 bg-white/90 text-jacobean text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-xs border border-oyster-300 shadow-md">
                  {current.beforeLabel}
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-jacobean text-lace border-2 border-white shadow-xl flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4 text-gold-400" />
                </div>
              </div>

              {/* Invisible Range Input for Smooth Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderMove}
                aria-label="Comparison slider"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
