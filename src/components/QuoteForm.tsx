import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Palette, CheckCircle, Send } from "lucide-react";

const productCategories = [
  "Customized Mugs", "Branded T-Shirts", "ID Cards & Lanyards",
  "Caps & Headwear", "Desk Lamps", "Notebooks & Diaries",
  "Keychains", "Corporate Kits", "Other",
];

const reassurancePoints = [
  { icon: Clock, title: "Quote in 24 Hours", desc: "Our team responds with a detailed quote within one business day.", accent: "217 91% 50%" },
  { icon: Shield, title: "No Commitment", desc: "Get pricing without any obligation. Cancel or modify anytime.", accent: "142 71% 45%" },
  { icon: Palette, title: "Free Design Mockup", desc: "We'll create a branded mockup so you can see the final product before ordering.", accent: "262 60% 55%" },
];

interface FormData {
  fullName: string; company: string; email: string; phone: string;
  category: string; quantity: string; date: string; message: string;
}
interface FormErrors { [key: string]: string; }

const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    fullName: "", company: "", email: "", phone: "",
    category: "", quantity: "", date: "", message: "",
  });

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid phone number";
    if (!form.category) e.category = "Select a product category";
    if (!form.quantity.trim()) e.quantity = "Quantity is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-[14px] bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  if (submitted) {
    return (
      <section id="quote" className="py-20 lg:py-24 bg-background">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-background rounded-2xl p-10 border border-border" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={28} className="text-primary" />
            </div>
            <h2 className="text-[28px] font-heading font-semibold text-foreground mb-3">Thank you!</h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Our team will reach out within 24 hours with a customized quote for your order. Check your inbox for a confirmation email.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 lg:py-24 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[560px] mx-auto mb-14">
          <p className="section-label">Free Quote</p>
          <h2 className="section-heading">Get your corporate quote in 24 hours</h2>
          <p className="section-subtext">
            Tell us what you need and our team will prepare a detailed proposal — no obligation, no hassle.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            {reassurancePoints.map((r) => (
              <div key={r.title} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `hsl(${r.accent} / 0.08)` }}
                >
                  <r.icon size={18} style={{ color: `hsl(${r.accent})` }} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-[14px] text-foreground">{r.title}</h4>
                  <p className="text-[13px] text-muted-foreground mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-foreground p-6 mt-4">
              <p className="text-background/70 text-[14px] leading-relaxed italic">
                "We submitted our requirements on Monday evening and had a fully itemized quote with design mockups by Tuesday afternoon. Incredible turnaround."
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-semibold text-primary-foreground">VK</div>
                <p className="text-background/80 font-medium text-[13px]">Vikram K., Procurement Lead</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-background rounded-2xl p-7 lg:p-8 border border-border"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Full Name *</label>
                <input className={inputClass("fullName")} placeholder="Your full name" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                {errors.fullName && <p className="text-destructive text-[11px] mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Company Name *</label>
                <input className={inputClass("company")} placeholder="Your company" value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
                {errors.company && <p className="text-destructive text-[11px] mt-1">{errors.company}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Email *</label>
                <input type="email" className={inputClass("email")} placeholder="you@company.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                {errors.email && <p className="text-destructive text-[11px] mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Phone *</label>
                <input type="tel" className={inputClass("phone")} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                {errors.phone && <p className="text-destructive text-[11px] mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Product Category *</label>
                <select className={inputClass("category")} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                  <option value="">Select a category</option>
                  {productCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-destructive text-[11px] mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Estimated Quantity *</label>
                <input type="number" min="1" className={inputClass("quantity")} placeholder="e.g. 250" value={form.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
                {errors.quantity && <p className="text-destructive text-[11px] mt-1">{errors.quantity}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Event / Requirement Date</label>
                <input type="date" className={inputClass("date")} value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-medium text-foreground mb-1.5">Message / Special Requirements</label>
                <textarea rows={3} className={inputClass("message")} placeholder="Tell us about your project — colors, branding guidelines, special requests..." value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
              </div>
            </div>

            <Button type="submit" variant="default" size="lg" className="w-full mt-6 shadow-brand-lg gap-2">
              <Send size={15} />
              Submit Quote Request
            </Button>

            <p className="text-[11px] text-muted-foreground text-center mt-3">
              By submitting, you agree to our privacy policy. We'll never share your data with third parties.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
