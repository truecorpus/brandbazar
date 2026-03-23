import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Grid3X3, List, Heart, ChevronDown, Loader2 } from "lucide-react";

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

type Category = "All Products" | "Corporate Kits" | "Drinkware" | "Apparel" | "Desk & Office" | "Accessories" | "Recognition & Awards";

interface Product {
  id: number;
  name: string;
  category: Category;
  tagline: string;
  price: string;
  minUnits: string;
  badge?: "BESTSELLER" | "NEW" | "CORPORATE PICK" | "EXPRESS";
  tags: string[];
  color: string;
  type: string;
  popularity: number;
  isNew?: boolean;
  featured?: boolean;
}

const products: Product[] = [
  {
    id: 1, name: "Premium Ceramic Coffee Mug", category: "Drinkware", type: "mug",
    tagline: "Dishwasher safe · 11oz · Full wrap print available",
    price: "₹89", minUnits: "Min. 25 units", badge: "BESTSELLER",
    tags: ["Bulk Ready", "Logo Print", "Express"], color: "#E85D4A",
    popularity: 98, isNew: false,
  },
  {
    id: 2, name: "Magic Color-Change Mug", category: "Drinkware", type: "mug-magic",
    tagline: "Heat-activated reveal · 11oz · Stunning brand impact",
    price: "₹149", minUnits: "Min. 25 units", badge: "NEW",
    tags: ["Heat Reactive", "Logo Print"], color: "#6C5CE7",
    popularity: 85, isNew: true,
  },
  {
    id: 3, name: "360° Full-Print T-Shirt", category: "Apparel", type: "tshirt",
    tagline: "All-over sublimation · S–3XL · Vivid fade-proof colors",
    price: "₹349", minUnits: "Min. 50 units", badge: "CORPORATE PICK",
    tags: ["Full Print", "Team Wear"], color: "#0984E3",
    popularity: 92, isNew: false,
  },
  {
    id: 4, name: "Premium Polo T-Shirt", category: "Apparel", type: "polo",
    tagline: "Cotton-poly blend · Embroidery-ready · Executive finish",
    price: "₹449", minUnits: "Min. 25 units",
    tags: ["Embroidery", "Premium"], color: "#00B894",
    popularity: 78, isNew: false,
  },
  {
    id: 5, name: "PVC Corporate ID Card + Holder", category: "Corporate Kits", type: "idcard",
    tagline: "CR80 standard · Dual-sided print · Holder included",
    price: "₹29", minUnits: "Min. 100 units", badge: "BESTSELLER",
    tags: ["Bulk Ready", "Fast Print"], color: "#A29BFE",
    popularity: 95, isNew: false,
  },
  {
    id: 6, name: "Premium Lanyard Set", category: "Accessories", type: "lanyard",
    tagline: "20mm polyester · Full-color dye-sub · Safety breakaway clip",
    price: "₹39", minUnits: "Min. 50 units",
    tags: ["Logo Print", "Safety Clip"], color: "#FD79A8",
    popularity: 70, isNew: false,
  },
  {
    id: 7, name: "LED Mood Lamp with Logo", category: "Desk & Office", type: "lamp",
    tagline: "Acrylic etching · USB-powered · 7-color LED cycle",
    price: "₹399", minUnits: "Min. 25 units", badge: "NEW",
    tags: ["USB Powered", "Logo Etch"], color: "#F5A623",
    popularity: 88, isNew: true,
  },
  {
    id: 8, name: "Spiral Hardcover Notebook", category: "Desk & Office", type: "notebook",
    tagline: "A5 · 200 pages · Debossed cover with custom inner pages",
    price: "₹119", minUnits: "Min. 50 units",
    tags: ["Deboss", "Custom Pages"], color: "#D63031",
    popularity: 74, isNew: false,
  },
  {
    id: 9, name: "Structured Embroidery Cap", category: "Apparel", type: "cap",
    tagline: "Adjustable buckle · 3D puff embroidery · 6-panel construction",
    price: "₹199", minUnits: "Min. 25 units", badge: "CORPORATE PICK",
    tags: ["Embroidery", "Adjustable"], color: "#2D3436",
    popularity: 82, isNew: false,
  },
  {
    id: 10, name: "Metal Keychain Set", category: "Accessories", type: "keychain",
    tagline: "Die-cast zinc alloy · Laser-engraved · Velvet pouch included",
    price: "₹59", minUnits: "Min. 50 units",
    tags: ["Laser Engrave", "Gift Box"], color: "#636E72",
    popularity: 65, isNew: false,
  },
  {
    id: 11, name: "Executive Corporate Gift Kit", category: "Corporate Kits", type: "kit",
    tagline: "Mug + Notebook + Pen + Keychain in branded magnetic box",
    price: "₹899", minUnits: "Min. 25 units", badge: "BESTSELLER",
    tags: ["All-in-One", "Premium Box", "White Label"], color: "#0A1628",
    popularity: 99, isNew: false, featured: true,
  },
  {
    id: 12, name: "Custom Tote Bag", category: "Accessories", type: "tote",
    tagline: "12oz canvas · Full-color DTG print · Eco-friendly material",
    price: "₹149", minUnits: "Min. 50 units", badge: "EXPRESS",
    tags: ["Eco-Friendly", "Full Print"], color: "#E17055",
    popularity: 76, isNew: false,
  },
];

