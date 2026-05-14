'use client';

import { motion } from 'framer-motion';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';

interface SolutionMockupsProps {
  solution: SolutionData;
}

export function SolutionMockups({ solution }: SolutionMockupsProps) {
  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-electric/[0.02] blur-[100px]" />

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="text-center max-w-[600px] mx-auto mb-16 lg:mb-24"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">PREMIUM COMPOSITIONS</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Designed to be seen, felt, and remembered
          </h2>
        </motion.div>

        {/* Mockup cards — asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {solution.mockups.map((mockup, i) => (
            <motion.div
              key={mockup.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: duration.slow, ease: easing.cinematic }}
              className={`
                group relative overflow-hidden rounded-2xl border border-border/30
                hover:border-electric/15 hover:shadow-strong transition-all duration-700
                ${i === 0 ? 'lg:col-span-7 aspect-[4/3]' : i === 1 ? 'lg:col-span-5 aspect-[4/3]' : 'lg:col-span-12 aspect-[21/9]'}
              `}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mockup.gradient} transition-transform duration-700 ease-cinematic group-hover:scale-105`}
              />
              <div className="absolute inset-0 texture-dots opacity-[0.025]" />

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-charcoal/[0.04] group-hover:scale-125 group-hover:border-electric/10 transition-all duration-700" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-charcoal/[0.02] group-hover:bg-electric/[0.03] transition-colors duration-500" />

              {/* Product silhouette representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm shadow-soft flex items-center justify-center group-hover:shadow-medium transition-shadow duration-500">
                  <div
                    className="w-8 h-8 rounded-full opacity-30"
                    style={{ backgroundColor: mockup.accentColor }}
                  />
                </div>
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-5 border border-white/40 max-w-sm">
                  <h3 className="font-poppins text-base font-semibold text-rich mb-1">{mockup.title}</h3>
                  <p className="text-[13px] text-charcoal/50">{mockup.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
