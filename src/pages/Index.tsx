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
      <section id="home" className="relative pt-[120px] pb-[100px] bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[55%_45%] gap-16 lg:gap-20 items-center">
            <div className="max-w-[480px]">
              <p className="text-[13px] font-medium text-primary tracking-[0.5px] animate-fade-up stagger-1">
                Corporate Gifting & Custom Printing
              </p>

              <h1 className="mt-5 text-[36px] sm:text-[48px] font-semibold leading-[1.2] tracking-tight text-foreground animate-fade-up stagger-2">
                Your Brand on Everything.
              </h1>

              <p className="mt-5 text-[17px] text-muted-foreground leading-[1.6] max-w-[480px] animate-fade-up stagger-3">
                Premium custom printed merchandise for corporate teams. Mugs, T-shirts, ID cards, caps and more — bulk pricing from 25 units.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up stagger-4">
                <Button variant="default" size="lg" className="px-7 py-3 text-sm font-medium" onClick={() => scrollTo("quote")}>
                  Get a Free Quote
                  <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" className="px-7 py-3 text-sm font-medium" onClick={() => scrollTo("products")}>
                  Browse Products
                </Button>
              </div>

              <p className="mt-8 text-[13px] text-[hsl(var(--muted-foreground))] animate-fade-up stagger-5">
                500+ Corporate Clients · 50,000+ Orders Delivered · Pan-India Shipping
              </p>
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
