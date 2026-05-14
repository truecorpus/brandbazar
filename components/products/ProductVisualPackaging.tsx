'use client';

import { motion } from 'framer-motion';

export function ProductVisualPackaging({ accent = '#8B5CF6', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateX: -8, rotateY: 6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div className="relative w-40 h-32 mx-auto">
        {/* Box front */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, #f5f1e8 0%, ${accent}08 50%, #e8e0d4 100%)`,
            boxShadow: `
              0 16px 32px rgba(0,0,0,0.08),
              0 4px 8px rgba(0,0,0,0.04),
              inset 0 1px 2px rgba(255,255,255,0.8)
            `,
          }}
        />
        {/* Top flap open */}
        <motion.div
          className="absolute -top-8 left-0 right-0 h-10 rounded-t-lg origin-bottom"
          style={{
            background: `linear-gradient(180deg, ${accent}15 0%, #f0e8d8 100%)`,
            boxShadow: '0 -2px 4px rgba(0,0,0,0.04)',
          }}
          animate={{ rotateX: -25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Side flap */}
        <div
          className="absolute top-0 -right-4 bottom-0 w-8 rounded-r-lg origin-left"
          style={{
            background: `linear-gradient(90deg, ${accent}10 0%, #e0d8c8 100%)`,
            boxShadow: '2px 0 4px rgba(0,0,0,0.04)',
            transform: 'rotateY(-30deg)',
          }}
        />
        {/* Brand logo area */}
        <div
          className="absolute top-8 left-8 right-8 h-12 rounded"
          style={{
            background: `linear-gradient(135deg, ${accent}12 0%, transparent 100%)`,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
          }}
        />
        {/* Tape */}
        <div
          className="absolute top-14 left-4 right-4 h-3 rounded-full opacity-40"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent}60 20%, ${accent}80 50%, ${accent}60 80%, transparent 100%)`,
          }}
        />
        {/* Tissue paper peek */}
        <div
          className="absolute top-20 left-6 right-6 h-8 rounded-t-lg"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
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
