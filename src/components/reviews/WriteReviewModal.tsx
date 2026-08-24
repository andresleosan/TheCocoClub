import React, { useState } from 'react';
import { Star, X, Check, Heart, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Testimonial, ServiceCategory } from '../../types';
import { SERVICES_DATA } from '../../data/services';

const GOOGLE_MAPS_REVIEW_URL = "https://www.google.com/search?sca_esv=950999559134ba52&rlz=1CDGOYI_enGG800GG800&hl=en-GB&sxsrf=APpeQntVohVq7D3VLYSlCF1zPOff2wjGBQ%3A1787593942100&kgmid=%2Fg%2F11ntdkgtv3&q=The%20Coco%20Club&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm4%2F3";

const JERSEY_PARISHES = [
  'Saint Helier, Jersey',
  'Saint Brelade, Jersey',
  'Saint Clement, Jersey',
  'Saint Saviour, Jersey',
  'Saint Peter, Jersey',
  'Saint Ouen, Jersey',
  'Grouville, Jersey',
  'Saint Lawrence, Jersey',
  'Saint Martin, Jersey',
  'Saint John, Jersey',
  'Trinity, Jersey',
  'Saint Mary, Jersey'
];

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Testimonial) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(JERSEY_PARISHES[0]);
  const [service, setService] = useState(SERVICES_DATA[0].name);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) return;

    const matchedService = SERVICES_DATA.find(s => s.name === service);
    const newTestimonial: Testimonial = {
      id: `review-${Date.now()}`,
      name,
      location,
      service,
      serviceCategory: matchedService?.category || 'signature-biab',
      rating,
      title: title || 'Exceptional experience with Deoana',
      review,
      date: 'Just now',
      verified: true,
      helpfulCount: 1,
      highlightPhrase: review.slice(0, 75) + (review.length > 75 ? '...' : '')
    };

    onSubmitReview(newTestimonial);
    setIsSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#737F51', '#8C3B2B', '#C5A059', '#D7CEBE']
    });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setTitle('');
    setReview('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-jacobean/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-lace rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-oyster-300 relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-oyster-300 flex items-center justify-center text-jacobean hover:bg-oyster-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-jacobean">
                Thank You for Supporting The Coco Club!
              </h3>
              <p className="text-sm text-jacobean/75 max-w-md mx-auto">
                Your review has been published on our client testimonial wall. Your kind words mean the world to Deoana and help women in Jersey discover bespoke master nail care.
              </p>
            </div>

            {/* Also Post to Google CTA */}
            <div className="p-4 rounded-2xl bg-white border border-oyster-200 text-xs space-y-2 max-w-sm mx-auto">
              <p className="font-bold text-jacobean">Help us grow on Google Maps:</p>
              <a
                href={GOOGLE_MAPS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-jacobean text-lace font-semibold hover:bg-redRobin transition-colors"
              >
                <span>Copy & Post to Google Review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-oyster-200 text-jacobean font-semibold text-xs hover:bg-oyster-300 transition-colors"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-redRobin">
                Client Feedback & Social Proof
              </span>
              <h3 className="font-serif text-2xl font-bold text-jacobean">
                Share Your Experience at The Coco Club
              </h3>
              <p className="text-xs text-jacobean/70">
                Rate your private appointment with Deoana Moreno in Saint Helier.
              </p>
            </div>

            {/* Star Rating Picker */}
            <div className="bg-white p-4 rounded-2xl border border-oyster-200 text-center space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-jacobean block">
                Your Overall Rating
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-oyster-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-amber-700 block">
                {rating === 5 ? '★★★★★ 5.0 — Exceptional / Perfection' : `${rating}.0 Stars`}
              </span>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-jacobean">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Charlotte L."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-xs text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-jacobean">Jersey Parish *</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-xs text-jacobean focus:outline-none"
                >
                  {JERSEY_PARISHES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Treatment Received *</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-xs text-jacobean focus:outline-none"
              >
                {SERVICES_DATA.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Review Title</label>
              <input
                type="text"
                placeholder="e.g. Best BIAB in Jersey, lasted 4+ weeks!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 bg-white text-xs text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-jacobean">Your Review & Comments *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe your appointment, the studio atmosphere, cuticle care, hospitality..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-oyster-300 bg-white text-xs text-jacobean focus:outline-none focus:ring-2 focus:ring-redRobin/20"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-oyster-300 bg-white text-xs font-semibold text-jacobean hover:bg-oyster-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-jacobean hover:bg-redRobin text-lace text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Submit Review</span>
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
