import React, { useEffect, useState } from 'react'
import { Clock, MapPin, Phone } from 'lucide-react'
import { STUDIO_INFO } from '../../data/studioInfo'

/**
 * The strip above the navbar: whether the studio is open, the time in Jersey, and the two
 * things a visitor actually wants from chrome — a map link and a number to ring.
 *
 * It used to be a small billboard ("Private 1-on-1 Nail Atelier & Clinical Podology"), which
 * was a second tagline competing with the hero's and a claim of regulated care this studio
 * does not make. What replaces it is live and useful, and read entirely out of
 * STUDIO_INFO.openingHours so the strip can never drift from the footer or the booker.
 *
 * Four real defects went with it:
 *   - it sat at z-40 while the sticky header was z-30, so a decorative strip outranked the
 *     navigation. The header is z-40 now; this sits beneath it at z-30.
 *   - the clock ran en-GB with hour12, printing "03:45 pm" — neither British nor American,
 *     and not the 24-hour format the opening hours themselves are written in.
 *   - three gold-* classes, on a palette that has no gold.
 *   - border-jacobean-600/40 on a jacobean ground: an invisible border.
 *
 * Below sm the whole strip is hidden. A phone has no room for a second row of chrome above a
 * sticky navbar, and every item here appears again at full size in Visiting and the footer.
 */

interface JerseyNow {
  /** Long weekday name, matching the `day` keys in STUDIO_INFO.openingHours. */
  weekday: string
  /** 24-hour 'HH:MM', matching the `opens` / `closes` keys. */
  time: string
}

/** The wall clock in Saint Helier, not in whatever timezone the visitor happens to be in. */
const readJerseyNow = (): JerseyNow => {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Jersey',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      // hourCycle rather than hour12:false — en-GB with hour12:false renders midnight as
      // "24:00" in several engines.
      hourCycle: 'h23',
    }).formatToParts(new Date())

    const part = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((candidate) => candidate.type === type)?.value ?? ''

    return { weekday: part('weekday'), time: `${part('hour')}:${part('minute')}` }
  } catch {
    // A runtime built without full ICU data rejects the zone. Jersey is UTC or UTC+1, so the
    // visitor's own clock is close enough to be worth showing rather than blanking the strip.
    const now = new Date()
    return {
      weekday: now.toLocaleDateString('en-GB', { weekday: 'long' }),
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    }
  }
}

/** Both fields are zero-padded 'HH:MM', so plain string comparison orders them correctly. */
const describeStatus = ({ weekday, time }: JerseyNow): { isOpen: boolean; label: string } => {
  const today = STUDIO_INFO.openingHours.find((entry) => entry.day === weekday)
  if (!today) return { isOpen: false, label: STUDIO_INFO.openingSummary }

  if (today.isOpen && today.opens && today.closes) {
    if (time < today.opens) return { isOpen: false, label: `Opens at ${today.opens}` }
    if (time < today.closes) return { isOpen: true, label: `Open until ${today.closes}` }
    return { isOpen: false, label: `Closed now · ${STUDIO_INFO.openingSummary}` }
  }

  // Monday is 'By arrangement' rather than closed, and saying so is the useful part.
  if (today.hours !== 'Closed') return { isOpen: false, label: `Today ${today.hours.toLowerCase()}` }
  return { isOpen: false, label: `Closed today · ${STUDIO_INFO.openingSummary}` }
}

export const AnnouncementBar: React.FC = () => {
  const [now, setNow] = useState<JerseyNow>(readJerseyNow)

  useEffect(() => {
    let interval: number | undefined
    const tick = () => setNow(readJerseyNow())

    // A minute-resolution clock polled every 30s is stale for half of every minute and wakes
    // the tab twice as often as it needs to. Land on the next minute boundary, then tick once
    // a minute from there.
    const timeout = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, 60_000)
    }, 60_000 - (Date.now() % 60_000))

    return () => {
      window.clearTimeout(timeout)
      if (interval !== undefined) window.clearInterval(interval)
    }
  }, [])

  const status = describeStatus(now)

  return (
    <aside
      aria-label="Studio hours and contact"
      className="relative z-30 hidden border-b border-lace/10 bg-jacobean-800 text-xs text-oyster-300 sm:block"
    >
      <div className="u-container flex items-center justify-between gap-4 py-2">
        <p className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              status.isOpen ? 'bg-khaki-300' : 'bg-oyster-400'
            }`}
          />
          <span className="truncate font-medium text-lace">{status.label}</span>

          <span aria-hidden="true" className="hidden text-oyster-400 lg:inline">
            ·
          </span>
          <span className="hidden shrink-0 items-center gap-1.5 lg:inline-flex">
            <Clock className="h-3 w-3 text-khaki-300" aria-hidden="true" />
            {now.time} in Jersey
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          {/* Previously styled as a hover target while being plain text. It goes somewhere now. */}
          <a
            href={STUDIO_INFO.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 py-1 transition-colors hover:text-lace md:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5 text-khaki-300" aria-hidden="true" />
            {STUDIO_INFO.address.street}, {STUDIO_INFO.address.city}
          </a>

          <span aria-hidden="true" className="hidden text-oyster-400 md:inline">
            ·
          </span>

          {/* tel: on the digits-only number — the display string carries spaces. */}
          <a
            href={`tel:+${STUDIO_INFO.phoneDigits}`}
            className="inline-flex items-center gap-1.5 py-1 font-medium text-lace transition-colors hover:text-khaki-200"
          >
            <Phone className="h-3.5 w-3.5 text-khaki-300" aria-hidden="true" />
            {STUDIO_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </aside>
  )
}
