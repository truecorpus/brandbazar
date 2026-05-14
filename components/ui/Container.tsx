import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'lg' | 'sm' | 'full';
}

const sizeStyles = {
  default: 'max-w-container',
  lg: 'max-w-container-lg',
  sm: 'max-w-4xl',
  full: 'max-w-none',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto',
          'px-6 sm:px-8 lg:px-12 xl:px-16',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
