import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  timeframe: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  highlight: string;
}

const TRANSFORMATIONS: CaseStudy[] = [
  {
    id: 't-1',
    title: 'Damaged & Weak Nails to Reinforced BIAB Architecture',
    category: 'Natural Transformation',
    timeframe: '6 Weeks Treatment (2 Infill Cycles)',
    description: 'Client arrived with paper-thin nail beds damaged from mechanical e-filing elsewhere. We applied our gentle Russian dry prep and structured BIAB apex reinforcement.',
    beforeImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: 'Before: Weak & Peeling',
    afterLabel: 'After: Structured BIAB Overlay',
    highlight: 'Zero chipping, 100% natural nail growth underneath'
  },
  {
    id: 't-2',
    title: 'Severe Heel Fissures to Restored Smooth Skin',
    category: 'Clinical Podology',
    timeframe: 'Single 75-Min Session',
    description: 'Deep calluses and painful heel cracks treated with medical diamond rotary abrasion and lipid hydration barrier infusion without painful cutting.',
    beforeImage: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: 'Before: Painful Calluses',
    afterLabel: 'After: Smooth Podological Finish',
    highlight: 'Instant pain relief and supple skin renewal'
  },
  {
    id: 't-3',
    title: 'Sculpted Babyboomer Ombré on Short Bitten Nails',
    category: 'Haute Sculpting',
    timeframe: 'First Appointment (110 Min)',
    description: 'Custom sculpted extensions on paper forms created seamless almond architecture on short nail beds with a soft blush-to-milk white porcelain gradient.',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: 'Before: Short Nail Beds',
    afterLabel: 'After: Sculpted Babyboomer',
    highlight: 'Hand-sculpted forms, no harsh plastic glue tips'
  }
];

export const TransformationSlider: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeCase = TRANSFORMATIONS[activeCaseIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section id="transformations" className="py-20 lg:py-28 bg-lace relative border-t border-oyster-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest-luxury text-redRobin">
            Real Client Results in Saint Helier
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-jacobean tracking-tight uppercase leading-tight">
            Before & After Transformations
          </h2>
          <p className="text-sm sm:text-base text-jacobean/75 font-normal leading-relaxed">
            Drag the interactive slider to reveal how Deoana’s 30+ years of technique restores and elevates natural nails and skin.
          </p>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TRANSFORMATIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIdx(idx);
                setSliderPos(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeCaseIdx === idx
                  ? 'bg-jacobean text-lace shadow-md scale-102'
                  : 'bg-white text-jacobean/70 hover:bg-oyster-200 border border-oyster-200'
              }`}
            >
              {item.category}: {item.title.split(' to ')[0]}
            </button>
          ))}
        </div>

        {/* Transformation Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-oyster-300 shadow-lg max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => (isDragging.current = true)}
              onTouchStart={() => (isDragging.current = true)}
              className="relative h-72 sm:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-oyster-200 shadow-inner"
            >
              {/* After Image (Full background) */}
              <img
                src={activeCase.afterImage}
                alt={activeCase.afterLabel}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-jacobean/90 text-lace text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-xs shadow-xs pointer-events-none">
                {activeCase.afterLabel}
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={activeCase.beforeImage}
                  alt={activeCase.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%'
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 text-jacobean text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-xs shadow-xs border border-oyster-200">
                  {activeCase.beforeLabel}
                </div>
              </div>

              {/* Vertical Handle Divider */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-jacobean text-lace border-2 border-white shadow-xl flex items-center justify-center pointer-events-auto">
                  <MoveHorizontal className="w-4 h-4 text-gold-400" />
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-jacobean/60 font-medium mt-3 flex items-center justify-center gap-1">
              <span>⟵ Drag slider horizontally to compare ⟶</span>
            </p>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-khaki-700">
                {activeCase.timeframe}
              </span>
              <h3 className="font-display text-2xl font-bold text-jacobean uppercase leading-snug mt-1">
                {activeCase.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-jacobean/80 leading-relaxed">
              {activeCase.description}
            </p>

            <div className="p-4 rounded-xl bg-pearlBush/50 border border-oyster-200 text-xs text-jacobean space-y-1">
              <span className="font-bold text-redRobin flex items-center gap-1 uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                Key Treatment Outcome:
              </span>
              <p className="text-jacobean/85 font-medium">{activeCase.highlight}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
