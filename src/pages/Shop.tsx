import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Grid3X3, List, Heart, ChevronDown, Loader2 } from "lucide-react";

type Category = "All Products" | "Corporate Kits" | "Drinkware" | "Apparel" | "Desk & Office" | "Accessories" | "Recognition & Awards";

interface Product {
  id: number; name: string; category: Category; tagline: string; price: string;
  minUnits: string; badge?: "BESTSELLER" | "NEW" | "CORPORATE PICK" | "EXPRESS";
  tags: string[]; color: string; type: string; popularity: number; isNew?: boolean; featured?: boolean;
}

const products: Product[] = [
  { id: 1, name: "Premium Ceramic Coffee Mug", category: "Drinkware", type: "mug", tagline: "Dishwasher safe · 11oz · Full wrap print available", price: "₹89", minUnits: "Min. 25 units", badge: "BESTSELLER", tags: ["Bulk Ready", "Logo Print", "Express"], color: "#E85D4A", popularity: 98 },
  { id: 2, name: "Magic Color-Change Mug", category: "Drinkware", type: "mug-magic", tagline: "Heat-activated reveal · 11oz · Stunning brand impact", price: "₹149", minUnits: "Min. 25 units", badge: "NEW", tags: ["Heat Reactive", "Logo Print"], color: "#7C83DB", popularity: 85, isNew: true },
  { id: 3, name: "360° Full-Print T-Shirt", category: "Apparel", type: "tshirt", tagline: "All-over sublimation · S–3XL · Vivid fade-proof colors", price: "₹349", minUnits: "Min. 50 units", badge: "CORPORATE PICK", tags: ["Full Print", "Team Wear"], color: "#1A73E8", popularity: 92 },
  { id: 4, name: "Premium Polo T-Shirt", category: "Apparel", type: "polo", tagline: "Cotton-poly blend · Embroidery-ready · Executive finish", price: "₹449", minUnits: "Min. 25 units", tags: ["Embroidery", "Premium"], color: "#34A853", popularity: 78 },
  { id: 5, name: "PVC Corporate ID Card + Holder", category: "Corporate Kits", type: "idcard", tagline: "CR80 standard · Dual-sided print · Holder included", price: "₹29", minUnits: "Min. 100 units", badge: "BESTSELLER", tags: ["Bulk Ready", "Fast Print"], color: "#7C83DB", popularity: 95 },
  { id: 6, name: "Premium Lanyard Set", category: "Accessories", type: "lanyard", tagline: "20mm polyester · Full-color dye-sub · Safety breakaway clip", price: "₹39", minUnits: "Min. 50 units", tags: ["Logo Print", "Safety Clip"], color: "#EA4335", popularity: 70 },
  { id: 7, name: "LED Mood Lamp with Logo", category: "Desk & Office", type: "lamp", tagline: "Acrylic etching · USB-powered · 7-color LED cycle", price: "₹399", minUnits: "Min. 25 units", badge: "NEW", tags: ["USB Powered", "Logo Etch"], color: "#FBBC04", popularity: 88, isNew: true },
  { id: 8, name: "Spiral Hardcover Notebook", category: "Desk & Office", type: "notebook", tagline: "A5 · 200 pages · Debossed cover with custom inner pages", price: "₹119", minUnits: "Min. 50 units", tags: ["Deboss", "Custom Pages"], color: "#D63031", popularity: 74 },
  { id: 9, name: "Structured Embroidery Cap", category: "Apparel", type: "cap", tagline: "Adjustable buckle · 3D puff embroidery · 6-panel construction", price: "₹199", minUnits: "Min. 25 units", badge: "CORPORATE PICK", tags: ["Embroidery", "Adjustable"], color: "#3C4043", popularity: 82 },
  { id: 10, name: "Metal Keychain Set", category: "Accessories", type: "keychain", tagline: "Die-cast zinc alloy · Laser-engraved · Velvet pouch included", price: "₹59", minUnits: "Min. 50 units", tags: ["Laser Engrave", "Gift Box"], color: "#5F6368", popularity: 65 },
  { id: 11, name: "Executive Corporate Gift Kit", category: "Corporate Kits", type: "kit", tagline: "Mug + Notebook + Pen + Keychain in branded magnetic box", price: "₹899", minUnits: "Min. 25 units", badge: "BESTSELLER", tags: ["All-in-One", "Premium Box", "White Label"], color: "#202124", popularity: 99, featured: true },
  { id: 12, name: "Custom Tote Bag", category: "Accessories", type: "tote", tagline: "12oz canvas · Full-color DTG print · Eco-friendly material", price: "₹149", minUnits: "Min. 50 units", badge: "EXPRESS", tags: ["Eco-Friendly", "Full Print"], color: "#E17055", popularity: 76 },
];

