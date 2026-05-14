import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { ManifestoSection } from '@/components/about/ManifestoSection';
import { FounderPhilosophy } from '@/components/about/FounderPhilosophy';
import { CraftsmanshipSection } from '@/components/about/CraftsmanshipSection';
import { ProcessPhilosophy } from '@/components/about/ProcessPhilosophy';
import { ValuesSection } from '@/components/about/ValuesSection';
import { StudioAtmosphere } from '@/components/about/StudioAtmosphere';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'BrandBazar is a premium corporate branding studio built on the belief that every touchpoint is a brand moment. Discover our philosophy, craftsmanship, and process.',
  openGraph: {
    title: 'About BrandBazar | Premium Corporate Branding Studio',
    description:
      'A branding studio obsessed with the invisible details that make brands unforgettable.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          CINEMATIC HERO
          Full viewport, atmospheric orbs, oversized headline
          ═══════════════════════════════════════════ */}
      <AboutHero />

      {/* ═══════════════════════════════════════════
          BRAND MANIFESTO
          Dark section, editorial large-type philosophy
          ═══════════════════════════════════════════ */}
      <ManifestoSection />

      {/* ═══════════════════════════════════════════
          FOUNDER PHILOSOPHY
          Asymmetric editorial layout, portrait + philosophy
          ═══════════════════════════════════════════ */}
      <FounderPhilosophy />

      {/* ═══════════════════════════════════════════
          CRAFTSMANSHIP
          Four pillars, animated counters, editorial grid
          ═══════════════════════════════════════════ */}
      <CraftsmanshipSection />

      {/* ═══════════════════════════════════════════
          PROCESS PHILOSOPHY
          Timeline approach, five phases, elegant nodes
          ═══════════════════════════════════════════ */}
      <ProcessPhilosophy />

      {/* ═══════════════════════════════════════════
          VALUES
          Dark grid, six beliefs, numbered editorial cards
          ═══════════════════════════════════════════ */}
      <ValuesSection />

      {/* ═══════════════════════════════════════════
          STUDIO ATMOSPHERE
          Visual grid, gradient cards, closing quote
          ═══════════════════════════════════════════ */}
      <StudioAtmosphere />

      {/* ═══════════════════════════════════════════
          CLOSING CTA
          Dark cinematic, dual CTAs, trust indicators
          ═══════════════════════════════════════════ */}
      <AboutCTA />
    </>
  );
}
