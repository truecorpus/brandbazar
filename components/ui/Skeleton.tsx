'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseStyles = 'bg-ivory-200';

  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  return (
    <motion.div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{ width, height }}
      animate={animate ? {
        opacity: [0.5, 0.8, 0.5],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 bg-white rounded-2xl border border-border', className)}>
      <Skeleton variant="rounded" width="100%" height={160} className="mb-4" />
      <Skeleton variant="text" width="60%" height={24} className="mb-3" />
      <Skeleton variant="text" width="80%" height={16} className="mb-2" />
      <Skeleton variant="text" width="40%" height={16} />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
          height={16}
        />
      ))}
    </div>
  );
}
