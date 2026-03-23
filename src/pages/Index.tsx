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
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

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
      <section id="home" className="pt-[140px] pb-[100px] bg-background relative overflow-hidden">
        {/* Subtle decorative gradient orb */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[80px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[55%_45%] gap-16 lg:gap-20 items-center">
            <div className="max-w-[520px]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.15] animate-fade-up stagger-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[12px] font-medium text-primary tracking-wide">
                  Corporate Gifting & Custom Printing
                </span>
              </div>

              <h1 className="mt-6 text-[40px] sm:text-[52px] font-heading font-semibold leading-[1.15] tracking-tight text-foreground animate-fade-up stagger-2">
                Your Brand on{" "}
                <span className="text-primary">Everything.</span>
              </h1>

              <p className="mt-6 text-[16px] text-muted-foreground leading-[1.7] max-w-[460px] animate-fade-up stagger-3">
                Premium custom printed merchandise for corporate teams. Mugs, T-shirts, ID cards, caps and more — bulk pricing from 25 units.
              </p>

              <div className="mt-10 flex flex-wrap gap-3 animate-fade-up stagger-4">
                <Button variant="default" size="lg" className="rounded-xl px-7 h-12 text-[14px] font-medium shadow-[0_4px_14px_rgba(26,115,232,0.35)] hover:shadow-[0_6px_20px_rgba(26,115,232,0.4)]" onClick={() => scrollTo("quote")}>
                  Get a Free Quote
                  <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl px-7 h-12 text-[14px] font-medium" onClick={() => scrollTo("products")}>
                  Browse Products
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-5 animate-fade-up stagger-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center">
                    <span className="text-primary text-[12px] font-semibold">500+</span>
                  </div>
                  <span className="text-[13px] text-muted-foreground">Corporate Clients</span>
                </div>
                <div className="w-px h-5 bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center">
                    <span className="text-primary text-[12px] font-semibold">50K+</span>
                  </div>
                  <span className="text-[13px] text-muted-foreground">Orders Delivered</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ProductGrid />
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
