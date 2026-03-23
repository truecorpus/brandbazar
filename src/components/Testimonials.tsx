import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "HR Director, TechNova Solutions",
    stars: 5,
    text: "We ordered 800 branded mugs and notebooks for our annual offsite. The print quality was impeccable, and everything arrived 3 days ahead of schedule. BrandBazaar has become our go-to vendor for all employee gifting.",
  },
  {
    name: "Rahul Sharma",
    role: "Marketing Head, GrowthStack",
    stars: 5,
    text: "As a startup, brand consistency matters to us. BrandBazaar delivered custom t-shirts, lanyards, and ID cards that looked premium without the premium price tag. Their design team even helped refine our logo placement.",
  },
  {
    name: "Ananya Desai",
    role: "Procurement Manager, Finserv Group",
    stars: 5,
    text: "Managing corporate gifts for 12 offices used to be a nightmare. With BrandBazaar's dedicated account manager, we now place a single order and they handle regional distribution. Absolute game-changer for our operations.",
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
    <span className="font-semibold text-4xl lg:text-5xl text-foreground">
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
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-chip-muted">Social Proof</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Why 500+ companies choose us
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Real feedback from HR leaders, marketing teams, and procurement managers who trust us with their brand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-lg p-8 border border-border hover:shadow-brand-lg transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 bg-card rounded-lg p-8 lg:p-12 border border-border"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter target={s.target} suffix={s.suffix} decimals={s.decimals} inView={inView} />
              <p className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest font-medium">
            Certified Quality & Compliance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["ISO 9001 Certified", "Eco-Friendly Inks", "BIS Approved Materials", "MSME Registered"].map((badge) => (
              <span key={badge} className="badge-chip-muted text-sm px-4 py-2">
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
