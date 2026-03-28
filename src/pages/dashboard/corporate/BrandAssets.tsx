import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Image, Palette, Type, FileText, Plus, Trash2, Upload, X
} from "lucide-react";

type BrandColor = { hex: string; label: string };
type AssetFile = { name: string; type: string; url: string; uploadedAt: string };

const BrandAssets = () => {
  const [logos, setLogos] = useState<AssetFile[]>([]);
  const [colors, setColors] = useState<BrandColor[]>([
    { hex: "#1A73E8", label: "Primary Blue" },
  ]);
  const [fonts, setFonts] = useState<string[]>([]);
  const [guidelines, setGuidelines] = useState<AssetFile[]>([]);
  const [newColor, setNewColor] = useState({ hex: "#000000", label: "" });
  const [newFont, setNewFont] = useState("");
  const [showColorForm, setShowColorForm] = useState(false);

  const addColor = () => {
    if (!newColor.label.trim()) return;
    setColors([...colors, { ...newColor }]);
    setNewColor({ hex: "#000000", label: "" });
    setShowColorForm(false);
  };

  const addFont = () => {
    if (!newFont.trim()) return;
    setFonts([...fonts, newFont.trim()]);
    setNewFont("");
  };

  const sections = [
    {
      title: "Company Logos",
      description: "Upload logo files in various formats for print production",
      icon: Image,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {logos.map((logo, i) => (
              <div key={i} className="bg-secondary/50 rounded-xl border border-border p-4 text-center relative group">
                <div className="w-full h-20 flex items-center justify-center mb-3">
                  <Image size={32} className="text-muted-foreground" />
                </div>
                <p className="text-xs font-medium text-foreground truncate">{logo.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{logo.type}</p>
                <button
                  onClick={() => setLogos(logos.filter((_, idx) => idx !== i))}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-destructive/10 text-destructive transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <label className="bg-secondary/30 rounded-xl border-2 border-dashed border-border p-4 text-center cursor-pointer hover:border-primary/40 transition-colors flex flex-col items-center justify-center min-h-[120px]">
              <Upload size={20} className="text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">Upload Logo</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">PNG, SVG, AI, EPS</span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.ai,.eps,.svg"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setLogos([...logos, { name: f.name, type: f.type || "image", url: "", uploadedAt: new Date().toISOString() }]);
                }}
              />
            </label>
          </div>
        </div>
      ),
    },
    {
      title: "Brand Colors",
      description: "Save your brand's color palette for consistent printing",
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {colors.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-secondary/50 rounded-lg border border-border px-3 py-2 group">
                <span className="w-6 h-6 rounded-md border border-border" style={{ backgroundColor: c.hex }} />
                <div>
                  <p className="text-xs font-medium text-foreground">{c.label}</p>
                  <p className="text-[10px] text-muted-foreground">{c.hex}</p>
                </div>
                <button
                  onClick={() => setColors(colors.filter((_, idx) => idx !== i))}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-destructive transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          {showColorForm ? (
            <div className="flex items-end gap-3 p-3 bg-secondary/30 rounded-lg">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Color</label>
                <input type="color" value={newColor.hex} onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })} className="w-10 h-10 rounded-md border border-border cursor-pointer" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-1">Label</label>
                <Input value={newColor.label} onChange={(e) => setNewColor({ ...newColor, label: e.target.value })} placeholder="e.g. Brand Red" />
              </div>
              <Button size="sm" onClick={addColor}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowColorForm(false)}>Cancel</Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowColorForm(true)} className="gap-2">
              <Plus size={14} /> Add Color
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Approved Fonts",
      description: "List fonts approved for use on your branded products",
      icon: Type,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {fonts.map((f, i) => (
              <Badge key={i} variant="secondary" className="gap-1.5 text-xs py-1.5 px-3">
                {f}
                <button onClick={() => setFonts(fonts.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive">
                  <X size={10} />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={newFont} onChange={(e) => setNewFont(e.target.value)} placeholder="Font name, e.g. Montserrat Bold" className="max-w-xs" onKeyDown={(e) => e.key === "Enter" && addFont()} />
            <Button size="sm" variant="outline" onClick={addFont} disabled={!newFont.trim()}>Add</Button>
          </div>
        </div>
      ),
    },
    {
      title: "Brand Guidelines",
      description: "Upload brand guideline documents for reference",
      icon: FileText,
      content: (
        <div className="space-y-4">
          {guidelines.map((g, i) => (
            <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg border border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{g.name}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(g.uploadedAt).toLocaleDateString("en-IN")}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => setGuidelines(guidelines.filter((_, idx) => idx !== i))}>
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary/40 transition-colors">
            <Upload size={18} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Upload PDF or document</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setGuidelines([...guidelines, { name: f.name, type: f.type, url: "", uploadedAt: new Date().toISOString() }]);
              }}
            />
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-[900px] space-y-6">
      <div>
        <h1 className="text-xl font-heading font-semibold text-foreground">Brand Assets Library</h1>
        <p className="text-sm text-muted-foreground mt-1">Save your brand assets for easy reuse across orders</p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="bg-background rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <section.icon size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
          </div>
          {section.content}
        </div>
      ))}
    </div>
  );
};

export default BrandAssets;
