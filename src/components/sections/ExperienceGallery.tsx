import React, { useState } from 'react';
import { GALLERY_DATA } from '../../data/gallery';
import { GalleryItem } from '../../types';
import { Sparkles, ZoomIn, X } from 'lucide-react';

export const ExperienceGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', name: 'All Haute Works' },
    { id: 'biab', name: 'BIAB & Natural Gel' },
    { id: 'sculpting', name: 'Sculpted Extensions' },
    { id: 'nail-art', name: 'Bespoke Nail Art' },
    { id: 'pedicure', name: 'Podology & Pedicure' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-khaki-100/80 border border-khaki-300 text-khaki-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-luxury">
            <Sparkles className="w-3.5 h-3.5 text-khaki-700" />
            <span>Curated Atelier Portfolio</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-jacobean tracking-tight uppercase leading-tight">
            The Lookbook
          </h2>
          <p className="text-sm sm:text-base text-jacobean/75 font-normal leading-relaxed">
            Every set is customized to the client's skin tone, natural nail architecture, and lifestyle.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-jacobean text-lace shadow-md scale-102'
                  : 'bg-lace text-jacobean/70 hover:bg-oyster-200 border border-oyster-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-square cursor-pointer bg-oyster-100 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-jacobean/90 via-jacobean/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-lace">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-lace uppercase leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-lace">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-jacobean/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-lace rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 relative animate-in zoom-in-95"
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-jacobean/80 text-lace flex items-center justify-center hover:bg-redRobin transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] overflow-hidden bg-jacobean">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-full object-contain max-h-[60vh] mx-auto"
              />
            </div>

            <div className="p-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-redRobin">
                {lightboxItem.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-jacobean uppercase">
                {lightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-jacobean/80 leading-relaxed font-bodySerif">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
