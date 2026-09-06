import React, { useState } from 'react'
import { CalendarPlus, MessageCircle, Phone } from 'lucide-react'
import { Booking } from '../../types'
import { STUDIO_INFO, STUDIO_ADDRESS_LINE } from '../../data/studioInfo'
import { formatDateFriendly, formatDuration, formatPrice } from '../../utils/formatters'
import { generateIcsCalendarFile } from '../../utils/calendar'
import { createWhatsAppBookingLink } from '../../utils/whatsapp'

/**
 * Step four — the hand-off. This screen carried the site's most damaging defect.
 *
 * It fired confetti, stamped the request CONFIRMED in green, and told the client their
 * appointment "has been registered with Deoana Moreno". None of that was true: `addBooking()`
 * writes to the visitor's own localStorage and nothing else, so a client who stopped here —
 * and the celebration invited them to stop here — was never heard from. WhatsApp was one of
 * two equal-weight buttons, labelled "Notify on WhatsApp", as though the studio already knew.
 *
 * So the screen now says the only true thing: nothing has reached the studio yet, and sending
 * the message is what sends the request. The confetti is gone with it — there is nothing to
 * celebrate until Deoana replies. The reference number and the .ics are deliberately quiet;
 * the calendar file is written as a tentative event for the same reason.
 */

interface StepConfirmationProps {
  booking: Booking
  onClose: () => void
}

const SummaryRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <dt className="u-eyebrow text-khaki-700">{label}</dt>
    <dd className="mt-1 text-sm text-jacobean">{children}</dd>
  </div>
)

export const StepConfirmation: React.FC<StepConfirmationProps> = ({ booking, onClose }) => {
  // Following the link leaves the page, so the follow-up note is guidance for the client who
  // comes back — including the one whose device has no WhatsApp and needs the phone number.
  const [handedOff, setHandedOff] = useState(false)

  return (
    <div className="space-y-6 px-6 py-6 sm:px-8">
      <section className="rounded-panel bg-jacobean-900 px-5 py-6 text-lace sm:px-6">
        <h3 className="u-title text-xl leading-tight sm:text-2xl">Send it to the studio</h3>

        <p className="mt-2 text-sm leading-relaxed text-oyster-300">
          Nothing has reached Deoana yet. Your request arrives when you send this WhatsApp
          message — she reads it herself and replies to confirm the time.
        </p>

        <a
          href={createWhatsAppBookingLink(booking)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setHandedOff(true)}
          className="u-btn-inverse mt-5 w-full"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send my request on WhatsApp
        </a>

        {handedOff && (
          <p className="mt-4 flex items-start gap-2 border-t border-lace/15 pt-4 text-sm text-oyster-300">
            <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              If WhatsApp did not open, ring the studio on{' '}
              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s/g, '')}`}
                className="font-semibold text-lace underline decoration-oyster-400 underline-offset-4"
              >
                {STUDIO_INFO.phoneDisplay}
              </a>{' '}
              and quote your reference.
            </span>
          </p>
        )}
      </section>

      <section className="u-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-oyster-300/70 pb-4">
          <div>
            <p className="u-eyebrow text-khaki-700">Reference</p>
            <p className="mt-1 font-mono text-sm font-semibold text-jacobean">
              {booking.referenceNumber}
            </p>
          </div>
          <span className="rounded-full border border-khaki-500 px-3 py-1 text-xs font-semibold text-khaki-700">
            Awaiting confirmation
          </span>
        </div>

        <dl className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="u-eyebrow text-khaki-700">Treatment</dt>
            <dd className="mt-1 text-sm text-jacobean">
              {booking.serviceName}
              {booking.addOns.length > 0 && (
                <span className="mt-1 block text-sm text-jacobean/70">
                  with {booking.addOns.map((addon) => addon.name).join(', ')}
                </span>
              )}
            </dd>
          </div>

          <SummaryRow label="Day and time">
            {/* Printed as a raw ISO string here before — "2026-09-12 at 15:00". */}
            {formatDateFriendly(booking.date)}
            <span className="mt-1 block text-sm text-jacobean/70">
              {booking.timeSlot} · about {formatDuration(booking.totalDurationMinutes)}
            </span>
          </SummaryRow>

          <SummaryRow label="Studio price">
            {formatPrice(booking.totalPrice)}
            <span className="mt-1 block text-sm text-jacobean/70">
              Payable at the studio. Deoana confirms the figure with the time.
            </span>
          </SummaryRow>

          {booking.beveragePreference && (
            <SummaryRow label="To drink">{booking.beveragePreference}</SummaryRow>
          )}

          <SummaryRow label="Where">{STUDIO_ADDRESS_LINE}</SummaryRow>
        </dl>
      </section>

      <div className="space-y-2">
        <button type="button" onClick={() => generateIcsCalendarFile(booking)} className="u-btn-secondary">
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Save to my calendar
        </button>
        <p className="text-sm text-jacobean/70">
          Saved as a tentative event, since the time is not settled until the studio replies.
        </p>
      </div>

      {/* The modal footer carries Close as well; this one is here for anyone reading straight
          down the panel on a phone. */}
      <button
        type="button"
        onClick={onClose}
        className="text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin"
      >
        Back to the site
      </button>
    </div>
  )
}
