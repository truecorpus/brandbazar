export interface ProductStory {
  id: string;
  title: string;
  headline: string;
  description: string;
  benefit: string;
  layout: 'split-left' | 'split-right' | 'layered-center' | 'cinematic-stack' | 'floating-constellation' | 'panoramic' | 'editorial-grid';
  colorAccent: string;
  products: {
    name: string;
    position: string;
    delay: number;
    amplitude: number;
  }[];
}

export const productStories: ProductStory[] = [
  {
    id: 'mugs',
    title: 'Customized Coffee Mugs',
    headline: 'The daily reminder.',
    description: 'Every morning, your brand becomes part of someone\'s ritual. A mug isn\'t just drinkware—it\'s a daily touchpoint that keeps your company top of mind.',
    benefit: 'Starts conversations. Builds familiarity. Stays on desks for years.',
    layout: 'split-left',
    colorAccent: '#E8D5C4',
    products: [
      { name: 'Ceramic Mug', position: 'center', delay: 0, amplitude: 10 },
      { name: 'Travel Tumbler', position: 'offset', delay: 0.5, amplitude: 14 },
    ],
  },
  {
    id: 'bottles',
    title: 'Branded Bottles',
    headline: 'Hydration that travels.',
    description: 'From gym bags to conference tables, a branded bottle goes wherever your people go. Premium materials, lasting impression.',
    benefit: 'Your brand, everywhere they go. Sustainable. Memorable.',
    layout: 'split-right',
    colorAccent: '#C4D8E8',
    products: [
      { name: 'Steel Bottle', position: 'center', delay: 0.2, amplitude: 12 },
      { name: 'Glass Bottle', position: 'offset', delay: 0.7, amplitude: 8 },
    ],
  },
  {
    id: 'employee-kits',
    title: 'Employee Joining Kits',
    headline: 'The first hello.',
    description: 'First impressions last. Our curated onboarding kits transform Day One into a brand experience your new hires will never forget.',
    benefit: 'Sets the tone. Builds belonging. Shows you care.',
    layout: 'layered-center',
    colorAccent: '#D4C4E8',
    products: [
      { name: 'Welcome Box', position: 'center', delay: 0, amplitude: 6 },
      { name: 'Notebook', position: 'layered', delay: 0.3, amplitude: 10 },
      { name: 'Mug', position: 'layered', delay: 0.6, amplitude: 12 },
    ],
  },
  {
    id: 'id-cards',
    title: 'ID Cards & Lanyards',
    headline: 'Identity, worn with pride.',
    description: 'More than access cards. They\'re badges of belonging. Designed to reflect your culture and worn with pride by every team member.',
    benefit: 'Professional security. Brand visibility. Team unity.',
    layout: 'cinematic-stack',
    colorAccent: '#C4E8D4',
    products: [
      { name: 'ID Card', position: 'center', delay: 0, amplitude: 4 },
      { name: 'Lanyard', position: 'offset', delay: 0.4, amplitude: 8 },
    ],
  },
  {
    id: 'packaging',
    title: 'Custom Packaging',
    headline: 'The unboxing moment.',
    description: 'Before they see the product, they see the packaging. We design boxes that create anticipation and make unboxing an experience worth sharing.',
    benefit: 'Creates anticipation. Elevates perceived value. Instagram-worthy.',
    layout: 'editorial-grid',
    colorAccent: '#E8C4C4',
    products: [
      { name: 'Gift Box', position: 'large', delay: 0, amplitude: 8 },
      { name: 'Mailer Box', position: 'small', delay: 0.5, amplitude: 12 },
      { name: 'Pouch', position: 'small', delay: 0.8, amplitude: 10 },
    ],
  },
  {
    id: 'corporate-gifts',
    title: 'Corporate Gifts',
    headline: 'Gifts that build bridges.',
    description: 'The right gift at the right time strengthens relationships. From client appreciation to holiday giving, we craft gifts that feel personal and premium.',
    benefit: 'Strengthens relationships. Shows appreciation. Creates loyalty.',
    layout: 'floating-constellation',
    colorAccent: '#E8E0C4',
    products: [
      { name: 'Gift Set', position: 'center', delay: 0, amplitude: 10 },
      { name: 'Premium Box', position: 'orbit-1', delay: 0.3, amplitude: 14 },
      { name: 'Accessory', position: 'orbit-2', delay: 0.6, amplitude: 12 },
    ],
  },
  {
    id: 'notebooks',
    title: 'Premium Notebooks',
    headline: 'Ideas, bound in brand.',
    description: 'The best ideas deserve the best canvas. Our notebooks combine premium paper quality with impeccable branding for a writing experience that inspires.',
    benefit: 'Inspires creativity. Professional utility. Lasting presence.',
    layout: 'panoramic',
    colorAccent: '#C4C8E8',
    products: [
      { name: 'Hardcover Notebook', position: 'center', delay: 0, amplitude: 8 },
      { name: 'Softcover Journal', position: 'offset', delay: 0.4, amplitude: 12 },
    ],
  },
  {
    id: 'office-branding',
    title: 'Office Branding',
    headline: 'Your space, your story.',
    description: 'Transform your workplace into a brand experience. From wall graphics to desk accessories, we make every corner of your office speak your language.',
    benefit: 'Reinforces culture. Impresses visitors. Inspires teams.',
    layout: 'split-left',
    colorAccent: '#D8E8C4',
    products: [
      { name: 'Wall Graphics', position: 'center', delay: 0, amplitude: 6 },
      { name: 'Desk Accessories', position: 'offset', delay: 0.5, amplitude: 10 },
    ],
  },
];
