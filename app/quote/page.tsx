import type { Metadata } from 'next';
import { Suspense } from 'react';
import { QuoteBuilder } from '@/components/quote/QuoteBuilder';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Build your custom branding quote with BrandBazar. Select products, quantities, packaging, and timeline for a personalized bulk branding proposal.',
  keywords: ['branding quote', 'corporate merchandise quote', 'bulk branding', 'custom packaging quote', 'promotional products quote', 'BrandBazar'],
  openGraph: {
    title: 'Get a Quote | BrandBazar Bulk Branding',
    description: 'Configure your premium branding project and receive a detailed quote within 24 hours.',
    type: 'website',
  },
};

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <QuoteBuilder />
    </Suspense>
  );
}
