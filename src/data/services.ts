import { ServiceCategory, ServiceItem, ServiceAddOn } from '../types'

/**
 * The menu. This file is the price list, so it is the file most likely to be read out loud
 * to a client — every number in it has to be the number they will actually pay.
 *
 * Three things were fixed here rather than restyled:
 *
 * 1. PRICE. The old foot-care section advertised £85 while the booking flow charged £65 for
 *    the same appointment. £65 is the figure the booker, the WhatsApp message and the demo
 *    rows have always used, so £65 is the price. There is now exactly one number per
 *    treatment and no component may print a different one.
 * 2. IMAGES. Every service carried an `imageUrl` pointing at Unsplash — stock photography of
 *    other people's hands, shown as this studio's work. The field is gone from the type.
 * 3. REVIEWS. `rating` and `reviewCount` were invented numbers on a real trading business.
 *    Gone too. If a treatment deserves a badge it gets a fact, not a compliment.
 *
 * On the wording of the foot-care entries: "chiropodist" and "podiatrist" are protected
 * titles in Jersey and the UK. Deoana is neither, and the previous copy — "medical-grade",
 * "clinical", "safely treat" — borrowed the authority of both. What she actually does is
 * skilled, unhurried, thirty-years-practised foot care, and saying that plainly sells it
 * perfectly well.
 *
 * Service ids are deliberately unchanged, including 'srv-medical-podology'. They are the key
 * that links a stored booking in a client's browser to the menu; renaming one silently
 * orphans every request already sitting in someone's localStorage. Ids are never rendered.
 */

/**
 * The category vocabulary, for anything that needs to name a group — a filter, a chip row, a
 * WhatsApp enquiry. The Treatments section deliberately typesets its own headings so it can
 * order and word them for the page, so treat this as the shared naming, not the page copy.
 */
export const SERVICE_CATEGORIES: { id: ServiceCategory; name: string; description: string }[] = [
  {
    id: 'all',
    name: 'Everything',
    description: 'Nails and foot care, one client at a time',
  },
  {
    id: 'signature-biab',
    name: 'BIAB & Natural Nails',
    description: 'Builder gel overlays and dry Russian manicures',
  },
  {
    id: 'sculpted-extensions',
    name: 'Sculpted Extensions',
    description: 'Length built on forms — shape, curve and structure',
  },
  {
    id: 'podology-care',
    name: 'Podology & Pedicures',
    description: 'Thirty years of unhurried, expert foot care',
  },
  {
    id: 'haute-nail-art',
    name: 'Nail Art & Finishes',
    description: 'Hand-painted detail, chrome glazes and 3D work',
  },
  {
    id: 'spa-rituals',
    name: 'Restorative Rituals',
    description: 'Keratin repair and warm paraffin for tired hands',
  },
]

/**
 * Add-ons are priced and timed independently and simply added to the appointment, which is
 * why the booking summary can total them without any special cases.
 */
