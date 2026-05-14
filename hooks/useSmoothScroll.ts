'use client';

import { useEffect, useRef } from 'react';

/**
 * Smooth scroll to element with cinematic easing.
 * Uses native scrollIntoView with smooth behavior.
 */
export function useSmoothScroll() {
  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;

    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return { scrollTo };
}

/**
 * Hook to observe when an element is near viewport for preload.
 */
export function useNearViewport(threshold = 200) {
  const ref = useRef<HTMLElement>(null);
  const isNear = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNear.current = entry.isIntersecting;
      },
      { rootMargin: `${threshold}px` }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isNear };
}
