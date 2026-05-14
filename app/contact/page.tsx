import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ConsultationForm } from '@/components/contact/ConsultationForm';
import { ContactTrust } from '@/components/contact/ContactTrust';
import { ContactWhatsApp } from '@/components/contact/ContactWhatsApp';
import { ContactFAQ } from '@/components/contact/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a premium consultation with BrandBazar. Discuss your corporate branding, merchandise, packaging, or event branding project with our expert team.',
  openGraph: {
    title: 'Contact BrandBazar | Premium Branding Consultation',
    description: 'Start a conversation about your next branding project. Personalized consultation within 24 hours.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ConsultationForm />
      <ContactTrust />
      <ContactWhatsApp />
      <ContactFAQ />
    </>
  );
}
