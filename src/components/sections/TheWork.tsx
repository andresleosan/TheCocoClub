import React from 'react'
import { Logomark } from '../brand/BrandMarks'
import { RibbonCorner, RuleWithMark } from '../brand/Decor'
import { InstagramIcon } from '../ui/InstagramIcon'
import { STUDIO_INFO } from '../../data/studioInfo'

/**
 * The work — and the only honest way this site can show it.
 *
 * This section replaces three: a "lookbook", a before/after slider and a wall of reviews. All
 * three ran on hot-linked Unsplash stock presented as the studio's own work and on invented
 * Jersey clients presented as real customers — three of the "portfolio pieces" were literally
 * the same photographs used elsewhere on the page as "before" shots of damaged nails. Nothing
 * there could be made true, so nothing there survived.
 *
 * What is true is that the studio keeps its own Instagram, so this section does one job: send
 * people to it, confidently, and then get out of the way. The visuals are composed from brand
 * material only — colour, type and the logomark. A grid of brand-coloured plates reads as a
 * deliberate design; six grey rectangles waiting for photographs would not.
 */

/**
 * What comes out of the studio, in the plainest words available.
 *
 * Deliberately NOT read from services.ts: this is a poster, not the menu — Treatments owns the
 * prices, the detail and the ordering, and these labels have to stay short enough to set at
 * this size without wrapping into a paragraph.
 *
 * Grounds are fixed per plate so the pairing is checked once, here: lace on jacobean (13.19),
 * on redRobin-700 (7.81) and on khaki-600 (5.24) all clear AA for copy at this size; the two
 * light plates carry jacobean instead. khaki-500 appears only as the logomark, never behind text.
 *
 * The group labels were NOT measured when this was first written, and one of them failed:
 * jacobean/70 on oyster-300 is 4.12:1, under the 4.5:1 floor for an 11px uppercase label.
 * Measured values now — oyster-300 on jacobean 8.32, jacobean/80 on oyster-300 5.25,
 * oyster-200 on redRobin-700 5.81, khaki-700 on lace 7.78, oyster-100 on khaki-600 4.59.
 */
const WORK_PLATES = [
  { group: 'Nails', name: 'Builder gel overlays', ground: 'bg-jacobean', nameTone: 'text-lace', groupTone: 'text-oyster-300' },
  { group: 'Nails', name: 'Russian dry manicure', ground: 'bg-oyster-300', nameTone: 'text-jacobean', groupTone: 'text-jacobean/80' },
  { group: 'Feet', name: 'Podology pedicures', ground: 'bg-redRobin-700', nameTone: 'text-lace', groupTone: 'text-oyster-200' },
  { group: 'Nails', name: 'Hand-painted finishes', ground: 'bg-lace ring-1 ring-inset ring-oyster-300/70', nameTone: 'text-jacobean', groupTone: 'text-khaki-700' },
  { group: 'Nails', name: 'Sculpted extensions', ground: 'bg-khaki-600', nameTone: 'text-lace', groupTone: 'text-oyster-100' },
]

export const TheWork: React.FC = () => (
  <section
    id="work"
    aria-labelledby="work-title"
    className="relative overflow-hidden bg-pearlBush/60 u-section"
  >
    {/* Desktop only, and kept in the dead corner under the shorter column — decoration never
        sits behind the copy. */}
    <RibbonCorner className="text-lace/60" position="-right-40 -bottom-44 hidden lg:block" />

    <div className="u-container relative">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,29rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="u-eyebrow text-khaki-700">The work</p>

          {/* tracking-title is restated on purpose: the display-sm token carries its own
              letter-spacing, and as a utility it would otherwise flatten the tracking that
              u-title gives Italiana's caps. */}
          <h2
            id="work-title"
            className="u-title mt-4 text-display-sm text-jacobean"
          >
            The work is on Instagram
          </h2>

          <p className="u-quote mt-3 text-lg text-redRobin-700 sm:text-xl">
            A real portfolio, or none at all.
          </p>

          <RuleWithMark className="mt-7 text-oyster-500" />

          <p className="u-lede mt-7">
            There are no photographs of the work on this page, and that is deliberate. The only
            images worth putting in front of you are the studio&rsquo;s own — and the studio
            posts them on Instagram, so that is where to look.
          </p>

          <div className="mt-9">
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn-primary w-full sm:w-auto"
            >
              <InstagramIcon className="h-4 w-4" />
              See the work on Instagram
            </a>
            <p className="mt-3 text-sm text-jacobean/70">{STUDIO_INFO.instagram}</p>
          </div>

          {/* The quiet second door. Reviews are not reprinted here — on the studio's own
              listing nobody at this end can edit them, which is the whole point. No rating,
              no count: neither is ours to state. */}
          <p className="mt-8 max-w-prose text-sm leading-relaxed text-jacobean/70">
            And if you would rather hear it from clients than from us, reviews are left on the
            studio&rsquo;s{' '}
            <a
              href={STUDIO_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-jacobean underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
            >
              Google listing for {STUDIO_INFO.address.street}
            </a>{' '}
            — where they stay in their authors&rsquo; hands.
          </p>
        </div>

        <ul aria-label="What the studio makes" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {WORK_PLATES.map((plate) => (
            <li
              key={plate.name}
              className={`relative flex aspect-square flex-col justify-end overflow-hidden rounded-card p-4 sm:p-5 ${plate.ground}`}
            >
              {/* PHOTO SEAM — when the studio supplies its own photographs, drop an <img> in
                  here as the first child of this <li>, sized `absolute inset-0 h-full w-full
                  object-cover`, with a `bg-gradient-to-t from-jacobean/85` scrim above it so
                  the label keeps its contrast. Self-hosted files only (public/), never a
                  remote host and never stock: hot-linked stock is exactly what this section
                  was built to remove. Until then the colour block IS the design. */}
              <p className={`u-eyebrow ${plate.groupTone}`}>{plate.group}</p>
              <p className={`mt-1.5 text-sm font-semibold leading-snug sm:text-[0.9375rem] ${plate.nameTone}`}>
                {plate.name}
              </p>
            </li>
          ))}

          {/* Sixth cell closes the grid with the mark itself rather than a sixth label — the
              logomark is the one image on this page that is genuinely the studio's. */}
          <li className="flex aspect-square items-center justify-center rounded-card bg-pearlBush-100 ring-1 ring-inset ring-oyster-300/70">
            <Logomark className="h-9 w-auto text-khaki-500 sm:h-11" />
          </li>
        </ul>
      </div>
    </div>
  </section>
)
