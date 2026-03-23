import { Linkedin, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Corporate Orders", href: "#corporate" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const productLinks = [
  "Custom Mugs", "Branded T-Shirts", "Employee ID Cards",
  "Embroidered Caps", "Custom Lamps", "Notebooks & Diaries",
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <span className="text-xl font-heading font-semibold tracking-tight">
              <span className="text-background">Brand</span>
              <span className="text-background/50">Bazaar</span>
            </span>
            <p className="mt-4 text-[14px] text-background/50 leading-relaxed">
              Premium customized printed merchandise for corporations, startups, and teams across India.
            </p>
            <div className="flex gap-2 mt-6">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-xl bg-background/[0.06] flex items-center justify-center hover:bg-background/[0.12] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
              <a href="https://wa.me/919876543210" aria-label="WhatsApp" className="w-9 h-9 rounded-xl bg-background/[0.06] flex items-center justify-center hover:bg-background/[0.12] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[12px] uppercase tracking-[1.5px] mb-5 text-background/60">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14px] text-background/50 hover:text-background transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[12px] uppercase tracking-[1.5px] mb-5 text-background/60">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((p) => (
                <li key={p}>
                  <a href="#products" className="text-[14px] text-background/50 hover:text-background transition-colors">{p}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[12px] uppercase tracking-[1.5px] mb-5 text-background/60">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[14px] text-background/50">
                <Phone size={16} className="shrink-0 mt-0.5 text-background/30" /> +91 98765 43210
              </li>
              <li className="flex gap-3 text-[14px] text-background/50">
                <Mail size={16} className="shrink-0 mt-0.5 text-background/30" /> hello@brandbazaar.in
              </li>
              <li className="flex gap-3 text-[14px] text-background/50">
                <MapPin size={16} className="shrink-0 mt-0.5 text-background/30" /> Sector 62, Noida, UP 201301, India
              </li>
              <li className="flex gap-3 text-[14px] text-background/50">
                <Clock size={16} className="shrink-0 mt-0.5 text-background/30" /> Mon–Sat: 9:00 AM – 7:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/[0.08]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-background/30">
            © {new Date().getFullYear()} BrandBazaar. All rights reserved. GSTIN: 09XXXXX1234X1Z5 | CIN: U74999UP2024PTC123456
          </p>
          <a href="#" className="text-[12px] text-background/30 hover:text-background transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
