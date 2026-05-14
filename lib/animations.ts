/**
 * BrandBazar Animation System
 * Centralized, premium animation variants for Framer Motion.
 * Designed for cinematic, luxurious motion with intentional pacing.
 */

import { Variants, Transition } from 'framer-motion';

// ─────────── EASING CURVES ───────────
export const easing = {
  // Primary: Smooth deceleration for entrances
  smooth: [0.4, 0, 0.2, 1] as const,
  // Cinematic: Dramatic deceleration
  cinematic: [0.16, 1, 0.3, 1] as const,
  // Snappy: Quick response for interactions
  snappy: [0.25, 0.46, 0.45, 0.94] as const,
  // Bounce: Subtle overshoot for playful moments
  bounce: [0.34, 1.56, 0.64, 1] as const,
  // Linear: For continuous animations
  linear: [0, 0, 1, 1] as const,
  // Exit: Accelerated exit
  exit: [0.4, 0, 1, 1] as const,
};

// ─────────── DURATION TOKENS ───────────
export const duration = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.7,
  slower: 1.0,
  slowest: 1.5,
};

// ─────────── TRANSITION PRESETS ───────────
export const transitions: Record<string, Transition> = {
  smooth: { duration: duration.normal, ease: easing.smooth },
  cinematic: { duration: duration.slow, ease: easing.cinematic },
  snappy: { duration: duration.fast, ease: easing.snappy },
  bounce: { duration: duration.normal, ease: easing.bounce, type: 'spring', stiffness: 300 },
  spring: { type: 'spring', stiffness: 200, damping: 25 },
  springSoft: { type: 'spring', stiffness: 150, damping: 20 },
};

// ─────────── VARIANTS ───────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow },
  },
};

export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
};

export const slideDown: Variants = {
  hidden: { y: '-100%' },
  visible: {
    y: 0,
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
};

export const clipRevealHorizontal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
};

// ─────────── STAGGER CONTAINER ───────────
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

// ─────────── HOVER VARIANTS ───────────
export const hoverLift = {
  rest: { y: 0, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)' },
  hover: {
    y: -6,
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
    transition: { duration: duration.normal, ease: easing.smooth },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: duration.fast, ease: easing.smooth },
  },
};

export const hoverGlow = (color = '#4D7CFE') => ({
  rest: { boxShadow: `0 0 0 ${color}00` },
  hover: {
    boxShadow: `0 0 30px ${color}30`,
    transition: { duration: duration.normal, ease: easing.smooth },
  },
});

// ─────────── PAGE TRANSITION ───────────
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: duration.fast, ease: easing.exit },
  },
};

// ─────────── LOADING SEQUENCE ───────────
export const loadingSequence: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slower, ease: easing.cinematic },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: duration.slow, ease: easing.smooth },
  },
};

// ─────────── TEXT CHARACTER REVEAL ───────────
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.cinematic,
      delay: i * 0.03,
    },
  }),
};

// ─────────── MAGNETIC BUTTON ───────────
export const magneticEffect = (strength = 0.3) => ({
  rest: { x: 0, y: 0 },
  hover: (coords: { x: number; y: number }) => ({
    x: coords.x * strength,
    y: coords.y * strength,
    transition: { type: 'spring', stiffness: 350, damping: 15, mass: 0.5 },
  }),
});

// ─────────── PARALLAX LAYERS ───────────
export const parallaxSlow = { speed: 0.3 };
export const parallaxMedium = { speed: 0.5 };
export const parallaxFast = { speed: 0.7 };
