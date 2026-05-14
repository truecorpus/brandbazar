export interface TrustMetric {
  value: string;
  label: string;
  description: string;
}

export interface QualityCheckpoint {
  title: string;
  description: string;
  icon: string;
}

export const trustMetrics: TrustMetric[] = [
  {
    value: '50,000+',
    label: 'Products Delivered',
    description: 'Consistent quality at every scale',
  },
  {
    value: '98%',
    label: 'On-Time Delivery',
    description: 'Your deadlines are our priority',
  },
  {
    value: '99.7%',
    label: 'Quality Pass Rate',
    description: 'Rigorous inspection at every stage',
  },
  {
    value: '500+',
    label: 'Corporate Clients',
    description: 'Trusted by teams of all sizes',
  },
];

export const qualityCheckpoints: QualityCheckpoint[] = [
  {
    title: 'Material Verification',
    description: 'Every batch tested for durability and finish quality',
    icon: 'shield',
  },
  {
    title: 'Color Accuracy',
    description: 'Pantone-matched printing with digital proofing',
    icon: 'palette',
  },
  {
    title: 'Print Precision',
    description: 'Resolution-checked at 300+ DPI for crisp branding',
    icon: 'focus',
  },
  {
    title: 'Packaging Integrity',
    description: 'Protective wrapping ensures pristine arrival',
    icon: 'package',
  },
  {
    title: 'Quantity Verification',
    description: 'Automated counting with ±0.1% accuracy',
    icon: 'check-circle',
  },
  {
    title: 'Final Inspection',
    description: 'Every item hand-checked before dispatch',
    icon: 'eye',
  },
];

export const workflowSteps = [
  { label: 'Order Received', time: 'Hour 0', icon: 'inbox' },
  { label: 'Design Confirmed', time: 'Day 1', icon: 'pen-tool' },
  { label: 'Production Started', time: 'Day 2', icon: 'settings' },
  { label: 'Quality Check', time: 'Day 6', icon: 'check-square' },
  { label: 'Packaging', time: 'Day 8', icon: 'package' },
  { label: 'Shipped', time: 'Day 10', icon: 'truck' },
];
