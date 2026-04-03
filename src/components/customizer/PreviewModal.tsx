import { useState, useCallback, useMemo } from "react";
import {
  X, Check, ShoppingCart, FileText, Copy, Share2,
  Minus, Plus, Calendar, Zap, ChevronLeft, ChevronRight,
  ZoomIn, MessageCircle, AlertTriangle, AlertCircle, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { DesignLayer, PrintZone, ProductView } from "@/hooks/useCustomizerStore";
import { checkDesignQuality, type QualityWarning } from "@/lib/designQualityChecker";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  unitPrice: number;
  minQuantity: number;
  layers: DesignLayer[];
  views: ProductView[];
  printZones: PrintZone[];
  activeViewId: string;
  selectedPrintMethod: string;
  baseProductImageUrl: string;
  canvasWidth: number;
  canvasHeight: number;
  onAddToCart: () => void;
}

export default function PreviewModal({
  isOpen,
  onClose,
  productName,
  unitPrice,
  minQuantity,
  layers,
  views,
  printZones,
  activeViewId,
  selectedPrintMethod,
  baseProductImageUrl,
  onAddToCart,
}: PreviewModalProps) {
  const [currentViewId, setCurrentViewId] = useState(activeViewId);
  const [quantity, setQuantity] = useState(minQuantity);
  const [approved, setApproved] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Quality check
  const qualityWarnings = useMemo(
    () => checkDesignQuality(layers, printZones),
    [layers, printZones]
  );
  const hasErrors = qualityWarnings.some((w) => w.severity === "error");
    digital_print: "Digital Print",
    sublimation: "Sublimation",
    screen_print: "Screen Print",
  };

  // Build customization summary
  const viewLayers = (viewId: string) => layers.filter((l) => l.viewId === viewId);
  const textLayers = layers.filter((l) => l.type === "text");
  const imageLayers = layers.filter((l) => l.type === "image");
  const viewsWithLayers = views.filter((v) => viewLayers(v.id).length > 0);

  // Pricing
  const sidesUsed = viewsWithLayers.length;
  const bothSidesCost = sidesUsed > 1 ? 20 : 0;
  const totalPerUnit = unitPrice + bothSidesCost;
  const minTotal = totalPerUnit * minQuantity;
  const orderTotal = totalPerUnit * quantity;

  const handleCopyLink = useCallback(() => {
    const link = `${window.location.origin}/design/preview-${Date.now()}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Design link copied to clipboard");
    });
  }, []);

  const handleWhatsAppShare = useCallback(() => {
    const link = `${window.location.origin}/design/preview-${Date.now()}`;
    const message = encodeURIComponent(`Hi, please review my BrandBazaar design: ${link}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!approved) return;
    onAddToCart();
    onClose();
  }, [approved, onAddToCart, onClose]);

  if (!isOpen) return null;

  const currentViewIndex = views.findIndex((v) => v.id === currentViewId);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[95vh] bg-white rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 md:fade-in-0 md:zoom-in-95 duration-300 shadow-2xl mx-0 md:mx-4">
        {/* Top Bar */}
        <div
          className="flex items-center justify-between px-4 md:px-6 py-4 border-b shrink-0"
          style={{ borderColor: "#DADCE0" }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "#202124" }}>
            Your Design Preview
          </h2>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden md:flex gap-1.5 h-9 text-xs"
              style={{ backgroundColor: approved ? "#1A73E8" : undefined }}
              disabled={!approved}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Looks good! Add to Cart
            </Button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" style={{ color: "#5F6368" }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          {/* Left: Preview Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-[300px] md:min-h-0" style={{ backgroundColor: "#F8F9FA" }}>
            {/* Main Preview Image */}
            <div
              className={`relative w-full max-w-md aspect-square rounded-xl overflow-hidden bg-white shadow-lg transition-transform duration-200 cursor-zoom-in ${
                zoomed ? "scale-150 cursor-zoom-out" : ""
              }`}
              onClick={() => setZoomed(!zoomed)}
              style={{
                boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Product mockup composite */}
              <div className="absolute inset-0 flex items-center justify-center p-8" style={{ backgroundColor: "#FAFAFA" }}>
                {/* Product shadow */}
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full"
                  style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 70%)" }}
                />

                {/* Base product placeholder with perspective */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className="w-48 h-56 md:w-56 md:h-64 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)",
                      transform: "perspective(800px) rotateY(-5deg) rotateX(2deg)",
                    }}
                  >
                    {/* Print zone with design layers */}
                    <div className="absolute inset-4 rounded-lg overflow-hidden border border-dashed" style={{ borderColor: "#E8F0FE" }}>
                      {viewLayers(currentViewId).map((layer) => (
                        <div
                          key={layer.id}
                          className="absolute"
                          style={{
                            left: `${(layer.x / 700) * 100}%`,
                            top: `${(layer.y / 600) * 100}%`,
                            transform: `rotate(${layer.rotation}deg)`,
                            opacity: layer.opacity,
                          }}
                        >
                          {layer.type === "text" && (
                            <span
                              style={{
                                fontSize: `${Math.max(8, (layer.fontSize || 24) * 0.4)}px`,
                                fontFamily: layer.fontFamily || "Inter",
                                color: layer.fontColor || "#202124",
                                fontWeight: layer.fontWeight || "normal",
                                fontStyle: layer.fontStyle || "normal",
                                letterSpacing: `${layer.letterSpacing || 0}px`,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {layer.text}
                            </span>
                          )}
                          {layer.type === "image" && layer.imageUrl && (
                            <img
                              src={layer.imageUrl}
                              alt={layer.fileName || "Design"}
                              className="max-w-16 max-h-16 object-contain"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Product label */}
                    <span
                      className="absolute bottom-2 text-[8px] font-medium tracking-wider uppercase"
                      style={{ color: "#DADCE0" }}
                    >
                      {productName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Zoom indicator */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                <ZoomIn className="w-3.5 h-3.5" style={{ color: "#5F6368" }} />
              </div>
            </div>

            {/* View Thumbnails */}
            {views.length > 1 && (
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => {
                    const prev = (currentViewIndex - 1 + views.length) % views.length;
                    setCurrentViewId(views[prev].id);
                  }}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white transition-colors"
                  style={{ borderColor: "#DADCE0" }}
                >
                  <ChevronLeft className="w-4 h-4" style={{ color: "#5F6368" }} />
                </button>
                {views.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setCurrentViewId(v.id)}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-[10px] font-medium transition-all"
                    style={{
                      borderColor: currentViewId === v.id ? "#1A73E8" : "#DADCE0",
                      backgroundColor: currentViewId === v.id ? "#E8F0FE" : "white",
                      color: currentViewId === v.id ? "#1A73E8" : "#5F6368",
                    }}
                  >
                    {v.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    const next = (currentViewIndex + 1) % views.length;
                    setCurrentViewId(views[next].id);
                  }}
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white transition-colors"
                  style={{ borderColor: "#DADCE0" }}
                >
                  <ChevronRight className="w-4 h-4" style={{ color: "#5F6368" }} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Design Summary */}
          <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l p-5 md:p-6 space-y-5 shrink-0" style={{ borderColor: "#DADCE0" }}>
            {/* Product Info */}
            <div>
              <h3 className="text-base font-semibold" style={{ color: "#202124" }}>
                {productName || "Custom Product"}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "#5F6368" }}>
                {printMethodLabel[selectedPrintMethod] || selectedPrintMethod}
              </p>
            </div>

            {/* Customization Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5F6368" }}>
                Customization Summary
              </h4>
              <div className="space-y-1.5">
                {viewsWithLayers.map((v) => (
                  <div key={v.id} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#34A853" }} />
                    <span className="text-xs" style={{ color: "#202124" }}>
                      {v.name}: {viewLayers(v.id).length} element{viewLayers(v.id).length !== 1 ? "s" : ""} · {printMethodLabel[selectedPrintMethod] || "Custom print"}
                    </span>
                  </div>
                ))}
                {textLayers.map((l) => (
                  <div key={l.id} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#34A853" }} />
                    <span className="text-xs" style={{ color: "#202124" }}>
                      Text: "{(l.text || "").substring(0, 30)}{(l.text || "").length > 30 ? "..." : ""}" ({l.fontFamily}, {l.fontColor})
                    </span>
                  </div>
                ))}
                {imageLayers.map((l) => (
                  <div key={l.id} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#34A853" }} />
                    <span className="text-xs" style={{ color: "#202124" }}>
                      Image: {l.fileName || "Uploaded logo"}
                    </span>
                  </div>
                ))}
                {layers.length === 0 && (
                  <p className="text-xs italic" style={{ color: "#9AA0A6" }}>
                    No customizations added yet
                  </p>
                )}
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div
              className="rounded-xl p-4 space-y-2"
              style={{ backgroundColor: "#F8F9FA", border: "1px solid #EEEEEE" }}
            >
              <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5F6368" }}>
                Pricing
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span style={{ color: "#5F6368" }}>Base price</span>
                  <span style={{ color: "#202124" }}>₹{unitPrice}/unit</span>
                </div>
                {bothSidesCost > 0 && (
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "#5F6368" }}>+ Both sides print</span>
                    <span style={{ color: "#202124" }}>₹{bothSidesCost}/unit</span>
                  </div>
                )}
                <div className="border-t my-2" style={{ borderColor: "#DADCE0" }} />
                <div className="flex justify-between text-sm font-semibold">
                  <span style={{ color: "#202124" }}>Total</span>
                  <span style={{ color: "#1A73E8" }}>₹{totalPerUnit}/unit</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-2">
                <label className="text-[10px] uppercase tracking-wider font-medium mb-1.5 block" style={{ color: "#5F6368" }}>
                  Quantity (Min. {minQuantity})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(minQuantity, quantity - 25))}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-white transition-colors"
                    style={{ borderColor: "#DADCE0" }}
                  >
                    <Minus className="w-3.5 h-3.5" style={{ color: "#5F6368" }} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={minQuantity}
                    onChange={(e) => setQuantity(Math.max(minQuantity, Number(e.target.value)))}
                    className="w-20 h-8 rounded-lg border text-center text-sm font-medium"
                    style={{ borderColor: "#DADCE0", color: "#202124" }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 25)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-white transition-colors"
                    style={{ borderColor: "#DADCE0" }}
                  >
                    <Plus className="w-3.5 h-3.5" style={{ color: "#5F6368" }} />
                  </button>
                </div>
                <p className="text-xs font-medium mt-2" style={{ color: "#202124" }}>
                  Order total: <span style={{ color: "#1A73E8" }}>₹{orderTotal.toLocaleString("en-IN")}</span>
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#9AA0A6" }}>
                  Prices include GST. Bulk discounts applied automatically.
                </p>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" style={{ color: "#5F6368" }} />
                <span className="text-xs" style={{ color: "#202124" }}>
                  Standard delivery: 5–7 working days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" style={{ color: "#F5A623" }} />
                <span className="text-xs" style={{ color: "#202124" }}>
                  Express available: 2–3 days (+₹500 flat)
                </span>
              </div>
            </div>

            {/* Approval Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={approved}
                onChange={(e) => setApproved(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-2 accent-[#1A73E8] cursor-pointer"
                style={{ borderColor: "#DADCE0" }}
              />
              <span className="text-[11px] leading-relaxed" style={{ color: "#5F6368" }}>
                I have reviewed my design and confirm it is correct. I understand that once production begins, changes cannot be made.
              </span>
            </label>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full h-11 gap-2 text-sm font-medium"
                style={{ backgroundColor: approved ? "#1A73E8" : undefined }}
                disabled={!approved}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 gap-2 text-xs"
                style={{ borderColor: "#DADCE0", color: "#5F6368" }}
                onClick={() => {
                  toast.success("Mockup request submitted! Our team will prepare a professional mockup.");
                  onClose();
                }}
              >
                <FileText className="w-3.5 h-3.5" />
                Request Free Mockup Instead
              </Button>
            </div>

            {/* Share Design */}
            <div className="border-t pt-4 space-y-2" style={{ borderColor: "#EEEEEE" }}>
              <h4 className="text-xs font-semibold" style={{ color: "#5F6368" }}>
                Share your design
              </h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5 text-xs h-8"
                  style={{ borderColor: "#DADCE0" }}
                  onClick={handleCopyLink}
                >
                  <Copy className="w-3 h-3" />
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5 text-xs h-8"
                  style={{ borderColor: "#25D366", color: "#25D366" }}
                  onClick={handleWhatsAppShare}
                >
                  <MessageCircle className="w-3 h-3" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
