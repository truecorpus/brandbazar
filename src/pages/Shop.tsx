import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Grid3X3, List, Heart, ChevronDown, Loader2 } from "lucide-react";
import { productImages } from "@/assets/products";

type Category = "All Products" | "Corporate Kits" | "Drinkware" | "Apparel" | "Desk & Office" | "Accessories" | "Recognition & Awards";

interface Product {
  id: number; name: string; category: Category; tagline: string; price: string;
  minUnits: string; badge?: "BESTSELLER" | "NEW" | "CORPORATE PICK" | "EXPRESS";
  tags: string[]; color: string; type: string; popularity: number; isNew?: boolean; featured?: boolean;
  slug: string;
}

const products: Product[] = [
  { id: 1, name: "Premium Ceramic Coffee Mug", category: "Drinkware", type: "mug", tagline: "Dishwasher safe · 11oz · Full wrap print available", price: "₹89", minUnits: "Min. 25 units", badge: "BESTSELLER", tags: ["Bulk Ready", "Logo Print", "Express"], color: "#E85D4A", popularity: 98, slug: "custom-mugs" },
  { id: 2, name: "Magic Color-Change Mug", category: "Drinkware", type: "mug-magic", tagline: "Heat-activated reveal · 11oz · Stunning brand impact", price: "₹149", minUnits: "Min. 25 units", badge: "NEW", tags: ["Heat Reactive", "Logo Print"], color: "#7C83DB", popularity: 85, isNew: true, slug: "magic-color-change-mug" },
  { id: 3, name: "360° Full-Print T-Shirt", category: "Apparel", type: "tshirt", tagline: "All-over sublimation · S–3XL · Vivid fade-proof colors", price: "₹349", minUnits: "Min. 50 units", badge: "CORPORATE PICK", tags: ["Full Print", "Team Wear"], color: "#1A73E8", popularity: 92, slug: "branded-tshirts" },
  { id: 4, name: "Premium Polo T-Shirt", category: "Apparel", type: "polo", tagline: "Cotton-poly blend · Embroidery-ready · Executive finish", price: "₹449", minUnits: "Min. 25 units", tags: ["Embroidery", "Premium"], color: "#34A853", popularity: 78, slug: "premium-polo-tshirt" },
  { id: 5, name: "PVC Corporate ID Card + Holder", category: "Corporate Kits", type: "idcard", tagline: "CR80 standard · Dual-sided print · Holder included", price: "₹29", minUnits: "Min. 100 units", badge: "BESTSELLER", tags: ["Bulk Ready", "Fast Print"], color: "#7C83DB", popularity: 95, slug: "employee-id-cards" },
  { id: 6, name: "Premium Lanyard Set", category: "Accessories", type: "lanyard", tagline: "20mm polyester · Full-color dye-sub · Safety breakaway clip", price: "₹39", minUnits: "Min. 50 units", tags: ["Logo Print", "Safety Clip"], color: "#EA4335", popularity: 70, slug: "premium-lanyard-set" },
  { id: 7, name: "LED Mood Lamp with Logo", category: "Desk & Office", type: "lamp", tagline: "Acrylic etching · USB-powered · 7-color LED cycle", price: "₹399", minUnits: "Min. 25 units", badge: "NEW", tags: ["USB Powered", "Logo Etch"], color: "#FBBC04", popularity: 88, isNew: true, slug: "custom-lamps" },
  { id: 8, name: "Spiral Hardcover Notebook", category: "Desk & Office", type: "notebook", tagline: "A5 · 200 pages · Debossed cover with custom inner pages", price: "₹119", minUnits: "Min. 50 units", tags: ["Deboss", "Custom Pages"], color: "#D63031", popularity: 74, slug: "branded-notebooks" },
  { id: 9, name: "Structured Embroidery Cap", category: "Apparel", type: "cap", tagline: "Adjustable buckle · 3D puff embroidery · 6-panel construction", price: "₹199", minUnits: "Min. 25 units", badge: "CORPORATE PICK", tags: ["Embroidery", "Adjustable"], color: "#3C4043", popularity: 82, slug: "embroidered-caps" },
  { id: 10, name: "Metal Keychain Set", category: "Accessories", type: "keychain", tagline: "Die-cast zinc alloy · Laser-engraved · Velvet pouch included", price: "₹59", minUnits: "Min. 50 units", tags: ["Laser Engrave", "Gift Box"], color: "#5F6368", popularity: 65, slug: "logo-keychains" },
  { id: 11, name: "Executive Corporate Gift Kit", category: "Corporate Kits", type: "kit", tagline: "Mug + Notebook + Pen + Keychain in branded magnetic box", price: "₹899", minUnits: "Min. 25 units", badge: "BESTSELLER", tags: ["All-in-One", "Premium Box", "White Label"], color: "#202124", popularity: 99, featured: true, slug: "corporate-welcome-kits" },
  { id: 12, name: "Custom Tote Bag", category: "Accessories", type: "tote", tagline: "12oz canvas · Full-color DTG print · Eco-friendly material", price: "₹149", minUnits: "Min. 50 units", badge: "EXPRESS", tags: ["Eco-Friendly", "Full Print"], color: "#E17055", popularity: 76, slug: "custom-tote-bag" },
];

