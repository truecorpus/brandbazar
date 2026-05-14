export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  headline: string;
  description: string;
  objective: string;
  products: string[];
  impact: string;
  metric: { value: string; label: string };
  layout: 'editorial-split' | 'fullscreen-overlay' | 'sticky-reveal' | 'horizontal-panel';
  accentColor: string;
  beforeState: string;
  afterState: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'techstart',
    client: 'TechStart Inc.',
    industry: 'Technology / SaaS',
    headline: 'A welcome that sets the standard.',
    description: 'When TechStart tripled their headcount in six months, they needed an onboarding experience that matched their culture. We designed a complete joining kit that turned first days into memorable brand moments.',
    objective: 'Create a cohesive onboarding identity for 200+ new hires across three offices.',
    products: ['Employee Joining Kit', 'Branded Notebook', 'Custom Mug', 'ID Card & Lanyard'],
    impact: 'Employee satisfaction with onboarding increased from 72% to 94%.',
    metric: { value: '200+', label: 'Kits Delivered' },
    layout: 'editorial-split',
    accentColor: '#4D7CFE',
    beforeState: 'Generic welcome packets',
    afterState: 'Curated brand experience',
  },
  {
    id: 'brewcraft',
    client: 'BrewCraft Coffee',
    industry: 'Food & Beverage',
    headline: 'From local favorite to recognizable brand.',
    description: 'BrewCraft wanted their merchandise to feel as crafted as their coffee. We developed a line of branded drinkware and packaging that told their origin story in every detail.',
    objective: 'Transform café merchandise into a premium brand extension.',
    products: ['Ceramic Mugs', 'Steel Bottles', 'Custom Packaging', 'Loyalty Cards'],
    impact: 'Merchandise sales became 18% of total revenue within the first quarter.',
    metric: { value: '3,500', label: 'Units Sold' },
    layout: 'fullscreen-overlay',
    accentColor: '#C9B8FF',
    beforeState: 'Plain white cups',
    afterState: 'Signature branded drinkware',
  },
  {
    id: 'edulearn',
    client: 'EduLearn Academy',
    industry: 'Education',
    headline: 'Pride in every uniform.',
    description: 'EduLearn needed student kits that inspired pride and belonging. We created a comprehensive identity system—from welcome packages to event materials—that students actually wanted to keep.',
    objective: 'Build school identity and student pride through premium branded materials.',
    products: ['Student Welcome Kit', 'Event Merchandise', 'ID Cards', 'Notebooks'],
    impact: 'Student engagement with school events increased by 40%.',
    metric: { value: '1,200', label: 'Students Reached' },
    layout: 'sticky-reveal',
    accentColor: '#E8D5C4',
    beforeState: 'Basic enrollment packets',
    afterState: 'Pride-building identity system',
  },
  {
    id: 'summit',
    client: 'Summit Conference',
    industry: 'Events / Corporate',
    headline: 'An event brand that travels.',
    description: 'Summit needed event merchandise that attendees would use long after the conference ended. We designed a cohesive merchandise ecosystem that turned every touchpoint into a brand impression.',
    objective: 'Create memorable event branding for 3,000+ attendees across a 3-day conference.',
    products: ['Event Tote Bags', 'Branded Bottles', 'Lanyards', 'Notebook Sets'],
    impact: 'Post-event brand recall reached 87% among attendees.',
    metric: { value: '3,000+', label: 'Attendees' },
    layout: 'horizontal-panel',
    accentColor: '#D4C4E8',
    beforeState: 'Generic conference swag',
    afterState: 'Premium event experience',
  },
];
