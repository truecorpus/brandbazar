import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import SEOHead from "@/components/SEOHead";
import CategoryGrid from "@/components/home/CategoryGrid";
import StartCustomizing from "@/components/home/StartCustomizing";
import PopularProducts from "@/components/home/PopularProducts";
import UseCases from "@/components/home/UseCases";
import CorporateSection from "@/components/CorporateSection";
import Testimonials from "@/components/Testimonials";
import PricingTiers from "@/components/PricingTiers";
import TrustBanner from "@/components/home/TrustBanner";
import FinalCTA from "@/components/home/FinalCTA";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="BrandBazaar — Design & Order Custom Merchandise for Your Business"
        description="Design custom branded merchandise online. T-shirts, mugs, caps, notebooks & corporate kits with your logo. Bulk pricing from 25 units. Start designing now!"
        canonical="https://brandbazar.lovable.app/"
        ogImage="https://brandbazar.lovable.app/og-image.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BrandBazaar",
          "description": "Design and order custom branded merchandise for your business. Premium quality, bulk pricing, fast delivery.",
          "url": "https://brandbazar.lovable.app",
          "contactPoint": { "@type": "ContactPoint", "telephone": "+91-98765-43210", "contactType": "sales" }
        }}
      />
      <Navbar />

      {/* Hero — Customization focused */}
      <section id="home" className="pt-28 sm:pt-32 lg:pt-[140px] pb-20 lg:pb-[100px] bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            <div className="max-w-[540px]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.06] border border-primary/[0.12] animate-fade-up stagger-1">
                <Sparkles size={12} className="text-primary" />
                <span className="text-[12px] font-medium text-primary tracking-wide">
                  Online Design Tool • No Design Skills Needed
                </span>
              </div>

              <h1 className="mt-7 text-[36px] sm:text-[44px] lg:text-[52px] font-heading font-semibold leading-[1.1] tracking-tight text-foreground animate-fade-up stagger-2">
                Design & Order Custom Merchandise{" "}
                <span className="text-gradient">for Your Business</span>
              </h1>

              <p className="mt-5 text-[15px] sm:text-[16px] text-muted-foreground leading-[1.7] max-w-[460px] animate-fade-up stagger-3">
                Upload your logo, customize colors & text, preview your design live — and order in bulk with pricing from just ₹49/unit.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up stagger-4">
                <Button variant="default" size="lg" className="rounded-xl px-7 h-12 text-[15px] font-semibold shadow-brand-lg gap-2" onClick={() => scrollTo("products")}>
                  Start Designing
                  <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl px-7 h-12 text-[15px] font-medium" onClick={() => scrollTo("quote")}>
                  Get Free Quote
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6 animate-fade-up stagger-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[22px] font-heading font-semibold text-foreground">500+</span>
                  <span className="text-[13px] text-muted-foreground leading-tight">Corporate<br />Clients</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex items-center gap-2.5">
                  <span className="text-[22px] font-heading font-semibold text-foreground">50K+</span>
                  <span className="text-[13px] text-muted-foreground leading-tight">Orders<br />Delivered</span>
                </div>
                <div className="w-px h-8 bg-border hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2.5">
                  <span className="text-[22px] font-heading font-semibold text-foreground">4.9★</span>
                  <span className="text-[13px] text-muted-foreground leading-tight">Average<br />Rating</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-fade-up stagger-3">
              <div className="relative w-full max-w-[480px]">
                <div className="rounded-2xl overflow-hidden border border-border" style={{ boxShadow: 'var(--shadow-xl)' }}>
                  <img
                    src={heroImage}
                    alt="Custom branded merchandise including mugs, t-shirts, notebooks and corporate gift boxes"
                    className="w-full h-auto object-cover"
                    width={1280}
                    height={720}
                    loading="eager"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-3 -left-3 sm:-left-5 bg-background rounded-xl border border-border px-4 py-3 flex items-center gap-3" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  <div className="w-9 h-9 rounded-lg bg-primary/[0.08] flex items-center justify-center">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Free Design Tool</p>
                    <p className="text-[11px] text-muted-foreground">Customize online instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust banner right after hero */}
      <TrustBanner />

      {/* Category Grid */}
      <div data-animate>
        <CategoryGrid />
      </div>

      {/* How It Works / Start Customizing */}
      <div data-animate>
        <StartCustomizing />
      </div>

      {/* Popular Products with Customize CTAs */}
      <div data-animate>
        <PopularProducts />
      </div>

      {/* Use Cases */}
      <div data-animate>
        <UseCases />
      </div>

      {/* Corporate Section */}
      <div id="corporate" data-animate>
        <CorporateSection />
      </div>

      {/* Testimonials + Stats */}
      <div id="about" data-animate>
        <Testimonials />
      </div>

      {/* Pricing Tiers */}
      <div data-animate>
        <PricingTiers />
      </div>

      {/* Strong Final CTA */}
      <div data-animate>
        <FinalCTA />
      </div>

      {/* Quote Form */}
      <div id="contact" data-animate>
        <QuoteForm />
      </div>

      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default Index;
