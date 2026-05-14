import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes with proper precedence handling.
 * Use this for all className compositions.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Conditionally joins class names.
 * Alias for clsx when tailwind-merge isn't needed.
 */
export function cx(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a number with commas (e.g., 2000000 -> "2,000,000").
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format a number with suffix (e.g., 2000000 -> "2M+").
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M+`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}K+`;
  }
  return `${num}+`;
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
