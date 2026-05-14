'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CinematicBackground } from '@/components/hero/CinematicBackground';
import { FloatingProducts } from '@/components/hero/FloatingProducts';
import { Button } from '@/components/ui/Button';
import { easing, duration } from '@/lib/animations';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Gentler parallax for refined feel
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const productScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration.slow,
        ease: easing.cinematic,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-ivory"
    >
      <CinematicBackground />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: productScale, y: productY }}
      >
        <FloatingProducts />
      </motion.div>

      <motion.div
        className="relative z-10 container-brand w-full py-28 lg:py-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Caption */}
            <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-border/40 text-caption text-charcoal">
                <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                Premium Corporate Branding
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-display text-rich mb-3">
              Your Brand, Made <span className="text-electric">Visible</span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-body-lg text-charcoal max-w-xl mb-8 lg:mb-10 leading-relaxed"
            >
              We transform corporate identities into tangible experiences — from employee kits 
              to event merchandise, crafted with precision and designed to be remembered.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10 lg:mb-12">
              <Button href="#inquiry" variant="primary" size="lg">
                Start Your Brand Journey
              </Button>
              <Button href="#case-studies" variant="secondary" size="lg">
                Explore Our Work
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {[
                { icon: 'shield', text: 'Premium Quality' },
                { icon: 'users', text: '500+ Clients' },
                { icon: 'box', text: 'Bulk Orders' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-body-sm text-charcoal/60">
                  <TrustIcon name={item.icon} />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
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
    </section>
  );
}

/* ─── TRUST ICONS ─── */

function TrustIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    users: (
      <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    box: (
      <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  };

  return <>{icons[name]}</>;
}
