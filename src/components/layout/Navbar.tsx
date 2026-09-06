import React, { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Wordmark, Logomark } from '../brand/BrandMarks'
import { STUDIO_INFO } from '../../data/studioInfo'

interface NavbarProps {
  onOpenBooking: () => void
}

/**
 * Two things were broken here beyond the styling.
 *
 * 1. Between 640px and 1024px the page had NO navigation at all: the hamburger was
 *    `flex sm:hidden` and the desktop nav `hidden lg:flex`, so the whole tablet band fell
 *    through the gap. Both now switch on the same breakpoint, `lg`.
 * 2. The drawer was `fixed ... top-full`. A fixed element resolves against the viewport, not
 *    its parent, so `top: 100%` put the menu one full viewport height below the fold whenever
 *    the header wasn't blurred. The drawer is now part of the header's normal flow.
 *
 * The wordmark is the studio's real logo rather than "THE COCO CLUB" set in letterspaced
 * Italiana caps, which was the opposite of the logo's warm, rounded personality.
 */

const NAV_LINKS = [
  { name: 'The studio', href: '#studio' },
  { name: 'Treatments', href: '#treatments' },
  { name: 'Foot health', href: '#foot-health' },
  { name: 'The work', href: '#work' },
  { name: 'Visiting', href: '#visiting' },
]

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The drawer is an overlay: Escape closes it and returns focus to the control that opened it.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,padding] duration-300 ${
        isScrolled || menuOpen
          ? 'border-b border-oyster-300/70 bg-lace/95 py-2 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-3.5'
      }`}
    >
      <div className="u-container flex items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5 text-jacobean transition-colors hover:text-redRobin"
          aria-label={`${STUDIO_INFO.name} — home`}
        >
          <Logomark className="h-7 w-auto text-khaki-600 transition-colors group-hover:text-redRobin sm:h-8" />
          <Wordmark className="h-7 w-auto sm:h-8" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-[0.8125rem] font-medium text-jacobean/75 transition-colors hover:text-redRobin
                         after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0
                         after:bg-redRobin after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button onClick={onOpenBooking} className="u-btn-primary u-btn-sm sm:hidden">
            Book
          </button>
          <button onClick={onOpenBooking} className="u-btn-primary hidden sm:inline-flex">
            Book an appointment
          </button>

          <button
            ref={toggleRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full text-jacobean transition-colors hover:bg-oyster-200 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* In normal flow under the bar, so it sits where the header actually is. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-oyster-300/70 bg-lace lg:hidden"
      >
        <nav aria-label="Primary (mobile)" className="u-container flex flex-col py-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-oyster-300/50 py-3.5 text-sm font-medium text-jacobean last:border-b-0 hover:text-redRobin"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
