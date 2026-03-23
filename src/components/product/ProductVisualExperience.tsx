import { useState, useRef } from "react";

const colorOptions = [
  { name: "White", value: "#FFFFFF", border: "#E0E0E0" },
  { name: "Black", value: "#1A1A1A", border: "#1A1A1A" },
  { name: "Navy", value: "#0A1628", border: "#0A1628" },
  { name: "Red", value: "#C0392B", border: "#C0392B" },
  { name: "Pastel Blue", value: "#AEC6CF", border: "#8EB0BC" },
];

const views = ["Front Print", "Back Print", "Side View", "Lifestyle"];

interface Props {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const MugIllustration = ({ color, view, rotating }: { color: string; view: string; rotating: boolean }) => {
  const isDark = ["#1A1A1A", "#0A1628"].includes(color);
  const printGradient = "linear-gradient(135deg, #F5A623 0%, #E85D4A 30%, #6C5CE7 60%, #0984E3 100%)";
  const shineColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.45)";

  return (
    <div
      className={`relative flex items-center justify-center transition-transform duration-700 ${rotating ? "animate-[mugRotate_2s_ease-in-out]" : ""}`}
      style={{ perspective: "800px" }}
    >
      {/* Shadow below mug */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 rounded-[50%] bg-foreground/[0.06] blur-lg" />

      <div className="relative animate-[mugFloat_3s_ease-in-out_infinite]">
        {/* Mug body */}
        <div
          className="relative w-[180px] h-[200px] rounded-b-[28px] rounded-t-[8px] border transition-colors duration-300 overflow-hidden"
          style={{
            backgroundColor: color,
            borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
            boxShadow: `inset -8px 0 20px rgba(0,0,0,${isDark ? "0.3" : "0.06"}), inset 4px 0 12px ${shineColor}`,
          }}
        >
          {/* Print area */}
          {(view === "Front Print" || view === "Side View") && (
            <div
              className="absolute top-[30px] left-[18px] right-[18px] h-[110px] rounded-md transition-opacity duration-500 overflow-hidden"
              style={{ background: printGradient, opacity: 0.85 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs tracking-wider opacity-90 text-center leading-tight px-2">
                  YOUR<br />BRAND<br />HERE
                </span>
              </div>
              {/* Print texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </div>
          )}
          {view === "Back Print" && (
            <div
              className="absolute top-[40px] left-[28px] right-[28px] h-[80px] rounded-md transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, #636E72 0%, #2D3436 100%)", opacity: 0.7 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/80 font-body text-[9px] tracking-widest uppercase">Tagline Area</span>
              </div>
            </div>
          )}
          {view === "Lifestyle" && (
            <div
              className="absolute top-[30px] left-[18px] right-[18px] h-[110px] rounded-md transition-opacity duration-500 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0984E3 0%, #00B894 50%, #F5A623 100%)", opacity: 0.75 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center">
                  <span className="text-white font-display font-bold text-[10px]">LOGO</span>
                </div>
              </div>
            </div>
          )}

          {/* Liquid surface */}
          <div
            className="absolute top-[3px] left-[6px] right-[6px] h-[18px] rounded-[50%]"
            style={{
              background: `radial-gradient(ellipse, rgba(139,90,43,0.25) 0%, rgba(80,50,20,0.35) 70%)`,
              boxShadow: "inset 0 -2px 6px rgba(0,0,0,0.15)",
            }}
          />

          {/* Rim highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-[6px] rounded-t-[8px]"
            style={{
              background: `linear-gradient(180deg, ${shineColor}, transparent)`,
              borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"}`,
            }}
          />

          {/* Shine streak */}
          <div
            className="absolute top-[20px] left-[12px] w-[8px] h-[140px] rounded-full"
            style={{ background: `linear-gradient(180deg, transparent, ${shineColor}, transparent)` }}
          />
        </div>

        {/* Handle */}
        <div
          className="absolute top-[30px] -right-[32px] w-[38px] h-[100px] rounded-r-[24px] border-[6px] border-l-0 transition-colors duration-300"
          style={{
            borderColor: color,
            filter: `brightness(${isDark ? 1.3 : 0.92})`,
            boxShadow: `4px 4px 12px rgba(0,0,0,0.1), inset 0 0 8px ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}`,
          }}
        />
      </div>
    </div>
  );
};

const ProductVisualExperience = ({ selectedColor, onColorChange }: Props) => {
  const [activeView, setActiveView] = useState("Front Print");
  const [rotating, setRotating] = useState(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const handleRotate = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="space-y-6">
      {/* Main visual area */}
      <div
        ref={visualRef}
        className="relative rounded-2xl overflow-hidden cursor-crosshair"
        style={{
          background: "radial-gradient(ellipse at center, hsl(37 30% 96%), hsl(228 33% 97%))",
          minHeight: "360px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomPos(null)}
      >
        <div className="flex items-center justify-center py-12">
          <MugIllustration color={selectedColor} view={activeView} rotating={rotating} />
        </div>

        {/* Zoom lens */}
        {zoomPos && (
          <div
            className="pointer-events-none absolute w-32 h-32 rounded-full border-2 border-accent/40 overflow-hidden"
            style={{
              left: `${zoomPos.x}%`,
              top: `${zoomPos.y}%`,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse at center, hsl(37 30% 96%), hsl(228 33% 97%))",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ transform: `scale(2) translate(${50 - zoomPos.x}%, ${50 - zoomPos.y}%)` }}
            >
              <MugIllustration color={selectedColor} view={activeView} rotating={false} />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {views.map((v) => (
          <button
            key={v}
            onClick={() => setActiveView(v)}
            className={`shrink-0 px-4 py-3 rounded-xl text-xs font-body font-medium transition-all duration-200 ${
              activeView === v
                ? "border-2 border-accent bg-accent/5 text-accent"
                : "border border-border bg-card text-muted-foreground hover:border-primary/20"
            }`}
          >
            {v}
          </button>
        ))}
        <button
          onClick={handleRotate}
          disabled={rotating}
          className="shrink-0 px-4 py-3 rounded-xl text-xs font-body font-medium border border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-accent transition-all disabled:opacity-50"
        >
          🔄 360° View
        </button>
      </div>

      {/* Color swatches */}
      <div>
        <p className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
          Mug Color
        </p>
        <div className="flex gap-3">
          {colorOptions.map((c) => (
            <button
              key={c.name}
              onClick={() => onColorChange(c.value)}
              aria-label={`Select ${c.name}`}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                selectedColor === c.value ? "ring-2 ring-accent ring-offset-2" : ""
              }`}
              style={{ backgroundColor: c.value, borderColor: c.border }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductVisualExperience;
