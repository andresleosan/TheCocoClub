import React from 'react'
import { Check, Clock } from 'lucide-react'
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services'
import { ServiceAddOn, ServiceItem } from '../../types'
import { formatDuration, formatPrice } from '../../utils/formatters'

/**
 * Step one — the treatment.
 *
 * Every row here used to be a bare `div onClick`: unreachable by keyboard, silent to a screen
 * reader, and sitting on the one screen a client must get through to reach the studio. They are
 * now a native radio group and a native checkbox group, so selection, arrow-key movement and
 * the state announcement all come from the platform instead of being re-implemented badly.
 *
 * The heading no longer counts the step ("1. Choose Your Treatment") — the stepper above it
 * already says which step this is, and saying it twice just crowded the panel.
 */

interface StepServicesProps {
  selectedService: ServiceItem | null
  onSelectService: (service: ServiceItem) => void
  selectedAddOns: ServiceAddOn[]
  onToggleAddOn: (addon: ServiceAddOn) => void
  /** Owned by the modal, so the panel that receives focus on each step announces its heading. */
  headingId: string
}

/** Shared by both groups: the visible box a hidden native input drives. */
const box = (selected: boolean): string =>
  `flex w-full items-start gap-3 rounded-card border p-4 text-left transition-colors
   peer-focus-visible:ring-2 peer-focus-visible:ring-redRobin-700 ${
     selected
       ? 'border-jacobean bg-pearlBush/60'
       : 'border-oyster-300/70 bg-lace hover:border-oyster-400 hover:bg-pearlBush/30'
   }`

export const StepServices: React.FC<StepServicesProps> = ({
  selectedService,
  onSelectService,
  selectedAddOns,
  onToggleAddOn,
  headingId,
}) => (
  <div className="space-y-8 px-6 py-6 sm:px-8">
    <div>
      <h3 id={headingId} className="u-quote text-lg text-jacobean">
        Choose your treatment
      </h3>
      <p className="mt-1 text-sm text-jacobean/70">
        One appointment, one pair of hands. Prices are the studio's list price — Deoana confirms
        the final figure when she sees your nails.
      </p>
    </div>

    <fieldset className="m-0 border-0 p-0">
      <legend className="sr-only">Treatment</legend>

      <div className="space-y-3">
        {SERVICES_DATA.map((service) => {
          const selected = selectedService?.id === service.id

          return (
            <label key={service.id} className="block cursor-pointer">
              <input
                type="radio"
                name="booking-treatment"
                value={service.id}
                checked={selected}
                onChange={() => onSelectService(service)}
                className="peer sr-only"
              />

              <span className={box(selected)}>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                    selected ? 'border-jacobean bg-jacobean text-lace' : 'border-oyster-400 bg-lace'
                  }`}
                >
                  {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-sm font-semibold text-jacobean">{service.name}</span>
                    <span className="text-sm font-semibold text-jacobean">
                      {formatPrice(service.price)}
                    </span>
                  </span>

                  <span className="mt-1 block text-sm leading-snug text-jacobean/70">
                    {service.shortDescription}
                  </span>

                  <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-khaki-700">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDuration(service.durationMinutes)}
                    {service.badge && (
                      <>
                        <span aria-hidden="true" className="text-oyster-400">
                          ·
                        </span>
                        <span className="text-redRobin-700">{service.badge}</span>
                      </>
                    )}
                  </span>
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>

    <fieldset className="m-0 border-0 p-0">
      <legend className="u-eyebrow mb-1 text-khaki-700">Add to it — optional</legend>
      <p className="mb-3 text-sm text-jacobean/70">
        Each one lengthens the appointment, so the times offered on the next step move with it.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICE_ADDONS.map((addon) => {
          const selected = selectedAddOns.some((a) => a.id === addon.id)

          return (
            <label key={addon.id} className="block cursor-pointer">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onToggleAddOn(addon)}
                className="peer sr-only"
              />

              <span className={box(selected)}>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                    selected ? 'border-jacobean bg-jacobean text-lace' : 'border-oyster-400 bg-lace'
                  }`}
                >
                  {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold text-jacobean">{addon.name}</span>
                    <span className="text-sm font-semibold text-jacobean">
                      +{formatPrice(addon.price)}
                    </span>
                  </span>

                  <span className="mt-1 block text-sm leading-snug text-jacobean/70">
                    {addon.description}
                  </span>

                  {/* Printed as "+15 mins" by hand before, which sidestepped the one formatter
                      that knows how to say "1h 15m". */}
                  <span className="mt-2 block text-xs font-medium text-khaki-700">
                    Adds {formatDuration(addon.durationMinutes)}
                  </span>
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  </div>
)
