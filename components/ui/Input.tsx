import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-jakarta font-medium text-rich mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4.5 py-3.5 font-jakarta text-[0.9375rem] text-rich',
            'bg-surface border border-border rounded-md',
            'transition-all duration-200 ease-smooth',
            'placeholder:text-rich-500',
            'focus:border-electric focus:shadow-[0_0_0_3px_rgba(77,124,254,0.15)] focus:outline-none',
            error && 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-charcoal">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
