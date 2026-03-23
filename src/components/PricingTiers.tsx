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
    <section className="py-20 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <p className="section-label">Volume Pricing</p>
          <h2 className="section-heading">
            Transparent bulk pricing
          </h2>
          <p className="section-subtext">
            The more you order, the more you save. Every tier includes premium print quality and dedicated support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-8 flex flex-col transition-all duration-200 ${
                tier.popular
                  ? "bg-foreground text-background border-2 border-primary"
                  : "bg-background border border-border hover:border-primary hover:shadow-[0_4px_12px_rgba(26,115,232,0.15)]"
              }`}
              style={!tier.popular ? { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } : undefined}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-medium px-4 py-1 rounded-md">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className={`font-semibold text-[18px] ${tier.popular ? "text-background" : "text-foreground"}`}>
                  {tier.name}
                </h3>
                <p className={`text-[14px] mt-1 ${tier.popular ? "text-background/70" : "text-muted-foreground"}`}>
                  {tier.units}
                </p>
              </div>

              <div className="mb-8">
                <span className={`font-semibold text-[28px] ${tier.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {tier.price}
                </span>
                <span className={`text-[14px] ml-2 ${tier.popular ? "text-background/60" : "text-muted-foreground"}`}>
                  {tier.perUnit}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={16} className={`mt-0.5 shrink-0 ${tier.popular ? "text-primary-foreground" : "text-primary"}`} />
                    <span className={`text-[14px] ${tier.popular ? "text-background/90" : "text-muted-foreground"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className={`w-full ${tier.popular ? "bg-primary text-primary-foreground" : ""}`}
              >
                {tier.name === "Enterprise" ? "Contact Sales" : "Get Quote"}
                <ArrowRight size={16} />
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-[13px] text-muted-foreground">
          All prices exclusive of GST. Final quote provided after design review. Prices vary by product category and customization complexity.
        </p>
      </div>
    </section>
  );
};

export default PricingTiers;
