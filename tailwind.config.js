/**
 * The Coco Club — design tokens.
 *
 * Colours are the studio's real brand palette, sampled directly from the swatches in
 * Varios/BrandQuickGuide.jpeg. The hex/RGB/CMYK codes PRINTED on that guide are unedited
 * Canva template placeholders (#FE630A, #FED101, #8C52FF, #00C9A7) and are wrong — the
 * swatches themselves are the source of truth:
 *
 *   Khaki Green  #85865A   primary
 *   Red Robin    #803A21   secondary
 *   Jacobean     #452319   secondary
 *   Oyster       #D5C6B1   complimentary
 *   Lace         #FDF8F2   complimentary
 *   Pearl Bush   #E9E2D2   complimentary
 *
 * Each ramp is generated in OKLab so lightness steps are perceptually even, and each brand
 * colour sits on the step matching its own lightness (khaki 500, redRobin 700, jacobean 800,
 * oyster 300, pearlBush 200, lace 50). There is deliberately no gold, amber or emerald here —
 * they are not part of this brand.
 *
 * Contrast, measured against the two page grounds (lace #FDF8F2 and jacobean #452319):
 *   jacobean on lace ......... 13.19  AAA
 *   redRobin (700) on lace .... 7.81  AAA
 *   khaki-700 on lace ......... 7.78  AAA
 *   khaki-600 on lace ......... 5.24  AA      <- lightest khaki safe for body copy
 *   khaki-500 on lace ......... 3.58  AA-large only — headings, borders, icons; never body text
 *   lace on jacobean ......... 13.19  AAA
 *   oyster-300 on jacobean .... 8.32  AAA
 *   oyster-400 on jacobean .... 5.92  AA      <- lightest oyster safe for body copy on dark
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        khaki: {
          DEFAULT: '#85865A',
          50: '#FBFCF4',
          100: '#E3E3D4',
          200: '#CACBB4',
          300: '#B3B496',
          400: '#9B9D78',
          500: '#85865A',
          600: '#6A6B43',
          700: '#50512D',
          800: '#383817',
          900: '#212103',
        },
        redRobin: {
          DEFAULT: '#803A21',
          50: '#FFF8F3',
          100: '#F3DBD3',
          200: '#E0BFB4',
          300: '#CEA495',
          400: '#BB8977',
          500: '#A76E5B',
          600: '#94543E',
          700: '#803A21',
          800: '#5F220B',
          900: '#400B00',
        },
        jacobean: {
          DEFAULT: '#452319',
          50: '#FFF9F7',
          100: '#E8DCD8',
          200: '#CFBFBA',
          300: '#B7A29C',
          400: '#9F8780',
          500: '#886D64',
          600: '#71534A',
          700: '#5B3A31',
          800: '#452319',
          900: '#2F120A',
          950: '#1A0401',
        },
        oyster: {
          DEFAULT: '#D5C6B1',
          50: '#FEFBF6',
          100: '#F0E9DF',
          200: '#E2D7C8',
          300: '#D5C6B1',
          400: '#B5A794',
          500: '#968A78',
          600: '#786D5D',
          700: '#5C5243',
        },
        pearlBush: {
          DEFAULT: '#E9E2D2',
          50: '#FDFBF7',
          100: '#F3EEE4',
          200: '#E9E2D2',
          300: '#CAC3B4',
          400: '#ABA597',
        },
        lace: {
          DEFAULT: '#FDF8F2',
          50: '#FDF8F2',
          100: '#F7F1E9',
        },
      },

      /**
       * The guide names three faces. Caroline and Kalice are not web-licensed here, so each
       * has a close free stand-in that keeps its role and personality:
       *   display — "Caroline Regular" -> Italiana. Deco titling caps, flat-apex A, hairline
       *             contrast. Headings and titles only.
       *   serif   — "Kalice Italic"    -> Fraunces. Warm, slightly wonky bookish serif; the
       *             brand always sets this face in italic, so pair it with `italic`.
       *   sans    — "Syne"             -> Syne. This is the BODY face for all generic copy,
       *             not a fallback.
       * Nothing here is Bodoni Moda, Libre Baskerville, Pinyon Script or Plus Jakarta Sans —
       * those were never part of the brand.
       */
      fontFamily: {
        display: ['Italiana', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Syne', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },

      /**
       * Fluid type scale. Display sizes are set in the browser's own clamp so headings breathe
       * on desktop without overflowing a 320px phone.
       *
       * These carry line-height but deliberately NOT letter-spacing. A fontSize tuple emits a
       * `letter-spacing` in the utilities layer, which outranks `.u-title` in the components
       * layer — so a baked-in value silently overrode the titling tracking, and only the two
       * headings whose authors happened to notice restated `tracking-title` by hand. Tracking
       * for the display face belongs to `.u-title`, in one place.
       */
      fontSize: {
        'display-sm': ['clamp(1.75rem, 1.25rem + 2.2vw, 2.75rem)', { lineHeight: '1.08' }],
        'display-md': ['clamp(2.25rem, 1.4rem + 3.6vw, 4rem)', { lineHeight: '1.04' }],
        'display-lg': ['clamp(2.75rem, 1.5rem + 5.2vw, 5.5rem)', { lineHeight: '0.98' }],
        'display-xl': ['clamp(3.25rem, 1.5rem + 7vw, 7rem)', { lineHeight: '0.94' }],
      },

      letterSpacing: {
        /** Deco titling caps need air. Only ever on short strings. */
        title: '0.06em',
        eyebrow: '0.22em',
        mark: '0.34em',
      },

      borderRadius: {
        /** One radius scale, so cards, buttons and media stop disagreeing. */
        card: '1.25rem',
        panel: '1.75rem',
      },

      boxShadow: {
        /** Warm shadows — neutral grey shadows read cold against this palette. */
        card: '0 1px 2px rgba(69, 35, 25, 0.04), 0 8px 24px -12px rgba(69, 35, 25, 0.16)',
        lift: '0 2px 4px rgba(69, 35, 25, 0.05), 0 18px 40px -18px rgba(69, 35, 25, 0.28)',
        panel: '0 30px 70px -30px rgba(69, 35, 25, 0.4)',
      },

      maxWidth: {
        prose: '62ch',
      },

      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee 40s linear infinite',
      },

      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-2%, -1.5%, 0) scale(1.04)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
