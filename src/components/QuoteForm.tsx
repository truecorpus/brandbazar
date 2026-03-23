import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Palette, CheckCircle } from "lucide-react";

const productCategories = [
  "Customized Mugs",
  "Branded T-Shirts",
  "ID Cards & Lanyards",
  "Caps & Headwear",
  "Desk Lamps",
  "Notebooks & Diaries",
  "Keychains",
  "Corporate Kits",
  "Other",
];

const reassurancePoints = [
  { icon: Clock, title: "Quote in 24 Hours", desc: "Our team responds with a detailed quote within one business day." },
  { icon: Shield, title: "No Commitment", desc: "Get pricing without any obligation. Cancel or modify anytime." },
  { icon: Palette, title: "Free Design Mockup", desc: "We'll create a branded mockup so you can see the final product before ordering." },
];

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  date: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    date: "",
    message: "",
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
    `w-full px-4 py-3 rounded-lg border font-body text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  if (submitted) {
    return (
      <section id="quote" className="py-20 lg:py-28 bg-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-card rounded-2xl p-12 border border-border shadow-[var(--shadow-lg)]">
            <CheckCircle size={56} className="text-accent mx-auto mb-6" />
            <h2 className="font-display font-extrabold text-3xl text-primary mb-4">Thank You!</h2>
            <p className="text-muted-foreground font-body text-lg">
              Our team will reach out within 24 hours with a customized quote for your order. Check your inbox for a confirmation email.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge-chip">Free Quote</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight">
            Get Your Corporate Quote in 24 Hours
          </h2>
          <p className="mt-4 text-muted-foreground text-lg font-body">
            Tell us what you need and our team will prepare a detailed proposal — no obligation, no hassle.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Reassurance */}
          <div className="lg:col-span-2 space-y-8">
            {reassurancePoints.map((r) => (
              <div key={r.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <r.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary">{r.title}</h4>
                  <p className="text-sm text-muted-foreground font-body mt-1">{r.desc}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-primary p-6 mt-8">
              <p className="text-primary-foreground/80 font-body text-sm leading-relaxed">
                "We submitted our requirements on Monday evening and had a fully itemized quote with design mockups by Tuesday afternoon. Incredible turnaround."
              </p>
              <p className="mt-3 text-accent font-display font-semibold text-sm">— Vikram K., Procurement Lead</p>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card rounded-2xl p-8 lg:p-10 border border-border shadow-[var(--shadow-lg)]">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Full Name *</label>
                <input className={inputClass("fullName")} placeholder="Your full name" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                {errors.fullName && <p className="text-destructive text-xs mt-1 font-body">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Company Name *</label>
                <input className={inputClass("company")} placeholder="Your company" value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
                {errors.company && <p className="text-destructive text-xs mt-1 font-body">{errors.company}</p>}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Email *</label>
                <input type="email" className={inputClass("email")} placeholder="you@company.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                {errors.email && <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Phone *</label>
                <input type="tel" className={inputClass("phone")} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                {errors.phone && <p className="text-destructive text-xs mt-1 font-body">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Product Category *</label>
                <select className={inputClass("category")} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                  <option value="">Select a category</option>
                  {productCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <p className="text-destructive text-xs mt-1 font-body">{errors.category}</p>}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Estimated Quantity *</label>
                <input type="number" min="1" className={inputClass("quantity")} placeholder="e.g. 250" value={form.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
                {errors.quantity && <p className="text-destructive text-xs mt-1 font-body">{errors.quantity}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Event / Requirement Date</label>
                <input type="date" className={inputClass("date")} value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Message / Special Requirements</label>
                <textarea rows={4} className={inputClass("message")} placeholder="Tell us about your project — colors, branding guidelines, special requests..." value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
              </div>
            </div>

            <Button type="submit" variant="cta" size="xl" className="w-full mt-8">
              Submit Quote Request
              <ArrowRight size={18} />
            </Button>

            <p className="text-xs text-muted-foreground font-body text-center mt-4">
              By submitting, you agree to our privacy policy. We'll never share your data with third parties.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
