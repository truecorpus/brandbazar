import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-ivory-200 text-rich',
  primary: 'bg-electric-50 text-electric-700',
  secondary: 'bg-lavender-50 text-lavender-300',
  outline: 'bg-transparent border border-border text-charcoal',
};

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-jakarta font-medium rounded-full',
          'transition-colors duration-200 ease-smooth',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
