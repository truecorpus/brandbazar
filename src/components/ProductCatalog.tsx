import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Corporate" | "Gifting" | "Apparel" | "Accessories";

interface Product {
  name: string;
  tagline: string;
  price: string;
  emoji: string;
  categories: Category[];
  badge?: { label: string; variant: "bestseller" | "new" };
  accent: string;
}

const products: Product[] = [
  { name: "Custom Mugs", tagline: "Sip in style with your brand", price: "₹149", emoji: "☕", categories: ["All", "Corporate", "Gifting"], badge: { label: "Bestseller", variant: "bestseller" }, accent: "217 91% 50%" },
  { name: "Branded T-Shirts", tagline: "Wearable identity for your team", price: "₹299", emoji: "👕", categories: ["All", "Corporate", "Apparel"], accent: "142 71% 45%" },
  { name: "Employee ID Cards", tagline: "Professional badges, instant credibility", price: "₹49", emoji: "🪪", categories: ["All", "Corporate"], badge: { label: "Bestseller", variant: "bestseller" }, accent: "346 77% 50%" },
  { name: "Embroidered Caps", tagline: "Top-notch brand visibility", price: "₹199", emoji: "🧢", categories: ["All", "Apparel", "Accessories"], accent: "262 60% 55%" },
  { name: "Custom Lamps", tagline: "Light up your workspace, your way", price: "₹499", emoji: "💡", categories: ["All", "Gifting"], badge: { label: "New", variant: "new" }, accent: "36 100% 49%" },
  { name: "Branded Notebooks", tagline: "Every page carries your mark", price: "₹129", emoji: "📓", categories: ["All", "Corporate", "Gifting"], accent: "15 80% 55%" },
  { name: "Logo Keychains", tagline: "Small gift, lasting impression", price: "₹59", emoji: "🔑", categories: ["All", "Accessories", "Gifting"], accent: "190 80% 42%" },
  { name: "Corporate Welcome Kits", tagline: "Onboard with impact", price: "₹999", emoji: "🎁", categories: ["All", "Corporate"], accent: "220 9% 20%" },
];

const filters: Category[] = ["All", "Corporate", "Gifting", "Apparel", "Accessories"];

const badgeStyles = {
  bestseller: "bg-primary/[0.08] text-primary border border-primary/[0.12]",
  new: "bg-[hsl(142_71%_45%/0.08)] text-[hsl(142_71%_45%)] border border-[hsl(142_71%_45%/0.12)]",
};

const ProductCatalog = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = products.filter((p) => p.categories.includes(active));

  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <p className="section-label">Our Products</p>
          <h2 className="section-heading">Everything you can brand</h2>
          <p className="section-subtext">
            From everyday essentials to premium corporate kits — every product is fully customizable with your logo, colors, and message.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-brand"
                  : "bg-background text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.name}
              className="group bg-background rounded-2xl border border-border p-5 flex flex-col transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
              style={{ boxShadow: 'var(--shadow-sm)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <div className="relative rounded-xl p-6 flex items-center justify-center mb-4" style={{ backgroundColor: `hsl(${product.accent} / 0.05)` }}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `hsl(${product.accent} / 0.1)` }}
                >
                  <span className="text-3xl">{product.emoji}</span>
                </div>
                {product.badge && (
                  <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeStyles[product.badge.variant]}`}>
                    {product.badge.label}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-[15px] text-foreground mb-1">{product.name}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 flex-1">{product.tagline}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <p className="text-[14px] font-semibold text-foreground">From {product.price}<span className="text-muted-foreground font-normal text-[12px]">/unit</span></p>
                <button className="text-[12px] font-medium text-primary flex items-center gap-1 hover:gap-1.5 transition-all duration-200">
                  Customize <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            <Sparkles size={14} />
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
