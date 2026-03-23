import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Corporate", href: "#corporate" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-elevated/95 backdrop-blur-xl border-b border-border shadow-brand"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#home" onClick={() => handleClick("#home")} className="font-display font-extrabold text-xl tracking-tight text-primary">
              PRINT<span className="text-accent">CRAFT</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`text-sm font-medium transition-colors duration-200 font-body ${
                  activeSection === link.href.replace("#", "")
                    ? "text-accent"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="default" onClick={() => handleClick("#products")}>
              Browse Products
            </Button>
            <Button variant="cta" size="default" onClick={() => handleClick("#quote")}>
              Get Quote
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-surface-elevated border-t border-border animate-fade-up">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`block w-full text-left text-base font-medium transition-colors font-body ${
                  activeSection === link.href.replace("#", "") ? "text-accent" : "text-foreground hover:text-accent"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button variant="outline" size="lg" className="w-full" onClick={() => handleClick("#products")}>
                Browse Products
              </Button>
              <Button variant="cta" size="lg" className="w-full" onClick={() => handleClick("#quote")}>
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
