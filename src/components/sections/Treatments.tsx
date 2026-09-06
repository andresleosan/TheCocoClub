import React, { useState } from 'react'
import { ArrowRight, Check, Clock, MessageCircle } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { RibbonCorner, RuleWithMark } from '../brand/Decor'
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services'
import { ServiceAddOn, ServiceCategory, ServiceItem } from '../../types'
import { formatDuration, formatPrice } from '../../utils/formatters'
import { createWhatsAppServiceInquiryLink } from '../../utils/whatsapp'

interface TreatmentsProps {
  onSelectService: (service: ServiceItem) => void
}

/**
 * The menu. This is the section most visitors came for, so it is set as a price list rather
 * than a third grid of cards.
 *
 * What was here before was a filter bar over fifteen image cards, each one carrying a hot-linked
 * Unsplash photograph that had nothing to do with this studio, a star rating nobody had given,
 * and the treatment name in letterspaced Italiana caps — which printed "THE COCO CLUB SIGNATURE
 * BIAB OVERLAY" in a titling face that falls apart at that size. A typeset list fixes all three
 * at once: no images to fake, no ratings to invent, and the names set in the body face where
 * they are actually readable.
 *
 * Category tabs are gone too. Five categories over a dozen treatments is a list you can simply
 * read, and hiding four fifths of the menu behind a filter is the opposite of what a menu is for.
 */

/**
 * Group headings live here rather than being read from SERVICE_CATEGORIES, because this list
 * also fixes the order the menu reads in — natural nails first, then length, then feet, then
 * the extras. 'all' is a filter value, never a group.
 */
const GROUPS: { id: Exclude<ServiceCategory, 'all'>; label: string }[] = [
  { id: 'signature-biab', label: 'BIAB & natural nails' },
  { id: 'sculpted-extensions', label: 'Sculpted extensions' },
  { id: 'podology-care', label: 'Podology & pedicures' },
  { id: 'haute-nail-art', label: 'Nail art' },
  { id: 'spa-rituals', label: 'Restorative rituals' },
]

interface MenuGroup {
  id: string
  label: string
  items: ServiceItem[]
}

const MENU: MenuGroup[] = [
  ...GROUPS.map((group) => ({
    ...group,
    items: SERVICES_DATA.filter((service) => service.category === group.id),
  })),
  // A treatment filed under a category this list has not been told about would otherwise drop
  // off the menu with nothing to show for it. Prices are not something to lose silently.
  {
    id: 'other',
    label: 'Also on the menu',
    items: SERVICES_DATA.filter((service) => !GROUPS.some((group) => group.id === service.category)),
  },
].filter((group) => group.items.length > 0)

/** The booker opens on its treatment step, so this is a starting point rather than a choice. */
const [FIRST_TREATMENT] = SERVICES_DATA

const recommendedAddOnsFor = (service: ServiceItem): ServiceAddOn[] =>
  (service.recommendedAddons ?? [])
    .map((id) => SERVICE_ADDONS.find((addOn) => addOn.id === id))
    .filter((addOn): addOn is ServiceAddOn => addOn !== undefined)

