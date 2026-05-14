'use client';

import { motion } from 'framer-motion';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';

interface SolutionProcessProps {
  solution: SolutionData;
}

export function SolutionProcess({ solution }: SolutionProcessProps) {
  return (
    <section className="relative section overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-electric/[0.015] blur-[120px]" />

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[600px] mb-16 lg:mb-24"
        >
          <span className="text-caption text-charcoal/30 tracking-[0.2em] mb-4 block">OUR PROCESS</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-rich leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            How we bring your {solution.name.toLowerCase()} to life
          </h2>
        </motion.div>

        {/* Process steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-14">
          {solution.process.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: duration.slow, ease: easing.cinematic }}
              className="relative group"
            >
              <div className="flex gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold font-poppins text-white"
                    style={{ backgroundColor: solution.heroAccent }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-poppins text-xl font-semibold text-rich mb-2 group-hover:text-electric transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-charcoal/60 leading-[1.7]">{step.description}</p>
                </div>
              </div>

              {/* Connector line for first column items */}
              {i < solution.process.length - 2 && i % 2 === 0 && (
                <div className="hidden lg:block absolute left-7 top-16 bottom-[-56px] w-px bg-border/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
