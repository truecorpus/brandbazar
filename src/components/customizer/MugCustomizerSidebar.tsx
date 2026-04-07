import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Upload, Type, Trash2, RotateCw, Download, Image, Palette, RefreshCw } from "lucide-react";
import type { DesignElement } from "./MugDesignCanvas";

const FONTS = [
  "Arial", "Helvetica", "Georgia", "Times New Roman",
  "Courier New", "Verdana", "Impact", "Comic Sans MS",
  "Trebuchet MS", "Palatino",
];

const MUG_COLORS = [
  { label: "White", value: "#FFFFFF" },
  { label: "Black", value: "#1A1A1A" },
  { label: "Navy", value: "#1A3A5C" },
  { label: "Red", value: "#C0392B" },
  { label: "Forest Green", value: "#2D5F2D" },
  { label: "Pastel Blue", value: "#AEC6CF" },
  { label: "Yellow", value: "#F4D03F" },
];

interface Props {
  elements: DesignElement[];
  selectedId: string | null;
  mugColor: string;
  autoRotate: boolean;
  onAddImage: (file: File) => void;
  onAddText: () => void;
  onUpdateElement: (id: string, updates: Partial<DesignElement>) => void;
  onDeleteElement: (id: string) => void;
  onSetMugColor: (color: string) => void;
  onSetAutoRotate: (val: boolean) => void;
  onReset: () => void;
  onExportPNG: () => void;
  onExportJSON: () => void;
}

export default function MugCustomizerSidebar({
  elements,
  selectedId,
  mugColor,
  autoRotate,
  onAddImage,
  onAddText,
  onUpdateElement,
  onDeleteElement,
  onSetMugColor,
  onSetAutoRotate,
  onReset,
  onExportPNG,
  onExportJSON,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const selected = elements.find((e) => e.id === selectedId) || null;

  return (
    <aside className="w-[300px] shrink-0 bg-card border-r border-border overflow-y-auto h-full">
      <div className="p-4 space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-sm font-semibold text-foreground">Mug Customizer</h2>
          <p className="text-[11px] text-muted-foreground">11oz Sublimation Mug</p>
        </div>

        <Separator />

        {/* Add Elements */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Add Elements</Label>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => fileRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload Image
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onAddImage(file);
              e.target.value = "";
            }} />
            <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={onAddText}>
              <Type className="w-3.5 h-3.5 mr-1.5" /> Add Text
            </Button>
          </div>
        </div>

        <Separator />

        {/* Mug Color */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mug Color</Label>
          <div className="flex gap-2 flex-wrap">
            {MUG_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => onSetMugColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${mugColor === c.value ? "ring-2 ring-primary ring-offset-2" : ""}`}
                style={{ backgroundColor: c.value, borderColor: c.value === "#FFFFFF" ? "#d1d5db" : c.value }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* 3D Controls */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">3D Preview</Label>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Auto-rotate</span>
            <Switch checked={autoRotate} onCheckedChange={onSetAutoRotate} />
          </div>
        </div>

        <Separator />

        {/* Selected Element Properties */}
        {selected && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {selected.type === "text" ? "Text Properties" : "Image Properties"}
                </Label>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => onDeleteElement(selected.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {selected.type === "text" && (
                <>
                  <div>
                    <Label className="text-[11px] text-muted-foreground">Text Content</Label>
                    <Input
                      value={selected.text || ""}
                      onChange={(e) => onUpdateElement(selected.id, { text: e.target.value })}
                      className="h-8 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground">Font</Label>
                    <Select value={selected.fontFamily || "Arial"} onValueChange={(v) => onUpdateElement(selected.id, { fontFamily: v })}>
                      <SelectTrigger className="h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {FONTS.map((f) => <SelectItem key={f} value={f} className="text-xs">{f}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground">Font Size: {selected.fontSize || 32}px</Label>
                    <Slider
                      value={[selected.fontSize || 32]}
                      onValueChange={([v]) => onUpdateElement(selected.id, { fontSize: v })}
                      min={12}
                      max={120}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground">Text Color</Label>
                    <input
                      type="color"
                      value={selected.fontColor || "#000000"}
                      onChange={(e) => onUpdateElement(selected.id, { fontColor: e.target.value })}
                      className="w-full h-8 rounded border border-border cursor-pointer mt-1"
                    />
                  </div>
                </>
              )}

              {/* Size controls */}
              <div>
                <Label className="text-[11px] text-muted-foreground">Width: {Math.round(selected.width)}px</Label>
                <Slider
                  value={[selected.width]}
                  onValueChange={([v]) => onUpdateElement(selected.id, { width: v })}
                  min={30}
                  max={900}
                  step={1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground">Height: {Math.round(selected.height)}px</Label>
                <Slider
                  value={[selected.height]}
                  onValueChange={([v]) => onUpdateElement(selected.id, { height: v })}
                  min={30}
                  max={450}
                  step={1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground">Rotation: {selected.rotation}°</Label>
                <Slider
                  value={[selected.rotation]}
                  onValueChange={([v]) => onUpdateElement(selected.id, { rotation: v })}
                  min={0}
                  max={360}
                  step={1}
                  className="mt-1"
                />
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Layer List */}
        {elements.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Layers ({elements.length})</Label>
            <div className="space-y-1">
              {elements.map((el) => (
                <button
                  key={el.id}
                  onClick={() => ({})}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 transition-colors ${selectedId === el.id ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"}`}
                >
                  {el.type === "text" ? <Type className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                  <span className="truncate">{el.type === "text" ? el.text || "Text" : el.fileName || "Image"}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Actions */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="text-xs" onClick={onExportPNG}>
              <Download className="w-3.5 h-3.5 mr-1" /> Export PNG
            </Button>
            <Button size="sm" variant="outline" className="text-xs" onClick={onExportJSON}>
              <Download className="w-3.5 h-3.5 mr-1" /> Save JSON
            </Button>
          </div>
          <Button size="sm" variant="destructive" className="w-full text-xs" onClick={onReset}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reset Design
          </Button>
        </div>
      </div>
    </aside>
  );
}
