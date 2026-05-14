'use client';

import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/animations';

const values = [
  {
    title: 'Relentless Quality',
    text: 'We would rather deliver late than deliver mediocre. Every product that leaves our studio has been touched by hands that care.',
  },
  {
    title: 'Radical Clarity',
    text: 'No jargon. No vague promises. We speak plainly about what we can do, what it costs, and why it matters. Trust is built on clarity.',
  },
  {
    title: 'Invisible Excellence',
    text: 'The best branding is the kind people feel before they notice. We optimize for emotional impact, not visual noise.',
  },
  {
    title: 'Long-Term Thinking',
    text: 'We design for durability — physical and conceptual. Trends fade. Principles endure. We build for the brand you are becoming, not just the brand you are today.',
  },
  {
    title: 'Respectful Partnership',
    text: 'We treat our clients as creative collaborators, not order-takers. The best work emerges from genuine partnership, not hierarchy.',
  },
  {
    title: 'Sustainable Intention',
    text: 'We believe premium and sustainable are not opposites. The most luxurious objects are the ones made to last — physically, aesthetically, and emotionally.',
  },
];

export function ValuesSection() {
  return (
    <section className="relative section overflow-hidden bg-rich">
      {/* Atmospheric */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-electric/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-lavender/[0.02] blur-[100px]" />
        <div className="absolute inset-0 texture-dots opacity-[0.015]" />
      </div>

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: duration.slow, ease: easing.cinematic }}
          className="max-w-[600px] mb-16 lg:mb-24"
        >
          <span className="text-caption text-white/25 tracking-[0.2em] mb-4 block">WHAT WE BELIEVE</span>
          <h2 className="font-poppins text-[32px] lg:text-[44px] font-bold text-white leading-[1.1] tracking-[-0.02em] text-wrap-balance">
            Values that shape every decision
          </h2>
        </motion.div>

        {/* Values grid — editorial asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.06, duration: duration.slow, ease: easing.cinematic }}
              className="p-8 lg:p-10 bg-rich hover:bg-white/[0.03] transition-colors duration-500 group"
            >
              {/* Number */}
              <span className="font-poppins text-[13px] font-semibold text-electric/50 mb-4 block">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="font-poppins text-lg font-semibold text-white mb-3 group-hover:text-electric transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-[15px] text-white/40 leading-[1.7]">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
