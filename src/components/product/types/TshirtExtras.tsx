import { useState } from "react";
import { Ruler, Droplets, ThermometerSun, Wind, X } from "lucide-react";

interface Props {
  selectedColor?: string | null;
}

const sizeChart = [
  { size: "S", chest: "91", length: "66", chestIn: "36", lengthIn: "26" },
  { size: "M", chest: "96", length: "69", chestIn: "38", lengthIn: "27" },
  { size: "L", chest: "101", length: "72", chestIn: "40", lengthIn: "28" },
  { size: "XL", chest: "106", length: "74", chestIn: "42", lengthIn: "29" },
  { size: "XXL", chest: "112", length: "76", chestIn: "44", lengthIn: "30" },
];

const washCare = [
  { icon: Droplets, label: "Machine wash cold" },
  { icon: ThermometerSun, label: "Do not bleach" },
  { icon: Wind, label: "Tumble dry low" },
];

const TshirtExtras = ({ selectedColor }: Props) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <div className="space-y-4">
      {/* Fabric composition */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
          100% Combed Cotton
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
          180 GSM
        </span>
      </div>

      {/* Fit indicator */}
      <p className="text-sm text-muted-foreground">
        👕 This item runs <span className="font-medium text-foreground">true to size</span>
      </p>

      {/* Size guide trigger */}
      <button
        onClick={() => setShowSizeGuide(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <Ruler size={14} /> Size Guide
      </button>

      {/* Color note */}
      {selectedColor && (
        <p className="text-xs text-muted-foreground bg-secondary rounded-md px-3 py-2 border border-border">
          Design preview shows on <span className="font-medium text-foreground">{selectedColor}</span> — colors may vary slightly on screen vs actual product.
        </p>
      )}

      {/* Wash care symbols */}
      <div className="flex flex-wrap gap-3">
        {washCare.map((w) => (
          <span key={w.label} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <w.icon size={14} className="text-foreground" />
            {w.label}
          </span>
        ))}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-background rounded-xl border border-border shadow-lg max-w-md w-full p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-colors">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-3 text-left font-medium text-foreground">Size</th>
                    <th className="py-2 px-3 text-left font-medium text-foreground">Chest (cm)</th>
                    <th className="py-2 px-3 text-left font-medium text-foreground">Length (cm)</th>
                    <th className="py-2 px-3 text-left font-medium text-foreground">Chest (in)</th>
                    <th className="py-2 px-3 text-left font-medium text-foreground">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? "bg-secondary" : ""}>
                      <td className="py-2 px-3 font-medium text-foreground">{row.size}</td>
                      <td className="py-2 px-3 text-muted-foreground">{row.chest}</td>
                      <td className="py-2 px-3 text-muted-foreground">{row.length}</td>
                      <td className="py-2 px-3 text-muted-foreground">{row.chestIn}</td>
                      <td className="py-2 px-3 text-muted-foreground">{row.lengthIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">Measurements may vary ±1cm. For best fit, measure a similar garment you own.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TshirtExtras;
