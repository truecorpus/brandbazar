import { useState } from "react";
import { Star, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Specifications", "Customization Guide", "Corporate Bulk Info", "Packaging", "Reviews"];

const specs = [
  ["Material", "Premium Ceramic (food-grade)"],
  ["Capacity", "330ml (11oz) / 450ml (15oz)"],
  ["Dimensions", "9.5cm H × 8cm Diameter"],
  ["Weight", "320g"],
  ["Print Area", "Full 360° wrap (22cm × 8cm)"],
  ["Dishwasher Safe", "Yes (tested 500+ washes)"],
  ["Microwave Safe", "Yes"],
  ["Minimum Order", "1 unit (retail) / 25 units (bulk pricing)"],
  ["Lead Time", "3–5 days (standard) / Next-day (express, 50+ units)"],
  ["MOQ for Pantone", "100 units"],
];

const customSteps = [
  { step: "01", title: "Choose Mug Color + Size", desc: "Pick from 5 body colors and two capacity options." },
  { step: "02", title: "Select Print Type", desc: "One-side, both-sides, or full 360° wrap printing." },
  { step: "03", title: "Upload Artwork or Request Design", desc: "Drop your file or let our team design for free." },
  { step: "04", title: "Review Digital Mockup", desc: "We send a photo-realistic mockup within 4 hours." },
  { step: "05", title: "Confirm & Pay", desc: "Production begins immediately after payment confirmation." },
];

const bulkPerks = [
  "Dedicated account manager assigned for 50+ unit orders",
  "Custom packaging with your brand colors & logo",
  "Individual name personalization per mug (+₹15/unit)",
  "Staggered delivery scheduling for events",
  "Net-30 payment terms for registered companies",
  "Free reorder guarantee — same quality, any quantity",
];

const packagingOptions = [
  { name: "Standard White Box", extra: "Included", desc: "Clean white corrugated box with foam insert. Reliable protection for all orders." },
  { name: "Branded Gift Box", extra: "+₹35/unit", desc: "Matte-finish gift box with your logo printed on the lid. Magnetic closure." },
  { name: "Premium Hamper Box", extra: "+₹80/unit", desc: "Luxury presentation box with satin lining, ribbon, and personalized message card." },
];

const reviews = [
  {
    name: "Sneha Kapoor", role: "HR Manager, CloudNine Tech",
    text: "We ordered 200 mugs for our Bangalore office — all with individual employee names and our company logo. The sublimation print quality was outstanding, colors were vivid even after months of dishwasher use. Delivery was 2 days ahead of schedule.",
    date: "March 2026", stars: 5,
  },
  {
    name: "Arjun Patel", role: "Founder, PixelForge Studios",
    text: "Ordered 50 mugs as client gifts for our startup. The 360° wrap print option made the design really pop. The team helped us adjust our logo placement for free. Packaging was premium — our clients loved the unboxing experience.",
    date: "February 2026", stars: 5,
  },
  {
    name: "Meera Joshi", role: "Event Coordinator, Summit Events",
    text: "Needed 500 branded mugs for a 3-day tech conference with a tight deadline. Their express delivery nailed it — all 500 arrived perfectly packed, zero breakage. The dedicated account manager kept me updated at every step.",
    date: "January 2026", stars: 5,
  },
];

const ratingBreakdown = [
  { stars: 5, pct: 89 },
  { stars: 4, pct: 8 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

const ProductDetailTabs = () => {
  const [activeTab, setActiveTab] = useState("Specifications");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Tab navigation */}
      <div className="overflow-x-auto scrollbar-hide border-b border-border mb-8">
        <div className="flex gap-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-body font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="animate-fade-up" key={activeTab}>
        {activeTab === "Specifications" && (
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border overflow-hidden">
              {specs.map(([key, val], i) => (
                <div key={key} className={`flex items-start gap-4 px-5 py-3.5 text-sm font-body ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                  <span className="font-semibold text-primary w-40 shrink-0">{key}</span>
                  <span className="text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Customization Guide" && (
          <div className="space-y-10">
            <div className="grid sm:grid-cols-5 gap-6">
              {customSteps.map((s, i) => (
                <div key={s.step} className="relative text-center">
                  {i < customSteps.length - 1 && (
                    <div className="hidden sm:block absolute top-6 left-[60%] w-[80%] h-px bg-border" />
                  )}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mb-3">
                    <span className="font-display font-extrabold text-sm text-accent">{s.step}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-primary mb-1">{s.title}</h4>
                  <p className="text-xs text-muted-foreground font-body">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h4 className="font-display font-bold text-base text-primary mb-3">Design Tips</h4>
              <ul className="space-y-2 text-sm font-body text-foreground">
                <li className="flex gap-2"><Check size={14} className="text-accent mt-0.5 shrink-0" /> Use CMYK color profile for accurate print colors</li>
                <li className="flex gap-2"><Check size={14} className="text-accent mt-0.5 shrink-0" /> Keep text at least 5mm from the edge of the print area</li>
                <li className="flex gap-2"><Check size={14} className="text-accent mt-0.5 shrink-0" /> 300 DPI minimum resolution for sharp, crisp prints</li>
                <li className="flex gap-2"><Check size={14} className="text-accent mt-0.5 shrink-0" /> Vector files (AI, SVG) recommended for logo-based designs</li>
              </ul>
            </div>

            <Button variant="outline" size="lg">
              <ArrowRight size={16} /> Download Design Template (PDF)
            </Button>
          </div>
        )}

        {activeTab === "Corporate Bulk Info" && (
          <div className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-4">
              {bulkPerks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <span className="text-accent mt-0.5">✦</span>
                  <p className="text-sm font-body text-foreground">{perk}</p>
                </div>
              ))}
            </div>

            {/* Mini process */}
            <div className="bg-primary rounded-2xl p-8 text-center">
              <h4 className="font-display font-bold text-xl text-primary-foreground mb-6">Corporate Order Process</h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {["Share Requirements", "Get Custom Quote", "Receive Branded Products"].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                        <span className="font-display font-bold text-accent text-sm">{i + 1}</span>
                      </div>
                      <p className="text-sm font-body text-primary-foreground/80">{step}</p>
                    </div>
                    {i < 2 && <ArrowRight size={16} className="text-primary-foreground/40 hidden sm:block" />}
                  </div>
                ))}
              </div>
              <Button variant="cta" size="lg" className="mt-8">Schedule a Call with Our Corporate Team</Button>
            </div>
          </div>
        )}

        {activeTab === "Packaging" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-6">
              {packagingOptions.map((pkg) => (
                <div key={pkg.name} className="bg-card rounded-xl border border-border p-6 text-center hover:border-accent/30 hover:shadow-brand-lg transition-all">
                  {/* CSS box illustration */}
                  <div className="w-20 h-16 mx-auto mb-4 rounded-lg border-2 border-muted-foreground/20 bg-muted/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded border border-dashed border-muted-foreground/20" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-primary">{pkg.name}</h4>
                  <p className="text-xs text-accent font-body font-semibold mt-1">{pkg.extra}</p>
                  <p className="text-xs text-muted-foreground font-body mt-2 leading-relaxed">{pkg.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-body text-center">
              All orders include bubble wrap protection · No plastic packaging on eco orders
            </p>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-8">
            {/* Summary bar */}
            <div className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center shrink-0">
                <p className="font-display font-extrabold text-5xl text-primary">4.9</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="fill-accent text-accent" />)}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">247 reviews</p>
              </div>
              <div className="flex-1 w-full space-y-1.5">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2 text-xs font-body">
                    <span className="w-6 text-right text-muted-foreground">{r.stars}★</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="w-8 text-muted-foreground">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.name} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={14} className="fill-accent text-accent" />)}
                  </div>
                  <p className="text-sm font-body text-foreground leading-relaxed mb-4">"{r.text}"</p>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold text-sm text-primary">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground font-body">{r.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[9px] font-body font-medium bg-emerald-500/10 text-emerald-600">✓ Verified</span>
                      <p className="text-[10px] text-muted-foreground font-body mt-0.5">{r.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">Write a Review</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailTabs;
