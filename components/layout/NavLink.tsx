'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, isActive = false, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative group px-4 py-2',
        className
      )}
    >
      <span className={cn(
        'relative font-jakarta text-sm font-medium tracking-wide transition-colors duration-300',
        isActive ? 'text-electric' : 'text-rich hover:text-electric'
      )}>
        {children}
      </span>

      <motion.span
        className="absolute bottom-0 left-4 right-4 h-px bg-electric origin-left"
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </Link>
  );
}
