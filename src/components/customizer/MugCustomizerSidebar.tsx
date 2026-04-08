import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload, Type, Trash2, Download, Image, RefreshCw,
  Bold, Italic, Layers, Paintbrush, Settings2, ChevronRight
} from "lucide-react";
import type { DesignElement } from "./MugDesignCanvas";

const FONTS = [
  "Arial", "Helvetica", "Georgia", "Times New Roman",
  "Courier New", "Verdana", "Impact", "Trebuchet MS",
  "Palatino", "Garamond",
];

const MUG_COLORS = [
  { label: "White", value: "#FFFFFF" },
  { label: "Black", value: "#1A1A1A" },
  { label: "Navy", value: "#1A3A5C" },
  { label: "Red", value: "#C0392B" },
  { label: "Forest", value: "#2D5F2D" },
  { label: "Sky Blue", value: "#AEC6CF" },
  { label: "Yellow", value: "#F4D03F" },
  { label: "Coral", value: "#E8725C" },
  { label: "Lavender", value: "#B8A9D0" },
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
    <aside className="w-[280px] shrink-0 bg-card border-r border-border flex flex-col h-full">
      {/* Sidebar header */}
      <div className="p-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Paintbrush className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground leading-tight">Design Studio</h2>
            <p className="text-[10px] text-muted-foreground">Customize your mug</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* Add Elements */}
          <Section icon={<Layers className="w-3.5 h-3.5" />} title="Add Elements">
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-16 flex-col gap-1.5 text-[11px] border-dashed hover:border-primary hover:bg-primary/5"
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
                Upload Image
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onAddImage(file);
                  e.target.value = "";
                }}
              />
              <Button
                size="sm"
                variant="outline"
                className="h-16 flex-col gap-1.5 text-[11px] border-dashed hover:border-primary hover:bg-primary/5"
                onClick={onAddText}
              >
                <Type className="w-5 h-5 text-muted-foreground" />
                Add Text
              </Button>
            </div>
          </Section>

          <Separator />

          {/* Mug Color */}
          <Section icon={<Paintbrush className="w-3.5 h-3.5" />} title="Mug Color">
            <div className="grid grid-cols-5 gap-2">
              {MUG_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onSetMugColor(c.value)}
                  className={`group relative w-full aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                    mugColor === c.value
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-card border-primary"
                      : "border-border hover:border-foreground/30"
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                >
                  {mugColor === c.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${c.value === "#FFFFFF" || c.value === "#F4D03F" || c.value === "#AEC6CF" ? "bg-foreground" : "bg-white"}`} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Section>

          <Separator />

          {/* 3D Controls */}
          <Section icon={<Settings2 className="w-3.5 h-3.5" />} title="Preview">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-xs text-foreground">Auto-rotate</span>
              <Switch checked={autoRotate} onCheckedChange={onSetAutoRotate} />
            </div>
          </Section>

          <Separator />

          {/* Selected Element Properties */}
          {selected && (
            <>
              <Section
                icon={selected.type === "text" ? <Type className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                title={selected.type === "text" ? "Text Properties" : "Image Properties"}
                action={
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                    onClick={() => onDeleteElement(selected.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                }
              >
                <div className="space-y-3">
                  {selected.type === "text" && (
                    <>
                      <div>
                        <Label className="text-[11px] text-muted-foreground mb-1 block">Content</Label>
                        <Input
                          value={selected.text || ""}
                          onChange={(e) => onUpdateElement(selected.id, { text: e.target.value })}
                          className="h-8 text-xs"
                          placeholder="Enter text..."
                        />
                      </div>
                      <div>
                        <Label className="text-[11px] text-muted-foreground mb-1 block">Font Family</Label>
                        <Select
                          value={selected.fontFamily || "Arial"}
                          onValueChange={(v) => onUpdateElement(selected.id, { fontFamily: v })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FONTS.map((f) => (
                              <SelectItem key={f} value={f} className="text-xs">
                                <span style={{ fontFamily: f }}>{f}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={selected.bold ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateElement(selected.id, { bold: !selected.bold })}
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant={selected.italic ? "default" : "outline"}
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateElement(selected.id, { italic: !selected.italic })}
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </Button>
                        <div className="flex-1">
                          <input
                            type="color"
                            value={selected.fontColor || "#000000"}
                            onChange={(e) => onUpdateElement(selected.id, { fontColor: e.target.value })}
                            className="w-full h-8 rounded-lg border border-border cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-[11px] text-muted-foreground mb-1 block">
                          Size: {selected.fontSize || 32}px
                        </Label>
                        <Slider
                          value={[selected.fontSize || 32]}
                          onValueChange={([v]) => onUpdateElement(selected.id, { fontSize: v })}
                          min={12}
                          max={120}
                          step={1}
                        />
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[11px] text-muted-foreground mb-1 block">Width</Label>
                      <Slider
                        value={[selected.width]}
                        onValueChange={([v]) => onUpdateElement(selected.id, { width: v })}
                        min={30}
                        max={900}
                        step={1}
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] text-muted-foreground mb-1 block">Height</Label>
                      <Slider
                        value={[selected.height]}
                        onValueChange={([v]) => onUpdateElement(selected.id, { height: v })}
                        min={30}
                        max={450}
                        step={1}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">
                      Rotation: {selected.rotation}°
                    </Label>
                    <Slider
                      value={[selected.rotation]}
                      onValueChange={([v]) => onUpdateElement(selected.id, { rotation: v })}
                      min={0}
                      max={360}
                      step={1}
                    />
                  </div>
                </div>
              </Section>
              <Separator />
            </>
          )}

          {/* Layers */}
          {elements.length > 0 && (
            <>
              <Section icon={<Layers className="w-3.5 h-3.5" />} title={`Layers (${elements.length})`}>
                <div className="space-y-1">
                  {elements.map((el) => (
                    <button
                      key={el.id}
                      onClick={() => {/* select handled by canvas */}}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-all ${
                        selectedId === el.id
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "hover:bg-muted text-foreground border border-transparent"
                      }`}
                    >
                      {el.type === "text" ? (
                        <Type className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <Image className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span className="truncate flex-1">
                        {el.type === "text" ? el.text || "Text" : el.fileName || "Image"}
                      </span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </Section>
              <Separator />
            </>
          )}

          {/* Export / Actions */}
          <Section icon={<Download className="w-3.5 h-3.5" />} title="Export">
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-[11px] h-9" onClick={onExportPNG}>
                <Download className="w-3.5 h-3.5 mr-1.5" /> PNG
              </Button>
              <Button size="sm" variant="outline" className="text-[11px] h-9" onClick={onExportJSON}>
                <Download className="w-3.5 h-3.5 mr-1.5" /> JSON
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="w-full text-[11px] h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onReset}
            >
              <RefreshCw className="w-3 h-3 mr-1.5" /> Reset All
            </Button>
          </Section>
        </div>
      </ScrollArea>
    </aside>
  );
}

/* Reusable section wrapper */
function Section({
  icon,
  title,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground uppercase tracking-wider">
          {icon}
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