export const SERVICE_ADDONS: ServiceAddOn[] = [
  {
    id: 'addon-paraffin',
    name: 'Warm Lavender Paraffin Wrap',
    price: 12,
    durationMinutes: 15,
    description: 'Deep warmth for hands or feet. The skin comes out noticeably softer.',
  },
  {
    id: 'addon-ibx',
    name: 'IBX Keratin Repair',
    price: 15,
    durationMinutes: 15,
    description: 'Warmed into the nail plate to bind peeling layers back together.',
  },
  {
    id: 'addon-chrome',
    name: 'Chrome or Pearl Glaze',
    price: 10,
    durationMinutes: 10,
    description: 'A glazed pearl, soft metallic or rose chrome finish over your colour.',
  },
  {
    id: 'addon-french',
    name: 'Hand-Painted French Tips',
    price: 12,
    durationMinutes: 15,
    description: 'Classic, micro or deep-curved smile lines, drawn to suit your nail shape.',
  },
  {
    id: 'addon-nailart-tier1',
    name: 'Accent Nail Art (two nails)',
    price: 10,
    durationMinutes: 15,
    description: 'Fine line work, foil or a single stone placed on two nails.',
  },
  {
    id: 'addon-nailart-tier2',
    name: 'Full Set Nail Art (ten nails)',
    price: 28,
    durationMinutes: 30,
    description: 'Sculpted 3D detail, marbling or tortoiseshell across all ten nails.',
  },
  {
    id: 'addon-callus-peel',
    name: 'Callus Softening Treatment',
    price: 15,
    durationMinutes: 15,
    description: 'An active gel that softens stubborn hard skin before it is worked back.',
  },
]

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-biab-signature',
    name: 'Signature BIAB Overlay',
    category: 'signature-biab',
    price: 55,
    durationMinutes: 75,
    shortDescription:
      'A builder-gel overlay on your own nails, over a dry Russian manicure. No extensions, no soaking.',
    fullDescription:
      'The appointment most people come back for. The nail is prepped dry, the cuticle worked with an e-file, then builder gel is placed to give the nail an apex it does not have on its own — which is what stops it bending and splitting. Finished in a gloss colour or a sheer nude. It grows out with the nail instead of sitting on top of it.',
    badge: 'Natural nails only',
    popular: true,
    included: [
      'Dry Russian cuticle work, no soaking',
      'Builder gel apex, shaped for strength',
      'Gel colour or a sheer nude finish',
      'Cuticle oil and a hand massage',
    ],
    recommendedAddons: ['addon-french', 'addon-chrome', 'addon-paraffin'],
  },
  {
    id: 'srv-russian-manicure',
    name: 'Russian Dry Manicure',
    category: 'signature-biab',
    price: 45,
    durationMinutes: 60,
    shortDescription:
      'Diamond-bit cuticle work, shaping, and gel polish laid right up to the skin.',
    fullDescription:
      'No water and no soaking. The cuticle is cleared with a diamond bit so the polish can sit flush against the skin, which is why the regrowth line takes so much longer to show. It is slow, close work, and it is how Deoana has worked for most of thirty years.',
    included: [
      'Diamond-bit cuticle work, no soaking',
      'Shaping and symmetry, nail by nail',
      'Gel polish flush to the cuticle',
      'Nourishing serum and a hot towel',
    ],
    recommendedAddons: ['addon-ibx', 'addon-paraffin'],
  },
  {
    id: 'srv-acrylic-fullset',
    name: 'Sculpted Acrylic Extensions',
    category: 'sculpted-extensions',
    price: 75,
    durationMinutes: 105,
    shortDescription:
      'Length sculpted on forms — never glued plastic tips — in the shape and curve you choose.',
    fullDescription:
      'Built on forms rather than tips, so the arch follows your own nail bed instead of fighting it. Lighter than it looks and strong where the stress actually falls. Almond, coffin, stiletto or square, finished in gel and filed by hand.',
    popular: true,
    included: [
      'Dry prep and nail plate cleaning',
      'Acrylic sculpted on forms, not tips',
      'Hand filing and apex balancing',
      'Gloss gel finish and cuticle oil',
    ],
    recommendedAddons: ['addon-nailart-tier2', 'addon-chrome'],
  },
  {
    id: 'srv-ombre-babyboomer',
    name: 'French Ombré / Babyboomer Set',
    category: 'sculpted-extensions',
    price: 85,
    durationMinutes: 120,
    shortDescription:
      'A blush-to-white fade blended inside the product rather than painted over the top.',
    fullDescription:
      'The gradient is built with cover pink and porcelain white while the nail is being sculpted, so it lives inside the structure and there is no join to chip away. Available over your natural nails or on extensions, sealed with a glass-smooth topcoat.',
    included: [
      'Full dry manicure and cuticle detail',
      'Two-tone fade blended in the product',
      'Buffed smooth and sealed with gloss',
      'Hydrating hand treatment to finish',
    ],
    recommendedAddons: ['addon-paraffin', 'addon-nailart-tier1'],
  },
  {
    id: 'srv-acrylic-infill',
    name: 'Infill, Rebalance & Colour Change',
    category: 'sculpted-extensions',
    price: 50,
    durationMinutes: 75,
    shortDescription:
      'Maintenance every three to four weeks: regrowth filled, apex reset, fresh colour.',
    fullDescription:
      'Old product is reduced rather than ripped off, the stress points are re-established at the regrowth, the cuticle is tidied dry and a new gel colour goes on. It gets its own appointment because rushing this is what breaks nails.',
    included: [
      'Careful e-file reduction of old product',
      'Dry cuticle renewal',
      'Refilled and rebalanced at the regrowth',
      'Fresh gel colour and hydration',
    ],
    recommendedAddons: ['addon-nailart-tier1', 'addon-french'],
  },
  {
    id: 'srv-medical-podology',
    name: 'Specialist Podology Pedicure',
    category: 'podology-care',
    price: 65,
    durationMinutes: 75,
    shortDescription:
      'Hard skin, cracked heels and difficult toenails, worked on properly. Not a spa pedicure.',
    fullDescription:
      'Deoana has spent thirty years working on feet, and this is the appointment where that shows. Hard skin and cracked heels are reduced with an e-file, thick toenails are shaped and thinned back, and the corners are cleared so they stop pressing into the skin. Unhurried, and you walk out of it comfortable. If something ought to be looked at by a doctor, she will say so rather than work around it.',
    badge: '30+ years of practice',
    popular: true,
    included: [
      'A proper look at both feet first',
      'Hard skin and cracked heels reduced',
      'Thick toenails shaped and thinned',
      'Corners cleared, then balm and massage',
    ],
    recommendedAddons: ['addon-paraffin', 'addon-callus-peel'],
  },
  {
    id: 'srv-spa-pedicure-luxe',
    name: 'Restorative Foot Ritual & Gel',
    category: 'podology-care',
    price: 60,
    durationMinutes: 75,
    shortDescription:
      'A long soak, gentle smoothing, a slow foot massage and gel colour on the toes.',
    fullDescription:
      'The softer foot appointment. An aromatic soak, a salt scrub, hard skin smoothed rather than worked back, warm towels, an unhurried massage and long-wearing gel on the toes. Book this one when your feet are fine and you simply want an hour of quiet.',
    included: [
      'Himalayan salt and rosemary soak',
      'Gentle smoothing and a salt scrub',
      'Cuticle detail and toenail shaping',
      'Gloss gel colour on the toes',
    ],
    recommendedAddons: ['addon-paraffin', 'addon-chrome'],
  },
  {
    id: 'srv-bespoke-nailart',
    name: 'Bespoke Nail Art Session',
    category: 'haute-nail-art',
    price: 60,
    durationMinutes: 90,
    shortDescription:
      'A whole appointment given to the art: 3D texture, chrome, foils and hand-painted detail.',
    fullDescription:
      'Bring a picture, or bring nothing and talk it through at the table. This is booked as its own session because ten nails of hand-painted work cannot be squeezed onto the end of a manicure. Prep, the design conversation and the finish are all in the time.',
    included: [
      'Dry manicure prep and base',
      'Design planned with you first',
      'Hand-painted work across ten nails',
      'Encapsulated and sealed with topcoat',
    ],
    recommendedAddons: ['addon-paraffin'],
  },
  {
    id: 'srv-ibx-paraffin-restoration',
    name: 'Keratin Repair & Warm Paraffin',
    category: 'spa-rituals',
    price: 45,
    durationMinutes: 50,
    shortDescription:
      'For nails that peel, split or bend. No colour and no length — just the natural nail.',
    fullDescription:
      'IBX is warmed into the nail plate so the peeling layers bind back together, then the hands go into a warm lavender paraffin wrap. Usually taken two or three appointments in a row before going back to colour, and often booked after extensions have been removed.',
    badge: 'Repair treatment',
    included: [
      'Waterless cuticle care',
      'Two IBX layers warmed into the nail',
      'Warm lavender paraffin wrap',
      'Strengthening finish coat',
    ],
    recommendedAddons: [],
  },
]
