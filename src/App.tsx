import React, { useCallback, useEffect, useState } from 'react'
import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { TheStudio } from './components/sections/TheStudio'
import { Treatments } from './components/sections/Treatments'
import { FootHealth } from './components/sections/FootHealth'
import { TreatmentFinder } from './components/sections/TreatmentFinder'
import { TheWork } from './components/sections/TheWork'
import { GiftVouchers } from './components/sections/GiftVouchers'
import { Visiting } from './components/sections/Visiting'
import { BookingModal } from './components/booking/BookingModal'
import { AdminModal } from './components/admin/AdminModal'
import { Toast } from './components/ui/Toast'
import { Booking, ServiceItem } from './types'
import { getStoredBookings } from './utils/storage'
import { SERVICES_DATA } from './data/services'

/**
 * Page architecture.
 *
 * The previous page ran eleven sections in an identical rhythm — centred eyebrow, centred
 * 60px uppercase headline, three-card grid — which left it with no hierarchy at all: every
 * section claimed to be the most important one, so none of them read as important.
 *
 * Four things carry this page, and everything else is deliberately quieter:
 *   1. the founder      -> The Studio
 *   2. the treatments   -> Treatments
 *   3. the credential   -> Foot Health, the page's one dark structural anchor
 *   4. the work         -> The Work
 *
 * Backgrounds alternate lace / pearl bush and break once into jacobean, so the page opens
 * warm, compresses into the dark band, opens again, then tightens toward the practicalities.
 *
 * Three sections were removed rather than restyled. The before/after slider, the reviews wall
 * and the lookbook all presented stock photography and invented clients as the studio's own
 * work and its own customers; with no real assets behind them they could not be made honest,
 * so The Work now points at the studio's actual Instagram instead.
 */
export const App: React.FC = () => {
  const [isBookingOpen, setBookingOpen] = useState(false)
  const [isAdminOpen, setAdminOpen] = useState(false)
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    setBookings(getStoredBookings())
  }, [])

  const openBooking = useCallback((service?: ServiceItem) => {
    setPreSelectedService(service ?? SERVICES_DATA[0] ?? null)
    setBookingOpen(true)
  }, [])

  const handleBookingCreated = useCallback((booking: Booking) => {
    setBookings(getStoredBookings())
    // Deliberately worded as a request: nothing reaches the studio until the client sends
    // the WhatsApp message that the confirmation step hands them.
    setToast(`Request ${booking.referenceNumber} ready — send it to the studio on WhatsApp.`)
  }, [])

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-lace text-jacobean">
      <a
        href="#main"
        className="u-sr-only-focusable absolute left-4 top-4 z-50 rounded-full bg-jacobean px-5 py-3 text-sm font-semibold text-lace"
      >
        Skip to content
      </a>

      <AnnouncementBar />
      <Navbar onOpenBooking={() => openBooking()} />

      <main id="main" className="flex-1">
        <Hero onOpenBooking={() => openBooking()} />
        <TheStudio />
        <Treatments onSelectService={openBooking} />
        <FootHealth onOpenBooking={openBooking} />
        <TreatmentFinder onSelectService={openBooking} />
        <TheWork />
        <GiftVouchers />
        <Visiting />
      </main>

      <Footer onOpenBooking={() => openBooking()} onOpenAdmin={() => setAdminOpen(true)} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setBookingOpen(false)}
        preSelectedService={preSelectedService}
        onBookingCreated={handleBookingCreated}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setAdminOpen(false)}
        bookings={bookings}
        onBookingsChange={setBookings}
      />

      <Toast message={toast ?? ''} isOpen={Boolean(toast)} onClose={() => setToast(null)} />
    </div>
  )
}

export default App
