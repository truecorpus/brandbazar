'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'ghost';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-surface border border-border shadow-soft',
  elevated: 'bg-surface border border-border shadow-medium',
  ghost: 'bg-transparent border border-transparent',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, padding = 'md', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          'transition-all duration-300 ease-smooth',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:-translate-y-1 hover:shadow-medium',
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
