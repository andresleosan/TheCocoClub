import React, { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * The one dialog primitive for the whole site.
 *
 * Every modal here previously re-implemented its own overlay, and all six got the same things
 * wrong: no `role="dialog"`, no Escape, no focus trap, no focus restore, no background scroll
 * lock, and a backdrop that was a plain div rather than something you could click or reach.
 * That made the booking flow, the treatment detail and the lightbox unusable with a keyboard.
 *
 * It also renders through a portal on `document.body`. Rendered inline, `fixed inset-0` is
 * defeated by any ancestor carrying a transform or filter — and framer-motion applies those
 * liberally — so the portal removes a whole class of "why is my modal clipped" bugs.
 *
 * Layout follows one strategy: the panel is a `max-h` flex column, and only the body scrolls.
 * The `items-center` + `my-auto` pattern used elsewhere makes the top of a tall panel
 * physically unreachable.
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  /** Accessible name. Rendered in the header unless `hideHeader` is set. */
  title: string
  /** Optional line under the title. */
  subtitle?: React.ReactNode
  children: React.ReactNode
  /** Sticky footer, outside the scrolling body. */
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** For media overlays that supply their own chrome; the title is then only for assistive tech. */
  hideHeader?: boolean
  /** Dark ground for lightboxes. */
  tone?: 'light' | 'dark'
}

const SIZES: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  hideHeader = false,
  tone = 'light',
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  // Remember what had focus so it can be handed back on close.
  useEffect(() => {
    if (isOpen) restoreFocusRef.current = document.activeElement as HTMLElement | null
  }, [isOpen])

  // Lock background scroll without the page jumping as the scrollbar disappears.
  useEffect(() => {
    if (!isOpen) return
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [isOpen])

  // Move focus into the dialog, and give it back on the way out.
  useEffect(() => {
    if (!isOpen) return
    const id = window.requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const first = panel.querySelector<HTMLElement>(FOCUSABLE)
      ;(first ?? panel).focus()
    })
    return () => {
      window.cancelAnimationFrame(id)
      restoreFocusRef.current?.focus?.()
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]

      // Focus can sit on the panel itself rather than on any of its focusable children — the
      // initial-focus fallback below does exactly that when a dialog has none, and clicking
      // plain text inside the panel delegates focus to it in Chrome and Safari. Without this
      // branch neither wrap point matches and the browser's own Tab order takes over, which is
      // how focus used to escape the dialog entirely.
      if (!items.includes(document.activeElement as HTMLElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  if (!isOpen) return null

  const dark = tone === 'dark'

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden p-4 sm:items-center sm:p-6"
      onKeyDown={handleKeyDown}
    >
      {/*
        The backdrop is deliberately NOT focusable.

        It used to be a <button>, on the reasoning that a reachable backdrop is better than a
        mystery div. That was wrong, and it broke the trap: the button is a sibling of the panel
        and precedes it in DOM order, but the wrap points below are computed from inside the
        panel, so it never appeared in that list. Whenever the panel itself held focus — which
        happens when a dialog has no focusable child, and in Chrome and Safari on any click on
        non-interactive content inside it — Shift+Tab matched neither wrap point, ran natively
        onto the backdrop, and a second Shift+Tab walked straight out into the page behind,
        while aria-modal kept claiming the dialog was closed off.

        Dismissal is already covered twice over, by Escape and by the labelled Close button, so
        the backdrop only needs to be a click target.
      */}
      <div
        aria-hidden="true"
        onMouseDown={onClose}
        className="absolute inset-0 bg-jacobean-950/60 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-panel outline-none
          ${SIZES[size]}
          ${dark ? 'bg-jacobean-900 text-lace shadow-panel' : 'bg-lace text-jacobean shadow-panel'}`}
      >
        {hideHeader ? (
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
        ) : (
          <header
            className={`flex shrink-0 items-start justify-between gap-4 border-b px-6 py-5
              ${dark ? 'border-lace/10' : 'border-oyster-300/70'}`}
          >
            <div className="min-w-0">
              <h2 id={titleId} className="u-title text-xl leading-tight sm:text-2xl">
                {title}
              </h2>
              {subtitle && (
                <p className={`mt-1 text-sm ${dark ? 'text-oyster-300' : 'text-jacobean/70'}`}>
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`-mr-2 -mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors
                ${dark ? 'text-oyster-300 hover:bg-lace/10 hover:text-lace' : 'text-jacobean/70 hover:bg-oyster-200 hover:text-jacobean'}`}
            >
              <X className="h-5 w-5" />
            </button>
          </header>
        )}

        {/* Only this scrolls, so the header and footer stay reachable at any viewport height. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>

        {footer && (
          <footer
            className={`shrink-0 border-t px-6 py-4
              ${dark ? 'border-lace/10 bg-jacobean-950/40' : 'border-oyster-300/70 bg-pearlBush/40'}`}
          >
            {footer}
          </footer>
        )}

        {hideHeader && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-jacobean-950/50 text-lace transition-colors hover:bg-jacobean-950/80"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}
