import { Booking, BlockedSlot, Testimonial } from '../types';
import { INITIAL_BOOKINGS } from '../data/initialBookings';
import { TESTIMONIALS_DATA } from '../data/testimonials';

const BOOKINGS_STORAGE_KEY = 'the_coco_club_bookings_v1';
const BLOCKED_SLOTS_STORAGE_KEY = 'the_coco_club_blocked_slots_v1';
const TESTIMONIALS_STORAGE_KEY = 'the_coco_club_testimonials_v1';

export const getStoredBookings = (): Booking[] => {
  try {
    const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading bookings from storage:', error);
    return INITIAL_BOOKINGS;
  }
};

export const saveBookings = (bookings: Booking[]): void => {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings to storage:', error);
  }
};

export const addBooking = (newBooking: Booking): Booking[] => {
  const current = getStoredBookings();
  const updated = [newBooking, ...current];
  saveBookings(updated);
  return updated;
};

export const updateBookingStatus = (id: string, status: Booking['status']): Booking[] => {
  const current = getStoredBookings();
  const updated = current.map(b => b.id === id ? { ...b, status } : b);
  saveBookings(updated);
  return updated;
};

export const deleteBooking = (id: string): Booking[] => {
  const current = getStoredBookings();
  const updated = current.filter(b => b.id !== id);
  saveBookings(updated);
  return updated;
};

export const getStoredBlockedSlots = (): BlockedSlot[] => {
  try {
    const data = localStorage.getItem(BLOCKED_SLOTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading blocked slots:', error);
    return [];
  }
};

export const saveBlockedSlots = (slots: BlockedSlot[]): void => {
  try {
    localStorage.setItem(BLOCKED_SLOTS_STORAGE_KEY, JSON.stringify(slots));
  } catch (error) {
    console.error('Error saving blocked slots:', error);
  }
};

export const getStoredTestimonials = (): Testimonial[] => {
  try {
    const data = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(TESTIMONIALS_DATA));
      return TESTIMONIALS_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading testimonials from storage:', error);
    return TESTIMONIALS_DATA;
  }
};

export const addStoredTestimonial = (testimonial: Testimonial): Testimonial[] => {
  const current = getStoredTestimonials();
  const updated = [testimonial, ...current];
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving testimonial:', error);
  }
  return updated;
};
