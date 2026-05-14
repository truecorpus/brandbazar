'use client';

import { motion } from 'framer-motion';

export function ProductVisualNotebook({ accent = '#EC4899', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: 12, rotateX: -3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div className="relative w-32 h-44 mx-auto">
        {/* Back cover */}
        <div
          className="absolute inset-0 rounded-r-lg rounded-l-sm"
          style={{
            background: `linear-gradient(135deg, ${accent}30 0%, ${accent}15 100%)`,
            boxShadow: '4px 4px 12px rgba(0,0,0,0.08)',
          }}
        />
        {/* Pages block */}
        <div
          className="absolute top-1 left-1 right-2 bottom-1 rounded-r-md"
          style={{
            background: 'linear-gradient(90deg, #f8f6f0 0%, #fff 5%, #f5f3ed 100%)',
            boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.04)',
          }}
        />
        {/* Page lines */}
        <div className="absolute top-4 left-4 right-4 space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-px bg-charcoal/8" style={{ width: `${60 + Math.random() * 30}%` }} />
          ))}
        </div>
        {/* Spine */}
        <div
          className="absolute top-0 left-0 bottom-0 w-3 rounded-l-sm"
          style={{
            background: `linear-gradient(90deg, ${accent}60 0%, ${accent}30 50%, ${accent}50 100%)`,
            boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.1)',
          }}
        />
        {/* Elastic band */}
        <div
          className="absolute top-2 bottom-2 right-3 w-1 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${accent}80 0%, ${accent}50 100%)`,
            boxShadow: '1px 0 2px rgba(0,0,0,0.1)',
          }}
        />
        {/* Logo deboss */}
        <div
          className="absolute bottom-6 left-4 right-8 h-6 rounded"
          style={{
            background: `linear-gradient(135deg, ${accent}15 0%, transparent 100%)`,
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.06)',
          }}
        />
        {/* Shadow */}
        <div
          className="absolute -bottom-3 left-2 right-2 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
