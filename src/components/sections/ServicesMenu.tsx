import React, { useState } from 'react';
import { Clock, Check, ArrowRight, Star } from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICES_DATA } from '../../data/services';
import { ServiceCategory, ServiceItem } from '../../types';
import { formatDuration, formatPrice } from '../../utils/formatters';

interface ServicesMenuProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activeDetailModal, setActiveDetailModal] = useState<ServiceItem | null>(null);

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-khaki-700">
            Bespoke Treatment Menu & Pricing
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-jacobean tracking-tight">
            Curated Rituals for Hands & Feet
          </h2>
          <p className="text-base sm:text-lg text-jacobean/75 font-normal leading-relaxed">
            All prices in GBP (£). Every session is a tailored 1-on-1 private appointment with complimentary beverages and medical-grade sterilization.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2.5 no-scrollbar">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-jacobean text-lace shadow-md scale-102'
                    : 'bg-white/80 text-jacobean/80 hover:bg-white hover:text-jacobean border border-oyster-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                service.popular
                  ? 'border-khaki-400 shadow-md ring-1 ring-khaki-400/30'
                  : 'border-oyster-200 shadow-xs'
              }`}
            >
              <div>
                {/* Image Header */}
                <div className="relative h-52 overflow-hidden bg-oyster-100">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jacobean/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {service.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-jacobean/90 text-lace backdrop-blur-xs border border-white/20 shadow-xs">
                        {service.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Pill */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl shadow-md border border-oyster-200">
                    <span className="font-serif text-xl font-bold text-jacobean">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5 text-khaki-700 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDuration(service.durationMinutes)}</span>
                      </div>
                      
                      {/* Star Rating Chip */}
                      <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px] font-bold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>5.0</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-jacobean leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-jacobean/75 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* What's Included bullets */}
                  <div className="space-y-1.5 pt-2 border-t border-oyster-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-jacobean/60">
                      Included in treatment:
                    </p>
                    {service.included.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-jacobean/80">
                        <Check className="w-3.5 h-3.5 text-khaki-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 rounded-2xl bg-jacobean hover:bg-redRobin text-lace text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
                >
                  <span>Book This Ritual</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveDetailModal(service)}
                  className="w-full py-1.5 text-center text-xs font-medium text-jacobean/60 hover:text-redRobin transition-colors"
                >
                  View treatment details & add-ons
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jacobean/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-lace rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-oyster-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveDetailModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-oyster-300 flex items-center justify-center text-jacobean hover:bg-oyster-100"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-redRobin">
                Treatment Overview
              </span>
              <h3 className="font-serif text-2xl font-bold text-jacobean">
                {activeDetailModal.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-jacobean/80 pt-1">
                <span className="font-serif text-xl font-bold text-redRobin">
                  {formatPrice(activeDetailModal.price)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-khaki-700" />
                  {formatDuration(activeDetailModal.durationMinutes)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  5.0 Rating
                </span>
              </div>
            </div>

            <p className="text-sm text-jacobean/80 leading-relaxed">
              {activeDetailModal.fullDescription}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-jacobean">
                Detailed Inclusions:
              </h4>
              <ul className="space-y-2">
                {activeDetailModal.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-jacobean/80">
                    <Check className="w-4 h-4 text-khaki-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-oyster-200 flex gap-3">
              <button
                onClick={() => {
                  const s = activeDetailModal;
                  setActiveDetailModal(null);
                  onSelectService(s);
                }}
                className="w-full py-3 rounded-2xl bg-jacobean hover:bg-redRobin text-lace font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Select & Choose Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
