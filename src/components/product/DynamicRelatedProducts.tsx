import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  product_images?: { image_url: string; is_primary: boolean | null }[];
}

interface Props {
  products: RelatedProduct[];
  categoryName: string;
}

const DynamicRelatedProducts = ({ products, categoryName }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const getPrimaryImage = (p: RelatedProduct) => {
    const imgs = p.product_images || [];
    const primary = imgs.find((i) => i.is_primary);
    return primary?.image_url || imgs[0]?.image_url || "/placeholder.svg";
  };

  return (
    <section className="border-t border-border bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            More in {categoryName}
          </h2>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scrollCarousel(-1)} className="w-9 h-9 rounded-md border border-border bg-background text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Scroll left">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scrollCarousel(1)} className="w-9 h-9 rounded-md border border-border bg-background text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Scroll right">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/_/${p.slug}`}
              className="shrink-0 w-[220px] snap-start bg-background rounded-xl border border-border p-5 flex flex-col items-center text-center transition-all duration-200 hover:border-primary hover:shadow-[0_4px_12px_rgba(26,115,232,0.15)]"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <div className="w-full h-32 rounded-lg bg-secondary overflow-hidden flex items-center justify-center mb-3">
                <img src={getPrimaryImage(p)} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">{p.name}</h4>
              <p className="text-[14px] font-semibold text-foreground mb-3">From ₹{p.base_price}/unit</p>
              <span className="text-[13px] font-medium text-primary flex items-center gap-1">
                View Details <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicRelatedProducts;
