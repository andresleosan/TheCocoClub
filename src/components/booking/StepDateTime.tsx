import React, { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { STUDIO_INFO } from '../../data/studioInfo'
import { formatDateFriendly, formatDuration, formatTimeRange } from '../../utils/formatters'

/**
 * Step two — the day and the start time.
 *
 * Three things were wrong here and all three misled the client.
 *
 * 1. Slots were greyed out against the bookings held in *this browser's* localStorage, seeded
 *    with demo rows. A real client was being told 10:30 was taken when the studio's diary says
 *    nothing of the sort. The site cannot see that diary, so it no longer pretends to: every
 *    listed start time is offered, and the copy says plainly that Deoana confirms it is free.
 * 2. The raw ISO date leaked into the panel twice ("2026-09-12"). Everything visible now goes
 *    through formatDateFriendly.
 * 3. Every free slot carried the word "Available" under a column headed "Available Times". The
 *    sub-line now carries something worth reading — when the appointment would finish.
 *
 * What the site *can* honestly check is the clock: a start time that would run past closing, or
 * one that has already gone by today, is not offered at all.
 */

interface StepDateTimeProps {
  selectedDate: string
  onSelectDate: (date: string) => void
  selectedTimeSlot: string
  onSelectTimeSlot: (slot: string) => void
  /** Treatment plus add-ons. Drives which start times still fit before the studio closes. */
  treatmentDurationMinutes: number
  /** Set when the client tried to continue without choosing. */
  error?: string | null
  headingId: string
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Opening hours live in studioInfo and only there — the old grid hardcoded "closed Sun/Mon". */
const OPENING = new Map(STUDIO_INFO.openingHours.map((hour) => [hour.day, hour]))
const openingFor = (date: Date) => OPENING.get(WEEKDAYS[date.getDay()])

const toMinutes = (clock: string): number => {
  const [hours, minutes] = clock.split(':').map(Number)
  return hours * 60 + minutes
}

/** Local calendar key. `toISOString()` would shift the day for anyone west of UTC. */
const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const parseDateKey = (key: string): Date => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Same-day requests need a little notice; the studio is not sitting waiting for a ping. */
const SAME_DAY_NOTICE_MINUTES = 90

export const StepDateTime: React.FC<StepDateTimeProps> = ({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  treatmentDurationMinutes,
  error,
  headingId,
}) => {
  const today = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  }, [])

  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // The grid runs Monday-first, so Sunday (0) has to fall at the end of the row.
  const leadingBlanks = (new Date(year, month, 1).getDay() + 6) % 7
  const atFirstMonth = year === today.getFullYear() && month === today.getMonth()

  const slots = useMemo(() => {
    if (!selectedDate) return []

    const day = parseDateKey(selectedDate)
    const opening = openingFor(day)
    if (!opening?.isOpen || !opening.closes) return []

    const closesAt = toMinutes(opening.closes)
    const now = new Date()
    const earliest =
      toDateKey(now) === selectedDate
        ? now.getHours() * 60 + now.getMinutes() + SAME_DAY_NOTICE_MINUTES
        : 0

    return STUDIO_INFO.availableTimeSlots
      .map((slot) => ({ slot, start: toMinutes(slot) }))
      .filter(({ start }) => start >= earliest && start + treatmentDurationMinutes <= closesAt)
      .map(({ slot }) => slot)
  }, [selectedDate, treatmentDurationMinutes])

  // Adding an add-on lengthens the appointment, which can push the chosen start time past
  // closing. Dropping it here stops the client carrying a time forward that no longer fits.
  useEffect(() => {
    if (selectedTimeSlot && !slots.includes(selectedTimeSlot)) {
      onSelectTimeSlot('')
    }
  }, [slots, selectedTimeSlot, onSelectTimeSlot])

  const selectedDay = selectedDate ? parseDateKey(selectedDate) : null
  const selectedOpening = selectedDay ? openingFor(selectedDay) : undefined
  const isToday = selectedDate !== '' && selectedDate === toDateKey(new Date())

  return (
    <div className="space-y-6 px-6 py-6 sm:px-8">
      <div>
        <h3 id={headingId} className="u-quote text-lg text-jacobean">
          Choose a day and a start time
        </h3>
        <p className="mt-1 text-sm text-jacobean/70">
          The studio is open Tuesday to Saturday. Mondays are by arrangement — pick another day
          and mention Monday in your message.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-card border border-redRobin-700/30 bg-redRobin-50 px-4 py-3 text-sm text-redRobin-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="u-card p-4 sm:p-5 lg:col-span-7">
          <div className="flex items-center justify-between gap-2">
            {/* aria-live so a screen reader hears the month change rather than silently
                losing its place in the grid. */}
            <h4 aria-live="polite" className="text-sm font-semibold text-jacobean">
              {MONTHS[month]} {year}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMonth(new Date(year, month - 1, 1))}
                disabled={atFirstMonth}
                aria-label="Previous month"
                className="grid h-9 w-9 place-items-center rounded-full text-jacobean transition-colors hover:bg-pearlBush disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMonth(new Date(year, month + 1, 1))}
                aria-label="Next month"
                className="grid h-9 w-9 place-items-center rounded-full text-jacobean transition-colors hover:bg-pearlBush"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-4 grid grid-cols-7 gap-1 text-center text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-jacobean/70"
          >
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: leadingBlanks }).map((_, index) => (
              <span key={`blank-${index}`} className="h-10" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const date = new Date(year, month, day)
              const key = toDateKey(date)
              const opening = openingFor(date)
              const selectable = date >= today && Boolean(opening?.isOpen)
              const selected = selectedDate === key
              const isToday = key === toDateKey(today)

              return (
                <button
                  key={key}
                  type="button"
                  disabled={!selectable}
                  aria-pressed={selected}
                  // The number alone tells a screen reader nothing about which day it is.
                  aria-label={formatDateFriendly(key)}
                  onClick={() => onSelectDate(key)}
                  className={`h-10 rounded-xl text-sm font-medium transition-colors ${
                    selected
                      ? // No scale here: the old `scale-105` grew the cell into its neighbours
                        // across a 4px gap and made the grid look broken.
                        'bg-jacobean text-lace'
                      : selectable
                        ? `text-jacobean hover:bg-pearlBush ${isToday ? 'ring-1 ring-inset ring-khaki-500' : ''}`
                        : 'text-jacobean/25'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <p className="mt-4 border-t border-oyster-300/70 pt-3 text-sm text-jacobean/70">
            Faded days are Sundays, Mondays and dates already past.
          </p>
        </div>

        <div className="space-y-3 lg:col-span-5">
          <h4 className="u-eyebrow text-khaki-700">Start times</h4>

          {!selectedDate ? (
            <div className="u-card-quiet flex flex-col items-center gap-2 px-5 py-8 text-center">
              <CalendarDays className="h-6 w-6 text-khaki-500" aria-hidden="true" />
              <p className="text-sm text-jacobean/70">
                Choose a day on the calendar and the start times will appear here.
              </p>
            </div>
          ) : slots.length === 0 ? (
            <div className="u-card-quiet space-y-2 px-5 py-6">
              <p className="text-sm font-semibold text-jacobean">
                No start time left on {formatDateFriendly(selectedDate)}.
              </p>
              <p className="text-sm text-jacobean/70">
                {isToday
                  ? `Today's remaining slots are too close to now for ${formatDuration(treatmentDurationMinutes)}.`
                  : `${formatDuration(treatmentDurationMinutes)} has to finish before the studio closes${
                      selectedOpening?.closes ? ` at ${selectedOpening.closes}` : ''
                    }.`}{' '}
                Choose another day, or drop an add-on on the previous step.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-jacobean/70">
                {formatDateFriendly(selectedDate)}
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {slots.map((slot) => {
                  const selected = selectedTimeSlot === slot

                  return (
                    <button
                      key={slot}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelectTimeSlot(slot)}
                      className={`rounded-card border px-3 py-3 text-sm font-semibold transition-colors ${
                        selected
                          ? 'border-jacobean bg-jacobean text-lace'
                          : 'border-oyster-300/70 bg-lace text-jacobean hover:border-oyster-400 hover:bg-pearlBush/40'
                      }`}
                    >
                      {/* The whole span, not a filler word: every free slot used to carry the
                          label "Available" under a column headed "Available Times". */}
                      {formatTimeRange(slot, treatmentDurationMinutes)}
                    </button>
                  )
                })}
              </div>

              {/* The one honest thing to say about availability: the site cannot see the diary. */}
              <p className="text-sm text-jacobean/70">
                These are the studio's usual start times. Deoana takes one client at a time, so she
                confirms the slot is free when she replies to your message.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
