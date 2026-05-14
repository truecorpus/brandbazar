'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

export function SolutionsHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-ivory">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-ivory-50 to-ivory" />
        <div className="absolute inset-0 texture-dots opacity-[0.02]" />
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-electric/[0.03] blur-[120px] animate-breathe" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-lavender/[0.04] blur-[100px] animate-breathe" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      <div className="relative z-10 container-brand w-full py-32">
        <div className="max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3">
              <span className="w-12 h-px bg-electric/40" />
              <span className="text-caption text-charcoal/40 tracking-[0.2em]">SOLUTIONS</span>
              <span className="w-12 h-px bg-electric/40" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.35 }}
            className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-rich leading-[1.02] tracking-[-0.03em] text-wrap-balance mb-8"
          >
            Branding solutions for
            <br />
            <span className="text-electric">every moment</span> that matters
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.5 }}
            className="text-base lg:text-lg text-charcoal/55 leading-[1.7] max-w-[560px]"
          >
            Seven specialized approaches to making your brand visible, memorable,
            and impossible to ignore — from the boardroom to the break room.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
