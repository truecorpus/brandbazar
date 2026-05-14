'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

const manifestoLines = [
  'Branding is not decoration.',
  'It is the architecture of perception.',
  'Every object that carries your name',
  'is either building trust or eroding it.',
  'There is no neutral ground.',
];

export function ManifestoSection() {
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden bg-rich">
      {/* Atmospheric layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-electric/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-lavender/[0.03] blur-[120px]" />
        <div className="absolute inset-0 texture-dots opacity-[0.02]" />
      </div>

      <div className="container-brand relative z-10">
        <div className="max-w-[800px] mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: duration.slow, ease: easing.cinematic }}
            className="mb-16"
          >
            <span className="text-caption text-white/30 tracking-[0.2em]">OUR MANIFESTO</span>
          </motion.div>

          {/* Manifesto lines — editorial large type */}
          <div className="space-y-4 lg:space-y-6">
            {manifestoLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  delay: i * 0.1,
                  duration: duration.slower,
                  ease: easing.cinematic,
                }}
                className={`
                  font-poppins text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px]
                  leading-[1.1] tracking-[-0.02em] text-wrap-balance
                  ${i === 1 || i === 4 ? 'text-white/95 font-bold' : 'text-white/40 font-medium'}
                `}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1.2, ease: easing.cinematic }}
            className="mt-16 h-px bg-gradient-to-r from-electric/40 via-lavender/30 to-transparent origin-left"
          />
        </div>
      </div>
    </section>
  );
}
