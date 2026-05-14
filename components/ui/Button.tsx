'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  magnetic?: boolean;
}

const variantStyles = {
  primary: 'bg-electric text-white shadow-[0_4px_16px_rgba(77,124,254,0.25)] hover:bg-electric-600 hover:shadow-[0_6px_24px_rgba(77,124,254,0.35)] active:scale-[0.98]',
  secondary: 'bg-transparent text-rich border-[1.5px] border-border hover:border-electric hover:text-electric hover:bg-electric-50',
  ghost: 'bg-transparent text-rich hover:bg-ivory-200',
  outline: 'bg-transparent text-rich border border-border hover:border-electric hover:text-electric',
};

const sizeStyles = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-[0.9375rem]',
  lg: 'px-9 py-4 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon, 
    rightIcon,
    children,
    disabled,
    href,
    magnetic = false,
    ...props 
  }, ref) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!magnetic || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      setMagneticOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
    };

    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-jakarta font-semibold tracking-wide rounded-md',
      'transition-all duration-300 ease-smooth cursor-pointer border-none outline-none whitespace-nowrap',
      'focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:outline-none',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
      'relative overflow-hidden',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        <span className="relative z-10">{children}</span>
        {!isLoading && rightIcon}
      </>
    );

    const motionProps = {
      whileHover: { scale: disabled || isLoading ? 1 : 1.02 },
      whileTap: { scale: disabled || isLoading ? 1 : 0.98 },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: magnetic ? {
        x: magneticOffset.x,
        y: magneticOffset.y,
        transition: 'transform 0.2s ease-out',
      } : undefined,
    };

    if (href) {
      const { onClick, target, rel, 'aria-label': ariaLabel, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <Link href={href} passHref legacyBehavior>
          <motion.a
            ref={buttonRef as React.RefObject<HTMLAnchorElement>}
            className={baseStyles}
            onClick={onClick}
            target={target}
            rel={rel}
            aria-label={ariaLabel}
            {...motionProps}
          >
            {/* Hover glow effect for primary */}
            {variant === 'primary' && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
            )}
            {content}
          </motion.a>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref || (buttonRef as React.RefObject<HTMLButtonElement>)}
        className={baseStyles}
        disabled={disabled || isLoading}
        {...motionProps}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {/* Hover glow effect for primary */}
        {variant === 'primary' && !disabled && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
