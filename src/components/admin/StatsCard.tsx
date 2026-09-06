import React from 'react'
import { LucideIcon } from 'lucide-react'

/**
 * One figure in the studio portal's summary strip.
 *
 * The old card accepted a free-form `colorClass`, and the calling code duly filled it with
 * `bg-amber-100` and `bg-emerald-100` — Tailwind defaults that are not in this brand and paint
 * nothing like it. The tone is a closed set now, so a stat can only be dressed in the studio's
 * own colours.
 *
 * This is an operator's tool, not a page: the number is set in Syne rather than the display
 * face, because Italiana falls apart below 20px and this strip gets read all day.
 */

type StatTone = 'neutral' | 'khaki' | 'jacobean' | 'redRobin'

const TONES: Record<StatTone, string> = {
  neutral: 'bg-oyster-200 text-jacobean',
  khaki: 'bg-khaki-100 text-khaki-700',
  jacobean: 'bg-jacobean text-lace',
  redRobin: 'bg-redRobin-100 text-redRobin-800',
}

export interface StatsCardProps {
  label: string
  value: string | number
  /** Where the number comes from. State the source, never what it implies. */
  detail?: string
  icon: LucideIcon
  tone?: StatTone
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'neutral',
}) => (
  <div className="flex items-start justify-between gap-3 rounded-card border border-oyster-300 bg-lace p-4 shadow-card">
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-jacobean/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold leading-none tracking-tight text-jacobean">
        {value}
      </p>
      {detail && <p className="mt-2 text-[0.8125rem] leading-snug text-jacobean/65">{detail}</p>}
    </div>

    {/* Decorative: the label already carries the meaning, so the icon stays out of the a11y tree. */}
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${TONES[tone]}`}
    >
      <Icon className="h-4 w-4" />
    </span>
  </div>
)
