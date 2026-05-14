import React from 'react';
import { SITE_URL, BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/config';

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    description: 'Premium corporate branding and merchandise solutions. We make brands visible in the real world.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      'https://instagram.com/brandbazar',
      'https://linkedin.com/company/brandbazar',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      availableLanguage: ['English'],
      telephone: `+${WHATSAPP_NUMBER}`,
    },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Corporate Branding Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Custom Corporate Gifts' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Employee Joining Kits' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Event Merchandise' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Custom Packaging' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Promotional Products' },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_NAME,
    description: 'Premium corporate branding and merchandise solutions',
    image: `${SITE_URL}/opengraph-image`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: '+91-99999-99999',
    priceRange: '₹₹',
    areaServed: 'IN',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
