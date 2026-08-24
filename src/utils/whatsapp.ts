import { Booking } from '../types';
import { STUDIO_INFO } from '../data/studioInfo';

export const createWhatsAppBookingLink = (booking: Booking): string => {
  const cleanPhone = STUDIO_INFO.phone.replace(/[^0-9]/g, '');
  
  const addOnsText = booking.addOns.length > 0
    ? `\n✨ Add-ons: ${booking.addOns.map(a => a.name).join(', ')}`
    : '';

  const notesText = booking.notes ? `\n📝 Notes: ${booking.notes}` : '';
  const beverageText = booking.beveragePreference ? `\n☕ Welcome Drink: ${booking.beveragePreference}` : '';

  const message = `Hello Deoana! 💅
I have just booked an appointment at The Coco Club:

📅 Date: ${booking.date}
⏰ Time: ${booking.timeSlot}
🏷️ Service: ${booking.serviceName}${addOnsText}
💰 Total: £${booking.totalPrice} (~${booking.totalDurationMinutes} mins)
👤 Name: ${booking.clientName}
📱 Phone: ${booking.clientPhone}${beverageText}${notesText}
🔖 Booking Ref: ${booking.referenceNumber}

Looking forward to my appointment at 14 La Motte Street!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const createWhatsAppGeneralInquiryLink = (): string => {
  const cleanPhone = STUDIO_INFO.phone.replace(/[^0-9]/g, '');
  const message = `Hello Deoana! 🤍\nI would love to inquire about booking a private appointment at The Coco Club in Saint Helier.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
