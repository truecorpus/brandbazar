import { useState, useRef, useMemo } from "react";
import {
  Settings, Type, ImageIcon, LayoutGrid, Layers,
  Plus, Search, Upload, ChevronDown, ChevronRight,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DesignLayer, PrintZone, ProductView } from "@/hooks/useCustomizerStore";

interface FontData {
  id: string;
  font_name: string;
  font_family: string;
  category: string;
  font_file_url: string | null;
  is_safe_for_print: boolean | null;
  min_recommended_size: number | null;
}

interface DesignElementData {
  id: string;
  element_name: string;
  element_type: string;
  category: string;
  image_url: string | null;
  svg_content: string | null;
  tags: string[] | null;
  is_premium: boolean | null;
}

interface LeftPanelProps {
  activeViewId: string;
  activeZoneId: string | null;
  selectedLayer: DesignLayer | undefined;
  printZones: PrintZone[];
  views: ProductView[];
  selectedPrintMethod: string;
  onAddTextLayer: () => void;
  onAddImageLayer: (file: File) => void;
  onUpdateLayer: (id: string, updates: Partial<DesignLayer>) => void;
  onSetActiveView: (viewId: string) => void;
  onSetActiveZone: (zoneId: string | null) => void;
  productColors: string[];
  productSizes: string[];
  selectedColor: string | null;
  selectedSize: string | null;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  fonts: FontData[];
  designElements: DesignElementData[];
  onAddClipart: (element: DesignElementData) => void;
}