export const Treatments: React.FC<TreatmentsProps> = ({ onSelectService }) => {
  const [detail, setDetail] = useState<ServiceItem | null>(null)
  const addOns = detail ? recommendedAddOnsFor(detail) : []

  return (
    <section id="treatments" className="relative overflow-hidden bg-lace u-section">
      {/* Sits high enough that only the section's top padding is behind it — decoration must
          never end up under a price. */}
      <RibbonCorner className="hidden text-pearlBush/50 lg:block" position="-right-56 -top-72" />

      <div className="u-container relative">
        {/* The header runs across two columns rather than centred, so the page stops repeating
            the same centred-eyebrow-and-headline rhythm in every section. */}
        <div className="grid gap-8 border-b border-oyster-300/70 pb-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="u-eyebrow text-khaki-700">The menu</p>
            <h2 className="u-title mt-4 text-display-sm text-jacobean">Treatments &amp; prices</h2>
            <RuleWithMark className="mt-6 text-oyster-500" />
          </div>

          <div>
            <p className="u-lede">
              One client at a time, so the time beside each treatment is the whole appointment
              rather than a slot on a rota. Prices are in pounds and cover the treatment itself.
            </p>
            {/* Nothing on this page books anything. Say so where the prices are, not only at
                the end of the form. */}
            <p className="mt-3 max-w-prose text-sm text-jacobean/65">
              Choosing one starts a request. Deoana confirms the day and time with you on
              WhatsApp before anything is held.
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {MENU.map((group) => (
            <section key={group.id} aria-labelledby={`treatments-${group.id}`}>
              <h3 id={`treatments-${group.id}`} className="u-eyebrow text-khaki-700">
                {group.label}
              </h3>

              <ul className="mt-5 border-t border-oyster-300/70">
                {group.items.map((service) => (
                  <li key={service.id} className="border-b border-oyster-300/70">
                    <div className="grid gap-x-8 gap-y-4 py-7 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                          {/* Syne, sentence case. The display face is a titling face and has no
                              business setting a fourteen-word treatment name. */}
                          <button
                            type="button"
                            onClick={() => setDetail(service)}
                            aria-haspopup="dialog"
                            className="text-left text-base font-semibold leading-snug text-jacobean underline-offset-4 transition-colors hover:text-redRobin hover:underline sm:text-lg"
                          >
                            {service.name}
                            <span className="sr-only"> — see what is included</span>
                          </button>

                          {/* Studio's own wording, and it can run to a few words, so it is not
                              set as letterspaced caps like the rest of the micro-labels. */}
                          {service.badge && (
                            <span className="rounded-full border border-oyster-300 bg-pearlBush/60 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-khaki-700">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-jacobean/70">
                          {service.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-3">
                        <div className="sm:text-right">
                          <div className="text-lg font-semibold tabular-nums text-jacobean">
                            {formatPrice(service.price)}
                          </div>
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-jacobean/65 sm:justify-end">
                            <Clock className="h-3.5 w-3.5 text-khaki-500" aria-hidden="true" />
                            {formatDuration(service.durationMinutes)}
                          </div>
                        </div>

                        {/* Every row carries the same label, so the treatment name goes into the
                            accessible name instead of leaving a screen reader eleven "Request"s. */}
                        <button
                          type="button"
                          onClick={() => onSelectService(service)}
                          aria-label={`Request ${service.name}`}
                          className="u-btn-secondary u-btn-sm shrink-0"
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-oyster-300/70 pt-12 text-center">
          {FIRST_TREATMENT && (
            <button
              type="button"
              onClick={() => onSelectService(FIRST_TREATMENT)}
              className="group u-btn-primary"
            >
              Request an appointment
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          )}

          <p className="max-w-prose text-sm text-jacobean/70">
            Not sure where to start?{' '}
            <a
              href="#finder"
              className="font-medium text-jacobean underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
            >
              The treatment finder just below
            </a>{' '}
            narrows the menu down for you.
          </p>
        </div>
      </div>

      {/* The old detail view was a hand-rolled overlay: no dialog role, no Escape, no focus trap
          and no scroll lock. This is the shared primitive. */}
      {detail && (
        <Modal
          isOpen
          onClose={() => setDetail(null)}
          title={detail.name}
          subtitle={`${formatPrice(detail.price)} · ${formatDuration(detail.durationMinutes)}`}
          size="md"
          footer={
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={createWhatsAppServiceInquiryLink(detail.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
              >
                <MessageCircle className="h-4 w-4" />
                Ask about this treatment
              </a>

              <button
                type="button"
                onClick={() => {
                  onSelectService(detail)
                  setDetail(null)
                }}
                className="group u-btn-primary"
              >
                Request this treatment
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          }
        >
          <div className="space-y-7 px-6 py-6">
            <p className="text-sm leading-relaxed text-jacobean/80">{detail.fullDescription}</p>

            <div>
              <h3 className="u-eyebrow text-khaki-700">What the appointment includes</h3>
              <ul className="mt-3 space-y-2.5">
                {detail.included.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-jacobean/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-khaki-500" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {addOns.length > 0 && (
              <div className="u-card-quiet px-5 py-4">
                <h3 className="u-eyebrow text-khaki-700">Often added</h3>
                <ul className="mt-3 space-y-2">
                  {addOns.map((addOn) => (
                    <li
                      key={addOn.id}
                      className="flex items-baseline justify-between gap-4 text-sm text-jacobean/80"
                    >
                      <span>{addOn.name}</span>
                      <span className="shrink-0 tabular-nums font-medium text-jacobean">
                        + {formatPrice(addOn.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-jacobean/70">
                  Add these when you send the request, or decide with Deoana in the studio.
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  )
}
