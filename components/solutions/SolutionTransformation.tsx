'use client';

import { motion } from 'framer-motion';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

interface SolutionTransformationProps {
  solution: SolutionData;
}

export function SolutionTransformation({ solution }: SolutionTransformationProps) {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/50 to-ivory" />

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[600px] mx-auto mb-16 lg:mb-24"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">TRANSFORMATION</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            The difference thoughtful branding makes
          </h2>
        </motion.div>

        {/* Before / After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 mb-16 lg:mb-24">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
            className="relative p-8 lg:p-12 bg-ivory-100/60 rounded-2xl lg:rounded-r-none border border-border/30"
          >
            <span className="text-caption text-charcoal/30 tracking-widest mb-4 block">BEFORE</span>
            <p className="text-[17px] text-charcoal/60 leading-[1.7]">{solution.transformation.before}</p>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.15 }}
            className="relative p-8 lg:p-12 rounded-2xl lg:rounded-l-none overflow-hidden"
            style={{ backgroundColor: `${solution.heroAccent}08` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: solution.heroAccent }}
            />
            <span
              className="text-caption tracking-widest mb-4 block font-semibold"
              style={{ color: solution.heroAccent }}
            >
              AFTER
            </span>
            <p className="text-[17px] text-rich leading-[1.7] font-medium">{solution.transformation.after}</p>
          </motion.div>
        </div>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[720px] mx-auto"
        >
          <div className="relative p-8 lg:p-10 bg-white rounded-2xl border border-border/30 shadow-soft">
            {/* Quote mark */}
            <div className="absolute -top-4 left-8 text-[80px] font-poppins text-electric/[0.08] leading-none select-none">
              &ldquo;
            </div>
            <p className="text-[16px] lg:text-[17px] text-charcoal/70 leading-[1.8] relative z-10">
              {solution.transformation.narrative}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
