import { BookOpen, FileText, Gift } from "lucide-react";

const NotebookExtras = () => {
  return (
    <div className="space-y-4">
      {/* Paper quality badges */}
      <div className="flex flex-wrap gap-2">
        {["80 GSM Ruled Pages", "200 Pages", "A5 Size"].map((label) => (
          <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground border border-border">
            <BookOpen size={14} className="text-primary" />
            {label}
          </span>
        ))}
      </div>

      {/* Cover finish comparison */}
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Cover Finish Options</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { name: "Matte", desc: "Professional, fingerprint-resistant" },
            { name: "Glossy", desc: "Vibrant colors, high-shine surface" },
            { name: "Soft Touch", desc: "Velvety, premium tactile feel" },
          ].map((f) => (
            <div key={f.name} className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="text-sm font-medium text-foreground">{f.name}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spine text note */}
      <div className="rounded-md bg-secondary border border-border p-3 flex items-start gap-2">
        <FileText size={14} className="text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Spine text available</span> — add your company name on the spine in the customizer.
        </p>
      </div>

      {/* Use case suggestions */}
      <div className="rounded-md bg-primary/5 border border-primary/10 p-3 flex items-start gap-2">
        <Gift size={14} className="text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Perfect for employee onboarding kits, conference giveaways, and client gifts.
        </p>
      </div>
    </div>
  );
};

export default NotebookExtras;
