'use client';

import { motion } from 'framer-motion';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';
import { ArrowDown } from 'lucide-react';

interface SolutionHeroProps {
  solution: SolutionData;
}

export function SolutionHero({ solution }: SolutionHeroProps) {
  return (
    <section
      className={`relative min-h-[95vh] flex items-end overflow-hidden bg-gradient-to-br ${solution.heroGradient}`}
    >
      {/* Atmospheric layers */}
      <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-electric/[0.03] blur-[120px] animate-breathe" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-lavender/[0.04] blur-[100px] animate-breathe" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />

      {/* Content */}
      <div className="relative z-10 container-brand w-full pb-20 lg:pb-28 pt-32">
        <div className="max-w-[850px]">
          {/* Category label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.2 }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/80 backdrop-blur-sm border border-white/40"
              style={{ color: solution.heroAccent }}
            >
              {solution.category}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower, ease: easing.cinematic, delay: 0.35 }}
            className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-rich leading-[1.05] tracking-[-0.03em] text-wrap-balance mb-8"
          >
            {solution.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.5 }}
            className="text-lg lg:text-xl text-charcoal/55 leading-[1.7] max-w-[560px] mb-10"
          >
            {solution.subheadline}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease: easing.cinematic, delay: 0.65 }}
            className="flex flex-wrap gap-8 lg:gap-12"
          >
            {solution.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-poppins text-3xl lg:text-4xl font-bold leading-none tracking-[-0.02em]"
                  style={{ color: solution.heroAccent }}
                >
                  {stat.value}
                </div>
                <div className="text-body-sm text-charcoal/45 mt-1.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-charcoal/25 tracking-widest uppercase [writing-mode:vertical-lr]">Explore</span>
          <ArrowDown className="w-4 h-4 text-charcoal/25 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
