import { Booking } from '../types';
import { SERVICE_ADDONS } from './services';

// Generate dynamic dates near current date for realistic demonstration
const today = new Date();
const formatDate = (daysOffset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    referenceNumber: 'CC-2026-9142',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    clientName: 'Eleanor Vance',
    clientEmail: 'eleanor.vance@jerseymail.co.uk',
    clientPhone: '+44 7700 900123',
    serviceId: 'srv-biab-signature',
    serviceName: 'The Coco Club Signature BIAB Overlay',
    addOns: [SERVICE_ADDONS[3]], // French micro tips
    date: formatDate(0), // Today
    timeSlot: '10:30',
    totalPrice: 67,
    totalDurationMinutes: 90,
    beveragePreference: 'Artisan Italian Espresso / Cappuccino',
    notes: 'Regular client. Prefers square round shape and nude milky base.',
    status: 'confirmed',
    isPaid: true
  },
  {
    id: 'bk-102',
    referenceNumber: 'CC-2026-9143',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    clientName: 'Victoria Cabot',
    clientEmail: 'v.cabot@sthelier.je',
    clientPhone: '+44 7797 811442',
    serviceId: 'srv-medical-podology',
    serviceName: 'Specialist Clinical Podological Pedicure',
    addOns: [SERVICE_ADDONS[0]], // Paraffin
    date: formatDate(0), // Today
    timeSlot: '14:00',
    totalPrice: 77,
    totalDurationMinutes: 90,
    beveragePreference: 'Organic Chamomile & Lavender Infusion',
    notes: 'Needs deep heel callus treatment and nail contouring.',
    status: 'confirmed',
    isPaid: false
  },
  {
    id: 'bk-103',
    referenceNumber: 'CC-2026-9144',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    clientName: 'Hannah Marett',
    clientEmail: 'hannah.marett@gmail.com',
    clientPhone: '+44 7797 654321',
    serviceId: 'srv-acrylic-fullset',
    serviceName: 'Bespoke Sculpted Acrylic Extensions (Full Set)',
    addOns: [SERVICE_ADDONS[2]], // Chrome
    date: formatDate(1), // Tomorrow
    timeSlot: '12:00',
    totalPrice: 85,
    totalDurationMinutes: 115,
    beveragePreference: 'Complimentary Glass of Chilled Prosecco',
    notes: 'Almond shape, chrome pearl finish for a wedding guest look.',
    status: 'confirmed',
    isPaid: true
  },
  {
    id: 'bk-104',
    referenceNumber: 'CC-2026-9145',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    clientName: 'Chloe Du Feu',
    clientEmail: 'chloe.dufeu@outlook.com',
    clientPhone: '+44 7700 900888',
    serviceId: 'srv-ombre-babyboomer',
    serviceName: 'French Ombré / Babyboomer Luxury Set',
    addOns: [],
    date: formatDate(2),
    timeSlot: '15:30',
    totalPrice: 85,
    totalDurationMinutes: 120,
    beveragePreference: 'Chilled Sparkling Water with Fresh Lime',
    notes: 'First time client from St Brelade.',
    status: 'pending',
    isPaid: false
  }
];
