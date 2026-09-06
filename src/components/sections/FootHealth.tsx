import React from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { RibbonBand, RuleWithMark } from '../brand/Decor'
import { STUDIO_INFO } from '../../data/studioInfo'
import { SERVICES_DATA } from '../../data/services'
import { formatDuration, formatPrice } from '../../utils/formatters'
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp'
import { ServiceItem } from '../../types'

interface FootHealthProps {
  onOpenBooking: (service?: ServiceItem) => void
}

/**
 * The page's one dark band, and its structural hinge: everything above it is the studio and
 * the treatments, everything below it is practicalities. Because it is the only inversion on
 * the page it does not need to raise its voice — the change of ground is the emphasis.
 *
 * Two things were wrong with the section this replaces.
 *
 * First, the language. It sold "clinical podology", "medical foot care", "hospital-grade
 * sterility" and "diagnose and treat", under a stethoscope icon. Deoana is a nail technician
 * and podology specialist, not a regulated healthcare practitioner — and "chiropodist" and
 * "podiatrist" are protected titles in Jersey and the UK. None of that framing may appear
 * here. What is left is the truthful version, and it sells perfectly well: thirty years of
 * doing this, in a closed room, without rushing.
 *
 * Second, the CTA advertised £85 and booked the £65 treatment. The price is now read from the
 * same record the booking modal receives, so the two cannot drift apart again.
 *
 * The reader this is written for is embarrassed about their feet. Every line is checked
 * against that: plain nouns, no squeamishness, and no suggestion they left it too late.
 */

/** The treatment this section books. Named once, so the lookup and the price cannot disagree. */
const FOOT_CARE_SERVICE_ID = 'srv-medical-podology'

/** The category fallback means a rename in the data file degrades to the right kind of
 *  treatment rather than to whatever happens to sit first in SERVICES_DATA. */
const FOOT_CARE: ServiceItem | undefined =
  SERVICES_DATA.find((service) => service.id === FOOT_CARE_SERVICE_ID) ??
  SERVICES_DATA.find((service) => service.category === 'podology-care')

const CTA_LABEL = FOOT_CARE
  ? `Request foot care · ${formatPrice(FOOT_CARE.price)}`
  : 'Request foot care'

/**
 * Named the way a client would name them. The old list said "hyperkeratosis debridement" and
 * "involuted edge relieving" — regulated-sounding, and no help at all to someone working out
 * whether their particular problem is one this studio deals with.
 */
const COMMON_REASONS = [
  {
    title: 'Hard skin and calluses',
    detail:
      'Built-up skin across the ball of the foot or the heel, taken down gradually over the appointment until standing on it is comfortable again.',
  },
  {
    title: 'Cracked heels',
    detail:
      'Softened, smoothed back and finished with a barrier cream, so the splits get a chance to close instead of reopening every week.',
  },
  {
    title: 'Thickened toenails',
    detail:
      'Reduced and reshaped by hand until the nail sits flat again and shoes stop pressing on it.',
  },
  {
    title: 'A nail corner that catches',
    detail:
      'The corner eased clear and filed smooth where it is digging in — slowly, and she tells you before she does anything.',
  },
]

export const FootHealth: React.FC<FootHealthProps> = ({ onOpenBooking }) => (
  <section id="foot-health" className="u-section relative overflow-hidden bg-jacobean-800 text-lace">
    {/* One step lighter than the ground: the ribbons should be felt at the edges of the band
        rather than seen behind the copy. */}
    {/* Held at low contrast: the bottom band runs behind the CTA's supporting line, and at full
        jacobean-700 the ribbons competed with copy that people actually need to read. */}
    <RibbonBand edge="top" className="text-jacobean-700/60" />
    <RibbonBand edge="bottom" className="text-jacobean-700/40" flip />

    <div className="u-container relative">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <p className="u-eyebrow text-khaki-300">Foot care &amp; podology</p>

          <h2 className="u-title mt-4 text-display-sm text-lace">Proper foot care</h2>

          {/* The line most likely to get someone through the door, so it gets the brand's
              second voice to itself. */}
          <p className="u-quote mt-5 text-lg leading-snug text-oyster-300 sm:text-xl">
            Nothing about your feet is going to surprise her.
          </p>

          <RuleWithMark className="mt-8 text-khaki-400" />

          {/* u-lede hardcodes text-jacobean/80 for the light sections, so it has to be
              overridden here or the paragraph sinks into the ground. */}
          <p className="u-lede mt-8 text-oyster-300">
            Hard skin, a heel that has split again, a nail corner that has been catching for
            months, or feet that simply hurt by the end of a day on them.{' '}
            {STUDIO_INFO.founder} has spent {STUDIO_INFO.experienceYears} years with feet like
            these, and there is nothing you can take your socks off and show her that she has
            not already seen many times over.
          </p>

          <p className="mt-4 max-w-prose text-base leading-relaxed text-oyster-300">
            It happens in the same private room as everything else — door closed, one client in
            the studio. She works at the pace the foot needs rather than the pace the diary
            would prefer, and she says out loud what she is doing as she goes.
          </p>

          <div className="mt-10">
            <button
              onClick={() => onOpenBooking(FOOT_CARE)}
              className="u-btn-inverse group w-full sm:w-auto"
            >
              <span>{CTA_LABEL}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Nothing on this site reaches the studio on its own, so the wording stays a
                request the whole way through. */}
            <p className="mt-4 max-w-md text-sm leading-relaxed text-oyster-300">
              {FOOT_CARE ? `${formatDuration(FOOT_CARE.durationMinutes)} in the studio. ` : ''}
              It reaches {STUDIO_INFO.founder} as a request — she replies to confirm the time
              with you.
            </p>

            <a
              href={createWhatsAppGeneralInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[2.75rem] items-center text-sm font-medium text-oyster-300 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-lace hover:decoration-lace"
            >
              Or ask about it first, before booking anything
            </a>
          </div>
        </header>

        <div className="lg:col-span-7">
          {/* Hairline cells rather than raised cards: on the dark band a stack of lifted
              surfaces reads as noise, and the divider alone is structure enough. */}
          <ul className="grid gap-px overflow-hidden rounded-card border border-lace/15 bg-lace/15 sm:grid-cols-2">
            {COMMON_REASONS.map((reason) => (
              <li key={reason.title} className="bg-jacobean-800 px-6 py-7">
                <h3 className="text-base font-semibold tracking-tight text-lace">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-oyster-300">{reason.detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-card border border-lace/15 bg-jacobean-900/40 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-khaki-300" />
              <div>
                <h3 className="text-base font-semibold tracking-tight text-lace">
                  How the tools are kept
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-oyster-300">
                  Everything metal is cleaned and sterilised between clients. Files, buffers and
                  anything else that cannot be sterilised are used once, for you, and go in the
                  bin at the end of your appointment. It is not a selling point — it is simply
                  how the room runs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
