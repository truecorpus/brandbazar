import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-20 z-50 w-10 h-10 rounded-xl border border-border bg-background/90 backdrop-blur-sm text-muted-foreground flex items-center justify-center transition-all duration-300 hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      <ArrowUp size={16} />
    </button>
  );
};

export default BackToTop;
