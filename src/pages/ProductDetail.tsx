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
import { productImages } from "@/assets/products";

const crossSellProducts = [
  { name: "Premium Lanyard + ID Card Set", price: "₹68", imageKey: "lanyard" },
  { name: "Hardcover Branded Notebook", price: "₹119", imageKey: "notebook" },
  { name: "Embroidery Logo Cap", price: "₹199", imageKey: "cap" },
];

const relatedProducts = [
  { name: "Magic Color-Change Mug", price: "₹149", imageKey: "mug-magic" },
  { name: "Custom Tote Bag", price: "₹149", imageKey: "tote" },
  { name: "Branded T-Shirt", price: "₹299", imageKey: "tshirt" },
  { name: "Premium Polo", price: "₹449", imageKey: "polo" },
  { name: "LED Mood Lamp", price: "₹399", imageKey: "lamp" },
  { name: "Metal Keychain Set", price: "₹59", imageKey: "keychain" },
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
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28">
        <a href="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </a>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductVisualExperience selectedColor={selectedColor} onColorChange={setSelectedColor} />
          </div>
          <div>
            <ProductInfoColumn selectedColor={selectedColor} quantity={quantity} onQuantityChange={setQuantity} />
          </div>
        </div>
      </article>

      <div className="border-t border-border">
        <ProductDetailTabs />
      </div>

      {/* Live Preview / Mockup Teaser */}
      <section className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden p-12 bg-secondary border border-border">
              <div className="relative flex items-end justify-center gap-6">
                <div className="relative hidden sm:block">
                  <div className="w-6 h-10 rounded-t-full bg-emerald-400/30 border border-emerald-500/20" />
                  <div className="w-8 h-6 rounded-b-md bg-secondary border border-border -mt-px mx-auto" style={{ marginLeft: "-1px" }} />
                </div>
                <div className="relative">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-[50%] bg-foreground/[0.04] blur-md" />
                  <div className="relative w-[100px] h-[110px] rounded-b-[16px] rounded-t-[4px] bg-background border border-border overflow-hidden">
                    <div className="absolute top-[16px] left-[10px] right-[10px] h-[60px] rounded border-2 border-dashed border-primary/30 flex items-center justify-center bg-primary/[0.03]">
                      <span className="text-primary text-[8px] font-medium tracking-wider text-center leading-tight">YOUR<br />LOGO<br />HERE</span>
                    </div>
                    <div className="absolute top-[2px] left-[4px] right-[4px] h-[10px] rounded-[50%] bg-amber-800/20" />
                  </div>
                  <div className="absolute top-[16px] -right-[18px] w-[22px] h-[56px] rounded-r-[14px] border-[4px] border-l-0 border-border" />
                </div>
                <div className="relative hidden sm:block" style={{ transform: "rotate(-8deg)" }}>
                  <div className="w-16 h-20 rounded-md bg-secondary border border-border" />
                  <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-md bg-primary/20" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
                See your brand come to life
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Upload your logo and we'll send you a free digital mockup within 4 working hours — no commitment needed.
              </p>
              <Button variant="default" size="lg" className="mt-6">
                Request Free Mockup <ArrowRight size={16} />
              </Button>
              <p className="mt-3 text-[13px] text-muted-foreground">Over 2,000 mockups delivered this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h2 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight mb-2">
          Complete the corporate kit
        </h2>
        <p className="text-[13px] text-muted-foreground mb-8">
          Frequently ordered together for onboarding kits & employee welcome hampers
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {crossSellProducts.map((p) => (
            <div key={p.name} className="bg-background rounded-xl border border-border p-5 flex flex-col items-center text-center transition-all duration-200 hover:border-primary hover:shadow-[0_4px_12px_rgba(26,115,232,0.15)]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <span className="text-3xl">{p.emoji}</span>
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1">{p.name}</h4>
              <p className="text-[14px] font-semibold text-foreground mb-3">From {p.price}/unit</p>
              <button className="text-[13px] font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                Add to Quote <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="default" size="lg">
            Add Bundle to Quote <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
              More in Drinkware & Gifting
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
            {relatedProducts.map((p) => (
              <div key={p.name} className="shrink-0 w-[220px] snap-start bg-background rounded-xl border border-border p-5 flex flex-col items-center text-center transition-all duration-200 hover:border-primary hover:shadow-[0_4px_12px_rgba(26,115,232,0.15)]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-3">
                  <span className="text-2xl">{p.emoji}</span>
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{p.name}</h4>
                <p className="text-[14px] font-semibold text-foreground mb-3">From {p.price}/unit</p>
                <button className="text-[13px] font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  View Details <ArrowRight size={14} />
                </button>
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
