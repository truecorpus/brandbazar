'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ─── PRODUCT SHAPE COMPONENTS ─── */

function Mug({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-2xl bg-gradient-to-b from-white via-ivory to-ivory-200 shadow-strong border border-border/40 overflow-hidden relative">
        <div className="absolute -right-3 top-1/4 w-4 h-1/2 border-4 border-ivory-300 rounded-r-xl" />
        <div className="absolute top-1/3 left-0 right-0 h-8 bg-electric/10 flex items-center justify-center">
          <div className="w-8 h-2 bg-electric/30 rounded-full" />
        </div>
        <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05)] rounded-2xl" />
        <div className="absolute top-0 left-1/4 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </div>
  );
}

function Bottle({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-3xl bg-gradient-to-b from-white via-ivory-50 to-ivory-200 shadow-strong border border-border/40 overflow-hidden relative">
        <div className="absolute -top-2 left-1/4 right-1/4 h-4 bg-rich/80 rounded-t-lg" />
        <div className="absolute top-1/3 left-2 right-2 h-12 bg-white/80 rounded-lg border border-border/20 flex items-center justify-center">
          <div className="w-10 h-2 bg-electric/40 rounded-full" />
        </div>
        <div className="absolute top-0 left-1/4 w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05)] rounded-3xl" />
      </div>
    </div>
  );
}

function IDCard({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-charcoal/15" />
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-charcoal/15" />
      <div className="w-full h-full rounded-xl bg-white shadow-medium border border-border/40 overflow-hidden relative">
        <div className="absolute top-3 left-3 w-12 h-14 bg-ivory-200 rounded-lg" />
        <div className="absolute top-4 right-3 left-20 space-y-1.5">
          <div className="w-full h-2 bg-rich/8 rounded" />
          <div className="w-2/3 h-2 bg-rich/5 rounded" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-electric/15" />
        <div className="absolute inset-0 shadow-[inset_0_1px_4px_rgba(0,0,0,0.03)] rounded-xl" />
      </div>
    </div>
  );
}

function GiftBox({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white to-ivory shadow-strong border border-border/40 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-electric/12" />
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-electric/12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-electric/25 rounded-full border-2 border-white/50" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </div>
  );
}

function Notebook({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-r-xl rounded-l-md bg-gradient-to-r from-rich/8 via-white to-white shadow-medium border border-border/40 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-rich/15 rounded-l-md" />
        <div className="absolute top-4 right-4 w-16 h-3 bg-electric/15 rounded-full" />
        <div className="absolute top-8 right-4 w-10 h-2 bg-rich/5 rounded-full" />
        <div className="absolute bottom-4 left-6 right-4 space-y-2">
          <div className="w-full h-px bg-rich/4" />
          <div className="w-full h-px bg-rich/4" />
          <div className="w-2/3 h-px bg-rich/4" />
        </div>
      </div>
    </div>
  );
}

/* ─── FLOATING PRODUCT CONFIG ─── */

interface ProductConfig {
  Component: React.FC<{ className?: string }>;
  initialX: string;
  initialY: string;
  width: string;
  aspectRatio: string;
  floatDuration: number;
  floatDelay: number;
  floatAmplitude: number;
  rotateRange: number;
  zIndex: number;
  blur?: number;
}

const products: ProductConfig[] = [
  {
    Component: Mug,
    initialX: '62%',
    initialY: '12%',
    width: '130px',
    aspectRatio: '3/4',
    floatDuration: 7,
    floatDelay: 0,
    floatAmplitude: 12,
    rotateRange: 2,
    zIndex: 20,
  },
  {
    Component: Bottle,
    initialX: '78%',
    initialY: '42%',
    width: '90px',
    aspectRatio: '2/5',
    floatDuration: 9,
    floatDelay: 1.2,
    floatAmplitude: 10,
    rotateRange: 1.5,
    zIndex: 15,
    blur: 0.5,
  },
  {
    Component: GiftBox,
    initialX: '52%',
    initialY: '52%',
    width: '110px',
    aspectRatio: '1/1',
    floatDuration: 6,
    floatDelay: 0.6,
    floatAmplitude: 8,
    rotateRange: 3,
    zIndex: 25,
  },
  {
    Component: IDCard,
    initialX: '82%',
    initialY: '18%',
    width: '80px',
    aspectRatio: '3/4',
    floatDuration: 10,
    floatDelay: 2,
    floatAmplitude: 6,
    rotateRange: 4,
    zIndex: 18,
    blur: 0.5,
  },
  {
    Component: Notebook,
    initialX: '56%',
    initialY: '72%',
    width: '120px',
    aspectRatio: '4/5',
    floatDuration: 8,
    floatDelay: 2.5,
    floatAmplitude: 11,
    rotateRange: 1.5,
    zIndex: 12,
    blur: 1,
  },
];

/* ─── FLOATING PRODUCT ITEM ─── */

function FloatingProductItem({ product, index }: { product: ProductConfig; index: number }) {
  const { Component } = product;

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{
        left: product.initialX,
        top: product.initialY,
        width: product.width,
        aspectRatio: product.aspectRatio,
        zIndex: product.zIndex,
        filter: product.blur ? `blur(${product.blur}px)` : undefined,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: [0, -product.floatAmplitude / 2, 0, product.floatAmplitude / 2, 0],
        rotate: [0, product.rotateRange, 0, -product.rotateRange, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.9, delay: 0.6 + index * 0.12, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: product.floatDuration,
          delay: product.floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotate: {
          duration: product.floatDuration * 1.3,
          delay: product.floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: { duration: 0.9, delay: 0.6 + index * 0.12, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <Component className="w-full h-full" />
    </motion.div>
  );
}

/* ─── MAIN EXPORT ─── */

export function FloatingProducts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {products.map((product, index) => (
        <FloatingProductItem key={index} product={product} index={index} />
      ))}
    </div>
  );
}
