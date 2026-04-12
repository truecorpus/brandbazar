import { Link } from "react-router-dom";
import { CreditCard, Users, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  productSlug: string;
}

const IdCardExtras = ({ productSlug }: Props) => {
  return (
    <div className="space-y-4">
      {/* CR-80 dimensions */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
          <CreditCard size={14} className="text-primary" />
          CR-80 Standard: 85.6mm × 54mm
        </span>
      </div>

      {/* Compliance note */}
      <div className="rounded-lg border border-border bg-secondary p-4">
        <p className="text-sm text-foreground leading-relaxed">
          Suitable for workplace ID, event passes, and visitor badges. Compatible with standard ID card holders and lanyards.
        </p>
      </div>

      {/* Bulk personalization callout */}
      <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Users size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Need different names on each card?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Our bulk personalization feature lets you upload a CSV with employee names, designations, and photos — we print each card individually.
            </p>
          </div>
        </div>
        <Link to={`/customize/${productSlug}`}>
          <Button size="sm" className="w-full sm:w-auto">
            <FileSpreadsheet size={14} />
            Set Up Bulk Order
            <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      {/* Frequently bought together */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Frequently Bought Together</p>
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary border border-border">
          <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center text-muted-foreground text-xs">🎗️</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Printed Lanyard</p>
            <p className="text-xs text-muted-foreground">Custom branded lanyard for ID cards</p>
          </div>
          <span className="text-sm font-medium text-foreground shrink-0">+₹35/unit</span>
        </div>
      </div>
    </div>
  );
};

export default IdCardExtras;
