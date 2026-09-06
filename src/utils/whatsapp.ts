import { Booking } from '../types'
import { STUDIO_INFO, STUDIO_ADDRESS_LINE } from '../data/studioInfo'
import { formatDateFriendly, formatDuration, formatPrice } from './formatters'

/**
 * WhatsApp is not a nice-to-have on this site — it is the delivery mechanism.
 *
 * The booking form has no backend; it writes to the visitor's own localStorage and nothing
 * else. Until that changes, the only thing that actually reaches the studio is the message
 * these helpers compose, so the booking flow must treat sending it as a required step and
 * must describe the result as a *request* rather than a confirmed appointment.
 */

const waLink = (message: string): string =>
  `https://wa.me/${STUDIO_INFO.phoneDigits}?text=${encodeURIComponent(message)}`

/** The message a client sends to request the slot they just chose. */
export const createWhatsAppBookingLink = (booking: Booking): string => {
  const addOns = booking.addOns.length
    ? `\nAdd-ons: ${booking.addOns.map((a) => a.name).join(', ')}`
    : ''
  const beverage = booking.beveragePreference ? `\nTo drink: ${booking.beveragePreference}` : ''
  const notes = booking.notes ? `\nNotes: ${booking.notes}` : ''

  return waLink(
    `Hello Deoana — I'd like to request this appointment at The Coco Club.

Treatment: ${booking.serviceName}${addOns}
Date: ${formatDateFriendly(booking.date)}
Time: ${booking.timeSlot}
About: ${formatDuration(booking.totalDurationMinutes)} · ${formatPrice(booking.totalPrice)}

Name: ${booking.clientName}
Phone: ${booking.clientPhone}${beverage}${notes}
Reference: ${booking.referenceNumber}

Please let me know if that time works. Thank you!`,
  )
}

/** General enquiry, for the header and the quieter CTAs. */
export const createWhatsAppGeneralInquiryLink = (): string =>
  waLink(
    `Hello Deoana — I found The Coco Club online and I'd like to ask about an appointment at ${STUDIO_ADDRESS_LINE}.`,
  )

/** Enquiry pre-filled with one treatment, for use from the treatment list and the matcher. */
export const createWhatsAppServiceInquiryLink = (serviceName: string): string =>
  waLink(`Hello Deoana — I'd like to ask about the ${serviceName} at The Coco Club.`)

/** Gift voucher enquiry: vouchers are arranged personally, not sold through the site. */
export const createWhatsAppVoucherLink = (
  amount: number,
  recipient?: string,
  message?: string,
): string =>
  waLink(
    `Hello Deoana — I'd like to arrange a ${formatPrice(amount)} gift voucher for The Coco Club.` +
      (recipient ? `\nFor: ${recipient}` : '') +
      (message ? `\nMessage to include: ${message}` : '') +
      `\n\nCould you let me know how to pay and collect it? Thank you!`,
  )
