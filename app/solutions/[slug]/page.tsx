import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutionBySlug, getAllSolutions } from '@/lib/solutions/data';
import { SolutionPageTemplate } from '@/components/solutions/SolutionPageTemplate';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const solutions = getAllSolutions();
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return { title: 'Solution Not Found' };

  return {
    title: solution.name,
    description: solution.description,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  return <SolutionPageTemplate solution={solution} />;
}
