export interface FAQCategory {
  id: string;
  label: string;
  description: string;
  accentColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  priority: 'high' | 'medium' | 'low';
  relatedLinks?: { label: string; href: string }[];
}
