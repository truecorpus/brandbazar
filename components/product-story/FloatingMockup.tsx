'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingMockupProps {
  children?: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: boolean;
  rotateRange?: number;
  scale?: number;
  shadow?: 'soft' | 'medium' | 'strong';
  depth?: number;
}

const shadowStyles = {
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  strong: 'shadow-strong',
};

export function FloatingMockup({
  children,
  className,
  amplitude = 12,
  duration = 6,
  delay = 0,
  rotate = false,
  rotateRange = 3,
  scale = 1,
  shadow = 'medium',
  depth = 0,
}: FloatingMockupProps) {
  return (
    <motion.div
      className={cn('relative', shadowStyles[shadow], className)}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        zIndex: depth,
      }}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
        rotateZ: rotate ? [-rotateRange, rotateRange, -rotateRange] : 0,
        rotateY: rotate ? [-rotateRange / 2, rotateRange / 2, -rotateRange / 2] : 0,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: scale * 1.04,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Premium product placeholder that looks like a 3D mockup
 * Uses gradient and shadow to create depth when no image is available
 */
export function ProductPlaceholder({
  className,
  gradientFrom,
  gradientTo,
  label,
  shape = 'rounded',
}: {
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  label?: string;
  shape?: 'rounded' | 'pill' | 'square' | 'circle';
}) {
  const shapeStyles = {
    rounded: 'rounded-2xl',
    pill: 'rounded-full',
    square: 'rounded-lg',
    circle: 'rounded-full aspect-square',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white',
        shapeStyles[shape],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom || '#f5f1e8'}, ${gradientTo || '#e7e1d7'})`,
      }}
    >
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(0,0,0,0.06)] rounded-inherit" />
      
      {/* Brand mark placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/6 bg-rich/5 rounded-md flex items-center justify-center">
          {label && (
            <span className="text-rich/20 font-poppins font-semibold text-sm tracking-wider uppercase">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Highlight edge */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
    </div>
  );
}
