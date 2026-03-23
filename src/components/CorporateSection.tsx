import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const valueProps = [
  {
    icon: "📦",
    title: "Bulk Order Discounts",
    description: "Competitive pricing starting at just 25 units. The more you order, the more you save — up to 40% off on large volumes.",
  },
  {
    icon: "🏷️",
    title: "Brand Logo Printing & White-Label",
    description: "Full-color logo printing, embossing, engraving — your brand identity on every product, with white-label packaging available.",
  },
  {
    icon: "👤",
    title: "Dedicated Account Manager",
    description: "A single point of contact for your corporate orders. From design approval to delivery tracking, we handle everything.",
  },
  {
    icon: "⚡",
    title: "Express 5-Day Delivery",
    description: "Need it fast? Our express production line delivers branded products to your doorstep within 5 business days.",
  },
];

const steps = [
  { number: "01", title: "Share Requirements", description: "Tell us what you need — products, quantities, branding specs, and timeline." },
  { number: "02", title: "Get Custom Quote", description: "Receive a detailed proposal with pricing, mockups, and delivery schedule within 24 hours." },
  { number: "03", title: "Receive Branded Products", description: "We produce, quality-check, and ship your branded merchandise right to your office." },
];

const trustCompanies = ["TechCorp", "Innovate Inc", "GlobalFin", "StartupHQ", "MediaGroup"];

const CorporateSection = () => {
  return (
    <section className="relative z-10">
      {/* Value Props */}
      <div className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-chip">For Businesses</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
              Built for Businesses That{" "}
              <span className="text-accent">Mean Business</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg font-body">
              Whether you're onboarding 50 employees or gifting 5,000 clients — we're the partner that scales with you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, i) => (
              <div
                key={prop.title}
                className="group bg-surface-elevated rounded-xl border border-border p-6 hover:border-accent/30 hover:shadow-brand-lg transition-all duration-300"
              >
                <span className="text-4xl block mb-4">{prop.icon}</span>
                <h3 className="font-display font-bold text-lg text-primary mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate CTA Block */}
      <div className="py-20 lg:py-24 bg-primary relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 font-body">
            Corporate Partnership
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground tracking-tight">
            Ready to Brand at Scale?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto">
            Get a custom corporate merchandise plan tailored to your budget, timeline, and brand guidelines. 
            No minimums on select products — just exceptional quality.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="cta" size="xl">
              Start Corporate Inquiry
              <ArrowRight size={18} />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Download Corporate Catalog
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Row */}
      <div className="py-12 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-muted-foreground font-body uppercase tracking-widest mb-8">
            Trusted by leading companies across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
            {trustCompanies.map((company) => (
              <div
                key={company}
                className="px-6 py-3 rounded-lg bg-muted/50 border border-border text-sm font-medium text-muted-foreground font-body"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-chip-navy">Simple Process</span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
              Three Steps to Branded Brilliance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
                  <span className="font-display font-extrabold text-2xl text-accent">{step.number}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;
