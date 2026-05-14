export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  metric?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "BrandBazar didn't just print our logo on mugs—they translated our entire brand philosophy into physical objects our team uses every day.",
    author: 'Priya Sharma',
    role: 'Head of People Operations',
    company: 'TechStart Inc.',
    industry: 'Technology',
    metric: '200+ employee kits',
    featured: true,
  },
  {
    id: '2',
    quote: "The quality exceeded our expectations. Our clients actually comment on the merchandise we send them now—that never happened before.",
    author: 'Arjun Mehta',
    role: 'Marketing Director',
    company: 'Vertex Consulting',
    industry: 'Consulting',
    metric: '500+ client gifts',
  },
  {
    id: '3',
    quote: "From concept to delivery, the process was seamless. They handled everything—from design to bulk production—without us lifting a finger.",
    author: 'Kavita Reddy',
    role: 'Event Manager',
    company: 'Summit Conference',
    industry: 'Events',
    metric: '3,000+ event kits',
  },
  {
    id: '4',
    quote: "Our students actually keep their welcome kits. That says everything about the quality and thought that goes into their work.",
    author: 'Dr. Rahul Nair',
    role: 'Dean of Student Affairs',
    company: 'EduLearn Academy',
    industry: 'Education',
    metric: '1,200+ student kits',
  },
  {
    id: '5',
    quote: "We ordered 10,000 units for a nationwide campaign. Every single piece was consistent, on-time, and flawlessly branded.",
    author: 'Sonia Patel',
    role: 'Brand Manager',
    company: 'NutriLife Foods',
    industry: 'Consumer Goods',
    metric: '10,000+ units',
    featured: true,
  },
  {
    id: '6',
    quote: "The mockup previews alone saved us weeks of back-and-forth. Seeing our brand on products before production was a game-changer.",
    author: 'Vikram Joshi',
    role: 'Creative Director',
    company: 'Studio Nine',
    industry: 'Design Agency',
  },
];
