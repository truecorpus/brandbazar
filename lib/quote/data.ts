import { QuoteProduct, PackagingOption, TimelineOption, BudgetOption } from './types';

export const quoteProducts: QuoteProduct[] = [
  {
    id: 'custom-mugs',
    name: 'Custom Mugs',
    description: 'Ceramic, stainless steel, and insulated drinkware',
    icon: 'Coffee',
    gradient: 'from-amber-100 via-orange-50 to-ivory',
    accentColor: '#F59E0B',
    minQty: 50,
    maxQty: 5000,
    defaultQty: 100,
    qtyStep: 50,
    priceRange: '₹120 – ₹450 per unit',
  },
  {
    id: 'branded-bottles',
    name: 'Branded Bottles',
    description: 'Premium water bottles and drinkware',
    icon: 'Droplets',
    gradient: 'from-cyan-100 via-sky-50 to-ivory',
    accentColor: '#06B6D4',
    minQty: 50,
    maxQty: 5000,
    defaultQty: 100,
    qtyStep: 50,
    priceRange: '₹180 – ₹650 per unit',
  },
  {
    id: 'employee-kits',
    name: 'Employee Kits',
    description: 'Curated onboarding and welcome packages',
    icon: 'Briefcase',
    gradient: 'from-emerald-100 via-teal-50 to-ivory',
    accentColor: '#10B981',
    minQty: 25,
    maxQty: 2000,
    defaultQty: 50,
    qtyStep: 25,
    priceRange: '₹800 – ₹3,500 per kit',
  },
  {
    id: 'apparel',
    name: 'Custom Apparel',
    description: 'T-shirts, hoodies, caps, and corporate wear',
    icon: 'Shirt',
    gradient: 'from-violet-100 via-purple-50 to-ivory',
    accentColor: '#8B5CF6',
    minQty: 50,
    maxQty: 5000,
    defaultQty: 100,
    qtyStep: 50,
    priceRange: '₹200 – ₹800 per piece',
  },
  {
    id: 'notebooks',
    name: 'Premium Notebooks',
    description: 'Hardbound, softcover, and leather journals',
    icon: 'BookOpen',
    gradient: 'from-rose-100 via-pink-50 to-ivory',
    accentColor: '#EC4899',
    minQty: 50,
    maxQty: 3000,
    defaultQty: 100,
    qtyStep: 50,
    priceRange: '₹150 – ₹550 per unit',
  },
  {
    id: 'tech-accessories',
    name: 'Tech Accessories',
    description: 'Chargers, earbuds, power banks, and more',
    icon: 'Smartphone',
    gradient: 'from-blue-100 via-indigo-50 to-ivory',
    accentColor: '#3B82F6',
    minQty: 50,
    maxQty: 3000,
    defaultQty: 100,
    qtyStep: 50,
    priceRange: '₹350 – ₹2,000 per piece',
  },
  {
    id: 'corporate-gifts',
    name: 'Corporate Gifts',
    description: 'Premium hampers and executive gifting sets',
    icon: 'Gift',
    gradient: 'from-red-100 via-orange-50 to-ivory',
    accentColor: '#EF4444',
    minQty: 25,
    maxQty: 2000,
    defaultQty: 50,
    qtyStep: 25,
    priceRange: '₹250 – ₹2,500 per unit',
  },
  {
    id: 'packaging',
    name: 'Custom Packaging',
    description: 'Boxes, mailers, and branded unboxing experiences',
    icon: 'Package',
    gradient: 'from-lime-100 via-green-50 to-ivory',
    accentColor: '#84CC16',
    minQty: 250,
    maxQty: 10000,
    defaultQty: 500,
    qtyStep: 250,
    priceRange: '₹25 – ₹180 per unit',
  },
];

export const packagingOptions: PackagingOption[] = [
  { id: 'standard', name: 'Standard Packaging', description: 'Clean, professional packaging with your branding' },
  { id: 'premium', name: 'Premium Gift Box', description: 'Rigid box with magnetic closure and custom inserts' },
  { id: 'eco', name: 'Sustainable Packaging', description: 'Plastic-free, recyclable, compostable materials' },
  { id: 'custom', name: 'Fully Custom', description: 'Bespoke packaging design tailored to your brand' },
];

export const timelineOptions: TimelineOption[] = [
  { id: 'express', label: 'Express', detail: '2–3 weeks' },
  { id: 'standard', label: 'Standard', detail: '4–6 weeks' },
  { id: 'relaxed', label: 'Relaxed', detail: '8–10 weeks' },
  { id: 'flexible', label: 'Flexible', detail: 'No fixed date' },
];

export const budgetOptions: BudgetOption[] = [
  { id: 'under-50k', label: 'Under ₹50,000' },
  { id: '50k-2l', label: '₹50,000 – ₹2 Lakhs' },
  { id: '2l-10l', label: '₹2 – ₹10 Lakhs' },
  { id: '10l-plus', label: '₹10 Lakhs+' },
  { id: 'discuss', label: 'Let\'s Discuss' },
];

export const brandColorOptions = [
  { name: 'Black', hex: '#111111' },
  { name: 'Navy', hex: '#1E3A5F' },
  { name: 'Electric Blue', hex: '#4D7CFE' },
  { name: 'Forest', hex: '#166534' },
  { name: 'Burgundy', hex: '#7F1D1D' },
  { name: 'Gold', hex: '#B8860B' },
  { name: 'Rose', hex: '#BE185D' },
  { name: 'Charcoal', hex: '#374151' },
  { name: 'Teal', hex: '#0D9488' },
  { name: 'Purple', hex: '#7C3AED' },
  { name: 'Orange', hex: '#EA580C' },
  { name: 'Custom', hex: 'custom' },
];

export const stepLabels = [
  'Products',
  'Details',
  'Brand Assets',
  'Timeline',
  'Review',
];

export function getProductById(id: string): QuoteProduct | undefined {
  return quoteProducts.find((p) => p.id === id);
}
