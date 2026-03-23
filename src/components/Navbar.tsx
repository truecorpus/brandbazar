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
      setScrolled(window.scrollY > 10);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-background border-b ${
        scrolled
          ? "border-border shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
          : "border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" onClick={() => handleClick("#home")} className="text-lg font-semibold tracking-tight">
              <span className="text-foreground">Brand</span>
              <span className="text-primary">Bazaar</span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
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
            <Button variant="default" size="default" onClick={() => handleClick("#quote")}>
              Get Quote
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-up">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`block w-full text-left text-sm font-medium transition-colors ${
                  activeSection === link.href.replace("#", "") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border">
              <Button variant="outline" size="default" className="w-full" onClick={() => handleClick("#products")}>
                Browse Products
              </Button>
              <Button variant="default" size="default" className="w-full" onClick={() => handleClick("#quote")}>
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
