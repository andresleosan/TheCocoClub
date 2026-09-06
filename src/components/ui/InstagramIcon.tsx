import React from 'react'

/**
 * Instagram is the studio's only real portfolio, so its mark appears in three places. It is
 * drawn here rather than pulled from a brand-icon pack, on the same 24-unit grid and 2px
 * stroke as the lucide set — sat next to those icons, a different weight reads as a mistake.
 *
 * Always decorative: every use is inside a link that already names Instagram, so announcing
 * the glyph as well would only repeat the label.
 */
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
