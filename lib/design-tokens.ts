/**
 * BrandBazar Design Tokens
 * Centralized source of truth for all design values.
 * Use these for programmatic access to tokens in TypeScript.
 */

// ─────────── COLOR TOKENS ───────────
export const colors = {
  // Backgrounds
  ivory: {
    DEFAULT: '#F5F1E8',
    50: '#FDFCF9',
    100: '#F5F1E8',
    200: '#E7E1D7',
    300: '#D5CDBF',
    400: '#C4B9A7',
  },
  
  // Primary Accent
  electric: {
    DEFAULT: '#4D7CFE',
    50: '#EEF2FF',
    100: '#DCE5FF',
    200: '#B8CBFF',
    300: '#8AABFF',
    400: '#6B93FF',
    500: '#4D7CFE',
    600: '#2E62E8',
    700: '#1E4EC2',
    800: '#1A3F9E',
    900: '#1A367D',
  },
  
  // Text
  rich: {
    DEFAULT: '#111111',
    50: '#F5F5F5',
    100: '#E5E5E5',
    200: '#CCCCCC',
    300: '#999999',
    400: '#666666',
    500: '#555555',
    600: '#333333',
    700: '#222222',
    800: '#1A1A1A',
    900: '#111111',
  },
  
  charcoal: '#555555',
  
  // Optional Accent
  lavender: {
    DEFAULT: '#C9B8FF',
    50: '#F5F2FF',
    100: '#EDE8FF',
    200: '#C9B8FF',
    300: '#A085F5',
  },
  
  // Surfaces
  surface: '#FFFFFF',
  border: '#E7E1D7',
} as const;

// ─────────── TYPOGRAPHY TOKENS ───────────
export const typography = {
  families: {
    poppins: 'var(--font-poppins)',
    jakarta: 'var(--font-plus-jakarta)',
    general: 'var(--font-general)',
  },
  
  sizes: {
    display: { size: '4.5rem', lineHeight: '1.05', letterSpacing: '-0.02em', weight: 700 },
    displayMd: { size: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.01em', weight: 700 },
    displaySm: { size: '2.5rem', lineHeight: '1.15', letterSpacing: '-0.01em', weight: 600 },
    h1: { size: '3.5rem', lineHeight: '1.1', letterSpacing: '-0.01em', weight: 700 },
    h2: { size: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.01em', weight: 600 },
    h3: { size: '1.75rem', lineHeight: '1.3', letterSpacing: '0', weight: 600 },
    h4: { size: '1.25rem', lineHeight: '1.4', letterSpacing: '0', weight: 600 },
    bodyLg: { size: '1.125rem', lineHeight: '1.7', letterSpacing: '0.01em', weight: 400 },
    body: { size: '1rem', lineHeight: '1.6', letterSpacing: '0.01em', weight: 400 },
    bodySm: { size: '0.875rem', lineHeight: '1.5', letterSpacing: '0.02em', weight: 400 },
    caption: { size: '0.75rem', lineHeight: '1.4', letterSpacing: '0.05em', weight: 500 },
  },
} as const;

// ─────────── SPACING TOKENS ───────────
export const spacing = {
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '1rem',      // 16px
  4: '1.5rem',    // 24px
  5: '2rem',      // 32px
  6: '3rem',      // 48px
  7: '4rem',      // 64px
  8: '6rem',      // 96px
  9: '8rem',      // 128px
} as const;

// ─────────── RADIUS TOKENS ───────────
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  pill: '9999px',
} as const;

// ─────────── SHADOW TOKENS ───────────
export const shadows = {
  soft: '0 4px 24px rgba(0, 0, 0, 0.04)',
  medium: '0 8px 32px rgba(0, 0, 0, 0.06)',
  strong: '0 16px 48px rgba(0, 0, 0, 0.08)',
  glow: '0 0 40px rgba(77, 124, 254, 0.15)',
  glowStrong: '0 0 60px rgba(77, 124, 254, 0.25)',
} as const;

// ─────────── MOTION TOKENS ───────────
export const motion = {
  easing: {
    smooth: [0.4, 0, 0.2, 1] as const,
    decel: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
    bounceSubtle: [0.34, 1.56, 0.64, 1] as const,
  },
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
    slowest: 1.0,
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
  },
} as const;

// ─────────── BREAKPOINT TOKENS ───────────
export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

// ─────────── CONTAINER TOKENS ───────────
export const container = {
  maxWidth: '1280px',
  maxWidthLg: '1400px',
  padding: {
    DEFAULT: '1.5rem',
    sm: '2rem',
    lg: '3rem',
    xl: '4rem',
  },
} as const;

// ─────────── Z-INDEX SCALE ───────────
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  tooltip: 800,
} as const;
