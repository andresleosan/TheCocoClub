/**
 * The shapes the rest of the site agrees on.
 *
 * Two interfaces were deleted here rather than tidied. `Testimonial` carried a 1–5 `rating`,
 * a `verified` flag and a `helpfulCount` for reviews the studio has never collected, and
 * `GalleryItem` existed only to hold remote stock-photo URLs presented as the studio's own
 * work. Neither could be made truthful, so neither survives — and with them went `rating`,
 * `reviewCount` and `imageUrl` on ServiceItem.
 *
 * Money is always whole pounds and time is always whole minutes. Nothing in here is
 * pre-formatted: render it through src/utils/formatters.ts so prices and durations read the
 * same way everywhere.
 */

export type ServiceCategory =
  | 'all'
  | 'signature-biab'
  | 'sculpted-extensions'
  | 'podology-care'
  | 'haute-nail-art'
  | 'spa-rituals'

export interface ServiceAddOn {
  id: string
  name: string
  /** GBP, whole pounds. */
  price: number
  durationMinutes: number
  description: string
}

export interface ServiceItem {
  id: string
  name: string
  category: ServiceCategory
  /** GBP, whole pounds. The one price for this treatment — see the note in data/services.ts. */
  price: number
  durationMinutes: number
  /** One or two lines for the treatment card. */
  shortDescription: string
  /** The full explanation, shown once a treatment is opened. */
  fullDescription: string
  /** A short factual label only — never a rating, never self-praise. */
  badge?: string
  popular?: boolean
  /** What the appointment actually contains. Keep each line short enough to scan. */
  included: string[]
  /** Add-on ids from SERVICE_ADDONS that suit this treatment. */
  recommendedAddons?: string[]
}

/** See the note on Booking: 'confirmed' is a human reply, not a system state. */
export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled'

/**
 * A booking request.
 *
 * There is no backend. Creating one of these writes to the visitor's own localStorage and
 * nothing else; the only thing that ever reaches the studio is the WhatsApp message built by
 * src/utils/whatsapp.ts. So `status: 'confirmed'` means Deoana replied on WhatsApp and said
 * yes — it is a note somebody made by hand, not proof that the site recorded anything
 * anywhere. Copy rendering a booking must keep saying "request" until that reply exists.
 */
export interface Booking {
  id: string
  /** Shown to the client so they can quote it in the WhatsApp thread. */
  referenceNumber: string
  createdAt: string
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceId: string
  /** Copied at request time so an old row still reads correctly if the menu changes. */
  serviceName: string
  addOns: ServiceAddOn[]
  /** YYYY-MM-DD. Render with formatDateFriendly — the old page printed raw ISO strings. */
  date: string
  /** HH:MM, 24h, from STUDIO_INFO.availableTimeSlots. */
  timeSlot: string
  totalPrice: number
  totalDurationMinutes: number
  beveragePreference?: string
  notes?: string
  status: BookingStatus
  /** Admin-only bookkeeping. The site never takes payment. */
  isPaid?: boolean
}

export interface BlockedSlot {
  id: string
  /** YYYY-MM-DD. */
  date: string
  /** HH:MM. Absent means the whole day is unavailable. */
  timeSlot?: string
  reason: string
}
