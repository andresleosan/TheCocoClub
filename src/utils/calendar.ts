import { Booking } from '../types';
import { STUDIO_INFO } from '../data/studioInfo';

export const generateIcsCalendarFile = (booking: Booking): void => {
  const [year, month, day] = booking.date.split('-').map(Number);
  const [hours, minutes] = booking.timeSlot.split(':').map(Number);

  const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const endDate = new Date(startDate.getTime() + booking.totalDurationMinutes * 60 * 1000);

  const formatDateToIcs = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const addOnsList = booking.addOns.length > 0
    ? `\\nAdd-ons: ${booking.addOns.map(a => a.name).join(', ')}`
    : '';

  const notesText = booking.notes ? `\\nNotes: ${booking.notes}` : '';
  const beverageText = booking.beveragePreference ? `\\nWelcome Drink: ${booking.beveragePreference}` : '';

  const description = `Appointment for ${booking.serviceName} at The Coco Club by Deoana Moreno.${addOnsList}${beverageText}${notesText}\\n\\nAddress: 14 La Motte Street, Saint Helier, Jersey JE2 4SY\\nContact: ${STUDIO_INFO.phone}\\nBooking Ref: ${booking.referenceNumber}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Coco Club//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:booking-${booking.id}@thecococlub.je`,
    `DTSTAMP:${formatDateToIcs(new Date())}`,
    `DTSTART:${formatDateToIcs(startDate)}`,
    `DTEND:${formatDateToIcs(endDate)}`,
    `SUMMARY:The Coco Club — ${booking.serviceName}`,
    `DESCRIPTION:${description}`,
    `LOCATION:14 La Motte Street, Saint Helier, Jersey JE2 4SY`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Your luxury nail ritual at The Coco Club in 2 hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `the-coco-club-${booking.referenceNumber}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
