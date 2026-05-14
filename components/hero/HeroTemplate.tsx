'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { easing, duration, staggerContainer, staggerItem } from '@/lib/animations';

/* ─────────── TYPES ─────────── */

export interface HeroTemplateProps {
  /** Optional background element (e.g. CinematicBackground) */
  background?: React.ReactNode;
  /** Optional floating visual layer (e.g. FloatingProducts) */
  floatingVisual?: React.ReactNode;
  /** Caption / badge slot */
  caption?: React.ReactNode;
  /** Main headline — recommended: use `text-display` class */
  headline: React.ReactNode;
  /** Subheadline / description paragraph */
  subheadline?: React.ReactNode;
  /** CTA buttons row */
  ctas?: React.ReactNode;
  /** Trust indicators / micro-proof row */
  trustIndicators?: React.ReactNode;
  /** Optional right-side visual slot */
  visual?: React.ReactNode;
  /** Whether to enable scroll parallax on content */
  enableParallax?: boolean;
  /** Minimum height of the section */
  minHeight?: string;
  /** Additional section classes */
  className?: string;
  /** Background gradient or color classes */
  bgClassName?: string;
  /** Whether to show the scroll-down indicator */
  showScrollIndicator?: boolean;
}

/* ─────────── COMPONENT ─────────── */

export function HeroTemplate({
  background,
  floatingVisual,
  caption,
  headline,
  subheadline,
  ctas,
  trustIndicators,
  visual,
  enableParallax = false,
  minHeight = 'min-h-screen',
  className = '',
  bgClassName = 'bg-ivory',
  showScrollIndicator = false,
}: HeroTemplateProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const containerVariants = staggerContainer(0.1, 0.5);
  const itemVariants = staggerItem;

  const contentMotionStyle = enableParallax
    ? { y: contentY, opacity: contentOpacity }
    : undefined;

  return (
    <section
      ref={sectionRef}
      className={`relative ${minHeight} flex items-center overflow-hidden ${bgClassName} ${className}`}
    >
      {/* Background layer */}
      {background}

      {/* Floating visual layer */}
      {floatingVisual && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            scale: enableParallax
              ? useTransform(scrollYProgress, [0, 1], [1, 0.88])
              : undefined,
            y: enableParallax
              ? useTransform(scrollYProgress, [0, 1], [0, -60])
              : undefined,
          }}
        >
          {floatingVisual}
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 container-brand w-full py-28 lg:py-32"
        style={contentMotionStyle}
      >
        <div className={`${visual ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center' : 'max-w-3xl'}`}>
          {/* Left content */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {caption && (
                <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
                  {caption}
                </motion.div>
              )}

              <motion.h1 variants={itemVariants} className="text-display text-rich mb-3">
                {headline}
              </motion.h1>

              {subheadline && (
                <motion.div variants={itemVariants}>
                  {subheadline}
                </motion.div>
              )}

              {ctas && (
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10 lg:mb-12">
                  {ctas}
                </motion.div>
              )}

              {trustIndicators && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-x-6 gap-y-3"
                >
                  {trustIndicators}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right visual */}
          {visual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8, ease: easing.cinematic }}
        >
          <span className="text-caption text-charcoal/40">Scroll</span>
          <motion.div
            className="w-px h-6 bg-gradient-to-b from-charcoal/25 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  );
}
