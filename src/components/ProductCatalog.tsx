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
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-chip-muted">Our Products</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Everything you can brand
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
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
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
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
              className="group bg-card rounded-lg border border-border p-6 flex flex-col items-center text-center
                         hover:shadow-brand-lg transition-all duration-300 animate-scale-in"
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
              <h3 className="font-semibold text-sm text-foreground">{product.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{product.tagline}</p>
              <p className="mt-3 text-sm font-semibold text-primary">Starting from {product.price}</p>
              <div className="mt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="default" size="sm" className="w-full text-xs">
                  Customize Now
                </Button>
              </div>
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
