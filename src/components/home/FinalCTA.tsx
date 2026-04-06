import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const FinalCTA = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 surface-dot-pattern opacity-[0.03]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/[0.08] blur-[150px] pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-[28px] sm:text-[40px] font-heading font-semibold text-background tracking-tight leading-tight">
          Ready to put your brand on <span className="text-primary">everything?</span>
        </h2>
        <p className="mt-5 text-[16px] text-background/60 max-w-[520px] mx-auto leading-relaxed">
          Join 500+ businesses who trust BrandBazaar for their custom merchandise. Start designing today or get a free quote for your next order.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="rounded-xl px-8 h-12 text-[15px] font-semibold shadow-brand-lg gap-2"
            onClick={() => scrollTo("products")}
          >
            Start Designing
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl px-8 h-12 text-[15px] font-semibold border-background/20 text-background hover:bg-background hover:text-foreground gap-2"
            onClick={() => scrollTo("quote")}
          >
            Get Free Quote
          </Button>
        </div>

        <div className="mt-6">
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20customize%20products%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-background/50 hover:text-background transition-colors"
          >
            <MessageCircle size={14} />
            Or chat with us on WhatsApp for instant quotes
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["Bulk Discounts Available", "Free Design Assistance", "Fast Turnaround", "No MOQ for Samples"].map((tag) => (
            <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full bg-background/[0.06] text-background/50 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
