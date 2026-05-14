'use client';

import { motion } from 'framer-motion';

export function ProductVisualCard({ accent = '#64748B', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: -10, rotateZ: 2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div className="relative w-28 h-44 mx-auto">
        {/* Card body */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 50%, #f5f5f5 100%)',
            boxShadow: `
              0 12px 24px rgba(0,0,0,0.08),
              0 4px 8px rgba(0,0,0,0.04),
              inset 0 1px 2px rgba(255,255,255,0.8)
            `,
          }}
        />
        {/* Photo area */}
        <div
          className="absolute top-3 left-3 right-3 h-20 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${accent}20 0%, ${accent}08 100%)`,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
          }}
        >
          {/* Person silhouette */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-charcoal/10" />
        </div>
        {/* Name line */}
        <div className="absolute top-26 left-3 right-3 space-y-1.5">
          <div className="h-2 rounded bg-charcoal/10 w-3/4" />
          <div className="h-1.5 rounded bg-charcoal/6 w-1/2" />
          <div className="h-1.5 rounded bg-charcoal/6 w-2/3" />
        </div>
        {/* Bottom stripe */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 rounded-b-xl"
          style={{
            background: `linear-gradient(90deg, ${accent}60 0%, ${accent}40 100%)`,
          }}
        />
        {/* Lanyard clip */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 rounded-b-lg"
          style={{
            background: `linear-gradient(180deg, ${accent}80 0%, ${accent}50 100%)`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
        {/* Lanyard */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-0.5 h-14"
          style={{
            background: `linear-gradient(180deg, ${accent}30 0%, ${accent}60 100%)`,
          }}
        />
        {/* Shadow */}
        <div
          className="absolute -bottom-2 left-2 right-2 h-3 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
