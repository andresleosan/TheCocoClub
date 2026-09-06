/**
 * The single source of truth for everything factual about the studio.
 *
 * Nothing in here may be invented. If a number cannot be substantiated it does not belong
 * in this file — the site previously carried a hardcoded "5.0 Google rating", a "+50 clients"
 * counter and a "100% satisfaction" statistic that existed nowhere but in the markup, which is
 * both a trust problem and, for a trading business, a legal one.
 *
 * Opening hours live here and ONLY here. The footer used to restate them by hand and had
 * already drifted out of sync (it claimed Sat until 18:00; the studio closes at 17:00).
 */

export interface OpeningHour {
  day: string
  /** Rendered label. Kept as data so hours can change in one place. */
  hours: string
  isOpen: boolean
  /** 24h HH:MM, present only on trading days. Used by the structured data and the booker. */
  opens?: string
  closes?: string
}

export const STUDIO_INFO = {
  name: 'The Coco Club',
  tagline: 'The art of taking care',
  secondaryTagline: 'Expert hands, latin heart',

  founder: 'Deoana Moreno',
  founderTitle: 'Nail technician & podology specialist',
  /** Years of practice, as stated by the studio. Rendered as "30+ years". */
  experienceYears: '30+',

  phone: '+44 7797 917296',
  phoneDisplay: '+44 (0)7797 917296',
  /** Digits only, for wa.me and tel: links. */
  phoneDigits: '447797917296',
  email: 'hello@thecococlub.je',

  instagram: '@thecococlub.je',
  instagramUrl: 'https://instagram.com/thecococlub.je',

  address: {
    street: '14 La Motte Street',
    city: 'Saint Helier',
    island: 'Jersey',
    postcode: 'JE2 4SY',
    country: 'Channel Islands',
    googleMapsUrl:
      'https://maps.google.com/?q=14+La+Motte+Street,+Saint+Helier,+Jersey+JE2+4SY',
  },

  openingHours: [
    { day: 'Monday', hours: 'By arrangement', isOpen: false },
    { day: 'Tuesday', hours: '09:00 – 18:00', isOpen: true, opens: '09:00', closes: '18:00' },
    { day: 'Wednesday', hours: '09:00 – 18:00', isOpen: true, opens: '09:00', closes: '18:00' },
    { day: 'Thursday', hours: '09:00 – 19:00', isOpen: true, opens: '09:00', closes: '19:00' },
    { day: 'Friday', hours: '09:00 – 18:00', isOpen: true, opens: '09:00', closes: '18:00' },
    { day: 'Saturday', hours: '09:00 – 17:00', isOpen: true, opens: '09:00', closes: '17:00' },
    { day: 'Sunday', hours: 'Closed', isOpen: false },
  ] as OpeningHour[],

  /** Short human summary of the week, derived once so no component restates it by hand. */
  get openingSummary(): string {
    const open = this.openingHours.filter((h) => h.isOpen)
    if (open.length === 0) return 'By appointment'
    return `${open[0].day.slice(0, 3)}–${open[open.length - 1].day.slice(0, 3)}, by appointment`
  },

  availableTimeSlots: ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'],

  /** Offered on arrival. Warmth is part of the service, so it is worth saying out loud. */
  beverageOptions: [
    'Italian espresso or cappuccino',
    'Chamomile & lavender infusion',
    'Sparkling water with fresh lime',
    'A glass of chilled prosecco',
  ],

  /**
   * How a booking actually reaches the studio. There is no backend: the booking form
   * composes a message and hands it to WhatsApp, and the studio replies to confirm.
   * Every piece of copy in the booking flow must reflect that — a request, not a
   * confirmed appointment.
   */
  bookingChannel: 'whatsapp' as const,
}

/** Full postal address on one line. */
export const STUDIO_ADDRESS_LINE = `${STUDIO_INFO.address.street}, ${STUDIO_INFO.address.city}, ${STUDIO_INFO.address.island} ${STUDIO_INFO.address.postcode}`
