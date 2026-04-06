import { ArrowRight, Briefcase, Gift, CalendarDays, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: Briefcase,
    title: "Employee Kits",
    desc: "Onboarding kits, team uniforms, ID cards, and desk accessories — all branded with your company identity.",
    examples: "T-Shirts, Lanyards, Notebooks, Mugs",
    accent: "217 91% 50%",
  },
  {
    icon: Gift,
    title: "Corporate Gifting",
    desc: "Premium branded gifts for clients, partners, and stakeholders. Make every occasion memorable.",
    examples: "Gift Boxes, Lamps, Premium Kits",
    accent: "262 60% 55%",
  },
  {
    icon: CalendarDays,
    title: "Events & Conferences",
    desc: "Event merchandise, speaker kits, attendee swag bags — delivered on-time, every time.",
    examples: "Bags, Caps, Badges, Keychains",
    accent: "142 71% 45%",
  },
  {
    icon: Megaphone,
    title: "Marketing & Promos",
    desc: "Promotional merchandise that gets your brand noticed. Perfect for campaigns and trade shows.",
    examples: "Tote Bags, Pens, Stickers, Caps",
    accent: "36 100% 49%",
  },
];

const UseCases = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-14">
          <p className="section-label">Use Cases</p>
          <h2 className="section-heading">What are you customizing for?</h2>
          <p className="section-subtext">
            Whether you're onboarding employees or launching a campaign — we've got the perfect branded merchandise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="group bg-background rounded-2xl border border-border p-6 lg:p-7 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 flex gap-5"
              style={{ boxShadow: "var(--shadow-sm)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `hsl(${uc.accent} / 0.08)` }}
              >
                <uc.icon size={22} style={{ color: `hsl(${uc.accent})` }} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[16px] text-foreground mb-1.5">{uc.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{uc.desc}</p>
                <p className="text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider mb-3">
                  Popular: {uc.examples}
                </p>
                <button
                  onClick={() => scrollTo("products")}
                  className="text-[13px] font-medium text-primary flex items-center gap-1 hover:gap-1.5 transition-all duration-200"
                >
                  Browse Products <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
