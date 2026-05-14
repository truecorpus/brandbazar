'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

/* ─────────── TYPES ─────────── */

export interface CTATemplateProps {
  /** Eyebrow / caption text above the headline */
  eyebrow?: React.ReactNode;
  /** Main headline */
  headline: React.ReactNode;
  /** Body / description paragraph */
  body?: React.ReactNode;
  /** CTA buttons row */
  ctas?: React.ReactNode;
  /** Optional extra content below CTAs (e.g. WhatsApp link) */
  extra?: React.ReactNode;
  /** Optional trust bullets row */
  trustBullets?: React.ReactNode;
  /** Optional decorative visual slot (e.g. floating card animation) */
  decorativeVisual?: React.ReactNode;
  /** Section id for anchor links */
  id?: string;
  /** Additional section classes */
  className?: string;
  /** Whether to show the animated floating-card visual by default */
  enableDefaultDecorativeVisual?: boolean;
}

/* ─────────── DEFAULT DECORATIVE VISUAL ─────────── */

function DefaultDecorativeVisual() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <motion.div
        className="absolute inset-[10%] rounded-3xl bg-white shadow-strong border border-border overflow-hidden"
        animate={{ y: [0, -10, 0], rotate: [0, 0.8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ivory to-ivory-50" />
        <div className="absolute top-1/4 left-1/4 right-1/4 h-20 rounded-xl bg-electric/8 flex items-center justify-center">
          <div className="w-16 h-3 bg-electric/25 rounded-full" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 right-1/4 h-12 rounded-lg bg-ivory-200" />
      </motion.div>

      <motion.div
        className="absolute -top-3 -right-3 w-20 h-20 bg-white rounded-2xl shadow-medium border border-border"
        animate={{ y: [0, -6, 0], rotate: [4, 7, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute -bottom-3 -left-3 w-16 h-16 bg-white rounded-xl shadow-medium border border-border"
        animate={{ y: [0, -5, 0], rotate: [-2, -0.5, -2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

/* ─────────── COMPONENT ─────────── */

export function CTATemplate({
  eyebrow,
  headline,
  body,
  ctas,
  extra,
  trustBullets,
  decorativeVisual,
  id = 'inquiry',
  className = '',
  enableDefaultDecorativeVisual = false,
}: CTATemplateProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const showVisual = decorativeVisual || enableDefaultDecorativeVisual;

  return (
    <section ref={ref} id={id} className={`relative bg-ivory overflow-hidden ${className}`}>
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 184, 255, 0.1) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(77, 124, 254, 0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative section">
        <div className="container-brand">
          <div className={`grid ${showVisual ? 'lg:grid-cols-2 gap-12 lg:gap-20' : 'max-w-3xl mx-auto text-center'} items-center`}>
            <div>
              {eyebrow && (
                <motion.span
                  className="text-caption text-charcoal mb-5 block"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: duration.normal, ease: easing.cinematic }}
                >
                  {eyebrow}
                </motion.span>
              )}

              <motion.h2
                className="text-display text-rich mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: duration.slow, delay: 0.08, ease: easing.cinematic }}
              >
                {headline}
              </motion.h2>

              {body && (
                <motion.div
                  className={`text-body-lg text-charcoal max-w-lg mb-8 lg:mb-10 ${!showVisual ? 'mx-auto' : ''}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: duration.slow, delay: 0.16, ease: easing.cinematic }}
                >
                  {body}
                </motion.div>
              )}

              {trustBullets && (
                <motion.div
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-charcoal mb-8 lg:mb-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: duration.normal, delay: 0.24, ease: easing.cinematic }}
                >
                  {trustBullets}
                </motion.div>
              )}

              {ctas && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: duration.normal, delay: 0.32, ease: easing.cinematic }}
                >
                  {ctas}
                </motion.div>
              )}

              {extra && (
                <motion.div
                  className="mt-6 lg:mt-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: duration.normal, delay: 0.4 }}
                >
                  {extra}
                </motion.div>
              )}
            </div>

            {showVisual && (
              <motion.div
                className="hidden lg:block relative"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.25, ease: easing.cinematic }}
              >
                {decorativeVisual || <DefaultDecorativeVisual />}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
