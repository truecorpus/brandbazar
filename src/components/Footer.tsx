import { Linkedin, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Corporate Orders", href: "#corporate" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const productLinks = [
  "Custom Mugs",
  "Branded T-Shirts",
  "Employee ID Cards",
  "Embroidered Caps",
  "Custom Lamps",
  "Notebooks & Diaries",
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand */}
          <div>
            <span className="font-display font-extrabold text-xl tracking-tight">
              PRINT<span className="text-accent">CRAFT</span>
            </span>
            <p className="mt-4 text-sm text-primary-foreground/60 font-body leading-relaxed">
              Premium customized printed merchandise for corporations, startups, and teams across India.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/919876543210"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-5">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((p) => (
                <li key={p}>
                  <a href="#products" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-primary-foreground/60 font-body">
                <Phone size={16} className="shrink-0 mt-0.5 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60 font-body">
                <Mail size={16} className="shrink-0 mt-0.5 text-accent" />
                hello@printcraft.in
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60 font-body">
                <MapPin size={16} className="shrink-0 mt-0.5 text-accent" />
                Sector 62, Noida, UP 201301, India
              </li>
              <li className="flex gap-3 text-sm text-primary-foreground/60 font-body">
                <Clock size={16} className="shrink-0 mt-0.5 text-accent" />
                Mon–Sat: 9:00 AM – 7:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} PrintCraft. All rights reserved. GSTIN: 09XXXXX1234X1Z5 | CIN: U74999UP2024PTC123456
          </p>
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-accent font-body transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
