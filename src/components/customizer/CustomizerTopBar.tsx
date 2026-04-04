import { ArrowLeft, Undo2, Redo2, Minus, Plus, RotateCcw, Save, Eye, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CustomizerTopBarProps {
  productName: string;
  autoSaveStatus: "saved" | "saving" | "unsaved";
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
  onPreview: () => void;
  onAddToCart: () => void;
  onBulkPersonalization?: () => void;
  isBulkMode?: boolean;
  canUndo: boolean;
  canRedo: boolean;
  hasCustomization: boolean;
  unitPrice: number;
  minQuantity: number;
}

export default function CustomizerTopBar({
  productName,
  autoSaveStatus,
  zoom,
  onZoomIn,
  onZoomOut,
  onUndo,
  onRedo,
  onReset,
  onSave,
  onPreview,
  onAddToCart,
  onBulkPersonalization,
  isBulkMode,
  canUndo,
  canRedo,
  hasCustomization,
  unitPrice,
  minQuantity,
}: CustomizerTopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="h-16 border-b flex items-center justify-between px-4 bg-white shrink-0" style={{ borderColor: "#DADCE0" }}>
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm hover:text-[#202124] transition-colors"
          style={{ color: "#5F6368" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Product</span>
        </button>
        <div className="w-px h-6 bg-[#DADCE0] hidden sm:block" />
        <span className="text-sm font-medium truncate max-w-[200px] lg:max-w-[300px]" style={{ color: "#202124" }}>
          Customizing: {productName || "Product"}
        </span>
        <div className="flex items-center gap-1 ml-2">
          <span
            className={`w-2 h-2 rounded-full ${
              autoSaveStatus === "saved"
                ? "bg-green-500"
                : autoSaveStatus === "saving"
                ? "bg-amber-400 animate-pulse"
                : "bg-gray-400"
            }`}
          />
          <span className="text-xs hidden sm:inline" style={{ color: "#5F6368" }}>
            {autoSaveStatus === "saved"
              ? "All changes saved"
              : autoSaveStatus === "saving"
              ? "Saving..."
              : "Unsaved changes"}
          </span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onUndo} disabled={!canUndo} className="h-8 w-8">
              <Undo2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onRedo} disabled={!canRedo} className="h-8 w-8">
              <Redo2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
        <div className="w-px h-5 bg-[#DADCE0] mx-1" />
        <Button variant="ghost" size="icon" onClick={onZoomOut} className="h-8 w-8">
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-xs font-medium w-10 text-center" style={{ color: "#5F6368" }}>
          {zoom}%
        </span>
        <Button variant="ghost" size="icon" onClick={onZoomIn} className="h-8 w-8">
          <Plus className="w-4 h-4" />
        </Button>
        <div className="w-px h-5 bg-[#DADCE0] mx-1 hidden md:block" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs hidden md:flex gap-1 h-8"
          style={{ color: "#5F6368" }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onSave} className="hidden sm:flex gap-1.5 h-8 text-xs border-[#DADCE0]">
          <Save className="w-3.5 h-3.5" /> Save
        </Button>
        <Button variant="outline" size="sm" onClick={onPreview} className="hidden md:flex gap-1.5 h-8 text-xs border-[#DADCE0]">
          <Eye className="w-3.5 h-3.5" /> Preview
        </Button>
        <Button
          size="sm"
          onClick={onAddToCart}
          disabled={!hasCustomization}
          className="h-8 text-xs gap-1.5"
          style={{ backgroundColor: hasCustomization ? "#1A73E8" : undefined }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add to Quote</span>
        </Button>
        {unitPrice > 0 && (
          <div className="hidden lg:flex flex-col items-end ml-2">
            <span className="text-sm font-semibold" style={{ color: "#202124" }}>
              ₹{unitPrice}/unit
            </span>
            <span className="text-[10px]" style={{ color: "#5F6368" }}>
              Min {minQuantity} units
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
