export type ServiceCategory = 
  | 'all'
  | 'signature-biab'
  | 'sculpted-extensions'
  | 'podology-care'
  | 'haute-nail-art'
  | 'spa-rituals';

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number; // in GBP £
  durationMinutes: number;
  description: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number; // in GBP £
  durationMinutes: number;
  shortDescription: string;
  fullDescription: string;
  badge?: string;
  popular?: boolean;
  rating?: number;
  reviewCount?: number;
  included: string[];
  recommendedAddons?: string[];
  imageUrl?: string;
}

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  referenceNumber: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  addOns: ServiceAddOn[];
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM (24h)
  totalPrice: number;
  totalDurationMinutes: number;
  beveragePreference?: string;
  notes?: string;
  status: BookingStatus;
  isPaid?: boolean;
}

export interface BlockedSlot {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot?: string; // If undefined, whole day is blocked
  reason: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string; // Parish in Jersey, e.g. 'Saint Helier', 'Saint Brelade', 'Saint Ouen'
  service: string;
  serviceCategory: ServiceCategory;
  rating: number; // 1 to 5
  title: string;
  review: string;
  date: string;
  verified: boolean;
  avatarUrl?: string;
  helpfulCount?: number;
  highlightPhrase?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'nail-art' | 'sculpting' | 'pedicure' | 'studio' | 'biab';
  imageUrl: string;
  caption: string;
  tags: string[];
}
