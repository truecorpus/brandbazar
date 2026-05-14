import type { Metadata, Viewport } from 'next';
import './globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google';
import { StructuredData } from '@/components/seo/StructuredData';
import { Navbar } from '@/components/layout/Navbar';
import { QuoteProvider } from '@/lib/quote/QuoteContext';
import { QuoteDrawerProvider } from '@/components/quote/QuoteDrawerProvider';
import { QuoteDrawer } from '@/components/quote/QuoteDrawer';
import { BRAND_NAME, BRAND_TAGLINE, SITE_URL, GOOGLE_VERIFICATION, GA_MEASUREMENT_ID } from '@/lib/config';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const LoadingScreen = dynamic(
  () => import('@/components/effects/LoadingScreen').then((mod) => mod.LoadingScreen),
  { ssr: false }
);
const CursorGlow = dynamic(
  () => import('@/components/effects/CursorGlow').then((mod) => mod.CursorGlow),
  { ssr: false }
);
const SmoothScroll = dynamic(
  () => import('@/components/effects/SmoothScroll').then((mod) => mod.SmoothScroll),
  { ssr: false }
);

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    'We make brands visible in the real world. Corporate branding, employee kits, custom mugs, event merchandise, and promotional products for companies that care about every touchpoint.',
  keywords: [
    'corporate branding',
    'custom mugs',
    'employee kits',
    'promotional merchandise',
    'event branding',
    'corporate gifts',
    'custom bottles',
    'ID cards',
    'bulk branding',
    'branded merchandise India',
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${BRAND_NAME} | Premium Corporate Branding`,
    description: 'We make brands visible in the real world. Corporate branding, employee kits, and promotional merchandise.',
    url: SITE_URL,
    siteName: BRAND_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} - Premium Corporate Branding Solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} | Premium Corporate Branding`,
    description: 'We make brands visible in the real world.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: GOOGLE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F5F1E8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${poppins.variable} ${plusJakartaSans.variable}`}>
      <head>
        <StructuredData />
        {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-jakarta antialiased bg-ivory text-rich selection:bg-electric-100 selection:text-rich">
        <QuoteProvider>
          <QuoteDrawerProvider>
            <SmoothScroll>
              <LoadingScreen>
                <Navbar />
                <main>
                  {children}
                </main>
              </LoadingScreen>
            </SmoothScroll>
            <QuoteDrawer />
          </QuoteDrawerProvider>
        </QuoteProvider>
        <CursorGlow />
      </body>
    </html>
  );
}