const categories: Category[] = ["All Products", "Corporate Kits", "Drinkware", "Apparel", "Desk & Office", "Accessories", "Recognition & Awards"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "New Arrivals", value: "new" },
];

const ProductVisual = ({ type, color }: { type: string; color: string }) => {
  const base = "w-full h-full flex items-center justify-center";
  switch (type) {
    case "mug": case "mug-magic":
      return (<div className={base}><div className="relative"><div className="w-20 h-24 rounded-b-xl rounded-t-md border-2 border-current/20" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}><div className="absolute top-3 left-2 right-2 h-10 rounded-sm border border-dashed border-current/20" style={{ backgroundColor: `${color}18` }} /><div className="absolute top-0 left-0 right-0 h-2 rounded-t-md" style={{ backgroundColor: color }} /></div><div className="absolute top-4 -right-4 w-5 h-12 rounded-r-full border-2 border-l-0" style={{ borderColor: `${color}66` }} /><div className="absolute top-2 left-2 w-3 h-8 rounded-full bg-white/40 blur-sm" />{type === "mug-magic" && <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}88` }} />}</div></div>);
    case "tshirt": case "polo":
      return (<div className={base}><div className="relative"><svg width="90" height="95" viewBox="0 0 90 95" fill="none"><path d="M20 15 L0 30 L10 40 L20 35 L20 90 L70 90 L70 35 L80 40 L90 30 L70 15 L60 5 Q45 -2 30 5 Z" fill={`${color}20`} stroke={`${color}88`} strokeWidth="1.5" /><path d="M30 5 Q45 15 60 5" stroke={`${color}88`} strokeWidth="1.5" fill="none" /><rect x="28" y="30" width="34" height="24" rx="3" fill={`${color}15`} stroke={`${color}44`} strokeWidth="1" strokeDasharray="3 2" /></svg>{type === "polo" && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-6 border border-current/20 rounded-b-sm" style={{ borderColor: `${color}66` }} />}</div></div>);
    case "idcard":
      return (<div className={base}><div className="relative"><div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8" style={{ backgroundColor: `${color}66` }} /><div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-4 rounded-t-full border border-b-0" style={{ borderColor: `${color}55` }} /><div className="w-[70px] h-[95px] rounded-md border-2 overflow-hidden" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}11, ${color}22)` }}><div className="h-5 w-full" style={{ backgroundColor: `${color}44` }} /><div className="p-2 space-y-1.5"><div className="w-8 h-8 rounded-full border mx-auto" style={{ borderColor: `${color}44` }} /><div className="w-10 h-1 rounded mx-auto" style={{ backgroundColor: `${color}33` }} /><div className="w-8 h-0.5 rounded mx-auto" style={{ backgroundColor: `${color}22` }} /></div></div></div></div>);
    case "cap":
      return (<div className={base}><div className="relative"><div className="w-24 h-14 rounded-t-full border-2 border-b-0" style={{ borderColor: `${color}66`, background: `linear-gradient(135deg, ${color}22, ${color}44)` }}><div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">{[0,1,2].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${color}88` }} />)}</div></div><div className="w-28 h-4 rounded-b-md -ml-2 border-2 border-t-0" style={{ borderColor: `${color}66`, backgroundColor: `${color}33` }} /><div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: `${color}88` }} /></div></div>);
    case "lamp":
      return (<div className={base}><div className="relative flex flex-col items-center"><div className="absolute top-0 w-16 h-20 rounded-full blur-xl opacity-40" style={{ backgroundColor: color }} /><div className="relative w-12 h-20 rounded-t-md border" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}22, transparent)` }}><div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded border border-dashed" style={{ borderColor: `${color}55` }} /></div><div className="w-16 h-3 rounded-b-md" style={{ backgroundColor: `${color}44` }} /></div></div>);
    case "notebook":
      return (<div className={base}><div className="relative" style={{ transform: "rotate(-5deg)" }}><div className="absolute top-1 left-1 w-[65px] h-[85px] rounded-md" style={{ backgroundColor: `${color}22` }} /><div className="w-[65px] h-[85px] rounded-md border-2 relative" style={{ borderColor: `${color}55`, background: `linear-gradient(135deg, ${color}22, ${color}38)` }}><div className="absolute top-0 left-0 w-2 h-full rounded-l-md" style={{ backgroundColor: `${color}55` }} /><div className="absolute top-5 left-5 right-3 h-10 rounded border border-dashed" style={{ borderColor: `${color}44` }}><div className="w-6 h-1 rounded mx-auto mt-3" style={{ backgroundColor: `${color}33` }} /></div></div></div></div>);
    case "keychain":
      return (<div className={base}><div className="relative flex flex-col items-center"><div className="w-8 h-8 rounded-full border-2" style={{ borderColor: `${color}88` }} /><div className="w-1 h-3" style={{ backgroundColor: `${color}66` }} /><div className="w-14 h-16 rounded-md border-2 flex items-center justify-center" style={{ borderColor: `${color}66`, background: `linear-gradient(135deg, ${color}15, ${color}30)` }}><div className="w-8 h-8 rounded border border-dashed" style={{ borderColor: `${color}44` }} /></div></div></div>);
    case "kit":
      return (<div className={base}><div className="relative"><div className="absolute top-0 left-3 w-20 h-20 rounded-md border" style={{ borderColor: `${color}33`, background: `${color}11` }} /><div className="absolute top-2 left-1 w-20 h-20 rounded-md border" style={{ borderColor: `${color}44`, background: `${color}18` }} /><div className="relative top-4 w-20 h-20 rounded-md border-2" style={{ borderColor: `${color}66`, background: `linear-gradient(135deg, ${color}15, ${color}30)` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded border border-dashed" style={{ borderColor: `${color}44` }} /><div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-b" style={{ backgroundColor: `#FBBC04` }} /></div></div></div>);
    case "lanyard":
      return (<div className={base}><div className="relative flex flex-col items-center"><div className="w-16 h-6 rounded-t-full border border-b-0" style={{ borderColor: `${color}55` }} /><div className="w-6 h-24 rounded-b border-2" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}22, ${color}38)` }}><div className="mt-2 mx-auto w-3 h-14 rounded-sm border border-dashed" style={{ borderColor: `${color}44` }} /></div></div></div>);
    case "tote":
      return (<div className={base}><div className="relative"><div className="absolute -top-4 left-3 w-4 h-6 rounded-t-full border-2 border-b-0" style={{ borderColor: `${color}66` }} /><div className="absolute -top-4 right-3 w-4 h-6 rounded-t-full border-2 border-b-0" style={{ borderColor: `${color}66` }} /><div className="w-[72px] h-[80px] rounded-b-md border-2" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}15, ${color}28)` }}><div className="mt-4 mx-auto w-10 h-10 rounded border border-dashed flex items-center justify-center" style={{ borderColor: `${color}44` }}><div className="w-5 h-1 rounded" style={{ backgroundColor: `${color}33` }} /></div></div></div></div>);
    default:
      return <div className={base}><div className="w-16 h-16 rounded-md border-2 border-dashed border-muted-foreground/30" /></div>;
  }
};