const categories: Category[] = ["All Products", "Corporate Kits", "Drinkware", "Apparel", "Desk & Office", "Accessories", "Recognition & Awards"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "New Arrivals", value: "new" },
];

const ProductImage = ({ type, name }: { type: string; name: string }) => {
  const src = productImages[type];
  if (!src) return <div className="w-full h-full flex items-center justify-center bg-secondary"><div className="w-16 h-16 rounded-md border-2 border-dashed border-muted-foreground/30" /></div>;
  return <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" width={300} height={200} />;
};

const badgeStyles: Record<string, string> = {
  BESTSELLER: "bg-primary/[0.08] text-primary border border-primary/[0.12]",
  NEW: "bg-[hsl(142_71%_45%/0.08)] text-[hsl(142_71%_45%)] border border-[hsl(142_71%_45%/0.12)]",
  "CORPORATE PICK": "bg-primary/[0.08] text-primary border border-primary/[0.12]",
  EXPRESS: "bg-destructive/[0.08] text-destructive border border-destructive/[0.12]",
};

const BadgeLabel = ({ badge }: { badge: string }) => {
  return <span className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeStyles[badge] || "bg-secondary text-foreground"}`}>{badge}</span>;
};

const Shop = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSortDropdown(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("[data-shop-animate]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "All Products") result = result.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, ""))); break;
      case "price-desc": result.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, "")) - parseInt(a.price.replace(/[^\d]/g, ""))); break;
      case "popular": result.sort((a, b) => b.popularity - a.popularity); break;
      case "new": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => b.popularity - a.popularity); break;
    }
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const displayed = filtered.slice(0, visibleCount);
  const handleLoadMore = () => { setLoading(true); setTimeout(() => { setVisibleCount((v) => v + 4); setLoading(false); }, 800); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Shop Hero */}
      <section className="pt-24 lg:pt-28 pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 animate-fade-up">
            <ol className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li className="text-border">›</li>
              <li className="text-foreground font-medium">Shop</li>
            </ol>
          </nav>
          <h1 className="text-[28px] sm:text-[36px] font-heading font-semibold text-foreground tracking-tight animate-fade-up stagger-1">
            Our Product Catalog
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground max-w-xl animate-fade-up stagger-2">
            Customize anything. Brand everything. Order in bulk.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-2xl border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 min-w-max">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(12); }} aria-label={`Filter by ${cat}`}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-brand" : "bg-background text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 w-36 lg:w-44 rounded-full border border-border bg-background text-[13px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <button onClick={() => setViewMode("grid")} aria-label="Grid view" className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><Grid3X3 size={14} /></button>
                <button onClick={() => setViewMode("list")} aria-label="List view" className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><List size={14} /></button>
              </div>
              <div ref={sortRef} className="relative">
                <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors bg-background">
                  {sortOptions.find((s) => s.value === sortBy)?.label || "Sort"}
                  <ChevronDown size={12} className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 bg-background border border-border rounded-xl py-1 min-w-[170px] z-50 animate-scale-in" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    {sortOptions.map((opt) => (
                      <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={`block w-full text-left px-3.5 py-2 text-[13px] transition-colors rounded-lg mx-0.5 ${sortBy === opt.value ? "text-primary font-medium bg-primary/[0.05]" : "text-foreground hover:bg-secondary"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[18px] font-heading font-semibold text-foreground mb-2">No products found</p>
            <p className="text-[14px] text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((product) => (
              <article key={product.id}
                onClick={() => navigate(`/customize/${product.slug}`)}
                className={`group relative bg-background rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 cursor-pointer ${product.featured ? "sm:col-span-2" : ""}`}
                style={{ boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {product.badge && <BadgeLabel badge={product.badge} />}
                <div className={`relative overflow-hidden bg-surface ${product.featured ? "h-48 sm:h-56" : "h-44"}`}>
                  <div className="group-hover:scale-[1.03] transition-transform duration-500 w-full h-full"><ProductImage type={product.type} name={product.name} /></div>
                  <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-background font-medium text-[13px] flex items-center gap-2">Customize Now <ArrowRight size={14} /></span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.8px] text-primary mb-1">{product.category}</p>
                  <h3 className={`font-heading font-semibold text-foreground leading-snug mb-1 ${product.featured ? "text-[16px]" : "text-[14px]"}`}>{product.name}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{product.tagline}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 2).map((tag) => <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface text-muted-foreground border border-border">{tag}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div>
                      <span className="text-[14px] font-semibold text-foreground">From {product.price}</span>
                      <span className="text-[10px] text-muted-foreground">/unit</span>
                    </div>
                    <button aria-label="Save product" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"><Heart size={13} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayed.map((product) => (
              <article key={product.id}
                onClick={() => navigate(`/customize/${product.slug}`)}
                className="group relative bg-background rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 flex flex-col sm:flex-row cursor-pointer"
                style={{ boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {product.badge && <BadgeLabel badge={product.badge} />}
                <div className="sm:w-[30%] h-36 sm:h-auto relative overflow-hidden shrink-0 bg-surface">
                  <div className="group-hover:scale-[1.03] transition-transform duration-500 w-full h-full"><ProductImage type={product.type} name={product.name} /></div>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.8px] text-primary mb-1">{product.category}</p>
                    <h3 className="font-heading font-semibold text-[14px] text-foreground mb-1">{product.name}</h3>
                    <p className="text-[12px] text-muted-foreground mb-3">{product.tagline}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface text-muted-foreground border border-border">{tag}</span>)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-3 border-t border-border/60">
                    <div>
                      <span className="text-[14px] font-semibold text-foreground">From {product.price}</span>
                      <span className="text-[10px] text-muted-foreground">/unit</span>
                    </div>
                    <button className="text-[12px] font-medium text-primary flex items-center gap-1 hover:gap-1.5 transition-all">
                      Customize <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length > visibleCount && (
          <div className="mt-10 text-center">
            <p className="text-[13px] text-muted-foreground mb-4">Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products</p>
            <Button variant="outline" size="lg" onClick={handleLoadMore} disabled={loading} className="min-w-[200px]">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Loading...</> : "Load More Products"}
            </Button>
          </div>
        )}
        {filtered.length <= visibleCount && filtered.length > 0 && (
          <p className="mt-8 text-center text-[13px] text-muted-foreground">Showing all {filtered.length} products</p>
        )}
      </main>

      {/* Corporate Callout */}
      <section data-shop-animate className="bg-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 surface-dot-pattern opacity-[0.02]" />
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-[26px] sm:text-[32px] font-heading font-semibold text-background tracking-tight">Ordering for your company?</h2>
          <p className="mt-4 text-background/55 text-[15px] max-w-[520px] mx-auto leading-relaxed">Get custom quotes, dedicated support, and bulk pricing on all products.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="default" size="default" className="shadow-brand-lg" onClick={() => window.location.href = "/#quote"}>Request Corporate Quote <ArrowRight size={14} /></Button>
            <a href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20a%20corporate%20quote%20for%20branded%20merchandise." target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="default" className="border-background/20 text-background hover:bg-background hover:text-foreground">WhatsApp Us</Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default Shop;
