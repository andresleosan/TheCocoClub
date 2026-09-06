import React from 'react'
import { ArrowRight, ArrowUp, Lock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Wordmark } from '../brand/BrandMarks'
import { RibbonCorner } from '../brand/Decor'
import { InstagramIcon } from '../ui/InstagramIcon'
import { STUDIO_INFO } from '../../data/studioInfo'
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp'

interface FooterProps {
  onOpenBooking: () => void
  onOpenAdmin: () => void
}

/**
 * The page's second dark anchor. Foot Health opens the jacobean band; this closes it, so the
 * page ends on the same ground it made its one serious claim on.
 *
 * Six real defects were fixed here rather than restyled:
 *   1. The brand name was typeset — "THE COCO CLUB" in letterspaced Italiana caps with
 *      font-bold, on a face that ships a single weight. The studio has a real wordmark.
 *   2. Opening hours were written out by hand and had already drifted from studioInfo.ts:
 *      the footer claimed Saturday until 18:00, the studio closes at 17:00. The hours line is
 *      now derived from that file, and the full week is left to the Visiting section.
 *   3. The phone link hovered to Tailwind emerald, between two correctly-branded siblings.
 *   4. `hover:bg-redRobin-light` named a shade that never existed, so the main CTA had no
 *      hover state at all.
 *   5. The grid was md:grid-cols-2 holding three lg:col-span children, so the third column
 *      dropped alone onto a second row across the whole 768–1023px band.
 *   6. Four gold-* classes carried the headings and the tagline; that scale is gone.
 *
 * The Studio Portal lives down here on purpose. In the header it was given near-equal weight
 * to the booking CTA, competing with the only action a visitor came to take.
 */

/** Mirrors the navbar. The old list advertised six treatment names, five of which pointed at
 *  the same #services anchor and one at a section that no longer exists. */
const FOOTER_LINKS = [
  { name: 'The studio', href: '#studio' },
  { name: 'Treatments', href: '#treatments' },
  { name: 'Foot health', href: '#foot-health' },
  { name: 'The work', href: '#work' },
  { name: 'Visiting', href: '#visiting' },
]

/** One hover treatment for every link on this ground: oyster-300 reads 8.32:1 on jacobean,
 *  lace is the hover. oyster-500 and below fail here and never carry text. */
const LINK =
  'inline-flex items-center gap-2.5 text-sm text-oyster-300 transition-colors hover:text-lace'

const ICON = 'h-4 w-4 shrink-0 text-khaki-300'

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => (
  <footer className="relative overflow-hidden bg-jacobean-800 text-lace">
    {/* Bled off the top-right corner, well clear of the wordmark and every line of copy. */}
    <RibbonCorner className="text-jacobean-700/70" position="-right-52 -top-44" />

    <div className="u-container relative pb-10 pt-16 sm:pt-20">
      {/* At the two-column band the brand block takes the full row, so the last column can
          never be orphaned on a row of its own. */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <Wordmark
            title={STUDIO_INFO.name}
            className="h-auto w-full max-w-[13.5rem] text-lace sm:max-w-[15.5rem]"
          />

          {/* The tagline in the brand's second voice. The hero already carries it as a display
              title; setting Italiana again at footer size would drop it below its 20px floor,
              where the hairlines break up. */}
          <p className="u-quote mt-5 text-base text-oyster-200 sm:text-lg">{STUDIO_INFO.tagline}</p>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-oyster-300">
            Nails and foot care in one pair of hands. {STUDIO_INFO.founder} has been doing this
            for {STUDIO_INFO.experienceYears} years and takes one client at a time, in a private
            studio in Saint Helier.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="u-eyebrow text-oyster-300">Explore</h2>
          <ul className="mt-5 space-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={LINK}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="u-eyebrow text-oyster-300">Visit</h2>

          <address className="mt-5 not-italic">
            <a
              href={STUDIO_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${LINK} items-start`}
            >
              <MapPin className={`${ICON} mt-0.5`} />
              <span>
                {STUDIO_INFO.address.street}
                <br />
                {STUDIO_INFO.address.city}, {STUDIO_INFO.address.island}{' '}
                {STUDIO_INFO.address.postcode}
              </span>
            </a>
          </address>

          <ul className="mt-4 space-y-3">
            <li>
              {/* tel: takes the digits, not the spaced display string. */}
              <a href={`tel:+${STUDIO_INFO.phoneDigits}`} className={LINK}>
                <Phone className={ICON} />
                {STUDIO_INFO.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={createWhatsAppGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                <MessageCircle className={ICON} />
                Message on WhatsApp
              </a>
            </li>
            <li>
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                <InstagramIcon className={ICON} />
                {STUDIO_INFO.instagram}
              </a>
            </li>
          </ul>

          {/* Derived from studioInfo.ts, so this line cannot drift out of step with the
              studio's actual week again. The full table stays in one place, in Visiting. */}
          <p className="mt-5 text-sm text-oyster-300">
            {STUDIO_INFO.openingSummary}.{' '}
            <a
              href="#visiting"
              className="underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-lace hover:decoration-lace"
            >
              Full opening hours
            </a>
          </p>

          {/* The page's closing action, and the only button in the footer. Inverse on this
              ground; the line under it keeps the promise honest — pressing it books nothing,
              the studio replies to confirm. */}
          <button onClick={onOpenBooking} className="u-btn-inverse group mt-7 w-full">
            Book an appointment
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <p className="mt-3 text-xs text-oyster-400">
            Times are requests — the studio confirms each one on WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-5 border-t border-jacobean-700 pt-7 text-xs text-oyster-400 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {STUDIO_INFO.name} · {STUDIO_INFO.address.city},{' '}
          {STUDIO_INFO.address.island}
        </p>

        <div className="flex items-center gap-6">
          {/* The studio's own way in — deliberately the quietest control on the page. */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-oyster-200"
          >
            <Lock className="h-3.5 w-3.5" />
            Studio Portal
          </button>

          {/* An anchor rather than window.scrollTo: it works without JavaScript and obeys the
              reduced-motion rule index.css already sets. */}
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-oyster-200"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
)
