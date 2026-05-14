'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

export function AboutHero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-ivory">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0">
        {/* Warm ivory base */}
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-ivory-50 to-ivory" />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 texture-dots opacity-[0.02]" />

        {/* Floating ambient orbs */}
        <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] rounded-full bg-electric/[0.03] blur-[120px] animate-breathe" />
        <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-lavender/[0.04] blur-[100px] animate-breathe" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full bg-electric/[0.02] blur-[80px] animate-breathe" style={{ animationDelay: '8s' }} />

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-brand w-full py-32">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-12 h-px bg-electric/40" />
              <span className="text-caption text-charcoal/40 tracking-[0.2em]">ABOUT BRANDBAZAR</span>
              <span className="w-12 h-px bg-electric/40" />
            </span>
          </motion.div>

          {/* Main headline — oversized, editorial */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.35 }}
            className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-rich leading-[1.02] tracking-[-0.03em] text-wrap-balance mb-10"
          >
            We believe every
            <br />
            <span className="text-electric">touchpoint</span> is a
            <br />
            brand moment
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.55 }}
            className="text-base lg:text-lg text-charcoal/55 leading-[1.7] max-w-[560px] mx-auto font-jakarta"
          >
            A premium corporate branding studio obsessed with the invisible details
            that make brands unforgettable — from the first handshake to the thousandth
            coffee cup.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <span className="text-xs text-charcoal/25 tracking-[0.2em] uppercase">Discover</span>
            <div className="w-5 h-8 rounded-full border border-charcoal/15 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-charcoal/20 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
