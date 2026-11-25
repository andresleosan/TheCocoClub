---
version: alpha
name: The Coco Club
description: >-
  Design system for the website of The Coco Club, a private one-to-one nail studio and
  non-medical foot-care room in Saint Helier, Jersey. Warm, unhurried, honest. Every
  value below is taken from tailwind.config.js and src/index.css, which remain the
  implementation source of truth.
colors:
  primary: "#452319"
  on-primary: "#FDF8F2"
  primary-container: "#2F120A"
  secondary: "#85865A"
  secondary-text: "#50512D"
  secondary-strong: "#6A6B43"
  tertiary: "#803A21"
  on-tertiary: "#FDF8F2"
  neutral: "#FDF8F2"
  surface: "#FDF8F2"
  surface-container-low: "#F3EEE4"
  surface-container: "#E9E2D2"
  surface-container-high: "#D5C6B1"
  on-surface: "#452319"
  on-surface-variant: "#71534A"
  outline: "#968A78"
  outline-variant: "#D5C6B1"
  inverse-surface: "#452319"
  inverse-on-surface: "#FDF8F2"
  inverse-on-surface-variant: "#D5C6B1"
  inverse-secondary: "#B3B496"
  error: "#803A21"
  on-error: "#FDF8F2"
typography:
  display-xl:
    fontFamily: Italiana
    fontSize: 7rem
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: 0.06em
  display-lg:
    fontFamily: Italiana
    fontSize: 5.5rem
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: 0.06em
  display-md:
    fontFamily: Italiana
    fontSize: 4rem
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: 0.06em
  display-sm:
    fontFamily: Italiana
    fontSize: 2.75rem
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: 0.06em
  title-sm:
    fontFamily: Italiana
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.06em
  quote-lg:
    fontFamily: Fraunces
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.55
  quote-md:
    fontFamily: Fraunces
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
  body-lg:
    fontFamily: Syne
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Syne
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Syne
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  item-title:
    fontFamily: Syne
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.35
  price:
    fontFamily: Syne
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: '"tnum" 1, "lnum" 1'
  label-caps:
    fontFamily: Syne
    fontSize: 0.6875rem
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: 0.22em
  button:
    fontFamily: Syne
    fontSize: 0.8125rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.18em
rounded:
  none: 0px
  sm: 0.75rem
  md: 1.25rem
  lg: 1.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 56px
  section-sm: 56px
  section-md: 80px
  section-lg: 128px
  gutter-mobile: 20px
  gutter-desktop: 32px
  container: 80rem
  measure: 62ch
  tap-target: 44px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 24px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 24px
  button-inverse:
    backgroundColor: "{colors.inverse-on-surface}"
    textColor: "{colors.inverse-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 44px
    padding: 24px
  request-bar-mobile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 64px
    padding: 12px
  eyebrow:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary-text}"
    typography: "{typography.label-caps}"
  eyebrow-on-dark:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-secondary}"
    typography: "{typography.label-caps}"
  menu-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.item-title}"
    padding: 28px
  menu-row-meta:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-sm}"
  price:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.price}"
  fact-strip-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    padding: 24px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
  card-quiet:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 20px
  note-before-request:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 20px
  panel-dark:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    rounded: "{rounded.lg}"
    padding: 40px
  panel-dark-body:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface-variant}"
    typography: "{typography.body-sm}"
  badge:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.secondary-text}"
    rounded: "{rounded.full}"
    padding: 4px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    height: 44px
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    height: 44px
  step-current:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 24px
  step-done:
    backgroundColor: "{colors.secondary-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 24px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: 16px
  input-error-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  work-plate-red:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
  work-plate-khaki:
    backgroundColor: "{colors.secondary-strong}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  work-plate-oyster:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
  announcement-bar:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface-variant}"
    typography: "{typography.body-sm}"
    height: 40px
  footer:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface-variant}"
    typography: "{typography.body-sm}"
  toast:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
