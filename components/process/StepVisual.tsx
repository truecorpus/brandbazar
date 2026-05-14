'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type VisualType = 'discovery' | 'design' | 'mockup' | 'production' | 'quality' | 'packaging' | 'delivery';

interface StepVisualProps {
  type: VisualType;
  isActive: boolean;
  accentColor: string;
  className?: string;
}

export function StepVisual({ type, isActive, accentColor, className }: StepVisualProps) {
  const visuals: Record<VisualType, React.ReactNode> = {
    discovery: <DiscoveryVisual isActive={isActive} accentColor={accentColor} />,
    design: <DesignVisual isActive={isActive} accentColor={accentColor} />,
    mockup: <MockupVisual isActive={isActive} accentColor={accentColor} />,
    production: <ProductionVisual isActive={isActive} accentColor={accentColor} />,
    quality: <QualityVisual isActive={isActive} accentColor={accentColor} />,
    packaging: <PackagingVisual isActive={isActive} accentColor={accentColor} />,
    delivery: <DeliveryVisual isActive={isActive} accentColor={accentColor} />,
  };

  return (
    <div className={cn('relative w-full h-full flex items-center justify-center', className)}>
      {visuals[type]}
    </div>
  );
}

/* ─── DISCOVERY: Search / Lightbulb ─── */
function DiscoveryVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64">
      {/* Radiating circles */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: `${accentColor}${20 + i * 10}` }}
          animate={isActive ? {
            scale: [1, 1.2 + i * 0.15, 1],
            opacity: [0.3, 0.6, 0.3],
          } : {}}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Center element */}
      <motion.div
        className="absolute inset-[25%] rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${accentColor}15` }}
        animate={isActive ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
          <motion.circle
            cx="11" cy="11" r="7"
            animate={isActive ? { pathLength: [0, 1] } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.path
            d="M21 21l-4.35-4.35"
            animate={isActive ? { pathLength: [0, 1] } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Floating dots */}
      {[
        { x: '10%', y: '20%', delay: 0 },
        { x: '80%', y: '15%', delay: 0.3 },
        { x: '85%', y: '75%', delay: 0.6 },
        { x: '15%', y: '80%', delay: 0.9 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: accentColor,
            left: dot.x,
            top: dot.y,
          }}
          animate={isActive ? {
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          } : {}}
          transition={{
            duration: 2.5,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── DESIGN: Pencil / Lines ─── */
function DesignVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px bg-rich" style={{ top: `${(i + 1) * 12.5}%` }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px bg-rich" style={{ left: `${(i + 1) * 12.5}%` }} />
        ))}
      </div>

      {/* Drawing lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        <motion.path
          d="M40 180 Q80 60, 128 128 T216 80"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          animate={isActive ? { pathLength: [0, 1] } : { pathLength: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M60 200 L100 120 L140 160 L200 100"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={isActive ? { pathLength: [0, 1] } : { pathLength: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-8 h-8 rounded-lg border-2"
        style={{ borderColor: accentColor }}
        animate={isActive ? {
          rotate: [0, 90, 0],
          y: [0, -10, 0],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-6 h-6 rounded-full border-2"
        style={{ borderColor: accentColor }}
        animate={isActive ? {
          scale: [1, 1.2, 1],
          y: [0, 8, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── MOCKUP: 3D Card Transformation ─── */
function MockupVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64" style={{ perspective: '800px' }}>
      {/* Back card */}
      <motion.div
        className="absolute inset-[15%] rounded-2xl shadow-medium"
        style={{ 
          backgroundColor: `${accentColor}30`,
          transformStyle: 'preserve-3d',
        }}
        animate={isActive ? {
          rotateY: [15, 25, 15],
          rotateX: [-5, 5, -5],
          z: [-20, -40, -20],
        } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Middle card */}
      <motion.div
        className="absolute inset-[20%] rounded-2xl shadow-strong bg-white"
        style={{ transformStyle: 'preserve-3d' }}
        animate={isActive ? {
          rotateY: [10, 20, 10],
          rotateX: [-3, 3, -3],
          z: [0, -10, 0],
        } : {}}
        transition={{ duration: 5, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-4 rounded-lg bg-ivory flex items-center justify-center">
          <div className="w-1/2 h-1/4 rounded bg-rich/10" />
        </div>
      </motion.div>
      
      {/* Front card */}
      <motion.div
        className="absolute inset-[25%] rounded-2xl shadow-strong bg-white border border-border"
        style={{ transformStyle: 'preserve-3d' }}
        animate={isActive ? {
          rotateY: [5, 15, 5],
          rotateX: [-2, 2, -2],
          z: [20, 10, 20],
        } : {}}
        transition={{ duration: 5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="h-1/2 w-full" style={{ backgroundColor: `${accentColor}40` }} />
          <div className="p-4">
            <div className="w-3/4 h-3 rounded bg-rich/10 mb-2" />
            <div className="w-1/2 h-2 rounded bg-rich/5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── PRODUCTION: Gears / Motion ─── */
function ProductionVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64">
      {/* Large gear */}
      <motion.div
        className="absolute top-[15%] left-[15%] w-28 h-28"
        animate={isActive ? { rotate: 360 } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="20" fill="none" stroke={accentColor} strokeWidth="2" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 50 + 20 * Math.cos(angle);
            const y1 = 50 + 20 * Math.sin(angle);
            const x2 = 50 + 35 * Math.cos(angle);
            const y2 = 50 + 35 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            );
          })}
        </svg>
      </motion.div>

      {/* Small gear */}
      <motion.div
        className="absolute bottom-[20%] right-[20%] w-16 h-16"
        animate={isActive ? { rotate: -360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="18" fill="none" stroke={accentColor} strokeWidth="2" />
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const x1 = 50 + 18 * Math.cos(angle);
            const y1 = 50 + 18 * Math.sin(angle);
            const x2 = 50 + 30 * Math.cos(angle);
            const y2 = 50 + 30 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            );
          })}
        </svg>
      </motion.div>

      {/* Connecting line */}
      <motion.div
        className="absolute top-[45%] left-[45%] w-12 h-0.5"
        style={{ backgroundColor: accentColor }}
        animate={isActive ? { opacity: [0.3, 0.8, 0.3] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particles */}
      {[
        { top: '30%', left: '70%', delay: 0 },
        { top: '60%', left: '30%', delay: 0.5 },
        { top: '75%', left: '60%', delay: 1 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ 
            backgroundColor: accentColor,
            top: p.top,
            left: p.left,
          }}
          animate={isActive ? {
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0, 1, 0],
          } : {}}
          transition={{
            duration: 2,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── QUALITY: Scanning / Check ─── */
function QualityVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64">
      {/* Product outline */}
      <div className="absolute inset-[20%] rounded-2xl border-2 border-border bg-white flex items-center justify-center overflow-hidden">
        <div className="w-16 h-20 rounded-lg bg-ivory border border-border" />
        
        {/* Scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-0.5"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
          animate={isActive ? {
            top: ['0%', '100%', '0%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Checkmarks that appear */}
      {[
        { top: '25%', left: '75%', delay: 0.5 },
        { top: '50%', left: '80%', delay: 1.2 },
        { top: '70%', left: '72%', delay: 1.9 },
      ].map((check, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: check.top, left: check.left }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? {
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
          } : { scale: 0, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: check.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'backOut',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={`${accentColor}20`} stroke={accentColor} strokeWidth="1.5" />
            <motion.path
              d="M8 12l3 3 5-6"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={isActive ? { pathLength: [0, 1] } : {}}
              transition={{ duration: 0.3, delay: check.delay + 0.2 }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── PACKAGING: Box Assembly ─── */
function PackagingVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64">
      {/* Box base */}
      <motion.div
        className="absolute bottom-[25%] left-[25%] right-[25%] h-[35%] bg-white border-2 border-border rounded-lg"
        style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
        animate={isActive ? {
          rotateX: [0, -5, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Front face branding */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-3 rounded bg-rich/10" />
        </div>
      </motion.div>

      {/* Box lid */}
      <motion.div
        className="absolute bottom-[55%] left-[25%] right-[25%] h-[10%] bg-white border-2 border-border rounded-t-lg origin-bottom"
        animate={isActive ? {
          rotateX: [0, -110, 0],
          scaleY: [1, 0.3, 1],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Side flaps */}
      <motion.div
        className="absolute bottom-[35%] left-[20%] w-[8%] h-[20%] bg-white border border-border origin-right"
        animate={isActive ? {
          rotateY: [0, -90, 0],
        } : {}}
        transition={{ duration: 3, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[35%] right-[20%] w-[8%] h-[20%] bg-white border border-border origin-left"
        animate={isActive ? {
          rotateY: [0, 90, 0],
        } : {}}
        transition={{ duration: 3, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ribbon / tape */}
      <motion.div
        className="absolute bottom-[40%] left-[30%] right-[30%] h-1 rounded-full"
        style={{ backgroundColor: accentColor }}
        animate={isActive ? {
          opacity: [0, 1, 1, 0],
          scaleX: [0, 1, 1, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── DELIVERY: Moving Package ─── */
function DeliveryVisual({ isActive, accentColor }: { isActive: boolean; accentColor: string }) {
  return (
    <div className="relative w-64 h-64">
      {/* Path line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        <motion.path
          d="M40 200 Q80 80, 128 128 T216 60"
          fill="none"
          stroke={`${accentColor}30`}
          strokeWidth="2"
          strokeDasharray="8 4"
        />
        <motion.path
          d="M40 200 Q80 80, 128 128 T216 60"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          animate={isActive ? { pathLength: [0, 1], pathOffset: [0, -1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Start point */}
      <div className="absolute bottom-[12%] left-[10%] w-4 h-4 rounded-full bg-border" />
      
      {/* Moving package */}
      <motion.div
        className="absolute w-10 h-10"
        animate={isActive ? {
          x: [0, 80, 140, 176],
          y: [0, -80, -40, -140],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ left: '10%', bottom: '12%' }}
      >
        <div className="w-full h-full bg-white border-2 border-border rounded-lg shadow-medium flex items-center justify-center">
          <div className="w-4 h-1 rounded bg-rich/20" />
        </div>
        {/* Motion trail */}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
          style={{ backgroundColor: `${accentColor}40` }}
          animate={isActive ? { scaleX: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Destination pin */}
      <motion.div
        className="absolute top-[12%] right-[10%]"
        animate={isActive ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <motion.circle
            cx="12" cy="10" r="4"
            fill={`${accentColor}20`}
            stroke={accentColor}
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 14v6M8 20h8"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: accentColor }}
          animate={isActive ? {
            scale: [1, 2],
            opacity: [0.5, 0],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  );
}
