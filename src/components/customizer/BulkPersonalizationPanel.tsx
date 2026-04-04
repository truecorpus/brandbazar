import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Users, MousePointerClick, Table2, Eye, ShoppingCart, AlertTriangle, CheckCircle2, ImagePlus } from "lucide-react";
import type { DesignLayer } from "@/hooks/useCustomizerStore";
import BulkDataTable, { type VariableField, type BulkRow } from "./BulkDataTable";
import BulkPreviewCarousel from "./BulkPreviewCarousel";

interface BulkPersonalizationPanelProps {
  layers: DesignLayer[];
  canvasWidth: number;
  canvasHeight: number;
  unitPrice: number;
  onProceedToQuote: (data: {
    variableFields: VariableField[];
    rows: BulkRow[];
    identicalQty: number;
    personalizedQty: number;
    totalQty: number;
    personalizationCostPerUnit: number;
  }) => void;
}

const TEXT_PERSONALIZATION_COST = 15;
const PHOTO_PERSONALIZATION_COST = 25;

export default function BulkPersonalizationPanel({
  layers,
  canvasWidth,
  canvasHeight,
  unitPrice,
  onProceedToQuote,
}: BulkPersonalizationPanelProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [variableFields, setVariableFields] = useState<VariableField[]>([]);
  const [rows, setRows] = useState<BulkRow[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [totalQuantity, setTotalQuantity] = useState(100);

  const toggleVariable = useCallback(
    (layer: DesignLayer) => {
      setVariableFields((prev) => {
        const exists = prev.find((f) => f.layerId === layer.id);
        if (exists) return prev.filter((f) => f.layerId !== layer.id);
        return [
          ...prev,
          {
            layerId: layer.id,
            fieldName: layer.name || `Field ${prev.length + 1}`,
            fieldType: layer.type === "image" ? ("image" as const) : ("text" as const),
            required: true,
          },
        ];
      });
    },
    []
  );

  const hasPhotoFields = variableFields.some((f) => f.fieldType === "image");
  const personalizationCost = hasPhotoFields ? PHOTO_PERSONALIZATION_COST : variableFields.length > 0 ? TEXT_PERSONALIZATION_COST : 0;
  const personalizedQty = rows.length;
  const identicalQty = Math.max(0, totalQuantity - personalizedQty);

  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (variableFields.length === 0) errors.push("No variable fields defined");
    if (rows.length === 0 && step >= 2) errors.push("No personalization data entered");
    rows.forEach((row, i) => {
      variableFields.forEach((f) => {
        if (f.required && !row.values[f.fieldName]?.trim()) {
          errors.push(`Row ${i + 1}: missing ${f.fieldName}`);
        }
      });
    });
    if (personalizedQty > totalQuantity) errors.push("Personalized units exceed total quantity");
    return errors;
  }, [variableFields, rows, step, personalizedQty, totalQuantity]);

  const isComplete = variableFields.length > 0 && rows.length > 0 && validationErrors.length === 0;
  const completionPercent = Math.min(100, Math.round((rows.filter((r) => variableFields.every((f) => !f.required || r.values[f.fieldName]?.trim())).length / Math.max(1, rows.length)) * 100));

  const textLayers = layers.filter((l) => l.type === "text");
  const imageLayers = layers.filter((l) => l.type === "image");
  const eligibleLayers = [...textLayers, ...imageLayers];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white" style={{ borderLeft: "1px solid #DADCE0" }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: "#DADCE0" }}>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4" style={{ color: "#1A73E8" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#202124" }}>
            Bulk Personalization
          </h2>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: "#5F6368" }}>
          Personalize individual units with unique names, photos, or text while keeping the base design consistent across all.
        </p>

        {/* Steps indicator */}
        <div className="flex gap-1 mt-3">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s as 1 | 2 | 3)}
              className="flex-1 h-1.5 rounded-full transition-all"
              style={{ backgroundColor: step >= s ? "#1A73E8" : "#E0E0E0" }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px]" style={{ color: step >= 1 ? "#1A73E8" : "#9E9E9E" }}>Define Fields</span>
          <span className="text-[10px]" style={{ color: step >= 2 ? "#1A73E8" : "#9E9E9E" }}>Enter Data</span>
          <span className="text-[10px]" style={{ color: step >= 3 ? "#1A73E8" : "#9E9E9E" }}>Preview & Submit</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* STEP 1: Define Variable Fields */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5" style={{ color: "#1A73E8" }} />
              <span className="text-xs font-medium" style={{ color: "#202124" }}>
                Click layers to mark as variable
              </span>
            </div>
            <p className="text-[11px]" style={{ color: "#5F6368" }}>
              Select which text or image layers will be different for each unit.
            </p>

            {eligibleLayers.length === 0 ? (
              <div className="text-center py-6 rounded-lg border border-dashed" style={{ borderColor: "#DADCE0" }}>
                <p className="text-xs" style={{ color: "#5F6368" }}>
                  Add text or image layers to your design first, then mark them as variable here.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {eligibleLayers.map((layer) => {
                  const isVariable = variableFields.some((f) => f.layerId === layer.id);
                  return (
                    <button
                      key={layer.id}
                      onClick={() => toggleVariable(layer)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all text-left"
                      style={{
                        borderColor: isVariable ? "#1A73E8" : "#DADCE0",
                        backgroundColor: isVariable ? "#E8F0FE" : "white",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0"
                        style={{
                          borderColor: isVariable ? "#1A73E8" : "#DADCE0",
                          backgroundColor: isVariable ? "#1A73E8" : "transparent",
                        }}
                      >
                        {isVariable && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium truncate" style={{ color: "#202124" }}>
                          {layer.name}
                        </div>
                        <div className="text-[10px]" style={{ color: "#5F6368" }}>
                          {layer.type === "text" ? `"${(layer.text || "").slice(0, 30)}"` : layer.fileName || "Image"}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {layer.type === "image" ? "Photo" : "Text"}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            )}

            {variableFields.length > 0 && (
              <Button
                size="sm"
                className="w-full h-9 text-xs gap-1.5"
                style={{ backgroundColor: "#1A73E8" }}
                onClick={() => setStep(2)}
              >
                <Table2 className="w-3.5 h-3.5" /> Continue to Data Entry ({variableFields.length} field{variableFields.length > 1 ? "s" : ""})
              </Button>
            )}
          </div>
        )}

        {/* STEP 2: Data Entry */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Table2 className="w-3.5 h-3.5" style={{ color: "#1A73E8" }} />
              <span className="text-xs font-medium" style={{ color: "#202124" }}>
                Enter personalization data
              </span>
            </div>

            {/* Quantity config */}
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="flex-1">
                <label className="text-[10px] uppercase font-medium" style={{ color: "#5F6368" }}>Total Quantity</label>
                <div className="flex items-center gap-2 mt-1">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setTotalQuantity(Math.max(25, totalQuantity - 25))}>-</Button>
                  <span className="text-sm font-semibold w-12 text-center" style={{ color: "#202124" }}>{totalQuantity}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setTotalQuantity(totalQuantity + 25)}>+</Button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px]" style={{ color: "#5F6368" }}>Identical: {identicalQty}</div>
                <div className="text-[10px]" style={{ color: "#1A73E8" }}>Personalized: {personalizedQty}</div>
              </div>
            </div>

            <BulkDataTable
              fields={variableFields}
              rows={rows}
              onRowsChange={setRows}
              onSelectRow={setSelectedRowIndex}
              selectedRowIndex={selectedRowIndex}
            />

            {rows.length > 0 && (
              <Button
                size="sm"
                className="w-full h-9 text-xs gap-1.5"
                style={{ backgroundColor: "#1A73E8" }}
                onClick={() => setStep(3)}
              >
                <Eye className="w-3.5 h-3.5" /> Preview Individual Units
              </Button>
            )}
          </div>
        )}

        {/* STEP 3: Preview & Summary */}
        {step === 3 && (
          <div className="space-y-4">
            <BulkPreviewCarousel
              baseDesignLayers={layers}
              variableFields={variableFields}
              rows={rows}
              selectedIndex={selectedRowIndex ?? 0}
              onSelectIndex={setSelectedRowIndex}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />

            <Separator />

            {/* Summary */}
            <div className="rounded-lg border p-3 space-y-2" style={{ borderColor: "#DADCE0" }}>
              <h3 className="text-xs font-semibold" style={{ color: "#202124" }}>Order Summary</h3>

              <div className="text-[11px] space-y-1" style={{ color: "#5F6368" }}>
                <div className="flex justify-between">
                  <span>{totalQuantity} total units configured:</span>
                </div>
                <div className="flex justify-between pl-3">
                  <span>• {identicalQty} identical units</span>
                </div>
                <div className="flex justify-between pl-3">
                  <span>• {personalizedQty} personalized units</span>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="text-[11px] space-y-1">
                <div className="flex justify-between" style={{ color: "#5F6368" }}>
                  <span>Base price</span>
                  <span>₹{unitPrice}/unit</span>
                </div>
                {personalizationCost > 0 && (
                  <div className="flex justify-between" style={{ color: "#1A73E8" }}>
                    <span>+ {hasPhotoFields ? "Photo" : "Text"} personalization</span>
                    <span>₹{personalizationCost}/unit</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold" style={{ color: "#202124" }}>
                  <span>Unit cost (personalized)</span>
                  <span>₹{unitPrice + personalizationCost}</span>
                </div>
                <div className="flex justify-between text-xs font-bold pt-1" style={{ color: "#202124" }}>
                  <span>Estimated total</span>
                  <span>
                    ₹{(identicalQty * unitPrice + personalizedQty * (unitPrice + personalizationCost)).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <p className="text-[10px]" style={{ color: "#9E9E9E" }}>
                Prices include GST. Bulk discounts applied automatically.
              </p>
            </div>

            {/* Completion progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px]" style={{ color: "#5F6368" }}>
                <span>Data completion</span>
                <span>{completionPercent}%</span>
              </div>
              <Progress value={completionPercent} className="h-2" />
            </div>

            {/* Validation */}
            {validationErrors.length > 0 && (
              <div className="rounded-lg p-3 space-y-1" style={{ backgroundColor: "#FFF3E0" }}>
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#E65100" }}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {validationErrors.length} issue(s) to resolve
                </div>
                {validationErrors.slice(0, 3).map((err, i) => (
                  <div key={i} className="text-[10px]" style={{ color: "#BF360C" }}>{err}</div>
                ))}
              </div>
            )}

            <Button
              size="sm"
              className="w-full h-10 text-xs gap-1.5 font-medium"
              style={{ backgroundColor: isComplete ? "#1A73E8" : undefined }}
              disabled={!isComplete}
              onClick={() =>
                onProceedToQuote({
                  variableFields,
                  rows,
                  identicalQty,
                  personalizedQty,
                  totalQty: totalQuantity,
                  personalizationCostPerUnit: personalizationCost,
                })
              }
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Proceed to Quote
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
