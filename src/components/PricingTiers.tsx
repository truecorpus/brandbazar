import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    units: "25–99 units",
    price: "₹149–₹499",
    perUnit: "per unit",
    popular: false,
    features: [
      "All standard product categories",
      "Single-color logo printing",
      "Standard 10-day delivery",
      "Email support",
      "Basic design assistance",
      "Quality inspection report",
    ],
  },
  {
    name: "Business",
    units: "100–499 units",
    price: "₹99–₹399",
    perUnit: "per unit",
    popular: true,
    features: [
      "Full product catalog access",
      "Multi-color & full-wrap printing",
      "Priority 5-day delivery",
      "Dedicated account manager",
      "Free design mockups (3 revisions)",
      "Custom packaging options",
    ],
  },
  {
    name: "Enterprise",
    units: "500+ units",
    price: "Custom",
    perUnit: "quote",
    popular: false,
    features: [
      "White-label & co-branded solutions",
      "Pantone color matching",
      "Express 72-hour delivery available",
      "Dedicated success team",
      "Unlimited design revisions",
      "Pan-India multi-location delivery",
    ],
  },
];

const PricingTiers = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-chip">Volume Pricing</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
            Transparent Bulk Pricing
          </h2>
          <p className="mt-4 text-muted-foreground text-lg font-body">
            The more you order, the more you save. Every tier includes premium print quality and dedicated support.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-shadow duration-300 ${
                tier.popular
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-lg)] scale-[1.02] border-2 border-accent"
                  : "bg-card border border-border shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold font-body px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className={`font-display font-bold text-xl ${tier.popular ? "text-primary-foreground" : "text-primary"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm font-body mt-1 ${tier.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {tier.units}
                </p>
              </div>

              <div className="mb-8">
                <span className={`font-display font-extrabold text-3xl ${tier.popular ? "text-accent" : "text-primary"}`}>
                  {tier.price}
                </span>
                <span className={`text-sm font-body ml-2 ${tier.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {tier.perUnit}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={16} className={`mt-0.5 shrink-0 ${tier.popular ? "text-accent" : "text-accent"}`} />
                    <span className={`text-sm font-body ${tier.popular ? "text-primary-foreground/90" : "text-foreground"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "cta" : "outline"}
                className={`w-full ${tier.popular ? "" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}
              >
                {tier.name === "Enterprise" ? "Contact Sales" : "Get Quote"}
                <ArrowRight size={16} />
              </Button>
            </div>
          ))}
        </div>

        {/* Fine Print */}
        <p className="text-center mt-10 text-sm text-muted-foreground font-body">
          All prices exclusive of GST. Final quote provided after design review. Prices vary by product category and customization complexity.
        </p>
      </div>
    </section>
  );
};

export default PricingTiers;
