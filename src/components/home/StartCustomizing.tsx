import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Type, Eye, ShoppingCart } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Your Logo", desc: "Drop your logo or brand asset — we support PNG, SVG, AI, PSD" },
  { icon: Type, title: "Add Text & Colors", desc: "Customize text, pick brand colors, position elements perfectly" },
  { icon: Eye, title: "Preview Your Design", desc: "See a realistic preview of your branded product before ordering" },
  { icon: ShoppingCart, title: "Place Your Order", desc: "Select quantity, get instant pricing, and order with confidence" },
];

const StartCustomizing = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 surface-dot-pattern opacity-[0.4]" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <p className="section-label">How It Works</p>
          <h2 className="section-heading">Start designing in under 60 seconds</h2>
          <p className="section-subtext">
            Our online design tool makes it effortless to create professional branded merchandise. No design skills needed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary/20" />
              )}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/[0.06] border border-primary/[0.12] mb-4 relative">
                <step.icon size={24} className="text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-[15px] text-foreground mb-1.5">{step.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            size="lg"
            className="rounded-xl px-8 h-12 text-[15px] font-semibold shadow-brand-lg gap-2"
            onClick={() => scrollTo("products")}
          >
            Start Designing Now
            <ArrowRight size={16} />
          </Button>
          <p className="mt-3 text-[12px] text-muted-foreground">
            No account required to start • Free design tool • Bulk discounts available
          </p>
        </div>
      </div>
    </section>
  );
};

export default StartCustomizing;
