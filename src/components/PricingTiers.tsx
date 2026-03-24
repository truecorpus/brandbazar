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
    <section className="py-20 lg:py-24 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-14">
          <p className="section-label">Volume Pricing</p>
          <h2 className="section-heading">Transparent bulk pricing</h2>
          <p className="section-subtext">
            The more you order, the more you save. Every tier includes premium print quality and dedicated support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                tier.popular
                  ? "bg-foreground text-background border-2 border-primary scale-[1.02] lg:scale-105"
                  : "bg-background border border-border hover:border-primary/30 hover:-translate-y-1"
              }`}
              style={{ boxShadow: tier.popular ? 'var(--shadow-xl)' : 'var(--shadow-sm)' }}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-medium px-4 py-1 rounded-full shadow-brand">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className={`font-heading font-semibold text-[17px] ${tier.popular ? "text-background" : "text-foreground"}`}>
                  {tier.name}
                </h3>
                <p className={`text-[13px] mt-1 ${tier.popular ? "text-background/60" : "text-muted-foreground"}`}>
                  {tier.units}
                </p>
              </div>

              <div className="mb-7">
                <span className={`font-heading font-semibold text-[28px] ${tier.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {tier.price}
                </span>
                <span className={`text-[13px] ml-1.5 ${tier.popular ? "text-background/50" : "text-muted-foreground"}`}>
                  {tier.perUnit}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.popular ? "bg-primary/20" : "bg-primary/[0.06]"}`}>
                      <Check size={11} className={tier.popular ? "text-primary-foreground" : "text-primary"} />
                    </div>
                    <span className={`text-[13px] leading-relaxed ${tier.popular ? "text-background/80" : "text-muted-foreground"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className={`w-full ${tier.popular ? "bg-primary text-primary-foreground shadow-brand" : ""}`}
              >
                {tier.name === "Enterprise" ? "Contact Sales" : "Get Quote"}
                <ArrowRight size={14} />
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-[12px] text-muted-foreground">
          All prices exclusive of GST. Final quote provided after design review. Prices vary by product category and customization complexity.
        </p>
      </div>
    </section>
  );
};

export default PricingTiers;
