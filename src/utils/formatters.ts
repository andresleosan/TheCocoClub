/**
 * Display formatting. Every price, duration and date on the site goes through here — the old
 * code formatted inline in several places and leaked raw values into the UI (raw ISO dates in
 * the booking confirmation, "+90 mins" beside a properly formatted "1h 30m" on the same row).
 */

/** Prices are whole pounds in the data; show pence only when a service actually has them. */
export const formatPrice = (amount: number): string =>
  Number.isInteger(amount) ? `£${amount}` : `£${amount.toFixed(2)}`

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (rest === 0) return `${hours} hr${hours > 1 ? 's' : ''}`
  return `${hours}h ${rest}m`
}

/**
 * `YYYY-MM-DD` -> "Saturday, 12 September 2026".
 *
 * Parsed field by field rather than via `new Date(string)`: the single-argument Date parser
 * treats a bare date as UTC, which shifts the day backwards for anyone west of Greenwich.
 */
export const formatDateFriendly = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return dateString
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Shorter form for dense UI such as the studio portal table. */
export const formatDateShort = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return dateString
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** `HH:MM` plus a duration -> the time the appointment would finish, e.g. "10:30 – 12:00". */
export const formatTimeRange = (startTime: string, durationMinutes: number): string => {
  const [h, m] = startTime.split(':').map(Number)
  const total = h * 60 + m + durationMinutes
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${startTime} – ${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`
}
