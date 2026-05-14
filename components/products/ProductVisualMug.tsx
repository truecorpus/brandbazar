'use client';

import { motion } from 'framer-motion';

export function ProductVisualMug({ accent = '#F59E0B', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: 8, rotateX: -4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Mug body */}
      <div className="relative w-32 h-40 mx-auto">
        {/* Main cylinder */}
        <div
          className="absolute inset-0 rounded-b-3xl rounded-t-sm"
          style={{
            background: `linear-gradient(135deg, #f5f1e8 0%, ${accent}15 30%, #f5f1e8 60%, ${accent}08 100%)`,
            boxShadow: `
              inset -8px 0 16px rgba(0,0,0,0.04),
              inset 8px 0 16px rgba(255,255,255,0.5),
              0 20px 40px rgba(0,0,0,0.08),
              0 4px 8px rgba(0,0,0,0.04)
            `,
          }}
        />
        {/* Rim */}
        <div
          className="absolute top-0 left-0 right-0 h-3 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${accent}20 0%, #e8e0d4 50%, #f5f1e8 100%)`,
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.06)',
          }}
        />
        {/* Handle */}
        <div
          className="absolute top-8 -right-8 w-10 h-20 rounded-r-2xl"
          style={{
            border: `4px solid ${accent}30`,
            borderLeft: 'none',
            boxShadow: '2px 4px 8px rgba(0,0,0,0.06)',
          }}
        />
        {/* Brand accent stripe */}
        <div
          className="absolute top-16 left-0 right-0 h-8"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${accent}40 30%, ${accent}60 50%, ${accent}40 70%, transparent 90%)`,
          }}
        />
        {/* Bottom shadow */}
        <div
          className="absolute -bottom-2 left-2 right-2 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
