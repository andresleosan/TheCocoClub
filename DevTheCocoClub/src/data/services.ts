import { ServiceCategory, ServiceItem, ServiceAddOn } from '../types';

export const SERVICE_CATEGORIES: { id: ServiceCategory; name: string; description: string }[] = [
  { id: 'all', name: 'All Treatments', description: 'Curated beauty & podology rituals in Saint Helier' },
  { id: 'signature-biab', name: 'Signature BIAB & Natural Care', description: 'Strengthening builder gel & Russian dry manicure precision' },
  { id: 'sculpted-extensions', name: 'Acrylic & Hard Gel Sculpting', description: 'Hand-sculpted bespoke length, durability & iconic shapes' },
  { id: 'podology-care', name: 'Clinical Podology & Pedicures', description: '30+ years of specialized medical foot care & restorative pedicures' },
  { id: 'haute-nail-art', name: 'Haute Nail Art & Finish', description: 'Intricate hand-painted masterpieces, 3D accents & chrome glazes' },
  { id: 'spa-rituals', name: 'Spa & Restorative Rituals', description: 'Intense hydration, warm paraffin infusions & IBX keratin repair' },
];

export const SERVICE_ADDONS: ServiceAddOn[] = [
  {
    id: 'addon-paraffin',
    name: 'Warm Lavender Paraffin Wrap',
    price: 12,
    durationMinutes: 15,
    description: 'Deep thermal hydration that leaves hands & feet ultra-soft and relieves joint tension.'
  },
  {
    id: 'addon-ibx',
    name: 'IBX Deep Keratin Repair System',
    price: 15,
    durationMinutes: 15,
    description: 'Penetrates inside the natural nail plate to fuse peeling layers and heal damaged nails.'
  },
  {
    id: 'addon-chrome',
    name: 'Haute Glazed Chrome / Pearl Finish',
    price: 10,
    durationMinutes: 10,
    description: 'Ultra-reflective Hailey Bieber glazed donut pearl, metallic gold, or rose chrome effect.'
  },
  {
    id: 'addon-french',
    name: 'Hand-Painted Micro French Tips',
    price: 12,
    durationMinutes: 15,
    description: 'Razor-sharp classic, micro, or deep curved French smile lines tailored to your nail shape.'
  },
  {
    id: 'addon-nailart-tier1',
    name: 'Custom Accent Nail Art (2 nails)',
    price: 10,
    durationMinutes: 15,
    description: 'Delicate gold leaf encapsulation, minimal geometric lines, or gemstone placement.'
  },
  {
    id: 'addon-nailart-tier2',
    name: 'Full Set Bespoke Haute Art (10 nails)',
    price: 28,
    durationMinutes: 30,
    description: 'Complex 3D gel flowers, tortoiseshell, marble swirls, or personalized design.'
  },
  {
    id: 'addon-callus-peel',
    name: 'Medical Callus Softening Treatment',
    price: 15,
    durationMinutes: 15,
    description: 'Specialized podological active gel peel that melts stubborn heel cracks and calluses.'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-biab-signature',
    name: 'The Coco Club Signature BIAB Overlay',
    category: 'signature-biab',
    price: 55,
    durationMinutes: 75,
    shortDescription: 'Premium Builder in a Bottle structured overlay on natural nails with e-file dry Russian manicure.',
    fullDescription: 'Our flagship strengthening treatment. Includes comprehensive e-file cuticle care, bespoke apex architecture reinforcement with luxury BIAB gel, and your choice of high-gloss shade or neutral nude finish. Ideal for growing strong natural nails.',
    badge: 'Client Favourite',
    popular: true,
    included: [
      'Russian dry precision cuticle clean & contouring',
      'Structural BIAB apex balancing for maximum strength',
      'Long-lasting chip-free gel colour or sheer luxury nude',
      'Organic botanical cuticle oil infusion & hand massage'
    ],
    recommendedAddons: ['addon-french', 'addon-chrome', 'addon-paraffin'],
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-russian-manicure',
    name: 'Master Russian / Dry Precision Manicure',
    category: 'signature-biab',
    price: 45,
    durationMinutes: 60,
    shortDescription: 'Flawless diamond-bit cuticle grooming, natural nail shaping, and long-lasting gel polish.',
    fullDescription: 'Experience Deoana Moreno’s world-class diamond bit technique. Deep, seamless cuticle clearing that allows gel polish to be applied flush to the eponychium for up to 4+ weeks of outgrown perfection.',
    included: [
      'Deep diamond-burr cuticle exfoliation',
      'Custom nail shaping & symmetry refinement',
      'Flawless close-to-cuticle gel polish application',
      'Nourishing serum & hot towel finish'
    ],
    recommendedAddons: ['addon-ibx', 'addon-paraffin'],
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-acrylic-fullset',
    name: 'Bespoke Sculpted Acrylic Extensions (Full Set)',
    category: 'sculpted-extensions',
    price: 75,
    durationMinutes: 105,
    shortDescription: 'Custom hand-sculpted acrylic length with bespoke curvature, lightweight feel, and superior strength.',
    fullDescription: 'Sculpted on premium forms (never glued plastic tips) to ensure a customized arch matching your unique nail bed. Lightweight, ultra-durable, and finished with your preferred shape (Almond, Coffin, Stiletto, or Square).',
    badge: 'Master Craft',
    popular: true,
    included: [
      'Precision cuticle prep & nail bed sanitization',
      'Hand-sculpted acrylic extensions on bespoke forms',
      'Flawless hand filing & structural apex balancing',
      'High-gloss gel polish finish & revitalizing cuticle nectar'
    ],
    recommendedAddons: ['addon-nailart-tier2', 'addon-chrome'],
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-ombre-babyboomer',
    name: 'French Ombré / Babyboomer Luxury Set',
    category: 'sculpted-extensions',
    price: 85,
    durationMinutes: 120,
    shortDescription: 'Seamless blend from soft blush rose into crisp milk-white for timeless, modern royal elegance.',
    fullDescription: 'A classic haute look perfected by Deoana’s 30 years of color-fading mastery. Features a soft gradient blend of premium cover pink and porcelain white acrylics, sealed with glass-like topcoat.',
    included: [
      'Full dry manicure & cuticle detailing',
      'Sculpted extension or natural overlay with 2-tone gradient',
      'Ultra-smooth buffing and high-shine sealant',
      'Hydrating luxury hand treatment'
    ],
    recommendedAddons: ['addon-paraffin', 'addon-nailart-tier1'],
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-acrylic-infill',
    name: 'Sculpted Infill, Rebalance & Color Refresh',
    category: 'sculpted-extensions',
    price: 50,
    durationMinutes: 75,
    shortDescription: 'Maintain your extensions: rebalance growth apex, cuticle grooming, and new gel shade.',
    fullDescription: 'Essential maintenance every 3 to 4 weeks. We re-establish the structural stress points, de-bulk overgrown product, renew cuticle health, and apply fresh gel colour.',
    included: [
      'Careful e-file reduction of old product',
      'Russian dry cuticle renewal',
      'Structural acrylic/gel refill at the root',
      'Fresh luxury gel coat & hydration'
    ],
    recommendedAddons: ['addon-nailart-tier1', 'addon-french'],
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-medical-podology',
    name: 'Specialist Clinical Podological Pedicure',
    category: 'podology-care',
    price: 65,
    durationMinutes: 75,
    shortDescription: 'Medical-grade foot & nail therapy led by Deoana Moreno. Relieves calluses, cracks & pressure points.',
    fullDescription: 'Far beyond a cosmetic pedicure: this is a restorative medical-grade clinical foot health session. Deoana brings 30+ years of podological experience to safely treat stubborn heel hyperkeratosis, thick toenails, painful skin buildup, and ingrown nail corners with sterile European instruments.',
    badge: '30+ Yrs Podology Mastery',
    popular: true,
    included: [
      'Aseptic podology foot assessment & sanitization',
      'Precision medical e-file removal of deep calluses & cracked heels',
      'Anatomical toenail trimming & sulcus clearing for ingrown prevention',
      'Deep antiseptic softening massage & barrier cream'
    ],
    recommendedAddons: ['addon-paraffin', 'addon-callus-peel'],
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-spa-pedicure-luxe',
    name: 'Supreme Wellness Foot Ritual & Gel Polish',
    category: 'podology-care',
    price: 60,
    durationMinutes: 75,
    shortDescription: 'Holistic foot soak, sea salt exfoliation, callus smoothing, and chip-free gel polish.',
    fullDescription: 'The ultimate relaxing sanctuary for tired feet. Indulge in an aromatic foot bath with essential botanical oils, gentle smoothing, warm moisturizing towels, reflexology-inspired foot massage, and long-lasting gel polish on toes.',
    included: [
      'Aromatic Himalayan salt & rosemary foot bath',
      'Gentle callus smoothing & micro-exfoliation scrub',
      'Detailed cuticle grooming & nail shaping',
      'Long-lasting high gloss gel toe colour'
    ],
    recommendedAddons: ['addon-paraffin', 'addon-chrome'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-bespoke-nailart',
    name: 'Bespoke Haute Nail Art Session',
    category: 'haute-nail-art',
    price: 60,
    durationMinutes: 90,
    shortDescription: 'Dedicated artistic session for custom 3D textures, Korean jelly art, chrome swirls & gems.',
    fullDescription: 'Bring your Pinterest board or let Deoana create a bespoke set tailored to your personal vibe, event, or wedding. Includes detailed sculpting of textures, gold foils, marble veins, and chrome accents.',
    badge: 'Artistic Exclusive',
    included: [
      'Full dry manicure prep & base foundation',
      'Consultation & design layout planning',
      'Hand-crafted multidimensional art across all 10 nails',
      'Reinforced encapsulation & ultra-durable diamond topcoat'
    ],
    recommendedAddons: ['addon-paraffin'],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-ibx-paraffin-restoration',
    name: 'Intensive Keratin Rejuvenation & Thermal Spa',
    category: 'spa-rituals',
    price: 45,
    durationMinutes: 50,
    shortDescription: 'Intensive restorative therapy for damaged, weak, brittle nails and severely dry hands.',
    fullDescription: 'Designed for clients seeking natural nail rehabilitation. Uses the medical-grade IBX fusion system to rebuild broken keratin bonds inside the nail matrix, followed by a warm botanical paraffin thermal infusion for silk-smooth hands.',
    badge: 'Nail Health',
    included: [
      'Gentle waterless cuticle care',
      'Double-dose IBX thermal deep-penetrating infusion',
      'Warm lavender essential oil paraffin dip',
      'Strengthening botanical finish coat'
    ],
    recommendedAddons: [],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  }
];
