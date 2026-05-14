import { FAQCategory, FAQItem } from './types';

export const faqCategories: FAQCategory[] = [
  {
    id: 'orders',
    label: 'Orders & Timelines',
    description: 'Everything about placing orders, production schedules, and delivery expectations.',
    accentColor: '#4D7CFE',
  },
  {
    id: 'customization',
    label: 'Customization',
    description: 'How we translate your brand into tangible product experiences.',
    accentColor: '#059669',
  },
  {
    id: 'design',
    label: 'Design & Mockups',
    description: 'From your first concept to the final approved artwork.',
    accentColor: '#7C3AED',
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    description: 'Where we deliver, how we pack, and what to expect on arrival.',
    accentColor: '#D97706',
  },
  {
    id: 'enterprise',
    label: 'Enterprise & Bulk',
    description: 'Dedicated support, volume pricing, and account management for large organizations.',
    accentColor: '#DC2626',
  },
  {
    id: 'gifting',
    label: 'Corporate Gifting',
    description: 'Curated gift programs, personalization, and direct-to-recipient shipping.',
    accentColor: '#0D9488',
  },
];

export const faqItems: FAQItem[] = [
  // Orders & Timelines
  {
    id: 'order-minimum',
    question: 'What is the minimum order quantity?',
    answer: 'Minimum quantities vary by product category. Our custom mugs and bottles start at 50 units, notebooks and ID cards at 50 units, corporate gifts at 25 units, and custom packaging at 200 units. For enterprise clients with recurring programs, we offer flexible minimums tailored to your cadence. Every quote includes a detailed breakdown so you know exactly where you stand before committing.',
    categoryId: 'orders',
    priority: 'high',
    relatedLinks: [
      { label: 'View all products', href: '/products' },
      { label: 'Request a quote', href: '/quote' },
    ],
  },
  {
    id: 'order-timeline',
    question: 'How long does production take?',
    answer: 'Standard production timelines range from 7 to 25 working days depending on the product complexity and customization level. Simple screen-printed mugs ship in 12–15 days. Custom packaging with die-cut inserts and foil stamping requires 18–25 days. Rush orders are possible with a 30% expedite fee — just mention your deadline when requesting a quote and we will confirm feasibility within 4 hours.',
    categoryId: 'orders',
    priority: 'high',
    relatedLinks: [
      { label: 'Production details', href: '/products' },
    ],
  },
  {
    id: 'order-payment',
    question: 'What are your payment terms?',
    answer: 'For first-time clients, we require a 50% advance to begin production, with the balance due before dispatch. For enterprise accounts with established relationships, we offer net-15 and net-30 terms. All major payment methods are accepted including bank transfer, UPI, and corporate cards. Invoices include GST and are structured for clean accounts-payable processing.',
    categoryId: 'orders',
    priority: 'medium',
  },
  {
    id: 'order-cancel',
    question: 'Can I modify or cancel an order after it is placed?',
    answer: 'You can modify artwork, quantities, or delivery details at no charge until production begins — typically within 24 hours of artwork approval. Once production has started, modifications may incur tooling or material change fees. Cancellations after production commencement are handled on a case-by-case basis with transparency about recoverable costs.',
    categoryId: 'orders',
    priority: 'medium',
  },

  // Customization
  {
    id: 'custom-methods',
    question: 'What customization methods do you offer?',
    answer: 'We offer a comprehensive range of branding techniques: screen printing for bold, durable designs; digital sublimation for full-color photographic prints; laser engraving for permanent metallic marking on steel, wood, and aluminium; debossing and embossing for tactile premium finishes on leather and paper; foil stamping in gold, silver, copper, and holographic variants; and soft-touch coating for matte rubberized textures. Each method is recommended based on your product, artwork, and budget.',
    categoryId: 'customization',
    priority: 'high',
    relatedLinks: [
      { label: 'Explore products', href: '/products' },
    ],
  },
  {
    id: 'custom-colors',
    question: 'Can you match my brand colors exactly?',
    answer: 'Absolutely. We work with Pantone Coated and Uncoded references, CMYK values, and hex codes. Our pre-press team color-corrects every job against physical Pantone swatches under D50 standard lighting. For critical brand color matches, we produce a physical color-proof for your approval before full production begins — at no additional charge for orders over 100 units.',
    categoryId: 'customization',
    priority: 'high',
  },
  {
    id: 'custom-packaging',
    question: 'Can you customize the packaging too?',
    answer: 'Yes — packaging is often where the brand experience truly begins. We design and produce custom rigid boxes, mailers, tissue paper, belly bands, and insert cards. Every element can carry your brand: embossed logos on box lids, foil-stamped seals, printed tissue paper, and personalized message cards. For employee kits and corporate gifts, we design the unboxing sequence as carefully as the products inside.',
    categoryId: 'customization',
    priority: 'high',
    relatedLinks: [
      { label: 'Packaging solutions', href: '/solutions/packaging-solutions' },
    ],
  },
  {
    id: 'custom-existing',
    question: 'Can you customize products I already have?',
    answer: 'In most cases, yes — though it depends on the material and product condition. We can add branding to client-provided apparel, bags, and some hard goods through embroidery, screen printing, or heat transfer. For best results, we recommend sourcing through our curated catalog where every product is pre-qualified for its intended decoration method. This eliminates surprises and ensures consistent quality.',
    categoryId: 'customization',
    priority: 'low',
  },

  // Design & Mockups
  {
    id: 'design-help',
    question: 'Do you provide design support?',
    answer: 'Yes — every project includes complimentary design support. If you have existing artwork, our pre-press team optimizes it for the chosen product and decoration method, checking resolution, color modes, and bleed requirements. If you need original design work, our in-house designers create mockups, layouts, and packaging concepts. For enterprise clients, we offer dedicated brand guideline alignment and template libraries.',
    categoryId: 'design',
    priority: 'high',
    relatedLinks: [
      { label: 'Contact our design team', href: '/contact' },
    ],
  },
  {
    id: 'design-mockup',
    question: 'When will I see a mockup of my product?',
    answer: 'Digital mockups are delivered within 24–48 hours of receiving your artwork and product selection. These are photorealistic renderings showing your design on the actual product from multiple angles. For complex projects or enterprise accounts, we produce physical pre-production samples within 5–7 working days. You approve every detail before a single unit goes into full production.',
    categoryId: 'design',
    priority: 'high',
  },
  {
    id: 'design-revision',
    question: 'How many revisions are included?',
    answer: 'We include up to three rounds of revisions at no charge. Most clients approve within two rounds. Each revision cycle includes updated mockups with clear change annotations. Additional revisions beyond three are billed at a nominal rate, though in practice this is rare — our design process is collaborative from the first call, so we typically nail the direction early.',
    categoryId: 'design',
    priority: 'medium',
  },
  {
    id: 'design-files',
    question: 'What file formats do you need?',
    answer: 'For best results, we prefer vector artwork in AI, EPS, or PDF format with fonts outlined. High-resolution PNG or JPEG files at 300 DPI also work for many applications. For full-color photographic prints, we need images at minimum 300 DPI at print size. If your files need adjustment, our team handles the conversion at no charge — just send what you have and we will guide you from there.',
    categoryId: 'design',
    priority: 'medium',
  },

  // Shipping & Delivery
  {
    id: 'ship-regions',
    question: 'Where do you deliver?',
    answer: 'We ship across all of India including metro cities, tier-2 and tier-3 towns, and remote locations via our network of courier partners. For enterprise clients with multiple office locations, we offer centralized production with decentralized direct-to-location shipping — each package addressed individually, tracked separately, and delivered to the right desk. International shipping is available to select countries on request.',
    categoryId: 'shipping',
    priority: 'high',
    relatedLinks: [
      { label: 'Enterprise solutions', href: '/solutions/employee-welcome-kits' },
    ],
  },
  {
    id: 'ship-tracking',
    question: 'Will I receive tracking information?',
    answer: 'Every shipment includes real-time tracking. For single-location orders, you receive a tracking link via email and WhatsApp the moment your package leaves our facility. For multi-location enterprise shipments, we provide a consolidated dashboard with individual tracking numbers, delivery status, and proof-of-delivery confirmations for every recipient.',
    categoryId: 'shipping',
    priority: 'medium',
  },
  {
    id: 'ship-damage',
    question: 'What if my order arrives damaged?',
    answer: 'We pack every order with protective materials designed for the rigors of Indian logistics. In the rare event of damage, photograph the packaging and products within 24 hours of delivery and share them with us. We replace damaged units at no charge and investigate the root cause with our logistics partner to prevent recurrence. Your satisfaction is guaranteed — no exceptions, no arguments.',
    categoryId: 'shipping',
    priority: 'high',
  },
  {
    id: 'ship-partial',
    question: 'Can you ship to multiple addresses?',
    answer: 'Yes — this is one of our most requested services, especially for corporate gifting and employee kit programs. Simply provide a spreadsheet with recipient names, addresses, and phone numbers. We handle individual packing, labeling, and dispatch. Each recipient receives a beautifully packed order with a personalized message card if requested. You receive delivery confirmations as each package reaches its destination.',
    categoryId: 'shipping',
    priority: 'high',
    relatedLinks: [
      { label: 'Corporate gifting', href: '/solutions/corporate-gifting' },
      { label: 'Employee kits', href: '/solutions/employee-welcome-kits' },
    ],
  },

  // Enterprise & Bulk
  {
    id: 'enterprise-pricing',
    question: 'Do you offer volume pricing?',
    answer: 'Yes — volume discounts begin at 250 units and increase progressively at 500, 1000, 2500, and 5000+ units. For annual programs with predictable recurring needs, we offer contract pricing that locks in rates for 12 months regardless of commodity fluctuations. Enterprise quotes include detailed unit economics so you can present clear numbers to your procurement team.',
    categoryId: 'enterprise',
    priority: 'high',
  },
  {
    id: 'enterprise-dedicated',
    question: 'Will we have a dedicated account manager?',
    answer: 'Enterprise clients are assigned a dedicated account manager who becomes an extension of your team. They understand your brand guidelines, approval workflows, and procurement processes. Your account manager handles everything from initial briefs to delivery confirmations, coordinates with design and production, and provides proactive updates — so you never have to chase status.',
    categoryId: 'enterprise',
    priority: 'high',
    relatedLinks: [
      { label: 'Schedule a consultation', href: '/contact' },
    ],
  },
  {
    id: 'enterprise-nda',
    question: 'Do you sign NDAs for sensitive projects?',
    answer: 'Absolutely. We regularly work with organizations in finance, technology, healthcare, and government where confidentiality is paramount. We sign mutual NDAs before receiving sensitive brand assets, product details, or recipient data. Our team is trained on data handling protocols, and all files are stored on encrypted servers with access logging.',
    categoryId: 'enterprise',
    priority: 'medium',
  },
  {
    id: 'enterprise-samples',
    question: 'Can we see physical samples before placing a bulk order?',
    answer: 'Yes — and we encourage it. Physical samples are the surest way to evaluate material quality, print fidelity, and overall finish. We provide unbranded product samples at no charge for serious enquiries. For branded pre-production samples, there is a nominal cost that is fully credited against your final order. Most enterprise clients request 2–3 product samples and one fully branded pre-production piece.',
    categoryId: 'enterprise',
    priority: 'high',
  },

  // Corporate Gifting
  {
    id: 'gifting-curate',
    question: 'Can you curate gift sets for us?',
    answer: 'Curated gifting is our specialty. We begin with a discovery call to understand your recipients, occasion, budget, and brand values. Then we propose 2–3 curated concepts — each with a mood board, product selection, packaging design, and personalization options. Once you select a direction, we produce a physical prototype set for your approval. From Diwali hampers to client appreciation boxes, every curation tells a story.',
    categoryId: 'gifting',
    priority: 'high',
    relatedLinks: [
      { label: 'Explore gifting solutions', href: '/solutions/corporate-gifting' },
    ],
  },
  {
    id: 'gifting-personal',
    question: 'Can each gift be personalized with individual names?',
    answer: 'Yes — individual personalization is one of our signature services. Each item in a gift set can carry the recipient\'s name, a personalized message, or even a custom design element. We handle variable data processing in-house, so whether you are gifting 50 executives or 5,000 employees, every piece is uniquely theirs. Names can be engraved, printed, or embossed depending on the product and your aesthetic preference.',
    categoryId: 'gifting',
    priority: 'high',
  },
  {
    id: 'gifting-occasion',
    question: 'What occasions do you create gifts for?',
    answer: 'We design for every corporate occasion: Diwali, Christmas, Eid, New Year, company anniversaries, product launches, IPO celebrations, client onboarding, employee milestones, retirement farewells, and conference giveaways. Each occasion receives a unique design treatment — we never recycle templates. Our seasonal collections launch 8 weeks before major festivals so you can plan ahead without last-minute stress.',
    categoryId: 'gifting',
    priority: 'medium',
  },
  {
    id: 'gifting-message',
    question: 'Can we include custom message cards?',
    answer: 'Every gift set includes the option for custom message cards — from simple printed inserts to handcrafted cotton paper cards with foil-stamped signatures. For executive gifts, we offer handwritten calligraphy services. For large-scale employee programs, we can print variable messages — each card unique to its recipient. The message card is often the first thing seen when opening a gift, and we design it to set the emotional tone.',
    categoryId: 'gifting',
    priority: 'medium',
  },
];

export function getFAQsByCategory(categoryId: string): FAQItem[] {
  return faqItems.filter((item) => item.categoryId === categoryId);
}

export function searchFAQs(query: string): FAQItem[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return faqItems;
  return faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(normalized) ||
      item.answer.toLowerCase().includes(normalized)
  );
}

export function getHighPriorityFAQs(limit = 6): FAQItem[] {
  return faqItems.filter((item) => item.priority === 'high').slice(0, limit);
}
