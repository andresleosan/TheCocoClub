import { Booking, BlockedSlot } from '../types'
import { INITIAL_BOOKINGS } from '../data/initialBookings'

/**
 * localStorage is the whole "database".
 *
 * Nothing written here reaches the studio — that only happens when the client sends the
 * WhatsApp message built in src/utils/whatsapp.ts. This module exists so a client can reopen
 * the page and still see what they asked for, and so the admin portal has rows to lay out.
 *
 * Which is exactly why none of it may ever throw. localStorage is not guaranteed to exist:
 * Safari in private browsing, an embedded webview, or a browser set to block site data will
 * throw on `getItem` itself, and the previous version let that exception escape — one visitor
 * setting took the entire page down at first paint. Every read and every write here is
 * wrapped, every parse is checked for being an array before it is trusted, and every failure
 * degrades to "no stored data" rather than to a blank screen.
 *
 * Failures are deliberately silent. In private mode every single call fails, so logging would
 * fill the console with noise the visitor cannot act on and the studio will never see.
 */

const BOOKINGS_KEY = 'the_coco_club_bookings_v1'
const BLOCKED_SLOTS_KEY = 'the_coco_club_blocked_slots_v1'

/**
 * Returning visitors still have a cache of the old fabricated reviews in their browser. The
 * feature and its data are gone, so the key goes with them instead of lingering as dead weight.
 */
const LEGACY_TESTIMONIALS_KEY = 'the_coco_club_testimonials_v1'

const readRaw = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    // Storage disabled or unavailable — treat it as empty.
    return null
  }
}

const writeRaw = (key: string, value: string): boolean => {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch {
    // Disabled, or the quota is full. The caller keeps its in-memory copy either way.
    return false
  }
}

try {
  window.localStorage.removeItem(LEGACY_TESTIMONIALS_KEY)
} catch {
  // No storage to clean.
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

/**
 * Stored rows come from an earlier version of this site, or from anyone who has opened dev
 * tools, so shape is an assumption and not a fact. Rows that do not carry the fields the UI
 * reads are dropped rather than handed to a component that will crash on them.
 */
const isBooking = (value: unknown): value is Booking =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.date === 'string' &&
  typeof value.timeSlot === 'string' &&
  typeof value.serviceName === 'string' &&
  Array.isArray(value.addOns)

const isBlockedSlot = (value: unknown): value is BlockedSlot =>
  isRecord(value) && typeof value.id === 'string' && typeof value.date === 'string'

/** Returns null for "nothing usable there", which is distinct from a stored empty list. */
const readArray = <T>(key: string, isValid: (row: unknown) => row is T): T[] | null => {
  const raw = readRaw(key)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed.filter(isValid)
  } catch {
    // Truncated or hand-edited JSON.
    return null
  }
}

/**
 * An empty stored list is respected: if the studio has deleted every row in the admin portal,
 * the demo bookings must not quietly reappear on the next load.
 */
export const getStoredBookings = (): Booking[] => {
  const stored = readArray(BOOKINGS_KEY, isBooking)
  if (stored) return stored

  // Copies, not the module-level array — the admin portal sorts and filters what it is given.
  const seeded = INITIAL_BOOKINGS.map((booking) => ({ ...booking }))
  writeRaw(BOOKINGS_KEY, JSON.stringify(seeded))
  return seeded
}

/** Returns false when the write could not be made, so a caller can avoid promising too much. */
export const saveBookings = (bookings: Booking[]): boolean =>
  writeRaw(BOOKINGS_KEY, JSON.stringify(bookings))

/**
 * The returned list is authoritative even when the write failed: the request itself travels by
 * WhatsApp, and losing the local copy is an inconvenience rather than a lost appointment.
 */
export const addBooking = (newBooking: Booking): Booking[] => {
  const updated = [newBooking, ...getStoredBookings()]
  saveBookings(updated)
  return updated
}

export const updateBookingStatus = (id: string, status: Booking['status']): Booking[] => {
  const updated = getStoredBookings().map((booking) =>
    booking.id === id ? { ...booking, status } : booking,
  )
  saveBookings(updated)
  return updated
}

export const deleteBooking = (id: string): Booking[] => {
  const updated = getStoredBookings().filter((booking) => booking.id !== id)
  saveBookings(updated)
  return updated
}

export const getStoredBlockedSlots = (): BlockedSlot[] =>
  readArray(BLOCKED_SLOTS_KEY, isBlockedSlot) ?? []

export const saveBlockedSlots = (slots: BlockedSlot[]): boolean =>
  writeRaw(BLOCKED_SLOTS_KEY, JSON.stringify(slots))