const categories: Category[] = [
  "All Products", "Corporate Kits", "Drinkware", "Apparel",
  "Desk & Office", "Accessories", "Recognition & Awards",
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "New Arrivals", value: "new" },
];

/* ═══════════════════════════════════════
   CSS PRODUCT ILLUSTRATIONS
   ═══════════════════════════════════════ */

const ProductVisual = ({ type, color }: { type: string; color: string }) => {
  const base = "w-full h-full flex items-center justify-center";
  switch (type) {
    case "mug":
    case "mug-magic":
      return (
        <div className={base}>
          <div className="relative">
            <div className="w-20 h-24 rounded-b-xl rounded-t-md border-2 border-current/20" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
              <div className="absolute top-3 left-2 right-2 h-10 rounded-sm border border-dashed border-current/20" style={{ backgroundColor: `${color}18` }} />
              <div className="absolute top-0 left-0 right-0 h-2 rounded-t-md" style={{ backgroundColor: color }} />
            </div>
            {/* Handle */}
            <div className="absolute top-4 -right-4 w-5 h-12 rounded-r-full border-2 border-l-0" style={{ borderColor: `${color}66` }} />
            {/* Shine */}
            <div className="absolute top-2 left-2 w-3 h-8 rounded-full bg-white/40 blur-sm" />
            {type === "mug-magic" && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}88` }} />
            )}
          </div>
        </div>
      );
    case "tshirt":
    case "polo":
      return (
        <div className={base}>
          <div className="relative">
            <svg width="90" height="95" viewBox="0 0 90 95" fill="none">
              <path d="M20 15 L0 30 L10 40 L20 35 L20 90 L70 90 L70 35 L80 40 L90 30 L70 15 L60 5 Q45 -2 30 5 Z"
                fill={`${color}20`} stroke={`${color}88`} strokeWidth="1.5" />
              {/* Collar */}
              <path d="M30 5 Q45 15 60 5" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
              {/* Print area */}
              <rect x="28" y="30" width="34" height="24" rx="3" fill={`${color}15`} stroke={`${color}44`} strokeWidth="1" strokeDasharray="3 2" />
            </svg>
            {type === "polo" && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-6 border border-current/20 rounded-b-sm" style={{ borderColor: `${color}66` }} />
            )}
          </div>
        </div>
      );
    case "idcard":
      return (
        <div className={base}>
          <div className="relative">
            {/* Lanyard line */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8" style={{ backgroundColor: `${color}66` }} />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-4 rounded-t-full border border-b-0" style={{ borderColor: `${color}55` }} />
            {/* Card */}
            <div className="w-[70px] h-[95px] rounded-lg border-2 overflow-hidden" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}11, ${color}22)` }}>
              <div className="h-5 w-full" style={{ backgroundColor: `${color}44` }} />
              <div className="p-2 space-y-1.5">
                <div className="w-8 h-8 rounded-full border mx-auto" style={{ borderColor: `${color}44` }} />
                <div className="w-10 h-1 rounded mx-auto" style={{ backgroundColor: `${color}33` }} />
                <div className="w-8 h-0.5 rounded mx-auto" style={{ backgroundColor: `${color}22` }} />
                <div className="w-12 h-0.5 rounded mx-auto" style={{ backgroundColor: `${color}22` }} />
              </div>
            </div>
          </div>
        </div>
      );
    case "cap":
      return (
        <div className={base}>
          <div className="relative">
            {/* Dome */}
            <div className="w-24 h-14 rounded-t-full border-2 border-b-0" style={{ borderColor: `${color}66`, background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
              {/* Embroidery dots */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${color}88` }} />
                ))}
              </div>
            </div>
            {/* Brim */}
            <div className="w-28 h-4 rounded-b-lg -ml-2 border-2 border-t-0" style={{ borderColor: `${color}66`, backgroundColor: `${color}33` }} />
            {/* Button top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: `${color}88` }} />
          </div>
        </div>
      );
    case "lamp":
      return (
        <div className={base}>
          <div className="relative flex flex-col items-center">
            {/* Glow */}
            <div className="absolute top-0 w-16 h-20 rounded-full blur-xl opacity-40" style={{ backgroundColor: color }} />
            {/* Acrylic panel */}
            <div className="relative w-12 h-20 rounded-t-lg border" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}22, transparent)` }}>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded border border-dashed" style={{ borderColor: `${color}55` }} />
            </div>
            {/* Base */}
            <div className="w-16 h-3 rounded-b-md" style={{ backgroundColor: `${color}44` }} />
            <div className="w-12 h-1 rounded-b" style={{ backgroundColor: `${color}33` }} />
          </div>
        </div>
      );
    case "notebook":
      return (
        <div className={base}>
          <div className="relative" style={{ transform: "rotate(-5deg)" }}>
            {/* Back page shadow */}
            <div className="absolute top-1 left-1 w-[65px] h-[85px] rounded-lg" style={{ backgroundColor: `${color}22` }} />
            {/* Cover */}
            <div className="w-[65px] h-[85px] rounded-lg border-2 relative" style={{ borderColor: `${color}55`, background: `linear-gradient(135deg, ${color}22, ${color}38)` }}>
              {/* Spine */}
              <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" style={{ backgroundColor: `${color}55` }} />
              {/* Deboss area */}
              <div className="absolute top-5 left-5 right-3 h-10 rounded border border-dashed" style={{ borderColor: `${color}44` }}>
                <div className="w-6 h-1 rounded mx-auto mt-3" style={{ backgroundColor: `${color}33` }} />
                <div className="w-8 h-0.5 rounded mx-auto mt-1" style={{ backgroundColor: `${color}22` }} />
              </div>
            </div>
            {/* Spiral holes */}
            <div className="absolute top-2 -left-1 flex flex-col gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full border" style={{ borderColor: `${color}55`, backgroundColor: "white" }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "keychain":
      return (
        <div className={base}>
          <div className="relative flex flex-col items-center">
            {/* Ring */}
            <div className="w-8 h-8 rounded-full border-2" style={{ borderColor: `${color}88` }} />
            {/* Connector */}
            <div className="w-1 h-3" style={{ backgroundColor: `${color}66` }} />
            {/* Tag body */}
            <div className="w-14 h-16 rounded-lg border-2 flex items-center justify-center" style={{ borderColor: `${color}66`, background: `linear-gradient(135deg, ${color}15, ${color}30)` }}>
              <div className="w-8 h-8 rounded border border-dashed" style={{ borderColor: `${color}44` }} />
            </div>
            {/* Shine */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-6 rounded-full bg-white/30 blur-sm" />
          </div>
        </div>
      );
    case "kit":
      return (
        <div className={base}>
          <div className="relative">
            {/* Back box */}
            <div className="absolute top-0 left-3 w-20 h-20 rounded-lg border" style={{ borderColor: `${color}33`, background: `${color}11` }} />
            {/* Middle box */}
            <div className="absolute top-2 left-1 w-20 h-20 rounded-lg border" style={{ borderColor: `${color}44`, background: `${color}18` }} />
            {/* Front box */}
            <div className="relative top-4 w-20 h-20 rounded-lg border-2" style={{ borderColor: `${color}66`, background: `linear-gradient(135deg, ${color}15, ${color}30)` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded border border-dashed" style={{ borderColor: `${color}44` }} />
              {/* Ribbon */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-b" style={{ backgroundColor: `#F5A623` }} />
            </div>
          </div>
        </div>
      );
    case "lanyard":
      return (
        <div className={base}>
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-6 rounded-t-full border border-b-0" style={{ borderColor: `${color}55` }} />
            <div className="w-6 h-24 rounded-b border-2" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}22, ${color}38)` }}>
              <div className="mt-2 mx-auto w-3 h-14 rounded-sm border border-dashed" style={{ borderColor: `${color}44` }} />
            </div>
            <div className="w-3 h-2 rounded-b" style={{ backgroundColor: `${color}66` }} />
          </div>
        </div>
      );
    case "tote":
      return (
        <div className={base}>
          <div className="relative">
            {/* Handles */}
            <div className="absolute -top-4 left-3 w-4 h-6 rounded-t-full border-2 border-b-0" style={{ borderColor: `${color}66` }} />
            <div className="absolute -top-4 right-3 w-4 h-6 rounded-t-full border-2 border-b-0" style={{ borderColor: `${color}66` }} />
            {/* Bag body */}
            <div className="w-[72px] h-[80px] rounded-b-lg border-2" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}15, ${color}28)` }}>
              <div className="mt-4 mx-auto w-10 h-10 rounded border border-dashed flex items-center justify-center" style={{ borderColor: `${color}44` }}>
                <div className="w-5 h-1 rounded" style={{ backgroundColor: `${color}33` }} />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return <div className={base}><div className="w-16 h-16 rounded-xl border-2 border-dashed border-muted-foreground/30" /></div>;
  }
};

/* ═══════════════════════════════════════
   BADGE COMPONENT
   ═══════════════════════════════════════ */

const BadgeLabel = ({ badge }: { badge: string }) => {
  const colors: Record<string, string> = {
    BESTSELLER: "bg-accent text-accent-foreground",
    NEW: "bg-emerald-500 text-white",
    "CORPORATE PICK": "bg-primary text-primary-foreground",
    EXPRESS: "bg-orange-500 text-white",
  };
  return (
    <span className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-body uppercase tracking-wider ${colors[badge] || "bg-muted text-foreground"}`}>
      {badge}
    </span>
  );
};

/* ═══════════════════════════════════════
   SHOP PAGE COMPONENT
   ═══════════════════════════════════════ */

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSortDropdown(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const els = document.querySelectorAll("[data-shop-animate]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "All Products") result = result.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q)
      );
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

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisibleCount((v) => v + 4); setLoading(false); }, 1000);
  };

  const marqueeItems = [
    "🏆 500+ Corporate Clients",
    "⚡ 5-Day Express Delivery",
    "🎨 Full-Color Custom Printing",
    "📦 Bulk Orders from 25 Units",
    "✅ GST Invoice Provided",
    "🎯 Dedicated Account Managers",
    "🇮🇳 Pan-India Delivery",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══ SHOP HERO BANNER ═══ */}
      <section className="relative pt-20 lg:pt-24 overflow-hidden" style={{ maxHeight: "380px" }}>
        {/* Diagonal line pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 14px,
              hsl(var(--primary)) 14px,
              hsl(var(--primary)) 15px
            )`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 animate-fade-up">
            <ol className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li className="text-border">›</li>
              <li className="text-primary font-medium">Shop</li>
            </ol>
          </nav>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-primary tracking-tight animate-fade-up stagger-1">
            Our Product Catalog
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-muted-foreground font-body max-w-xl animate-fade-up stagger-2">
            Customize anything. Brand everything. Order in bulk.
          </p>
        </div>

        {/* Marquee ticker */}
        <div className="bg-primary overflow-hidden">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-2.5">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-6 text-sm font-body font-medium text-accent shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STICKY FILTER BAR ═══ */}
      <div className="sticky top-16 lg:top-20 z-40 bg-surface-elevated/80 backdrop-blur-xl border-b border-border shadow-[var(--shadow-sm)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Mobile: stacked, Desktop: row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            {/* Category pills */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setVisibleCount(12); }}
                    aria-label={`Filter by ${cat}`}
                    className={`px-4 py-2 rounded-full text-xs font-medium font-body whitespace-nowrap transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-brand"
                        : "bg-card text-muted-foreground border border-border hover:border-primary/20 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search + View + Sort */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 w-40 lg:w-48 rounded-lg border border-border bg-card text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Sort dropdown */}
              <div ref={sortRef} className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium font-body text-muted-foreground hover:text-primary transition-colors bg-card"
                >
                  {sortOptions.find((s) => s.value === sortBy)?.label || "Sort"}
                  <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-brand-lg py-1 min-w-[180px] z-50 animate-scale-in">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm font-body transition-colors ${
                          sortBy === opt.value ? "text-accent font-medium bg-accent/5" : "text-foreground hover:bg-muted"
                        }`}
                      >
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

      {/* ═══ PRODUCT GRID ═══ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-display font-bold text-primary mb-2">No products found</p>
            <p className="text-muted-foreground font-body">Try adjusting your filters or search query.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayed.map((product, i) => {
              const isFeatured = product.featured;
              return (
                <article
                  key={product.id}
                  className={`group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-accent/40 ${
                    isFeatured ? "sm:col-span-2 sm:row-span-1" : ""
                  }`}
                  style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}
                >
                  {product.badge && <BadgeLabel badge={product.badge} />}

                  {/* Visual zone */}
                  <div
                    className={`relative overflow-hidden ${isFeatured ? "h-48 sm:h-56" : "h-44"}`}
                    style={{ background: `linear-gradient(135deg, ${product.color}08, ${product.color}15)` }}
                  >
                    <div className="group-hover:scale-[1.08] transition-transform duration-500 w-full h-full">
                      <ProductVisual type={product.type} color={product.color} />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-primary-foreground font-body font-semibold text-sm flex items-center gap-2">
                        Customize Now <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>

                  {/* Info zone */}
                  <div className="p-5">
                    <p className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                      {product.category}
                    </p>
                    <h3 className={`font-display font-bold text-primary leading-snug mb-1.5 ${isFeatured ? "text-lg" : "text-sm"}`}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3">
                      {product.tagline}
                    </p>

                    {/* Price */}
                    <div className="mb-3">
                      <span className="text-base font-bold text-accent font-body">From {product.price}</span>
                      <span className="text-[10px] text-muted-foreground font-body">/unit</span>
                      <p className="text-[10px] text-muted-foreground font-body mt-0.5">
                        ({product.minUnits} · Bulk pricing available)
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium font-body bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex items-center gap-2">
                      <Button variant="default" size="sm" className="flex-1 text-xs h-9">
                        View & Customize
                      </Button>
                      <button aria-label="Save product" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors">
                        <Heart size={14} />
                      </button>
                      <a
                        href={`https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp inquiry"
                        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:border-[#25D366]/30 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* ═══ LIST VIEW ═══ */
          <div className="flex flex-col gap-4">
            {displayed.map((product, i) => (
              <article
                key={product.id}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-accent/40 flex flex-col sm:flex-row"
                style={{ animationDelay: `${i * 60}ms` } as React.CSSProperties}
              >
                {product.badge && <BadgeLabel badge={product.badge} />}

                {/* Visual */}
                <div
                  className="sm:w-[30%] h-40 sm:h-auto relative overflow-hidden shrink-0"
                  style={{ background: `linear-gradient(135deg, ${product.color}08, ${product.color}15)` }}
                >
                  <div className="group-hover:scale-[1.05] transition-transform duration-500 w-full h-full">
                    <ProductVisual type={product.type} color={product.color} />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-display font-bold text-base text-primary mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground font-body mb-3">{product.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium font-body bg-muted text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-lg font-bold text-accent font-body">From {product.price}</span>
                      <span className="text-xs text-muted-foreground font-body">/unit</span>
                      <p className="text-[10px] text-muted-foreground font-body">({product.minUnits})</p>
                    </div>
                    <Button variant="default" size="sm" className="text-xs">View & Customize</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ═══ LOAD MORE ═══ */}
        {filtered.length > visibleCount && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-body mb-4">
              Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={loading}
              className="min-w-[220px] relative"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Loading...</>
              ) : (
                "Load More Products"
              )}
            </Button>
          </div>
        )}

        {filtered.length <= visibleCount && filtered.length > 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground font-body">
            Showing all {filtered.length} products
          </p>
        )}
      </main>

      {/* ═══ CORPORATE CALLOUT STRIP ═══ */}
      <section data-shop-animate className="bg-primary py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-foreground tracking-tight">
            Ordering for Your Company?
          </h2>
          <p className="mt-4 text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto">
            Get custom quotes, dedicated support, and bulk pricing on all products. We handle everything from design to delivery.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="cta" size="xl" onClick={() => window.location.href = "/#quote"}>
              Request Corporate Quote
              <ArrowRight size={18} />
            </Button>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20a%20corporate%20quote%20for%20branded%20merchandise."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                WhatsApp Us Now
              </Button>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-primary-foreground/60 text-sm font-body">
            <span>🎨 Free Design Mockup</span>
            <span>📋 GST Invoice</span>
            <span>🚀 Pan-India Delivery</span>
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
