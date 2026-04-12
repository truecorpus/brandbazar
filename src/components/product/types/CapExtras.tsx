import { Scissors, Palette } from "lucide-react";

const CapExtras = () => {
  return (
    <div className="space-y-4">
      {/* Adjustability */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
        One size fits all — adjustable strap
      </span>

      {/* Embroidery vs Print comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scissors size={16} className="text-primary" />
            <p className="text-sm font-semibold text-foreground">Embroidery</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Premium raised texture, long-lasting, gives a high-end feel. Best for logos and simple designs.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={16} className="text-foreground" />
            <p className="text-sm font-semibold text-foreground">Print</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Full-color reproduction, complex designs possible, photographic quality. Best for detailed artwork.
          </p>
        </div>
      </div>

      {/* Stitch count estimator */}
      <div className="rounded-md bg-secondary border border-border p-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Embroidery tip:</span> Designs under 8,000 stitches have the best quality. Our team will advise if your design exceeds this.
        </p>
      </div>
    </div>
  );
};

export default CapExtras;
