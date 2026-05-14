import type { Metadata } from 'next';
import { ComingSoonClient } from './ComingSoonClient';
import { BRAND_NAME, SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: `Launching Soon | ${BRAND_NAME}`,
  description:
    'Something exceptional is coming. BrandBazar is crafting the future of corporate branding experiences. Join the waitlist for early access.',
  keywords: [
    'coming soon',
    'brand launch',
    'corporate branding',
    'premium branding',
    'waitlist',
    'early access',
    'BrandBazar',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Something Exceptional Is Coming | ${BRAND_NAME}`,
    description:
      'The future of corporate branding is being crafted. Join the waitlist for early access to BrandBazar.',
    url: `${SITE_URL}/coming-soon`,
    siteName: BRAND_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} — Launching Soon`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Launching Soon | ${BRAND_NAME}`,
    description: 'Something exceptional is being built. Join the waitlist.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/coming-soon',
  },
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
