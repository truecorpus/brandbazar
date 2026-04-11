import { useCallback } from "react";
import {
  Eye, EyeOff, Lock, Unlock, Trash2, Copy,
  GripVertical, Type, ImageIcon, Hexagon, Sparkles,
  FlipHorizontal, FlipVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DesignLayer } from "@/hooks/useCustomizerStore";

interface RightPanelProps {
  selectedLayer: DesignLayer | undefined;
  currentViewLayers: DesignLayer[];
  onUpdateLayer: (id: string, updates: Partial<DesignLayer>) => void;
  onDeleteLayer: (id: string) => void;
  onDuplicateLayer: (id: string) => void;
  onSelectLayer: (id: string | null) => void;
  onReorderLayers: (fromIndex: number, toIndex: number) => void;
}

const layerIcons: Record<string, React.ElementType> = {
  text: Type, image: ImageIcon, shape: Hexagon, clipart: Sparkles,
};

const presetColors = [
  "#202124", "#FFFFFF", "#1A73E8", "#EA4335",
  "#FBBC04", "#34A853", "#FF6D01", "#9C27B0",
  "#00BCD4", "#795548", "#607D8B", "#E91E63",
];

export default function RightPanel({
  selectedLayer, currentViewLayers,
  onUpdateLayer, onDeleteLayer, onDuplicateLayer, onSelectLayer, onReorderLayers,
}: RightPanelProps) {
  const handleDelete = useCallback((id: string) => {
    if (confirm("Delete this layer?")) onDeleteLayer(id);
  }, [onDeleteLayer]);

  return (
    <div className="w-[300px] border-l bg-white flex flex-col shrink-0 hidden lg:flex" style={{ borderColor: "#DADCE0" }}>
      <ScrollArea className="flex-1">
        {/* Layer Properties */}
        {selectedLayer ? (
          <div className="p-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5F6368" }}>
              {selectedLayer.type} Properties
            </h3>

            {/* Position & Size */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "X", key: "x" },
                { label: "Y", key: "y" },
                { label: "W", key: "width" },
                { label: "H", key: "height" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-[10px] font-medium" style={{ color: "#9AA0A6" }}>{label}</label>
                  <Input type="number" value={Math.round((selectedLayer as any)[key] || 0)}
                    onChange={(e) => onUpdateLayer(selectedLayer.id, { [key]: Number(e.target.value) })}
                    className="h-7 text-xs" />
                </div>
              ))}
            </div>

            {/* Rotation */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Rotation</label>
              <div className="flex items-center gap-2">
                <Slider value={[selectedLayer.rotation]} min={-180} max={180} step={1}
                  onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { rotation: v })} className="flex-1" />
                <Input type="number" value={selectedLayer.rotation} min={-180} max={180}
                  onChange={(e) => onUpdateLayer(selectedLayer.id, { rotation: Number(e.target.value) })}
                  className="h-7 w-14 text-xs text-center" />
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Opacity</label>
              <div className="flex items-center gap-2">
                <Slider value={[selectedLayer.opacity * 100]} min={0} max={100} step={1}
                  onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { opacity: v / 100 })} className="flex-1" />
                <span className="text-xs w-8 text-right" style={{ color: "#5F6368" }}>{Math.round(selectedLayer.opacity * 100)}%</span>
              </div>
            </div>

            {/* Text-specific */}
            {selectedLayer.type === "text" && (
              <>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Text Content</label>
                  <textarea value={selectedLayer.text || ""}
                    onChange={(e) => onUpdateLayer(selectedLayer.id, { text: e.target.value })}
                    className="w-full border rounded-md p-2 text-sm h-16 resize-none" style={{ borderColor: "#DADCE0" }} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={selectedLayer.fontColor || "#202124"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fontColor: e.target.value })}
                      className="w-8 h-8 rounded border cursor-pointer" style={{ borderColor: "#DADCE0" }} />
                    <Input value={selectedLayer.fontColor || "#202124"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fontColor: e.target.value })}
                      className="h-7 text-xs flex-1" />
                  </div>
                </div>
                {selectedLayer.textEffect === "curved" && (
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Curve Radius</label>
                    <Slider value={[selectedLayer.curveRadius || 200]} min={50} max={500} step={10}
                      onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { curveRadius: v })} />
                  </div>
                )}
              </>
            )}

            {/* Image-specific */}
            {(selectedLayer.type === "image" || selectedLayer.type === "clipart") && (
              <>
                {selectedLayer.imageUrl && (
                  <div className="rounded-lg overflow-hidden border" style={{ borderColor: "#DADCE0" }}>
                    <img src={selectedLayer.imageUrl} alt="Layer preview" className="w-full h-24 object-contain bg-[#F8F9FA]" />
                  </div>
                )}
                {selectedLayer.fileName && (
                  <p className="text-[10px] truncate" style={{ color: "#5F6368" }}>{selectedLayer.fileName}</p>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-8">
                    <FlipHorizontal className="w-3.5 h-3.5" /> Flip H
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-8">
                    <FlipVertical className="w-3.5 h-3.5" /> Flip V
                  </Button>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Filters</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {["none", "grayscale", "sepia", "contrast", "brightness"].map((f) => (
                      <button key={f}
                        onClick={() => onUpdateLayer(selectedLayer.id, { filter: f })}
                        className="px-2 py-1 rounded text-[10px] border capitalize transition-all"
                        style={{
                          borderColor: selectedLayer.filter === f ? "#1A73E8" : "#DADCE0",
                          backgroundColor: selectedLayer.filter === f ? "#E8F0FE" : "white",
                          color: selectedLayer.filter === f ? "#1A73E8" : "#5F6368",
                        }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Shape-specific */}
            {selectedLayer.type === "shape" && (
              <>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Fill Color</label>
                  <div className="flex items-center gap-2 mb-1.5">
                    <input type="color" value={selectedLayer.fillColor || "#1A73E8"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fillColor: e.target.value })}
                      className="w-7 h-7 rounded border cursor-pointer" style={{ borderColor: "#DADCE0" }} />
                    <Input value={selectedLayer.fillColor || "#1A73E8"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fillColor: e.target.value })}
                      className="h-7 text-xs flex-1" />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {presetColors.map((c) => (
                      <button key={c} className="w-5 h-5 rounded transition-all"
                        style={{
                          backgroundColor: c, border: c === "#FFFFFF" ? "1px solid #DADCE0" : "none",
                          outline: selectedLayer.fillColor === c ? "2px solid #1A73E8" : "none",
                          outlineOffset: "1px",
                        }}
                        onClick={() => onUpdateLayer(selectedLayer.id, { fillColor: c })} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Stroke</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={selectedLayer.strokeColor || "#000000"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { strokeColor: e.target.value })}
                      className="w-7 h-7 rounded border cursor-pointer" />
                    <Input type="number" value={selectedLayer.strokeWidth || 0} min={0} max={20}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { strokeWidth: Number(e.target.value) })}
                      className="h-7 text-xs w-16" placeholder="Width" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Corner Radius</label>
                  <Slider value={[selectedLayer.cornerRadius || 0]} min={0} max={50} step={1}
                    onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { cornerRadius: v })} />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t" style={{ borderColor: "#EEEEEE" }}>
              <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs h-8"
                onClick={() => onDuplicateLayer(selectedLayer.id)}>
                <Copy className="w-3.5 h-3.5" /> Duplicate
              </Button>
              <Button variant="outline" size="sm"
                className="flex-1 gap-1 text-xs h-8 text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleDelete(selectedLayer.id)}>
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#F1F3F4" }}>
              <Hexagon className="w-7 h-7" style={{ color: "#9AA0A6" }} />
            </div>
            <p className="text-sm font-medium" style={{ color: "#5F6368" }}>Select or add an element</p>
            <p className="text-xs mt-1" style={{ color: "#9AA0A6" }}>to see its properties</p>
          </div>
        )}

        {/* Layers List */}
        <div className="border-t flex-1" style={{ borderColor: "#EEEEEE" }}>
          <div className="px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5F6368" }}>
              Layers ({currentViewLayers.length})
            </h3>
          </div>
          <div className="px-2 pb-4 space-y-0.5">
            {currentViewLayers.length === 0 ? (
              <p className="text-xs text-center py-4" style={{ color: "#9AA0A6" }}>No layers yet. Add text, images, or shapes.</p>
            ) : (
              [...currentViewLayers].reverse().map((layer) => {
                const Icon = layerIcons[layer.type] || Hexagon;
                return (
                  <div key={layer.id}
                    onClick={() => onSelectLayer(layer.id)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer group transition-colors"
                    style={{ backgroundColor: layer.id === selectedLayer?.id ? "#E8F0FE" : "transparent" }}>
                    <GripVertical className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 cursor-grab" />
                    <Icon className="w-4 h-4 shrink-0" style={{ color: "#5F6368" }} />
                    <span className="text-xs truncate flex-1" style={{ color: "#202124" }}>{layer.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); onUpdateLayer(layer.id, { visible: !layer.visible }); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {layer.visible ? <Eye className="w-3.5 h-3.5" style={{ color: "#5F6368" }} /> : <EyeOff className="w-3.5 h-3.5" style={{ color: "#9AA0A6" }} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onUpdateLayer(layer.id, { locked: !layer.locked }); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {layer.locked ? <Lock className="w-3.5 h-3.5" style={{ color: "#F5A623" }} /> : <Unlock className="w-3.5 h-3.5" style={{ color: "#9AA0A6" }} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(layer.id); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
