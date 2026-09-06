import React from 'react'
import { WordmarkStacked } from '../brand/BrandMarks'
import { RibbonBand, RibbonCorner, RuleWithMark } from '../brand/Decor'
import { STUDIO_INFO } from '../../data/studioInfo'

/**
 * The studio — the page's first anchor and its emotional centre.
 *
 * Three defects are corrected here rather than restyled. The old section led with an Unsplash
 * portrait of a stranger captioned "Deoana Moreno", shouted a "30+" badge over the top of it,
 * and framed the foot work as "clinical", "certified" and "hospital-grade" — language that is
 * both unearned and, for protected titles in Jersey, not ours to borrow. What is left when all
 * of that goes is the truth, and the truth sells: one room, one pair of hands, thirty years,
 * and nobody waiting for your chair.
 *
 * The layout is deliberately left-aligned and asymmetric. The Hero is centred and symmetrical;
 * repeating that here would have made the two sections read as one long masthead instead of a
 * masthead followed by a story.
 *
 * "Expert hands, latin heart" opens this section because it was moved out of the Hero — two
 * brand lines stacked there made both claims compete and neither land.
 */

/**
 * The old four "pillars" were sound in substance — private room, hygiene, unhurried pace,
 * warmth. Only the framing needed replacing.
 */
const DIFFERENCES = [
  {
    title: 'A private room, not a salon floor',
    detail:
      `One room on ${STUDIO_INFO.address.street}, held for you for the whole appointment. ` +
      'Nobody is working at the chair beside you, and nobody is waiting for yours.',
  },
  {
    title: 'Clean, between every client',
    detail:
      'Tools are cleaned and sterilised between clients and the room is put back in order ' +
      'before you walk in. It is the unglamorous half of the job, and it is the half that is ' +
      'never skipped.',
  },
  {
    title: 'Unhurried on purpose',
    detail:
      'Appointments are spaced so the work finishes when it is finished, not when the next ' +
      'name is due. If your feet need the extra ten minutes, they get the extra ten minutes.',
  },
  {
    title: 'Warmth before work',
    detail:
      'You are offered a drink and a moment to sit down before anything begins. The latin ' +
      'half of the brand is not a decoration — it is how the room actually feels.',
  },
]

export const TheStudio: React.FC = () => (
  <section
    id="studio"
    className="u-section relative overflow-hidden border-y border-oyster-300/50 bg-pearlBush/60"
  >
    {/* Bled off the bottom edge, into the section's own padding — decoration, never behind copy. */}
    <RibbonBand edge="bottom" className="text-lace/70" flip />

    <div className="u-container relative">
      {/* Asymmetric header: the title carries the left, the brand's voice answers on the right. */}
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="u-eyebrow text-khaki-700">The studio</p>

          <h2 className="u-title mt-5 max-w-[16ch] text-display-md text-jacobean">
            {STUDIO_INFO.secondaryTagline}
          </h2>
        </div>

        <div className="lg:col-span-5">
          <RuleWithMark className="text-oyster-500" />
          <p className="u-quote mt-5 text-lg leading-relaxed text-jacobean/80 sm:text-xl">
            One room, one client, and as long as the work actually takes.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-12">
        {/*
          THE PORTRAIT SEAM.

          There is no photograph of Deoana, so this is built from brand material instead of
          borrowed from a stock library. When a real portrait exists it drops in here: keep the
          aspect-[4/5] frame and the caption block below it, and move the ribbons behind the
          image rather than deleting them.
        */}
        <figure className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-panel bg-jacobean p-8 shadow-panel sm:p-10">
            <RibbonCorner className="text-lace/10" position="-right-28 -top-16" />

            <WordmarkStacked className="relative mx-auto h-auto w-full max-w-[9rem] text-lace/90 sm:max-w-[11rem]" />

            <figcaption className="relative">
              <p className="u-quote text-2xl text-oyster-200 sm:text-3xl">{STUDIO_INFO.founder}</p>
              <p className="mt-2 text-sm text-oyster-300">{STUDIO_INFO.founderTitle}</p>
              <p className="mt-4 text-sm text-oyster-400">
                {STUDIO_INFO.address.street}, {STUDIO_INFO.address.city}
              </p>
            </figcaption>
          </div>
        </figure>

        <div className="lg:col-span-7">
          <p className="u-lede">
            The Coco Club is one private room on {STUDIO_INFO.address.street} in{' '}
            {STUDIO_INFO.address.city}, and one pair of hands. {STUDIO_INFO.founder} has spent{' '}
            {STUDIO_INFO.experienceYears} years on nails and feet, and she still works with a
            single client at a time.
          </p>

          <p className="mt-5 max-w-prose text-base leading-relaxed text-jacobean/75">
            That is a decision about pace, not a shortage of chairs. There is no conveyor belt
            here, no second appointment running in parallel and no reason to look at the clock
            on your behalf — which is why the day is built around a handful of appointments
            rather than as many as will fit.
          </p>

          <p className="mt-5 max-w-prose text-base leading-relaxed text-jacobean/75">
            It is also about the nail itself, and not only the colour on top of it. Deoana will
            look at how your nails are growing, how the skin around them is holding up and what
            your feet have been doing all week, and she will tell you plainly. A coat of colour
            over a nail that is splitting only postpones the conversation.
          </p>

          {/* A ruled list rather than a card grid: this is a story continuing, not four
              competing tiles. */}
          <ul className="mt-10 border-t border-oyster-400/40">
            {DIFFERENCES.map((item, index) => (
              <li
                key={item.title}
                className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-oyster-400/40 py-5 sm:grid-cols-[3rem_1fr] sm:gap-x-6"
              >
                {/* Italiana never appears below 20px — its hairlines break up. */}
                <span
                  aria-hidden="true"
                  className="font-display text-xl leading-none text-khaki-700 sm:pt-0.5"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="text-base font-semibold tracking-tight text-jacobean">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-jacobean/75">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Solid lace, not a tint: the ribbon band bleeds up into this strip's footprint on
          narrow screens and translucency would have let it show through the copy. */}
      <div className="relative mt-14 rounded-card border border-oyster-300/60 bg-lace px-6 py-7 sm:px-8 lg:mt-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="sm:max-w-xs">
            <p className="u-eyebrow text-khaki-700">On arrival</p>
            <p className="mt-2.5 text-sm leading-relaxed text-jacobean/75">
              Before anything is filed or painted, you sit down and choose one of these.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {STUDIO_INFO.beverageOptions.map((option) => (
              <li
                key={option}
                className="rounded-full border border-oyster-400/50 bg-pearlBush/50 px-4 py-2 text-sm text-jacobean/80"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
)