---

# The Coco Club — Design System

## Overview

The site is the studio's printed appointment card, made into a web page. Picture the brand
board itself: a warm lace-coloured card, the groovy chocolate-brown wordmark pressed into
it, a khaki band across the top that reads "The Art of Taking Care", and the cream liquid
ribbons running behind everything like a watermark. The website should feel like that
card held in the hand: calm, warm, unhurried and slightly old-fashioned in its courtesy.
It should never feel like a salon chain, a spa marketplace or a beauty app.

**Who it is for.** Adults in Jersey who want their nails done well, or whose feet have been
bothering them, and who prefer a private room and one technician to a busy salon floor.
Many arrive on a phone, from Instagram or a search, with one question: *what does it cost,
how long does it take, and how do I get an appointment?* The page answers those three in
that order, then earns trust, then gets out of the way.

**What the business really is, and what the design must never pretend.**

- One room, one technician (Deoana Moreno), one client at a time, by appointment, at
  14 La Motte Street, Saint Helier.
- There is no booking system. Choosing a time composes a WhatsApp message; the studio
  replies to confirm. Every action is therefore a **request**, never a booking.
- There is no real photography of the studio's work yet, and there are no published reviews.
  The design is built to look complete without either. Nothing is faked to fill the gap.
- Foot care is skilled, unhurried and **non-medical**. It is never presented as healthcare.

