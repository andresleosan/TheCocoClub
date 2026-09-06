import { Booking } from '../types'
import { STUDIO_INFO, STUDIO_ADDRESS_LINE } from '../data/studioInfo'

/**
 * .ics export for a booking request.
 *
 * The previous version built the start time with `Date.UTC(...)` and stamped a trailing `Z`,
 * which asserted that a Jersey wall-clock time was UTC. Jersey observes BST (UTC+1) from late
 * March to late October, so every appointment booked in that window landed in the client's
 * calendar an hour early — the kind of bug that produces missed appointments rather than a
 * visible error.
 *
 * The fix is to stop converting at all: emit the local wall-clock time against an explicit
 * VTIMEZONE for Europe/London (Jersey keeps the same GMT/BST rules), so calendar clients
 * resolve the offset themselves and stay correct across the DST boundary.
 */

/** RFC 5545 §3.3.11: escape backslash, semicolon, comma and newline in TEXT values. */
const escapeText = (value: string): string =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')

/** RFC 5545 §3.1: fold content lines longer than 75 octets, continuing with a leading space. */
const foldLine = (line: string): string => {
  if (line.length <= 75) return line
  const out: string[] = [line.slice(0, 75)]
  let rest = line.slice(75)
  while (rest.length > 74) {
    out.push(' ' + rest.slice(0, 74))
    rest = rest.slice(74)
  }
  if (rest.length) out.push(' ' + rest)
  return out.join('\r\n')
}

/** `YYYY-MM-DD` + `HH:MM` + a minute offset -> local `YYYYMMDDTHHMMSS`, no timezone conversion. */
const localStamp = (date: string, time: string, addMinutes = 0): string => {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  // Constructed in local time purely as calendar arithmetic (carrying minutes into hours,
  // hours into days); the fields are read back out, never converted to an instant.
  const t = new Date(y, m - 1, d, hh, mm + addMinutes)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${t.getFullYear()}${p(t.getMonth() + 1)}${p(t.getDate())}T${p(t.getHours())}${p(t.getMinutes())}00`
}

const utcStamp = (d: Date): string => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

/** Jersey follows the UK's GMT/BST rules, so Europe/London's definition applies verbatim. */
const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/London',
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0000',
  'TZOFFSETTO:+0100',
  'TZNAME:BST',
  'DTSTART:19700329T010000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0000',
  'TZNAME:GMT',
  'DTSTART:19701025T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
]

export const generateIcsCalendarFile = (booking: Booking): void => {
  const start = localStamp(booking.date, booking.timeSlot)
  const end = localStamp(booking.date, booking.timeSlot, booking.totalDurationMinutes)

  const addOns = booking.addOns.length
    ? `\nAdd-ons: ${booking.addOns.map((a) => a.name).join(', ')}`
    : ''
  const beverage = booking.beveragePreference ? `\nWelcome drink: ${booking.beveragePreference}` : ''
  const notes = booking.notes ? `\nNotes: ${booking.notes}` : ''

  const description =
    `${booking.serviceName} with ${STUDIO_INFO.founder} at ${STUDIO_INFO.name}.` +
    `${addOns}${beverage}${notes}` +
    `\n\nThis is a requested time. It is confirmed once the studio replies to your WhatsApp message.` +
    `\n\nAddress: ${STUDIO_ADDRESS_LINE}` +
    `\nStudio: ${STUDIO_INFO.phone}` +
    `\nReference: ${booking.referenceNumber}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Coco Club//Booking//EN',
    'CALSCALE:GREGORIAN',
    // PUBLISH, not REQUEST: REQUEST is an iTIP invitation and requires ORGANIZER/ATTENDEE.
    'METHOD:PUBLISH',
    ...VTIMEZONE,
    'BEGIN:VEVENT',
    `UID:booking-${booking.id}@thecococlub.je`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART;TZID=Europe/London:${start}`,
    `DTEND;TZID=Europe/London:${end}`,
    `SUMMARY:${escapeText(`${STUDIO_INFO.name} — ${booking.serviceName}`)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(STUDIO_ADDRESS_LINE)}`,
    // The studio has not confirmed yet, so the event is genuinely tentative.
    'STATUS:TENTATIVE',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(`${STUDIO_INFO.name} appointment in 2 hours`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const ics = lines.map(foldLine).join('\r\n') + '\r\n'
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `the-coco-club-${booking.referenceNumber}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
