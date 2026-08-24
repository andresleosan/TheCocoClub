import React from 'react';
import { Check, Clock, Plus, Sparkles } from 'lucide-react';
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services';
import { ServiceItem, ServiceAddOn } from '../../types';
import { formatDuration, formatPrice } from '../../utils/formatters';

interface StepServicesProps {
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem) => void;
  selectedAddOns: ServiceAddOn[];
  onToggleAddOn: (addon: ServiceAddOn) => void;
}

export const StepServices: React.FC<StepServicesProps> = ({
  selectedService,
  onSelectService,
  selectedAddOns,
  onToggleAddOn,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-bold text-jacobean">
          1. Choose Your Treatment
        </h3>
        <p className="text-xs sm:text-sm text-jacobean/70">
          Select a signature treatment tailored by Deoana Moreno.
        </p>
      </div>

      {/* Main Service List */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {SERVICES_DATA.map((service) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isSelected
                  ? 'border-redRobin bg-redRobin-50/50 shadow-sm ring-1 ring-redRobin'
                  : 'border-oyster-200 bg-white hover:border-oyster-300 hover:bg-oyster-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-redRobin border-redRobin text-white'
                      : 'border-oyster-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-base font-bold text-jacobean leading-tight">
                      {service.name}
                    </h4>
                    {service.badge && (
                      <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-bold bg-khaki-100 text-khaki-800 rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-jacobean/60 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-khaki-600" />
                      {formatDuration(service.durationMinutes)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-serif text-lg font-bold text-jacobean">
                  {formatPrice(service.price)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Luxury Add-ons Section */}
      <div className="pt-4 border-t border-oyster-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-jacobean">
              Enhance Your Experience (Optional Add-ons)
            </h4>
          </div>
          <span className="text-xs text-jacobean/50">Select any that apply</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
          {SERVICE_ADDONS.map((addon) => {
            const isAddonSelected = selectedAddOns.some(a => a.id === addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddOn(addon)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                  isAddonSelected
                    ? 'border-khaki bg-khaki-50/70 ring-1 ring-khaki'
                    : 'border-oyster-200 bg-white hover:border-oyster-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border text-[10px] ${
                      isAddonSelected
                        ? 'bg-khaki border-khaki text-white'
                        : 'border-oyster-300 bg-white'
                    }`}
                  >
                    {isAddonSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-jacobean leading-tight">
                      {addon.name}
                    </p>
                    <p className="text-[11px] text-jacobean/60 line-clamp-1">
                      +{addon.durationMinutes} mins • {addon.description}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-redRobin shrink-0">
                  +{formatPrice(addon.price)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
