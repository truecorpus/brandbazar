'use client';

import { motion } from 'framer-motion';

export function ProductVisualGift({ accent = '#EF4444', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: 8, rotateX: -4, scale: 1.03 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div className="relative w-36 h-36 mx-auto">
        {/* Box */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(135deg, #f8f0e8 0%, ${accent}10 40%, #f0e0d0 100%)`,
            boxShadow: `
              0 16px 32px rgba(0,0,0,0.08),
              0 4px 8px rgba(0,0,0,0.04),
              inset 0 1px 2px rgba(255,255,255,0.8)
            `,
          }}
        />
        {/* Ribbon vertical */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6"
          style={{
            background: `linear-gradient(90deg, ${accent}70 0%, ${accent}90 50%, ${accent}70 100%)`,
            boxShadow: '0 0 8px rgba(0,0,0,0.06)',
          }}
        />
        {/* Ribbon horizontal */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-6"
          style={{
            background: `linear-gradient(180deg, ${accent}70 0%, ${accent}90 50%, ${accent}70 100%)`,
            boxShadow: '0 0 8px rgba(0,0,0,0.06)',
          }}
        />
        {/* Bow center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent} 0%, ${accent}80 100%)`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        />
        {/* Bow loops */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full -mt-1 w-12 h-6 rounded-t-full"
          style={{
            border: `3px solid ${accent}`,
            borderBottom: 'none',
            boxShadow: '0 -2px 4px rgba(0,0,0,0.06)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-1 w-12 h-6 rounded-b-full"
          style={{
            border: `3px solid ${accent}`,
            borderTop: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
          }}
        />
        {/* Shadow */}
        <div
          className="absolute -bottom-3 left-2 right-2 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
