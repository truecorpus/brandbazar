import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productImages } from "@/assets/products";

const categories = [
  { name: "T-Shirts", slug: "tshirts", imageKey: "tshirt", desc: "Custom printed & embroidered", productSlug: "premium-cotton-round-neck-tshirt" },
  { name: "Mugs", slug: "mugs", imageKey: "mug", desc: "Ceramic, magic & steel", productSlug: "classic-white-ceramic-mug" },
  { name: "Caps & Hats", slug: "caps", imageKey: "cap", desc: "Embroidered & printed", productSlug: "classic-baseball-cap" },
  { name: "ID Cards", slug: "idcards", imageKey: "idcard", desc: "PVC & smart cards", productSlug: "pvc-id-card" },
  { name: "Notebooks", slug: "notebooks", imageKey: "notebook", desc: "Custom covers & branding", productSlug: "a5-hardcover-notebook" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <p className="section-label">Product Categories</p>
          <h2 className="section-heading">What do you want to customize?</h2>
          <p className="section-subtext">
            Pick a category and start designing — every product is fully customizable with your logo, colors, and text.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/customize/${cat.productSlug}`)}
              className="group bg-background rounded-2xl border border-border overflow-hidden text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-sm)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}
            >
              <div className="h-36 overflow-hidden bg-secondary">
                <img
                  src={productImages[cat.imageKey]}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={300}
                  height={144}
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-[14px] text-foreground mb-0.5">{cat.name}</h3>
                <p className="text-[12px] text-muted-foreground mb-2">{cat.desc}</p>
                <span className="text-[12px] font-medium text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all duration-200">
                  Customize Now <ArrowRight size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
