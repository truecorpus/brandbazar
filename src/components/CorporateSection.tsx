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
    <section className="relative">
      {/* Value Props */}
      <div className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge-chip">For Businesses</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Built for businesses that{" "}
              <span className="text-primary">mean business</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Whether you're onboarding 50 employees or gifting 5,000 clients — we're the partner that scales with you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="group bg-card rounded-lg border border-border p-6 hover:shadow-brand-lg transition-all duration-300"
              >
                <span className="text-3xl block mb-4">{prop.icon}</span>
                <h3 className="font-semibold text-base text-foreground mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate CTA Block */}
      <div className="py-20 lg:py-24 bg-foreground relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary-foreground border border-primary-foreground/10">
            Corporate Partnership
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-semibold text-background tracking-tight">
            Ready to brand at scale?
          </h2>
          <p className="mt-4 text-lg text-background/70 max-w-2xl mx-auto">
            Get a custom corporate merchandise plan tailored to your budget, timeline, and brand guidelines.
            No minimums on select products — just exceptional quality.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="default" size="lg">
              Start Corporate Inquiry
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-background/30 text-background hover:bg-background hover:text-foreground"
            >
              Download Corporate Catalog
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Row */}
      <div className="py-12 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by leading companies across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
            {trustCompanies.map((company) => (
              <div
                key={company}
                className="px-6 py-3 rounded-md bg-card border border-border text-sm font-medium text-muted-foreground"
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
            <span className="badge-chip-muted">Simple Process</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Three steps to branded brilliance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                  <span className="font-semibold text-xl text-primary">{step.number}</span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;
