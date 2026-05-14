import { HeroSection } from '@/components/sections/HeroSection';
import { ProductStorytelling } from '@/components/sections/ProductStorytelling';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CaseStudySection } from '@/components/sections/CaseStudySection';
import { BulkTrustSection } from '@/components/sections/BulkTrustSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { FinalCTASection, FloatingCTA } from '@/components/sections/ConversionSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* Cinematic Hero Section */}
      <HeroSection />

      {/* Product Storytelling Section */}
      <ProductStorytelling />

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Case Study Section */}
      <CaseStudySection />

      {/* Bulk Order Trust Section */}
      <BulkTrustSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Floating CTA Button */}
      <FloatingCTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
