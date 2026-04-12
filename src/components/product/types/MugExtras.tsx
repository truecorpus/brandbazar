import { useState } from "react";
import { Droplets, Flame, ShieldCheck, RotateCcw } from "lucide-react";

interface Props {
  basePrice: number;
  gstRate: number;
  onQuantityChange: (q: number) => void;
}

const MugExtras = ({ basePrice, gstRate, onQuantityChange }: Props) => {
  const [showRotation, setShowRotation] = useState(false);
  const [teamSize, setTeamSize] = useState("");

  const teamNum = parseInt(teamSize) || 0;
  const perUnit = basePrice;
  const total = perUnit * teamNum;
  const totalWithGst = Math.round(total * (1 + (gstRate || 18) / 100));

  return (
    <div className="space-y-4">
      {/* Spec badges */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: Droplets, label: "Dishwasher Safe" },
          { icon: Flame, label: "Microwave Safe" },
          { icon: ShieldCheck, label: "Food Grade Ceramic" },
        ].map((b) => (
          <span key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
            <b.icon size={14} className="text-primary" />
            {b.label}
          </span>
        ))}
      </div>

      {/* 360° Print Preview toggle */}
      <button
        onClick={() => setShowRotation(!showRotation)}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <RotateCcw size={16} />
        {showRotation ? "Hide" : "Show"} 360° Print Preview
      </button>

      {showRotation && (
        <div className="rounded-lg border border-border bg-secondary p-6 flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-40">
            {/* Animated CSS mug rotation */}
            <div className="w-full h-full animate-spin-slow" style={{ animationDuration: "6s", animationTimingFunction: "linear", animationIterationCount: "infinite" }}>
              <div className="absolute inset-0 rounded-lg bg-background border-2 border-border shadow-md flex items-center justify-center">
                <div className="w-[85%] h-[60%] rounded bg-primary/10 border border-dashed border-primary/40 flex items-center justify-center">
                  <span className="text-[9px] text-primary font-medium">PRINT AREA</span>
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-muted-foreground mt-2">Full wrap: 22cm × 9.5cm</p>
          </div>
        </div>
      )}

      {/* Event price calculator */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <p className="text-sm font-medium text-foreground">🎯 Price calculator for events</p>
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted-foreground whitespace-nowrap">How many employees?</label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="e.g. 25"
            className="w-24 h-9 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {teamNum > 0 && (
            <button
              onClick={() => onQuantityChange(teamNum)}
              className="text-xs text-primary font-medium hover:underline whitespace-nowrap"
            >
              Apply
            </button>
          )}
        </div>
        {teamNum > 0 && (
          <p className="text-sm text-foreground">
            <span className="font-semibold">₹{totalWithGst.toLocaleString("en-IN")}</span>
            <span className="text-muted-foreground"> for a team of {teamNum} — less than </span>
            <span className="font-medium">₹{Math.ceil(totalWithGst / teamNum)}</span>
            <span className="text-muted-foreground"> per person</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default MugExtras;
