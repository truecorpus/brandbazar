import { Shield, Truck, Clock, Award } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "100% Quality Guaranteed", desc: "Premium materials & inks" },
  { icon: Truck, label: "Pan-India Delivery", desc: "Free shipping on 100+ units" },
  { icon: Clock, label: "Fast 5-Day Turnaround", desc: "Express production available" },
  { icon: Award, label: "Trusted by 500+ Brands", desc: "ISO certified facility" },
];

const TrustBanner = () => {
  return (
    <section className="py-10 bg-foreground">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background/[0.08] flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-background">{item.label}</p>
                <p className="text-[11px] text-background/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
