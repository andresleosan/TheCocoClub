import { Booking, BookingStatus, ServiceAddOn } from '../types'
import { SERVICES_DATA, SERVICE_ADDONS } from './services'
import { STUDIO_INFO } from './studioInfo'

/**
 * DEMO DATA. None of these people exist.
 *
 * The admin portal has no backend to read from, so it seeds itself with these rows the first
 * time it opens in a given browser. They exist so the portal has something to lay out — they
 * are not the studio's diary and they never leave the visitor's own localStorage.
 *
 * They are written to be obviously fake: "Demo client A", example.com addresses, and numbers
 * from the +44 7700 900xxx range that Ofcom reserves for fiction. The old file used
 * full names, a gmail.com address and a je domain, which read as real client records sitting
 * in a public repository.
 */

/** Dates are relative so the portal always opens on a plausible week, whenever it is run. */
const dateOffset = (days: number): string => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

const daysAgoIso = (days: number): string =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

interface DemoRow {
  id: string
  reference: string
  clientName: string
  serviceId: string
  addOnIds: string[]
  /** Offset in days from today; negative is in the past. */
  dayOffset: number
  createdDaysAgo: number
  /** Must be one of STUDIO_INFO.availableTimeSlots — the old rows used 14:00 and 15:30, which
      the booker never offers, so the demo diary showed times nobody could actually request. */
  timeSlot: string
  beverage: string
  notes: string
  status: BookingStatus
  isPaid: boolean
}

const DEMO_ROWS: DemoRow[] = [
  {
    id: 'demo-a',
    reference: 'CC-DEMO-01',
    clientName: 'Demo client A',
    serviceId: 'srv-biab-signature',
    addOnIds: ['addon-french'],
    dayOffset: 0,
    createdDaysAgo: 2,
    timeSlot: '10:30',
    beverage: STUDIO_INFO.beverageOptions[0],
    notes: 'Square-round shape, milky nude base.',
    status: 'confirmed',
    isPaid: true,
  },
  {
    id: 'demo-b',
    reference: 'CC-DEMO-02',
    clientName: 'Demo client B',
    serviceId: 'srv-medical-podology',
    addOnIds: ['addon-paraffin'],
    dayOffset: 1,
    createdDaysAgo: 1,
    timeSlot: '13:30',
    beverage: STUDIO_INFO.beverageOptions[1],
    notes: 'Asked about heel hard skin. Awaiting a reply on WhatsApp.',
    status: 'pending',
    isPaid: false,
  },
  {
    id: 'demo-c',
    reference: 'CC-DEMO-03',
    clientName: 'Demo client C',
    serviceId: 'srv-acrylic-fullset',
    addOnIds: ['addon-chrome'],
    dayOffset: -4,
    createdDaysAgo: 9,
    timeSlot: '15:00',
    beverage: STUDIO_INFO.beverageOptions[3],
    notes: 'Almond, pearl chrome. Rebook an infill in three weeks.',
    status: 'completed',
    isPaid: true,
  },
]

/**
 * Totals are derived rather than typed out, and add-ons are looked up by id rather than by
 * position. The old file wrote `SERVICE_ADDONS[3]` and a hardcoded `totalPrice: 67`, both of
 * which quietly become wrong the moment the menu is reordered or a price changes.
 */
const buildDemoBooking = (row: DemoRow): Booking => {
  const service = SERVICES_DATA.find((s) => s.id === row.serviceId)
  const addOns: ServiceAddOn[] = SERVICE_ADDONS.filter((addOn) => row.addOnIds.includes(addOn.id))

  const basePrice = service?.price ?? 0
  const baseMinutes = service?.durationMinutes ?? 0

  return {
    id: row.id,
    referenceNumber: row.reference,
    createdAt: daysAgoIso(row.createdDaysAgo),
    clientName: row.clientName,
    clientEmail: `${row.id}@example.com`,
    clientPhone: '+44 7700 900000',
    serviceId: row.serviceId,
    serviceName: service?.name ?? 'Treatment no longer on the menu',
    addOns,
    date: dateOffset(row.dayOffset),
    timeSlot: row.timeSlot,
    totalPrice: addOns.reduce((total, addOn) => total + addOn.price, basePrice),
    totalDurationMinutes: addOns.reduce(
      (total, addOn) => total + addOn.durationMinutes,
      baseMinutes,
    ),
    beveragePreference: row.beverage,
    notes: row.notes,
    status: row.status,
    isPaid: row.isPaid,
  }
}

export const INITIAL_BOOKINGS: Booking[] = DEMO_ROWS.map(buildDemoBooking)
