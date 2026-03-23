import { useEffect } from "react";

export function useScrollAnimations() {
  useEffect(() => {
    // Intersection Observer for fade-in sections
    const sections = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    // Navbar scroll state
    const navbar = document.getElementById("main-nav");
    const onScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 60) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
