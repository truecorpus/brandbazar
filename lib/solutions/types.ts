export interface SolutionStat {
  value: string;
  label: string;
}

export interface SolutionProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface SolutionMockup {
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
}

export interface SolutionFAQ {
  question: string;
  answer: string;
}

export interface SolutionData {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  heroGradient: string;
  heroAccent: string;
  category: string;
  stats: SolutionStat[];
  process: SolutionProcessStep[];
  features: SolutionFeature[];
  mockups: SolutionMockup[];
  psychologyHeadline: string;
  psychologyPoints: string[];
  transformation: {
    before: string;
    after: string;
    narrative: string;
  };
  faqs: SolutionFAQ[];
  ctaHeadline: string;
  ctaSubheadline: string;
  relatedSlugs: string[];
}
