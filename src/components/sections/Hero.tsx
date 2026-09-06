import React from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Wordmark, Logomark } from '../brand/BrandMarks'
import { RibbonCorner, RuleWithMark } from '../brand/Decor'
import { STUDIO_INFO } from '../../data/studioInfo'
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp'

interface HeroProps {
  onOpenBooking: () => void
}

/**
 * The hero is the logo, and the logo is the brand.
 *
 * What was here before buried the wordmark under a generic stock photograph and propped the
 * page up with social proof that did not exist: four Unsplash portraits captioned as named
 * Jersey clients, a "+50" counter, "100% 5-Star Client Satisfaction", "100% Hospital
 * Sterility" and a hardcoded "5.0 (Google)" badge. None of it was real, and for a trading
 * business fabricated reviews are a legal exposure, not just a taste problem.
 *
 * What replaces it is true and, said plainly, stronger: one pair of hands, thirty years,
 * one client at a time, on a named street in Saint Helier.
 *
 * Only ONE brand line runs here — "The art of taking care". The second tagline, "Expert
 * hands, latin heart", opens the studio section instead; stacking both made two claims
 * compete and neither land.
 */

/** Facts, not statistics. Each is verifiable from the studio's own information. */
const MARKS = [
  { label: 'One at a time', detail: 'The studio is yours for the whole appointment' },
  { label: `${STUDIO_INFO.experienceYears} years`, detail: 'Nails and foot care in one pair of hands' },
  { label: 'Saint Helier', detail: STUDIO_INFO.address.street },
]

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => (
  <section
    id="top"
    className="relative overflow-hidden bg-gradient-to-b from-pearlBush/45 via-lace to-lace pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-28"
  >
    {/* Kept well clear of the wordmark and the body copy — decoration, not background noise. */}
    <RibbonCorner className="text-pearlBush/60" position="-right-40 -top-52" />
    <RibbonCorner className="text-pearlBush/45" position="-left-56 bottom-0 hidden lg:block" />

    <div className="u-container relative">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Logomark className="h-9 w-auto text-khaki-500 sm:h-11" />

        <h1 className="mt-6 w-full">
          <Wordmark
            title={STUDIO_INFO.name}
            className="mx-auto h-auto w-full max-w-[17.5rem] text-jacobean sm:max-w-[24rem] lg:max-w-[30rem]"
          />
        </h1>

        {/* Italiana is a deco titling face: below about 20px its hairlines break up, so the
            display voice only ever appears at this size or larger. */}
        <p className="u-title mt-7 text-[1.375rem] leading-none tracking-mark text-redRobin-700 sm:text-3xl">
          The Art of Taking Care
        </p>

        <RuleWithMark className="mt-7 text-oyster-500" />

        <p className="u-lede mt-7 text-balance">
          A private studio on {STUDIO_INFO.address.street}, Saint Helier — where{' '}
          {STUDIO_INFO.founder} works with one client at a time. Nails that are built to last,
          feet that stop hurting, and an appointment nobody rushes you through.
        </p>

        {/* One primary action. WhatsApp is deliberately quieter: same destination, offered to
            people who would rather ask something before committing to a slot. */}
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <button onClick={onOpenBooking} className="u-btn-primary group w-full sm:w-auto">
            Book an appointment
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <a
            href={createWhatsAppGeneralInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[2.75rem] items-center gap-2 px-2 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
          >
            <MessageCircle className="h-4 w-4" />
            Or ask a question on WhatsApp
          </a>
        </div>
      </div>

      {/* Body face, not the display face: these are facts to be read, not a title. */}
      <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-card border border-oyster-300/70 bg-oyster-300/60 sm:mt-20 sm:grid-cols-3">
        {MARKS.map((mark) => (
          <div key={mark.label} className="bg-lace px-6 py-6 text-center">
            <dt className="text-base font-semibold tracking-tight text-jacobean">{mark.label}</dt>
            <dd className="mt-1.5 text-[0.8125rem] leading-snug text-jacobean/65">{mark.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)
