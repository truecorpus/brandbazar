import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import ProductVisualExperience from "@/components/product/ProductVisualExperience";
import ProductInfoColumn from "@/components/product/ProductInfoColumn";
import ProductDetailTabs from "@/components/product/ProductDetailTabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

/* Related & cross-sell data */
const crossSellProducts = [
  { name: "Premium Lanyard + ID Card Set", price: "₹68", emoji: "🪪", color: "#A29BFE" },
  { name: "Hardcover Branded Notebook", price: "₹119", emoji: "📓", color: "#D63031" },
  { name: "Embroidery Logo Cap", price: "₹199", emoji: "🧢", color: "#2D3436" },
];

const relatedProducts = [
  { name: "Magic Color-Change Mug", price: "₹149", emoji: "☕", color: "#6C5CE7" },
  { name: "Steel Sipper Bottle", price: "₹299", emoji: "🥤", color: "#636E72" },
  { name: "Transparent Coffee Glass", price: "₹179", emoji: "🥃", color: "#E17055" },
  { name: "Travel Tumbler", price: "₹349", emoji: "🍵", color: "#00B894" },
  { name: "Ceramic Tea Set", price: "₹599", emoji: "🫖", color: "#0984E3" },
  { name: "Shot Glass Set (6pc)", price: "₹249", emoji: "🥂", color: "#FD79A8" },
];

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [quantity, setQuantity] = useState(25);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
        <div className="h-full bg-accent transition-[width] duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Navbar />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28">
        <a href="/shop" className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-accent transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </a>
      </div>

      {/* ═══ PRODUCT HERO — TWO COLUMN ═══ */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12">
          {/* Left: visual (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductVisualExperience selectedColor={selectedColor} onColorChange={setSelectedColor} />
          </div>

          {/* Right: info (scrollable) */}
          <div>
            <ProductInfoColumn selectedColor={selectedColor} quantity={quantity} onQuantityChange={setQuantity} />
          </div>
        </div>
      </article>

      {/* ═══ PRODUCT DETAIL TABS ═══ */}
      <div className="border-t border-border">
        <ProductDetailTabs />
      </div>

      {/* ═══ LIVE PREVIEW / MOCKUP TEASER ═══ */}
      <section className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: desk scene */}
            <div className="relative rounded-2xl overflow-hidden p-12" style={{ background: "radial-gradient(ellipse at 30% 70%, hsl(37 30% 95%), hsl(228 20% 96%))" }}>
              {/* Desk surface */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(180deg, transparent, hsl(30 15% 90%))" }} />

              <div className="relative flex items-end justify-center gap-6">
                {/* Plant */}
                <div className="relative hidden sm:block">
                  <div className="w-6 h-10 rounded-t-full bg-emerald-400/30 border border-emerald-500/20" />
                  <div className="w-8 h-6 rounded-b-lg bg-muted border border-border -mt-px mx-auto" style={{ marginLeft: "-1px" }} />
                </div>

                {/* Mug on desk */}
                <div className="relative">
                  {/* Shadow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-[50%] bg-foreground/[0.06] blur-md" />
                  <div className="relative w-[100px] h-[110px] rounded-b-[16px] rounded-t-[4px] bg-white border border-border/60 overflow-hidden" style={{ boxShadow: "inset -4px 0 12px rgba(0,0,0,0.04), inset 2px 0 8px rgba(255,255,255,0.3)" }}>
                    {/* Print area with "YOUR LOGO" */}
                    <div className="absolute top-[16px] left-[10px] right-[10px] h-[60px] rounded border-2 border-dashed border-accent/40 flex items-center justify-center bg-accent/[0.03]">
                      <span className="text-accent font-body text-[8px] font-bold tracking-wider text-center leading-tight">YOUR<br />LOGO<br />HERE</span>
                    </div>
                    {/* Liquid */}
                    <div className="absolute top-[2px] left-[4px] right-[4px] h-[10px] rounded-[50%] bg-amber-800/20" />
                  </div>
                  {/* Handle */}
                  <div className="absolute top-[16px] -right-[18px] w-[22px] h-[56px] rounded-r-[14px] border-[4px] border-l-0 border-gray-300" />
                  {/* Steam */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 opacity-40">
                    <div className="w-[2px] h-5 rounded-full bg-muted-foreground/30 animate-[mugFloat_2s_ease-in-out_infinite]" />
                    <div className="w-[2px] h-7 rounded-full bg-muted-foreground/20 animate-[mugFloat_2.5s_ease-in-out_infinite_0.3s]" />
                    <div className="w-[2px] h-4 rounded-full bg-muted-foreground/25 animate-[mugFloat_2s_ease-in-out_infinite_0.6s]" />
                  </div>
                </div>

                {/* Notebook */}
                <div className="relative hidden sm:block" style={{ transform: "rotate(-8deg)" }}>
                  <div className="w-16 h-20 rounded-lg bg-muted border border-border" />
                  <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-lg bg-accent/30" />
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div>
              <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-primary tracking-tight">
                See Your Brand Come to Life
              </h2>
              <p className="mt-4 text-muted-foreground font-body text-lg leading-relaxed">
                Upload your logo and we'll send you a free digital mockup within 4 working hours — no commitment needed.
              </p>
              <Button variant="cta" size="xl" className="mt-6">
                Request Free Mockup <ArrowRight size={18} />
              </Button>
              <p className="mt-3 text-xs text-muted-foreground font-body">Over 2,000 mockups delivered this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FREQUENTLY BOUGHT TOGETHER ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-primary tracking-tight mb-2">
          Complete the Corporate Kit
        </h2>
        <p className="text-sm text-muted-foreground font-body mb-8">
          Frequently ordered together for onboarding kits & employee welcome hampers
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mb-6">
          {crossSellProducts.map((p) => (
            <div key={p.name} className="bg-card rounded-xl border border-border p-5 flex flex-col items-center text-center hover:border-accent/30 hover:shadow-brand-lg transition-all">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3" style={{ background: `${p.color}15` }}>
                <span className="text-3xl">{p.emoji}</span>
              </div>
              <h4 className="font-display font-bold text-sm text-primary mb-1">{p.name}</h4>
              <p className="text-sm text-accent font-body font-semibold mb-3">From {p.price}/unit</p>
              <Button variant="outline" size="sm" className="w-full text-xs">Add to Quote</Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg">
            Add Bundle to Quote — Bundle Pricing Available <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* ═══ RELATED PRODUCTS CAROUSEL ═══ */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-primary tracking-tight">
              More in Drinkware & Gifting
            </h2>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scrollCarousel(-1)} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent transition-colors" aria-label="Scroll left">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scrollCarousel(1)} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent transition-colors" aria-label="Scroll right">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2">
            {relatedProducts.map((p) => (
              <div
                key={p.name}
                className="shrink-0 w-[220px] snap-start bg-card rounded-xl border border-border p-5 flex flex-col items-center text-center hover:border-accent/30 hover:shadow-brand-lg transition-all"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3" style={{ background: `${p.color}15` }}>
                  <span className="text-2xl">{p.emoji}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-primary mb-1">{p.name}</h4>
                <p className="text-sm text-accent font-body font-semibold mb-3">From {p.price}/unit</p>
                <Button variant="outline" size="sm" className="w-full text-xs">View Details</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default ProductDetail;
