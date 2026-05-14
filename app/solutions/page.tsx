import type { Metadata } from 'next';
import { getAllSolutions } from '@/lib/solutions/data';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Premium corporate branding solutions: corporate gifting, employee welcome kits, startup branding, event branding, packaging, custom merchandise, and promotional systems.',
  openGraph: {
    title: 'BrandBazar Solutions | Premium Corporate Branding',
    description: 'Cinematic branding solutions designed to elevate every touchpoint.',
    type: 'website',
  },
};

export default function SolutionsPage() {
  const solutions = getAllSolutions();

  return (
    <>
      <SolutionsHero />
      <SolutionsGrid solutions={solutions} />
      <SolutionsCTA />
    </>
  );
}
