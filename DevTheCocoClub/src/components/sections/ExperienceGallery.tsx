import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { GALLERY_DATA } from '../../data/gallery';
import { STUDIO_INFO } from '../../data/studioInfo';
import { InstagramIcon } from '../ui/InstagramIcon';

export const ExperienceGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Showcase' },
    { id: 'nail-art', label: 'Haute Nail Art' },
    { id: 'sculpting', label: 'Sculpted Extensions' },
    { id: 'biab', label: 'Natural BIAB' },
    { id: 'pedicure', label: 'Clinical Pedicures' },
    { id: 'studio', label: 'Private Studio' },
  ];

  const items = activeFilter === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(g => g.category === activeFilter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-pearlBush/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-khaki-700">
              The Coco Club Lookbook
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-jacobean tracking-tight">
              Artistry Crafted with Love
            </h2>
            <p className="text-sm sm:text-base text-jacobean/75 max-w-xl">
              Every set is tailored specifically to your skin undertone, nail bed architecture, and personal aesthetic.
            </p>
          </div>

          {/* Instagram Link */}
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-oyster-300 text-jacobean hover:bg-jacobean hover:text-lace transition-colors text-xs sm:text-sm font-semibold shadow-xs self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-redRobin" />
            <span>Follow {STUDIO_INFO.instagram}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-redRobin text-lace shadow-xs'
                  : 'bg-white/80 text-jacobean/80 hover:bg-white border border-oyster-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-oyster-200"
            >
              <div className="relative h-80 overflow-hidden bg-oyster-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jacobean/80 via-jacobean/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-lace opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-serif text-lg font-bold leading-tight">{item.title}</h4>
                  <p className="text-xs text-oyster-200 mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jacobean/80 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-lace rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-oyster-300"
          >
            <div className="relative h-96 sm:h-[450px]">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-jacobean/80 text-white flex items-center justify-center hover:bg-jacobean transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-bold text-jacobean">
                  {selectedPhoto.title}
                </h3>
                <div className="flex gap-1.5">
                  {selectedPhoto.tags.map((t: string, i: number) => (
                    <span key={i} className="px-2.5 py-0.5 text-[11px] font-semibold bg-oyster-200 text-jacobean rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-jacobean/80 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
