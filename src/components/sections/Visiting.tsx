import React, { useId, useState } from 'react'
import { ChevronDown, Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react'
import { RibbonCorner, RuleWithMark } from '../brand/Decor'
import { InstagramIcon } from '../ui/InstagramIcon'
import { STUDIO_INFO } from '../../data/studioInfo'
import { DATA_NOTE, VISIT_NOTES } from '../../data/policies'
import { createWhatsAppGeneralInquiryLink } from '../../utils/whatsapp'

/**
 * Everything practical about coming here, in one place.
 *
 * This merges the old Location and FAQ sections, which asked the reader to hold the same
 * information twice: where the studio is, when it is open, and what to expect on arrival.
 * Splitting them also let the two drift — the old location card and the footer each typed the
 * opening hours out by hand and had already disagreed about Saturday.
 *
 * The map iframe is gone with them. It loaded Google on every page view to show a pin the
 * address link already gives you, and it was the heaviest thing on the page.
 */

interface Faq {
  id: string
  topic: string
  question: string
  answer: string
}

/**
 * Rewritten, not restyled. The old answers claimed "international medical podology training",
 * treatments that "diagnose and treat" named conditions, and "hospital-grade" sterilisation —
 * chiropody and podiatry are protected titles here, and none of that was the studio's to
 * claim. What is left is what is true and, for someone deciding whether to come, more useful.
 */
const FAQS: Faq[] = [
  {
    id: 'booking',
    topic: 'Booking',
    question: 'Is my time confirmed once I send the form?',
    answer:
      'Not yet — the form only prepares the request. What actually reaches the studio is the WhatsApp message it hands you at the end, and the time is yours once Deoana has replied to say so. If you would rather skip the form entirely and just ask, that works too.',
  },
  {
    id: 'arriving',
    topic: 'Arriving',
    question: 'Where exactly is the studio, and where can I park?',
    answer: `${STUDIO_INFO.address.street} sits in the middle of Saint Helier, a few minutes on foot from town. There is no car park attached to the studio; the nearest multi-storey is Green Street. It is a private studio rather than a shopfront, so Deoana sends you the arrival details when she confirms your time — you will not be hunting for a sign.`,
  },
  {
    id: 'alone',
    topic: 'The appointment',
    question: 'Will anyone else be in the studio?',
    answer:
      'No. One client at a time, from the moment you arrive to the moment you leave — no queue behind you, no second chair, no conversation across the room. That is the reason appointments are held rather than turned over on the hour, and the reason a late arrival costs your own time rather than someone else’s.',
  },
  {
    id: 'dry-manicure',
    topic: 'Nails',
    question: 'What is a dry, e-file manicure?',
    answer:
      'The hands are not soaked. Soaking swells the nail plate, which is one of the reasons gel lifts early; working dry keeps the plate its true shape, and fine rotary bits lift away the dead tissue sitting on it without cutting the living skin around it. The finish sits flush to the cuticle, so colour grows out as a clean line instead of a ridge.',
  },
  {
    id: 'biab',
    topic: 'Nails',
    question: 'What is BIAB, and will it help nails that keep breaking?',
    answer:
      'Builder in a bottle is a thicker, flexible gel laid over the natural nail and shaped to reinforce the point where nails usually snap. It absorbs the day-to-day knocks so the nail underneath is left alone to grow, which makes it the usual answer for nails that are soft, peeling or bitten. Nothing is extended and nothing is glued on.',
  },
  {
    id: 'feet',
    topic: 'Feet',
    question: 'How is the foot care here different from a salon pedicure?',
    answer: `It is not a polish-first pedicure. Deoana has ${STUDIO_INFO.experienceYears} years of podology practice behind her, and most foot appointments go on the things that actually hurt — hard skin, cracked heels, thickened nails, a corner that has grown in awkwardly — worked down gently with rotary files rather than blades. This is expert foot care, not a medical service: if something needs a doctor, she will say so plainly.`,
  },
  {
    id: 'hygiene',
    topic: 'Hygiene',
    question: 'What happens with the tools between appointments?',
    answer:
      'Metal tools are cleaned and sterilised between clients, and anything that cannot be — files, buffers, towels — is used on you and then thrown away. Because only one person is booked at a time, none of it is rushed to make room for the next arrival. If you would like the detail of how it is done, ask and Deoana will happily talk you through it.',
  },
  {
    id: 'removal',
    topic: 'Nails',
    question: 'Can you take off gel or acrylic another salon applied?',
    answer:
      'Yes, and it is a normal thing to ask for. Please mention it when you request your time: de-bulking and lifting off someone else’s product safely takes time, and that time has to be in the appointment rather than squeezed out of the work you actually came for.',
  },

  /*
    Three answers the site is obliged to give and previously did not. The form asks for a name,
    an email, a phone number and — explicitly — health information, with no privacy notice
    anywhere; under the Data Protection (Jersey) Law 2018 that is special-category data. There
    was also nothing about cancelling, and nothing telling a client that this is expert care
    rather than a healthcare service.

    They live in src/data/policies.ts because the cancellation answer is marked
    `needsOwnerInput`: the studio has set no notice period, deposit or no-show rule, and
    inventing one would put a term in front of clients that nobody agreed to.
  */
  ...VISIT_NOTES.filter((note) => note.id === 'cancellation' || note.id === 'health'),
  DATA_NOTE,
]

/** Same number for both, so it is said once and linked twice. */
const TEL_HREF = `tel:+${STUDIO_INFO.phoneDigits}`

const CONTACT_LINK =
  'group flex items-start gap-4 rounded-card border border-oyster-300/50 bg-pearlBush/30 p-4 transition-colors hover:border-khaki-500 hover:bg-pearlBush/60'

export const Visiting: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id)
  const baseId = useId()

  return (
    <section id="visiting" className="u-section relative overflow-hidden bg-pearlBush/60">
      {/* Oyster rather than pearl bush: pearl ribbons on a pearl ground paint nothing. */}
      <RibbonCorner className="text-oyster-300/40" position="-left-56 -top-44 hidden lg:block" />

      <div className="u-container relative">
        <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="u-eyebrow text-khaki-700">Practical things</p>
          <h2 className="u-title mt-4 text-[1.375rem] leading-tight text-jacobean sm:text-3xl">
            Visiting the studio
          </h2>
          <RuleWithMark className="mt-6 text-oyster-500" />
          <p className="u-lede mt-6 text-balance">
            One address in Saint Helier, one pair of hands, and one appointment at a time. Here is
            where it is, when it is open, and the answers to the things people ask before they come.
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-12">
          <div className="u-card p-6 sm:p-8 lg:col-span-7">
            <h3 className="u-title text-xl text-jacobean">Finding the studio</h3>

            {/* Previously this block had a hover style but nothing to click — the address was
                plain text and the map link was a separate afterthought below it. */}
            <a
              href={STUDIO_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CONTACT_LINK} mt-5`}
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-khaki-600" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-base font-semibold text-jacobean">
                  {STUDIO_INFO.address.street}
                </span>
                <span className="block text-sm text-jacobean/70">
                  {STUDIO_INFO.address.city}, {STUDIO_INFO.address.island}{' '}
                  {STUDIO_INFO.address.postcode}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-redRobin-700 underline decoration-oyster-400 underline-offset-4 transition-colors group-hover:decoration-redRobin-700">
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </span>
            </a>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <a href={TEL_HREF} className={CONTACT_LINK}>
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-khaki-600" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="u-eyebrow block text-khaki-700">Call the studio</span>
                  <span className="mt-1.5 block text-sm font-medium text-jacobean transition-colors group-hover:text-redRobin-700">
                    {STUDIO_INFO.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={createWhatsAppGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={CONTACT_LINK}
              >
                <MessageCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-khaki-600"
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="u-eyebrow block text-khaki-700">WhatsApp</span>
                  <span className="mt-1.5 block text-sm font-medium text-jacobean transition-colors group-hover:text-redRobin-700">
                    Same number, written down
                  </span>
                </span>
              </a>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CONTACT_LINK} sm:col-span-2`}
              >
                {/* Wrapped rather than given an aria-hidden prop: the mark only takes a
                    className, and the link's own text already carries the meaning. */}
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-khaki-600">
                  <InstagramIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="u-eyebrow block text-khaki-700">Recent work</span>
                  <span className="mt-1.5 block text-sm font-medium text-jacobean transition-colors group-hover:text-redRobin-700">
                    {STUDIO_INFO.instagram} on Instagram
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="u-card p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-khaki-600" aria-hidden="true" />
              <h3 className="u-title text-xl text-jacobean">Opening hours</h3>
            </div>
            <p className="mt-2 text-sm text-jacobean/70">{STUDIO_INFO.openingSummary}</p>

            {/* Rendered from STUDIO_INFO.openingHours only — the footer and this section used
                to restate the week by hand and had already fallen out of sync. Keyed on the day
                name so re-ordering the data cannot silently relabel a row, and closed days are
                allowed to recede instead of being typeset like trading days. */}
            <dl className="mt-5">
              {STUDIO_INFO.openingHours.map((entry) => (
                <div
                  key={entry.day}
                  className="flex items-baseline justify-between gap-4 border-b border-oyster-300/50 py-2.5 last:border-0"
                >
                  <dt
                    className={`text-sm ${entry.isOpen ? 'text-jacobean/70' : 'text-jacobean/70'}`}
                  >
                    {entry.day}
                  </dt>
                  <dd
                    className={`text-sm ${
                      entry.isOpen ? 'font-semibold text-jacobean' : 'text-jacobean/70'
                    }`}
                  >
                    {entry.hours}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-sm leading-relaxed text-jacobean/75">
              By appointment only — {STUDIO_INFO.founder} works with one client at a time, so the
              door is not open to walk-ins. If nothing above fits, ask anyway: Mondays can sometimes
              be arranged.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl sm:mt-20">
          <h3 className="u-title text-center text-xl text-jacobean sm:text-2xl">
            Before you come
          </h3>

          <div className="mt-7 space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id
              const panelId = `${baseId}-${faq.id}`

              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-card border transition-colors ${
                    isOpen ? 'border-oyster-400 bg-lace shadow-card' : 'border-oyster-300/60 bg-lace/70 hover:border-oyster-400'
                  }`}
                >
                  {/* A real button with aria-expanded / aria-controls. The old accordion set
                      focus:outline-none with no replacement, which left keyboard users with no
                      visible focus anywhere in this part of the page. Nothing here strips the
                      site-wide :focus-visible ring. Questions are set in the body face on
                      purpose: Italiana breaks up below 20px, and these run to two lines. */}
                  <h4>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left"
                    >
                      <span className="min-w-0">
                        <span className="u-eyebrow block text-khaki-700">{faq.topic}</span>
                        <span className="mt-1.5 block text-[0.9375rem] font-semibold leading-snug text-jacobean">
                          {faq.question}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-oyster-300 text-khaki-700 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 bg-pearlBush/60' : ''
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                  </h4>

                  {/* Kept in the DOM and hidden, so aria-controls always points at something. */}
                  <div
                    id={panelId}
                    hidden={!isOpen}
                    className="border-t border-oyster-300/50 px-5 pb-5 pt-4"
                  >
                    <p className="text-sm leading-relaxed text-jacobean/80">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* The old version of this box told people Deoana would answer on WhatsApp or the
              phone and then gave them neither link — a dead end at the point of highest intent. */}
          <div className="u-card mt-8 px-6 py-8 text-center">
            <p className="u-quote text-lg text-jacobean sm:text-xl">
              Still not sure which appointment you need?
            </p>
            <p className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-jacobean/75">
              Describe the nails or the feet you have now and what you would like instead. It is a
              one-person studio, so the reply comes from {STUDIO_INFO.founder} herself.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={createWhatsAppGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="u-btn-primary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Ask on WhatsApp
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex min-h-[2.75rem] items-center gap-2 px-2 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin-700 hover:decoration-redRobin-700"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Or call {STUDIO_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
