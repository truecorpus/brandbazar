'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track a CSS media query.
 * Returns true if the media query matches.
 * 
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Update on change
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks for common screen sizes.
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsLargeDesktop() {
  return useMediaQuery('(min-width: 1280px)');
}
