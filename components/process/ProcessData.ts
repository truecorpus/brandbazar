export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  trustPoint: string;
  duration: string;
  accentColor: string;
  visualType: 'discovery' | 'design' | 'mockup' | 'production' | 'quality' | 'packaging' | 'delivery';
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    headline: 'We listen first.',
    description: 'Every great brand experience starts with understanding. We dive deep into your brand identity, target audience, and objectives to ensure every product we create serves a strategic purpose.',
    trustPoint: 'Free brand consultation included',
    duration: '1-2 Days',
    accentColor: '#4D7CFE',
    visualType: 'discovery',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    headline: 'Concepts come alive.',
    description: 'Our design team translates your brand into physical concepts. Color palettes, typography, material selection, and layout—all meticulously crafted to reflect your brand\'s essence.',
    trustPoint: 'Unlimited design revisions',
    duration: '3-5 Days',
    accentColor: '#C9B8FF',
    visualType: 'design',
  },
  {
    id: 'mockups',
    number: '03',
    title: 'Mockups',
    headline: 'See before you commit.',
    description: 'Photorealistic 3D mockups and physical samples let you experience your branded products before production begins. Adjust, refine, perfect—until it\'s exactly right.',
    trustPoint: 'Photo-realistic 3D previews',
    duration: '2-3 Days',
    accentColor: '#E8D5C4',
    visualType: 'mockup',
  },
  {
    id: 'production',
    number: '04',
    title: 'Production',
    headline: 'Precision at scale.',
    description: 'ISO-certified production facilities bring your designs to life with state-of-the-art printing, engraving, and finishing techniques. Whether 50 units or 50,000, consistency is guaranteed.',
    trustPoint: 'ISO 9001 certified facilities',
    duration: '5-10 Days',
    accentColor: '#111111',
    visualType: 'production',
  },
  {
    id: 'quality',
    number: '05',
    title: 'Quality Check',
    headline: 'Nothing leaves unchecked.',
    description: 'Rigorous quality control at every stage. Color accuracy, material integrity, print precision, and finish quality—each item is inspected against our premium standards.',
    trustPoint: '99.7% quality pass rate',
    duration: '1-2 Days',
    accentColor: '#4D7CFE',
    visualType: 'quality',
  },
  {
    id: 'packaging',
    number: '06',
    title: 'Packaging',
    headline: 'The unboxing moment.',
    description: 'Custom packaging that extends the brand experience. From protective wrapping to presentation boxes, every layer is designed to create anticipation and delight.',
    trustPoint: 'Custom branded packaging',
    duration: '1-2 Days',
    accentColor: '#D4C4E8',
    visualType: 'packaging',
  },
  {
    id: 'delivery',
    number: '07',
    title: 'Delivery',
    headline: 'From us to you.',
    description: 'Carefully packed and shipped with real-time tracking. On-time delivery is our promise—because your events, launches, and onboarding dates don\'t wait.',
    trustPoint: '98% on-time delivery record',
    duration: '2-5 Days',
    accentColor: '#4D7CFE',
    visualType: 'delivery',
  },
];
