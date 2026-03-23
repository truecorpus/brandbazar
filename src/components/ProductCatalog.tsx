import { useState } from "react";
import { ArrowRight } from "lucide-react";

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
  bestseller: "bg-[#E8F0FE] text-primary",
  new: "bg-[#E6F4EA] text-[#137333]",
};

const ProductCatalog = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = products.filter((p) => p.categories.includes(active));

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[13px] font-medium text-primary tracking-[0.5px]">Our Products</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Everything you can brand
          </h2>
          <p className="mt-4 text-muted-foreground text-[17px] leading-relaxed">
            From everyday essentials to premium corporate kits — every product is fully customizable with your logo, colors, and message.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                active === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground border border-border hover:text-foreground"
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
              className="group bg-background rounded-xl border border-border p-5 flex flex-col transition-all duration-200 hover:border-primary hover:shadow-[0_4px_12px_rgba(26,115,232,0.15)] animate-scale-in"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <div className="relative bg-secondary rounded-lg p-4 flex items-center justify-center mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                {product.badge && (
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-medium ${badgeStyles[product.badge.variant]}`}>
                    {product.badge.label}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-primary uppercase tracking-[0.8px] mb-1">Product</p>
              <h3 className="font-semibold text-[16px] text-foreground mb-1">{product.name}</h3>
              <p className="text-[13px] text-muted-foreground leading-[1.5] mb-3">{product.tagline}</p>
              <p className="text-[14px] font-semibold text-foreground mb-4">From {product.price}/unit</p>
              <button className="mt-auto text-[13px] font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                Customize <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-md border border-border text-sm font-medium text-foreground bg-background hover:bg-secondary transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
