import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ChevronDown, ChevronUp, Upload, ArrowRight, Lock, Ruler, RefreshCw, FileText, Truck } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Variant = Database["public"]["Tables"]["product_variants"]["Row"];
type CustomizationOption = Database["public"]["Tables"]["customization_options"]["Row"];

interface BulkPriceTier {
  min_qty: number;
  max_qty: number | null;
  price_per_unit: number;
  label?: string;
}

interface PriceCalc {
  pricePerUnit: number;
  totalPrice: number;
  savingsAmount: number;
  savingsPercent: number;
  appliedTier: BulkPriceTier | null;
  gstAmount: number;
  totalWithGst: number;
  basePrice: number;
}

interface ReviewStats {
  averageRating: number;
  totalCount: number;
}

interface Props {
  product: Product;
  variants: Variant[];
  selectedVariant: Variant | null;
  onVariantChange: (id: string) => void;
  quantity: number;
  onQuantityChange: (q: number) => void;
  priceCalc: PriceCalc;
  bulkTiers: BulkPriceTier[];
  availableColors: string[];
  availableSizes: string[];
  customizationOptions: CustomizationOption[];
  reviewStats?: ReviewStats;
  category: { name: string; slug: string } | null;
}

const trustPoints = [
  { icon: Lock, text: "Secure Order" },
  { icon: Ruler, text: "Free Design Mockup" },
  { icon: RefreshCw, text: "Reorder Anytime" },
  { icon: FileText, text: "GST Invoice" },
  { icon: Truck, text: "Pan-India Shipping" },
];

