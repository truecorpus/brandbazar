'use client';

import { motion } from 'framer-motion';

export function ProductVisualBottle({ accent = '#06B6D4', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: -8, rotateX: 4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div className="relative w-24 h-48 mx-auto">
        {/* Bottle body */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, #e8f4f8 0%, ${accent}15 40%, #d0e8f0 70%, ${accent}08 100%)`,
            boxShadow: `
              inset -6px 0 12px rgba(0,0,0,0.03),
              inset 6px 0 12px rgba(255,255,255,0.6),
              0 16px 32px rgba(0,0,0,0.08),
              0 4px 8px rgba(0,0,0,0.04)
            `,
          }}
        />
        {/* Bottle neck */}
        <div
          className="absolute top-6 left-4 right-4 h-14 rounded-t-lg"
          style={{
            background: `linear-gradient(180deg, ${accent}20 0%, #e0f0f4 100%)`,
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)',
          }}
        />
        {/* Cap */}
        <div
          className="absolute top-0 left-3 right-3 h-8 rounded-t-xl rounded-b-sm"
          style={{
            background: `linear-gradient(180deg, ${accent}50 0%, ${accent}30 100%)`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          }}
        />
        {/* Highlight */}
        <div
          className="absolute top-10 left-2 w-3 h-32 rounded-full opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
          }}
        />
        {/* Brand ring */}
        <div
          className="absolute top-24 left-0 right-0 h-6"
          style={{
            background: `linear-gradient(90deg, transparent 15%, ${accent}50 40%, ${accent}70 50%, ${accent}50 60%, transparent 85%)`,
          }}
        />
        {/* Bottom shadow */}
        <div
          className="absolute -bottom-2 left-1 right-1 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
