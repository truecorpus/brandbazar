import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DesignLayer } from "@/hooks/useCustomizerStore";
import type { BulkRow, VariableField } from "./BulkDataTable";

interface BulkPreviewCarouselProps {
  baseDesignLayers: DesignLayer[];
  variableFields: VariableField[];
  rows: BulkRow[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  canvasWidth: number;
  canvasHeight: number;
}

export default function BulkPreviewCarousel({
  baseDesignLayers,
  variableFields,
  rows,
  selectedIndex,
  onSelectIndex,
  canvasWidth,
  canvasHeight,
}: BulkPreviewCarouselProps) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-6 text-xs" style={{ color: "#5F6368" }}>
        Add personalization data to see individual unit previews
      </div>
    );
  }

  const currentRow = rows[selectedIndex];
  if (!currentRow) return null;

  // Build merged layers — replace variable text layers with row data
  const mergedLayers = baseDesignLayers.map((layer) => {
    const field = variableFields.find((f) => f.layerId === layer.id);
    if (!field || field.fieldType !== "text") return layer;
    return { ...layer, text: currentRow.values[field.fieldName] || layer.text };
  });

  const scale = 200 / Math.max(canvasWidth, canvasHeight);

  // Get a label for this row
  const firstTextField = variableFields.find((f) => f.fieldType === "text");
  const rowLabel = firstTextField ? currentRow.values[firstTextField.fieldName] || `Unit ${selectedIndex + 1}` : `Unit ${selectedIndex + 1}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "#202124" }}>
          Unit {selectedIndex + 1} of {rows.length} — {rowLabel}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={selectedIndex === 0}
            onClick={() => onSelectIndex(selectedIndex - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={selectedIndex === rows.length - 1}
            onClick={() => onSelectIndex(selectedIndex + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mini canvas preview */}
      <div
        className="border rounded-lg overflow-hidden mx-auto"
        style={{
          width: canvasWidth * scale,
          height: canvasHeight * scale,
          borderColor: "#DADCE0",
          backgroundColor: "#F8F9FA",
          position: "relative",
        }}
      >
        {mergedLayers
          .filter((l) => l.visible)
          .map((layer) => {
            if (layer.type === "text") {
              return (
                <div
                  key={layer.id}
                  style={{
                    position: "absolute",
                    left: layer.x * scale,
                    top: layer.y * scale,
                    fontSize: (layer.fontSize || 24) * scale,
                    fontFamily: layer.fontFamily || "Inter",
                    color: layer.fontColor || "#202124",
                    fontWeight: layer.fontWeight || "normal",
                    fontStyle: layer.fontStyle || "normal",
                    opacity: layer.opacity,
                    transform: `rotate(${layer.rotation}deg)`,
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                  }}
                >
                  {layer.text}
                </div>
              );
            }
            if (layer.type === "image" && layer.imageUrl) {
              return (
                <img
                  key={layer.id}
                  src={layer.imageUrl}
                  alt=""
                  style={{
                    position: "absolute",
                    left: layer.x * scale,
                    top: layer.y * scale,
                    width: layer.width * scale,
                    height: layer.height * scale,
                    opacity: layer.opacity,
                    transform: `rotate(${layer.rotation}deg)`,
                    objectFit: "cover",
                  }}
                />
              );
            }
            if (layer.type === "shape") {
              return (
                <div
                  key={layer.id}
                  style={{
                    position: "absolute",
                    left: layer.x * scale,
                    top: layer.y * scale,
                    width: layer.width * scale,
                    height: layer.height * scale,
                    backgroundColor: layer.fillColor || "#1A73E8",
                    borderRadius: (layer.cornerRadius || 0) * scale,
                    opacity: layer.opacity,
                    transform: `rotate(${layer.rotation}deg)`,
                  }}
                />
              );
            }
            return null;
          })}
      </div>

      {/* Row thumbnail strip */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {rows.slice(0, 20).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelectIndex(i)}
            className="shrink-0 w-8 h-8 rounded border text-[10px] font-medium transition-all"
            style={{
              borderColor: selectedIndex === i ? "#1A73E8" : "#DADCE0",
              backgroundColor: selectedIndex === i ? "#E8F0FE" : "white",
              color: selectedIndex === i ? "#1A73E8" : "#5F6368",
            }}
          >
            {i + 1}
          </button>
        ))}
        {rows.length > 20 && (
          <span className="text-[10px] self-center ml-1" style={{ color: "#5F6368" }}>
            +{rows.length - 20} more
          </span>
        )}
      </div>
    </div>
  );
}
