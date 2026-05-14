import { SolutionData } from './types';

export const solutions: Record<string, SolutionData> = {
  'corporate-gifting': {
    slug: 'corporate-gifting',
    name: 'Corporate Gifting',
    headline: 'Corporate Gifting That Builds Relationships, Not Landfills',
    subheadline: 'Strategic merchandise programs that transform business relationships into lasting partnerships.',
    description: 'Premium corporate gifting solutions designed to strengthen client relationships, reward loyalty, and create memorable brand touchpoints that drive measurable business outcomes.',
    heroGradient: 'from-rose-50 via-amber-50/50 to-ivory',
    heroAccent: '#F59E0B',
    category: 'Relationship Building',
    stats: [
      { value: '3.2x', label: 'Higher Retention' },
      { value: '67%', label: 'Recall Rate' },
      { value: '48h', label: 'Delivery Window' },
    ],
    process: [
      { number: '01', title: 'Strategy Session', description: 'We analyze your relationship architecture and identify the moments that matter most for gifting impact.' },
      { number: '02', title: 'Curation', description: 'Every item is selected for quality, utility, and emotional resonance — never from a generic catalog.' },
      { number: '03', title: 'Personalization', description: 'Names, messages, and custom touches that transform a product into a personal gesture.' },
      { number: '04', title: 'Delivery Excellence', description: 'Premium packaging, precise timing, and white-glove delivery that extends the brand experience.' },
    ],
    features: [
      { title: 'Relationship-Tiered Gifting', description: 'Different gift strategies for different relationship depths — from prospect to partner to advocate.' },
      { title: 'Seasonal & Milestone Programs', description: 'Automated gifting for anniversaries, achievements, holidays, and micro-moments.' },
      { title: 'Sustainable Luxury', description: 'Eco-conscious materials and designs that align premium quality with environmental responsibility.' },
      { title: 'Global Fulfillment', description: 'Seamless international delivery with localized packaging and customs handling.' },
    ],
    mockups: [
      { title: 'Executive Gift Box', description: 'Curated collection for C-suite relationships', gradient: 'from-amber-100 via-orange-50 to-ivory', accentColor: '#F59E0B' },
      { title: 'Client Anniversary Set', description: 'Milestone celebration with personal note', gradient: 'from-rose-100 via-pink-50 to-ivory', accentColor: '#EC4899' },
      { title: 'Partner Appreciation Kit', description: 'Premium selection for strategic allies', gradient: 'from-violet-100 via-purple-50 to-ivory', accentColor: '#8B5CF6' },
    ],
    psychologyHeadline: 'Why the Right Gift Changes Everything',
    psychologyPoints: [
      'The reciprocity principle: thoughtful gifts create psychological obligations that deepen business bonds.',
      'Tangible memory anchoring: physical gifts create stronger recall than digital touchpoints alone.',
      'Social signaling: premium gifting communicates your company\'s standards without saying a word.',
      'Emotional priming: a well-timed gift creates positive affect that carries into business negotiations.',
    ],
    transformation: {
      before: 'Generic pens and fruit baskets that end up in desk drawers',
      after: 'Curated experiences that clients photograph, share, and remember for years',
      narrative: 'One of our clients, a fintech firm, replaced their annual holiday fruit basket with a premium leather desk organizer, artisanal notebook, and personalized fountain pen. Client satisfaction scores rose 34%. More importantly, three clients mentioned the gift unprompted in quarterly business reviews — turning a cost center into a relationship accelerator.',
    },
    faqs: [
      { question: 'What is the minimum order quantity?', answer: 'We work with orders starting from 50 units for standard programs and 25 units for premium executive gifting. For enterprise programs, we offer flexible scaling.' },
      { question: 'How long does the gifting process take?', answer: 'Standard programs take 2–3 weeks from strategy to delivery. Express programs can be executed in 5–7 business days for urgent relationship moments.' },
      { question: 'Can gifts be personalized for individual recipients?', answer: 'Absolutely. Individual personalization — names, handwritten notes, custom selections based on preferences — is our specialty and a key driver of gifting impact.' },
      { question: 'Do you offer sustainable gifting options?', answer: 'Yes. Over 60% of our catalog uses sustainable or recycled materials. We also offer carbon-neutral shipping and plastic-free packaging options.' },
    ],
    ctaHeadline: 'Turn Your Gifting Program Into a Competitive Advantage',
    ctaSubheadline: 'Book a complimentary gifting strategy session and discover how thoughtful merchandise can transform your most important relationships.',
    relatedSlugs: ['employee-welcome-kits', 'custom-merchandise', 'promotional-branding'],
  },

  'employee-welcome-kits': {
    slug: 'employee-welcome-kits',
    name: 'Employee Welcome Kits',
    headline: 'First Impressions That Define Company Culture',
    subheadline: 'Onboarding experiences that make new hires feel valued from day one.',
    description: 'Strategically designed employee welcome kits that transform onboarding into a powerful brand moment, improving retention, engagement, and cultural alignment.',
    heroGradient: 'from-emerald-50 via-teal-50/50 to-ivory',
    heroAccent: '#10B981',
    category: 'Employee Experience',
    stats: [
      { value: '82%', label: 'Higher Retention' },
      { value: '40%', label: 'Better Satisfaction' },
      { value: '3x', label: 'Faster Integration' },
    ],
    process: [
      { number: '01', title: 'Culture Audit', description: 'We study your values, rituals, and brand voice to design a kit that feels authentically yours.' },
      { number: '02', title: 'Utility Mapping', description: 'Every item serves a real purpose in the new hire\'s first 90 days — no filler, no waste.' },
      { number: '03', title: 'Brand Integration', description: 'Subtle, sophisticated branding that employees are proud to use — not loud logos on cheap swag.' },
      { number: '04', title: 'Unboxing Theater', description: 'The opening moment is designed as carefully as the contents — anticipation, surprise, delight.' },
    ],
    features: [
      { title: 'Role-Specific Kits', description: 'Different kits for different functions — engineering, sales, design, leadership — each reflecting unique daily needs.' },
      { title: 'Remote-First Design', description: 'Kits built for distributed teams, with workspace essentials that transform home offices into branded environments.' },
      { title: 'Cultural Artifacts', description: 'Objects that embody your values — a notebook with your mission inside, a plant representing growth.' },
      { title: 'Iterative Evolution', description: 'Quarterly kit refreshes based on new hire feedback and cultural shifts.' },
    ],
    mockups: [
      { title: 'The Essentials Kit', description: 'Workspace tools for immediate productivity', gradient: 'from-emerald-100 via-green-50 to-ivory', accentColor: '#10B981' },
      { title: 'The Culture Kit', description: 'Values-driven objects with deeper meaning', gradient: 'from-teal-100 via-cyan-50 to-ivory', accentColor: '#06B6D4' },
      { title: 'The Leadership Kit', description: 'Premium curation for senior hires', gradient: 'from-sky-100 via-blue-50 to-ivory', accentColor: '#0EA5E9' },
    ],
    psychologyHeadline: 'The Neuroscience of Belonging',
    psychologyPoints: [
      'Novelty encoding: first-week experiences are neurologically privileged — your welcome kit creates lasting positive associations.',
      'Identity fusion: branded objects employees use daily strengthen their connection to organizational identity.',
      'Social proof signaling: when employees share their kits on social media, it creates authentic employer brand content.',
      'Endowment effect: people value objects they physically possess — a quality kit increases perceived company value.',
    ],
    transformation: {
      before: 'A plastic bag with a cheap mug and a lanyard that screams afterthought',
      after: 'A thoughtfully curated unboxing experience that makes new hires feel genuinely welcomed',
      narrative: 'A Series B SaaS company came to us after losing 30% of new hires in the first six months. Their existing welcome kit was a $12 bag of generic items. We designed a $45 kit with a premium water bottle, noise-canceling earbuds, a desk mat in brand colors, and a handwritten welcome note from the CEO. First-year retention improved to 91%. The kit cost difference was negligible compared to recruitment savings.',
    },
    faqs: [
      { question: 'What is typically included in a welcome kit?', answer: 'Every kit is customized, but common elements include premium drinkware, workspace accessories, tech tools, brand apparel, cultural artifacts, and a personal welcome message. We design based on role, culture, and budget.' },
      { question: 'How do you handle remote employees?', answer: 'Remote kits are our specialty. We design for home workspace transformation, include connection-building items, and coordinate delivery to arrive on the first day. Many clients schedule virtual unboxings with managers.' },
      { question: 'What is the typical budget per kit?', answer: 'Most clients invest ₹1,500–₹5,000 per kit depending on role seniority and item selection. We optimize for impact-per-rupee rather than simply maximizing item count.' },
      { question: 'Can kits evolve with our company?', answer: 'Absolutely. We recommend quarterly reviews and annual redesigns. As your company grows, your kits should reflect your evolving culture and brand sophistication.' },
    ],
    ctaHeadline: 'Design an Onboarding Experience That People Remember',
    ctaSubheadline: 'Schedule a culture discovery call and learn how a strategic welcome kit can transform your employee experience and retention.',
    relatedSlugs: ['corporate-gifting', 'custom-merchandise', 'startup-branding'],
  },

  'startup-branding': {
    slug: 'startup-branding',
    name: 'Startup Branding',
    headline: 'Brand Identity That Scales With Your Ambition',
    subheadline: 'Founder-friendly branding systems built for growth from seed to Series C and beyond.',
    description: 'Comprehensive startup branding solutions that establish credibility, attract talent, and create memorable impressions — without enterprise-level budgets.',
    heroGradient: 'from-orange-50 via-amber-50/50 to-ivory',
    heroAccent: '#F97316',
    category: 'Identity Systems',
    stats: [
      { value: '150+', label: 'Startups Served' },
      { value: '33%', label: 'Revenue Premium' },
      { value: '2x', label: 'Faster Fundraising' },
    ],
    process: [
      { number: '01', title: 'Strategic Foundation', description: 'Before any visual work, we define your brand positioning, audience, and competitive differentiation.' },
      { number: '02', title: 'Identity Design', description: 'Logo, typography, color systems, and visual language that communicate who you are at a glance.' },
      { number: '03', title: 'Touchpoint Design', description: 'Business cards, pitch decks, investor kits, and employee materials that extend your identity into the physical world.' },
      { number: '04', title: 'Growth Architecture', description: 'Flexible design systems that scale with your team, product lines, and market expansion.' },
    ],
    features: [
      { title: 'Investor-Ready Materials', description: 'Pitch decks, one-pagers, and presentation systems designed to communicate credibility and vision.' },
      { title: 'Talent Attraction Kits', description: 'Recruitment materials and welcome experiences that position you as a destination employer.' },
      { title: 'Event Presence', description: 'Booth design, swag, and conference materials that punch above your weight at industry events.' },
      { title: 'Brand Guidelines', description: 'Living documentation that keeps your team aligned as you scale — no design drift, no inconsistency.' },
    ],
    mockups: [
      { title: 'Investor Pitch Kit', description: 'Premium presentation materials for funding rounds', gradient: 'from-orange-100 via-amber-50 to-ivory', accentColor: '#F97316' },
      { title: 'Founder Business System', description: 'Cards, stationery, and networking essentials', gradient: 'from-yellow-100 via-orange-50 to-ivory', accentColor: '#F59E0B' },
      { title: 'Team Identity Pack', description: 'Apparel, badges, and workspace branding', gradient: 'from-red-100 via-rose-50 to-ivory', accentColor: '#EF4444' },
    ],
    psychologyHeadline: 'Why Startups Cannot Afford Weak Branding',
    psychologyPoints: [
      'First impression bias: investors and customers form lasting opinions within seconds — your brand is your first defense.',
      'Credibility signaling: strong visual identity compensates for limited track record by projecting competence and intention.',
      'Talent magnetism: top candidates choose companies with brands that reflect ambition and taste.',
      'Pricing power: premium positioning, established through branding, directly enables higher margins and faster growth.',
    ],
    transformation: {
      before: 'A generic logo, Canva pitch deck, and business cards printed at the corner shop',
      after: 'A cohesive identity system that signals Series B credibility at a seed-stage budget',
      narrative: 'A health-tech startup approached us with a homemade logo and inconsistent materials across every touchpoint. After six weeks, they had a refined identity, investor pitch kit, and team welcome experience. Their founder later told us that two investors specifically mentioned the professionalism of their materials in term sheet discussions. Branding does not just look good — it creates commercial advantage.',
    },
    faqs: [
      { question: 'What is included in a startup branding package?', answer: 'Our packages typically include brand strategy, logo and visual identity, business card design, pitch deck template, investor one-pager, basic brand guidelines, and a starter merchandise set. Custom packages available based on stage and needs.' },
      { question: 'How much does startup branding cost?', answer: 'Our startup packages range from ₹75,000 for essential identity to ₹3,00,000 for comprehensive systems. We offer founder-friendly payment plans and equity-for-services arrangements for promising early-stage companies.' },
      { question: 'How long does the branding process take?', answer: 'Essential identity can be completed in 2–3 weeks. Comprehensive systems take 4–6 weeks. We also offer express 1-week packages for urgent fundraising timelines.' },
      { question: 'Will our branding work as we scale?', answer: 'Every system we design is built for growth. We create flexible frameworks that accommodate new products, markets, and team sizes without losing coherence.' },
    ],
    ctaHeadline: 'Build a Brand That Grows With You',
    ctaSubheadline: 'Book a free brand audit and discover how strategic identity can accelerate your startup\'s credibility and growth.',
    relatedSlugs: ['employee-welcome-kits', 'event-branding', 'packaging-solutions'],
  },

  'event-branding': {
    slug: 'event-branding',
    name: 'Event Branding',
    headline: 'Make Your Brand Unmissable at Every Event',
    subheadline: 'Comprehensive event branding that turns trade shows, conferences, and corporate events into unforgettable brand moments.',
    description: 'End-to-end event branding solutions including booth design, merchandise, signage, and attendee experiences that maximize visibility and generate qualified leads.',
    heroGradient: 'from-red-50 via-orange-50/50 to-ivory',
    heroAccent: '#EF4444',
    category: 'Brand Visibility',
    stats: [
      { value: '5x', label: 'More Booth Traffic' },
      { value: '72%', label: 'Lead Quality Lift' },
      { value: '89%', label: 'Brand Recall' },
    ],
    process: [
      { number: '01', title: 'Event Strategy', description: 'We analyze your event goals, audience, and competitive landscape to design a presence that stands out.' },
      { number: '02', title: 'Visual System', description: 'Booth design, signage, banners, and environmental graphics that create immersive brand worlds.' },
      { number: '03', title: 'Merchandise & Swag', description: 'Premium giveaways that attendees actually want — and use long after the event ends.' },
      { number: '04', title: 'Experience Design', description: 'Interactive elements, photo moments, and engagement strategies that drive social sharing and lead capture.' },
    ],
    features: [
      { title: 'Booth Design', description: 'Custom booth concepts from 10x10 to island exhibits, designed for maximum visual impact and foot traffic flow.' },
      { title: 'Premium Swag Strategy', description: 'Curated merchandise that filters for quality leads — the right giveaway attracts the right visitor.' },
      { title: 'Pre-Event Campaign', description: 'Mailers, emails, and social campaigns that build anticipation and schedule meetings before the event opens.' },
      { title: 'Post-Event Nurturing', description: 'Follow-up kits and sequences that convert booth interest into pipeline within 48 hours.' },
    ],
    mockups: [
      { title: 'Booth Experience Kit', description: 'Signage, banners, and environmental graphics', gradient: 'from-red-100 via-rose-50 to-ivory', accentColor: '#EF4444' },
      { title: 'Attendee Premium Set', description: 'High-value items for VIP prospects', gradient: 'from-orange-100 via-amber-50 to-ivory', accentColor: '#F97316' },
      { title: 'Team Identity System', description: 'Unified apparel and badges for staff', gradient: 'from-pink-100 via-rose-50 to-ivory', accentColor: '#EC4899' },
    ],
    psychologyHeadline: 'The Event Psychology of Premium Presence',
    psychologyPoints: [
      'Attention economics: at crowded events, premium materials signal quality and filter for serious prospects.',
      'Social amplification: beautifully designed booths and merchandise generate organic social media content.',
      'Recency and primacy: first and last impressions at events are disproportionately memorable — we design for both.',
      'Tangible recall: physical giveaways create stronger memory anchors than digital interactions alone.',
    ],
    transformation: {
      before: 'A generic booth with cheap pens and a tired banner that blends into the background',
      after: 'An immersive brand experience that attendees photograph, talk about, and remember months later',
      narrative: 'A B2B SaaS company spent ₹8 lakhs on a trade show booth but generated only 12 qualified leads. Their swag was forgettable, their booth blended in, and their team wore mismatched outfits. We redesigned their entire presence — a cohesive visual system, premium tech accessories as swag, and a photo-worthy booth design. The next event generated 89 qualified leads and their booth was featured in the event organizer\'s social media highlights.',
    },
    faqs: [
      { question: 'What types of events do you support?', answer: 'We support trade shows, conferences, product launches, corporate offsites, investor days, and private client events. From 10-person gatherings to 10,000-attendee expos.' },
      { question: 'How far in advance should we plan?', answer: 'Ideally 6–8 weeks for comprehensive programs. Express packages available for 2–3 week timelines. Rush fees may apply for sub-2-week requests.' },
      { question: 'Can you handle international events?', answer: 'Yes. We have managed event branding across 12 countries, handling local production, shipping logistics, and cultural customization.' },
      { question: 'How do you measure event branding ROI?', answer: 'We establish KPIs upfront — booth traffic, lead quality, social mentions, post-event recall surveys — and provide comprehensive post-event analysis.' },
    ],
    ctaHeadline: 'Own the Room at Your Next Event',
    ctaSubheadline: 'Schedule an event branding consultation and learn how to turn your next conference or trade show into a pipeline-generating machine.',
    relatedSlugs: ['promotional-branding', 'custom-merchandise', 'corporate-gifting'],
  },

  'packaging-solutions': {
    slug: 'packaging-solutions',
    name: 'Packaging Solutions',
    headline: 'Packaging That Tells Your Story Before It Is Opened',
    subheadline: 'Premium packaging design that transforms unboxing into an unforgettable brand theater.',
    description: 'Strategic packaging solutions for products, gifts, and corporate deliveries that create shareable moments, strengthen brand perception, and drive customer loyalty.',
    heroGradient: 'from-violet-50 via-purple-50/50 to-ivory',
    heroAccent: '#8B5CF6',
    category: 'Product Experience',
    stats: [
      { value: '4.2x', label: 'Social Sharing' },
      { value: '68%', label: 'Premium Perception' },
      { value: '91%', label: 'Repeat Orders' },
    ],
    process: [
      { number: '01', title: 'Experience Mapping', description: 'We map every stage of the unboxing journey — anticipation, reveal, discovery, resolution — and design for emotional impact at each.' },
      { number: '02', title: 'Structural Design', description: 'Box mechanics, opening sequences, and reveal choreography that create theatrical moments.' },
      { number: '03', title: 'Material Selection', description: 'Paper weights, finishes, inserts, and closures chosen for sensory impact and brand alignment.' },
      { number: '04', title: 'Sustainability Integration', description: 'Eco-conscious materials and designs that reduce environmental impact without compromising luxury.' },
    ],
    features: [
      { title: 'Unboxing Theater', description: 'Multi-layer reveals, magnetic closures, and surprise elements that create genuine delight.' },
      { title: 'Brand Narrative Packaging', description: 'Every surface tells part of your story — from outer sleeve to inner lid to product cradle.' },
      { title: 'Sustainable Luxury', description: 'Plastic-free, recyclable, and compostable options that prove premium and responsible coexist.' },
      { title: 'Scalable Production', description: 'From 100-unit limited editions to 100,000-unit production runs with consistent quality.' },
    ],
    mockups: [
      { title: 'The Unboxing Experience', description: 'Multi-layer reveal with theatrical pacing', gradient: 'from-violet-100 via-purple-50 to-ivory', accentColor: '#8B5CF6' },
      { title: 'Premium Gift Box', description: 'Rigid box with magnetic closure and velvet lining', gradient: 'from-fuchsia-100 via-pink-50 to-ivory', accentColor: '#D946EF' },
      { title: 'Sustainable Mailer', description: 'Plastic-free shipping that arrives beautifully', gradient: 'from-indigo-100 via-blue-50 to-ivory', accentColor: '#6366F1' },
    ],
    psychologyHeadline: 'The Science of the Unboxing Moment',
    psychologyPoints: [
      'Dopamine sequencing: layered reveals create multiple dopamine hits, strengthening positive brand associations.',
      'Shareability engineering: packaging designed for the Instagram moment generates organic marketing.',
      'Quality inference: premium packaging creates a halo effect — customers perceive the product inside as higher quality.',
      'Keepsake value: beautiful boxes and inserts that customers keep extend brand presence in their space.',
    ],
    transformation: {
      before: 'A brown cardboard box with a printed shipping label and crumpled paper filler',
      after: 'A theatrical unboxing experience that customers film and share without being asked',
      narrative: 'A direct-to-consumer skincare brand came to us because their beautiful products were arriving in generic Amazon-style boxes. We designed a custom rigid box with a magnetic closure, tissue paper in brand colors, a personalized welcome card, and a sample-size bonus product. Unboxing videos generated 2.3 million organic views in six months. Repeat purchase rate increased 47%. The packaging cost difference was ₹85 per unit — the customer lifetime value increase was ₹4,200.',
    },
    faqs: [
      { question: 'What is the minimum order for custom packaging?', answer: 'Custom rigid boxes start at 250 units. Flexible packaging and mailers start at 500 units. For smaller quantities, we offer semi-custom options with your branding on premium stock packaging.' },
      { question: 'How long does packaging design take?', answer: 'Concept to production-ready design takes 3–4 weeks. Production adds 2–4 weeks depending on complexity and quantity. Express timelines available.' },
      { question: 'Can packaging be fully sustainable?', answer: 'Yes. We offer plastic-free, FSC-certified, recyclable, and compostable options across our entire range. Many clients find sustainable packaging enhances their brand story.' },
      { question: 'Do you handle international shipping packaging?', answer: 'Absolutely. We design packaging that protects products through international transit while maintaining the unboxing experience at the destination.' },
    ],
    ctaHeadline: 'Design Packaging Worth Opening on Camera',
    ctaSubheadline: 'Book a packaging discovery session and learn how strategic unboxing design can drive organic marketing and customer loyalty.',
    relatedSlugs: ['custom-merchandise', 'corporate-gifting', 'startup-branding'],
  },

  'custom-merchandise': {
    slug: 'custom-merchandise',
    name: 'Custom Merchandise',
    headline: 'Merchandise That People Actually Want to Own',
    subheadline: 'Premium custom products designed for daily use, lasting impression, and genuine brand affinity.',
    description: 'End-to-end custom merchandise creation — from product selection and design to production and fulfillment — creating physical brand touchpoints that earn their place in daily life.',
    heroGradient: 'from-cyan-50 via-sky-50/50 to-ivory',
    heroAccent: '#06B6D4',
    category: 'Brand Touchpoints',
    stats: [
      { value: '50K+', label: 'Daily Impressions' },
      { value: '2.5yr', label: 'Average Lifespan' },
      { value: '94%', label: 'Utility Rating' },
    ],
    process: [
      { number: '01', title: 'Product Strategy', description: 'We identify the products that align with your audience\'s daily routines and your brand\'s positioning.' },
      { number: '02', title: 'Design Development', description: 'Subtle, sophisticated branding that enhances rather than overwhelms. Every detail is considered.' },
      { number: '03', title: 'Quality Assurance', description: 'Sample approval, material verification, and production oversight to ensure every unit meets standards.' },
      { number: '04', title: 'Smart Fulfillment', description: 'Inventory management, on-demand production, and distribution that scales with your needs.' },
    ],
    features: [
      { title: 'Daily-Use Optimization', description: 'Products selected for frequency of use — water bottles, notebooks, tech accessories that earn desk space.' },
      { title: 'Premium Material Standards', description: 'Stainless steel, organic cotton, genuine leather — materials that feel as good as they look.' },
      { title: 'Subtle Brand Integration', description: 'Branding that whispers rather than shouts. Sophisticated placement, restrained scale, elegant execution.' },
      { title: 'Scalable Programs', description: 'From 50-unit founder editions to 50,000-unit corporate rollouts with consistent quality and pricing.' },
    ],
    mockups: [
      { title: 'Daily Carry Collection', description: 'Bottles, notebooks, and tech essentials', gradient: 'from-cyan-100 via-sky-50 to-ivory', accentColor: '#06B6D4' },
      { title: 'Apparel & Accessories', description: 'Premium wearables with refined branding', gradient: 'from-blue-100 via-indigo-50 to-ivory', accentColor: '#3B82F6' },
      { title: 'Tech Integration', description: 'Wireless chargers, earbuds, and smart accessories', gradient: 'from-teal-100 via-cyan-50 to-ivory', accentColor: '#14B8A6' },
    ],
    psychologyHeadline: 'The Mathematics of Merchandise Impact',
    psychologyPoints: [
      'Impression multiplication: a quality water bottle generates 50,000+ brand impressions over its lifetime.',
      'Utility-driven affinity: products that solve real problems create gratitude that transfers to brand perception.',
      'Social visibility: merchandise used in public spaces — cafes, co-working spaces, commutes — generates organic exposure.',
      'Endowment and loyalty: owning a premium branded product increases psychological investment in the brand.',
    ],
    transformation: {
      before: 'Cheap plastic bottles and scratchy t-shirts that end up in donation bins within a month',
      after: 'Premium products that people reach for daily and proudly display in their lives',
      narrative: 'A fintech company was spending ₹4 lakhs annually on merchandise that employees and clients ignored. We redesigned their program around three premium products: a vacuum-insulated bottle, a genuine leather notebook, and noise-canceling earbuds. Total cost increased 40%, but utilization increased 800%. The CFO noted that cost-per-impression dropped from ₹12 to ₹0.80. Quality, it turns out, is the most efficient strategy.',
    },
    faqs: [
      { question: 'What types of products do you offer?', answer: 'Our catalog spans drinkware, apparel, tech accessories, stationery, bags, and lifestyle products. We also source custom products based on your specific brand needs and audience preferences.' },
      { question: 'What is the minimum order quantity?', answer: 'Most products start at 50 units. Premium items may require 100+ units. We offer sample programs so you can evaluate quality before committing to production.' },
      { question: 'How long does production take?', answer: 'Standard production is 2–3 weeks. Express production available in 5–7 business days for most products. Custom products may require 4–6 weeks.' },
      { question: 'Can you store and fulfill merchandise on demand?', answer: 'Yes. Our warehousing and fulfillment service stores your inventory and ships individual orders as needed — perfect for remote teams, client gifting, and employee stores.' },
    ],
    ctaHeadline: 'Create Merchandise That Earns Its Place',
    ctaSubheadline: 'Schedule a product strategy session and discover how premium merchandise can become your most cost-effective brand awareness channel.',
    relatedSlugs: ['promotional-branding', 'corporate-gifting', 'employee-welcome-kits'],
  },

  'promotional-branding': {
    slug: 'promotional-branding',
    name: 'Promotional Branding',
    headline: 'Promotional Products That Elevate, Not Diminish, Your Brand',
    subheadline: 'Strategic promotional branding that builds perception rather than depleting it.',
    description: 'Sophisticated promotional branding programs that use merchandise as a strategic tool for awareness, acquisition, and retention — never as cheap giveaways.',
    heroGradient: 'from-indigo-50 via-blue-50/50 to-ivory',
    heroAccent: '#6366F1',
    category: 'Brand Awareness',
    stats: [
      { value: '6.5x', label: 'Cost Efficiency' },
      { value: '85%', label: 'Brand Recall' },
      { value: '12mo', label: 'Avg. Retention' },
    ],
    process: [
      { number: '01', title: 'Audience Analysis', description: 'We study who you are trying to reach, where they spend time, and what they actually value in their daily lives.' },
      { number: '02', title: 'Product Curation', description: 'Every promotional item is chosen for relevance, quality, and brand alignment — never from a generic catalog.' },
      { number: '03', title: 'Design Execution', description: 'Branding that enhances the product rather than overwhelming it. Restraint is our design philosophy.' },
      { number: '04', title: 'Distribution Strategy', description: 'Targeted delivery that ensures your promotional investment reaches the right people at the right moments.' },
    ],
    features: [
      { title: 'Tiered Programs', description: 'Different product tiers for different audience segments — prospects, customers, advocates, and VIPs.' },
      { title: 'Campaign Integration', description: 'Promotional products designed as extensions of marketing campaigns, product launches, and seasonal initiatives.' },
      { title: 'Quality Gatekeeping', description: 'Every product meets our material and construction standards. Cheap promotional items damage brands — we refuse to produce them.' },
      { title: 'ROI Tracking', description: 'Custom codes, QR integrations, and campaign attribution that connect promotional spend to measurable outcomes.' },
    ],
    mockups: [
      { title: 'Prospect Welcome Kit', description: 'First-touch materials for lead conversion', gradient: 'from-indigo-100 via-blue-50 to-ivory', accentColor: '#6366F1' },
      { title: 'Campaign Amplifier', description: 'Products tied to product launches and events', gradient: 'from-slate-100 via-gray-50 to-ivory', accentColor: '#64748B' },
      { title: 'Advocacy Rewards', description: 'Premium items for referral and loyalty programs', gradient: 'from-blue-100 via-cyan-50 to-ivory', accentColor: '#3B82F6' },
    ],
    psychologyHeadline: 'Why Most Promotional Products Fail',
    psychologyPoints: [
      'The quality inference effect: cheap promotional items signal that your brand cuts corners — the opposite of the intended message.',
      'The shelf-life problem: low-quality items are discarded within days, while premium products remain visible for years.',
      'The audience mismatch: generic giveaways reach everyone and resonate with no one. Targeted premium products filter for ideal prospects.',
      'The reciprocity gradient: the perceived value of a gift directly determines the psychological obligation it creates.',
    ],
    transformation: {
      before: 'A thousand cheap pens handed out at a trade show, 95% discarded within a week',
      after: 'A targeted premium program where every recipient becomes a brand advocate',
      narrative: 'A consulting firm spent ₹6 lakhs on 5,000 branded pens, stress balls, and USB drives for a conference. Six months later, a follow-up survey found that 94% of recipients could not recall receiving anything. We redesigned their program: 500 premium leather portfolios for qualified prospects only, with personalized notes and business card slots. Eighteen months later, 67% of recipients still used their portfolio daily. Cost per lasting impression dropped from ₹120 to ₹18.',
    },
    faqs: [
      { question: 'How is promotional branding different from standard merchandise?', answer: 'Promotional branding is strategically tied to campaigns, events, and audience segments. It includes targeting, timing, and attribution — not just product selection.' },
      { question: 'What is the typical budget for a promotional program?', answer: 'Programs range from ₹50,000 for targeted campaigns to ₹10+ lakhs for comprehensive annual programs. We design for impact-per-rupee rather than volume.' },
      { question: 'How do you measure promotional branding success?', answer: 'We establish KPIs upfront — brand recall surveys, redemption rates, social mentions, attributed leads — and provide detailed campaign analytics.' },
      { question: 'Can promotional branding integrate with digital campaigns?', answer: 'Absolutely. QR codes, NFC tags, personalized URLs, and AR experiences bridge physical merchandise with digital engagement and attribution.' },
    ],
    ctaHeadline: 'Stop Wasting Money on Forgettable Giveaways',
    ctaSubheadline: 'Book a promotional strategy review and discover how premium, targeted merchandise can become your highest-ROI marketing channel.',
    relatedSlugs: ['event-branding', 'custom-merchandise', 'corporate-gifting'],
  },
};

export function getSolutionBySlug(slug: string): SolutionData | undefined {
  return solutions[slug];
}

export function getAllSolutions(): SolutionData[] {
  return Object.values(solutions);
}

export function getRelatedSolutions(slugs: string[]): SolutionData[] {
  return slugs.map((s) => solutions[s]).filter(Boolean);
}
