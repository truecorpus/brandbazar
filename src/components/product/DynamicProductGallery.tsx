import { useState, useRef, useCallback, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Database } from "@/integrations/supabase/types";

type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];

interface Props {
  images: ProductImage[];
  activeIndex: number;
  onIndexChange: (i: number) => void;
  productName: string;
}

const DynamicProductGallery = ({ images, activeIndex, onIndexChange, productName }: Props) => {
  const isMobile = useIsMobile();
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pinchScale, setPinchScale] = useState(1);
  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);

  const currentImage = images[activeIndex];

  // Sync scroll position when activeIndex changes programmatically
  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const container = scrollRef.current;
      const targetScroll = activeIndex * container.offsetWidth;
      if (Math.abs(container.scrollLeft - targetScroll) > 10) {
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }
  }, [activeIndex, isMobile]);

  // Handle scroll-snap index detection
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      onIndexChange(newIndex);
    }
  }, [activeIndex, images.length, onIndexChange]);

  // Pinch-to-zoom handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDist.current = Math.hypot(dx, dy);
      pinchStartScale.current = pinchScale;
    }
  }, [pinchScale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const scale = Math.min(3, Math.max(1, pinchStartScale.current * (dist / pinchStartDist.current)));
      setPinchScale(scale);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (pinchScale < 1.1) setPinchScale(1);
  }, [pinchScale]);

  // Double-tap zoom
  const lastTap = useRef(0);
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setPinchScale((s) => (s > 1 ? 1 : 2));
    }
    lastTap.current = now;
  }, []);

  if (images.length === 0) {
    return (
      <div className="rounded-lg bg-secondary flex items-center justify-center aspect-square">
        <p className="text-muted-foreground text-sm">No images available</p>
      </div>
    );
  }

  // ─── MOBILE: Swipeable carousel with dots ───
  if (isMobile) {
    return (
      <div className="relative -mx-4 sm:-mx-6">
        {/* Swipeable carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleDoubleTap}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              className="w-full shrink-0 snap-center bg-secondary"
            >
              <img
                src={img.image_url}
                alt={img.alt_text || `${productName} - Image ${i + 1}`}
                className="w-full aspect-square object-contain transition-transform duration-200"
                style={{ transform: `scale(${i === activeIndex ? pinchScale : 1})` }}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Image counter pill */}
        <div className="absolute top-3 right-3 bg-foreground/60 text-background text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3 pb-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onIndexChange(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── DESKTOP: Original zoom + thumbnails ───
  return (
    <div className="space-y-4">
      <div
        className="relative rounded-lg overflow-hidden bg-secondary cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setZoomPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
        onMouseLeave={() => setZoomPos(null)}
      >
        <img
          src={currentImage?.image_url}
          alt={currentImage?.alt_text || `${productName} - Image ${activeIndex + 1}`}
          className="w-full aspect-square object-contain"
          loading={activeIndex === 0 ? "eager" : "lazy"}
        />
        {zoomPos && (
          <div
            className="pointer-events-none absolute w-40 h-40 rounded-full border-2 border-primary/30 overflow-hidden"
            style={{
              left: `${zoomPos.x}%`,
              top: `${zoomPos.y}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={currentImage?.image_url}
              alt=""
              className="absolute w-[300%] h-[300%] max-w-none"
              style={{
                left: `${-zoomPos.x * 3 + 150}%`,
                top: `${-zoomPos.y * 3 + 150}%`,
              }}
            />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => onIndexChange(i)}
              className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <img
                src={img.image_url}
                alt={img.alt_text || `${productName} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                width={64}
                height={64}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicProductGallery;