**Calibration** (on the 1–10 scales used by Stitch's taste skill):

- Density 4, "daily app balanced": a full, readable price list; never cramped, never empty.
- Variance 5, "offset but composed": the hero is centred around the wordmark; every section
  after it is left-aligned or split asymmetrically.
- Motion 3, "static and restrained": colour and position transitions only; one slow drift on
  the decorative ribbons; nothing that loops for attention.

**Brand line.** "The Art of Taking Care" is the primary tagline and appears once, in the
hero. "Expert hands, latin heart" is the second voice and opens the studio section. Never
stack both in the same block.

**Source of truth.** The brand guide images (`Varios/BrandQuickGuide.jpeg`,
`Varios/TheCocoClub.jpeg`, `Varios/IG.jpeg`) define the identity. The hex, RGB and CMYK codes
*printed* on the guide are unedited template placeholders (#FE630A, #FED101, #8C52FF,
#00C9A7) and are wrong; the colours below were sampled from the swatches themselves and
re-checked against the guide. The second board's type labels ("Libre Baskerville", "Filson
Pro") and the Instagram mock-up's bio and follower numbers are template leftovers too:
ignore them.

## Colors

The palette is the studio's own six colours: three deep earth tones and three warm creams.
There is no gold, no black, no grey and no Tailwind default palette anywhere.

| Brand name  | Hex       | Role in this system |
| ----------- | --------- | ------------------- |
| Jacobean    | `#452319` | **Primary.** All text, every primary action, dark bands. |
| Khaki Green | `#85865A` | **Secondary.** The brand's signature colour: logomark, icons, rules, large accents. Never body text. |
| Red Robin   | `#803A21` | **Tertiary.** Hover and pressed states, focus ring, quotes in the second voice, inline errors. |
| Lace        | `#FDF8F2` | **Neutral.** The page ground and the text colour on dark grounds. |
| Pearl Bush  | `#E9E2D2` | Alternate section ground and quiet cards. |
| Oyster      | `#D5C6B1` | Hairlines, card borders, chips, body text on dark grounds. |

The guide calls Khaki Green its "primary colour". In this system **Jacobean** carries the
`primary` token because it is the colour of every action and every line of text; Khaki keeps
its place as the colour people remember (the heart mark, the rules, the checkmarks).

**Text tokens are solid colours, not opacities.** The code currently uses `text-jacobean/70`
for secondary copy; on a full Pearl Bush ground that blend falls to 4.29:1 and fails AA.
Use **On-surface variant `#71534A`** for secondary text instead: 6.54:1 on Lace, 5.36:1 on
Pearl Bush.

**Measured contrast** (WCAG 2.x, against the two grounds):

- Jacobean on Lace 13.19, on Pearl Bush 10.80. Lace on Jacobean 13.19.
- Red Robin on Lace 7.81, on Pearl Bush 6.39. Lace on Red Robin 7.81.
- Khaki 700 `#50512D` on Lace 7.78, on Pearl Bush 6.37 — eyebrows and small labels.
- Khaki 600 `#6A6B43` on Lace 5.24 — the lightest khaki allowed for text, on Lace only
  (4.29 on Pearl Bush: fails). Lace on Khaki 600 is 5.24.
- Khaki 500 `#85865A` on Lace **3.58** — headings 24px and larger, icons and borders only.
- Oyster `#D5C6B1` on Jacobean 8.32; Oyster 400 `#B5A794` on Jacobean 5.92 (the lightest
  oyster allowed for text on dark); Khaki 300 `#B3B496` on Jacobean 6.56 (eyebrows on dark).
- Oyster 500 `#968A78` on Lace 3.21 — UI boundaries only (field borders, step outlines).

**Ground sequence.** Sections alternate Lace and Pearl Bush, and the page breaks into
Jacobean exactly twice: the foot-care band and the footer. A third dark band dilutes both.

**Full ramps** live in `tailwind.config.js` (OKLab-generated so lightness steps are even).
Each brand colour sits on the step that matches its own lightness: khaki 500, redRobin 700,
jacobean 800, oyster 300, pearlBush 200, lace 50.

## Typography

Three faces, each with one job. Hierarchy comes from face and weight, not from size alone.

- **Display — Italiana** (stand-in for the guide's "Caroline Regular"). A deco titling face
  with a flat-apex A and hairline contrast. Uppercase, tracked `0.06em`, single weight 400.
  Section titles and the hero tagline only. **Never below 20px**: its hairlines break up.
  Never bold (the browser would synthesise a weight and smear the hairlines).
- **Second voice — Fraunces, always italic** (stand-in for "Kalice Italic"). Warm, slightly
  bookish. Pull quotes, the founder's name, one-line sub-headings under a title, the line
  that answers a heading. One italic line per section at most.
- **Everything else — Syne** (the guide's real body face). Body copy, treatment names,
  prices, buttons, labels, forms, navigation. Syne has a large x-height and tight defaults,
  so body text gets generous leading (1.65).

**Scale.** Display sizes are fluid with `clamp()`; the YAML tokens record each step's
desktop maximum:

| Token        | Mobile → desktop                 | Use |
| ------------ | -------------------------------- | --- |
| `display-xl` | `clamp(3.25rem, 1.5rem + 7vw, 7rem)`   | Reserved (not used in the current build). |
| `display-lg` | `clamp(2.75rem, 1.5rem + 5.2vw, 5.5rem)` | Reserved. |
| `display-md` | `clamp(2.25rem, 1.4rem + 3.6vw, 4rem)`  | The studio section title. |
| `display-sm` | `clamp(1.75rem, 1.25rem + 2.2vw, 2.75rem)` | Every other section title. |
| `title-sm`   | 20–24px                           | Italiana sub-titles inside sections. |
| `body-lg`    | 18px                              | Ledes, max 62ch. |
| `body-md`    | 16px                              | Default body. |
| `body-sm`    | 14px                              | Row descriptions, helper text. Nothing smaller for sentences. |
| `label-caps` | 11px, semibold, uppercase, 0.22em | Eyebrows and form labels. Four words at most. |
| `button`     | 13px, semibold, uppercase, 0.18em | Button labels. |
| `price`      | 18px, semibold, tabular lining figures | Prices and durations. |

**Rules.**

- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Body measure ≤ 62ch.
- Treatment names are set in Syne, sentence case. A titling face cannot set a
  fourteen-word treatment name.
- Prices and durations always use tabular, lining figures so a column of prices aligns and
  a "1" never reads as an "I".
- British English, 24-hour times (09:00 – 18:00), whole pounds without pence (£55), and
  durations as "1h 15m", "1 hr", "50 min".
- Never typeset the brand name as text. "The Coco Club" in letterspaced Italiana capitals is
  the opposite of the logo's warm, rounded script; use the SVG wordmark.

**If a design tool cannot load these fonts.** Syne is available in Google Stitch's font
list; Italiana and Fraunces are not, and Stitch may substitute them. When generating
screens in Stitch, keep the roles and choose the nearest available face: **Bodoni Moda**
(uppercase, tracked, regular weight) for the display role and **Newsreader italic** for the
second voice. These substitutes are for mock-ups only. The production site keeps Italiana
and Fraunces.

## Layout

**Container.** Content sits in a centred container of max 80rem (1280px) with 20px side
gutters on phones, 24px on small tablets and 32px from 1024px up. Long-form text never runs
wider than 62ch, even inside a wide container.

**Grid.** A 12-column CSS grid from 1024px. Typical splits: 5/7 (portrait or statement left,
story right), 7/5 (title left, answering line right), and a fixed text column against a
fluid one for the menu header (`minmax(0, 24rem) minmax(0, 1fr)`). Below 1024px every split
collapses to one column, in reading order. There is no horizontal page scroll at any width
down to 320px.

**Spacing.** A 4px base. Section padding is 80px / 96px / 128px (mobile / tablet / desktop)
for full sections and 56px / 64px / 80px for short connective ones. Inside a section, 40px
between a header block and its content on mobile, 56–80px on desktop.

**Page architecture.** One page with anchors. Four sections carry it and the rest are
deliberately quieter:

| # | Section          | Ground     | Role |
| - | ---------------- | ---------- | ---- |
| 1 | Hero             | Lace       | Wordmark, one claim, one action, three facts. |
| 2 | The studio       | Pearl Bush | **Anchor** — the founder and how the room works. |
| 3 | Treatments       | Lace       | **Anchor** — the full menu with prices and times. |
| 4 | Foot care        | Jacobean   | **Anchor** — the differentiator, with its scope stated. |
| 5 | Treatment finder | Lace       | Supporting — "not sure what to choose?". |
| 6 | The work         | Pearl Bush | **Anchor** — points honestly to Instagram. |
| 7 | Gift vouchers    | Lace       | Side offer. |
| 8 | Visiting         | Pearl Bush | Address, hours, how a request works, questions. |
|   | Footer           | Jacobean   | Closing action, contact, studio portal. |

**Hero.** Centred on the wordmark: the logomark, the wordmark (as the h1), the tagline in
Italiana, a short rule with the heart, a two-sentence lede that names the place and the
one-client-at-a-time promise, then one primary action and one quiet text link. Directly
under it, a three-cell **fact strip** (one at a time / 30+ years / Saint Helier). This is
the only centred section. No photograph, no slideshow, no video.

**Persistent action.** The sticky header always carries the request button (short label
on phones). On phones a slim bottom request bar may appear after the hero and must hide
while the request form or another request button is on screen. There is never a floating
chat bubble.

**Responsive rules.** Phone-first. Touch targets at least 44×44px. Body text never below
14px. Display sizes scale with `clamp()`. Navigation switches between the desktop row and
the drawer at the same breakpoint (1024px), so no width is left without navigation.

## Elevation & Depth

Depth comes from **tonal bands and hairlines first**, warm shadows second.

- Sections separate by ground colour (Lace ↔ Pearl Bush ↔ Jacobean), never by a shadow.
- Lists separate by 1px Oyster hairlines (`#D5C6B1` at 50–70%). The menu, the studio's four
  promises and the FAQ are ruled lists, not grids of cards.
- Cards are used only where something is genuinely a separate object (a form, a voucher, a
  dialog, the fact strip). They sit on Lace with a 1px Oyster border and the `card` shadow.
- All shadows are tinted with Jacobean, never neutral grey:
  - `card` — `0 1px 2px rgba(69,35,25,.04), 0 8px 24px -12px rgba(69,35,25,.16)`
  - `lift` — `0 2px 4px rgba(69,35,25,.05), 0 18px 40px -18px rgba(69,35,25,.28)`
  - `panel` — `0 30px 70px -30px rgba(69,35,25,.40)` (dialogs and the dark portrait panel)
- On dark bands, depth is a 1px Lace line at 15% and a one-step-darker fill
  (Jacobean 900, `#2F120A`, at 40%). No shadows on dark.

## Shapes

The shape language follows the logo: soft and rounded, never sharp, never bubbly.

- **Pills** (`full`) for every button, chip, badge and step marker.
- **Cards** (`md`, 1.25rem / 20px) for cards, menu groups that need a frame, and the
  fact strip.
- **Panels** (`lg`, 1.75rem / 28px) for dialogs, the dark portrait panel and the voucher card.
- **Fields** (`sm`, 0.75rem / 12px) for inputs, selects and text areas.
- **Brand ornaments** come from the brand guide only: the twin-swirl heart (Logomark), the
  liquid ribbons (BrandRibbons) and a short rule with the heart at its centre (RuleWithMark).
  All are SVG and paint with `currentColor`. Ribbons bleed off a section's edge at low
  contrast (Pearl Bush on Lace, Jacobean 700 on Jacobean), never sit behind body copy or a
  price, and never take pointer events.

## Motion & Micro-interaction

Motion is a courtesy, not a show.

- **State changes** (hover, press, toggle, accordion chevron): 200ms, standard ease-out,
  `transform` and `opacity` and colour only. Buttons move 1px down on press. Arrows nudge
  2px to the right on hover.
- **Surfaces entering** (dialog, drawer, toast): a single 500ms fade-up of 12px with
  `cubic-bezier(0.16, 1, 0.3, 1)`. Nothing staggers more than three items.
- **Ambient**: the ribbons may drift once every 18s (translate 2%, scale 1.04). This is the
  only infinite animation on the page.
- `prefers-reduced-motion: reduce` collapses every duration to zero and stops the drift.
- No scroll-jacking, no parallax, no marquees, no auto-advancing carousels, no confetti.
  Never animate `top`, `left`, `width` or `height`.

## Voice & Content Strategy

The copy is written in British English, in a warm, plain, first-person-plural-or-singular
studio voice. It describes what actually happens in the room. Short sentences, concrete
nouns, no superlatives.

**The request vocabulary (mandatory).**

- Action labels: "Request an appointment", "Request" (short form, on phones and menu rows),
  "Send my request on WhatsApp", "Ask on WhatsApp", "Ask about a £75 voucher".
- Status words: "request", "ready to send", "awaiting confirmation". The studio
  "replies to confirm".
- Never "Book now", "Booked", "Confirmed", "Your appointment is secured" or anything that
  implies the site holds a slot. (The current build still says "Book an appointment" in
  the header, hero and footer; move those to the request wording.)
- Next to every request action, one line says what happens: it opens WhatsApp with the
  message already written, nothing is held until the studio replies, and when replies
  usually come. Only publish a reply time the studio has agreed.

**Treatment names.** Plain name first, the term people search for in it: "Builder gel
(BIAB) overlay", "Russian dry manicure", "Sculpted extensions". House names, if any, come
second. One name per treatment everywhere (menu, form, WhatsApp message, structured data).

**Foot-care language.** Describe what is done, never what is treated or cured: hard skin
reduced, cracked heels smoothed, thickened nails reduced and reshaped, a catching corner
eased. Name the client's concern, not a clinical procedure. Always say that the studio is
not a healthcare provider and does not diagnose, and when to see a GP or podiatrist instead
(diabetes, poor circulation, infection, pain that does not ease).

**Proof.** Only checkable facts: one client at a time, the years of practice the studio
states, how tools are cleaned and what is single-use, the products used. No ratings, no
review counts, no "verified" badges, no client names, no "100%" statistics, no press logos,
no testimonials until real, permitted ones exist (then quoted with their source and date).

**Numbers.** Prices in whole pounds (£55); "from £X" only when the typical simple
appointment really costs £X; durations on every treatment; dates as "Saturday, 12 September
2026"; times in 24-hour format.

**Empty and pending states.** Owner decisions that do not exist yet (cancellation notice,
deposit, reply time) are left out or phrased as "message the studio", never invented.

## Components

**Buttons.** Three variants, one size, one label style (Syne 13px, uppercase, 0.18em
tracking), pill shape, at least 44px tall, 24px horizontal padding.

- *Primary* — Jacobean fill, Lace text. Hover to Red Robin, press moves 1px down. Exactly
  one primary per view; it is always the request action.
- *Secondary* — transparent with a 1px Jacobean border at 25% (50% on hover), Jacobean text.
- *Inverse* — Lace fill, Jacobean text, for use on dark bands.
- Quiet alternatives (WhatsApp question, Instagram) are underlined text links with an icon,
  44px tall, never a second filled button.

**Request bar (phones only).** A 64px Lace bar fixed to the bottom with a hairline top
border: on the left the context ("From £45 · 1 hr" or the current selection), on the right
one primary "Request" button. Appears after the hero, hides when a request form or another
request button is in view, never covers the focused element.

**Fact strip.** Three to four cells in one bordered card with 1px internal dividers. Each
cell: a short fact in Syne semibold, a one-line detail underneath. Facts only, never
statistics or ratings. Collapses to a stack on phones.

**Menu row (the heart of the site).** A ruled list, no cards, no images:

1. Treatment name (Syne 18px semibold), opening the detail dialog. An optional fact badge
   ("Natural nails only") — a fact, never a compliment or a popularity claim.
2. One plain sentence: what it is and who it suits.
3. Right column (left-aligned under the text on phones): price (tabular, 18px semibold),
   duration with a small clock icon, and a secondary "Request" button whose accessible
   name includes the treatment name.

Rows are grouped under small-caps headings in a fixed order: BIAB and natural nails,
sculpted extensions, pedicures and foot care, nail art, restorative rituals. Above the
first group sits one **note** saying what every price includes and how removal of another
salon's product, repairs and nail art are charged. Under the list sits one primary
request button and a link to the treatment finder.

**Treatment detail (dialog).** Name, "£55 · 1h 15m", a short paragraph in the order
*what is done → why it helps → what it is not → how long it lasts*, an "included" list with
khaki checkmarks, an "often added" box with prices, and a footer with the primary request
action plus a quiet "Ask about this treatment" link.

**How a request works.** Three numbered steps on one line on desktop, stacked on phones:
choose a treatment and a time; send the message on WhatsApp; the studio replies to
confirm. Numerals in Italiana (20px or more), step text in Syne. Placed beside the request
form and in the Visiting section.

**Note before request.** A Pearl Bush-50 box with a small-caps label and three to five
short headed lines: how confirmation works, reply time, cancellation and lateness (once the
studio has set them), what to bring or mention (health conditions), access. It always sits
directly above a send button.

**Foot-care scope note.** On the dark band and in the detail dialog: what the service
covers, what it does not (no diagnosis, no medical treatment), and when to see a GP or
podiatrist first. Same weight as the body copy, never fine print.

**Hygiene block.** Four short numbered steps in plain words (cleaned, sterilised, single-use
items used once, opened in front of you), set on a quiet card or on the dark band. Only
steps the studio really follows.

**Booking dialog.** One dialog primitive for everything (focus trap, Escape, scroll lock,
focus restore). Header: Italiana title, one-line subtitle. A sticky step indicator with
three labelled steps (treatment, day & time, details): current step Jacobean, done steps
Khaki 600 with a check, future steps outlined in Oyster 500. A sticky footer shows the
running price and duration and the Back / Continue buttons. The last screen shows the
composed message, the reference, "Awaiting confirmation" and a large "Send my request on
WhatsApp" button.

**Form fields.** Label above the field (label-caps), Lace field with a 1px Oyster 500
border (`#968A78`, 3.21:1, so the field boundary meets the 3:1 rule for UI components),
12px radius, at least 48px tall, Khaki focus ring at 25% plus the global Red Robin focus
outline for keyboard users. Placeholder is an example, never the label. Optional fields say
"(optional)". Errors appear below the field in Red Robin with an icon, and the field border
turns Red Robin. Radio choices are full-width cards with the selected state in Jacobean.

**Chips.** Pill, 44px tall, Oyster border; selected chips fill Jacobean with Lace text.

**FAQ.** An accordion of hairline rows built on `details`/`summary`, each with a small-caps
topic label above the question, first row open, answers starting with the direct answer.

**Work plates (until real photographs exist).** Square tiles in brand colours, each with a
small-caps group label and the name of what the studio makes; the sixth tile holds the
logomark. When real photographs arrive they drop into the same tiles with a Jacobean scrim
for the label.

**Voucher card.** A Jacobean panel with the wordmark, the amount in Italiana, the
recipient's name in Fraunces italic and the studio address; a live preview of the form
beside it.

**Announcement bar.** Jacobean, 40px, hidden on phones: live open/closed status computed
from the opening hours, the time in Jersey, the address as a map link, the phone number as
a `tel:` link. Facts only, no taglines.

**Toast.** Jacobean 900 (`#2F120A`) with Lace text, top of the screen on phones and
bottom-right on desktop; says what is ready and what to do next ("Request CC-2026-K89SK ready — send it to the studio on WhatsApp.").

**Focus.** Every interactive element shows a 2px Red Robin outline with a 3px offset.

## Do's and Don'ts

- **Do** answer *price, time, how to request* before anything else on the page.
- **Do** put a price and a duration on every treatment, in HTML, on the page.
- **Do** call every action a request and say what happens next beside it.
- **Do** build trust from checkable facts: one client at a time, years of practice, how
  tools are cleaned, what is single-use.
- **Do** make sections work with type, colour fields, hairlines and the brand ornaments.
- **Do** keep one name, one price and one duration per treatment in one data file
  (`src/data/services.ts`) and render every surface from it.
- **Do** keep the hero centred on the wordmark and every later section left-aligned or split.
- **Don't** say "book", "booked" or "confirmed" for anything the site does.
- **Don't** add star ratings, review counts, testimonials, "loved by" lines, press logos,
  award badges or statistics that the studio cannot evidence.
- **Don't** use stock or AI-generated photographs of hands, feet or interiors, or present
  any image as the studio's work unless it is.
- **Don't** use "chiropodist", "podiatrist", "chiropody", "podiatry", "medical", "clinical",
  "hospital-grade", "treat", "cure" or stethoscope and cross icons for foot care.
- **Don't** use gold, black, grey, neon, gradients on text, glassmorphism or glows. The six
  brand colours are the whole palette.
- **Don't** set Italiana below 20px, in bold, or for treatment names or body copy.
- **Don't** put Khaki 500 text on Lace below 24px, or Lace text on Khaki 500 at all.
- **Don't** use opacity for text colour on Pearl Bush; use the solid `on-surface-variant`.
- **Don't** hide prices in PDFs, behind tabs, or behind an external booking link.
- **Don't** add a floating WhatsApp bubble, a chat widget, a pop-up or a discount banner.
- **Don't** add a second dialog component, a carousel, a marquee or an autoplaying video.
- **Don't** use emojis anywhere in the interface.
