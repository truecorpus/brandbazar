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
      className={`fixed bottom-6 right-24 z-50 w-10 h-10 rounded-md border border-border bg-background text-foreground flex items-center justify-center transition-all duration-300 hover:border-primary hover:text-primary ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default BackToTop;
