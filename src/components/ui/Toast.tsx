import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  isOpen: boolean
  onClose: () => void
}

/**
 * The page's one transient notice. It carries the booking reference, so it has to be both
 * readable and announced — it was neither.
 *
 * Three things were wrong. It had no role, so a screen reader was never told a booking
 * reference had appeared. It animated with `animate-in slide-in-from-bottom-5`, which are
 * v4/plugin class names that compile to nothing in this Tailwind build — the toast simply
 * blinked into place. And it parked itself in the bottom-right corner at every width, which
 * on a phone is exactly where the thumb and any sticky action live.
 *
 * The live region is mounted for the life of the page and only its contents change, because a
 * region that appears at the same moment as its text is announced unreliably.
 *
 * It portals to the body for the same reason Modal does: `fixed` is defeated by any ancestor
 * with a transform or a clip, and the app shell carries `overflow-x-clip`.
 */
export const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
  // The parent hands us a fresh arrow on every render; depending on it directly would restart
  // the countdown each time the page re-rendered, so the timer reads it through a ref instead.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    if (!isOpen) return
    // Long enough to read a reference number back to yourself. `message` is a dependency so a
    // second notice arriving over the first gets a full dwell rather than the remains of one.
    const timer = window.setTimeout(() => closeRef.current(), 6000)
    return () => window.clearTimeout(timer)
  }, [isOpen, message])

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 top-20 z-50 flex justify-center
                 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:justify-end"
    >
      {isOpen && message && (
        <div className="animate-fade-up pointer-events-auto flex w-full max-w-sm items-start gap-3
                        rounded-card border border-lace/15 bg-jacobean-900 p-4 shadow-panel">
          <p className="min-w-0 flex-1 text-sm leading-snug text-lace">{message}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notice"
            className="-my-2 -mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full
                       text-oyster-300 transition-colors hover:bg-lace/10 hover:text-lace"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>,
    document.body,
  )
}
