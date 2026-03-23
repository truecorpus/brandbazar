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
      <section id="home" className="relative pt-28 lg:pt-36 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="max-w-xl">
              <div className="animate-fade-up stagger-1">
                <span className="badge-chip">
                  Corporate Gifting Experts
                </span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-[52px] font-semibold leading-[1.1] tracking-tight text-foreground animate-fade-up stagger-2">
                Your brand,{" "}
                <span className="text-primary">printed to</span>{" "}
                perfection
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-fade-up stagger-3">
                Premium customized merchandise for corporate teams — from branded
                mugs to employee kits. Bulk pricing, white-label solutions, and
                delivery in as fast as 72 hours.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up stagger-4">
                <Button variant="default" size="lg" onClick={() => scrollTo("quote")}>
                  Get a free quote
                  <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollTo("products")}>
                  Browse products
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6 animate-fade-up stagger-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">500+ Corporate Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">50,000+ Orders Delivered</span>
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
