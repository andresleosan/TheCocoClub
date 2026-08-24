import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/testimonials';

export const FloatingReviewTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const initialTimer = setTimeout(() => setIsVisible(true), 2500);

    // Rotate review every 8 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const current = TESTIMONIALS_DATA[currentIndex];

  if (!isVisible || !current) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden md:block max-w-sm animate-in slide-in-from-left-4 duration-300">
      <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-oyster-200 text-xs text-jacobean space-y-2 hover:shadow-2xl transition-shadow">
        
        <div className="flex items-center justify-between gap-2 border-b border-oyster-100 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
              Verified Client
            </span>
          </div>

          <span className="text-[10px] text-jacobean/50">{current.date}</span>
        </div>

        <p className="text-xs text-jacobean/85 italic line-clamp-2">
          “{current.highlightPhrase || current.review}”
        </p>

        <div className="flex items-center justify-between text-[11px] text-jacobean/60 pt-0.5">
          <span className="font-bold text-jacobean">{current.name}</span>
          <span className="text-[10px] text-khaki-700">{current.location}</span>
        </div>

      </div>
    </div>
  );
};
