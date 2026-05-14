'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { easing } from '@/lib/animations';

type AnimationVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-scale' | 'fade-only' | 'clip-reveal' | 'slide-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const variantMap: Record<AnimationVariant, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-scale': {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  'fade-only': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'clip-reveal': {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)' },
  },
  'slide-up': {
    hidden: { y: '100%' },
    visible: { y: 0 },
  },
};

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variantMap[variant]}
      transition={{
        duration,
        delay,
        ease: easing.cinematic,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
