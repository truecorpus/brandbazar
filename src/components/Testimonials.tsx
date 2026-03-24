import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "HR Director, TechNova Solutions",
    stars: 5,
    text: "We ordered 800 branded mugs and notebooks for our annual offsite. The print quality was impeccable, and everything arrived 3 days ahead of schedule. BrandBazaar has become our go-to vendor.",
    initials: "PM",
    color: "217 91% 50%",
  },
  {
    name: "Rahul Sharma",
    role: "Marketing Head, GrowthStack",
    stars: 5,
    text: "As a startup, brand consistency matters to us. BrandBazaar delivered custom t-shirts, lanyards, and ID cards that looked premium without the premium price tag.",
    initials: "RS",
    color: "142 71% 45%",
  },
  {
    name: "Ananya Desai",
    role: "Procurement Manager, Finserv Group",
    stars: 5,
    text: "Managing corporate gifts for 12 offices used to be a nightmare. With BrandBazaar's dedicated account manager, we now place a single order and they handle regional distribution.",
    initials: "AD",
    color: "262 60% 55%",
  },
];

const stats = [
  { label: "Products Delivered", target: 50000, suffix: "+" },
  { label: "Corporate Clients", target: 500, suffix: "+" },
  { label: "On-Time Delivery", target: 99, suffix: "%" },
  { label: "Average Rating", target: 4.9, suffix: "★", decimals: 1 },
];

function AnimatedCounter({ target, suffix, decimals = 0, inView }: { target: number; suffix: string; decimals?: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span className="font-heading font-semibold text-3xl lg:text-4xl text-foreground">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

const Testimonials = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-14">
          <p className="section-label">Social Proof</p>
          <h2 className="section-heading">Why 500+ companies choose us</h2>
          <p className="section-subtext">
            Real feedback from HR leaders, marketing teams, and procurement managers who trust us with their brand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-background rounded-2xl border border-border p-6 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 relative"
              style={{ boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <Quote size={24} className="text-primary/10 absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={13} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-[14px] text-muted-foreground leading-[1.7] mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-background"
                  style={{ backgroundColor: `hsl(${t.color})` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-medium text-[13px] text-foreground">{t.name}</p>
                  <p className="text-[12px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-surface rounded-2xl p-8 lg:p-10 border border-border"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter target={s.target} suffix={s.suffix} decimals={s.decimals} inView={inView} />
              <p className="mt-1.5 text-[12px] text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground mb-5 uppercase tracking-[1.5px] font-medium">
            Certified Quality & Compliance
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["ISO 9001 Certified", "Eco-Friendly Inks", "BIS Approved Materials", "MSME Registered"].map((badge) => (
              <span key={badge} className="text-[12px] px-3.5 py-1.5 rounded-full bg-surface text-muted-foreground border border-border font-medium">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
