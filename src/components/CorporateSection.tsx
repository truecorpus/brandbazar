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
      <div className="py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[560px] mx-auto mb-12">
            <p className="section-label">For Businesses</p>
            <h2 className="section-heading">
              Built for businesses that mean business
            </h2>
            <p className="section-subtext">
              Whether you're onboarding 50 employees or gifting 5,000 clients — we're the partner that scales with you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valueProps.map((prop) => (
              <div key={prop.title} className="card-modern p-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/[0.06] flex items-center justify-center mb-4">
                  <span className="text-xl">{prop.icon}</span>
                </div>
                <h3 className="font-heading font-semibold text-[15px] text-foreground mb-2">{prop.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate CTA Block */}
      <div className="py-20 bg-foreground relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-xs font-medium text-primary uppercase tracking-[1.5px]">
            Corporate Partnership
          </p>
          <h2 className="mt-3 text-[32px] font-heading font-semibold text-background tracking-tight">
            Ready to brand at scale?
          </h2>
          <p className="mt-4 text-[16px] text-background/70 max-w-[560px] mx-auto leading-relaxed">
            Get a custom corporate merchandise plan tailored to your budget, timeline, and brand guidelines. No minimums on select products — just exceptional quality.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="default" size="lg" className="shadow-[0_4px_14px_rgba(26,115,232,0.35)]">
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
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-medium text-muted-foreground uppercase tracking-[1.5px] mb-8">
            Trusted by leading companies across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 lg:gap-8">
            {trustCompanies.map((company) => (
              <div
                key={company}
                className="px-6 py-3 rounded-xl bg-background border border-border text-[14px] font-medium text-muted-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[560px] mx-auto mb-12">
            <p className="section-label">Simple Process</p>
            <h2 className="section-heading">
              Three steps to branded brilliance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/[0.08] border border-primary/[0.15] mb-6">
                  <span className="font-heading font-semibold text-[16px] text-primary">{step.number}</span>
                </div>
                <h3 className="font-heading font-semibold text-[16px] text-foreground mb-2">{step.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;
