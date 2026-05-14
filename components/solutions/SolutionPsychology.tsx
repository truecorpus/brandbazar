'use client';

import { motion } from 'framer-motion';
import { SolutionData } from '@/lib/solutions/types';
import { easing, duration } from '@/lib/animations';
import { Brain } from 'lucide-react';

interface SolutionPsychologyProps {
  solution: SolutionData;
}

export function SolutionPsychology({ solution }: SolutionPsychologyProps) {
  return (
    <section className="relative section overflow-hidden bg-rich">
      {/* Atmospheric */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] rounded-full bg-electric/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-lavender/[0.03] blur-[100px]" />
        <div className="absolute inset-0 texture-dots opacity-[0.015]" />
      </div>

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-lavender/20 mb-6">
              <Brain className="w-5 h-5 text-electric" />
            </div>
            <h2 className="font-poppins text-[32px] lg:text-[40px] font-bold text-white leading-[1.12] tracking-[-0.02em] text-wrap-balance mb-6">
              {solution.psychologyHeadline}
            </h2>
            <p className="text-[16px] text-white/40 leading-[1.7]">
              Understanding the psychology behind effective branding is what separates memorable experiences from forgettable ones.
            </p>
          </motion.div>

          {/* Right — points */}
          <div className="lg:col-span-7 space-y-6">
            {solution.psychologyPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: duration.slow, ease: easing.cinematic }}
                className="group p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500"
              >
                <div className="flex gap-5">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-poppins"
                    style={{ backgroundColor: `${solution.heroAccent}15`, color: solution.heroAccent }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[16px] text-white/70 leading-[1.7] pt-0.5">{point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
