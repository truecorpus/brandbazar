'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { motion as motionTokens } from '@/lib/design-tokens';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {},
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  threshold = 0.15,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: 0.7,
        ease: motionTokens.easing.decel,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
