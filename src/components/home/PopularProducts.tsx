import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productImages } from "@/assets/products";

interface Product {
  name: string;
  tagline: string;
  price: string;
  imageKey: string;
  badge?: string;
  slug: string;
}

const popularProducts: Product[] = [
  { name: "Classic White Ceramic Mug", tagline: "Sip in style with your brand", price: "₹149", imageKey: "mug", badge: "Bestseller", slug: "classic-white-ceramic-mug" },
  { name: "Premium Cotton T-Shirt", tagline: "Wearable identity for your team", price: "₹299", imageKey: "tshirt", slug: "premium-cotton-round-neck-tshirt" },
  { name: "PVC ID Card", tagline: "Professional badges, instant credibility", price: "₹49", imageKey: "idcard", badge: "Bestseller", slug: "pvc-id-card" },
  { name: "Classic Baseball Cap", tagline: "Top-notch brand visibility", price: "₹199", imageKey: "cap", slug: "classic-baseball-cap" },
  { name: "Magic Color-Changing Mug", tagline: "Heat-activated brand reveal", price: "₹249", imageKey: "mug-magic", badge: "New", slug: "magic-color-changing-mug" },
  { name: "ID Card with Lanyard Set", tagline: "Complete badge solution", price: "₹99", imageKey: "idcard", slug: "id-card-lanyard-set" },
  { name: "A5 Hardcover Notebook", tagline: "Every page carries your mark", price: "₹129", imageKey: "notebook", slug: "a5-hardcover-notebook" },
  { name: "Premium Snapback Cap", tagline: "Street-style brand visibility", price: "₹249", imageKey: "cap", slug: "premium-snapback-cap" },
];

const PopularProducts = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 lg:py-24 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <p className="section-label">Popular Products</p>
          <h2 className="section-heading">Most customized by businesses</h2>
          <p className="section-subtext">
            Bestselling products with your logo, colors, and message. From ₹49/unit with bulk discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularProducts.map((product) => (
            <div
              key={product.name}
              className="group bg-background rounded-2xl border border-border overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 cursor-pointer"
              style={{ boxShadow: "var(--shadow-sm)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}
              onClick={() => navigate(`/customize/${product.slug}`)}
            >
              <div className="relative h-44 overflow-hidden bg-secondary">
                <img
                  src={productImages[product.imageKey]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={300}
                  height={176}
                />
                {product.badge && (
                  <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    product.badge === "New"
                      ? "bg-[hsl(142_71%_45%/0.1)] text-[hsl(142_71%_45%)] border border-[hsl(142_71%_45%/0.15)]"
                      : "bg-primary/[0.08] text-primary border border-primary/[0.12]"
                  }`}>
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-background/90 text-foreground border border-border/60">
                  Customizable
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-[15px] text-foreground mb-1">{product.name}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 flex-1">{product.tagline}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <p className="text-[14px] font-semibold text-foreground">
                    From {product.price}<span className="text-muted-foreground font-normal text-[12px]">/unit</span>
                  </p>
                  <span className="text-[12px] font-medium text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
                    Customize <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => navigate("/shop")}
          >
            <Sparkles size={14} />
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