function SectionHeader({
  icon: Icon, label, isOpen, onToggle,
}: { icon: React.ElementType; label: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-[#F8F9FA] transition-colors"
    >
      <Icon className="w-4 h-4" style={{ color: "#5F6368" }} />
      <span className="text-sm font-medium flex-1 text-left" style={{ color: "#202124" }}>{label}</span>
      {isOpen ? <ChevronDown className="w-4 h-4" style={{ color: "#5F6368" }} /> : <ChevronRight className="w-4 h-4" style={{ color: "#5F6368" }} />}
    </button>
  );
}

// Common color map for named colors
const colorHexMap: Record<string, string> = {
  white: "#FFFFFF", black: "#000000", red: "#EA4335", blue: "#1A73E8",
  green: "#34A853", yellow: "#FBBC04", orange: "#FF6D01", pink: "#E91E63",
  purple: "#9C27B0", grey: "#607D8B", gray: "#607D8B", navy: "#1A237E",
  maroon: "#800000", brown: "#795548", teal: "#00BCD4", cyan: "#00BCD4",
};

function getColorHex(color: string): string {
  if (color.startsWith("#")) return color;
  return colorHexMap[color.toLowerCase()] || "#CCCCCC";
}

const presetColors = [
  "#202124", "#FFFFFF", "#1A73E8", "#EA4335",
  "#FBBC04", "#34A853", "#FF6D01", "#9C27B0",
  "#00BCD4", "#795548", "#607D8B", "#E91E63",
];

const printMethods = [
  { id: "digital_print", name: "Digital Print", desc: "Full color, photo-quality", price: "+₹0" },
  { id: "sublimation", name: "Sublimation", desc: "Durable, vivid colors", price: "+₹10/unit" },
  { id: "screen_print", name: "Screen Print", desc: "Best for bulk orders", price: "+₹5/unit" },
];

export default function LeftPanel({
  activeViewId, activeZoneId, selectedLayer, printZones, views,
  selectedPrintMethod, onAddTextLayer, onAddImageLayer, onUpdateLayer,
  onSetActiveView, onSetActiveZone,
  productColors, productSizes, selectedColor, selectedSize,
  onSelectColor, onSelectSize, fonts, designElements, onAddClipart,
}: LeftPanelProps) {
  const [openSection, setOpenSection] = useState<string>("product");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fontSearch, setFontSearch] = useState("");
  const [fontCategory, setFontCategory] = useState("all");
  const [elementSearch, setElementSearch] = useState("");
  const [elementCategory, setElementCategory] = useState("All");
  const [elementTab, setElementTab] = useState<"elements" | "templates">("elements");

  const toggle = (section: string) => setOpenSection((prev) => (prev === section ? "" : section));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAddImageLayer(file);
    e.target.value = "";
  };

  // Filter fonts
  const filteredFonts = useMemo(() => {
    return fonts.filter((f) => {
      const matchesSearch = !fontSearch || f.font_name.toLowerCase().includes(fontSearch.toLowerCase());
      const matchesCat = fontCategory === "all" || f.category === fontCategory;
      return matchesSearch && matchesCat;
    });
  }, [fonts, fontSearch, fontCategory]);

  // Filter design elements
  const elementCategories = useMemo(() => {
    const cats = new Set(designElements.map((e) => e.category));
    return ["All", ...Array.from(cats)];
  }, [designElements]);

  const filteredElements = useMemo(() => {
    return designElements.filter((e) => {
      const matchesSearch = !elementSearch || e.element_name.toLowerCase().includes(elementSearch.toLowerCase()) || e.tags?.some((t) => t.toLowerCase().includes(elementSearch.toLowerCase()));
      const matchesCat = elementCategory === "All" || e.category === elementCategory;
      return matchesSearch && matchesCat;
    });
  }, [designElements, elementSearch, elementCategory]);

  const fontCategories = ["all", "sans-serif", "serif", "display", "script"];

  return (
    <div className="w-[280px] border-r bg-white flex flex-col shrink-0 hidden md:flex" style={{ borderColor: "#DADCE0" }}>
      <ScrollArea className="flex-1">
        {/* Section 1: Product Options */}
        <SectionHeader icon={Settings} label="Product Options" isOpen={openSection === "product"} onToggle={() => toggle("product")} />
        {openSection === "product" && (
          <div className="px-4 pb-4 space-y-4">
            {/* Color Swatches */}
            {productColors.length > 0 && (
              <div>
                <label className="text-[10px] uppercase tracking-wider font-medium mb-2 block" style={{ color: "#5F6368" }}>
                  Product Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {productColors.map((c) => {
                    const hex = getColorHex(c);
                    const isActive = selectedColor === c;
                    return (
                      <button
                        key={c}
                        onClick={() => onSelectColor(c)}
                        title={c}
                        className="w-7 h-7 rounded-full transition-all"
                        style={{
                          backgroundColor: hex,
                          border: hex === "#FFFFFF" ? "1px solid #DADCE0" : "none",
                          boxShadow: isActive ? `0 0 0 2px white, 0 0 0 4px #1A73E8` : "none",
                        }}
                      />
                    );
                  })}
                </div>
                {selectedColor && (
                  <p className="text-[10px] mt-1.5 capitalize" style={{ color: "#5F6368" }}>{selectedColor}</p>
                )}
              </div>
            )}

            {/* Size Selector */}
            {productSizes.length > 0 && (
              <div>
                <label className="text-[10px] uppercase tracking-wider font-medium mb-2 block" style={{ color: "#5F6368" }}>
                  Size
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {productSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => onSelectSize(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        backgroundColor: selectedSize === s ? "#E8F0FE" : "#F1F3F4",
                        color: selectedSize === s ? "#1A73E8" : "#5F6368",
                        border: selectedSize === s ? "1px solid #1A73E8" : "1px solid transparent",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Print Method */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-medium mb-2 block" style={{ color: "#5F6368" }}>
                Print Method
              </label>
              <div className="space-y-2">
                {printMethods.map((m) => (
                  <button
                    key={m.id}
                    className="w-full text-left p-3 rounded-lg border transition-all text-xs"
                    style={{
                      borderColor: selectedPrintMethod === m.id ? "#1A73E8" : "#DADCE0",
                      backgroundColor: selectedPrintMethod === m.id ? "#E8F0FE" : "white",
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium" style={{ color: "#202124" }}>{m.name}</span>
                      <span style={{ color: "#5F6368" }}>{m.price}</span>
                    </div>
                    <span style={{ color: "#5F6368" }}>{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="border-t" style={{ borderColor: "#EEEEEE" }} />

        {/* Section 2: Add Text */}
        <SectionHeader icon={Type} label="Add Text" isOpen={openSection === "text"} onToggle={() => toggle("text")} />
        {openSection === "text" && (
          <div className="px-4 pb-4 space-y-3">
            <Button
              variant="outline"
              className="w-full gap-2 text-xs h-9"
              style={{ borderColor: "#1A73E8", color: "#1A73E8" }}
              onClick={onAddTextLayer}
            >
              <Plus className="w-3.5 h-3.5" /> Add Text Layer
            </Button>

            {selectedLayer?.type === "text" && (
              <>
                <Textarea
                  value={selectedLayer.text || ""}
                  onChange={(e) => onUpdateLayer(selectedLayer.id, { text: e.target.value })}
                  className="text-sm h-16 resize-none"
                  placeholder="Enter your text..."
                />

                {/* Font Selector */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Font Family</label>
                  <div className="flex gap-1 mb-1.5">
                    {fontCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFontCategory(cat)}
                        className="px-2 py-0.5 rounded text-[10px] capitalize transition-all"
                        style={{
                          backgroundColor: fontCategory === cat ? "#E8F0FE" : "#F1F3F4",
                          color: fontCategory === cat ? "#1A73E8" : "#5F6368",
                        }}
                      >
                        {cat === "all" ? "All" : cat}
                      </button>
                    ))}
                  </div>
                  <Input
                    placeholder="Search fonts..."
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    className="h-7 text-xs mb-1.5"
                  />
                  <div className="max-h-28 overflow-y-auto border rounded-md" style={{ borderColor: "#DADCE0" }}>
                    {filteredFonts.length === 0 ? (
                      <p className="text-[10px] text-center py-2" style={{ color: "#9AA0A6" }}>No fonts found</p>
                    ) : (
                      filteredFonts.slice(0, 20).map((f) => (
                        <button
                          key={f.id}
                          onClick={() => onUpdateLayer(selectedLayer.id, { fontFamily: f.font_family })}
                          className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-[#F8F9FA] transition-colors border-b last:border-b-0"
                          style={{
                            fontFamily: f.font_family,
                            borderColor: "#F1F3F4",
                            backgroundColor: selectedLayer.fontFamily === f.font_family ? "#E8F0FE" : "transparent",
                            color: "#202124",
                          }}
                        >
                          {f.font_name}
                          {f.is_safe_for_print && (
                            <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-green-50 text-green-600">Print Safe</span>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Font Size</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7"
                      onClick={() => onUpdateLayer(selectedLayer.id, { fontSize: Math.max(8, (selectedLayer.fontSize || 24) - 2) })}>-</Button>
                    <Input type="number" value={selectedLayer.fontSize || 24} min={8} max={120}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })}
                      className="h-7 w-14 text-center text-xs" />
                    <Button variant="outline" size="icon" className="h-7 w-7"
                      onClick={() => onUpdateLayer(selectedLayer.id, { fontSize: Math.min(120, (selectedLayer.fontSize || 24) + 2) })}>+</Button>
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Text Color</label>
                  <div className="flex items-center gap-2 mb-1.5">
                    <input type="color" value={selectedLayer.fontColor || "#202124"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fontColor: e.target.value })}
                      className="w-7 h-7 rounded border cursor-pointer" style={{ borderColor: "#DADCE0" }} />
                    <Input value={selectedLayer.fontColor || "#202124"}
                      onChange={(e) => onUpdateLayer(selectedLayer.id, { fontColor: e.target.value })}
                      className="h-7 text-xs flex-1" />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {presetColors.map((c) => (
                      <button key={c} className="w-5 h-5 rounded transition-all"
                        style={{
                          backgroundColor: c, border: c === "#FFFFFF" ? "1px solid #DADCE0" : "none",
                          outline: selectedLayer.fontColor === c ? "2px solid #1A73E8" : "none",
                          outlineOffset: "1px",
                        }}
                        onClick={() => onUpdateLayer(selectedLayer.id, { fontColor: c })} />
                    ))}
                  </div>
                </div>

                {/* Style Toggles */}
                <div className="flex items-center gap-1">
                  {[
                    { icon: Bold, prop: "fontWeight", val: "bold", off: "normal" },
                    { icon: Italic, prop: "fontStyle", val: "italic", off: "normal" },
                  ].map(({ icon: Icon, prop, val, off }) => (
                    <Button key={prop} variant="outline" size="icon" className="h-8 w-8"
                      style={{
                        backgroundColor: (selectedLayer as any)[prop] === val ? "#E8F0FE" : "white",
                        borderColor: (selectedLayer as any)[prop] === val ? "#1A73E8" : "#DADCE0",
                      }}
                      onClick={() => onUpdateLayer(selectedLayer.id, { [prop]: (selectedLayer as any)[prop] === val ? off : val })}>
                      <Icon className="w-4 h-4" />
                    </Button>
                  ))}
                  <div className="w-px h-6 bg-[#EEEEEE] mx-1" />
                  {[
                    { icon: AlignLeft, val: "left" },
                    { icon: AlignCenter, val: "center" },
                    { icon: AlignRight, val: "right" },
                    { icon: AlignJustify, val: "justify" },
                  ].map(({ icon: Icon, val }) => (
                    <Button key={val} variant="outline" size="icon" className="h-8 w-8"
                      style={{
                        backgroundColor: selectedLayer.textAlign === val ? "#E8F0FE" : "white",
                        borderColor: selectedLayer.textAlign === val ? "#1A73E8" : "#DADCE0",
                      }}
                      onClick={() => onUpdateLayer(selectedLayer.id, { textAlign: val })}>
                      <Icon className="w-3.5 h-3.5" />
                    </Button>
                  ))}
                </div>

                {/* Letter Spacing */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Letter Spacing</label>
                  <div className="flex items-center gap-2">
                    <Slider value={[selectedLayer.letterSpacing || 0]} min={-2} max={10} step={0.5}
                      onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { letterSpacing: v })} className="flex-1" />
                    <span className="text-[10px] w-6 text-right" style={{ color: "#5F6368" }}>{selectedLayer.letterSpacing || 0}</span>
                  </div>
                </div>

                {/* Line Height */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Line Height</label>
                  <div className="flex items-center gap-2">
                    <Slider value={[selectedLayer.lineHeight || 1.4]} min={1.0} max={2.5} step={0.1}
                      onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { lineHeight: v })} className="flex-1" />
                    <span className="text-[10px] w-6 text-right" style={{ color: "#5F6368" }}>{(selectedLayer.lineHeight || 1.4).toFixed(1)}</span>
                  </div>
                </div>

                {/* Text Effects */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Text Effect</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {(["none", "outline", "shadow", "curved"] as const).map((effect) => (
                      <button key={effect}
                        onClick={() => onUpdateLayer(selectedLayer.id, { textEffect: effect })}
                        className="px-2.5 py-1 rounded-full text-[11px] border transition-all capitalize"
                        style={{
                          borderColor: selectedLayer.textEffect === effect ? "#1A73E8" : "#DADCE0",
                          backgroundColor: selectedLayer.textEffect === effect ? "#E8F0FE" : "white",
                          color: selectedLayer.textEffect === effect ? "#1A73E8" : "#5F6368",
                        }}>
                        {effect}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curve Radius (if curved) */}
                {selectedLayer.textEffect === "curved" && (
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-medium mb-1 block" style={{ color: "#5F6368" }}>Curve Radius</label>
                    <Slider value={[selectedLayer.curveRadius || 200]} min={50} max={500} step={10}
                      onValueChange={([v]) => onUpdateLayer(selectedLayer.id, { curveRadius: v })} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <div className="border-t" style={{ borderColor: "#EEEEEE" }} />

        {/* Section 3: Add Logo/Image */}
        <SectionHeader icon={ImageIcon} label="Add Logo / Image" isOpen={openSection === "image"} onToggle={() => toggle("image")} />
        {openSection === "image" && (
          <div className="px-4 pb-4 space-y-3">
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml,application/pdf" className="hidden" onChange={handleFileUpload} />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#F8F9FA] transition-colors"
              style={{ borderColor: "#DADCE0" }}
            >
              <Upload className="w-8 h-8" style={{ color: "#5F6368" }} />
              <span className="text-sm font-medium" style={{ color: "#202124" }}>Drop your logo here</span>
              <span className="text-xs" style={{ color: "#5F6368" }}>or click to browse files</span>
              <span className="text-[10px] mt-1" style={{ color: "#9AA0A6" }}>PNG, SVG, PDF · Max 25MB · Min 300 DPI</span>
            </button>
          </div>
        )}
        <div className="border-t" style={{ borderColor: "#EEEEEE" }} />

        {/* Section 4: Design Library */}
        <SectionHeader icon={LayoutGrid} label="Design Library" isOpen={openSection === "library"} onToggle={() => toggle("library")} />
        {openSection === "library" && (
          <div className="px-4 pb-4 space-y-3">
            {/* Tabs */}
            <div className="flex gap-0.5 p-0.5 rounded-lg" style={{ backgroundColor: "#F1F3F4" }}>
              {(["elements", "templates"] as const).map((tab) => (
                <button key={tab} onClick={() => setElementTab(tab)}
                  className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all capitalize"
                  style={{
                    backgroundColor: elementTab === tab ? "white" : "transparent",
                    color: elementTab === tab ? "#1A73E8" : "#5F6368",
                    boxShadow: elementTab === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#9AA0A6" }} />
              <Input placeholder="Search designs, icons..." value={elementSearch}
                onChange={(e) => setElementSearch(e.target.value)} className="pl-8 h-8 text-xs" />
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {elementCategories.slice(0, 6).map((cat) => (
                <button key={cat}
                  onClick={() => setElementCategory(cat)}
                  className="px-2.5 py-1 rounded-full text-[11px] border transition-colors capitalize"
                  style={{
                    borderColor: elementCategory === cat ? "#1A73E8" : "#DADCE0",
                    backgroundColor: elementCategory === cat ? "#E8F0FE" : "white",
                    color: elementCategory === cat ? "#1A73E8" : "#5F6368",
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {filteredElements.length === 0 ? (
                <p className="col-span-3 text-xs text-center py-4" style={{ color: "#9AA0A6" }}>
                  No elements found. Try a different search.
                </p>
              ) : (
                filteredElements.slice(0, 12).map((el) => (
                  <button key={el.id}
                    onClick={() => onAddClipart(el)}
                    title={el.element_name}
                    className="aspect-square rounded-lg border flex items-center justify-center cursor-pointer hover:border-[#1A73E8] hover:shadow-sm transition-all overflow-hidden"
                    style={{ borderColor: "#DADCE0", backgroundColor: "#F8F9FA" }}>
                    {el.image_url ? (
                      <img src={el.image_url} alt={el.element_name} className="w-full h-full object-contain p-1.5" />
                    ) : (
                      <LayoutGrid className="w-6 h-6" style={{ color: "#DADCE0" }} />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
        <div className="border-t" style={{ borderColor: "#EEEEEE" }} />

        {/* Section 5: Print Zones */}
        <SectionHeader icon={Layers} label="Print Areas" isOpen={openSection === "zones"} onToggle={() => toggle("zones")} />
        {openSection === "zones" && (
          <div className="px-4 pb-4 space-y-3">
            {views.length > 1 && (
              <div className="flex gap-1 p-0.5 rounded-lg" style={{ backgroundColor: "#F1F3F4" }}>
                {views.map((v) => (
                  <button key={v.id} onClick={() => onSetActiveView(v.id)}
                    className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
                    style={{
                      backgroundColor: activeViewId === v.id ? "white" : "transparent",
                      color: activeViewId === v.id ? "#1A73E8" : "#5F6368",
                      boxShadow: activeViewId === v.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    }}>
                    {v.name}
                  </button>
                ))}
              </div>
            )}

            {printZones.map((zone) => (
              <button key={zone.id}
                onClick={() => onSetActiveZone(zone.id === activeZoneId ? null : zone.id)}
                className="w-full text-left p-3 rounded-lg border transition-all"
                style={{
                  borderColor: activeZoneId === zone.id ? "#1A73E8" : "#DADCE0",
                  backgroundColor: activeZoneId === zone.id ? "#E8F0FE" : "white",
                }}>
                <div className="text-xs font-medium" style={{ color: "#202124" }}>{zone.name}</div>
                <div className="text-[10px] mt-0.5" style={{ color: "#5F6368" }}>
                  {zone.width}×{zone.height}px · {zone.zoneType}
                </div>
              </button>
            ))}

            {printZones.length === 0 && (
              <p className="text-xs text-center py-4" style={{ color: "#9AA0A6" }}>No print zones defined</p>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
