import React from 'react'
import { BrandRibbons } from './BrandMarks'

/**
 * The brand's decorative layer.
 *
 * The guide's own "brand assets" sheet defines this as flowing liquid-ribbon swirls — the
 * shapes in `BrandRibbons` are traced from that sheet. What the site had instead was three
 * blurred gaussian blobs plus a dot grid, in a `fixed -z-10` wrapper whose parent created no
 * stacking context, so it never painted at all.
 *
 * Decor is now per-section rather than one global layer: each section places its own band and
 * clips it with `overflow-hidden`, which is both visible and controllable.
 */

type Edge = 'top' | 'bottom'

interface RibbonBandProps {
  edge?: Edge
  /** Tailwind text colour that the ribbons paint with, e.g. `text-pearlBush`. */
  className?: string
  /** Mirror horizontally so repeated bands don't read as a tiling artefact. */
  flip?: boolean
}

/**
 * A single band of ribbons bled off one edge of a section.
 * The section itself must be `relative overflow-hidden`.
 */
export const RibbonBand: React.FC<RibbonBandProps> = ({
  edge = 'top',
  className = 'text-pearlBush',
  flip = false,
}) => (
  <div
    aria-hidden="true"
    className={`u-decor inset-x-0 ${edge === 'top' ? '-top-8' : '-bottom-8'} ${className}`}
  >
    <BrandRibbons
      className={`h-32 w-full sm:h-44 lg:h-56 ${flip ? '-scale-x-100' : ''}`}
    />
  </div>
)

/**
 * A large, slow-drifting corner motif. Used sparingly — once per section at most, and never
 * where it would sit behind body copy.
 */
export const RibbonCorner: React.FC<{
  className?: string
  position?: string
}> = ({ className = 'text-pearlBush', position = '-right-24 -top-24' }) => (
  <div aria-hidden="true" className={`u-decor ${position} ${className}`}>
    <BrandRibbons className="h-[22rem] w-[42rem] animate-drift opacity-70 sm:h-[28rem] sm:w-[56rem]" />
  </div>
)

/**
 * A hairline flourish for section headers: a short rule with the brand heart at its centre.
 * Replaces the assorted dots, sparkles and bullet characters that were doing this job
 * inconsistently across the page.
 */
export const RuleWithMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
    <span className="h-px w-10 bg-current opacity-30" />
    <svg viewBox="0 0 1000 848" className="h-3 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M500 848C420 760 180 700 120 520 60 340 200 180 340 220c80 22 130 92 160 152 30-60 80-130 160-152 140-40 280 120 220 300-60 180-300 240-380 328Z" />
    </svg>
    <span className="h-px w-10 bg-current opacity-30" />
  </div>
)
