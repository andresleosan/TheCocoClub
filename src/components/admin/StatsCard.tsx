import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass = 'bg-khaki-100 text-khaki-700',
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-oyster-200 shadow-xs flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-jacobean/60">
          {title}
        </p>
        <p className="font-serif text-2xl sm:text-3xl font-bold text-jacobean">
          {value}
        </p>
        {subtitle && (
          <p className="text-[11px] text-jacobean/50 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
