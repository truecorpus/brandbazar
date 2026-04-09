import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];

interface Props {
  images: ProductImage[];
  activeIndex: number;
  onIndexChange: (i: number) => void;
  productName: string;
}

const DynamicProductGallery = ({ images, activeIndex, onIndexChange, productName }: Props) => {
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);

  const currentImage = images[activeIndex];

  if (images.length === 0) {
    return (
      <div className="rounded-lg bg-secondary flex items-center justify-center aspect-square">
        <p className="text-muted-foreground text-sm">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
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

      {/* Thumbnails */}
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