const DynamicProductInfo = ({
  product, variants, selectedVariant, onVariantChange,
  quantity, onQuantityChange, priceCalc, bulkTiers,
  availableColors, availableSizes, customizationOptions,
  reviewStats, category,
}: Props) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [uploadedFile, setUploadedFile] = useState("");
  const [fileDropHover, setFileDropHover] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const toggle = (key: string) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const isOutOfStock = selectedVariant ? (selectedVariant.stock_quantity ?? 0) <= 0 : false;

  const waLink = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi! I'd like a quote for:\n• Product: ${product.name}\n• Quantity: ${quantity} units\n${selectedVariant?.color ? `• Color: ${selectedVariant.color}\n` : ""}Please share pricing and timeline.`
  )}`;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
          <li className="text-border">›</li>
          {category && (
            <>
              <li><Link to={`/shop?category=${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link></li>
              <li className="text-border">›</li>
            </>
          )}
          <li className="text-foreground font-medium truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.is_featured && (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-amber-100 text-amber-700">Bestseller</span>
        )}
        {product.is_corporate_pick && (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-primary/10 text-primary">Corporate Pick</span>
        )}
        {isOutOfStock && (
          <span className="px-2.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-destructive/10 text-destructive">Out of Stock</span>
        )}
      </div>

      {/* Title + Description */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight leading-tight">
          {product.name}
        </h1>
        {product.short_description && (
          <p className="mt-2 text-muted-foreground text-base leading-relaxed">{product.short_description}</p>
        )}
      </div>

      {/* Rating */}
      {reviewStats && reviewStats.totalCount > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} className={i <= Math.round(reviewStats.averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{reviewStats.averageRating} / 5</span>
          <span className="text-sm text-muted-foreground">({reviewStats.totalCount} reviews)</span>
        </div>
      )}

      {/* Variant Colors */}
      {availableColors.length > 0 && (
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Color: {selectedVariant?.color || "—"}
          </p>
          <div className="flex gap-3 flex-wrap">
            {variants
              .filter((v) => v.color)
              .map((v) => (
                <button
                  key={v.id}
                  onClick={() => onVariantChange(v.id)}
                  aria-label={`Select ${v.color}`}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    selectedVariant?.id === v.id ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: v.color!, borderColor: v.color === "#FFFFFF" || v.color === "#ffffff" ? "#DADCE0" : v.color! }}
                />
              ))}
          </div>
        </div>
      )}

      {/* Variant Sizes */}
      {availableSizes.length > 0 && (
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-3">Size</p>
          <div className="flex gap-2 flex-wrap">
            {variants
              .filter((v) => v.size)
              .map((v) => (
                <button
                  key={v.id}
                  onClick={() => onVariantChange(v.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                    selectedVariant?.id === v.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {v.size}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Pricing Engine */}
      <div className="bg-card rounded-lg border border-border p-5 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 block">Quantity</label>
          <div className="flex items-center gap-3">
            <button onClick={() => onQuantityChange(Math.max(1, quantity - (quantity > 25 ? 25 : 1)))} className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors" aria-label="Decrease quantity">
              <Minus size={16} />
            </button>
            <input
              type="number" min="1" value={quantity}
              onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 h-10 text-center rounded-md border border-border font-medium text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={() => onQuantityChange(quantity < 25 ? 25 : quantity + 25)} className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors" aria-label="Increase quantity">
              <Plus size={16} />
            </button>
            {quantity < 25 && (
              <button onClick={() => onQuantityChange(25)} className="text-xs text-primary hover:underline transition-colors">Jump to bulk (25)</button>
            )}
          </div>
        </div>

        {/* Bulk Tiers */}
        {bulkTiers.length > 0 && (
          <div className="rounded-md border border-border overflow-hidden">
            {bulkTiers.map((tier, i) => {
              const active = priceCalc.appliedTier?.min_qty === tier.min_qty;
              const saving = tier.price_per_unit < priceCalc.basePrice
                ? Math.round(((priceCalc.basePrice - tier.price_per_unit) / priceCalc.basePrice) * 100)
                : 0;
              return (
                <div
                  key={tier.min_qty}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    active ? "bg-primary/5 border-l-2 border-primary font-medium text-foreground" : "text-muted-foreground"
                  } ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <span>{tier.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={active ? "text-primary font-semibold" : ""}>₹{tier.price_per_unit}/unit</span>
                    {saving > 0 && <span className={`text-[10px] ${active ? "text-primary" : "text-muted-foreground/60"}`}>↓{saving}%</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-semibold text-2xl text-foreground">₹{priceCalc.totalPrice.toLocaleString("en-IN")}</p>
            <p className="text-[10px] text-muted-foreground">+ {product.gst_rate || 18}% GST = ₹{priceCalc.totalWithGst.toLocaleString("en-IN")}</p>
          </div>
          {priceCalc.savingsAmount > 0 && quantity >= 25 && (
            <span className="px-3 py-1.5 rounded text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
              You save ₹{priceCalc.savingsAmount.toLocaleString("en-IN")}!
            </span>
          )}
        </div>
      </div>

      {/* Customization Options */}
      {customizationOptions.map((opt) => {
        const values = Array.isArray(opt.option_values) ? opt.option_values as any[] : [];
        if (values.length === 0) return null;
        const isOpen = openSections[opt.id] ?? false;
        return (
          <div key={opt.id} className="border border-border rounded-lg overflow-hidden">
            <button onClick={() => toggle(opt.id)} className="w-full flex items-center justify-between px-5 py-3.5 bg-card hover:bg-secondary/50 transition-colors">
              <span className="text-sm font-medium text-foreground">
                {opt.option_label} {opt.is_required && <span className="text-destructive">*</span>}
              </span>
              {isOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
            </button>
            {isOpen && (
              <div className="px-5 pb-4 grid gap-2">
                {values.map((val: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-md border border-border text-left">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{val.label || val.value || String(val)}</p>
                    </div>
                    {val.extra_cost && <span className="text-xs text-muted-foreground">+₹{val.extra_cost}/unit</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Artwork Upload */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button onClick={() => toggle("artwork")} className="w-full flex items-center justify-between px-5 py-3.5 bg-card hover:bg-secondary/50 transition-colors">
          <span className="text-sm font-medium text-foreground">Artwork Upload</span>
          {openSections.artwork ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </button>
        {openSections.artwork && (
          <div className="px-5 pb-4">
            {uploadedFile ? (
              <div className="rounded-md border border-primary bg-primary/5 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">✓</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{uploadedFile}</p>
                  <p className="text-xs text-muted-foreground">Uploaded successfully</p>
                </div>
                <button onClick={() => setUploadedFile("")} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
              </div>
            ) : (
              <div
                className={`rounded-md border-2 border-dashed p-8 text-center transition-colors ${fileDropHover ? "border-primary bg-primary/5" : "border-border"}`}
                onDragOver={(e) => { e.preventDefault(); setFileDropHover(true); }}
                onDragLeave={() => setFileDropHover(false)}
                onDrop={(e) => { e.preventDefault(); setFileDropHover(false); setUploadedFile("company-logo.png"); }}
              >
                <Upload size={24} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-foreground mb-1">
                  Drop your logo or design here, or{" "}
                  <button onClick={() => setUploadedFile("brand-logo.png")} className="text-primary hover:underline font-medium">browse</button>
                </p>
                <p className="text-[10px] text-muted-foreground">Accepted: PNG, PDF, AI, PSD · Min 300 DPI · Max 10MB</p>
                <p className="text-[10px] text-primary mt-2 font-medium">Don't have a design? Our designers will create one FREE</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Special Instructions */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button onClick={() => toggle("instructions")} className="w-full flex items-center justify-between px-5 py-3.5 bg-card hover:bg-secondary/50 transition-colors">
          <span className="text-sm font-medium text-foreground">Special Instructions</span>
          {openSections.instructions ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </button>
        {openSections.instructions && (
          <div className="px-5 pb-4">
            <textarea
              rows={3} maxLength={500} value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="E.g. Employee names on each item, specific pantone color, packaging preferences..."
              className="w-full px-4 py-3 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <p className="text-right text-[10px] text-muted-foreground mt-1">{specialInstructions.length}/500</p>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        {isOutOfStock ? (
          <Button variant="outline" size="lg" className="w-full">
            Notify Me When Available
          </Button>
        ) : (
          <Button variant="default" size="lg" className="w-full">
            Add to Quote Cart <ArrowRight size={16} />
          </Button>
        )}
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button variant="outline" size="lg" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get Instant WhatsApp Quote
          </Button>
        </a>
      </div>

      {/* Trust points */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
        {trustPoints.map((tp) => (
          <span key={tp.text} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <tp.icon size={12} className="text-primary" /> {tp.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DynamicProductInfo;
