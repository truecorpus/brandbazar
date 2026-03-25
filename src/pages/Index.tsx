import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import ProductCatalog from "@/components/ProductCatalog";
import CorporateSection from "@/components/CorporateSection";
import Testimonials from "@/components/Testimonials";
import PricingTiers from "@/components/PricingTiers";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
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
      <Navbar />

      {/* Hero */}
      <section id="home" className="pt-28 sm:pt-32 lg:pt-[140px] pb-20 lg:pb-[100px] bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            <div className="max-w-[540px]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.06] border border-primary/[0.12] animate-fade-up stagger-1">
                <Sparkles size={12} className="text-primary" />
                <span className="text-[12px] font-medium text-primary tracking-wide">
                  Corporate Gifting & Custom Printing
                </span>
              </div>

              <h1 className="mt-7 text-[36px] sm:text-[44px] lg:text-[52px] font-heading font-semibold leading-[1.1] tracking-tight text-foreground animate-fade-up stagger-2">
                Your brand on{" "}
                <span className="text-gradient">everything.</span>
              </h1>

              <p className="mt-5 text-[15px] sm:text-[16px] text-muted-foreground leading-[1.7] max-w-[460px] animate-fade-up stagger-3">
                Premium custom printed merchandise for corporate teams. Mugs, T-shirts, ID cards, caps and more — bulk pricing from 25 units.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up stagger-4">
                <Button variant="default" size="lg" className="rounded-xl px-6 h-11 text-[14px] font-medium shadow-brand-lg" onClick={() => scrollTo("quote")}>
                  Get a Free Quote
                  <ArrowRight size={15} />
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl px-6 h-11 text-[14px] font-medium" onClick={() => scrollTo("products")}>
                  Browse Products
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
                  />
                </div>
                {/* Floating product cards */}
                <div className="absolute -bottom-4 -left-4 sm:-left-8">
                  <ProductGrid />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="products" data-animate>
        <ProductCatalog />
      </div>

      <div id="corporate" data-animate>
        <CorporateSection />
      </div>

      <div id="about" data-animate>
        <Testimonials />
      </div>

      <div data-animate>
        <PricingTiers />
      </div>

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
