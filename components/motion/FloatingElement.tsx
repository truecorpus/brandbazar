'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: boolean;
}

export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 6,
  delay = 0,
  rotate = false,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn(className)}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
        rotate: rotate ? [-1, 1, -1] : 0,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
