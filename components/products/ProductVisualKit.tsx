'use client';

import { motion } from 'framer-motion';

export function ProductVisualKit({ accent = '#10B981', className = '' }: { accent?: string; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ rotateY: -6, rotateX: 3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <div className="relative w-48 h-40 mx-auto">
        {/* Main box */}
        <div
          className="absolute bottom-0 left-4 right-4 h-28 rounded-xl"
          style={{
            background: `linear-gradient(135deg, #f5f1e8 0%, ${accent}08 50%, #e8e0d4 100%)`,
            boxShadow: `
              0 16px 32px rgba(0,0,0,0.08),
              0 4px 8px rgba(0,0,0,0.04)
            `,
          }}
        />
        {/* Box lid open */}
        <motion.div
          className="absolute bottom-28 left-4 right-4 h-6 rounded-t-xl origin-bottom"
          style={{
            background: `linear-gradient(180deg, ${accent}15 0%, #f0e8d8 100%)`,
          }}
          animate={{ rotateX: -35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Item 1 - mug */}
        <div
          className="absolute bottom-4 left-8 w-10 h-14 rounded-b-lg rounded-t-sm"
          style={{
            background: 'linear-gradient(135deg, #e8d5c4 0%, #f5f1e8 100%)',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.06)',
          }}
        />
        {/* Item 2 - notebook */}
        <div
          className="absolute bottom-4 left-20 w-12 h-16 rounded-r-md rounded-l-sm"
          style={{
            background: 'linear-gradient(90deg, #d8d0c8 0%, #f8f6f0 5%, #f0ece4 100%)',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.06)',
          }}
        />
        {/* Item 3 - bottle */}
        <div
          className="absolute bottom-4 right-10 w-8 h-18 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #d0e8f0 0%, #e8f4f8 100%)',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.06)',
          }}
        />
        {/* Item 4 - pen */}
        <div
          className="absolute bottom-4 right-4 w-3 h-16 rounded-full rotate-12"
          style={{
            background: `linear-gradient(180deg, ${accent}60 0%, ${accent}40 100%)`,
            boxShadow: '1px 1px 4px rgba(0,0,0,0.06)',
          }}
        />
        {/* Tissue paper */}
        <div
          className="absolute bottom-20 left-6 right-6 h-6 rounded-t-lg"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
          }}
        />
        {/* Shadow */}
        <div
          className="absolute -bottom-2 left-6 right-6 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
