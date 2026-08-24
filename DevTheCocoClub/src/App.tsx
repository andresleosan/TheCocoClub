import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { FluidBackground } from './components/layout/FluidBackground';
import { Hero } from './components/sections/Hero';
import { AboutDeoana } from './components/sections/AboutDeoana';
import { ServicesMenu } from './components/sections/ServicesMenu';
import { TreatmentQuiz } from './components/sections/TreatmentQuiz';
import { ClinicalPodology } from './components/sections/ClinicalPodology';
import { TransformationSlider } from './components/sections/TransformationSlider';
import { ExperienceGallery } from './components/sections/ExperienceGallery';
import { GiftVouchers } from './components/sections/GiftVouchers';
import { Testimonials } from './components/sections/Testimonials';
import { StudioFAQ } from './components/sections/StudioFAQ';
import { LocationContact } from './components/sections/LocationContact';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { AdminModal } from './components/admin/AdminModal';
import { FloatingReviewTicker } from './components/reviews/FloatingReviewTicker';
import { Toast } from './components/ui/Toast';
import { Booking, ServiceItem, Testimonial } from './types';
import { getStoredBookings, getStoredTestimonials, addStoredTestimonial } from './utils/storage';
import { SERVICES_DATA } from './data/services';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setBookings(getStoredBookings());
    setTestimonials(getStoredTestimonials());
  }, []);

  const handleOpenBookingWithService = (service: ServiceItem) => {
    setPreSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleOpenGenericBooking = () => {
    setPreSelectedService(SERVICES_DATA[0]);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (newBooking: Booking) => {
    const updated = getStoredBookings();
    setBookings(updated);
    setToastMessage(`✨ Appointment #${newBooking.referenceNumber} booked successfully!`);
  };

  const handleAddReview = (newReview: Testimonial) => {
    const updated = addStoredTestimonial(newReview);
    setTestimonials(updated);
    setToastMessage(`💖 Thank you for your 5-star review, ${newReview.name}!`);
  };

  const handleExploreServices = () => {
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-lace text-jacobean relative flex flex-col font-sans selection:bg-khaki-200 selection:text-jacobean">
      {/* Background Animated Fluid Accents */}
      <FluidBackground />

      {/* Top Announcement Bar with Live Jersey Time */}
      <AnnouncementBar />

      {/* Floating Haute Navbar */}
      <Navbar
        onOpenBooking={handleOpenGenericBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        bookingCount={bookings.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Prominent 5.0 Google Badge & Social Proof */}
        <Hero
          onOpenBooking={handleOpenGenericBooking}
          onExploreServices={handleExploreServices}
        />

        {/* 2. Philosophy & Meet Deoana Moreno (30+ Years Experience) */}
        <AboutDeoana
          onOpenBooking={handleOpenGenericBooking}
        />

        {/* 3. Treatment Menu & Pricing with Ratings (£ GBP) */}
        <ServicesMenu
          onSelectService={handleOpenBookingWithService}
        />

        {/* 4. Interactive Treatment Matcher Consultation Quiz */}
        <TreatmentQuiz
          onSelectRecommendedService={handleOpenBookingWithService}
        />

        {/* 5. Clinical Podology & Medical Foot Health Spotlight */}
        <ClinicalPodology
          onBookPodology={() => {
            const podoService = SERVICES_DATA.find(s => s.id === 'srv-medical-podology') || SERVICES_DATA[0];
            handleOpenBookingWithService(podoService);
          }}
        />

        {/* 6. Interactive Before & After Transformation Slider */}
        <TransformationSlider />

        {/* 7. Visual Lookbook & Curated Showcase */}
        <ExperienceGallery />

        {/* 8. Luxury Gift Voucher Experience */}
        <GiftVouchers />

        {/* 9. Client Reviews & 5.0 Google Reviews Wall Showcase */}
        <Testimonials
          testimonials={testimonials}
          onAddReview={handleAddReview}
          onBookTreatment={handleOpenGenericBooking}
        />

        {/* 10. Frequently Asked Questions & Studio Etiquette */}
        <StudioFAQ />

        {/* 11. Location (14 La Motte St, St Helier) & Hours */}
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenGenericBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Booking Engine Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={preSelectedService}
        onBookingCreated={handleBookingCreated}
      />

      {/* Studio Administration & Appointment Dashboard */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        onBookingsChange={setBookings}
      />

      {/* Live Floating Social Proof Ticker (Bottom Left) */}
      <FloatingReviewTicker />

      {/* Toast Notification */}
      <Toast
        message={toastMessage || ''}
        isOpen={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default App;
