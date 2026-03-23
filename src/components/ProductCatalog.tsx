import { useState } from "react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Corporate" | "Gifting" | "Apparel" | "Accessories";

interface Product {
  name: string;
  tagline: string;
  price: string;
  emoji: string;
  categories: Category[];
}

const products: Product[] = [
  { name: "Custom Mugs", tagline: "Sip in style with your brand", price: "₹149", emoji: "☕", categories: ["All", "Corporate", "Gifting"] },
  { name: "Branded T-Shirts", tagline: "Wearable identity for your team", price: "₹299", emoji: "👕", categories: ["All", "Corporate", "Apparel"] },
  { name: "Employee ID Cards", tagline: "Professional badges, instant credibility", price: "₹49", emoji: "🪪", categories: ["All", "Corporate"] },
  { name: "Embroidered Caps", tagline: "Top-notch brand visibility", price: "₹199", emoji: "🧢", categories: ["All", "Apparel", "Accessories"] },
  { name: "Custom Lamps", tagline: "Light up your workspace, your way", price: "₹499", emoji: "💡", categories: ["All", "Gifting"] },
  { name: "Branded Notebooks", tagline: "Every page carries your mark", price: "₹129", emoji: "📓", categories: ["All", "Corporate", "Gifting"] },
  { name: "Logo Keychains", tagline: "Small gift, lasting impression", price: "₹59", emoji: "🔑", categories: ["All", "Accessories", "Gifting"] },
  { name: "Corporate Welcome Kits", tagline: "Onboard with impact", price: "₹999", emoji: "🎁", categories: ["All", "Corporate"] },
];

const filters: Category[] = ["All", "Corporate", "Gifting", "Apparel", "Accessories"];

const ProductCatalog = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = products.filter((p) => p.categories.includes(active));

  return (
    <section className="relative z-10 py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-chip-navy">Our Products</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
            Everything You Can Brand
          </h2>
          <p className="mt-4 text-muted-foreground text-lg font-body">
            From everyday essentials to premium corporate kits — every product is fully customizable with your logo, colors, and message.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium font-body transition-all duration-200 ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-brand"
                  : "bg-surface-elevated text-muted-foreground border border-border hover:border-primary/20 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.name}
              className="group bg-surface-elevated rounded-xl border border-border p-6 flex flex-col items-center text-center
                         shadow-brand hover:shadow-brand-lg hover:border-accent/40 transition-all duration-300
                         animate-scale-in"
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
              <h3 className="font-display font-bold text-base text-primary">{product.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground font-body leading-relaxed">{product.tagline}</p>
              <p className="mt-3 text-sm font-bold text-accent font-body">Starting from {product.price}</p>
              <div className="mt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="cta" size="sm" className="w-full text-xs">
                  Customize Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
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
