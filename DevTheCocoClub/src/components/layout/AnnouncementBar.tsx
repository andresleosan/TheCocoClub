import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Sparkles, Clock } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';

export const AnnouncementBar: React.FC = () => {
  const [jerseyTime, setJerseyTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Jersey',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        setJerseyTime(timeStr);
      } catch {
        const d = new Date();
        setJerseyTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-jacobean text-oyster-100 text-xs py-2 px-4 border-b border-jacobean-600/40 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Credential & Founder */}
        <div className="flex items-center justify-center sm:justify-start gap-2 font-medium tracking-wide">
          <span className="inline-flex items-center justify-center p-0.5 bg-khaki/30 text-khaki-300 rounded-full">
            <Sparkles className="w-3 h-3 text-gold-400" />
          </span>
          <span className="text-lace/90">
            Private 1-on-1 Nail Atelier & Clinical Podology
          </span>
          <span className="hidden md:inline text-oyster-400">•</span>
          <span className="hidden md:inline text-oyster-300 font-light italic">
            Led by Deoana Moreno ({STUDIO_INFO.experienceYears} Yrs Mastery)
          </span>
        </div>

        {/* Right: Jersey Live Time, Location & Phone */}
        <div className="flex items-center justify-center sm:justify-end gap-4 text-oyster-200">
          {jerseyTime && (
            <div className="hidden lg:flex items-center gap-1.5 text-gold-300 font-mono text-[11px]">
              <Clock className="w-3 h-3" />
              <span>Jersey: {jerseyTime}</span>
              <span className="text-oyster-500">|</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-khaki-400" />
            <span>14 La Motte St, Saint Helier</span>
          </div>

          <span className="text-oyster-500 hidden sm:inline">|</span>

          <a
            href={`tel:${STUDIO_INFO.phone}`}
            className="flex items-center gap-1.5 hover:text-gold-300 transition-colors font-medium text-lace"
          >
            <Phone className="w-3 h-3 text-redRobin-300" />
            <span>{STUDIO_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
