import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Corporate", href: "#corporate" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog", isRoute: true },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-background/50 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" onClick={() => handleClick("#home")} className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-semibold text-sm">B</span>
              </div>
              <span className="text-lg font-heading font-semibold tracking-tight ml-1">
                <span className="text-foreground">Brand</span>
                <span className="text-primary">Bazaar</span>
              </span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleClick("#products")}>
              Browse Products
            </Button>
            <Button variant="default" size="sm" onClick={() => handleClick("#quote")} className="gap-1.5">
              Get Quote
              <ArrowRight size={14} />
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-t border-border">
          <div className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className={`block w-full text-left text-[14px] font-medium px-3 py-2.5 rounded-lg transition-colors ${
                  activeSection === link.href.replace("#", "") ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
              <Button variant="outline" size="default" className="w-full" onClick={() => handleClick("#products")}>
                Browse Products
              </Button>
              <Button variant="default" size="default" className="w-full" onClick={() => handleClick("#quote")}>
                Get Quote
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