const BadgeLabel = ({ badge }: { badge: string }) => {
  const colors: Record<string, string> = {
    BESTSELLER: "bg-amber-100 text-amber-700",
    NEW: "bg-emerald-100 text-emerald-700",
    "CORPORATE PICK": "bg-primary/10 text-primary",
    EXPRESS: "bg-orange-100 text-orange-700",
  };
  return <span className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${colors[badge] || "bg-muted text-foreground"}`}>{badge}</span>;
};

const Shop = () => {
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
  const handleLoadMore = () => { setLoading(true); setTimeout(() => { setVisibleCount((v) => v + 4); setLoading(false); }, 1000); };

  const marqueeItems = ["🏆 500+ Corporate Clients", "⚡ 5-Day Express Delivery", "🎨 Full-Color Custom Printing", "📦 Bulk Orders from 25 Units", "✅ GST Invoice Provided", "🎯 Dedicated Account Managers", "🇮🇳 Pan-India Delivery"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Shop Hero */}
      <section className="relative pt-20 lg:pt-24 overflow-hidden" style={{ maxHeight: "380px" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 animate-fade-up">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li className="text-border">›</li>
              <li className="text-foreground font-medium">Shop</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight animate-fade-up stagger-1">
            Our Product Catalog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl animate-fade-up stagger-2">
            Customize anything. Brand everything. Order in bulk.
          </p>
        </div>

        <div className="bg-foreground overflow-hidden">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-2.5">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-6 text-sm font-medium text-amber-400 shrink-0">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(12); }} aria-label={`Filter by ${cat}`}
                    className={`px-4 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:text-foreground"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 w-40 lg:w-48 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
              </div>
              <div className="hidden sm:flex items-center border border-border rounded-md overflow-hidden">
                <button onClick={() => setViewMode("grid")} aria-label="Grid view" className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><Grid3X3 size={16} /></button>
                <button onClick={() => setViewMode("list")} aria-label="List view" className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><List size={16} /></button>
              </div>
              <div ref={sortRef} className="relative">
                <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors bg-background">
                  {sortOptions.find((s) => s.value === sortBy)?.label || "Sort"}
                  <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-brand-lg py-1 min-w-[180px] z-50 animate-scale-in">
                    {sortOptions.map((opt) => (
                      <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${sortBy === opt.value ? "text-primary font-medium bg-primary/5" : "text-foreground hover:bg-secondary"}`}>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-foreground mb-2">No products found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((product, i) => (
              <article key={product.id}
                className={`group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-brand-lg ${product.featured ? "sm:col-span-2" : ""}`}
                style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}>
                {product.badge && <BadgeLabel badge={product.badge} />}
                <div className={`relative overflow-hidden ${product.featured ? "h-48 sm:h-56" : "h-44"}`} style={{ background: `linear-gradient(135deg, ${product.color}08, ${product.color}15)` }}>
                  <div className="group-hover:scale-[1.05] transition-transform duration-500 w-full h-full"><ProductVisual type={product.type} color={product.color} /></div>
                  <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-background font-medium text-sm flex items-center gap-2">Customize Now <ArrowRight size={16} /></span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-1.5">{product.category}</p>
                  <h3 className={`font-semibold text-foreground leading-snug mb-1.5 ${product.featured ? "text-lg" : "text-sm"}`}>{product.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{product.tagline}</p>
                  <div className="mb-3">
                    <span className="text-base font-semibold text-primary">From {product.price}</span>
                    <span className="text-[10px] text-muted-foreground">/unit</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">({product.minUnits} · Bulk pricing available)</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-muted-foreground">{tag}</span>)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="default" size="sm" className="flex-1 text-xs h-9">View & Customize</Button>
                    <button aria-label="Save product" className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Heart size={14} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayed.map((product, i) => (
              <article key={product.id} className="group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-brand-lg flex flex-col sm:flex-row" style={{ animationDelay: `${i * 60}ms` } as React.CSSProperties}>
                {product.badge && <BadgeLabel badge={product.badge} />}
                <div className="sm:w-[30%] h-40 sm:h-auto relative overflow-hidden shrink-0" style={{ background: `linear-gradient(135deg, ${product.color}08, ${product.color}15)` }}>
                  <div className="group-hover:scale-[1.05] transition-transform duration-500 w-full h-full"><ProductVisual type={product.type} color={product.color} /></div>
                </div>
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold text-base text-foreground mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{product.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-muted-foreground">{tag}</span>)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-lg font-semibold text-primary">From {product.price}</span>
                      <span className="text-xs text-muted-foreground">/unit</span>
                      <p className="text-[10px] text-muted-foreground">({product.minUnits})</p>
                    </div>
                    <Button variant="default" size="sm" className="text-xs">View & Customize</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length > visibleCount && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products</p>
            <Button variant="outline" size="lg" onClick={handleLoadMore} disabled={loading} className="min-w-[220px]">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Loading...</> : "Load More Products"}
            </Button>
          </div>
        )}
        {filtered.length <= visibleCount && filtered.length > 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">Showing all {filtered.length} products</p>
        )}
      </main>

      {/* Corporate Callout Strip */}
      <section data-shop-animate className="bg-foreground py-16 lg:py-20 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-background tracking-tight">Ordering for your company?</h2>
          <p className="mt-4 text-background/70 text-lg max-w-2xl mx-auto">Get custom quotes, dedicated support, and bulk pricing on all products. We handle everything from design to delivery.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="default" size="lg" onClick={() => window.location.href = "/#quote"}>Request Corporate Quote <ArrowRight size={16} /></Button>
            <a href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20a%20corporate%20quote%20for%20branded%20merchandise." target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-background/30 text-background hover:bg-background hover:text-foreground">WhatsApp Us Now</Button>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-background/60 text-sm">
            <span>🎨 Free Design Mockup</span><span>📋 GST Invoice</span><span>🚀 Pan-India Delivery</span>
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
