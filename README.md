# The Coco Club

Website for **The Coco Club** — a private nail studio and foot-care room at 14 La Motte Street,
Saint Helier, Jersey, run by Deoana Moreno.

React 18 · TypeScript · Vite · Tailwind CSS 3.4 · pnpm

```bash
corepack pnpm install
corepack pnpm run dev      # local development
corepack pnpm run build    # production build
corepack pnpm run preview  # serve the build
```

---

## Brand

The source of truth is the studio's own brand guide in [`Varios/`](Varios/).

**Do not trust the hex codes printed on that guide.** They are unedited Canva template
placeholders (`#FE630A`, `#FED101`, `#8C52FF`, `#00C9A7`) and match none of the swatches beside
them. The colours below were sampled from the swatch artwork itself and are the real palette:

| Role                | Name        | Hex       | Tailwind token  |
| ------------------- | ----------- | --------- | --------------- |
| Primary             | Khaki Green | `#85865A` | `khaki-500`     |
| Secondary           | Red Robin   | `#803A21` | `redRobin-700`  |
| Secondary           | Jacobean    | `#452319` | `jacobean-800`  |
| Complimentary       | Oyster      | `#D5C6B1` | `oyster-300`    |
| Complimentary       | Lace        | `#FDF8F2` | `lace`          |
| Complimentary       | Pearl Bush  | `#E9E2D2` | `pearlBush-200` |

There is **no gold** in this brand, and no Tailwind default palettes (amber, emerald, blue,
slate…). Full ramps are generated in OKLab so the lightness steps are perceptually even; the
measured contrast pairs are documented at the top of [`tailwind.config.js`](tailwind.config.js).

One rule worth repeating: `khaki-500` is 3.58:1 on lace — fine for headings, icons and borders,
never for body copy. Use `khaki-600` (5.24:1) or `khaki-700` (7.78:1) for text on light grounds.

### Typography

The guide names three faces. Caroline and Kalice are not web-licensed for this project, so each
has a close free stand-in that keeps its role:

| Role                | Guide          | Web            | Token          |
| ------------------- | -------------- | -------------- | -------------- |
| Titles              | Caroline       | Italiana       | `font-display` |
| Sub-heads & quotes  | Kalice Italic  | Fraunces *italic* | `font-serif` |
| Body — all copy     | Syne           | Syne           | `font-sans`    |

**Italiana never goes below 20px.** It is a deco titling face and its hairlines break up below
that; use `.u-title`, which carries the correct tracking. Fraunces is always italic, via
`.u-quote`. Syne carries everything else, including buttons, labels and prices.

### Logo and pattern

[`src/components/brand/BrandMarks.tsx`](src/components/brand/BrandMarks.tsx) holds the real
marks — the groovy script wordmark, the twin-swirl heart and the liquid-ribbon pattern — traced
from the brand guide into SVG paths that paint with `currentColor`. Static copies for
`og:image` and favicons live in [`public/brand/`](public/brand/).

Never typeset the brand name as text. Setting "THE COCO CLUB" in letterspaced Italiana caps is
the opposite of the logo's warm, rounded personality.

---

## Page architecture

Eight sections with deliberate subordination. Four carry the page; the rest are quieter on
purpose. Backgrounds alternate lace / pearl bush and break once into jacobean, so the page opens
warm, compresses into the dark band, opens again, then tightens toward the practicalities.

| # | Section          | Ground     | Role                                  |
| - | ---------------- | ---------- | ------------------------------------- |
| 1 | Hero             | lace       | the logo, one claim, one CTA          |
| 2 | The Studio       | pearl bush | **anchor** — the founder              |
| 3 | Treatments       | lace       | **anchor** — the menu                 |
| 4 | Foot Health      | jacobean   | **anchor** — the differentiator       |
| 5 | Treatment Finder | lace       | supporting                            |
| 6 | The Work         | pearl bush | **anchor** — Instagram                |
| 7 | Gift Vouchers    | lace       | side offer                            |
| 8 | Visiting         | pearl bush | address, hours, questions             |
|   | Footer           | jacobean   | closing anchor + studio portal        |

---

## Things that are true, and must stay true

This is a live site for a real trading business. Several rules exist because the previous
version broke them.

**There is no backend.** Nothing is stored on a server. A booking writes to the visitor's own
`localStorage` and composes a WhatsApp message; the studio only learns about a booking when the
client sends that message. All copy therefore says *request*, never *confirmed* or *booked*.
The previous version told clients their appointment "has been registered with Deoana Moreno"
when in fact nothing had reached the studio at all.

**No invented social proof.** No star ratings, review counts, Google ratings, "verified"
badges, client names, client photographs or "100% …" statistics. The previous version carried
six fabricated testimonials from named Jersey clients illustrated with Unsplash portraits of
strangers, plus a hardcoded 5.0 Google rating. Beyond the trust problem, fabricated reviews
engage the fake-review provisions of the UK Digital Markets, Competition and Consumers Act 2024.

**No protected titles.** "Chiropodist" and "podiatrist" are HCPC-protected. "Podology" is fine,
but avoid framing that implies regulated healthcare — no "medical", "clinical diagnosis",
"hospital-grade", no stethoscope iconography.

**No stock photography presented as the studio's work.** Every image on the old site was
hot-linked from Unsplash, and three "portfolio pieces" were the same photographs used elsewhere
as "before" shots of damaged nails and painful calluses. Visuals are composed from brand
material until real photography exists; the seams where photographs should drop in are marked
in the components.

**Tailwind is v3.** These class names emit no CSS and must not reappear: `shadow-xs`,
`shadow-2xs`, `backdrop-blur-xs`, `animate-in`, `fade-in`, `zoom-in-95`, `slide-in-from-*`,
`scale-98`, `scale-102`, `no-scrollbar`. The previous version used 74 of them across 20 files,
so the live page rendered flatter and more static than the source suggested.

**One dialog primitive.** [`src/components/ui/Modal.tsx`](src/components/ui/Modal.tsx) provides
the focus trap, Escape handling, scroll lock, focus restore, portal and height strategy. Do not
hand-roll another one.

---

## Open items for the studio owner

These need a decision from the business and have deliberately **not** been invented:

- **Cancellation policy.** No notice period, deposit or no-show rule has been set. See
  `needsOwnerInput` in [`src/data/policies.ts`](src/data/policies.ts).
- **Production domain.** `index.html` currently points `canonical`, `og:url` and the JSON-LD at
  `thecococlub.vercel.app`. The business trades as `.je` — whichever URL ships is the one Google
  indexes and WhatsApp previews.
- **Studio portal access.** The portal is client-side only. Its passcode gate keeps the panel out
  of casual sight; it is not authentication, and the booking data it shows lives unencrypted in
  the browser. Real protection needs a backend.
- **Real photography and real reviews**, to replace the marked brand-composition placeholders.
