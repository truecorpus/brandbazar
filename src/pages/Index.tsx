import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import ProductCatalog from "@/components/ProductCatalog";
import CorporateSection from "@/components/CorporateSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative grain-overlay">
      <Navbar />

      {/* Decorative geometric lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-28 lg:pt-36 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="animate-fade-up stagger-1">
                <span className="badge-chip">
                  <Sparkles size={14} />
                  Corporate Gifting Experts
                </span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-primary animate-fade-up stagger-2">
                Your Brand,{" "}
                <span className="text-accent">Printed to</span>{" "}
                Perfection
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed font-body animate-fade-up stagger-3">
                Premium customized merchandise for corporate teams — from branded 
                mugs to employee kits. Bulk pricing, white-label solutions, and 
                delivery in as fast as 72 hours.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-up stagger-4">
                <Button variant="cta" size="xl">
                  Get a Free Quote
                  <ArrowRight size={18} />
                </Button>
                <Button variant="outline" size="xl">
                  Browse Products
                </Button>
              </div>

              {/* Trust line */}
              <div className="mt-10 flex items-center gap-6 animate-fade-up stagger-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground font-body">
                    500+ Corporate Clients
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground font-body">
                    50,000+ Orders Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Product Grid */}
            <div className="flex justify-center lg:justify-end">
              <ProductGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
