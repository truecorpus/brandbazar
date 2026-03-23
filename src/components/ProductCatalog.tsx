import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Corporate" | "Gifting" | "Apparel" | "Accessories";

interface Product {
  name: string;
  tagline: string;
  price: string;
  emoji: string;
  categories: Category[];
  badge?: { label: string; variant: "bestseller" | "new" };
}

const products: Product[] = [
  { name: "Custom Mugs", tagline: "Sip in style with your brand", price: "₹149", emoji: "☕", categories: ["All", "Corporate", "Gifting"], badge: { label: "Bestseller", variant: "bestseller" } },
  { name: "Branded T-Shirts", tagline: "Wearable identity for your team", price: "₹299", emoji: "👕", categories: ["All", "Corporate", "Apparel"] },
  { name: "Employee ID Cards", tagline: "Professional badges, instant credibility", price: "₹49", emoji: "🪪", categories: ["All", "Corporate"], badge: { label: "Bestseller", variant: "bestseller" } },
  { name: "Embroidered Caps", tagline: "Top-notch brand visibility", price: "₹199", emoji: "🧢", categories: ["All", "Apparel", "Accessories"] },
  { name: "Custom Lamps", tagline: "Light up your workspace, your way", price: "₹499", emoji: "💡", categories: ["All", "Gifting"], badge: { label: "New", variant: "new" } },
  { name: "Branded Notebooks", tagline: "Every page carries your mark", price: "₹129", emoji: "📓", categories: ["All", "Corporate", "Gifting"] },
  { name: "Logo Keychains", tagline: "Small gift, lasting impression", price: "₹59", emoji: "🔑", categories: ["All", "Accessories", "Gifting"] },
  { name: "Corporate Welcome Kits", tagline: "Onboard with impact", price: "₹999", emoji: "🎁", categories: ["All", "Corporate"] },
];

const filters: Category[] = ["All", "Corporate", "Gifting", "Apparel", "Accessories"];

const badgeStyles = {
  bestseller: "bg-primary/[0.08] text-primary",
  new: "bg-[#E6F4EA] text-[#137333]",
};

const ProductCatalog = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = products.filter((p) => p.categories.includes(active));

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <p className="section-label">Our Products</p>
          <h2 className="section-heading">
            Everything you can brand
          </h2>
          <p className="section-subtext">
            From everyday essentials to premium corporate kits — every product is fully customizable with your logo, colors, and message.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.name}
              className="card-modern group p-5 flex flex-col animate-scale-in"
            >
              <div className="relative bg-secondary/80 rounded-xl p-5 flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/[0.06] flex items-center justify-center group-hover:bg-primary/[0.12] transition-colors duration-300">
                  <span className="text-3xl">{product.emoji}</span>
                </div>
                {product.badge && (
                  <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium ${badgeStyles[product.badge.variant]}`}>
                    {product.badge.label}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-primary uppercase tracking-[1px] mb-1.5">Product</p>
              <h3 className="font-heading font-semibold text-[16px] text-foreground mb-1">{product.name}</h3>
              <p className="text-[13px] text-muted-foreground leading-[1.6] mb-3">{product.tagline}</p>
              <p className="text-[14px] font-semibold text-foreground mb-4">From {product.price}/unit</p>
              <button className="mt-auto text-[13px] font-medium text-primary flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200">
                Customize <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
