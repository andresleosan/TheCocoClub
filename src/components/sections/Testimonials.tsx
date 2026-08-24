import React, { useState } from 'react';
import { 
  Star, CheckCircle, Quote, MessageSquarePlus, 
  ExternalLink, ThumbsUp 
} from 'lucide-react';
import { Testimonial } from '../../types';
import { WriteReviewModal } from '../reviews/WriteReviewModal';

const GOOGLE_MAPS_REVIEW_URL = "https://www.google.com/search?sca_esv=950999559134ba52&rlz=1CDGOYI_enGG800GG800&hl=en-GB&sxsrf=APpeQntVohVq7D3VLYSlCF1zPOff2wjGBQ%3A1787593942100&kgmid=%2Fg%2F11ntdkgtv3&q=The%20Coco%20Club&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm4%2F3";

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddReview: (review: Testimonial) => void;
  onBookTreatment: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  onAddReview,
  onBookTreatment,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: string]: number }>({});

  const filterTabs = [
    { id: 'all', label: 'All Reviews (5.0 ★)' },
    { id: 'signature-biab', label: 'Signature BIAB & Manicure' },
    { id: 'podology-care', label: 'Clinical Podology' },
    { id: 'sculpted-extensions', label: 'Sculpted Extensions' },
    { id: 'haute-nail-art', label: 'Haute Nail Art' },
    { id: 'spa-rituals', label: 'Restorative Spa' }
  ];

  const filteredReviews = activeCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.serviceCategory === activeCategory);

  const handleHelpfulClick = (id: string) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative border-t border-oyster-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-luxury shadow-xs">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>Google Reviews • 5.0 Rating in Saint Helier</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-jacobean tracking-tight uppercase leading-tight">
            Loved by Women Across Jersey
          </h2>
          
          <p className="text-sm sm:text-base text-jacobean/75 font-normal leading-relaxed">
            Read genuine experiences from our private atelier clients in Saint Helier, Saint Brelade, Saint Clement and beyond.
          </p>
        </div>

        {/* Reputation Summary Showcase Banner */}
        <div className="bg-pearlBush/50 rounded-3xl p-6 sm:p-8 border border-oyster-300 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: 5.0 Big Rating */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-oyster-300 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="font-display text-6xl sm:text-7xl font-normal text-jacobean leading-none">5.0</span>
                <span className="text-sm font-semibold text-jacobean/60 font-sans">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-jacobean/70 font-medium">
                Based on verified client reviews & Google Business ratings
              </p>
            </div>

            {/* Middle: Key Trust Metrics */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4 text-center sm:text-left">
              <div>
                <p className="font-display text-3xl font-normal text-khaki-800">100%</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-jacobean/70">Recommendation</p>
              </div>
              <div>
                <p className="font-display text-3xl font-normal text-redRobin">4+ Weeks</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-jacobean/70">BIAB Retention</p>
              </div>
              <div>
                <p className="font-display text-3xl font-normal text-jacobean">30+ Yrs</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-jacobean/70">Master Specialty</p>
              </div>
              <div>
                <p className="font-display text-3xl font-normal text-emerald-700">100%</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-jacobean/70">Sterile Autoclave</p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="md:col-span-3 flex flex-col gap-2.5">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="w-full py-3 px-4 rounded-2xl bg-jacobean hover:bg-redRobin text-lace text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4 text-gold-400" />
                <span>Write a Review</span>
              </button>

              <a
                href={GOOGLE_MAPS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-oyster-100 border border-oyster-300 text-jacobean text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View on Google</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? 'bg-jacobean text-lace shadow-xs'
                  : 'bg-lace text-jacobean/70 hover:bg-oyster-200 border border-oyster-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item) => {
            const extraHelpful = helpfulVotes[item.id] || 0;
            const totalHelpful = (item.helpfulCount || 10) + extraHelpful;

            return (
              <div
                key={item.id}
                className="bg-lace rounded-3xl p-6 sm:p-7 border border-oyster-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Client Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover border border-oyster-300"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-jacobean text-lace flex items-center justify-center font-display font-bold text-lg">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-lg font-bold text-jacobean">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-khaki-700 font-semibold uppercase tracking-wider">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  {/* Stars & Service Tag */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-jacobean/50 font-medium">{item.date}</span>
                    </div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-redRobin bg-redRobin-50 px-2 py-0.5 rounded-md">
                      {item.service}
                    </span>
                  </div>

                  {/* Highlight Quote */}
                  {item.highlightPhrase && (
                    <div className="p-3 rounded-xl bg-white border border-oyster-200 text-xs font-semibold text-jacobean italic border-l-4 border-l-redRobin font-bodySerif">
                      "{item.highlightPhrase}"
                    </div>
                  )}

                  {/* Full Text */}
                  <p className="text-xs sm:text-sm text-jacobean/80 leading-relaxed">
                    {item.review}
                  </p>
                </div>

                {/* Card Footer: Helpful button */}
                <div className="pt-4 mt-4 border-t border-oyster-200/80 flex items-center justify-between text-xs text-jacobean/60">
                  <button
                    onClick={() => handleHelpfulClick(item.id)}
                    className="inline-flex items-center gap-1.5 hover:text-redRobin transition-colors group text-xs font-semibold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Helpful ({totalHelpful})</span>
                  </button>

                  <Quote className="w-4 h-4 text-oyster-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Book or Review on Google */}
        <div className="mt-14 p-8 rounded-3xl bg-jacobean text-lace flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-3xl font-normal text-lace uppercase">
              Ready to Join Our Community of Delighted Clients?
            </h3>
            <p className="text-xs sm:text-sm text-oyster-300 max-w-xl">
              Experience the private atelier difference. Every appointment is treated with unhurried care and Latin warmth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onBookTreatment}
              className="px-6 py-3 rounded-full bg-redRobin hover:bg-redRobin-light text-lace font-bold uppercase tracking-wider text-xs shadow-md transition-colors text-center"
            >
              Book Your Appointment
            </button>
            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-lace font-bold uppercase tracking-wider text-xs border border-white/20 transition-colors text-center flex items-center justify-center gap-1.5"
            >
              <span>Read on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmitReview={(newRev) => {
          onAddReview(newRev);
        }}
      />
    </section>
  );
};